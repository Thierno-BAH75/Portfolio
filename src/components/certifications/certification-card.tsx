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

// Carte au style établi du site : bordure fine → anneau dégradé violet→cyan
// au survol, léger lift + spotlight qui suit la souris (même pattern que
// ContactCard / les cartes Skills). En mode compact (aperçu home) : juste
// icône + nom + émetteur, pas de dates.
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
      {/* Bordure fine de base */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-2xl border border-border/60 transition-all duration-300",
          reduce ? "group-hover:border-violet-500/40" : "group-hover:opacity-0"
        )}
      />
      {/* Bordure dégradée violet→cyan au hover */}
      {!reduce && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/60 to-cyan-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}

      <div
        className={cn(
          "relative h-full rounded-[calc(1rem-1px)] bg-card flex flex-col gap-3 overflow-hidden",
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

        <div className="relative flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 text-violet-400 shrink-0">
            <ResolvedIcon name={cert.icon} size={18} />
          </span>
          <div className="min-w-0">
            <h3
              className={cn(
                "font-semibold leading-snug",
                compact ? "text-sm" : "text-base"
              )}
            >
              {tx(cert.name)}
            </h3>
            <p className="text-xs text-muted-foreground truncate">{cert.issuer}</p>
          </div>
        </div>

        {!compact && (
          <div className="relative flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-3 border-t border-border/60">
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

        {!compact && cert.pdfUrl && (
          <div className="relative flex items-center gap-4 pt-1">
            <button
              type="button"
              onClick={() => setViewerOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
            >
              <FileText size={14} />
              {t.certifications.viewCertificate}
            </button>
            <a
              href={cert.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.certifications.viewer.openInNewTab}
              className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-border/60 text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/50 transition-colors shrink-0"
            >
              <ExternalLink size={13} />
            </a>
          </div>
        )}
      </div>

      {!compact && cert.pdfUrl && (
        <CertificationViewerModal cert={cert} open={viewerOpen} onOpenChange={setViewerOpen} />
      )}
    </motion.div>
  );
}
