"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ExternalLink, Info, Lock } from "lucide-react";
import { useI18n } from "@/i18n";
import { ToolActionButton, ToolInput } from "./tool-ui";

function normalizeHost(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "");
}

function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "fr-FR", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export function SslTlsChecker() {
  const { t, locale } = useI18n();
  const [ownHost, setOwnHost] = useState("");
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [foreignDomain, setForeignDomain] = useState<string | null>(null);

  useEffect(() => {
    const host = window.location.hostname;
    setOwnHost(host);
    setInput(host);
  }, []);

  // Aucune connexion réseau n'est jamais tentée par cet outil — la sortie
  // est entièrement illustrative, y compris pour le propre domaine du site
  const run = (rawInput: string) => {
    const normalized = normalizeHost(rawInput);
    setShowResult(false);
    setForeignDomain(null);

    if (normalized && normalized !== ownHost) {
      setForeignDomain(rawInput.trim());
      return;
    }
    setShowResult(true);
  };

  const now = new Date();
  const issued = new Date(now.getTime() - 45 * 86_400_000);
  const expires = new Date(now.getTime() + 45 * 86_400_000);

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.sslChecker.intro}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
        }}
        className="space-y-2"
      >
        <ToolInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={ownHost || "…"}
        />
        <ToolActionButton icon={Lock}>{t.tools.sslChecker.analyze}</ToolActionButton>
      </form>

      {foreignDomain && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-3 text-xs text-amber-200 space-y-2">
          <p>
            {t.tools.common.ownDomainOnly.replace("{domain}", foreignDomain)}{" "}
            <a
              href="https://www.ssllabs.com/ssltest/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-amber-100 inline-flex items-center gap-1"
            >
              ssllabs.com <ExternalLink size={11} />
            </a>
          </p>
          <button
            type="button"
            onClick={() => {
              setInput(ownHost);
              run(ownHost);
            }}
            className="text-cyan-300 hover:text-cyan-200 underline"
          >
            {t.tools.common.analyzeMine.replace("{domain}", ownHost)}
          </button>
        </div>
      )}

      {showResult && (
        <div className="space-y-3">
          <div className="flex items-start gap-2 rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-3.5 py-2.5 text-xs text-cyan-200">
            <Info size={14} className="shrink-0 mt-0.5" />
            <span>{t.tools.sslChecker.simulatedNote}</span>
          </div>

          <div className="rounded-lg border border-border/60 bg-background/50 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-green-500" />
              <span className="text-sm font-medium">{ownHost}</span>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <dt className="text-muted-foreground">{t.tools.sslChecker.protocol}</dt>
              <dd className="font-mono text-cyan-400">TLS 1.3</dd>
              <dt className="text-muted-foreground">{t.tools.sslChecker.cipher}</dt>
              <dd className="font-mono text-cyan-400">TLS_AES_256_GCM_SHA384</dd>
              <dt className="text-muted-foreground">{t.tools.sslChecker.certValid}</dt>
              <dd className="text-green-400">{t.tools.sslChecker.certValidYes}</dd>
              <dt className="text-muted-foreground">{t.tools.sslChecker.issuedOn}</dt>
              <dd>{formatDate(issued, locale)}</dd>
              <dt className="text-muted-foreground">{t.tools.sslChecker.expiresOn}</dt>
              <dd>{formatDate(expires, locale)}</dd>
              <dt className="text-muted-foreground">{t.tools.sslChecker.legacyProtocols}</dt>
              <dd className="text-green-400">{t.tools.sslChecker.legacyDisabled}</dd>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
