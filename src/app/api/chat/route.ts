import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chat-context";
import type { Locale } from "@/types";

// Modèles flash récents, essayés dans l'ordre (fetch natif, pas de SDK) :
// l'alias « flash-latest » suit les générations côté Google, le second sert
// de repli en cas de surcharge (503) ou de retrait du premier.
const GEMINI_MODELS = ["gemini-flash-latest", "gemini-3.1-flash-lite"];
const geminiUrl = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

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

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(
      "[api/chat] GEMINI_API_KEY absent de l'environnement. Ajoutez-le dans .env.local (voir .env.example)."
    );
    return NextResponse.json({ error: "server_not_configured" }, { status: 500 });
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

  const payload = JSON.stringify({
    systemInstruction: {
      parts: [{ text: buildSystemPrompt(safeLocale) }],
    },
    contents: history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: {
      maxOutputTokens: 400,
      temperature: 0.7,
    },
  });

  for (const model of GEMINI_MODELS) {
    try {
      const res = await fetch(`${geminiUrl(model)}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15_000),
        body: payload,
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        console.warn(`[api/chat] Échec ${model} (${res.status}) :`, detail.slice(0, 300));
        continue; // modèle suivant
      }

      const data = await res.json();
      const reply: string | undefined = data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("")
        .trim();

      if (!reply) {
        console.warn(`[api/chat] Réponse ${model} vide ou filtrée :`, JSON.stringify(data).slice(0, 300));
        continue;
      }

      return NextResponse.json({ reply });
    } catch (err) {
      console.warn(`[api/chat] Erreur d'appel ${model} :`, err);
    }
  }

  console.error("[api/chat] Tous les modèles Gemini ont échoué.");
  return NextResponse.json({ error: "upstream_error" }, { status: 502 });
}
