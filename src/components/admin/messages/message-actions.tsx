"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Archive, ArchiveRestore, Trash2, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toggleArchiveMessage, deleteMessage } from "@/lib/actions/contact-messages";
import type { AdminContactMessage } from "@/lib/admin-data";

export function MessageActions({ message }: { message: AdminContactMessage }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mailtoHref = `mailto:${message.email}?subject=${encodeURIComponent(
    `Re: ${message.subject || "Votre message"}`
  )}`;

  const handleToggleArchive = () => {
    startTransition(async () => {
      const result = await toggleArchiveMessage(message.id, !message.archived);
      if (!result.success) setError(result.error);
      else router.refresh();
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteMessage(message.id);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.push("/admin/messages");
      router.refresh();
    });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Button asChild size="sm">
          <a href={mailtoHref}>
            <Reply size={14} />
            Répondre
          </a>
        </Button>
        <Button variant="outline" size="sm" onClick={handleToggleArchive} disabled={isPending}>
          {message.archived ? <ArchiveRestore size={14} /> : <Archive size={14} />}
          {message.archived ? "Désarchiver" : "Archiver"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirmOpen(true)}
          className="hover:text-red-400 hover:border-red-500/50"
        >
          <Trash2 size={14} />
          Supprimer
        </Button>
      </div>
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Supprimer ce message ?"
        description={`Le message de ${message.firstName} ${message.lastName} sera supprimé définitivement.`}
        loading={isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
