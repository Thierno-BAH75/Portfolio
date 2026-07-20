"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown, ChevronRight, X, Terminal } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { BackToHomeLink } from "@/components/ui/back-to-home-link";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectPanel } from "@/components/projects/project-panel";
import { useProjectPanel } from "@/components/projects/use-project-panel";
import { useI18n } from "@/i18n";
import type { Project } from "@/types";

/* ── Groupes de technologies ────────────────────────────── */
const techGroups = [
  { labelKey: "network" as const,    items: ["pfSense", "VLANs", "LAG", "SFP+", "Netgear"] },
  { labelKey: "system" as const,     items: ["Proxmox", "Hyper-V", "Windows Server", "Ubuntu Server", "iDRAC", "RAID 10"] },
  { labelKey: "monitoring" as const, items: ["Zabbix", "Grafana", "SNMP", "IPMI", "Slack API"] },
  { labelKey: "security" as const,   items: ["Active Directory", "GPO", "pfSense", "VPN"] },
  { labelKey: "automation" as const, items: ["Python", "Bash", "PowerShell", "MySQL"] },
];

type SortOption = "featured" | "recent" | "name";

/* ── Filtre en cascade ──────────────────────────────────── */
function CascadeFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (tech: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const groupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { t } = useI18n();

  const clearClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => { setOpen(false); setHoveredGroup(null); }, 180);
  };
  const scheduleGroup = (label: string) => {
    if (groupTimer.current) clearTimeout(groupTimer.current);
    groupTimer.current = setTimeout(() => setHoveredGroup(label), 60);
  };

  const label = value || t.projects.page.allCategories;

  return (
    <div
      className="relative"
      onMouseEnter={clearClose}
      onMouseLeave={scheduleClose}
    >
      {/* Bouton déclencheur */}
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => { clearClose(); setOpen(true); }}
        className={`inline-flex items-center gap-2 pl-3.5 pr-3 py-2 rounded-lg border text-sm transition-all min-w-[190px] justify-between ${
          value
            ? "border-violet-500/60 bg-violet-500/10 text-violet-700 dark:text-violet-300"
            : "border-border/50 bg-card text-foreground hover:border-border/80"
        }`}
      >
        <span className="truncate">{label}</span>
        <div className="flex items-center gap-1 flex-shrink-0">
          {value && (
            <span
              onClick={(e) => { e.stopPropagation(); onChange(""); setOpen(false); }}
              className="hover:text-red-400 transition"
            >
              <X size={12} />
            </span>
          )}
          <ChevronDown size={13} className="text-muted-foreground" />
        </div>
      </button>

      {/* Menu principal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={clearClose}
            className="absolute left-0 top-full mt-1 z-50 w-52 rounded-xl border border-border/60 bg-card shadow-xl"
          >
            {techGroups.map((group) => (
              <div
                key={group.labelKey}
                className="relative"
                onMouseEnter={() => { clearClose(); scheduleGroup(group.labelKey); }}
              >
                <button
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm transition-colors ${
                    hoveredGroup === group.labelKey
                      ? "bg-violet-500/15 text-violet-700 dark:text-violet-300"
                      : "text-foreground hover:bg-muted/50"
                  }`}
                >
                  {t.projects.page.techGroups[group.labelKey]}
                  <ChevronRight size={13} className="text-muted-foreground flex-shrink-0" />
                </button>

                {/* Sous-menu — rendu dans le flux pour rester dans les bounds hover */}
                <AnimatePresence>
                  {hoveredGroup === group.labelKey && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.12 }}
                      onMouseEnter={clearClose}
                      className="absolute left-full top-0 ml-0.5 w-48 rounded-xl border border-violet-500/30 bg-card shadow-xl z-50 overflow-hidden"
                    >
                      {/* Pont invisible — comble le gap entre menu et sous-menu */}
                      <div className="absolute -left-2 top-0 w-2 h-full" />
                      {group.items.map((tech) => (
                        <button
                          key={tech}
                          onClick={() => { onChange(tech); setOpen(false); setHoveredGroup(null); }}
                          className={`w-full text-left px-3.5 py-2.5 text-sm transition-colors ${
                            value === tech
                              ? "bg-violet-600 text-white font-medium"
                              : "text-foreground hover:bg-cyan-500/10 hover:text-cyan-700 dark:hover:text-cyan-300"
                          }`}
                        >
                          {tech}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export function ProjectsPageClient({ projects }: { projects: Project[] }) {
  const [activeTech, setActiveTech] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [search, setSearch] = useState("");
  const { t, tx, locale } = useI18n();
  const { project: openProject, open, close } = useProjectPanel();

  const filtered = useMemo(() => {
    let result = projects;

    // Filtre technologie par groupe
    if (activeTech) {
      result = result.filter((p) =>
        p.technologies.some((tech) => tech === activeTech)
      );
    }

    // Filtre recherche — dans la langue active
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          tx(p.title).toLowerCase().includes(q) ||
          tx(p.description).toLowerCase().includes(q) ||
          p.technologies.some((tech) => tech.toLowerCase().includes(q))
      );
    }

    // Tri
    if (sortOption === "featured") {
      result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    } else if (sortOption === "recent") {
      result = [...result].sort((a, b) => b.date.localeCompare(a.date));
    } else if (sortOption === "name") {
      result = [...result].sort((a, b) =>
        tx(a.title).localeCompare(tx(b.title), locale)
      );
    }

    return result;
  }, [projects, activeTech, sortOption, search, tx, locale]);

  return (
    <div className="relative pt-20 pb-20 overflow-hidden">

      {/* ── Fond cyber (copié de about.tsx) ── */}
      <style>{`
        .projects-bg { background-color: hsl(var(--background)); }
        .projects-grid {
          background-image:
            radial-gradient(circle, rgba(139,92,246,0.26) 1px, transparent 1px),
            radial-gradient(circle, rgba(6,182,212,0.15) 1px, transparent 1px);
          background-size: 32px 32px, 64px 64px;
          background-position: 0 0, 16px 16px;
        }
        .projects-corner-tl {
          background: radial-gradient(ellipse at top left, rgba(139,92,246,0.30) 0%, transparent 55%);
        }
        .projects-corner-br {
          background: radial-gradient(ellipse at bottom right, rgba(6,182,212,0.22) 0%, transparent 55%);
        }
        .projects-corner-tr {
          background: radial-gradient(ellipse at top right, rgba(59,130,246,0.18) 0%, transparent 50%);
        }
        .projects-corner-bl {
          background: radial-gradient(ellipse at bottom left, rgba(139,92,246,0.14) 0%, transparent 50%);
        }
        .projects-blob-center {
          background: radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 65%);
        }
      `}</style>
      <div className="projects-bg absolute inset-0 -z-10" />
      <div className="projects-grid absolute inset-0 -z-10 opacity-60" />
      <div className="projects-corner-tl absolute inset-0 -z-10" />
      <div className="projects-corner-br absolute inset-0 -z-10" />
      <div className="projects-corner-tr absolute inset-0 -z-10" />
      <div className="projects-corner-bl absolute inset-0 -z-10" />
      <div className="projects-blob-center absolute inset-0 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <BackToHomeLink href="/#projects" />

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-10 pt-8">
            <style>{`
              @keyframes pulse-violet-p {
                0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 0px rgba(139,92,246,0)); }
                50%       { opacity: 1;   filter: drop-shadow(0 0 6px rgba(139,92,246,0.9)); }
              }
              @keyframes pulse-cyan-p {
                0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 0px rgba(6,182,212,0)); }
                50%       { opacity: 1;   filter: drop-shadow(0 0 6px rgba(6,182,212,0.9)); }
              }
              .line-violet-p { animation: pulse-violet-p 2.4s ease-in-out infinite; }
              .line-cyan-p   { animation: pulse-cyan-p   2.4s ease-in-out infinite 0.4s; }

              @keyframes icon-float {
                0%, 100% { transform: translateY(0px); }
                50%       { transform: translateY(-7px); }
              }
              .icon-float { animation: icon-float 2.2s ease-in-out infinite; }

              @keyframes dot-p-left {
                0%   { opacity: 0; box-shadow: none; }
                5%   { opacity: 1; box-shadow: 0 0 8px 3px rgba(139,92,246,0.9); }
                20%  { opacity: 1; box-shadow: 0 0 8px 3px rgba(139,92,246,0.9); }
                35%  { opacity: 0; box-shadow: none; }
                100% { opacity: 0; box-shadow: none; }
              }
              @keyframes dot-p-right {
                0%   { opacity: 0; box-shadow: none; }
                45%  { opacity: 0; box-shadow: none; }
                55%  { opacity: 1; box-shadow: 0 0 8px 3px rgba(6,182,212,0.9); }
                70%  { opacity: 1; box-shadow: 0 0 8px 3px rgba(6,182,212,0.9); }
                85%  { opacity: 0; box-shadow: none; }
                100% { opacity: 0; box-shadow: none; }
              }
              .dot-p-left  { animation: dot-p-left  3.6s ease-in-out infinite; background: #8b5cf6; }
              .dot-p-right { animation: dot-p-right 3.6s ease-in-out infinite; background: #06b6d4; }
            `}</style>

            {/* Icône Terminal flottante */}
            <div className="flex justify-center mb-3">
              <span className="icon-float inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30">
                <Terminal className="w-5 h-5 text-cyan-400" />
              </span>
            </div>

            {/* Titre avec lignes animées + ronds clignotants */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <span
                className="line-violet-p h-px flex-1 max-w-[120px] rounded-full"
                style={{ background: "linear-gradient(to right, transparent, #8b5cf6)" }}
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="dot-p-left w-3 h-3 rounded-full flex-shrink-0" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
                  {t.projects.title}
                </h1>
                <span className="dot-p-right w-3 h-3 rounded-full flex-shrink-0" />
              </div>
              <span
                className="line-cyan-p h-px flex-1 max-w-[120px] rounded-full"
                style={{ background: "linear-gradient(to left, transparent, #06b6d4)" }}
              />
            </div>

            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              {t.projects.page.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* Barre de recherche — pleine largeur */}
        <FadeIn delay={0.1}>
          <div className="relative max-w-3xl mx-auto mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t.projects.page.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-card text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_0_1px_rgba(6,182,212,0.3),0_0_12px_rgba(6,182,212,0.15)] transition-all duration-200"
            />
          </div>
        </FadeIn>

        {/* Filtres — dropdowns centrés */}
        <FadeIn delay={0.15}>
          <div className="flex items-center justify-center gap-3 max-w-3xl mx-auto mb-8 flex-wrap">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">{t.projects.page.filters}</span>
            </div>

            {/* Filtre en cascade */}
            <CascadeFilter value={activeTech} onChange={setActiveTech} />

            {/* Dropdown tri */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none pl-3.5 pr-8 py-2 rounded-lg border border-border/50 bg-card text-sm text-foreground focus:outline-none focus:border-violet-500/60 hover:border-border/80 transition-all cursor-pointer min-w-[170px]"
              >
                <option value="featured">{t.projects.page.sortFeatured}</option>
                <option value="recent">{t.projects.page.sortRecent}</option>
                <option value="name">{t.projects.page.sortName}</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </FadeIn>

        {/* Compteur avec badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/30 text-violet-700 dark:text-violet-300">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
            {filtered.length}{" "}
            {filtered.length !== 1 ? t.projects.page.foundPlural : t.projects.page.found}
          </span>
        </div>

        {/* Grille */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div key="grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={open} animateLayout />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-sm">{t.projects.page.none}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <ProjectPanel project={openProject} onClose={close} />
    </div>
  );
}
