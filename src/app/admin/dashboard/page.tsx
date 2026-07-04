"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Star, X, Check, ChevronDown,
  Shield, Server, Activity, Network, Cloud, Cog, LayoutDashboard,
  Rss, Clock,
} from "lucide-react";
import { projects as initialProjects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";

/* ── Types ─────────────────────────────────────────────── */
// L'admin (démo locale) édite les projets aplatis en français —
// les champs Localized {fr, en} des data sont résolus en .fr à l'init
type AdminProject = Omit<Project, "title" | "description" | "longDescription"> & {
  title: string;
  description: string;
  longDescription?: string;
};

const adminProjects: AdminProject[] = initialProjects.map((p) => ({
  ...p,
  title: p.title.fr,
  description: p.description.fr,
  longDescription: p.longDescription?.fr,
}));

type FormState = Omit<AdminProject, "id" | "slug" | "image" | "links">;

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  longDescription: "",
  technologies: [],
  category: "infrastructure",
  featured: false,
  date: new Date().toISOString().slice(0, 7),
};

const CATEGORIES: { value: ProjectCategory; label: string; icon: React.ReactNode }[] = [
  { value: "security",       label: "Sécurité",       icon: <Shield size={14} /> },
  { value: "infrastructure", label: "Infrastructure",  icon: <Server size={14} /> },
  { value: "monitoring",     label: "Supervision",    icon: <Activity size={14} /> },
  { value: "network",        label: "Réseaux",        icon: <Network size={14} /> },
  { value: "cloud",          label: "Cloud",          icon: <Cloud size={14} /> },
  { value: "automation",     label: "Automation",     icon: <Cog size={14} /> },
];

/* ── Toggle Switch ──────────────────────────────────────── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        checked ? "bg-gradient-to-r from-violet-600 to-cyan-500" : "bg-border"
      }`}
    >
      <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
        checked ? "translate-x-4.5" : "translate-x-0.5"
      }`} />
    </button>
  );
}

/* ── Formulaire projet ──────────────────────────────────── */
function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: FormState;
  onSave: (data: FormState) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FormState>(initial);
  const [techInput, setTechInput] = useState("");

  const set = (key: keyof FormState, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.technologies.includes(t)) {
      set("technologies", [...form.technologies, t]);
    }
    setTechInput("");
  };

  const removeTech = (t: string) =>
    set("technologies", form.technologies.filter((x) => x !== t));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="rounded-xl border border-violet-500/30 bg-background/80 backdrop-blur-sm p-6 space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Titre */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Titre *</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Nom du projet"
            className="w-full px-3 py-2 rounded-lg border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:border-cyan-500/60 transition"
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Description courte *</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            placeholder="Résumé du projet…"
            className="w-full px-3 py-2 rounded-lg border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:border-cyan-500/60 transition resize-none"
          />
        </div>

        {/* Catégorie */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Catégorie</label>
          <div className="relative">
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value as ProjectCategory)}
              className="w-full appearance-none px-3 py-2 pr-8 rounded-lg border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:border-cyan-500/60 transition"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Date (YYYY-MM)</label>
          <input
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            placeholder="2025-06"
            className="w-full px-3 py-2 rounded-lg border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:border-cyan-500/60 transition"
          />
        </div>

        {/* Technologies */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Technologies</label>
          <div className="flex gap-2">
            <input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
              placeholder="Ajouter une techno…"
              className="flex-1 px-3 py-2 rounded-lg border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:border-cyan-500/60 transition"
            />
            <button
              onClick={addTech}
              className="px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium transition"
            >
              <Plus size={14} />
            </button>
          </div>
          {form.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {form.technologies.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md border border-border/60 bg-muted/40 text-muted-foreground">
                  {t}
                  <button onClick={() => removeTech(t)} className="hover:text-red-400 transition"><X size={10} /></button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Featured */}
        <div className="sm:col-span-2 flex items-center gap-3">
          <Toggle checked={form.featured} onChange={() => set("featured", !form.featured)} />
          <span className="text-sm text-muted-foreground">Mettre en avant ce projet</span>
          {form.featured && <Star size={14} className="text-yellow-400" />}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => form.title && form.description && onSave(form)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow transition"
        >
          <Check size={14} /> Enregistrer
        </button>
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border/60 text-xs text-muted-foreground hover:text-foreground transition"
        >
          <X size={14} /> Annuler
        </button>
      </div>
    </motion.div>
  );
}

