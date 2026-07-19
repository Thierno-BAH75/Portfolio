"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, FileText, ExternalLink } from "lucide-react";
import { ResolvedIcon } from "@/lib/lucide-icon";
import { useI18n } from "@/i18n";
import type { Certification } from "@/types";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const IMAGE_EXTENSION = /\.(png|jpe?g|webp|gif|avif|svg)(\?.*)?$/i;

interface CertificationViewerModalProps {
  cert: Certification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Modale de visualisation du justificatif — pattern centré (scale+fade)
// distinct du panneau plein écran des projets (celui-ci glisse depuis la
// droite), mais même mécanique sous-jacente : backdrop + contenu animés
// par Framer Motion, focus trap manuel, Échap, scroll bloqué.
//
// Pas d'<iframe>/<embed> pour les PDF : la CSP du site pose déjà
// `frame-src 'none'` / `object-src 'none'` (next.config.ts) en vue d'un
// passage futur en mode bloquant, et cert.pdfUrl est une URL saisie
// librement en admin (pas forcément un fichier Supabase Storage) — un hôte
// externe peut aussi refuser l'embarquement (X-Frame-Options). On affiche
// donc une vignette + un bouton d'ouverture pour les PDF, et un aperçu
// <img> inline uniquement pour les extensions d'image reconnues.
export function CertificationViewerModal({
  cert,
  open,
  onOpenChange,
}: CertificationViewerModalProps) {
  const { t, tx } = useI18n();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  // La carte parente est animée (transform via whileHover) : un descendant
  // position:fixed s'y positionnerait relativement à elle plutôt qu'au
  // viewport. On sort donc du flux via un portail vers document.body.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 20);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, onOpenChange]);

  // Repart d'un état propre à chaque changement de justificatif affiché.
  useEffect(() => {
    setImageFailed(false);
  }, [cert?.pdfUrl]);

  const isImage = cert?.pdfUrl ? IMAGE_EXTENSION.test(cert.pdfUrl) : false;
  const showImage = isImage && !imageFailed;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && cert && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
            className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-sm"
          />
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-viewer-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label={t.certifications.viewer.close}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/70 backdrop-blur border border-border/60 text-foreground hover:border-cyan-400/50 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 p-6 pb-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 text-violet-400 shrink-0">
                <ResolvedIcon name={cert.icon} size={18} />
              </span>
              <div className="min-w-0 pr-8">
                <h2 id="cert-viewer-title" className="font-semibold text-sm leading-snug truncate">
                  {tx(cert.name)}
                </h2>
                <p className="text-xs text-muted-foreground truncate">{cert.issuer}</p>
              </div>
            </div>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.1 }}
              className="px-6 pb-6"
            >
              {showImage ? (
                // eslint-disable-next-line @next/next/no-img-element -- URL dynamique saisie en admin, hors domaines connus de next/image
                <img
                  src={cert.pdfUrl}
                  alt={tx(cert.name)}
                  onError={() => setImageFailed(true)}
                  className="w-full max-h-[60vh] object-contain rounded-lg border border-border/60 bg-muted/20"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-center py-10 px-4 rounded-lg border border-dashed border-border/60 bg-muted/20">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/15 to-cyan-500/15 border border-violet-500/25 text-cyan-400">
                    <FileText size={22} />
                  </span>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    {t.certifications.viewer.previewUnavailable}
                  </p>
                </div>
              )}

              {cert.pdfUrl && (
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full h-11 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.45)] active:scale-[0.99] transition-all"
                >
                  <ExternalLink size={16} />
                  {t.certifications.viewer.openInNewTab}
                </a>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
