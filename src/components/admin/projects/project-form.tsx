"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FormFeedback } from "@/components/admin/form-feedback";
import { TagInput } from "@/components/admin/tag-input";
import { projectSchema, projectCategories, type ProjectFormValues } from "@/lib/schemas";
import { slugify } from "@/lib/utils";
import { createProject, updateProject } from "@/lib/actions/projects";
import { projectCategoryLabels, LONG_DESCRIPTION_TEMPLATE_FR, LONG_DESCRIPTION_TEMPLATE_EN } from "./constants";

const EMPTY_VALUES: ProjectFormValues = {
  slug: "",
  title: { fr: "", en: "" },
  description: { fr: "", en: "" },
  longDescription: { fr: LONG_DESCRIPTION_TEMPLATE_FR, en: LONG_DESCRIPTION_TEMPLATE_EN },
  image: "",
  technologies: [],
  category: "infrastructure",
  links: {},
  featured: false,
  status: "draft",
  date: new Date().toISOString().slice(0, 7),
  metrics: [],
  challenges: [],
};

interface ProjectFormProps {
  mode: "create" | "edit";
  projectId?: string;
  initial?: ProjectFormValues;
}

export function ProjectForm({ mode, projectId, initial }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ status: "success" | "error"; message: string } | null>(null);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initial ?? EMPTY_VALUES,
  });

  const metricsArray = useFieldArray({ control, name: "metrics" });
  const challengesArray = useFieldArray({ control, name: "challenges" });

  const titleFr = watch("title.fr");
  const technologies = watch("technologies");
  const featured = watch("featured");
  const status = watch("status");

  const handleTitleFrChange = (value: string) => {
    setValue("title.fr", value);
    if (!slugTouched) {
      setValue("slug", slugify(value));
    }
  };

  const onSubmit = (values: ProjectFormValues) => {
    startTransition(async () => {
      const result =
        mode === "create" ? await createProject(values) : await updateProject(projectId!, values);

      if (!result.success) {
        setFeedback({ status: "error", message: result.error });
        return;
      }

      setFeedback({ status: "success", message: "Projet enregistré." });
      router.push("/admin/projects");
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{mode === "create" ? "Nouveau projet" : "Modifier le projet"}</h1>
      </div>

      {feedback && <FormFeedback status={feedback.status} errorMessage={feedback.message} successMessage={feedback.message} />}

      {/* Titre */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Titre</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Titre (FR) *</label>
            <Input value={titleFr} onChange={(e) => handleTitleFrChange(e.target.value)} />
            {errors.title?.fr && <p className="text-xs text-red-400">{errors.title.fr.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Titre (EN) *</label>
            <Input {...register("title.en")} />
            {errors.title?.en && <p className="text-xs text-red-400">{errors.title.en.message}</p>}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Slug (URL) * — /projects/{watch("slug") || "…"}
          </label>
          <Input
            {...register("slug", { onChange: () => setSlugTouched(true) })}
            placeholder="mon-projet"
          />
          {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
        </div>
      </section>

      {/* Description */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Description courte
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">FR *</label>
            <Textarea rows={4} {...register("description.fr")} />
            {errors.description?.fr && <p className="text-xs text-red-400">{errors.description.fr.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">EN *</label>
            <Textarea rows={4} {...register("description.en")} />
            {errors.description?.en && <p className="text-xs text-red-400">{errors.description.en.message}</p>}
          </div>
        </div>
      </section>

      {/* Description longue */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Description détaillée (Markdown, page projet)
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">FR</label>
            <Textarea rows={14} className="font-mono text-xs" {...register("longDescription.fr")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">EN</label>
            <Textarea rows={14} className="font-mono text-xs" {...register("longDescription.en")} />
          </div>
        </div>
      </section>

      {/* Métadonnées */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Métadonnées</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Catégorie</label>
            <Select {...register("category")}>
              {projectCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {projectCategoryLabels[cat]}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Date (AAAA-MM) *</label>
            <Input placeholder="2026-07" {...register("date")} />
            {errors.date && <p className="text-xs text-red-400">{errors.date.message}</p>}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Image (chemin, ex. /projects/mon-projet.svg) *
          </label>
          <Input {...register("image")} />
          {errors.image && <p className="text-xs text-red-400">{errors.image.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Technologies *</label>
          <TagInput value={technologies} onChange={(tags) => setValue("technologies", tags)} />
          {errors.technologies && <p className="text-xs text-red-400">{errors.technologies.message as string}</p>}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Lien GitHub</label>
            <Input placeholder="https://github.com/…" {...register("links.github")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Lien démo</label>
            <Input placeholder="https://…" {...register("links.demo")} />
          </div>
        </div>
      </section>

      {/* Statut */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Statut</h2>
        <div className="flex flex-wrap gap-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <Switch checked={featured} onCheckedChange={(v) => setValue("featured", v)} />
            <span className="text-sm">Projet mis en avant (featured)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <Switch
              checked={status === "published"}
              onCheckedChange={(v) => setValue("status", v ? "published" : "draft")}
            />
            <span className="text-sm">
              {status === "published" ? "Publié (visible sur le site)" : "Brouillon (masqué du site public)"}
            </span>
          </label>
        </div>
      </section>

      {/* Résultats chiffrés */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Résultats chiffrés (optionnel)
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              metricsArray.append({ icon: "Activity", value: "", label: { fr: "", en: "" } })
            }
          >
            <Plus size={14} />
            Ajouter
          </Button>
        </div>
        {metricsArray.fields.map((field, index) => (
          <div key={field.id} className="grid sm:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 items-start">
            <Input placeholder="Icône (Lucide)" {...register(`metrics.${index}.icon`)} />
            <Input placeholder="Valeur (ex. 100+)" {...register(`metrics.${index}.value`)} />
            <Input placeholder="Libellé FR" {...register(`metrics.${index}.label.fr`)} />
            <Input placeholder="Libellé EN" {...register(`metrics.${index}.label.en`)} />
            <button
              type="button"
              onClick={() => metricsArray.remove(index)}
              className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </section>

      {/* Défis */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Défis rencontrés (optionnel)
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              challengesArray.append({
                title: { fr: "", en: "" },
                problem: { fr: "", en: "" },
                solution: { fr: "", en: "" },
              })
            }
          >
            <Plus size={14} />
            Ajouter
          </Button>
        </div>
        {challengesArray.fields.map((field, index) => (
          <div key={field.id} className="rounded-xl border border-border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Défi {index + 1}</span>
              <button
                type="button"
                onClick={() => challengesArray.remove(index)}
                className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input placeholder="Titre FR" {...register(`challenges.${index}.title.fr`)} />
              <Input placeholder="Titre EN" {...register(`challenges.${index}.title.en`)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Textarea rows={3} placeholder="Problème FR" {...register(`challenges.${index}.problem.fr`)} />
              <Textarea rows={3} placeholder="Problème EN" {...register(`challenges.${index}.problem.en`)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Textarea rows={3} placeholder="Solution FR" {...register(`challenges.${index}.solution.fr`)} />
              <Textarea rows={3} placeholder="Solution EN" {...register(`challenges.${index}.solution.en`)} />
            </div>
          </div>
        ))}
      </section>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enregistrement…" : mode === "create" ? "Créer le projet" : "Enregistrer"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
