"use client";

import { Fragment, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionBackground } from "@/components/ui/section-background";
import { formatDate, cn } from "@/lib/utils";
import type { Education, Experience as ExperienceType } from "@/types";
import { useI18n } from "@/i18n";

const VISIBLE_ACHIEVEMENTS = 2;

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

// Ligne verticale dégradée d'une colonne entière — élément de grille à part
// entière, placé sur toutes les lignes (row-span complet) pour traverser
// visuellement les éventuelles cellules vides. Desktop uniquement : en
// mobile les deux colonnes sont fusionnées en une seule liste, une ligne
// "par colonne" n'aurait plus de sens.
function ColumnLine({ column, totalRows }: { column: 1 | 2; totalRows: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="hidden lg:block ml-[5px] w-[2px] rounded-full bg-gradient-to-b from-violet-500 to-cyan-400"
      style={{ gridColumn: column, gridRow: `1 / ${totalRows + 1}` }}
      initial={reduce ? false : { scaleY: 0, originY: 0 }}
      whileInView={reduce ? undefined : { scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  );
}

// Emplacement d'une carte dans la grille : pl-8 fait la place au point de
// timeline (dessiné par chaque carte elle-même, cf. TimelineDot) — inerte
// tant que le parent n'est pas en display:grid (mobile = flex-col, l'empan
// ligne/colonne est simplement ignoré par le navigateur).
function TimelineNode({
  column,
  row,
  children,
}: {
  column: 1 | 2;
  row: number;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-8 lg:self-start" style={{ gridColumn: column, gridRow: row }}>
      {children}
    </div>
  );
}

function SeekingPlaceholder() {
  const { t } = useI18n();

  return (
    <div className="relative">
      <TimelineDot />
      <div className="rounded-xl border border-dashed border-border/60 px-5 py-4 flex items-center gap-2.5 text-sm text-muted-foreground">
        <Sparkles size={15} className="text-amber-400 shrink-0" />
        {t.experience.seekingPlaceholder}
      </div>
    </div>
  );
}

function EducationCard({ edu, index }: { edu: Education; index: number }) {
  const fade = useFadeProps();
  const { t, tx } = useI18n();

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
        {edu.description && (
          <p className="text-sm text-muted-foreground mt-3">{tx(edu.description)}</p>
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
  const visible = achievements.slice(0, VISIBLE_ACHIEVEMENTS);
  const hidden = achievements.slice(VISIBLE_ACHIEVEMENTS);

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
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                >
                  <ul className="mt-1.5 space-y-1.5 text-sm">
                    {hidden.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
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
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {expanded ? t.experience.seeLess : `${t.experience.seeMore} (${hidden.length})`}
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

interface RowDef {
  key: string;
  education?: Education;
  experiences: ExperienceType[];
  seekingPlaceholder?: boolean;
}

function findEdu(list: Education[], keyword: string): Education | undefined {
  return list.find((e) => e.degree.fr.toLowerCase().includes(keyword));
}

function findExp(list: ExperienceType[], keyword: string): ExperienceType | undefined {
  return list.find((e) => e.company.toLowerCase().includes(keyword));
}

// Appariement scolaire ↔ professionnel par période — propre à ce parcours
// précis (le schéma Supabase n'a aucune notion de "ligne" partagée entre les
// deux tables), donc identifié par mots-clés stables (diplôme / entreprise)
// plutôt que par un ordre de tri générique. Toute entrée qui ne correspond à
// aucun mot-clé connu (nouvelle formation ou expérience ajoutée en admin)
// est ajoutée en fin de grille sur sa propre ligne plutôt que d'être
// silencieusement perdue.
function buildRows(education: Education[], experiences: ExperienceType[]): RowDef[] {
  const bts = findEdu(education, "bts sio");
  const licencePro = findEdu(education, "licence pro");
  const mastereCare = findEdu(education, "care");
  const masterIrs = findEdu(education, "irs");

  const w3tel = findExp(experiences, "w3tel");
  const cortechs = findExp(experiences, "cortechs");
  const hfb = findExp(experiences, "franco-britannique");
  const kiss = findExp(experiences, "kiss");
  const axa = findExp(experiences, "axa");

  const matchedEduIds = new Set(
    [bts, licencePro, mastereCare, masterIrs].filter((e): e is Education => !!e).map((e) => e.id)
  );
  const matchedExpIds = new Set(
    [w3tel, cortechs, hfb, kiss, axa].filter((e): e is ExperienceType => !!e).map((e) => e.id)
  );

  const rows: RowDef[] = [
    {
      key: "bts",
      education: bts,
      experiences: [w3tel, cortechs].filter((e): e is ExperienceType => !!e),
    },
    { key: "licence-pro", education: licencePro, experiences: hfb ? [hfb] : [] },
    { key: "mastere-care", education: mastereCare, experiences: kiss ? [kiss] : [] },
    { key: "axa", experiences: axa ? [axa] : [] },
    { key: "master-irs", education: masterIrs, experiences: [], seekingPlaceholder: true },
  ];

  education
    .filter((e) => !matchedEduIds.has(e.id))
    .forEach((e) => rows.push({ key: `edu-${e.id}`, education: e, experiences: [] }));
  experiences
    .filter((e) => !matchedExpIds.has(e.id))
    .forEach((e) => rows.push({ key: `exp-${e.id}`, experiences: [e] }));

  return rows.filter((r) => r.education || r.experiences.length > 0 || r.seekingPlaceholder);
}

export function Experience({
  education,
  experiences,
}: {
  education: Education[];
  experiences: ExperienceType[];
}) {
  const fade = useFadeProps();
  const { t } = useI18n();
  const rows = useMemo(() => buildRows(education, experiences), [education, experiences]);
  const totalRows = rows.length;

  return (
    <section className="relative overflow-hidden py-20 lg:py-32" id="experience">
      <SectionBackground glowPosition="bottom-left" variant="violet" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center max-w-2xl mx-auto mb-16" {...fade()}>
          <Badge variant="outline" className="mb-4">
            {t.experience.badge}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t.experience.titleStart}{" "}
            <span className="gradient-text">{t.experience.titleGradient}</span>
          </h2>
          <p className="text-muted-foreground mt-4">{t.experience.subtitle}</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* En-têtes de colonnes — desktop uniquement : en mobile les cartes
              scolaires/professionnelles sont déjà groupées par ligne, un
              label de colonne séparé n'apporterait rien. */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-10">
            <ColumnHeader icon={GraduationCap} label={t.experience.school} />
            <ColumnHeader icon={Briefcase} label={t.experience.professional} />
          </div>

          {/* Grille alignée ligne par ligne : chaque paire scolaire/pro
              partage la même row-track CSS, qui se dimensionne automatiquement
              sur la carte la plus haute des deux — c'est ce qui garantit
              l'alignement, sans mesure JS. En mobile, simple pile (flex-col) :
              l'ordre du DOM (une ligne = école puis pro) assure le groupement. */}
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-10">
            <ColumnLine column={1} totalRows={totalRows} />
            <ColumnLine column={2} totalRows={totalRows} />

            {rows.map((row, i) => {
              const rowNumber = i + 1;
              return (
                <Fragment key={row.key}>
                  {row.education && (
                    <TimelineNode column={1} row={rowNumber}>
                      <EducationCard edu={row.education} index={i} />
                    </TimelineNode>
                  )}
                  {row.experiences.length > 0 && (
                    <TimelineNode column={2} row={rowNumber}>
                      <div className="flex flex-col gap-4">
                        {row.experiences.map((exp, j) => (
                          <ExperienceCard key={exp.id} exp={exp} index={i + j} />
                        ))}
                      </div>
                    </TimelineNode>
                  )}
                  {row.seekingPlaceholder && (
                    <TimelineNode column={2} row={rowNumber}>
                      <SeekingPlaceholder />
                    </TimelineNode>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
