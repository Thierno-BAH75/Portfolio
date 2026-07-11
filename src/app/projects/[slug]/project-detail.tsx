"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Calendar,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import { MarkdownContent } from "@/components/projects/markdown-content";
import { ResultsGrid } from "@/components/projects/results-grid";
import { ChallengesSection } from "@/components/projects/challenges-section";
import type { Project } from "@/types";

function splitTitleForGradient(title: string) {
  const words = title.trim().split(" ");
  const gradient = words.pop() ?? "";
  return { start: words.join(" "), gradient };
}

function useFadeProps() {
  const reduce = useReducedMotion();
  return (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };
}

export function ProjectDetail({
  project,
  allProjects,
}: {
  project: Project;
  allProjects: Project[];
}) {
  const { t, tx, locale } = useI18n();
  const fade = useFadeProps();

  // Best-effort, une fois par montage — l'anti-abus (cookie 24h/projet) est
  // géré côté serveur par la route elle-même.
  useEffect(() => {
    fetch(`/api/projects/${project.slug}/view`, { method: "POST" }).catch(() => {});
  }, [project.slug]);

  const { start, gradient } = splitTitleForGradient(tx(project.title));
  const hasLinks = Boolean(
    project.links.live || project.links.demo || project.links.github
  );

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return (
    <div className="pt-20 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fade()}>
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-violet-500/50 transition-all"
          >
            <ArrowLeft size={16} />
            {t.projects.detail.back}
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <motion.div className="mb-8" {...fade(0.05)}>
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 mb-4 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow">
                <Star size={11} />
                {t.projects.detail.featuredBadge}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              {start && <span>{start} </span>}
              <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                {gradient}
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-4">
              {tx(project.description)}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="capitalize border-violet-500/30 bg-violet-500/10 text-violet-300">
                {t.projects.categories[project.category]}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Calendar size={14} className="mr-1.5" />
                {formatDate(project.date, locale)}
              </span>
            </div>
          </motion.div>

          {/* Cover */}
          <motion.div {...fade(0.1)}>
            <div className="relative aspect-[16/10] w-full mb-10 rounded-2xl border border-border/60 overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.12)]">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG décoratif local */}
              <img
                src={project.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Liens */}
          {hasLinks && (
            <motion.div className="flex flex-wrap gap-4 mb-12" {...fade(0.15)}>
              {(project.links.live || project.links.demo) && (
                <a
                  href={project.links.live ?? project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold shadow hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
                >
                  <ExternalLink size={16} />
                  {t.projects.detail.viewSite}
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border/60 text-sm font-semibold hover:border-violet-500/50 transition-colors"
                >
                  <Github size={16} />
                  {t.projects.detail.sourceCode}
                </a>
              )}
            </motion.div>
          )}

          {/* Description longue (Markdown) */}
          <motion.div className="mb-10" {...fade(0.2)}>
            <h2 className="text-xl font-semibold mb-4">{t.projects.detail.about}</h2>
            <MarkdownContent
              content={tx(project.longDescription ?? project.description)}
            />
          </motion.div>

          {/* Diagramme d'architecture */}
          {project.architectureDiagram && (
            <motion.div className="mb-10" {...fade(0.22)}>
              <h2 className="text-xl font-semibold mb-4">{t.projects.detail.architecture}</h2>
              <div className="rounded-2xl border border-border/60 overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.08)]">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG d'architecture local */}
                <img
                  src={project.architectureDiagram}
                  alt=""
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          )}

          {/* Technologies */}
          <motion.div className="mb-10" {...fade(0.24)}>
            <h2 className="text-xl font-semibold mb-3">{t.projects.detail.technologies}</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-muted rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Résultats chiffrés */}
          {project.metrics && project.metrics.length > 0 && (
            <motion.div className="mb-10" {...fade(0.26)}>
              <ResultsGrid
                metrics={project.metrics}
                locale={locale}
                title={t.projects.detail.metrics}
              />
            </motion.div>
          )}

          {/* Défis rencontrés */}
          {project.challenges && project.challenges.length > 0 && (
            <motion.div className="mb-10" {...fade(0.28)}>
              <ChallengesSection
                challenges={project.challenges}
                locale={locale}
                title={t.projects.detail.challenges}
                labelProblem={t.projects.detail.challengeProblem}
                labelSolution={t.projects.detail.challengeSolution}
              />
            </motion.div>
          )}

          {/* Navigation projet précédent / suivant */}
          <motion.div
            className="mt-16 pt-8 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-4"
            {...fade(0.3)}
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col gap-1 rounded-xl border border-border/60 p-4 hover:border-violet-500/50 transition-colors"
              >
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowLeft size={13} />
                  {t.projects.detail.previous}
                </span>
                <span className="font-medium text-sm text-foreground group-hover:text-violet-300 transition-colors line-clamp-1">
                  {tx(prevProject.title)}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className={cn(
                  "group flex flex-col gap-1 rounded-xl border border-border/60 p-4 hover:border-cyan-500/50 transition-colors text-right",
                  "sm:items-end"
                )}
              >
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  {t.projects.detail.next}
                  <ArrowRight size={13} />
                </span>
                <span className="font-medium text-sm text-foreground group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {tx(nextProject.title)}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>

          <motion.div className="mt-6 text-center" {...fade(0.32)}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-violet-500/50 transition-all"
            >
              <ArrowLeft size={16} />
              {t.projects.detail.back}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
