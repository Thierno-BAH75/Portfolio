"use client";

import { useState } from "react";
import { Check, Copy, Key } from "lucide-react";
import { useI18n } from "@/i18n";
import { ToolActionButton, ToolStatGrid, type ToolStat, type StatTone } from "./tool-ui";
import { Switch } from "@/components/ui/switch";

type Level = "weak" | "fair" | "good" | "strong";

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

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{}?";

function generate(length: number, useUpper: boolean, useDigits: boolean, useSymbols: boolean): string {
  let charset = LOWER;
  if (useUpper) charset += UPPER;
  if (useDigits) charset += DIGITS;
  if (useSymbols) charset += SYMBOLS;

  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length];
  }
  return result;
}

export function PasswordGenerator() {
  const { t } = useI18n();
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const run = () => {
    setPassword(generate(length, useUpper, useDigits, useSymbols));
    setCopied(false);
  };

  const copy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  let charsetSize = LOWER.length;
  if (useUpper) charsetSize += UPPER.length;
  if (useDigits) charsetSize += DIGITS.length;
  if (useSymbols) charsetSize += SYMBOLS.length;
  const entropy = length * Math.log2(charsetSize);
  const level = levelFromEntropy(entropy);

  const stats: ToolStat[] = password
    ? [
        { value: t.tools.passwordGenerator.levels[level], label: t.tools.passwordGenerator.statsStrengthLabel, tone: LEVEL_TONE[level] },
        { value: `${Math.round(entropy)} bits`, label: t.tools.passwordGenerator.statsEntropyLabel, tone: LEVEL_TONE[level] },
        { value: length, label: t.tools.passwordGenerator.statsLengthLabel, tone: "neutral" },
      ]
    : [];

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.passwordGenerator.intro}</p>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium">{t.tools.passwordGenerator.lengthLabel}</label>
          <span className="text-xs font-mono text-cyan-400">{length}</span>
        </div>
        <input
          type="range"
          min={8}
          max={64}
          step={1}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="tool-range"
          aria-label={t.tools.passwordGenerator.lengthLabel}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
          <span className="text-xs">{t.tools.passwordGenerator.optionUpper}</span>
          <Switch checked={useUpper} onCheckedChange={setUseUpper} />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
          <span className="text-xs">{t.tools.passwordGenerator.optionDigits}</span>
          <Switch checked={useDigits} onCheckedChange={setUseDigits} />
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
          <span className="text-xs">{t.tools.passwordGenerator.optionSymbols}</span>
          <Switch checked={useSymbols} onCheckedChange={setUseSymbols} />
        </div>
      </div>

      <ToolActionButton icon={Key} type="button" onClick={run}>
        {t.tools.passwordGenerator.generate}
      </ToolActionButton>

      {password && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/50 px-3.5 py-2.5">
            <p className="font-mono text-sm text-cyan-400 break-all flex-1">{password}</p>
            <button
              type="button"
              onClick={copy}
              className="text-muted-foreground hover:text-foreground shrink-0"
              aria-label={t.tools.hashGenerator.copy}
            >
              {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
            </button>
          </div>
          <ToolStatGrid stats={stats} />
        </div>
      )}
    </div>
  );
}
