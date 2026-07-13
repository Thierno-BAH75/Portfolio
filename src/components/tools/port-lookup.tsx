"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useI18n } from "@/i18n";
import { ToolInput } from "./tool-ui";

// Ports les plus courants — jeu de données statique, aucun appel réseau
const COMMON_PORTS = [
  { port: 20, name: "FTP-DATA", protocol: "TCP" },
  { port: 21, name: "FTP", protocol: "TCP" },
  { port: 22, name: "SSH", protocol: "TCP" },
  { port: 23, name: "Telnet", protocol: "TCP" },
  { port: 25, name: "SMTP", protocol: "TCP" },
  { port: 53, name: "DNS", protocol: "TCP/UDP" },
  { port: 67, name: "DHCP", protocol: "UDP" },
  { port: 68, name: "DHCP", protocol: "UDP" },
  { port: 80, name: "HTTP", protocol: "TCP" },
  { port: 110, name: "POP3", protocol: "TCP" },
  { port: 123, name: "NTP", protocol: "UDP" },
  { port: 143, name: "IMAP", protocol: "TCP" },
  { port: 161, name: "SNMP", protocol: "UDP" },
  { port: 389, name: "LDAP", protocol: "TCP" },
  { port: 443, name: "HTTPS", protocol: "TCP" },
  { port: 445, name: "SMB", protocol: "TCP" },
  { port: 465, name: "SMTPS", protocol: "TCP" },
  { port: 514, name: "Syslog", protocol: "UDP" },
  { port: 587, name: "SMTP-Submission", protocol: "TCP" },
  { port: 636, name: "LDAPS", protocol: "TCP" },
  { port: 993, name: "IMAPS", protocol: "TCP" },
  { port: 995, name: "POP3S", protocol: "TCP" },
  { port: 1433, name: "MSSQL", protocol: "TCP" },
  { port: 3306, name: "MySQL", protocol: "TCP" },
  { port: 3389, name: "RDP", protocol: "TCP" },
  { port: 5432, name: "PostgreSQL", protocol: "TCP" },
  { port: 5900, name: "VNC", protocol: "TCP" },
  { port: 6379, name: "Redis", protocol: "TCP" },
  { port: 8080, name: "HTTP-alt", protocol: "TCP" },
  { port: 27017, name: "MongoDB", protocol: "TCP" },
] as const;

export function PortLookup() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMON_PORTS;
    return COMMON_PORTS.filter(
      (p) => String(p.port).includes(q) || p.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.portLookup.intro}</p>

      <ToolInput
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.tools.portLookup.placeholder}
      />

      <div className="rounded-lg border border-border/60 bg-background/50 divide-y divide-border/60 max-h-72 overflow-y-auto">
        {results.length === 0 ? (
          <p className="px-3.5 py-3 text-xs text-muted-foreground">{t.tools.portLookup.noResults}</p>
        ) : (
          results.map((p) => {
            const usage = t.tools.portLookup.usages[String(p.port) as keyof typeof t.tools.portLookup.usages];
            return (
              <div key={`${p.port}-${p.name}`} className="flex items-start gap-3 px-3.5 py-2.5">
                <span className="font-mono text-xs text-cyan-400 w-14 shrink-0">{p.port}</span>
                <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground w-16 shrink-0 mt-0.5">
                  {p.protocol}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold">{p.name}</span>
                  {usage && <span className="block text-xs text-muted-foreground mt-0.5">{usage}</span>}
                </span>
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground italic">
        <Search size={11} />
        {t.tools.portLookup.footnote}
      </div>
    </div>
  );
}
