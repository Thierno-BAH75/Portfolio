// Clients Supabase — deux instances distinctes, jamais interchangeables :
// - `supabase` (anon key) : lecture publique, utilisable côté client ET serveur.
// - `supabaseAdmin` (service_role) : contourne RLS, réservé aux routes serveur
//   (API admin, scripts de seed). Ne JAMAIS importer ce module depuis un
//   composant client — la clé service_role ne porte pas le préfixe
//   NEXT_PUBLIC_ et n'est donc pas inlinée dans le bundle navigateur.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Lazy : n'échoue que si réellement utilisée sans clé, pas au chargement du
// module (qui est aussi importé, indirectement, par du code côté client).
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY absente — client admin indisponible");
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
