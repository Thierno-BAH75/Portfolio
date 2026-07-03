"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { education, experiences, certifications } from "@/data/experience";
import { formatDate, cn } from "@/lib/utils";
import type { Education, Experience as ExperienceType } from "@/types";

const VISIBLE_ACHIEVEMENTS = 2;

const STATUS_STYLES: Record<
  NonNullable<Education["status"]>,
  { label: string; className: string }
> = {
  validated: {
    label: "Validé",
    className: "border-green-500/30 bg-green-500/10 text-green-500",
  },
  ongoing: {
    label: "En cours",
    className: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  },
  admitted: {
    label: "Admis",
    className: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  },
};

const TYPE_LABELS: Record<ExperienceType["type"], string> = {
  fulltime: "CDI",
  parttime: "Temps partiel",
  freelance: "Freelance",
  internship: "Stage",
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

function TimelineShell({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative pl-8">
      {/* Ligne verticale en dégradé violet→cyan */}
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
  const status = edu.status ? STATUS_STYLES[edu.status] : null;

  return (
    <motion.div className="relative" {...fade(index * 0.1)}>
      <TimelineDot />
      <div className="bg-card border border-border rounded-xl p-5 hover:border-violet-500/50 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar size={14} />
            {edu.startDate} – {edu.endDate}
          </span>
          {status && (
            <span
              className={cn(
                "text-[11px] font-medium px-2 py-0.5 rounded-full border",
                status.className
              )}
            >
              {status.label}
            </span>
          )}
        </div>
        <h4 className="text-lg font-semibold leading-snug">{edu.degree}</h4>
        <p className="text-violet-400 font-medium text-sm mt-1">{edu.school}</p>
        <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin size={13} />
          {edu.location}
        </p>
        {edu.description && (
          <p className="text-sm text-muted-foreground mt-3">{edu.description}</p>
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
  const [expanded, setExpanded] = useState(false);

  const visible = exp.achievements.slice(0, VISIBLE_ACHIEVEMENTS);
  const hidden = exp.achievements.slice(VISIBLE_ACHIEVEMENTS);

  return (
    <motion.div className="relative" {...fade(index * 0.1)}>
      <TimelineDot />
      <div className="bg-card border border-border rounded-xl p-5 hover:border-cyan-500/50 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar size={14} />
            {formatDate(exp.startDate)} –{" "}
            {exp.current ? "Présent" : formatDate(exp.endDate!)}
          </span>
          <span className="flex items-center gap-2">
            {exp.current && (
              <Badge variant="default" className="text-xs">
                Actuel
              </Badge>
            )}
            <Badge variant="ghost" className="text-xs">
              {TYPE_LABELS[exp.type]}
            </Badge>
          </span>
        </div>
        <h4 className="text-lg font-semibold leading-snug">{exp.title}</h4>
        <p className="text-cyan-400 font-medium text-sm mt-1">{exp.company}</p>
        <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin size={13} />
          {exp.location}
        </p>

        {/* Points clés : 2 visibles, le reste derrière « Voir plus » */}
        <ul className="mt-3 space-y-1.5 text-sm">
          {visible.map((achievement) => (
            <li key={achievement} className="flex items-start gap-2 text-muted-foreground">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
        {hidden.length > 0 && (
          <>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.ul
                  className="space-y-1.5 text-sm overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                >
                  {hidden.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex items-start gap-2 text-muted-foreground first:mt-1.5"
                    >
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {expanded ? "Voir moins" : `Voir plus (${hidden.length})`}
              <ChevronDown
                size={14}
                className={cn("transition-transform", expanded && "rotate-180")}
              />
            </button>
          </>
        )}

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

export function Experience() {
  const fade = useFadeProps();

  return (
    <section className="py-20 lg:py-32" id="experience">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center max-w-2xl mx-auto mb-16" {...fade()}>
          <Badge variant="outline" className="mb-4">
            Formation & Expérience
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Mon <span className="gradient-text">parcours</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Formation académique d&apos;un côté, expérience professionnelle de
            l&apos;autre — deux fils d&apos;un même parcours.
          </p>
        </motion.div>

        {/* Double timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 max-w-6xl mx-auto">
          <div>
            <ColumnHeader icon={GraduationCap} label="Scolaire" />
            <TimelineShell>
              {education.map((edu, index) => (
                <EducationCard key={edu.id} edu={edu} index={index} />
              ))}
            </TimelineShell>
          </div>

          <div>
            <ColumnHeader icon={Briefcase} label="Professionnel" />
            <TimelineShell>
              {experiences.map((exp, index) => (
                <ExperienceCard key={exp.id} exp={exp} index={index} />
              ))}
            </TimelineShell>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16 lg:mt-20 max-w-5xl mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-8 max-w-md mx-auto"
            {...fade()}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-violet-500/40" />
            <span className="flex items-center gap-2 text-lg font-semibold">
              <Award size={18} className="text-violet-400" />
              Certifications
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-cyan-500/40" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-background/50 px-3.5 py-2"
                {...fade(index * 0.05)}
              >
                <Award size={16} className="text-cyan-400 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium leading-tight">
                    {cert.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {cert.issuer}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
