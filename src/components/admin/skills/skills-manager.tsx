"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { AdminSkill } from "@/lib/admin-data";
import { createSkill, updateSkill, deleteSkill } from "@/lib/actions/skills";
import type { SkillCategory } from "@/types";
import { skillCategoryLabels, skillCategoryDefaultIcon, skillCategoryOrder } from "./constants";

function skillDisplayName(skill: AdminSkill): { fr: string; en: string } {
  if (typeof skill.name === "string") return { fr: skill.name, en: "" };
  return skill.name;
}

function SkillRow({ skill, onChanged }: { skill: AdminSkill; onChanged: () => void }) {
  const [isPending, startTransition] = useTransition();
  const initialName = skillDisplayName(skill);
  const [nameFr, setNameFr] = useState(initialName.fr);
  const [nameEn, setNameEn] = useState(initialName.en);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    if (nameFr === initialName.fr && nameEn === initialName.en) return;
    startTransition(async () => {
      const result = await updateSkill(skill.id, {
        nameFr,
        nameEn,
        icon: skill.icon,
        category: skill.category,
        displayOrder: skill.displayOrder,
      });
      if (!result.success) setError(result.error);
      else onChanged();
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteSkill(skill.id);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setConfirmOpen(false);
      onChanged();
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        value={nameFr}
        onChange={(e) => setNameFr(e.target.value)}
        onBlur={save}
        placeholder="Nom"
        className="h-9 text-sm"
      />
      <Input
        value={nameEn}
        onChange={(e) => setNameEn(e.target.value)}
        onBlur={save}
        placeholder="Nom EN (si différent)"
        className="h-9 text-sm w-40 flex-shrink-0 hidden sm:block"
      />
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        disabled={isPending}
        className="flex-shrink-0 p-2 text-muted-foreground hover:text-red-400 transition-colors"
      >
        <Trash2 size={14} />
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Supprimer cette compétence ?"
        description={`« ${nameFr} » sera supprimée définitivement.`}
        loading={isPending}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function AddSkillRow({ category, nextOrder, onAdded }: { category: SkillCategory; nextOrder: number; onAdded: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    startTransition(async () => {
      const result = await createSkill({
        nameFr: trimmed,
        nameEn: "",
        icon: skillCategoryDefaultIcon[category],
        category,
        displayOrder: nextOrder,
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      setName("");
      onAdded();
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
          }
        }}
        placeholder="Nouvelle compétence…"
        className="h-9 text-sm"
      />
      <Button type="button" size="sm" variant="outline" onClick={handleAdd} disabled={isPending}>
        <Plus size={14} />
      </Button>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function SkillsManager({ skills }: { skills: AdminSkill[] }) {
  const router = useRouter();
  const refresh = () => router.refresh();
  const maxOrder = skills.reduce((max, s) => Math.max(max, s.displayOrder), -1);

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Compétences</h1>
      <p className="text-sm text-muted-foreground mb-8">{skills.length} compétences au total</p>

      <div className="space-y-8">
        {skillCategoryOrder.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);
          return (
            <section key={category}>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {skillCategoryLabels[category]} ({categorySkills.length})
              </h2>
              <div className="space-y-2">
                {categorySkills.map((skill) => (
                  <SkillRow key={skill.id} skill={skill} onChanged={refresh} />
                ))}
                <AddSkillRow category={category} nextOrder={maxOrder + 1} onAdded={refresh} />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
