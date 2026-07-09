"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rss,
  Search,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  AlertTriangle,
  Bell,
  Clock,
  X,
} from "lucide-react";
import type { RSSArticle } from "@/app/api/rss/route";
import { SectionBackground } from "@/components/ui/section-background";
import { useI18n } from "@/i18n";
import type { Dictionary } from "@/i18n/dictionaries";

const LS_KEY = "veille_settings";
interface VeilleSettings { autoRefresh: boolean; interval: number }
const DEFAULT_SETTINGS: VeilleSettings = { autoRefresh: true, interval: 60 };

function readSettings(): VeilleSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch { return DEFAULT_SETTINGS; }
}

/* ─────────────────────────────────────────────────────────────────
   Static data — les valeurs "domain"/"source" sont les clés internes
   (identiques à celles renvoyées par /api/rss) ; seul le libellé
   affiché est localisé.
───────────────────────────────────────────────────────────────── */
const ALL = "all";

const DOMAIN_VALUES = [
  ALL,
  "Cybersécurité",
  "Réseaux & Infrastructure",
  "Cloud & DevSecOps",
  "Système & Linux",
] as const;

const SOURCE_VALUES = [
  ALL,
  // Cybersécurité
  "ANSSI",
  "Krebs on Security",
  "The Hacker News",
  "SANS ISC",
  // Réseaux & Infrastructure
  "Cisco Blog",
  "Cloudflare",
  // Cloud & DevSecOps
  "AWS Security",
  "Microsoft Azure",
  // Système & Linux
  "Red Hat",
];

const TAG_COLORS: Record<string, string> = {
  RCE:        "bg-red-500/20 text-red-300 border-red-500/40",
  Ransomware: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  Phishing:   "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  Malware:    "bg-pink-500/20 text-pink-300 border-pink-500/40",
  Patch:      "bg-green-500/20 text-green-300 border-green-500/40",
  CVE:        "bg-violet-500/20 text-violet-300 border-violet-500/40",
  "0-Day":    "bg-red-700/25 text-red-200 border-red-600/50",
  Fuite:      "bg-amber-500/20 text-amber-300 border-amber-500/40",
  DDoS:       "bg-blue-500/20 text-blue-300 border-blue-500/40",
  Cloud:      "bg-sky-500/20 text-sky-300 border-sky-500/40",
  Linux:      "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  Réseau:     "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Actualité:  "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
};

const DOMAIN_COLORS: Record<string, string> = {
  "Cybersécurité":          "bg-violet-500/20 text-violet-300 border-violet-500/40",
  "Réseaux & Infrastructure": "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  "Cloud & DevSecOps":      "bg-sky-500/20 text-sky-300 border-sky-500/40",
  "Système & Linux":        "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
};

/* ─────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────── */
function domainLabel(domain: string, t: Dictionary): string {
  switch (domain) {
    case "Cybersécurité": return t.veille.domains.cyber;
    case "Réseaux & Infrastructure": return t.veille.domains.network;
    case "Cloud & DevSecOps": return t.veille.domains.cloud;
    case "Système & Linux": return t.veille.domains.system;
    default: return domain;
  }
}

function formatDate(raw: string, locale: "fr" | "en"): string {
  if (!raw) return "—";
  try {
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(raw));
  } catch {
    return raw;
  }
}

/* ─────────────────────────────────────────────────────────────────
   Dropdown component
───────────────────────────────────────────────────────────────── */
interface DropdownOption { value: string; label: string }

function FilterDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: DropdownOption[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-background/70 text-sm text-muted-foreground hover:border-violet-500/50 hover:text-foreground transition-all whitespace-nowrap"
      >
        {selectedLabel}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1 z-50 min-w-full bg-background border border-border/60 rounded-lg shadow-xl overflow-hidden"
          >
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-violet-500/10 transition-colors ${
                    opt.value === value ? "text-violet-400 bg-violet-500/10" : "text-muted-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Article Card
───────────────────────────────────────────────────────────────── */
function ArticleCard({ article }: { article: RSSArticle }) {
  const { t, locale } = useI18n();
  const domainColor = DOMAIN_COLORS[article.domain] ?? DOMAIN_COLORS["Cybersécurité"];
  const tagColor    = TAG_COLORS[article.tag] ?? TAG_COLORS["Actualité"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ scale: 1.025, y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="flex flex-col h-full rounded-xl border border-border/50 bg-background/60 backdrop-blur-sm overflow-hidden hover:border-violet-500/40 hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] transition-all duration-300"
    >
      {/* Top stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-violet-600 to-cyan-500" />

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Domain + source row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${domainColor}`}>
            {domainLabel(article.domain, t)}
          </span>
          <span className="text-[10px] text-muted-foreground/60 truncate">
            {article.source}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm text-foreground leading-snug line-clamp-3">
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {article.description}
          </p>
        )}

        {/* Tag */}
        <span className={`self-start text-[10px] font-semibold px-2 py-0.5 rounded-md border ${tagColor}`}>
          {article.tag}
        </span>

        {/* Date */}
        <div className="text-[10px] text-muted-foreground/60 pt-1 border-t border-border/30">
          {formatDate(article.pubDate, locale)}
        </div>

        {/* CTA */}
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow hover:shadow-[0_0_16px_rgba(6,182,212,0.4)] transition-all"
        >
          <ExternalLink size={12} />
          {t.veille.readSource}
        </a>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Skeleton card
───────────────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border/40 bg-background/50 overflow-hidden animate-pulse">
      <div className="h-1 w-full bg-gradient-to-r from-violet-600/30 to-cyan-500/30" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-20 rounded-full bg-muted/50" />
        <div className="h-4 w-full rounded bg-muted/40" />
        <div className="h-4 w-5/6 rounded bg-muted/40" />
        <div className="h-3 w-full rounded bg-muted/30" />
        <div className="h-3 w-4/5 rounded bg-muted/30" />
        <div className="h-3 w-16 rounded-full bg-muted/40 mt-2" />
        <div className="h-7 w-full rounded-lg bg-muted/30 mt-2" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────── */
export default function VeillePage() {
  const { t } = useI18n();
  const [articles, setArticles] = useState<RSSArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState<string>(ALL);
  const [source, setSource] = useState<string>(ALL);
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const [newCount, setNewCount] = useState(0);       // notification nouveaux articles
  const [showNotif, setShowNotif] = useState(false);
  const [settings, setSettings] = useState<VeilleSettings>(DEFAULT_SETTINGS);
  const prevCountRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const domainOptions: DropdownOption[] = useMemo(
    () =>
      DOMAIN_VALUES.map((value) => ({
        value,
        label: value === ALL ? t.veille.domains.all : domainLabel(value, t),
      })),
    [t]
  );

  const sourceOptions: DropdownOption[] = useMemo(
    () =>
      SOURCE_VALUES.map((value) => ({
        value,
        label: value === ALL ? t.veille.allSources : value,
      })),
    [t]
  );

  // Lire les settings depuis localStorage
  useEffect(() => {
    setSettings(readSettings());
    // Écouter les changements depuis l'admin (storage event)
    const onStorage = () => setSettings(readSettings());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const fetchArticles = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/rss?t=${Date.now()}`);
      if (!res.ok) throw new Error();
      const data: RSSArticle[] = await res.json();
      // Détection nouveaux articles
      if (prevCountRef.current > 0 && data.length > prevCountRef.current) {
        const diff = data.length - prevCountRef.current;
        setNewCount(diff);
        setShowNotif(true);
      }
      prevCountRef.current = data.length;
      setArticles(data);
      setLastUpdatedAt(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Premier chargement
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles, refreshKey]);

  // Auto-refresh
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (settings.autoRefresh && settings.interval > 0) {
      const ms = settings.interval * 60 * 1000;
      intervalRef.current = setInterval(() => fetchArticles(true), ms);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [settings, fetchArticles]);

  // Badge "il y a X min"
  const [, forceTickLabel] = useState(0);
  useEffect(() => {
    const t = setInterval(() => forceTickLabel((n) => n + 1), 30_000);
    return () => clearInterval(t);
  }, []);

  function lastUpdatedLabel(): string {
    if (!lastUpdatedAt) return "";
    const diff = Math.floor((Date.now() - lastUpdatedAt.getTime()) / 60_000);
    if (diff < 1) return t.veille.justNow;
    if (diff === 1) return t.veille.oneMinAgo;
    return `${t.veille.minutesAgoPrefix}${diff}${t.veille.minutesAgoSuffix}`;
  }

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q);
      const matchDomain = domain === ALL || a.domain === domain;
      const matchSrc = source === ALL || a.source === source;
      return matchSearch && matchDomain && matchSrc;
    });
  }, [articles, search, domain, source]);

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">

      {/* ── CSS — animations fonctionnelles uniquement (le fond décoratif
           vient du composant partagé SectionBackground ci-dessous) ── */}
      <style>{`
        @keyframes icon-float-v {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        .icon-float-v { animation: icon-float-v 2.2s ease-in-out infinite; }

        @keyframes dot-p-left-v {
          0%   { opacity: 0; box-shadow: none; }
          5%   { opacity: 1; box-shadow: 0 0 8px 3px rgba(139,92,246,0.9); }
          20%  { opacity: 1; box-shadow: 0 0 8px 3px rgba(139,92,246,0.9); }
          35%  { opacity: 0; box-shadow: none; }
          100% { opacity: 0; box-shadow: none; }
        }
        @keyframes dot-p-right-v {
          0%   { opacity: 0; box-shadow: none; }
          45%  { opacity: 0; box-shadow: none; }
          55%  { opacity: 1; box-shadow: 0 0 8px 3px rgba(6,182,212,0.9); }
          70%  { opacity: 1; box-shadow: 0 0 8px 3px rgba(6,182,212,0.9); }
          85%  { opacity: 0; box-shadow: none; }
          100% { opacity: 0; box-shadow: none; }
        }
        .dot-pv-left  { animation: dot-p-left-v  3.6s ease-in-out infinite; background: #8b5cf6; }
        .dot-pv-right { animation: dot-p-right-v 3.6s ease-in-out infinite; background: #06b6d4; }

        @keyframes spin-refresh { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin-refresh 0.8s linear infinite; }
      `}</style>

      {/* ── Background — composant partagé, cohérent avec Skills/Parcours/Projets/Contact ── */}
      <SectionBackground glowPosition="top-right" variant="violet" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Floating icon */}
          <div className="flex justify-center mb-5">
            <span className="icon-float-v inline-block p-3 rounded-xl bg-violet-500/10 border border-violet-500/30">
              <Rss size={28} className="text-violet-400" />
            </span>
          </div>

          {/* Title row with blinking dots */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="dot-pv-left w-3 h-3 rounded-full flex-shrink-0" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              {t.veille.title}
            </h1>
            <span className="dot-pv-right w-3 h-3 rounded-full flex-shrink-0" />
          </div>

          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t.veille.subtitleIntro}{" "}
            <span className="text-violet-400 font-medium">{t.veille.domainSecurity}</span>,{" "}
            <span className="text-cyan-400 font-medium">{t.veille.domainNetworks}</span>{" "}
            {t.veille.and}{" "}
            <span className="text-blue-400 font-medium">{t.veille.domainInfra}</span>
          </p>
        </motion.div>

        {/* ── Toolbar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col gap-3 mb-8"
        >
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.veille.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border/60 bg-background/70 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all backdrop-blur-sm"
            />
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown value={domain} options={domainOptions} onChange={setDomain} />
            <FilterDropdown value={source} options={sourceOptions} onChange={setSource} />

            {/* Refresh button + last-update badge */}
            <div className="flex flex-col items-start gap-0.5">
              <button
                onClick={() => setRefreshKey((k) => k + 1)}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white text-sm font-semibold shadow hover:shadow-[0_0_16px_rgba(6,182,212,0.4)] transition-all"
              >
                <RefreshCw size={14} className={loading ? "spin" : ""} />
                {t.veille.refresh}
              </button>
              {lastUpdatedAt && (
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60 pl-1">
                  <Clock size={9} />
                  {lastUpdatedLabel()}
                  {settings.autoRefresh && settings.interval > 0 && (
                    <span className="ml-1 text-cyan-500/70">· auto {settings.interval >= 60 ? `${settings.interval / 60}h` : `${settings.interval}min`}</span>
                  )}
                </span>
              )}
            </div>

            {/* Article counter */}
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/30 text-xs font-semibold text-violet-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              {loading ? "…" : filtered.length}{" "}
              {filtered.length !== 1 ? t.veille.articles : t.veille.article}
            </div>
          </div>
        </motion.div>

        {/* ── New articles notification ── */}
        <AnimatePresence>
          {showNotif && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 px-4 py-3 mb-5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-sm"
            >
              <Bell size={15} className="shrink-0 animate-pulse" />
              <span className="font-semibold">
                {newCount} {newCount > 1 ? t.veille.newPlural : t.veille.newSingular}
              </span>
              <button
                onClick={() => setShowNotif(false)}
                className="ml-auto p-0.5 rounded hover:text-white transition"
              >
                <X size={13} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Error state ── */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 p-4 mb-6 rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm"
          >
            <AlertTriangle size={16} className="shrink-0" />
            {t.veille.error}
          </motion.div>
        )}

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 text-muted-foreground"
          >
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">{t.veille.emptyTitle}</p>
            <p className="text-sm mt-1">{t.veille.emptyHint}</p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Sources note ── */}
        {!loading && articles.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-xs text-muted-foreground/50 mt-10"
          >
            {t.veille.sourcesNote}
          </motion.p>
        )}

      </div>
    </div>
  );
}
