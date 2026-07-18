"use server";

import { updateTag } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { chatbotSettingsSchema, type ChatbotSettingsFormValues } from "@/lib/schemas";
import { requireAdminUser, UnauthorizedError, type ActionResult } from "./require-admin";

export async function updateChatbotSettings(values: ChatbotSettingsFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = chatbotSettingsSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin
      .from("chatbot_settings")
      .upsert(
        {
          id: 1,
          tone: parsed.data.tone,
          extra_instructions: parsed.data.extraInstructions || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) return { success: false, error: error.message };

    // Invalide le system prompt mis en cache (src/lib/chat-context.ts) —
    // le prochain message chatbot reflète immédiatement le nouveau ton.
    updateTag("chatbot-settings");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}
