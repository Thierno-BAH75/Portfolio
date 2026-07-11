"use client";

import { useMemo, useState } from "react";
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import type { AdminChatLog } from "@/lib/admin-data";

const PROVIDER_LABELS: Record<string, string> = {
  gemini: "Gemini",
  groq: "Groq",
  mistral: "Mistral",
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function ChatLogsList({ logs }: { logs: AdminChatLog[] }) {
  const [providerFilter, setProviderFilter] = useState("all");

  const providers = useMemo(
    () => Array.from(new Set(logs.map((l) => l.provider))).sort(),
    [logs]
  );

  const filtered = useMemo(
    () => (providerFilter === "all" ? logs : logs.filter((l) => l.provider === providerFilter)),
    [logs, providerFilter]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Journal du chatbot</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} question{filtered.length > 1 ? "s" : ""}
          </p>
        </div>
        <Select
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          className="w-auto"
        >
          <option value="all">Tous les fournisseurs</option>
          {providers.map((p) => (
            <option key={p} value={p}>
              {PROVIDER_LABELS[p] ?? p}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((log) => (
          <div key={log.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <MessageSquare size={14} className="text-cyan-400 flex-shrink-0" />
              <Badge variant="outline">{PROVIDER_LABELS[log.provider] ?? log.provider}</Badge>
              <Badge variant="outline">{log.locale.toUpperCase()}</Badge>
              <span className="text-xs text-muted-foreground ml-auto">{formatDate(log.createdAt)}</span>
            </div>
            <p className="text-sm font-medium mb-1.5">{log.question}</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{log.answer}</p>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">Aucune question pour l&apos;instant.</p>
        )}
      </div>
    </div>
  );
}
