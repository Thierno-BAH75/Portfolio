import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chat-context";
import { generateReply, type ChatMessage } from "@/lib/ai-providers";
import type { Locale } from "@/types";

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 16; // 8 échanges user/assistant

// Rate-limit simple par IP, en mémoire (~10 req/min). Même limite que le
// formulaire de contact avant Formspree : suffisant pour un process unique,
// non partagé entre instances serverless — à remplacer par un store partagé
// (Redis/Upstash) si le trafic le justifie.
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isValidMessage(m: unknown): m is ChatMessage {
  if (typeof m !== "object" || m === null) return false;
  const msg = m as Record<string, unknown>;
  return (
    (msg.role === "user" || msg.role === "assistant") &&
    typeof msg.content === "string" &&
    msg.content.length > 0 &&
    msg.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { messages, locale } = (body ?? {}) as {
    messages?: unknown;
    locale?: unknown;
  };

  if (!Array.isArray(messages) || messages.length === 0 || !messages.every(isValidMessage)) {
    return NextResponse.json({ error: "invalid_messages" }, { status: 400 });
  }
  if (messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "invalid_messages" }, { status: 400 });
  }

  const safeLocale: Locale = locale === "en" ? "en" : "fr";
  const history = (messages as ChatMessage[]).slice(-MAX_HISTORY_MESSAGES);
  const systemPrompt = buildSystemPrompt(safeLocale);

  // Même system prompt et même historique envoyés à chaque fournisseur :
  // le ton et le comportement de l'assistant ne varient jamais selon celui
  // qui répond réellement.
  const result = await generateReply(systemPrompt, history);

  if (!result) {
    console.error("[api/chat] Tous les fournisseurs (Gemini, Groq, Mistral) ont échoué.");
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }

  console.log(`[api/chat] Réponse servie par : ${result.provider}`);
  return NextResponse.json({ reply: result.reply });
}
