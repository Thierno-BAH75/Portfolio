"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { AdminCertification } from "@/lib/admin-data";
import { deleteCertification } from "@/lib/actions/certifications";

export function CertificationsList({ items }: { items: AdminCertification[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<AdminCertification | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteCertification(deleteTarget.id);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setDeleteTarget(null);
      router.refresh();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Certifications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {items.length} certification{items.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/certifications/new">
            <Plus size={16} />
            Nouvelle certification
          </Link>
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-2">
        {items.map((cert) => (
          <div
            key={cert.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-violet-500/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <span className="font-medium text-foreground truncate block mb-1">{cert.name.fr}</span>
              <p className="text-xs text-muted-foreground">
                {cert.issuer} · {cert.date}
                {cert.expiry ? ` · expire ${cert.expiry}` : ""}
              </p>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <Button variant="ghost" size="icon" asChild title="Modifier">
                <Link href={`/admin/certifications/${cert.id}`}>
                  <Pencil size={15} />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Supprimer"
                className="hover:text-red-400"
                onClick={() => setDeleteTarget(cert)}
              >
                <Trash2 size={15} />
              </Button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">Aucune certification pour l&apos;instant.</p>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Supprimer cette certification ?"
        description={`« ${deleteTarget?.name.fr} » sera supprimée définitivement.`}
        loading={isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
