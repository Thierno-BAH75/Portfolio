"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter, StaggerChildren, StaggerItem } from "@/components/animations";
import { skills, skillsByCategory } from "@/data/skills";
import { projects } from "@/data/projects";
import { certifications } from "@/data/experience";
import { useI18n } from "@/i18n";

type CategoryKey = keyof typeof skillsByCategory;

const stats = [
  { value: projects.length, suffix: "", labelKey: "projects" as const },
  { value: certifications.length, suffix: "", labelKey: "certifications" as const },
  { value: 3, suffix: "+", labelKey: "years" as const },
  { value: skills.length, suffix: "", labelKey: "technologies" as const },
];

export function Skills() {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();

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
            pas d'icône, pas de barre, pas de pourcentage */}
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
          staggerDelay={0.08}
        >
          {(Object.entries(skillsByCategory) as [CategoryKey, typeof skills][]).map(
            ([category, categorySkills]) => (
              <StaggerItem key={category}>
                <div className="h-full rounded-2xl border border-border/60 bg-card p-6 hover:border-violet-500/40 transition-colors">
                  <h3 className="font-semibold mb-4">
                    {t.skills.categories[category]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-lg border border-border/60 bg-transparent px-3 py-1 text-sm text-muted-foreground hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            )
          )}
        </StaggerChildren>
      </div>
    </section>
  );
}
