"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Archive, ArchiveRestore, Trash2, Mail, MailOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { AdminContactMessage } from "@/lib/admin-data";
import { toggleArchiveMessage, deleteMessage } from "@/lib/actions/contact-messages";
import { cn } from "@/lib/utils";

const FILTERS = ["unread", "all", "archived"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_LABELS: Record<Filter, string> = {
  unread: "Non lus",
  all: "Tous",
  archived: "Archivés",
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

export function MessagesList({ messages }: { messages: AdminContactMessage[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<Filter>("unread");
  const [deleteTarget, setDeleteTarget] = useState<AdminContactMessage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "unread") return messages.filter((m) => !m.read && !m.archived);
    if (filter === "archived") return messages.filter((m) => m.archived);
    return messages.filter((m) => !m.archived);
  }, [messages, filter]);

  const unreadCount = messages.filter((m) => !m.read && !m.archived).length;

  const handleToggleArchive = (message: AdminContactMessage) => {
    startTransition(async () => {
      const result = await toggleArchiveMessage(message.id, !message.archived);
      if (!result.success) setError(result.error);
      else router.refresh();
    });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteMessage(deleteTarget.id);
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
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {unreadCount > 0 ? `${unreadCount} non lu${unreadCount > 1 ? "s" : ""}` : "Aucun message non lu"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              filter === f
                ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border-violet-500/40 text-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {FILTER_LABELS[f]}
            {f === "unread" && unreadCount > 0 && ` (${unreadCount})`}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-2">
        {filtered.map((message) => (
          <Link
            key={message.id}
            href={`/admin/messages/${message.id}`}
            className={cn(
              "flex items-center gap-4 rounded-xl border bg-card p-4 hover:border-violet-500/30 transition-colors",
              message.read ? "border-border" : "border-cyan-500/30 bg-cyan-500/[0.03]"
            )}
          >
            <div className="flex-shrink-0">
              {message.read ? (
                <MailOpen size={17} className="text-muted-foreground" />
              ) : (
                <Mail size={17} className="text-cyan-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className={cn("truncate", message.read ? "text-foreground" : "font-semibold text-foreground")}>
                  {message.firstName} {message.lastName}
                </span>
                {!message.read && (
                  <Badge variant="outline" className="border-cyan-500/40 text-cyan-400 text-[10px]">
                    Non lu
                  </Badge>
                )}
                {message.archived && (
                  <Badge variant="outline" className="text-[10px]">
                    Archivé
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {message.subject || message.message}
              </p>
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:block">
              {formatDate(message.createdAt)}
            </span>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleArchive(message);
                }}
                disabled={isPending}
                title={message.archived ? "Désarchiver" : "Archiver"}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {message.archived ? <ArchiveRestore size={15} /> : <Archive size={15} />}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteTarget(message);
                }}
                title="Supprimer"
                className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-muted/50 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">Aucun message ici.</p>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Supprimer ce message ?"
        description={`Le message de ${deleteTarget?.firstName} ${deleteTarget?.lastName} sera supprimé définitivement.`}
        loading={isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}
