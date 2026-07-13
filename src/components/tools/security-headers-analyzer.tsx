"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, ExternalLink, Loader2 } from "lucide-react";
import { useI18n } from "@/i18n";

const HEADER_KEYS = [
  "content-security-policy",
  "strict-transport-security",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-xss-protection",
] as const;

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

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.securityHeaders.intro}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          runCheck(input);
        }}
        className="flex flex-wrap gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={ownHost || "…"}
          className="flex-1 min-w-[180px] h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-9 px-4 rounded-lg text-sm font-medium bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-[0_0_16px_rgba(139,92,246,0.4)] transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : t.tools.securityHeaders.analyze}
        </button>
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
            className="text-cyan-300 hover:text-cyan-200 underline"
          >
            {t.tools.common.analyzeMine.replace("{domain}", ownHost)}
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      {result && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            <span className="text-green-400 font-medium">{result.status}</span> · {result.url}
          </p>
          <div className="space-y-2">
            {HEADER_KEYS.map((key) => {
              const value = result.headers[key];
              const present = value !== undefined;
              return (
                <div
                  key={key}
                  className="rounded-lg border border-border/60 bg-background/50 px-3.5 py-2.5"
                >
                  <div className="flex items-start gap-2">
                    {present ? (
                      <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <p className="font-mono text-xs font-medium">{key}</p>
                      {present && (
                        <p className="font-mono text-[11px] text-cyan-400 break-all mt-0.5">{value}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {t.tools.securityHeaders.headerInfo[key]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
