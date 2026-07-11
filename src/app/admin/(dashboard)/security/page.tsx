import { getConnectionLogs } from "@/lib/admin-data";
import { MfaSettings } from "@/components/admin/security/mfa-settings";
import { ConnectionLogsTable } from "@/components/admin/security/connection-logs-table";

export default async function AdminSecurityPage() {
  const logs = await getConnectionLogs(50);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Sécurité</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Authentification à deux facteurs et journal des connexions à ce panneau.
      </p>

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Authentification à deux facteurs (TOTP)
        </h2>
        <MfaSettings />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Dernières connexions
        </h2>
        <ConnectionLogsTable logs={logs} />
      </section>
    </div>
  );
}
