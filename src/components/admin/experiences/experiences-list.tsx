"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { AdminExperience } from "@/lib/admin-data";
import { deleteExperience } from "@/lib/actions/experiences";
import { experienceTypeLabels } from "./constants";

export function ExperiencesList({ experiences }: { experiences: AdminExperience[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<AdminExperience | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteExperience(deleteTarget.id);
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
          <h1 className="text-2xl font-bold">Expériences</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {experiences.length} expérience{experiences.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/experiences/new">
            <Plus size={16} />
            Nouvelle expérience
          </Link>
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-2">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-violet-500/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-medium text-foreground truncate">{exp.title.fr}</span>
                <Badge variant="outline">{experienceTypeLabels[exp.type]}</Badge>
                {exp.current && (
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    En cours
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {exp.company} · {exp.startDate} → {exp.endDate ?? "aujourd'hui"}
              </p>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <Button variant="ghost" size="icon" asChild title="Modifier">
                <Link href={`/admin/experiences/${exp.id}`}>
                  <Pencil size={15} />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Supprimer"
                className="hover:text-red-400"
                onClick={() => setDeleteTarget(exp)}
              >
                <Trash2 size={15} />
              </Button>
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">Aucune expérience pour l&apos;instant.</p>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Supprimer cette expérience ?"
        description={`« ${deleteTarget?.title.fr} » chez ${deleteTarget?.company} sera supprimée définitivement.`}
        loading={isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
