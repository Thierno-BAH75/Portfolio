"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Server,
  Zap,
  HardDrive,
  Cpu,
  Activity,
  Users,
  Building2,
  Wifi,
  Database,
  Shield,
  MemoryStick,
  Network,
} from "lucide-react";
import type { ProjectMetric } from "@/types";
import type { Locale } from "@/types";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Server,
  Zap,
  HardDrive,
  Cpu,
  Activity,
  Users,
  Building2,
  Wifi,
  Database,
  Shield,
  MemoryStick,
  Network,
};

interface ResultsGridProps {
  metrics: ProjectMetric[];
  locale: Locale;
  title: string;
}

export function ResultsGrid({ metrics, locale, title }: ResultsGridProps) {
  const reduce = useReducedMotion();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((metric, idx) => {
          const Icon = ICON_MAP[metric.icon] ?? Server;
          return (
            <motion.div
              key={idx}
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-muted/30 p-4 text-center"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-cyan-500/20 border border-violet-500/20">
                <Icon size={18} className="text-violet-400" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                {metric.value}
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                {metric.label[locale]}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
