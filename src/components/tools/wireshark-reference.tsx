"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n";
import { ReferenceInfo } from "./reference-info";
import { SEVERITY_CLASSES, type Severity } from "./tool-ui";
import { cn } from "@/lib/utils";

const PROTOCOLS = [
  { id: "tcpip" as const, port: "—", risk: "low" as Severity },
  { id: "udp" as const, port: "—", risk: "low" as Severity },
  { id: "http" as const, port: "80 / 443", risk: "medium" as Severity },
  { id: "dns" as const, port: "53", risk: "medium" as Severity },
  { id: "ssh" as const, port: "22", risk: "low" as Severity },
  { id: "smb" as const, port: "445", risk: "high" as Severity },
  { id: "arp" as const, port: "—", risk: "high" as Severity },
];

const ATTACKS = ["arpSpoofing", "dnsSpoofing", "mitm", "synFlood", "ddos"] as const;
const DEFENSES = ["vlanSegmentation", "tlsEncryption", "firewallFiltering", "monitoringIds", "updates"] as const;

type Tab = "protocols" | "attacks" | "defense";

export function WiresharkReference() {
  const { t } = useI18n();
  const info = t.tools.wiresharkReference;
  const [tab, setTab] = useState<Tab>("protocols");

  const TABS: { key: Tab; label: string }[] = [
    { key: "protocols", label: info.tabs.protocols },
    { key: "attacks", label: info.tabs.attacks },
    { key: "defense", label: info.tabs.defense },
  ];

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="flex gap-1 p-1 rounded-lg bg-muted/30 border border-border/50">
          {TABS.map((tb) => (
            <button
              key={tb.key}
              type="button"
              onClick={() => setTab(tb.key)}
              className={cn(
                "flex-1 h-8 rounded-md text-xs font-semibold transition-all",
                tab === tb.key
                  ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {tab === "protocols" && (
          <div className="space-y-2">
            {PROTOCOLS.map((p) => {
              const data = info.protocolsData[p.id];
              return (
                <div key={p.id} className="rounded-lg border border-border/60 bg-background/50 p-3">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <span className="flex items-baseline gap-2">
                      <span className="font-semibold text-sm">{data.name}</span>
                      <span className="font-mono text-[11px] text-cyan-400">{p.port}</span>
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full border shrink-0",
                        SEVERITY_CLASSES[p.risk]
                      )}
                    >
                      {t.tools.common.severity[p.risk]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{data.description}</p>
                </div>
              );
            })}
          </div>
        )}

        {tab === "attacks" && (
          <div className="space-y-2">
            {ATTACKS.map((id) => {
              const data = info.attacksData[id];
              return (
                <div key={id} className="rounded-lg border border-border/60 bg-background/50 p-3">
                  <p className="font-semibold text-sm mb-1">{data.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{data.description}</p>
                </div>
              );
            })}
          </div>
        )}

        {tab === "defense" && (
          <div className="space-y-2">
            {DEFENSES.map((id) => {
              const data = info.defenseData[id];
              return (
                <div key={id} className="flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                  <CheckCircle2 size={14} className="text-green-500 shrink-0 mt-0.5" />
                  <span>
                    <span className="block font-semibold text-sm">{data.title}</span>
                    <span className="block text-xs text-muted-foreground leading-relaxed mt-0.5">
                      {data.description}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-1 border-t border-border/60">
        <ReferenceInfo
          useCases={info.useCases}
          context={info.context}
          useCasesLabel={t.tools.common.useCasesLabel}
          contextLabel={t.tools.common.contextLabel}
        />
      </div>
    </div>
  );
}
