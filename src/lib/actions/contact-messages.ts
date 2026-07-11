"use server";

import { z } from "zod";
import { supabase, getSupabaseAdmin } from "@/lib/supabase";
import { requireAdminUser, UnauthorizedError, type ActionResult } from "./require-admin";

const contactMessageSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

// Action PUBLIQUE (pas de requireAdminUser) — le visiteur n'est jamais
// authentifié. RLS ("public insert contact_messages") autorise l'insertion
// via la clé anon ; on utilise donc le client anon, pas le client admin.
// Appelée en plus de Formspree (jamais à sa place) : un échec ici ne doit
// jamais empêcher l'email de partir, donc on avale l'erreur et on logue.
export async function submitContactMessage(input: unknown): Promise<void> {
  const parsed = contactMessageSchema.safeParse(input);
  if (!parsed.success) {
    console.error("[contact-messages] payload invalide :", parsed.error.issues[0]?.message);
    return;
  }

  const { error } = await supabase.from("contact_messages").insert({
    first_name: parsed.data.firstName,
    last_name: parsed.data.lastName,
    email: parsed.data.email,
    subject: parsed.data.subject || null,
    message: parsed.data.message,
  });

  if (error) {
    console.error("[contact-messages] échec de l'insertion :", error.message);
  }
}

export async function markMessageRead(id: string): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("contact_messages").update({ read: true }).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function toggleArchiveMessage(id: string, archived: boolean): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("contact_messages").update({ archived }).eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("contact_messages").delete().eq("id", id);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}
