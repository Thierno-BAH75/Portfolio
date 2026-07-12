"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { resolveLucideIcon } from "@/lib/lucide-icon";
import { useI18n } from "@/i18n";
import type { Certification } from "@/types";

// Carte au style établi du site : bordure fine → anneau dégradé violet→cyan
// au survol (même pattern que ContactCard / les cartes Skills). En mode
// compact (aperçu home) : juste icône + nom + émetteur, pas de dates.
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
  const Icon = resolveLucideIcon(cert.icon);

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
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
          "relative h-full rounded-[calc(1rem-1px)] bg-card flex flex-col gap-3",
          compact ? "p-4" : "p-5"
        )}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 border border-violet-500/25 text-violet-400 shrink-0">
            <Icon size={18} />
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm leading-snug">{tx(cert.name)}</h3>
            <p className="text-xs text-muted-foreground truncate">{cert.issuer}</p>
          </div>
        </div>

        {!compact && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-3 border-t border-border/60">
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
      </div>
    </motion.div>
  );
}
