"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CircleDot, Circle, Radar } from "lucide-react";
import { useI18n } from "@/i18n";
import { ToolActionButton, ToolInput, ToolStatGrid, type ToolStat } from "./tool-ui";

const CANDIDATE_PORTS = [
  { port: 21, service: "FTP" },
  { port: 22, service: "SSH" },
  { port: 23, service: "Telnet" },
  { port: 25, service: "SMTP" },
  { port: 53, service: "DNS" },
  { port: 80, service: "HTTP" },
  { port: 110, service: "POP3" },
  { port: 143, service: "IMAP" },
  { port: 443, service: "HTTPS" },
  { port: 3306, service: "MySQL" },
  { port: 3389, service: "RDP" },
  { port: 8080, service: "HTTP-alt" },
];

// Hash de chaîne simple (djb2) — purement pour dériver un résultat
// déterministe (même entrée -> même résultat) à partir du texte saisi,
// aucune signification cryptographique
function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return Math.abs(hash);
}

interface PortResult {
  port: number;
  service: string;
  status: "open" | "closed";
}

function simulate(target: string): PortResult[] {
  const seed = hashString(target || "default");
  return CANDIDATE_PORTS.map((entry, i) => ({
    ...entry,
    // ~40% des ports "ouverts", de façon stable pour une même cible
    status: (seed >> i) % 5 < 2 ? "open" : "closed",
  }));
}

export function PortScanSimulator() {
  const { t } = useI18n();
  const [target, setTarget] = useState("");
  const [results, setResults] = useState<PortResult[] | null>(null);
  const [scannedTarget, setScannedTarget] = useState("");

  const run = () => {
    const value = target.trim() || t.tools.portScan.defaultTarget;
    setScannedTarget(value);
    setResults(simulate(value));
  };

  const stats: ToolStat[] = useMemo(() => {
    if (!results) return [];
    const openCount = results.filter((r) => r.status === "open").length;
    const closedCount = results.length - openCount;
    return [
      { value: results.length, label: t.tools.portScan.statsScannedLabel, tone: "neutral" },
      { value: openCount, label: t.tools.portScan.statsOpenLabel, tone: openCount > 0 ? "warn" : "good" },
      { value: closedCount, label: t.tools.portScan.statsClosedLabel, tone: "good" },
    ];
  }, [results, t]);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-200">
        <AlertTriangle size={14} className="shrink-0 mt-0.5" />
        <span>{t.tools.portScan.warning}</span>
      </div>

      <p className="text-xs text-muted-foreground">{t.tools.portScan.intro}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
        className="space-y-2"
      >
        <ToolInput
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder={t.tools.portScan.placeholder}
        />
        <ToolActionButton icon={Radar}>{t.tools.portScan.scan}</ToolActionButton>
      </form>

      {results && (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground">
            $ nmap-sim {scannedTarget}
          </p>
          <ToolStatGrid stats={stats} />
          <div className="rounded-lg border border-border/60 bg-background/50 divide-y divide-border/60">
            {results.map((r) => (
              <div key={r.port} className="flex items-center gap-2.5 px-3.5 py-2 font-mono text-xs">
                {r.status === "open" ? (
                  <CircleDot size={12} className="text-green-500 shrink-0" />
                ) : (
                  <Circle size={12} className="text-muted-foreground/50 shrink-0" />
                )}
                <span className="w-12 shrink-0">{r.port}/tcp</span>
                <span
                  className={r.status === "open" ? "text-green-400" : "text-muted-foreground"}
                >
                  {r.status === "open" ? t.tools.portScan.open : t.tools.portScan.closed}
                </span>
                <span className="text-muted-foreground ml-auto">{r.service}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground italic">{t.tools.portScan.footnote}</p>
        </div>
      )}
    </div>
  );
}
