"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Github, ExternalLink, Calendar, ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { useI18n } from "@/i18n";
import { MarkdownContent, extractSummary } from "@/components/projects/markdown-content";
import type { Project } from "@/types";

interface ProjectPanelProps {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  const reduceMotion = useReducedMotion();
  const { t, tx, locale } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll bloqué, Échap pour fermer, focus trap basique dans le panneau,
  // focus initial sur le bouton de fermeture.
  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
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
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-[100] bg-background/70 backdrop-blur-sm"
          />
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-panel-title"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={
              reduceMotion
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 300, damping: 32 }
            }
            className="fixed top-0 right-0 z-[101] h-dvh w-full sm:w-[520px] sm:max-w-[90vw] bg-card border-l border-border/60 shadow-2xl overflow-y-auto"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={t.projects.panel.close}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/70 backdrop-blur border border-border/60 text-foreground hover:border-cyan-400/50 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Cover */}
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG décoratif local */}
              <img src={project.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>

            <div className="p-6 sm:p-7 flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="outline"
                  className="text-[10px] border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300 capitalize"
                >
                  {t.projects.categories[project.category]}
                </Badge>
                {project.date && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar size={13} />
                    {formatDate(project.date, locale)}
                  </span>
                )}
                {project.featured && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white">
                    <Star size={9} /> {t.projects.featured}
                  </span>
                )}
              </div>

              <h2 id="project-panel-title" className="text-2xl font-bold leading-snug">
                {tx(project.title)}
              </h2>

              <div className="text-sm">
                <MarkdownContent
                  content={
                    project.longDescription
                      ? extractSummary(tx(project.longDescription))
                      : tx(project.description)
                  }
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md border border-border/60 bg-muted/40 text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {(project.links.live || project.links.demo || project.links.github) && (
                <div className="flex flex-wrap gap-3">
                  {(project.links.live || project.links.demo) && (
                    <a
                      href={project.links.live ?? project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold transition-colors"
                    >
                      <ExternalLink size={14} /> {t.projects.detail.viewSite}
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border/60 text-xs font-semibold hover:border-violet-500/50 transition-colors"
                    >
                      <Github size={14} /> {t.projects.detail.sourceCode}
                    </a>
                  )}
                </div>
              )}

              <Link
                href={`/projects/${project.slug}`}
                className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold shadow hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
              >
                {t.projects.panel.viewCase}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
