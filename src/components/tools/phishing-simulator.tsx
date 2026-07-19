"use client";

import { useState } from "react";
import { AlertTriangle, Mail, Sparkles } from "lucide-react";
import { useI18n } from "@/i18n";
import { ToolActionButton } from "./tool-ui";
import { Select } from "@/components/ui/select";

const SECTORS = ["banking", "corporate", "ecommerce", "socialMedia"] as const;
const DIFFICULTIES = ["easy", "medium", "hard"] as const;

export function PhishingSimulator() {
  const { t } = useI18n();
  const [sector, setSector] = useState<(typeof SECTORS)[number]>("banking");
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number]>("medium");
  const [applied, setApplied] = useState({ sector, difficulty });

  const scenario = t.tools.phishing.scenarios[applied.sector][applied.difficulty];

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.phishing.intro}</p>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium mb-1">{t.tools.phishing.sectorLabel}</label>
          <Select value={sector} onChange={(e) => setSector(e.target.value as (typeof SECTORS)[number])}>
            {SECTORS.map((s) => (
              <option key={s} value={s}>{t.tools.phishing.sectors[s]}</option>
            ))}
          </Select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">{t.tools.phishing.difficultyLabel}</label>
          <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value as (typeof DIFFICULTIES)[number])}>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>{t.tools.phishing.difficulties[d]}</option>
            ))}
          </Select>
        </div>
      </div>

      <ToolActionButton icon={Sparkles} type="button" onClick={() => setApplied({ sector, difficulty })}>
        {t.tools.phishing.generate}
      </ToolActionButton>

      <div className="rounded-lg border border-border/60 bg-background/50 overflow-hidden">
        <div className="flex items-center gap-2 px-3.5 py-2 border-b border-border/60 bg-muted/30">
          <Mail size={13} className="text-muted-foreground shrink-0" />
          <span className="text-[11px] text-muted-foreground truncate">{t.tools.phishing.fictionalNote}</span>
        </div>
        <div className="px-3.5 py-3 space-y-2">
          <div className="text-xs">
            <span className="text-muted-foreground">{t.tools.phishing.from}: </span>
            <span className="font-mono">{scenario.sender}</span>
          </div>
          <div className="text-xs">
            <span className="text-muted-foreground">{t.tools.phishing.subject}: </span>
            <span className="font-medium">{scenario.subject}</span>
          </div>
          <div className="pt-2 border-t border-border/50 text-xs leading-relaxed text-muted-foreground whitespace-pre-line">
            {scenario.body}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 mb-2">
          <AlertTriangle size={13} />
          {t.tools.phishing.redFlagsLabel}
        </p>
        <ul className="space-y-1.5">
          {scenario.redFlags.map((flag) => (
            <li key={flag} className="text-xs text-amber-100/80 flex items-start gap-2">
              <span className="text-amber-400 shrink-0">•</span>
              {flag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
