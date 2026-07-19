"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ExternalLink, Search } from "lucide-react";
import { useI18n } from "@/i18n";
import {
  ToolActionButton,
  ToolInput,
  ToolStatGrid,
  ToolSeverityList,
  type ToolStat,
  type Severity,
  type SeverityItem,
} from "./tool-ui";

const HEADER_KEYS = [
  "content-security-policy",
  "strict-transport-security",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-xss-protection",
] as const;

// Sévérité indicative de l'absence de chaque en-tête — jugement défensif
// standard (CSP/HSTS/anti-clickjacking priment sur les mécanismes annexes
// ou dépréciés comme X-XSS-Protection), pas une donnée renvoyée par l'API
const HEADER_SEVERITY: Record<(typeof HEADER_KEYS)[number], Severity> = {
  "content-security-policy": "critical",
  "strict-transport-security": "high",
  "x-frame-options": "high",
  "x-content-type-options": "medium",
  "permissions-policy": "medium",
  "referrer-policy": "low",
  "x-xss-protection": "low",
};

interface ApiResult {
  url: string;
  status: number;
  headers: Record<string, string>;
  missing: string[];
}

function normalizeHost(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "");
}

export function SecurityHeadersAnalyzer() {
  const { t } = useI18n();
  const [ownHost, setOwnHost] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [foreignDomain, setForeignDomain] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const host = window.location.hostname;
    setOwnHost(host);
    setInput(host);
  }, []);

  const runCheck = async (rawInput: string) => {
    const normalized = normalizeHost(rawInput);
    setError(null);
    setForeignDomain(null);

    // Cible refusée AVANT toute requête : aucune tentative n'est jamais
    // faite vers un domaine qui n'est pas celui du site
    if (normalized && normalized !== ownHost) {
      setResult(null);
      setForeignDomain(rawInput.trim());
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/tools/security-headers");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "error");
      setResult(data);
    } catch {
      setError(t.tools.common.fetchError);
    } finally {
      setLoading(false);
    }
  };

  const presentKeys = result ? HEADER_KEYS.filter((k) => result.headers[k] !== undefined) : [];
  const missingKeys = result ? HEADER_KEYS.filter((k) => result.headers[k] === undefined) : [];

  const stats: ToolStat[] = result
    ? [
        { value: result.status, label: t.tools.securityHeaders.statsStatusLabel, tone: "neutral" },
        {
          value: `${presentKeys.length}/${HEADER_KEYS.length}`,
          label: t.tools.securityHeaders.statsPresentLabel,
          tone: presentKeys.length === HEADER_KEYS.length ? "good" : presentKeys.length === 0 ? "bad" : "warn",
        },
        {
          value: missingKeys.length,
          label: t.tools.securityHeaders.statsMissingLabel,
          tone: missingKeys.length === 0 ? "good" : "bad",
        },
      ]
    : [];

  const missingItems: SeverityItem[] = missingKeys.map((key) => ({
    key,
    severity: HEADER_SEVERITY[key],
    severityLabel: t.tools.common.severity[HEADER_SEVERITY[key]],
    title: key,
    description: t.tools.securityHeaders.headerInfo[key],
    remediationLabel: t.tools.common.remediationLabel,
    remediation: t.tools.securityHeaders.missingRemediation,
  }));

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.securityHeaders.intro}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          runCheck(input);
        }}
        className="space-y-2"
      >
        <ToolInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={ownHost || "…"}
        />
        <ToolActionButton icon={Search} loading={loading}>
          {t.tools.securityHeaders.analyze}
        </ToolActionButton>
      </form>

      {foreignDomain && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-3 text-xs text-amber-200 space-y-2">
          <p>
            {t.tools.common.ownDomainOnly.replace("{domain}", foreignDomain)}{" "}
            <a
              href="https://securityheaders.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-amber-100 inline-flex items-center gap-1"
            >
              securityheaders.com <ExternalLink size={11} />
            </a>
          </p>
          <button
            type="button"
            onClick={() => {
              setInput(ownHost);
              runCheck(ownHost);
            }}
            className="text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200 underline"
          >
            {t.tools.common.analyzeMine.replace("{domain}", ownHost)}
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      {result && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground truncate">{result.url}</p>
          <ToolStatGrid stats={stats} />

          {missingItems.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                {t.tools.securityHeaders.sectionMissingTitle}
              </p>
              <ToolSeverityList items={missingItems} />
            </div>
          )}

          {presentKeys.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                {t.tools.securityHeaders.sectionPresentTitle}
              </p>
              <div className="space-y-2">
                {presentKeys.map((key) => (
                  <div
                    key={key}
                    className="rounded-lg border border-green-500/20 bg-green-500/5 px-3.5 py-2.5"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="font-mono text-xs font-medium">{key}</p>
                        <p className="font-mono text-[11px] text-cyan-400 break-all mt-0.5">
                          {result.headers[key]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
