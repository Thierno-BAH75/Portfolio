"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Shield, Database, Key, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

const features = [
  {
    icon: Key,
    text: "Authentification Supabase avec tokens JWT",
  },
  {
    icon: Database,
    text: "Base de données PostgreSQL sécurisée",
  },
  {
    icon: Shield,
    text: "Accès protégé par Row Level Security (RLS)",
  },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">

      <style>{`
        @keyframes border-spin-admin {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .admin-card-glow {
          position: relative;
          border-radius: 1rem;
          padding: 1px;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4, #3b82f6, #8b5cf6);
          background-size: 300% 300%;
          animation: border-spin-admin 5s linear infinite;
        }
        .admin-grid {
          background-image:
            radial-gradient(circle, rgba(139,92,246,0.14) 1px, transparent 1px),
            radial-gradient(circle, rgba(6,182,212,0.08) 1px, transparent 1px);
          background-size: 32px 32px, 64px 64px;
          background-position: 0 0, 16px 16px;
        }
      `}</style>

      {/* Fond grille + lueurs */}
      <div className="admin-grid absolute inset-0 opacity-70 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(139,92,246,0.15) 0%, transparent 55%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(6,182,212,0.12) 0%, transparent 55%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-4xl mx-auto px-4"
      >
        {/* Wrapper border glow */}
        <div className="admin-card-glow">
          <div className="rounded-[calc(1rem-1px)] bg-card overflow-hidden">
            <div className="grid lg:grid-cols-2">

              {/* ── Colonne gauche ──────────────────────────────── */}
              <div className="relative flex flex-col justify-center gap-8 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-border">

                {/* Lueur d'accent interne */}
                <div className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />

                {/* Titre */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 mb-3"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
                    <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">Admin</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent leading-tight mb-3"
                  >
                    Panneau<br />d&apos;Administration
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-muted-foreground"
                  >
                    Accès réservé uniquement aux administrateurs
                  </motion.p>
                </div>

                {/* Bullets */}
                <ul className="space-y-4">
                  {features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-md bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <f.icon className="w-3.5 h-3.5 text-violet-400" />
                      </div>
                      <span className="text-sm text-muted-foreground leading-relaxed">{f.text}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Badge sécurité */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-500 font-medium">Connexion chiffrée TLS</span>
                </motion.div>
              </div>

              {/* ── Colonne droite — Formulaire ─────────────────── */}
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  {/* Icône cadenas */}
                  <div className="flex flex-col items-center gap-3 mb-2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Connexion</h2>
                    <p className="text-xs text-muted-foreground text-center">
                      Entrez vos identifiants pour accéder au panneau
                    </p>
                  </div>

                  {/* Formulaire */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="admin@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-9 bg-background border-border focus:border-cyan-500/50 focus:ring-cyan-500/20 placeholder:text-muted-foreground/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Mot de passe</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-9 bg-background border-border focus:border-cyan-500/50 focus:ring-cyan-500/20 placeholder:text-muted-foreground/50"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Connexion…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Se connecter
                        </span>
                      )}
                    </Button>
                  </form>

                  <p className="text-center text-xs text-muted-foreground/60">
                    Accès non autorisé = tentative journalisée
                  </p>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
