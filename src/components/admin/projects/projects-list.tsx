"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Copy, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { AdminProject } from "@/lib/admin-data";
import { deleteProject, duplicateProject } from "@/lib/actions/projects";
import { projectCategoryLabels } from "./constants";

export function ProjectsList({ projects }: { projects: AdminProject[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<AdminProject | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteProject(deleteTarget.id);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setDeleteTarget(null);
      router.refresh();
    });
  };

  const handleDuplicate = (id: string) => {
    startTransition(async () => {
      const result = await duplicateProject(id);
      if (!result.success) setError(result.error);
      else router.refresh();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Projets</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {projects.length} projet{projects.length > 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/projects/new">
            <Plus size={16} />
            Nouveau projet
          </Link>
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-violet-500/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-medium text-foreground truncate">{project.title.fr}</span>
                {project.featured && (
                  <Badge variant="outline" className="border-violet-500/30 text-violet-400 gap-1">
                    <Star size={10} /> Featured
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={
                    project.status === "published"
                      ? "border-green-500/30 text-green-400"
                      : "border-amber-500/30 text-amber-400"
                  }
                >
                  {project.status === "published" ? "Publié" : "Brouillon"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {projectCategoryLabels[project.category]} · {project.date} · /{project.slug}
              </p>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <Button variant="ghost" size="icon" asChild title="Modifier">
                <Link href={`/admin/projects/${project.id}`}>
                  <Pencil size={15} />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Dupliquer"
                disabled={isPending}
                onClick={() => handleDuplicate(project.id)}
              >
                <Copy size={15} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                title="Supprimer"
                className="hover:text-red-400"
                onClick={() => setDeleteTarget(project)}
              >
                <Trash2 size={15} />
              </Button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">Aucun projet pour l&apos;instant.</p>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Supprimer ce projet ?"
        description={`« ${deleteTarget?.title.fr} » sera supprimé définitivement. Cette action est irréversible.`}
        loading={isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
