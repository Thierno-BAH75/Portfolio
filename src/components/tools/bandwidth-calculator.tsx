"use client";

import { useMemo, useState } from "react";
import { Zap } from "lucide-react";
import { useI18n } from "@/i18n";
import { ToolInput, ToolStatGrid, type ToolStat } from "./tool-ui";
import { Select } from "@/components/ui/select";

const SIZE_UNITS: Record<string, number> = { KB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12 };
const SPEED_UNITS: Record<string, number> = { Kbps: 1e3, Mbps: 1e6, Gbps: 1e9 };

function formatDuration(seconds: number, t: ReturnType<typeof useI18n>["t"]): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "—";
  if (seconds < 1) return `< 1 ${t.tools.bandwidthCalculator.units.s}`;
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts: string[] = [];
  if (d > 0) parts.push(`${d} ${t.tools.bandwidthCalculator.units.d}`);
  if (h > 0) parts.push(`${h} ${t.tools.bandwidthCalculator.units.h}`);
  if (m > 0 && d === 0) parts.push(`${m} ${t.tools.bandwidthCalculator.units.m}`);
  if (s > 0 && d === 0 && h === 0) parts.push(`${s} ${t.tools.bandwidthCalculator.units.s}`);
  return parts.slice(0, 2).join(" ") || `0 ${t.tools.bandwidthCalculator.units.s}`;
}

export function BandwidthCalculator() {
  const { t } = useI18n();
  const [size, setSize] = useState("500");
  const [sizeUnit, setSizeUnit] = useState("MB");
  const [speed, setSpeed] = useState("100");
  const [speedUnit, setSpeedUnit] = useState("Mbps");

  const seconds = useMemo(() => {
    const sizeBytes = Number(size) * (SIZE_UNITS[sizeUnit] ?? 0);
    const speedBps = Number(speed) * (SPEED_UNITS[speedUnit] ?? 0);
    if (!sizeBytes || !speedBps) return null;
    return (sizeBytes * 8) / speedBps;
  }, [size, sizeUnit, speed, speedUnit]);

  const stats: ToolStat[] = seconds !== null
    ? [
        { value: formatDuration(seconds, t), label: t.tools.bandwidthCalculator.statsTimeLabel, tone: "neutral" },
        { value: `${speed} ${speedUnit}`, label: t.tools.bandwidthCalculator.statsSpeedLabel, tone: "neutral" },
      ]
    : [];

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.bandwidthCalculator.intro}</p>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium mb-1">{t.tools.bandwidthCalculator.sizeLabel}</label>
          <div className="flex gap-1.5">
            <ToolInput
              type="number"
              min={0}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <Select value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value)} className="w-24 shrink-0">
              {Object.keys(SIZE_UNITS).map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">{t.tools.bandwidthCalculator.speedLabel}</label>
          <div className="flex gap-1.5">
            <ToolInput
              type="number"
              min={0}
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
            <Select value={speedUnit} onChange={(e) => setSpeedUnit(e.target.value)} className="w-24 shrink-0">
              {Object.keys(SPEED_UNITS).map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {stats.length > 0 && (
        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-xs text-cyan-300">
            <Zap size={13} />
            {t.tools.bandwidthCalculator.resultLabel}
          </p>
          <ToolStatGrid stats={stats} />
        </div>
      )}
    </div>
  );
}
