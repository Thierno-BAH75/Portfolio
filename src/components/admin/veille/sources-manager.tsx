"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Radio, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { AdminVeilleSource } from "@/lib/admin-data";
import {
  createVeilleSource,
  updateVeilleSource,
  deleteVeilleSource,
  testVeilleSource,
} from "@/lib/actions/veille";

function SourceRow({ source, onChanged }: { source: AdminVeilleSource; onChanged: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleActive = (isActive: boolean) => {
    startTransition(async () => {
      const result = await updateVeilleSource(source.id, {
        name: source.name,
        url: source.url,
        domain: source.domain,
        category: source.category ?? undefined,
        isActive,
        displayOrder: source.displayOrder,
      });
      if (!result.success) setError(result.error);
      else onChanged();
    });
  };

  const handleTest = () => {
    setTestResult(null);
    startTransition(async () => {
      const result = await testVeilleSource(source.url);
      setTestResult(
        result.success
          ? { ok: true, message: `OK (HTTP ${result.status})` }
          : { ok: false, message: result.error }
      );
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteVeilleSource(source.id);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setConfirmOpen(false);
      onChanged();
    });
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
      <Switch checked={source.isActive} onCheckedChange={toggleActive} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{source.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {source.domain} · {source.url}
        </p>
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
      {testResult && (
        <span
          className={`inline-flex items-center gap-1 text-xs flex-shrink-0 ${
            testResult.ok ? "text-green-500" : "text-red-400"
          }`}
        >
          {testResult.ok ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
          {testResult.message}
        </span>
      )}
      <Button variant="outline" size="sm" onClick={handleTest} disabled={isPending}>
        <Radio size={13} />
        Tester
      </Button>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="flex-shrink-0 p-2 text-muted-foreground hover:text-red-400 transition-colors"
      >
        <Trash2 size={15} />
      </button>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Supprimer cette source ?"
        description={`« ${source.name} » sera retirée de la veille.`}
        loading={isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function AddSourceForm({ nextOrder, onAdded }: { nextOrder: number; onAdded: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    if (!name.trim() || !url.trim() || !domain.trim()) return;
    startTransition(async () => {
      const result = await createVeilleSource({
        name: name.trim(),
        url: url.trim(),
        domain: domain.trim(),
        isActive: true,
        displayOrder: nextOrder,
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      setName("");
      setUrl("");
      setDomain("");
      onAdded();
    });
  };

  return (
    <div className="rounded-xl border border-dashed border-border p-4 space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Ajouter une source</p>
      <div className="grid sm:grid-cols-3 gap-2">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom (ex. ANSSI)" />
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL du flux RSS" />
        <Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="Domaine (ex. Cybersécurité)" />
      </div>
      <Button type="button" size="sm" variant="outline" onClick={handleAdd} disabled={isPending}>
        <Plus size={14} />
        Ajouter
      </Button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function SourcesManager({ sources }: { sources: AdminVeilleSource[] }) {
  const router = useRouter();
  const refresh = () => router.refresh();
  const nextOrder = sources.reduce((max, s) => Math.max(max, s.displayOrder), -1) + 1;

  return (
    <div className="space-y-3">
      {sources.map((source) => (
        <SourceRow key={source.id} source={source} onChanged={refresh} />
      ))}
      {sources.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">Aucune source configurée.</p>
      )}
      <AddSourceForm nextOrder={nextOrder} onAdded={refresh} />
    </div>
  );
}
