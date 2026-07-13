"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/i18n";
import { ToolInput, ToolStatGrid, type ToolStat } from "./tool-ui";

function parseIp(input: string): number[] | null {
  const parts = input.trim().split(".");
  if (parts.length !== 4) return null;
  const octets = parts.map((p) => Number(p));
  if (octets.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return null;
  return octets;
}

function octetsToInt(octets: number[]): number {
  return octets.reduce((acc, o) => acc * 256 + o, 0);
}

function intToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
}

// Accepte /24, 24 ou 255.255.255.0
function parsePrefix(input: string): number | null {
  const raw = input.trim().replace(/^\//, "");
  if (/^\d{1,2}$/.test(raw)) {
    const n = Number(raw);
    return n >= 0 && n <= 32 ? n : null;
  }
  const octets = parseIp(raw);
  if (!octets) return null;
  const maskInt = octetsToInt(octets);
  let prefix = 0;
  let seenZero = false;
  for (let i = 31; i >= 0; i--) {
    const bit = (maskInt >>> i) & 1;
    if (bit === 1) {
      if (seenZero) return null; // masque non contigu -> invalide
      prefix++;
    } else {
      seenZero = true;
    }
  }
  return prefix;
}

interface SubnetResult {
  network: string;
  broadcast: string;
  firstUsable: string;
  lastUsable: string;
  usableHosts: number;
  prefix: number;
}

function computeSubnet(ip: number[], prefix: number): SubnetResult {
  const ipInt = octetsToInt(ip);
  const maskInt = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;

  let firstUsable = networkInt;
  let lastUsable = broadcastInt;
  let usableHosts = 0;

  if (prefix === 32) {
    usableHosts = 1;
  } else if (prefix === 31) {
    usableHosts = 2;
  } else {
    firstUsable = networkInt + 1;
    lastUsable = broadcastInt - 1;
    usableHosts = Math.max(0, broadcastInt - networkInt - 1);
  }

  return {
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    firstUsable: intToIp(firstUsable),
    lastUsable: intToIp(lastUsable),
    usableHosts,
    prefix,
  };
}

export function SubnetCalculator() {
  const { t } = useI18n();
  const [ip, setIp] = useState("192.168.1.10");
  const [mask, setMask] = useState("24");

  const result = useMemo(() => {
    const octets = parseIp(ip);
    const prefix = parsePrefix(mask);
    if (!octets || prefix === null) return null;
    return computeSubnet(octets, prefix);
  }, [ip, mask]);

  const stats: ToolStat[] = result
    ? [
        { value: result.network, label: t.tools.subnetCalculator.statsNetworkLabel, tone: "neutral" },
        { value: result.broadcast, label: t.tools.subnetCalculator.statsBroadcastLabel, tone: "neutral" },
        { value: result.usableHosts, label: t.tools.subnetCalculator.statsHostsLabel, tone: "neutral" },
      ]
    : [];

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.subnetCalculator.intro}</p>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium mb-1">{t.tools.subnetCalculator.ipLabel}</label>
          <ToolInput
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.10"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">{t.tools.subnetCalculator.maskLabel}</label>
          <ToolInput
            type="text"
            value={mask}
            onChange={(e) => setMask(e.target.value)}
            placeholder="/24"
          />
        </div>
      </div>

      {result ? (
        <div className="space-y-3">
          <ToolStatGrid stats={stats} />
          <p className="font-mono text-xs text-muted-foreground">
            {t.tools.subnetCalculator.usableRangeLabel}{" "}
            <span className="text-cyan-400">
              {result.firstUsable} – {result.lastUsable}
            </span>{" "}
            (/{result.prefix})
          </p>
        </div>
      ) : (
        <p className="text-xs text-red-400">{t.tools.subnetCalculator.invalidInput}</p>
      )}
    </div>
  );
}
