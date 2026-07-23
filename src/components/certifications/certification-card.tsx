"use client";

import { useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { ResolvedIcon } from "@/lib/lucide-icon";
import { useI18n } from "@/i18n";
import { CertificationViewerModal } from "./certification-viewer-modal";
import type { Certification } from "@/types";

// Spotlight radial qui suit la souris — CSS vars poussées sur la carte,
// zéro re-render React (même technique que Contact/Skills).
function setSpotlight(e: MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
}

// Carte au style établi du site (anneau au survol, léger lift, spotlight —
// même pattern que ContactCard / les cartes Skills) mais palette propre à
// cette section, cyan-dominant plutôt que le dégradé violet→cyan habituel :
// bordure cyan fine, icône violet en contraste volontaire. Le fond bleu nuit
// (bg-[#0f1729]) est conservé tel quel en dark (rendu déjà validé) mais
// n'est plus figé hors thème sombre : bg-card + textes/bordures sémantiques
// en light, via les variants dark:.
// En mode compact (aperçu home) : juste icône + nom + émetteur, pas de dates.
export function CertificationCard({
  cert,
  index,
  compact = false,
}: {
  cert: Certification;
  index: number;
  compact?: boolean;
}) {
  const { t, tx, locale } = useI18n();
  const reduce = useReducedMotion();
  const [viewerOpen, setViewerOpen] = useState(false);

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{
        opacity: { duration: 0.5, delay: Math.min(index, 8) * 0.06, ease: [0.22, 1, 0.36, 1] },
        y: reduce ? undefined : { type: "spring", stiffness: 300, damping: 22 },
      }}
      onMouseMove={reduce ? undefined : setSpotlight}
      className={cn(
        "group relative h-full rounded-2xl p-[1px]",
        !reduce &&
          "transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15),0_0_18px_rgba(34,211,238,0.08)]"
      )}
    >
      {/* Bordure fine cyan de base */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-2xl border border-cyan-400/30 transition-all duration-300",
          reduce ? "group-hover:border-cyan-400/60" : "group-hover:opacity-0"
        )}
      />
      {/* Anneau cyan plein au hover */}
      {!reduce && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-cyan-400/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}

      <div
        className={cn(
          "relative h-full rounded-[calc(1rem-1px)] bg-card dark:bg-[#0f1729] flex flex-col gap-3 overflow-hidden",
          compact ? "p-4" : "p-5"
        )}
      >
        {/* Spotlight radial discret qui suit la souris */}
        {!reduce && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(139,92,246,0.10), rgba(34,211,238,0.05) 45%, transparent 70%)",
            }}
          />
        )}

        {/* Badge année — fond cyan plein, texte sombre. Uniquement en mode
            complet : en aperçu compact les titres longs passent sur
            plusieurs lignes et chevaucheraient le badge. */}
        {!compact && (
          <span className="absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-400 text-slate-900">
            {cert.date.slice(0, 4)}
          </span>
        )}

        <div className="relative flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-600 dark:text-violet-300 shrink-0">
            <ResolvedIcon name={cert.icon} size={18} />
          </span>
          <div className={cn("min-w-0", !compact && "pr-8")}>
            <h3
              className={cn(
                "font-semibold leading-snug text-foreground dark:text-white",
                compact ? "text-sm" : "text-base"
              )}
            >
              {tx(cert.name)}
            </h3>
            <p className="text-xs text-muted-foreground dark:text-slate-400 truncate">{cert.issuer}</p>
          </div>
        </div>

        {!compact && (
          <div className="relative flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground dark:text-slate-400 pt-3 border-t border-border dark:border-white/10">
            <span>
              {t.certifications.obtainedOn} {formatDate(cert.date, locale)}
            </span>
            {cert.expiry && (
              <span>
                {t.certifications.expiresOn} {formatDate(cert.expiry, locale)}
              </span>
            )}
          </div>
        )}

        {!compact && (cert.pdfUrl || cert.verificationUrl) && (
          <div className="relative flex items-center gap-3 pt-1">
            {cert.pdfUrl && (
              <>
                <button
                  type="button"
                  onClick={() => setViewerOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cyan-400 text-slate-900 hover:bg-cyan-300 transition-colors"
                >
                  <FileText size={13} />
                  {t.certifications.viewCertificate}
                </button>
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.certifications.viewer.openInNewTab}
                  className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-border dark:border-white/15 text-muted-foreground dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 transition-colors shrink-0"
                >
                  <ExternalLink size={13} />
                </a>
              </>
            )}
            {/* Page de vérification officielle (Credly, vérificateur Cisco…) —
                distincte du justificatif : bouton discret, n'apparaît que si
                renseigné, ne concurrence pas le bouton principal. */}
            {cert.verificationUrl && (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.certifications.verifyOnline}
                title={t.certifications.verifyOnline}
                className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-border dark:border-white/15 text-muted-foreground dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 transition-colors shrink-0"
              >
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        )}
      </div>

      {!compact && cert.pdfUrl && (
        <CertificationViewerModal cert={cert} open={viewerOpen} onOpenChange={setViewerOpen} />
      )}
    </motion.div>
  );
}
