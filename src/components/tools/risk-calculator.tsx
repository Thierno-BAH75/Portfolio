"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

type Level = "low" | "medium" | "high" | "critical";

function levelFromScore(score: number): Level {
  if (score <= 3) return "low";
  if (score <= 5.5) return "medium";
  if (score <= 8) return "high";
  return "critical";
}

const LEVEL_CLASSES: Record<Level, string> = {
  low: "text-green-400 border-green-500/30 bg-green-500/10",
  medium: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  high: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  critical: "text-red-400 border-red-500/30 bg-red-500/10",
};

interface Factor {
  key: "network" | "users" | "data" | "compliance";
  value: number;
}

export function RiskCalculator() {
  const { t } = useI18n();
  const [factors, setFactors] = useState<Factor[]>([
    { key: "network", value: 5 },
    { key: "users", value: 5 },
    { key: "data", value: 5 },
    { key: "compliance", value: 5 },
  ]);

  const score = useMemo(
    () => factors.reduce((sum, f) => sum + f.value, 0) / factors.length,
    [factors]
  );
  const level = levelFromScore(score);

  const setValue = (key: Factor["key"], value: number) => {
    setFactors((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f)));
  };

  return (
    <div className="space-y-5">
      <p className="text-xs text-muted-foreground">{t.tools.riskCalculator.intro}</p>

      <div className="space-y-4">
        {factors.map((factor) => (
          <div key={factor.key}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium">{t.tools.riskCalculator.factors[factor.key]}</label>
              <span className="text-xs font-mono text-cyan-400">{factor.value}/10</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={factor.value}
              onChange={(e) => setValue(factor.key, Number(e.target.value))}
              className="tool-range"
              aria-label={t.tools.riskCalculator.factors[factor.key]}
            />
          </div>
        ))}
      </div>

      <div className={cn("rounded-xl border p-4 text-center", LEVEL_CLASSES[level])}>
        <p className="text-3xl font-bold">{score.toFixed(1)}<span className="text-base font-normal">/10</span></p>
        <p className="text-sm font-semibold mt-1">{t.tools.riskCalculator.levels[level]}</p>
        <p className="text-xs mt-2 opacity-90">{t.tools.riskCalculator.levelHints[level]}</p>
      </div>
    </div>
  );
}
