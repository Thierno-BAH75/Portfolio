"use client";

import type { MouseEvent } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Counter, StaggerChildren, StaggerItem } from "@/components/animations";
import { skills, skillsByCategory } from "@/data/skills";
import { projects } from "@/data/projects";
import { certifications } from "@/data/experience";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

type CategoryKey = keyof typeof skillsByCategory;

const stats = [
  { value: projects.length, suffix: "", labelKey: "projects" as const },
  { value: certifications.length, suffix: "", labelKey: "certifications" as const },
  { value: 3, suffix: "+", labelKey: "years" as const },
  { value: skills.length, suffix: "", labelKey: "technologies" as const },
];

// ── Animations de la grille stack ──────────────────────────
// Cascade des cartes, puis micro-cascade des chips à l'intérieur
const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.02,
    },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// Spotlight : coordonnées poussées en CSS vars sur la carte —
// aucun state React, donc zéro re-render par mousemove
function setSpotlight(e: MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
}

export function Skills() {
  const reduceMotion = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <section className="py-16 sm:py-20 lg:py-32" id="skills">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {t.skills.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t.skills.titleStart}{" "}
            <span className="gradient-text">{t.skills.titleGradient}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* Stats */}
        <StaggerChildren
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12 lg:mb-16"
          staggerDelay={0.1}
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.labelKey}>
              <div className="h-full rounded-xl border border-border/60 bg-background/50 px-4 py-6 text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                  {reduceMotion ? (
                    <span>{stat.value}{stat.suffix}</span>
                  ) : (
                    <Counter to={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{t.skills.stats[stat.labelKey]}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Stack — cartes par catégorie, volontairement épurées :
            pas d'icône, pas de barre, pas de pourcentage.
            Entrée en cascade + lift/bordure dégradée/spotlight au hover ;
            sous prefers-reduced-motion : contenu direct, hover = bordure seule */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
          variants={reduceMotion ? undefined : gridVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
        >
          {(Object.entries(skillsByCategory) as [CategoryKey, typeof skills][]).map(
            ([category, categorySkills]) => (
              <motion.div
                key={category}
                variants={reduceMotion ? undefined : cardVariants}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                onMouseMove={reduceMotion ? undefined : setSpotlight}
                className={cn(
                  "group relative h-full rounded-2xl p-[1px]",
                  !reduceMotion &&
                    "transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15),0_0_18px_rgba(34,211,238,0.08)]"
                )}
              >
                {/* Bordure fine de base */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 rounded-2xl border border-border/60 transition-all duration-300",
                    reduceMotion
                      ? "group-hover:border-violet-500/40"
                      : "group-hover:opacity-0"
                  )}
                />
                {/* Bordure dégradée violet→cyan au hover */}
                {!reduceMotion && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/60 to-cyan-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}

                <div className="relative h-full rounded-[calc(1rem-1px)] bg-card p-6 overflow-hidden">
                  {/* Spotlight radial discret qui suit la souris */}
                  {!reduceMotion && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(139,92,246,0.10), rgba(34,211,238,0.05) 45%, transparent 70%)",
                      }}
                    />
                  )}

                  <h3 className="relative font-semibold mb-4">
                    {t.skills.categories[category]}
                  </h3>
                  <div className="relative flex flex-wrap gap-2">
                    {categorySkills.map((skill) => {
                      const name =
                        typeof skill.name === "string" ? skill.name : skill.name[locale];
                      return (
                        <motion.span
                          key={typeof skill.name === "string" ? skill.name : skill.name.fr}
                          variants={reduceMotion ? undefined : chipVariants}
                          className="rounded-lg border border-border/60 bg-transparent px-3 py-1 text-sm text-muted-foreground hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                        >
                          {name}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
