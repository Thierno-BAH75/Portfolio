import { LogIn, LogOut, KeyRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AdminConnectionLog } from "@/lib/admin-data";

const EVENT_LABELS: Record<AdminConnectionLog["eventType"], string> = {
  login: "Connexion",
  logout: "Déconnexion",
  mfa_challenge: "Vérification 2FA",
};

const EVENT_ICONS: Record<AdminConnectionLog["eventType"], typeof LogIn> = {
  login: LogIn,
  logout: LogOut,
  mfa_challenge: KeyRound,
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(iso));
}

function shortUserAgent(ua: string | null): string {
  if (!ua) return "—";
  const browserMatch = ua.match(/(Chrome|Firefox|Safari|Edge)\/[\d.]+/);
  const osMatch = ua.match(/\(([^)]+)\)/);
  const browser = browserMatch ? browserMatch[0].split("/")[0] : "Navigateur";
  const os = osMatch ? osMatch[1].split(";")[0] : "";
  return `${browser} · ${os}`;
}

export function ConnectionLogsTable({ logs }: { logs: AdminConnectionLog[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/30">
            <tr>
              <th className="text-left font-medium text-muted-foreground px-4 py-2.5">Type</th>
              <th className="text-left font-medium text-muted-foreground px-4 py-2.5">Date</th>
              <th className="text-left font-medium text-muted-foreground px-4 py-2.5">IP</th>
              <th className="text-left font-medium text-muted-foreground px-4 py-2.5">Navigateur</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs.map((log) => {
              const Icon = EVENT_ICONS[log.eventType];
              return (
                <tr key={log.id}>
                  <td className="px-4 py-2.5">
                    <Badge variant="outline" className="gap-1">
                      <Icon size={11} />
                      {EVENT_LABELS[log.eventType]}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{formatDate(log.createdAt)}</td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{log.ip ?? "—"}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{shortUserAgent(log.userAgent)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {logs.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">Aucune connexion journalisée.</p>
        )}
      </div>
    </div>
  );
}
