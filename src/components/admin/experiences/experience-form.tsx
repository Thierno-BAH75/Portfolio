"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FormFeedback } from "@/components/admin/form-feedback";
import { TagInput } from "@/components/admin/tag-input";
import { DynamicListInput } from "@/components/admin/dynamic-list-input";
import { experienceSchema, experienceTypes, type ExperienceFormValues } from "@/lib/schemas";
import { createExperience, updateExperience } from "@/lib/actions/experiences";
import { experienceTypeLabels } from "./constants";

const EMPTY_VALUES: ExperienceFormValues = {
  title: { fr: "", en: "" },
  company: "",
  companyLogo: "",
  location: "",
  type: "apprenticeship",
  startDate: "",
  endDate: "",
  current: false,
  description: { fr: "", en: "" },
  achievements: { fr: [""], en: [""] },
  impact: { fr: "", en: "" },
  technologies: [],
  displayOrder: 0,
};

interface ExperienceFormProps {
  mode: "create" | "edit";
  experienceId?: string;
  initial?: ExperienceFormValues;
}

export function ExperienceForm({ mode, experienceId, initial }: ExperienceFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ status: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: initial ?? EMPTY_VALUES,
  });

  const technologies = watch("technologies");
  const current = watch("current");
  const achievementsFr = watch("achievements.fr");
  const achievementsEn = watch("achievements.en");

  const onSubmit = (values: ExperienceFormValues) => {
    startTransition(async () => {
      const result =
        mode === "create" ? await createExperience(values) : await updateExperience(experienceId!, values);

      if (!result.success) {
        setFeedback({ status: "error", message: result.error });
        return;
      }

      setFeedback({ status: "success", message: "Expérience enregistrée." });
      router.push("/admin/experiences");
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-8">
      <h1 className="text-2xl font-bold">{mode === "create" ? "Nouvelle expérience" : "Modifier l'expérience"}</h1>

      {feedback && (
        <FormFeedback status={feedback.status} errorMessage={feedback.message} successMessage={feedback.message} />
      )}

      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Poste (FR) *</label>
            <Input {...register("title.fr")} />
            {errors.title?.fr && <p className="text-xs text-red-400">{errors.title.fr.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Poste (EN) *</label>
            <Input {...register("title.en")} />
            {errors.title?.en && <p className="text-xs text-red-400">{errors.title.en.message}</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Entreprise *</label>
            <Input {...register("company")} />
            {errors.company && <p className="text-xs text-red-400">{errors.company.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Localisation *</label>
            <Input {...register("location")} />
            {errors.location && <p className="text-xs text-red-400">{errors.location.message}</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Type de contrat</label>
            <Select {...register("type")}>
              {experienceTypes.map((t) => (
                <option key={t} value={t}>
                  {experienceTypeLabels[t]}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Ordre d&apos;affichage</label>
            <Input type="number" {...register("displayOrder", { valueAsNumber: true })} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Date de début (AAAA-MM) *</label>
            <Input placeholder="2024-11" {...register("startDate")} />
            {errors.startDate && <p className="text-xs text-red-400">{errors.startDate.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Date de fin (AAAA-MM)</label>
            <Input placeholder="2025-12" disabled={current} {...register("endDate")} />
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <Switch checked={current} onCheckedChange={(v) => setValue("current", v)} />
          <span className="text-sm">Poste actuel (en cours)</span>
        </label>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Description</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">FR *</label>
            <Textarea rows={3} {...register("description.fr")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">EN *</label>
            <Textarea rows={3} {...register("description.en")} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Points clés (achievements)
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">FR *</label>
            <DynamicListInput
              value={achievementsFr}
              onChange={(items) => setValue("achievements.fr", items)}
              placeholder="Point clé…"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">EN *</label>
            <DynamicListInput
              value={achievementsEn}
              onChange={(items) => setValue("achievements.en", items)}
              placeholder="Key point…"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Impact (optionnel)
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input placeholder="Impact FR" {...register("impact.fr")} />
          <Input placeholder="Impact EN" {...register("impact.en")} />
        </div>
      </section>

      <section className="space-y-4">
        <label className="text-xs font-medium text-muted-foreground">Technologies</label>
        <TagInput value={technologies} onChange={(tags) => setValue("technologies", tags)} />
      </section>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enregistrement…" : mode === "create" ? "Créer" : "Enregistrer"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/experiences")}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
