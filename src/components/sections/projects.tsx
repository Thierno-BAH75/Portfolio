"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectPanel } from "@/components/projects/project-panel";
import { useProjectPanel } from "@/components/projects/use-project-panel";
import { SectionBackground } from "@/components/ui/section-background";
import { useI18n } from "@/i18n";
import type { Project } from "@/types";

export function Projects({ featuredProjects }: { featuredProjects: Project[] }) {
  const { t } = useI18n();
  const { project, open, close } = useProjectPanel();

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-muted/30" id="projects">
      <SectionBackground glowPosition="top-center" variant="dual" />
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
                {t.projects.title}
              </h2>
              <span
                className="line-cyan-s h-px w-10 rounded-full"
                style={{ background: "linear-gradient(to left, transparent, #06b6d4)" }}
              />
            </div>
            <div className="text-lg mb-2">🚀</div>
            <p className="text-muted-foreground mt-1 max-w-xl text-sm">
              {t.projects.sectionSubtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Link
              href="/projects"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-violet-500/50 transition-all"
            >
              {t.projects.viewAll}
              <ArrowRight size={15} />
            </Link>
          </FadeIn>
        </div>

        {/* Grille */}
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {featuredProjects.map((proj) => (
            <StaggerItem key={proj.id}>
              <ProjectCard project={proj} onOpen={open} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      <ProjectPanel project={project} onClose={close} />
    </section>
  );
}
