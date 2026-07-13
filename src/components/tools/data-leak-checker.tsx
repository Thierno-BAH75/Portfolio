"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, ExternalLink, Info } from "lucide-react";
import { useI18n } from "@/i18n";

// Jeu de données 100% fixe et mocké : faits historiques publics de fuites de
// données largement documentées, utilisés uniquement pour illustrer un
// résultat plausible — aucune connexion à une base de fuites réelle, aucun
// appel réseau
const MOCK_BREACHES = [
  { name: "LinkedIn", year: 2012 },
  { name: "Adobe", year: 2013 },
  { name: "Dropbox", year: 2012 },
  { name: "MySpace", year: 2008 },
  { name: "Yahoo", year: 2013 },
];

function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return Math.abs(hash);
}

interface Result {
  breaches: typeof MOCK_BREACHES;
}

function simulate(email: string): Result {
  const seed = hashString(email.trim().toLowerCase());
  const count = seed % 4; // 0 à 3 fuites simulées
  const breaches = MOCK_BREACHES.filter((_, i) => (seed >> i) % 2 === 0).slice(0, count);
  return { breaches };
}

export function DataLeakChecker() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const run = () => {
    if (!email.trim()) return;
    setResult(simulate(email));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-2.5 text-xs text-cyan-200">
        <Info size={14} className="shrink-0 mt-0.5" />
        <span>
          {t.tools.dataLeak.simulatedNote}{" "}
          <a
            href="https://haveibeenpwned.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-cyan-100"
          >
            HaveIBeenPwned.com
            <ExternalLink size={11} />
          </a>
        </span>
      </div>

      <p className="text-xs text-muted-foreground">{t.tools.dataLeak.intro}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
        className="flex flex-wrap gap-2"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@exemple.com"
          className="flex-1 min-w-[180px] h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-transparent"
        />
        <button
          type="submit"
          className="h-9 px-4 rounded-lg text-sm font-medium bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-[0_0_16px_rgba(139,92,246,0.4)] transition-all"
        >
          {t.tools.dataLeak.check}
        </button>
      </form>

      {result && (
        <div className="rounded-lg border border-border/60 bg-background/50 p-3.5 space-y-2.5">
          {result.breaches.length === 0 ? (
            <p className="flex items-center gap-2 text-sm text-green-400">
              <CheckCircle2 size={15} className="shrink-0" />
              {t.tools.dataLeak.noneFound}
            </p>
          ) : (
            <>
              <p className="flex items-center gap-2 text-sm text-amber-300">
                <AlertCircle size={15} className="shrink-0" />
                {t.tools.dataLeak.found.replace("{count}", String(result.breaches.length))}
              </p>
              <ul className="space-y-1.5">
                {result.breaches.map((b) => (
                  <li
                    key={b.name}
                    className="flex items-center justify-between text-xs font-mono px-3 py-1.5 rounded-md bg-muted/30 border border-border/50"
                  >
                    <span>{b.name}</span>
                    <span className="text-muted-foreground">{b.year}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="text-[11px] text-muted-foreground italic pt-1 border-t border-border/50">
            {t.tools.dataLeak.footnote}
          </p>
        </div>
      )}
    </div>
  );
}
