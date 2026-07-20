"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/i18n";

// Bouton de retour partagé par les pages standalone (Certifications, Veille,
// Outils, Projets) — mêmes classes que le lien "Retour aux projets" des
// fiches projet (project-detail.tsx), pour une cohérence visuelle stricte.
export function BackToHomeLink() {
  const { t } = useI18n();

  return (
    <Link
      href="/"
      className="mb-8 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-violet-500/50 transition-all"
    >
      <ArrowLeft size={16} />
      {t.backToHome}
    </Link>
  );
}
