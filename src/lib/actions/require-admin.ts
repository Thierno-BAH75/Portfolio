// Vérification de session partagée par toutes les server actions admin.
// Volontairement PAS un fichier "use server" : c'est un utilitaire interne
// appelé depuis les actions, pas une action exposée en elle-même.
import { createSupabaseServerClient } from "@/lib/supabase-server";

export class UnauthorizedError extends Error {
  constructor() {
    super("Session expirée ou invalide. Reconnectez-vous.");
    this.name = "UnauthorizedError";
  }
}

// Toute écriture admin passe par ici en premier : si la session cookie
// (posée par Supabase Auth au login) est absente ou invalide, on arrête
// net avant toute requête d'écriture — jamais de mutation sans utilisateur
// authentifié, même si la clé anon seule ne le permettrait pas déjà via RLS.
export async function requireAdminUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new UnauthorizedError();
  }

  return user;
}

export type ActionResult = { success: true } | { success: false; error: string };
