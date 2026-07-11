// Client Supabase pour Server Components / Route Handlers / Server Actions.
// Utilise next/headers : ne jamais importer ce fichier depuis un Client
// Component ou le middleware Edge (voir supabase-browser.ts / supabase-middleware.ts).
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Appelé depuis un Server Component : les cookies ne peuvent pas
          // être modifiés, le middleware se charge du rafraîchissement.
        }
      },
    },
  });
}
