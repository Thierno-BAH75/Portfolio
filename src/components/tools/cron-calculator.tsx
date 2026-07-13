"use client";

import { useMemo, useState } from "react";
import { Clock } from "lucide-react";
import { useI18n } from "@/i18n";
import { ToolInput } from "./tool-ui";

function parseField(raw: string, min: number, max: number): Set<number> | null {
  const set = new Set<number>();
  for (const part of raw.split(",")) {
    const [range, stepStr] = part.split("/");
    const step = stepStr ? Number(stepStr) : 1;
    if (!Number.isInteger(step) || step < 1) return null;
    let start = min, end = max;
    if (range !== "*") {
      if (range.includes("-")) {
        const [a, b] = range.split("-").map(Number);
        if (!Number.isInteger(a) || !Number.isInteger(b) || a > b) return null;
        start = a;
        end = b;
      } else {
        const v = Number(range);
        if (!Number.isInteger(v)) return null;
        start = v;
        end = stepStr ? max : v;
      }
    }
    for (let v = start; v <= end; v += step) {
      if (v >= min && v <= max) set.add(v);
    }
  }
  return set.size > 0 ? set : null;
}

interface ParsedCron {
  minute: Set<number>;
  hour: Set<number>;
  dom: Set<number>;
  month: Set<number>;
  dow: Set<number>;
  domWildcard: boolean;
  dowWildcard: boolean;
}

function parseCron(expr: string): ParsedCron | null {
  const fields = expr.trim().split(/\s+/);
  if (fields.length !== 5) return null;
  const [minRaw, hourRaw, domRaw, monthRaw, dowRaw] = fields;
  const minute = parseField(minRaw, 0, 59);
  const hour = parseField(hourRaw, 0, 23);
  const dom = parseField(domRaw, 1, 31);
  const month = parseField(monthRaw, 1, 12);
  const dow = parseField(dowRaw, 0, 6);
  if (!minute || !hour || !dom || !month || !dow) return null;
  return { minute, hour, dom, month, dow, domWildcard: domRaw.trim() === "*", dowWildcard: dowRaw.trim() === "*" };
}

const MAX_LOOKAHEAD_MINUTES = 200_000; // ~139 jours, borne de sécurité pour éviter un calcul trop long

function nextExecutions(parsed: ParsedCron, count: number): Date[] {
  const results: Date[] = [];
  const cur = new Date();
  cur.setSeconds(0, 0);
  cur.setMinutes(cur.getMinutes() + 1);

  let steps = 0;
  while (results.length < count && steps < MAX_LOOKAHEAD_MINUTES) {
    const domOk = parsed.dom.has(cur.getDate());
    const dowOk = parsed.dow.has(cur.getDay());
    const dayMatches = parsed.domWildcard || parsed.dowWildcard ? domOk && dowOk : domOk || dowOk;

    if (
      parsed.minute.has(cur.getMinutes()) &&
      parsed.hour.has(cur.getHours()) &&
      parsed.month.has(cur.getMonth() + 1) &&
      dayMatches
    ) {
      results.push(new Date(cur));
    }
    cur.setMinutes(cur.getMinutes() + 1);
    steps++;
  }
  return results;
}

function buildExplanation(
  parsed: ParsedCron,
  minRaw: string,
  hourRaw: string,
  monthRaw: string,
  locale: string,
  t: ReturnType<typeof useI18n>["t"]
): string {
  const e = t.tools.cronCalculator.explain;
  const parts: string[] = [];

  if (minRaw === "*" && hourRaw === "*") {
    parts.push(e.everyMinute);
  } else if (minRaw !== "*" && hourRaw === "*" && !minRaw.includes(",") && !minRaw.includes("/") && !minRaw.includes("-")) {
    parts.push(e.everyHourAt.replace("{minute}", minRaw));
  } else if (
    minRaw !== "*" && hourRaw !== "*" &&
    !minRaw.includes(",") && !minRaw.includes("/") && !minRaw.includes("-") &&
    !hourRaw.includes(",") && !hourRaw.includes("/") && !hourRaw.includes("-")
  ) {
    const hh = hourRaw.padStart(2, "0");
    const mm = minRaw.padStart(2, "0");
    parts.push(e.dailyAt.replace("{time}", `${hh}:${mm}`));
  } else {
    parts.push(e.generic);
  }

  if (!parsed.dowWildcard) {
    const days = Array.from(parsed.dow)
      .sort((a, b) => a - b)
      .map((d) => new Intl.DateTimeFormat(locale, { weekday: "long" }).format(new Date(2023, 0, 1 + d)));
    parts.push(e.onDays.replace("{days}", days.join(", ")));
  }
  if (!parsed.domWildcard) {
    parts.push(e.onDayOfMonth.replace("{days}", Array.from(parsed.dom).sort((a, b) => a - b).join(", ")));
  }
  if (monthRaw !== "*") {
    const months = Array.from(parsed.month)
      .sort((a, b) => a - b)
      .map((m) => new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(2023, m - 1, 1)));
    parts.push(e.inMonths.replace("{months}", months.join(", ")));
  }

  return parts.join(" ");
}

export function CronCalculator() {
  const { t, locale } = useI18n();
  const [expr, setExpr] = useState("0 9 * * 1-5");

  const parsed = useMemo(() => parseCron(expr), [expr]);
  const fields = expr.trim().split(/\s+/);

  const explanation = useMemo(() => {
    if (!parsed || fields.length !== 5) return null;
    return buildExplanation(parsed, fields[0], fields[1], fields[3], locale, t);
  }, [parsed, fields, locale, t]);

  const upcoming = useMemo(() => {
    if (!parsed) return [];
    return nextExecutions(parsed, 5);
  }, [parsed]);

  const dateFormatter = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.cronCalculator.intro}</p>

      <ToolInput
        type="text"
        value={expr}
        onChange={(e) => setExpr(e.target.value)}
        placeholder="0 9 * * 1-5"
        className="font-mono"
      />

      {parsed && explanation ? (
        <div className="space-y-3">
          <div className="flex items-start gap-2 rounded-lg border border-violet-500/25 bg-violet-500/5 px-3.5 py-2.5 text-xs">
            <Clock size={14} className="text-violet-400 shrink-0 mt-0.5" />
            <p>{explanation}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              {t.tools.cronCalculator.nextRunsLabel}
            </p>
            {upcoming.length > 0 ? (
              <div className="rounded-lg border border-border/60 bg-background/50 divide-y divide-border/60">
                {upcoming.map((d) => (
                  <div key={d.toISOString()} className="px-3.5 py-2 font-mono text-xs text-cyan-400">
                    {dateFormatter.format(d)}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">{t.tools.cronCalculator.noUpcoming}</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-xs text-red-400">{t.tools.cronCalculator.invalidExpression}</p>
      )}
    </div>
  );
}
