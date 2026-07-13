"use client";

import { useState } from "react";
import { AlertTriangle, Mail, RefreshCw, Shuffle } from "lucide-react";
import { useI18n } from "@/i18n";
import { ToolActionButton } from "./tool-ui";

const SCENARIO_IDS = ["banking", "corporate", "delivery", "itSupport"] as const;

export function PhishingSimulator() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => {
      let n = Math.floor(Math.random() * SCENARIO_IDS.length);
      if (SCENARIO_IDS.length > 1 && n === prev) {
        n = (n + 1) % SCENARIO_IDS.length;
      }
      return n;
    });
  };

  const scenario = t.tools.phishing.scenarios[SCENARIO_IDS[index]];

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.phishing.intro}</p>

      <div className="space-y-2">
        <span className="inline-block text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
          {t.tools.phishing.sectorLabel}: {scenario.sector}
        </span>
        <ToolActionButton icon={Shuffle} type="button" onClick={next}>
          {t.tools.phishing.newScenario}
        </ToolActionButton>
      </div>

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
        <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-2">
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

      <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground italic">
        <RefreshCw size={11} />
        {t.tools.phishing.footnote}
      </p>
    </div>
  );
}
