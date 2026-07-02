"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ArrowRight, Shield, Server, Activity, Network, Cloud, Cog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { featuredProjects } from "@/data/projects";
import type { Project } from "@/types";

const categoryMeta: Record<string, { icon: React.ReactNode; gradient: string }> = {
  security:       { icon: <Shield size={32} />,   gradient: "from-violet-900/60 to-violet-700/30" },
  infrastructure: { icon: <Server size={32} />,   gradient: "from-blue-900/60 to-blue-700/30" },
  monitoring:     { icon: <Activity size={32} />, gradient: "from-cyan-900/60 to-cyan-700/30" },
  network:        { icon: <Network size={32} />,  gradient: "from-teal-900/60 to-teal-700/30" },
  cloud:          { icon: <Cloud size={32} />,    gradient: "from-sky-900/60 to-sky-700/30" },
  automation:     { icon: <Cog size={32} />,      gradient: "from-indigo-900/60 to-indigo-700/30" },
};

function ProjectCard({ project }: { project: Project }) {
  const meta = categoryMeta[project.category] ?? categoryMeta.infrastructure;

  return (
    <motion.div
      whileHover={{ scale: 1.025, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="h-full"
    >
      <div className="relative flex flex-col h-full rounded-xl border border-border/50 bg-background/60 backdrop-blur-sm overflow-hidden hover:border-violet-500/40 hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] transition-all duration-300">

        {/* Image / bannière dégradée */}
        <div className={`relative aspect-video bg-gradient-to-br ${meta.gradient} flex items-center justify-center overflow-hidden`}>
          <div className="text-white/20">{meta.icon}</div>
          {/* Motif grille subtil */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          {/* Badge "Mis en avant" */}
          {project.featured && (
            <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow">
              Mis en avant
            </span>
          )}
        </div>

        {/* Contenu */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Catégorie */}
          <Badge variant="outline" className="w-fit text-[10px] border-violet-500/30 bg-violet-500/10 text-violet-300 capitalize">
            {project.category}
          </Badge>

          {/* Titre */}
          <h3 className="font-bold text-base text-foreground leading-snug line-clamp-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Badges technos */}
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

          {/* Bouton Détails */}
          <Link
            href={`/projects/${project.slug}`}
            className="mt-1 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow hover:shadow-[0_0_16px_rgba(6,182,212,0.4)] transition-all"
          >
            <Eye size={14} />
            Détails
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30" id="projects">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <FadeIn>
            <style>{`
              @keyframes pulse-violet-s {
                0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 0px rgba(139,92,246,0)); }
                50%       { opacity: 1;   filter: drop-shadow(0 0 6px rgba(139,92,246,0.9)); }
              }
              @keyframes pulse-cyan-s {
                0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 0px rgba(6,182,212,0)); }
                50%       { opacity: 1;   filter: drop-shadow(0 0 6px rgba(6,182,212,0.9)); }
              }
              .line-violet-s { animation: pulse-violet-s 2.4s ease-in-out infinite; }
              .line-cyan-s   { animation: pulse-cyan-s   2.4s ease-in-out infinite 0.4s; }
            `}</style>

            <div className="flex items-center gap-4 mb-1">
              <span
                className="line-violet-s h-px w-10 rounded-full"
                style={{ background: "linear-gradient(to right, transparent, #8b5cf6)" }}
              />
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
                Mes Projets
              </h2>
              <span
                className="line-cyan-s h-px w-10 rounded-full"
                style={{ background: "linear-gradient(to left, transparent, #06b6d4)" }}
              />
            </div>
            <div className="text-lg mb-2">🚀</div>
            <p className="text-muted-foreground mt-1 max-w-xl text-sm">
              Une sélection de mes meilleurs projets en sécurité réseau et administration système.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Link
              href="/projects"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-violet-500/50 transition-all"
            >
              Voir tous les projets
              <ArrowRight size={15} />
            </Link>
          </FadeIn>
        </div>

        {/* Grille */}
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
