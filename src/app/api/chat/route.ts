import { NextRequest, NextResponse, after } from "next/server";
import { buildSystemPrompt } from "@/lib/chat-context";
import { generateReply, type ChatMessage } from "@/lib/ai-providers";
import { logChatInteraction } from "@/lib/chat-logger";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";
import type { Locale } from "@/types";

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 16; // 8 échanges user/assistant

// ~10 req/min/IP — même limite que le formulaire de contact avant Formspree.
const isRateLimited = createRateLimiter(60 * 1000, 10);

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
  const systemPrompt = await buildSystemPrompt(safeLocale);

  // Même system prompt et même historique envoyés à chaque fournisseur :
  // le ton et le comportement de l'assistant ne varient jamais selon celui
  // qui répond réellement.
  const result = await generateReply(systemPrompt, history);

  if (!result) {
    console.error(
      "[api/chat] Tous les fournisseurs (Gemini flash, Gemini flash-lite, Groq, Mistral) ont échoué."
    );
    return NextResponse.json({ error: "upstream_error" }, { status: 502 });
  }

  console.log(
    `[api/chat] Réponse servie par : ${result.provider} — modèle exact : ${result.model}`
  );

  // after() : exécuté une fois la réponse envoyée au visiteur, ne retarde
  // jamais le temps de réponse perçu du chatbot.
  const lastQuestion = (messages as ChatMessage[])[messages.length - 1].content;
  after(() =>
    logChatInteraction({
      question: lastQuestion,
      answer: result.reply,
      locale: safeLocale,
      provider: result.provider,
      ip,
    })
  );

  return NextResponse.json({ reply: result.reply });
}