/* ── Veille Settings ────────────────────────────────────── */
const INTERVAL_OPTIONS = [
  { label: "30 minutes", value: 30 },
  { label: "1 heure",    value: 60 },
  { label: "2 heures",   value: 120 },
  { label: "6 heures",   value: 360 },
  { label: "12 heures",  value: 720 },
  { label: "Manuel uniquement", value: 0 },
];

const LS_KEY = "veille_settings";

interface VeilleSettings { autoRefresh: boolean; interval: number }
const DEFAULT_SETTINGS: VeilleSettings = { autoRefresh: true, interval: 60 };

function VeilleSettingsPanel() {
  const [settings, setSettings] = useState<VeilleSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setSettings(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const update = (patch: Partial<VeilleSettings>) => {
    setSettings((s) => {
      const next = { ...s, ...patch };
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const activeInterval = INTERVAL_OPTIONS.find((o) => o.value === settings.interval);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-violet-500/30 bg-background/60 backdrop-blur-sm p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/30">
          <Rss size={16} className="text-violet-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Paramètres Veille</h2>
          <p className="text-[11px] text-muted-foreground">Gestion de l'actualisation automatique des flux RSS</p>
        </div>
        {saved && (
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            <Check size={10} /> Sauvegardé
          </span>
        )}
      </div>

      <div className="space-y-5">
        {/* Toggle auto-refresh */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/40">
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-md transition-colors ${settings.autoRefresh ? "bg-cyan-500/15" : "bg-muted/30"}`}>
              <Clock size={14} className={settings.autoRefresh ? "text-cyan-400" : "text-muted-foreground"} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Actualisation automatique</p>
              <p className="text-[11px] text-muted-foreground">
                {settings.autoRefresh
                  ? `Active — toutes les ${activeInterval?.label ?? "—"}`
                  : "Désactivée — rafraîchissement manuel uniquement"}
              </p>
            </div>
          </div>
          <Toggle
            checked={settings.autoRefresh}
            onChange={() => update({ autoRefresh: !settings.autoRefresh })}
          />
        </div>

        {/* Interval selector */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Clock size={11} />
            Intervalle d'actualisation
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {INTERVAL_OPTIONS.map((opt) => {
              const active = settings.interval === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => update({ interval: opt.value, autoRefresh: opt.value === 0 ? false : settings.autoRefresh })}
                  className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                    active
                      ? "border-violet-500/60 bg-gradient-to-r from-violet-600/20 to-cyan-500/15 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.2)]"
                      : "border-border/50 bg-background/40 text-muted-foreground hover:border-violet-500/30 hover:text-foreground"
                  }`}
                >
                  {opt.label}
                  {active && <span className="ml-1 text-[9px] opacity-70">✓</span>}
                </button>
              );
            })}
          </div>
          {settings.interval === 0 && (
            <p className="text-[11px] text-amber-400/80 flex items-center gap-1 mt-1">
              <span>⚠</span> Mode manuel : les flux ne seront pas actualisés automatiquement.
            </p>
          )}
        </div>

        {/* Info */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-violet-500/5 border border-violet-500/20 text-[11px] text-muted-foreground">
          <Rss size={12} className="text-violet-400 shrink-0 mt-0.5" />
          <span>
            Les paramètres sont sauvegardés en <span className="text-violet-400 font-mono">localStorage</span> et appliqués automatiquement sur la page Veille.
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Dashboard ──────────────────────────────────────────── */
export default function AdminDashboardPage() {
  const [projectList, setProjectList] = useState<AdminProject[]>(adminProjects);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  /* Toggle featured */
  const toggleFeatured = (id: string) =>
    setProjectList((list) =>
      list.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );

  /* Ajouter */
  const handleAdd = (data: FormState) => {
    const newProject: AdminProject = {
      ...data,
      id: String(Date.now()),
      slug: data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      image: "",
      links: {},
    };
    setProjectList((l) => [newProject, ...l]);
    setShowAddForm(false);
  };

  /* Modifier */
  const handleEdit = (id: string, data: FormState) => {
    setProjectList((l) =>
      l.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
    setEditingId(null);
  };

  /* Supprimer */
  const handleDelete = (id: string) => {
    setProjectList((l) => l.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  const featured = projectList.filter((p) => p.featured).length;

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard size={18} className="text-violet-400" />
              <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">Admin</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              Dashboard Projets
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {projectList.length} projet{projectList.length !== 1 ? "s" : ""} · {featured} mis en avant
            </p>
          </div>

          <button
            onClick={() => { setShowAddForm((v) => !v); setEditingId(null); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold shadow hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
          >
            {showAddForm ? <X size={15} /> : <Plus size={15} />}
            {showAddForm ? "Annuler" : "Ajouter un projet"}
          </button>
        </div>

        {/* Formulaire d'ajout */}
        <AnimatePresence>
          {showAddForm && (
            <div className="mb-6">
              <ProjectForm
                initial={EMPTY_FORM}
                onSave={handleAdd}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Paramètres Veille */}
        <div className="mb-10">
          <VeilleSettingsPanel />
        </div>

        {/* Séparateur */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={14} className="text-violet-400" />
            <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">Projets</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-violet-500/30 to-transparent" />
        </div>

        {/* Liste des projets */}
        <div className="space-y-3">
          <AnimatePresence>
            {projectList.map((project) => {
              const catLabel = CATEGORIES.find((c) => c.value === project.category);
              const isEditing = editingId === project.id;
              const isDeleting = deleteId === project.id;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Carte projet */}
                  {!isEditing && (
                    <div className="rounded-xl border border-border/50 bg-background/60 backdrop-blur-sm hover:border-violet-500/30 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">

                        {/* Infos */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-sm font-semibold text-foreground truncate">
                              {project.title}
                            </span>
                            {project.featured && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium">
                                <Star size={8} /> En avant
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-border/60 text-muted-foreground">
                              {catLabel?.icon} {catLabel?.label}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 5).map((t) => (
                              <span key={t} className="text-[9px] px-1.5 py-0.5 rounded border border-border/40 bg-muted/30 text-muted-foreground">
                                {t}
                              </span>
                            ))}
                            {project.technologies.length > 5 && (
                              <span className="text-[9px] text-muted-foreground">+{project.technologies.length - 5}</span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {/* Toggle featured */}
                          <div className="flex items-center gap-2">
                            <Toggle checked={project.featured} onChange={() => toggleFeatured(project.id)} />
                            <span className="text-[10px] text-muted-foreground hidden sm:inline">Mis en avant</span>
                          </div>

                          {/* Modifier */}
                          <button
                            onClick={() => { setEditingId(project.id); setShowAddForm(false); }}
                            className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-violet-400 hover:border-violet-500/50 transition"
                            title="Modifier"
                          >
                            <Pencil size={14} />
                          </button>

                          {/* Supprimer */}
                          {isDeleting ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                                title="Confirmer la suppression"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                onClick={() => setDeleteId(null)}
                                className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground transition"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteId(project.id)}
                              className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-red-400 hover:border-red-500/50 transition"
                              title="Supprimer"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Formulaire de modification inline */}
                  {isEditing && (
                    <ProjectForm
                      initial={{
                        title: project.title,
                        description: project.description,
                        longDescription: project.longDescription ?? "",
                        technologies: project.technologies,
                        category: project.category,
                        featured: project.featured,
                        date: project.date,
                      }}
                      onSave={(data) => handleEdit(project.id, data)}
                      onCancel={() => setEditingId(null)}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
