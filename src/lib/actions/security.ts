"use server";

import { headers } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";
import { requireAdminUser } from "./require-admin";

// Best-effort : la connexion/déconnexion elle-même ne doit jamais échouer
// à cause d'un problème de journalisation. Appelée pendant que la session
// est encore valide (avant signOut() côté client pour "logout").
export async function logConnectionEvent(
  eventType: "login" | "logout" | "mfa_challenge"
): Promise<void> {
  try {
    const user = await requireAdminUser();
    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? null;
    const userAgent = h.get("user-agent");

    const admin = getSupabaseAdmin();
    const { error } = await admin.from("connection_logs").insert({
      user_id: user.id,
      email: user.email,
      event_type: eventType,
      ip,
      user_agent: userAgent,
    });
    if (error) console.error("[security] échec de la journalisation :", error.message);
  } catch (err) {
    console.error("[security] erreur inattendue :", err instanceof Error ? err.message : err);
  }
}
