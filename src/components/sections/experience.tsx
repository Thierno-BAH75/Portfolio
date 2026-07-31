"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ChevronDown,
  Sparkles,
  Link2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionBackground } from "@/components/ui/section-background";
import { formatDate, cn } from "@/lib/utils";
import type { Education, Experience as ExperienceType } from "@/types";
import { useI18n } from "@/i18n";

// Colonne professionnelle tronquée par défaut : les postes les plus récents
// suffisent à donner le ton, le reste est derrière « Voir plus ».
const VISIBLE_EXPERIENCES = 3;

const STATUS_CLASSES: Record<NonNullable<Education["status"]>, string> = {
  validated: "border-green-500/30 bg-green-500/10 text-green-500",
  ongoing: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  admitted: "border-violet-500/30 bg-violet-500/10 text-violet-400",
};

// Apparition au scroll cohérente avec fadeInUp (motion-wrapper), désactivable
function useFadeProps() {
  const reduce = useReducedMotion();

  return (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: {
            duration: 0.5,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };
}

function ColumnHeader({
  icon: Icon,
  label,
}: {
  icon: typeof Briefcase;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-400">
        <Icon size={20} />
      </div>
      <h3 className="text-xl font-semibold">{label}</h3>
      <div className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
    </div>
  );
}

// Ligne verticale en dégradé + colonne d'items : la ligne (top-1/bottom-1)
// suit toujours la hauteur réelle du conteneur, donc s'allonge naturellement
// quand le contenu se déplie (Voir plus de la colonne professionnelle).
function TimelineShell({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative pl-8">
      <motion.div
        className="absolute left-[5px] top-1 bottom-1 w-[2px] rounded-full bg-gradient-to-b from-violet-500 to-cyan-400"
        initial={reduce ? false : { scaleY: 0, originY: 0 }}
        whileInView={reduce ? undefined : { scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="space-y-8">{children}</div>
    </div>
  );
}

function TimelineDot() {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 ring-4 ring-background"
      initial={reduce ? false : { scale: 0 }}
      whileInView={reduce ? undefined : { scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: 0.15 }}
    />
  );
}

function EducationCard({ edu, index }: { edu: Education; index: number }) {
  const fade = useFadeProps();
  const { t, tx } = useI18n();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div className="relative" {...fade(index * 0.1)}>
      <TimelineDot />
      <div className="bg-card border border-border rounded-xl p-5 hover:border-violet-500/50 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar size={14} />
              {edu.startDate} – {edu.endDate}
            </span>
            {/* Niveau de diplôme : mention discrète à côté de la période */}
            {edu.level && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-border/70 bg-muted/40 text-muted-foreground">
                {tx(edu.level)}
              </span>
            )}
          </span>
          {edu.status && (
            <span
              className={cn(
                "text-[11px] font-medium px-2 py-0.5 rounded-full border",
                STATUS_CLASSES[edu.status]
              )}
            >
              {t.experience.status[edu.status]}
            </span>
          )}
        </div>
        <h4 className="text-lg font-semibold leading-snug">{tx(edu.degree)}</h4>
        <p className="text-violet-400 font-medium text-sm mt-1">{edu.school}</p>
        {edu.location && (
          <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin size={13} />
            {edu.location}
          </p>
        )}
        {edu.note && (
          <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mt-2">
            <Sparkles size={13} className="shrink-0" />
            {tx(edu.note)}
          </p>
        )}
        {/* Résumé court par défaut (line-clamp-2) — hauteur de base cohérente
            avec ExperienceCard, peu importe la longueur réelle de la
            description derrière. */}
        {edu.description && (
          <>
            <p
              className={cn(
                "text-sm text-muted-foreground mt-3",
                !expanded && "line-clamp-2"
              )}
            >
              {tx(edu.description)}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
            >
              {expanded ? t.experience.seeLess : t.experience.seeMore}
              <ChevronDown
                size={14}
                className={cn("transition-transform", expanded && "rotate-180")}
              />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: ExperienceType;
  index: number;
}) {
  const fade = useFadeProps();
  const reduce = useReducedMotion();
  const { t, tx, locale } = useI18n();
  const [expanded, setExpanded] = useState(false);

  const achievements = tx(exp.achievements);
  // Chevauchement d'alternance ponctuel (BTS SIO puis Licence Pro MRIT) —
  // propre à cette expérience précise, pas un champ générique en base.
  const isOverlapping = exp.company === "Hôpital Franco-Britannique";

  return (
    <motion.div className="relative" {...fade(index * 0.1)}>
      <TimelineDot />
      <div className="bg-card border border-border rounded-xl p-5 hover:border-cyan-500/50 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar size={14} />
            {formatDate(exp.startDate, locale)} –{" "}
            {exp.current ? t.experience.present : formatDate(exp.endDate!, locale)}
          </span>
          <span className="flex items-center gap-2">
            {exp.current && (
              <Badge variant="default" className="text-xs">
                {t.experience.current}
              </Badge>
            )}
            <Badge variant="ghost" className="text-xs">
              {t.experience.types[exp.type]}
            </Badge>
          </span>
        </div>
        <h4 className="text-lg font-semibold leading-snug">{tx(exp.title)}</h4>
        <p className="text-cyan-400 font-medium text-sm mt-1">{exp.company}</p>
        <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin size={13} />
          {exp.location}
        </p>
        {isOverlapping && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground/80 mt-1.5">
            <Link2 size={12} className="shrink-0" />
            {t.experience.overlapNote}
          </p>
        )}

        {/* Résumé court par défaut (line-clamp-2) — hauteur de base cohérente
            avec EducationCard ; achievements + impact derrière « Voir plus ». */}
        <p
          className={cn(
            "text-sm text-muted-foreground mt-3",
            !expanded && "line-clamp-2"
          )}
        >
          {tx(exp.description)}
        </p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            >
              <ul className="mt-3 space-y-1.5 text-sm">
                {achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
              {/* Ligne de résultat, mise à part des puces par un filet fin */}
              {exp.impact && (
                <p className="mt-3 pt-3 border-t border-border/60 flex items-start gap-2 text-sm font-medium">
                  <span className="text-violet-400 mt-0.5" aria-hidden="true">
                    →
                  </span>
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {tx(exp.impact)}
                  </span>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
        >
          {expanded ? t.experience.seeLess : t.experience.seeMore}
          <ChevronDown
            size={14}
            className={cn("transition-transform", expanded && "rotate-180")}
          />
        </button>

        <div className="flex flex-wrap gap-2 mt-4">
          {exp.technologies.map((tech) => (
            <span key={tech} className="text-xs px-2 py-1 bg-muted rounded-md">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Experience({
  education,
  experiences,
}: {
  education: Education[];
  experiences: ExperienceType[];
}) {
  const reduce = useReducedMotion();
  const { t } = useI18n();
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const visibleExperiences = experiences.slice(0, VISIBLE_EXPERIENCES);
  const hiddenExperiences = experiences.slice(VISIBLE_EXPERIENCES);

  return (
    <section className="relative overflow-hidden py-20 lg:py-32" id="experience">
      {/* Ancré en haut : crée une transition chromatique avec Compétences
          juste au-dessus, comme entre les autres sections du site (le glow
          d'une section est toujours ce qui marque visuellement sa frontière
          supérieure — bottom-left laissait cette jonction plate). */}
      <SectionBackground glowPosition="top-right" variant="violet" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — même pattern que Skills/Certifications/Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {t.experience.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t.experience.titleStart}{" "}
            <span className="gradient-text">{t.experience.titleGradient}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{t.experience.subtitle}</p>
        </motion.div>

        {/* Double timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 max-w-6xl mx-auto">
          <div>
            <ColumnHeader icon={GraduationCap} label={t.experience.school} />
            <TimelineShell>
              {education.map((edu, index) => (
                <EducationCard key={edu.id} edu={edu} index={index} />
              ))}
            </TimelineShell>
          </div>

          <div>
            <ColumnHeader icon={Briefcase} label={t.experience.professional} />
            <TimelineShell>
              {visibleExperiences.map((exp, index) => (
                <ExperienceCard key={exp.id} exp={exp} index={index} />
              ))}
              {hiddenExperiences.length > 0 && (
                <AnimatePresence initial={false}>
                  {showAllExperiences && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="space-y-8">
                        {hiddenExperiences.map((exp, index) => (
                          <ExperienceCard
                            key={exp.id}
                            exp={exp}
                            index={visibleExperiences.length + index}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </TimelineShell>

            {hiddenExperiences.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAllExperiences((v) => !v)}
                aria-expanded={showAllExperiences}
                className="mt-6 pl-8 flex items-center gap-1.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
              >
                {showAllExperiences
                  ? t.experience.seeLess
                  : `${t.experience.seeMore} (${hiddenExperiences.length})`}
                <ChevronDown
                  size={16}
                  className={cn("transition-transform", showAllExperiences && "rotate-180")}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
