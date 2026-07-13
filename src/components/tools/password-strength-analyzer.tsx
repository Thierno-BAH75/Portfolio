"use client";

import { useMemo, useState } from "react";
import { Check, Eye, EyeOff, KeyRound, X } from "lucide-react";
import { useI18n } from "@/i18n";
import { ToolInput, ToolStatGrid, type ToolStat, type StatTone } from "./tool-ui";
import { cn } from "@/lib/utils";

type Level = "weak" | "fair" | "good" | "strong";

const LEVEL_CLASSES: Record<Level, string> = {
  weak: "text-red-400 border-red-500/30 bg-red-500/10",
  fair: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  good: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  strong: "text-green-400 border-green-500/30 bg-green-500/10",
};

const LEVEL_TONE: Record<Level, StatTone> = {
  weak: "bad",
  fair: "warn",
  good: "neutral",
  strong: "good",
};

function levelFromEntropy(bits: number): Level {
  if (bits < 28) return "weak";
  if (bits < 45) return "fair";
  if (bits < 65) return "good";
  return "strong";
}

// Estimation pédagogique : hypothèse d'un attaquant hors-ligne rapide
// (10 milliards d'essais/seconde), cas moyen (moitié de l'espace de clés)
const GUESSES_PER_SECOND = 1e10;

function formatCrackTime(seconds: number, t: ReturnType<typeof useI18n>["t"]): string {
  const u = t.tools.passwordStrength.units;
  if (seconds < 1) return `< 1 ${u.second}`;
  if (seconds < 60) return `${Math.round(seconds)} ${u.second}`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} ${u.minute}`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} ${u.hour}`;
  const days = hours / 24;
  if (days < 365) return `${Math.round(days)} ${u.day}`;
  const years = days / 365;
  if (years < 1000) return `${Math.round(years)} ${u.year}`;
  if (years < 1e6) return `${Math.round(years / 1000)}k ${u.year}`;
  return `${(years / 1e6).toExponential(1)}M ${u.year}`;
}

export function PasswordStrengthAnalyzer() {
  const { t } = useI18n();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const analysis = useMemo(() => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    const length = password.length;

    let charsetSize = 0;
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasDigit) charsetSize += 10;
    if (hasSymbol) charsetSize += 32;

    const entropy = length > 0 && charsetSize > 0 ? length * Math.log2(charsetSize) : 0;
    const level = levelFromEntropy(entropy);
    const crackSeconds = entropy > 0 ? Math.pow(2, entropy) / (2 * GUESSES_PER_SECOND) : 0;

    return {
      length,
      hasLower,
      hasUpper,
      hasDigit,
      hasSymbol,
      entropy,
      level,
      crackSeconds,
    };
  }, [password]);

  const criteria = [
    { met: analysis.length >= 8, label: t.tools.passwordStrength.criteria.minLength },
    { met: analysis.length >= 12, label: t.tools.passwordStrength.criteria.recommendedLength },
    { met: analysis.hasLower && analysis.hasUpper, label: t.tools.passwordStrength.criteria.mixedCase },
    { met: analysis.hasDigit, label: t.tools.passwordStrength.criteria.digit },
    { met: analysis.hasSymbol, label: t.tools.passwordStrength.criteria.symbol },
  ];

  const stats: ToolStat[] = password
    ? [
        { value: `${Math.round(analysis.entropy)} bits`, label: t.tools.passwordStrength.statsEntropyLabel, tone: LEVEL_TONE[analysis.level] },
        { value: formatCrackTime(analysis.crackSeconds, t), label: t.tools.passwordStrength.statsCrackTimeLabel, tone: LEVEL_TONE[analysis.level] },
        { value: analysis.length, label: t.tools.passwordStrength.statsLengthLabel, tone: "neutral" },
      ]
    : [];

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.passwordStrength.intro}</p>

      <div className="relative">
        <ToolInput
          type={visible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.tools.passwordStrength.placeholder}
          className="pr-11 font-mono"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={visible ? t.tools.passwordStrength.hide : t.tools.passwordStrength.show}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {password && (
        <div className="space-y-4">
          <div className={cn("rounded-xl border p-3.5 text-center", LEVEL_CLASSES[analysis.level])}>
            <p className="flex items-center justify-center gap-1.5 text-sm font-semibold">
              <KeyRound size={14} />
              {t.tools.passwordStrength.levels[analysis.level]}
            </p>
          </div>

          <ToolStatGrid stats={stats} />

          <div className="space-y-1.5">
            {criteria.map((c) => (
              <div
                key={c.label}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs",
                  c.met
                    ? "border-green-500/20 bg-green-500/5 text-foreground"
                    : "border-border/50 bg-background/40 text-muted-foreground"
                )}
              >
                {c.met ? (
                  <Check size={13} className="text-green-500 shrink-0" />
                ) : (
                  <X size={13} className="text-muted-foreground shrink-0" />
                )}
                {c.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
