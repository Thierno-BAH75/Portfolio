// Journalisation des échanges avec le chatbot — appelé via after() dans
// /api/chat, donc APRÈS l'envoi de la réponse au visiteur : un ralentissement
// ou un échec ici n'affecte jamais le temps de réponse perçu.
import { getSupabaseAdmin } from "./supabase";
import type { Locale } from "@/types";

export async function logChatInteraction(entry: {
  question: string;
  answer: string;
  locale: Locale;
  provider: string;
  ip: string;
}): Promise<void> {
  try {
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("chat_logs").insert({
      question: entry.question,
      answer: entry.answer,
      locale: entry.locale,
      provider: entry.provider,
      ip: entry.ip,
    });
    if (error) console.error("[chat-logger] échec de l'insertion :", error.message);
  } catch (err) {
    console.error("[chat-logger] erreur inattendue :", err instanceof Error ? err.message : err);
  }
}
