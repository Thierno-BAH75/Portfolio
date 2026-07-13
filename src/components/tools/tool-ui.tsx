import type { LucideIcon } from "lucide-react";
import { Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================
// Catégories partagées — pilotent la teinte de l'icône de chaque
// ToolCard ET la couleur du sous-titre (ex-badge). Palette dérivée
// uniquement du violet/cyan de marque (+ indigo/teal comme teintes
// intermédiaires, + neutre pour les fiches de référence).
// ============================================================
export type ToolCategory = "live" | "simulation" | "reference" | "interactive" | "educational";

export const CATEGORY_STYLES: Record<ToolCategory, { icon: string; label: string }> = {
  live: {
    icon: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    label: "text-violet-400",
  },
  simulation: {
    icon: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
    label: "text-cyan-400",
  },
  reference: {
    icon: "bg-slate-500/15 border-slate-500/30 text-slate-400",
    label: "text-slate-400",
  },
  interactive: {
    icon: "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
    label: "text-indigo-400",
  },
  educational: {
    icon: "bg-teal-500/15 border-teal-500/30 text-teal-400",
    label: "text-teal-400",
  },
};

// ============================================================
// Bouton d'action plein largeur — même dégradé violet→cyan que les
// CTA du reste du site (Contact, Projets), icône + libellé centrés.
// ============================================================
export function ToolActionButton({
  icon: Icon,
  loading,
  children,
  type = "submit",
  onClick,
  disabled,
}: {
  icon?: LucideIcon;
  loading?: boolean;
  children: React.ReactNode;
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full h-11 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.45)] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none"
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        Icon && <Icon size={16} />
      )}
      {children}
    </button>
  );
}

// ============================================================
// Champ texte partagé — même hauteur que ToolActionButton pour un
// empilement input → bouton visuellement aligné.
// ============================================================
export function ToolInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full h-11 rounded-lg border border-border bg-background px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-transparent",
        props.className
      )}
    />
  );
}

// ============================================================
// Zone de texte partagée — même langage visuel que ToolInput, pour
// le contenu multi-lignes (générateur de hash, encodeur Base64).
// ============================================================
export function ToolTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full min-h-[88px] rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-transparent resize-y",
        props.className
      )}
    />
  );
}

// ============================================================
// Rangée de mini-cartes statistiques (résultats numériques : ports
// scannés/ouverts/fermés, en-têtes présents/manquants, etc.)
// ============================================================
export type StatTone = "good" | "bad" | "warn" | "neutral";

const STAT_TONE_CLASSES: Record<StatTone, string> = {
  good: "text-green-400 border-green-500/25 bg-green-500/5",
  bad: "text-red-400 border-red-500/25 bg-red-500/5",
  warn: "text-amber-400 border-amber-500/25 bg-amber-500/5",
  neutral: "text-cyan-400 border-cyan-500/25 bg-cyan-500/5",
};

const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export interface ToolStat {
  value: string | number;
  label: string;
  tone: StatTone;
}

export function ToolStatGrid({ stats }: { stats: ToolStat[] }) {
  return (
    <div className={cn("grid gap-2", GRID_COLS[stats.length] ?? "grid-cols-3")}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn("rounded-lg border px-2 py-2.5 text-center", STAT_TONE_CLASSES[stat.tone])}
        >
          <p className="text-xl font-bold leading-tight">{stat.value}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1 leading-snug">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Liste à puces avec badge de sévérité — partagée par la base de
// vulnérabilités (CVE) et les en-têtes de sécurité manquants.
// ============================================================
export type Severity = "critical" | "high" | "medium" | "low";

export const SEVERITY_CLASSES: Record<Severity, string> = {
  critical: "text-red-400 border-red-500/30 bg-red-500/10",
  high: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  medium: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  low: "text-sky-400 border-sky-500/30 bg-sky-500/10",
};

export interface SeverityItem {
  key: string;
  severity: Severity;
  severityLabel: string;
  title: string;
  reference?: string;
  description: string;
  remediationLabel: string;
  remediation: string;
}

export function ToolSeverityList({ items }: { items: SeverityItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.key} className="rounded-lg border border-border/60 bg-background/50 p-3.5">
          <div className="flex items-start justify-between gap-2 flex-wrap mb-1.5">
            <span className="font-semibold text-sm">{item.title}</span>
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full border shrink-0",
                SEVERITY_CLASSES[item.severity]
              )}
            >
              {item.severityLabel}
            </span>
          </div>
          {item.reference && (
            <p className="font-mono text-[11px] text-cyan-400 mb-1.5">{item.reference}</p>
          )}
          <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
          <div className="flex items-start gap-1.5 mt-2 pt-2 border-t border-border/50">
            <ShieldCheck size={13} className="text-green-400 shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-green-400 font-medium">{item.remediationLabel} </span>
              {item.remediation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
