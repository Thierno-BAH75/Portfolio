"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Briefcase, BadgeCheck, Sprout } from "lucide-react";
import { Counter, StaggerChildren, StaggerItem } from "@/components/animations";
import { SectionBackground } from "@/components/ui/section-background";
import { SkillsTerminal } from "./skills-terminal";
import { useI18n } from "@/i18n";
import { useHashLinkClick } from "@/hooks/use-hash-link-click";
import { cn } from "@/lib/utils";
import type { PersonalInfo } from "@/lib/data";
import type { Certification, Experience, Project, Skill, SkillCategory } from "@/types";

type CategoryKey = SkillCategory;

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

function skillKey(skill: Skill): string {
  return typeof skill.name === "string" ? skill.name : skill.name.fr;
}

// Chip d'une compétence maîtrisée : nom + badges de preuve éventuels
// (expérience attestante, certification). Les preuves sont choisies en
// admin — jamais déduites ici. Sans preuve : chip simple, aucun trou.
function SkillChip({
  skill,
  experienceById,
  certificationById,
  reduceMotion,
}: {
  skill: Skill;
  experienceById: Map<string, Experience>;
  certificationById: Map<string, Certification>;
  reduceMotion: boolean | null;
}) {
  const { t, tx, locale } = useI18n();
  const handleHashClick = useHashLinkClick();
  const name = typeof skill.name === "string" ? skill.name : skill.name[locale];

  const proofExperience = skill.proofExperienceId
    ? experienceById.get(skill.proofExperienceId)
    : undefined;
  const relatedCert = skill.relatedCertificationId
    ? certificationById.get(skill.relatedCertificationId)
    : undefined;
  const hasBadges = !!proofExperience || !!skill.isCertified;

  return (
    <motion.span
      variants={reduceMotion ? undefined : chipVariants}
      className={cn(
        "rounded-lg border border-border/60 bg-transparent px-3 py-1 text-sm text-muted-foreground hover:border-cyan-400/50 hover:text-cyan-300 transition-colors",
        hasBadges && "flex flex-col items-start gap-1 py-1.5"
      )}
    >
      {name}
      {hasBadges && (
        <span className="flex flex-wrap gap-1">
          {proofExperience && (
            <Link
              href="/#experience"
              onClick={(e) => handleHashClick(e, "/#experience")}
              className="inline-flex items-center gap-1 max-w-[220px] truncate rounded-full border border-cyan-500/25 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-medium text-cyan-400 hover:border-cyan-400/60 hover:bg-cyan-500/20 transition-colors"
            >
              <Briefcase size={9} className="shrink-0" />
              {t.skills.proof.usedAt} {proofExperience.company}
            </Link>
          )}
          {skill.isCertified && (
            <Link
              href="/certifications"
              className="inline-flex items-center gap-1 max-w-[220px] truncate rounded-full border border-violet-500/25 bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-medium text-violet-400 hover:border-violet-400/60 hover:bg-violet-500/20 transition-colors"
            >
              <BadgeCheck size={9} className="shrink-0" />
              {t.skills.proof.certified}
              {relatedCert ? ` ${tx(relatedCert.name)}` : ""}
            </Link>
          )}
        </span>
      )}
    </motion.span>
  );
}

export function Skills({
  skills,
  skillsByCategory,
  projectCount,
  certificationCount,
  experiences,
  certifications,
  featuredProjects,
  personalInfo,
}: {
  skills: Skill[];
  skillsByCategory: Record<SkillCategory, Skill[]>;
  projectCount: number;
  certificationCount: number;
  experiences: Experience[];
  certifications: Certification[];
  featuredProjects: Project[];
  personalInfo: PersonalInfo;
}) {
  const reduceMotion = useReducedMotion();
  const { t, locale } = useI18n();

  const experienceById = new Map(experiences.map((exp) => [exp.id, exp]));
  const certificationById = new Map(
    certifications.filter((c): c is Certification & { id: string } => !!c.id).map((c) => [c.id, c])
  );

  // Les compétences en apprentissage vivent dans leur propre sous-section,
  // jamais mélangées aux maîtrisées
  const learningSkills = skills.filter((s) => s.isLearning);
  const masteredCount = skills.length - learningSkills.length;

  const stats = [
    { value: projectCount, suffix: "", labelKey: "projects" as const },
    { value: certificationCount, suffix: "", labelKey: "certifications" as const },
    { value: 3, suffix: "+", labelKey: "years" as const },
    { value: masteredCount, suffix: "", labelKey: "technologies" as const },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-32" id="skills">
      <SectionBackground glowPosition="top-right" variant="cyan" />
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

        {/* Stack — cartes par catégorie, volontairement épurées.
            Entrée en cascade + lift/bordure dégradée/spotlight au hover ;
            sous prefers-reduced-motion : contenu direct, hover = bordure seule */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
          variants={reduceMotion ? undefined : gridVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
        >
          {(Object.entries(skillsByCategory) as [CategoryKey, Skill[]][]).map(
            ([category, categorySkills]) => {
              const mastered = categorySkills.filter((s) => !s.isLearning);
              if (mastered.length === 0) return null;
              return (
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
                      {mastered.map((skill) => (
                        <SkillChip
                          key={skillKey(skill)}
                          skill={skill}
                          experienceById={experienceById}
                          certificationById={certificationById}
                          reduceMotion={reduceMotion}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            }
          )}
        </motion.div>

        {/* Sous-section "En cours d'apprentissage" — style volontairement
            distinct (pointillés, ton amber discret) pour ne jamais se
            confondre avec les compétences maîtrisées */}
        {learningSkills.length > 0 && (
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto mt-10"
          >
            <div className="rounded-2xl border border-dashed border-border p-6">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400">
                  <Sprout size={14} />
                </span>
                <h3 className="font-semibold">{t.skills.learning.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{t.skills.learning.hint}</p>
              <div className="flex flex-wrap gap-2">
                {learningSkills.map((skill) => {
                  const name = typeof skill.name === "string" ? skill.name : skill.name[locale];
                  return (
                    <span
                      key={skillKey(skill)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-amber-500/30 bg-amber-500/[0.04] px-3 py-1 text-sm text-muted-foreground"
                    >
                      <Sprout size={12} className="text-amber-400/80 shrink-0" />
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Terminal : API publique réelle + CLI whitelist */}
        <SkillsTerminal
          certifications={certifications}
          featuredProjects={featuredProjects}
          personalInfo={personalInfo}
        />
      </div>
    </section>
  );
}
