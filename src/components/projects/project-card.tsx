"use client";

import { useRef, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";
import { useI18n } from "@/i18n";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement) => void;
  // true dans /projects, pour animer le réagencement lors du filtrage
  animateLayout?: boolean;
}

// Carte projet partagée (home + /projects) : ouvre le panneau latéral
// au clic ou au clavier (Entrée/Espace), anneau dégradé violet→cyan
// au survol/focus — même technique que src/components/sections/skills.tsx.
export function ProjectCard({ project, onOpen, animateLayout }: ProjectCardProps) {
  const { t, tx } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (cardRef.current) onOpen(project, cardRef.current);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <motion.div
      layout={animateLayout}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ scale: 1.025, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="h-full"
    >
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`${tx(project.title)} — ${t.projects.details}`}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        className="group relative h-full rounded-xl p-[1px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {/* Bordure fine de base */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl border border-border/50 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
        />
        {/* Bordure dégradée violet→cyan au hover/focus */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/70 to-cyan-400/70 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"
        />

        <div className="relative flex flex-col h-full rounded-[calc(0.75rem-1px)] bg-background/60 backdrop-blur-sm overflow-hidden">
          {/* Cover */}
          <div className="relative aspect-[16/10] overflow-hidden bg-muted/30">
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG décoratif local, remplacé plus tard par des captures */}
            <img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {project.featured && (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow">
                <Star size={9} /> {t.projects.featured}
              </span>
            )}

            {/* Voile au survol : dégradé sombre + CTA, ~200ms, instantané si prefers-reduced-motion */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 motion-reduce:transition-none"
            >
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                {t.projects.viewProject}
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </span>
            </div>
          </div>

          {/* Contenu */}
          <div className="flex flex-col flex-1 p-5 gap-3">
            <Badge variant="outline" className="w-fit text-[10px] border-violet-500/30 bg-violet-500/10 text-violet-300 capitalize">
              {t.projects.categories[project.category]}
            </Badge>

            <h3 className="font-bold text-base text-foreground leading-snug line-clamp-2">
              {tx(project.title)}
            </h3>

            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
              {tx(project.description)}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md border border-border/60 bg-muted/40 text-muted-foreground">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-[10px] px-2 py-0.5 text-muted-foreground">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
