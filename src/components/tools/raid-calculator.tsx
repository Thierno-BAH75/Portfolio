"use client";

import { useMemo, useState } from "react";
import { HardDrive } from "lucide-react";
import { useI18n } from "@/i18n";
import { ToolInput, ToolStatGrid, type ToolStat } from "./tool-ui";
import { Select } from "@/components/ui/select";

type RaidType = "0" | "1" | "5" | "6" | "10";

const MIN_DISKS: Record<RaidType, number> = { "0": 2, "1": 2, "5": 3, "6": 4, "10": 4 };

function usableFactor(type: RaidType, disks: number): number | null {
  if (disks < MIN_DISKS[type]) return null;
  switch (type) {
    case "0": return disks;
    case "1": return 1;
    case "5": return disks - 1;
    case "6": return disks - 2;
    case "10": return disks % 2 === 0 ? disks / 2 : null;
  }
}

function toleranceDisks(type: RaidType, disks: number): number {
  switch (type) {
    case "0": return 0;
    case "1": return disks - 1;
    case "5": return 1;
    case "6": return 2;
    case "10": return disks / 2;
  }
}

export function RaidCalculator() {
  const { t } = useI18n();
  const [type, setType] = useState<RaidType>("5");
  const [disks, setDisks] = useState("4");
  const [sizePerDisk, setSizePerDisk] = useState("2");

  const result = useMemo(() => {
    const n = Number(disks);
    const size = Number(sizePerDisk);
    if (!Number.isInteger(n) || n < 2 || !size || size <= 0) return null;
    const factor = usableFactor(type, n);
    if (factor === null) return null;
    return {
      usableTb: factor * size,
      totalTb: n * size,
      tolerance: toleranceDisks(type, n),
    };
  }, [type, disks, sizePerDisk]);

  const stats: ToolStat[] = result
    ? [
        { value: `${result.usableTb} TB`, label: t.tools.raidCalculator.statsUsableLabel, tone: "neutral" },
        { value: result.tolerance, label: t.tools.raidCalculator.statsToleranceLabel, tone: result.tolerance > 0 ? "good" : "warn" },
        {
          value: `${Math.round((result.usableTb / result.totalTb) * 100)}%`,
          label: t.tools.raidCalculator.statsEfficiencyLabel,
          tone: "neutral",
        },
      ]
    : [];

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.raidCalculator.intro}</p>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium mb-1">{t.tools.raidCalculator.typeLabel}</label>
          <Select value={type} onChange={(e) => setType(e.target.value as RaidType)}>
            <option value="0">RAID 0</option>
            <option value="1">RAID 1</option>
            <option value="5">RAID 5</option>
            <option value="6">RAID 6</option>
            <option value="10">RAID 10</option>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium mb-1">{t.tools.raidCalculator.disksLabel}</label>
            <ToolInput type="number" min={2} value={disks} onChange={(e) => setDisks(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">{t.tools.raidCalculator.sizeLabel}</label>
            <ToolInput type="number" min={0.1} step={0.1} value={sizePerDisk} onChange={(e) => setSizePerDisk(e.target.value)} />
          </div>
        </div>
      </div>

      {result ? (
        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <HardDrive size={13} />
            {t.tools.raidCalculator.totalLabel}: {result.totalTb} TB
          </p>
          <ToolStatGrid stats={stats} />
        </div>
      ) : (
        <p className="text-xs text-red-400">
          {t.tools.raidCalculator.invalidInput.replace("{min}", String(MIN_DISKS[type]))}
        </p>
      )}
    </div>
  );
}
