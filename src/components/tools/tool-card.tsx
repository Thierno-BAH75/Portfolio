"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Carte au style établi du site (bordure fine → anneau dégradé violet→cyan
// au survol) qui se déplie sur place pour révéler l'outil — même pattern
// que les panneaux dépliables déjà utilisés ailleurs (achievements des
// expériences, preuves des compétences en admin).
export function ToolCard({
  icon: Icon,
  title,
  description,
  badge,
  children,
  defaultOpen = false,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();

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
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 border border-violet-500/25 text-violet-400 shrink-0">
            <Icon size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">{title}</span>
              {badge && (
                <span className="text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-400">
                  {badge}
                </span>
              )}
            </span>
            <span className="block text-xs text-muted-foreground mt-1">{description}</span>
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
