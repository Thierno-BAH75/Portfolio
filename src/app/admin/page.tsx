import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { LogoutButton } from "./logout-button";

// Phase 1 : simple écran d'accueil protégé. Le contenu (CRUD projets,
// expériences, messages de contact…) arrive en Phase 2.
export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Filet de sécurité : le middleware protège déjà /admin/*, cette
  // vérification serveur évite tout flash de contenu si jamais contournée.
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 px-4">
      <div className="admin-grid absolute inset-0 opacity-70 pointer-events-none" />
      <style>{`
        .admin-grid {
          background-image:
            radial-gradient(circle, rgba(139,92,246,0.14) 1px, transparent 1px),
            radial-gradient(circle, rgba(6,182,212,0.08) 1px, transparent 1px);
          background-size: 32px 32px, 64px 64px;
          background-position: 0 0, 16px 16px;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-lg mx-auto text-center rounded-2xl border border-border bg-card p-10">
        <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-xs font-medium text-green-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Connecté
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent mb-3">
          Bienvenue, {user.email}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Le panneau d&apos;administration (gestion des projets, expériences,
          messages de contact…) arrive en Phase 2. Pour l&apos;instant, cet
          espace confirme simplement que l&apos;authentification fonctionne.
        </p>
        <LogoutButton />
      </div>
    </main>
  );
}
