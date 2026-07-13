"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_STYLES, type ToolCategory } from "./tool-ui";

// Carte au style établi du site (bordure fine → anneau dégradé violet→cyan
// au survol) qui se déplie sur place pour révéler l'outil — même pattern
// que les panneaux dépliables déjà utilisés ailleurs (achievements des
// expériences, preuves des compétences en admin).
//
// Hauteur d'en-tête figée (titre + sous-titre + description clampés) pour
// que les 9 cartes s'alignent proprement en grille sans sauter d'une ligne
// à l'autre, quelle que soit la longueur du texte.
export function ToolCard({
  icon: Icon,
  category,
  title,
  description,
  badge,
  children,
  defaultOpen = false,
}: {
  icon: LucideIcon;
  category: ToolCategory;
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const styles = CATEGORY_STYLES[category];

  return (
    <div
      className={cn(
        "group relative rounded-2xl p-[1px]",
        !reduce &&
          "transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15),0_0_18px_rgba(34,211,238,0.08)]"
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-2xl border border-border/60 transition-all duration-300",
          reduce ? "group-hover:border-violet-500/40" : open ? "opacity-0" : "group-hover:opacity-0"
        )}
      />
      {!reduce && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/60 to-cyan-400/60 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        />
      )}

      <div className="relative rounded-[calc(1rem-1px)] bg-card overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full flex items-start gap-3.5 p-5 text-left"
        >
          <span
            className={cn(
              "flex items-center justify-center w-11 h-11 rounded-2xl border shrink-0",
              styles.icon
            )}
          >
            <Icon size={19} />
          </span>
          <span className="min-w-0 flex-1 flex flex-col justify-center min-h-[92px] sm:min-h-[80px]">
            <span className="font-semibold text-sm leading-snug line-clamp-2">{title}</span>
            {badge && (
              <span
                className={cn(
                  "block text-[10px] font-semibold uppercase tracking-wider mt-1",
                  styles.label
                )}
              >
                {badge}
              </span>
            )}
            <span className="block text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
              {description}
            </span>
          </span>
          <ChevronDown
            size={16}
            className={cn(
              "shrink-0 mt-1 text-muted-foreground transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-1 border-t border-border/60">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
