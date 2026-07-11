// Client Supabase pour les Client Components (ex. formulaire /admin/login).
// Écrit la session dans les cookies pour que le middleware puisse la lire.
// Fichier séparé de supabase-server.ts / supabase-middleware.ts : ne doit
// jamais importer "next/headers", sous peine de faire fuiter du code
// serveur dans le bundle navigateur (et inversement en middleware Edge).
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
