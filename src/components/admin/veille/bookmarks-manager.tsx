"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pin, PinOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { AdminVeilleBookmark } from "@/lib/admin-data";
import { togglePinBookmark, deleteBookmark, createBookmark } from "@/lib/actions/veille";

function BookmarkRow({ bookmark, onChanged }: { bookmark: AdminVeilleBookmark; onChanged: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePin = () => {
    startTransition(async () => {
      const result = await togglePinBookmark(bookmark.id, !bookmark.isPinned);
      if (!result.success) setError(result.error);
      else onChanged();
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBookmark(bookmark.id);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setConfirmOpen(false);
      onChanged();
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="text-sm font-medium truncate">{bookmark.articleTitle}</p>
            {bookmark.isPinned && (
              <Badge variant="outline" className="border-cyan-500/40 text-cyan-400 gap-1 text-[10px]">
                <Pin size={9} /> Épinglé
              </Badge>
            )}
          </div>
          <a
            href={bookmark.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-cyan-400 truncate block"
          >
            {bookmark.sourceName ?? bookmark.articleUrl}
          </a>
          {(bookmark.commentFr || bookmark.commentEn) && (
            <p className="text-xs text-muted-foreground mt-2 italic">
              {bookmark.commentFr && <>FR : {bookmark.commentFr}</>}
              {bookmark.commentFr && bookmark.commentEn && <br />}
              {bookmark.commentEn && <>EN : {bookmark.commentEn}</>}
            </p>
          )}
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={togglePin}
            disabled={isPending}
            title={bookmark.isPinned ? "Désépingler" : "Épingler"}
            className="p-2 text-muted-foreground hover:text-cyan-400 transition-colors"
          >
            {bookmark.isPinned ? <PinOff size={15} /> : <Pin size={15} />}
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Supprimer cet article épinglé ?"
        description={`« ${bookmark.articleTitle} » sera retiré.`}
        loading={isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function AddBookmarkForm({ onAdded }: { onAdded: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [articleUrl, setArticleUrl] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [commentFr, setCommentFr] = useState("");
  const [commentEn, setCommentEn] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    if (!articleUrl.trim() || !articleTitle.trim()) return;
    startTransition(async () => {
      const result = await createBookmark({
        articleUrl: articleUrl.trim(),
        articleTitle: articleTitle.trim(),
        sourceName: sourceName.trim(),
        commentFr: commentFr.trim(),
        commentEn: commentEn.trim(),
        isPinned: true,
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      setArticleUrl("");
      setArticleTitle("");
      setSourceName("");
      setCommentFr("");
      setCommentEn("");
      onAdded();
    });
  };

  return (
    <div className="rounded-xl border border-dashed border-border p-4 space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Épingler un article</p>
      <Input value={articleUrl} onChange={(e) => setArticleUrl(e.target.value)} placeholder="URL de l'article" />
      <Input value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} placeholder="Titre" />
      <Input value={sourceName} onChange={(e) => setSourceName(e.target.value)} placeholder="Source (optionnel)" />
      <div className="grid sm:grid-cols-2 gap-2">
        <Textarea
          value={commentFr}
          onChange={(e) => setCommentFr(e.target.value)}
          placeholder="Commentaire FR (optionnel)"
          rows={2}
        />
        <Textarea
          value={commentEn}
          onChange={(e) => setCommentEn(e.target.value)}
          placeholder="Commentaire EN (optionnel)"
          rows={2}
        />
      </div>
      <Button type="button" size="sm" variant="outline" onClick={handleAdd} disabled={isPending}>
        <Plus size={14} />
        Épingler
      </Button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function BookmarksManager({ bookmarks }: { bookmarks: AdminVeilleBookmark[] }) {
  const router = useRouter();
  const refresh = () => router.refresh();

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkRow key={bookmark.id} bookmark={bookmark} onChanged={refresh} />
      ))}
      {bookmarks.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">Aucun article épinglé.</p>
      )}
      <AddBookmarkForm onAdded={refresh} />
    </div>
  );
}
