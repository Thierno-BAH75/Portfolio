"use client";

import { useState } from "react";
import { AlertTriangle, Bug } from "lucide-react";
import { useI18n } from "@/i18n";
import { ReferenceInfo } from "./reference-info";
import {
  ToolActionButton,
  ToolInput,
  ToolStatGrid,
  ToolSeverityList,
  type ToolStat,
  type StatTone,
  type Severity,
  type SeverityItem,
} from "./tool-ui";
import { Select } from "@/components/ui/select";

type ScanType = "headers" | "full";
type RiskLevel = "low" | "medium" | "high" | "critical";

// Résultats de simulation entièrement mockés — jamais de requête vers
// l'URL saisie. Sous-ensemble des constats "en-têtes" toujours inclus,
// le reste n'apparaît que pour l'audit complet.
const FINDING_POOL = [
  { id: "missingCsp" as const, severity: "critical" as Severity, headerOnly: true },
  { id: "missingXFrameOptions" as const, severity: "high" as Severity, headerOnly: true },
  { id: "missingHsts" as const, severity: "medium" as Severity, headerOnly: true },
  { id: "outdatedTls" as const, severity: "high" as Severity, headerOnly: false },
  { id: "verboseErrorMessages" as const, severity: "medium" as Severity, headerOnly: false },
  { id: "weakSessionCookie" as const, severity: "high" as Severity, headerOnly: false },
  { id: "missingRateLimiting" as const, severity: "medium" as Severity, headerOnly: false },
  { id: "directoryListing" as const, severity: "low" as Severity, headerOnly: false },
];

const RISK_LEVELS: RiskLevel[] = ["low", "medium", "high", "critical"];
const RISK_TONE: Record<RiskLevel, StatTone> = { low: "good", medium: "warn", high: "bad", critical: "bad" };

function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return Math.abs(hash);
}

interface SimResult {
  risk: RiskLevel;
  testsPerformed: number;
  findings: typeof FINDING_POOL;
}

function simulate(url: string, scanType: ScanType): SimResult {
  const seed = hashString(`${url}|${scanType}`);
  const pool = scanType === "headers" ? FINDING_POOL.filter((f) => f.headerOnly) : FINDING_POOL;
  let findings = pool.filter((_, i) => (seed >> i) % 3 < 2);
  if (findings.length === 0) findings = [pool[seed % pool.length]];

  const risk = RISK_LEVELS[Math.min(findings.length, RISK_LEVELS.length - 1)];
  const testsPerformed = scanType === "headers" ? 20 + (seed % 30) : 80 + (seed % 120);

  return { risk, testsPerformed, findings };
}

export function BurpSuiteReference() {
  const { t } = useI18n();
  const info = t.tools.burpReference;
  const sim = t.tools.burpReference.simulation;

  const [url, setUrl] = useState("");
  const [scanType, setScanType] = useState<ScanType>("headers");
  const [result, setResult] = useState<SimResult | null>(null);

  const run = () => {
    setResult(simulate(url.trim() || "https://exemple.com", scanType));
  };

  const stats: ToolStat[] = result
    ? [
        { value: sim.riskLevels[result.risk], label: sim.statsRiskLabel, tone: RISK_TONE[result.risk] },
        { value: result.findings.length, label: sim.statsVulnsLabel, tone: result.findings.length > 0 ? "bad" : "good" },
        { value: result.testsPerformed, label: sim.statsTestsLabel, tone: "neutral" },
      ]
    : [];

  const items: SeverityItem[] = result
    ? result.findings.map((f) => ({
        key: f.id,
        severity: f.severity,
        severityLabel: t.tools.common.severity[f.severity],
        title: sim.findings[f.id].title,
        description: sim.findings[f.id].description,
        remediationLabel: t.tools.common.remediationLabel,
        remediation: sim.findings[f.id].remediation,
      }))
    : [];

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-200">
          <AlertTriangle size={14} className="shrink-0 mt-0.5" />
          <span>{sim.warning}</span>
        </div>

        <p className="text-xs text-muted-foreground">{sim.intro}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            run();
          }}
          className="space-y-2"
        >
          <div>
            <label className="block text-xs font-medium mb-1">{sim.urlLabel}</label>
            <ToolInput
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={sim.urlPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">{sim.scanTypeLabel}</label>
            <Select value={scanType} onChange={(e) => setScanType(e.target.value as ScanType)}>
              <option value="headers">{sim.scanTypeHeaders}</option>
              <option value="full">{sim.scanTypeFull}</option>
            </Select>
          </div>
          <ToolActionButton icon={Bug}>{sim.run}</ToolActionButton>
        </form>

        {result && (
          <div className="space-y-3">
            <ToolStatGrid stats={stats} />
            <ToolSeverityList items={items} />
          </div>
        )}
      </div>

      <div className="pt-1 border-t border-border/60">
        <ReferenceInfo
          useCases={info.useCases}
          context={info.context}
          useCasesLabel={t.tools.common.useCasesLabel}
          contextLabel={t.tools.common.contextLabel}
        />
      </div>
    </div>
  );
}
