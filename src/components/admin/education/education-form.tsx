"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FormFeedback } from "@/components/admin/form-feedback";
import { educationSchema, educationStatuses, type EducationFormValues } from "@/lib/schemas";
import { createEducation, updateEducation } from "@/lib/actions/education";
import { educationStatusLabels } from "./constants";

const EMPTY_VALUES: EducationFormValues = {
  degree: { fr: "", en: "" },
  school: "",
  location: "",
  startDate: "",
  endDate: "",
  description: { fr: "", en: "" },
  status: undefined,
  note: { fr: "", en: "" },
  level: { fr: "", en: "" },
  displayOrder: 0,
};

interface EducationFormProps {
  mode: "create" | "edit";
  educationId?: string;
  initial?: EducationFormValues;
}

export function EducationForm({ mode, educationId, initial }: EducationFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ status: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: initial ?? EMPTY_VALUES,
  });

  const onSubmit = (values: EducationFormValues) => {
    startTransition(async () => {
      const result =
        mode === "create" ? await createEducation(values) : await updateEducation(educationId!, values);

      if (!result.success) {
        setFeedback({ status: "error", message: result.error });
        return;
      }

      setFeedback({ status: "success", message: "Formation enregistrée." });
      router.push("/admin/education");
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold">{mode === "create" ? "Nouvelle formation" : "Modifier la formation"}</h1>

      {feedback && (
        <FormFeedback status={feedback.status} errorMessage={feedback.message} successMessage={feedback.message} />
      )}

      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Diplôme (FR) *</label>
            <Input {...register("degree.fr")} />
            {errors.degree?.fr && <p className="text-xs text-red-400">{errors.degree.fr.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Diplôme (EN) *</label>
            <Input {...register("degree.en")} />
            {errors.degree?.en && <p className="text-xs text-red-400">{errors.degree.en.message}</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Établissement *</label>
            <Input {...register("school")} />
            {errors.school && <p className="text-xs text-red-400">{errors.school.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Localisation</label>
            <Input {...register("location")} />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Année de début *</label>
            <Input placeholder="2024" {...register("startDate")} />
            {errors.startDate && <p className="text-xs text-red-400">{errors.startDate.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Année de fin *</label>
            <Input placeholder="2025" {...register("endDate")} />
            {errors.endDate && <p className="text-xs text-red-400">{errors.endDate.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Statut</label>
            <Select {...register("status")}>
              <option value="">—</option>
              {educationStatuses.map((s) => (
                <option key={s} value={s}>
                  {educationStatusLabels[s]}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input placeholder="Niveau FR (ex. Bac+5)" {...register("level.fr")} />
          <Input placeholder="Niveau EN (ex. Master's degree)" {...register("level.en")} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input placeholder="Note FR (mise en avant)" {...register("note.fr")} />
          <Input placeholder="Note EN" {...register("note.en")} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Description (optionnel)
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Textarea rows={3} placeholder="Description FR" {...register("description.fr")} />
          <Textarea rows={3} placeholder="Description EN" {...register("description.en")} />
        </div>
      </section>

      <div className="space-y-1.5 max-w-xs">
        <label className="text-xs font-medium text-muted-foreground">Ordre d&apos;affichage</label>
        <Input type="number" {...register("displayOrder", { valueAsNumber: true })} />
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enregistrement…" : mode === "create" ? "Créer" : "Enregistrer"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/education")}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
