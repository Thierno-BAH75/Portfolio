"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FormFeedback } from "@/components/admin/form-feedback";
import { personalInfoSchema, type PersonalInfoFormValues } from "@/lib/schemas";
import { updatePersonalInfo } from "@/lib/actions/personal-info";
import { CvUpload } from "./cv-upload";

export function PersonalInfoForm({
  initial,
  cvUrl,
}: {
  initial: PersonalInfoFormValues;
  cvUrl?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ status: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initial,
  });

  const available = watch("available");

  const onSubmit = (values: PersonalInfoFormValues) => {
    startTransition(async () => {
      const result = await updatePersonalInfo(values);
      setFeedback(
        result.success
          ? { status: "success", message: "Informations enregistrées." }
          : { status: "error", message: result.error }
      );
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold">Infos perso</h1>

      {feedback && (
        <FormFeedback status={feedback.status} errorMessage={feedback.message} successMessage={feedback.message} />
      )}

      <section className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Nom complet *</label>
          <Input {...register("name")} />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Titre du poste (FR) *</label>
            <Input {...register("title.fr")} />
            {errors.title?.fr && <p className="text-xs text-red-400">{errors.title.fr.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Titre du poste (EN) *</label>
            <Input {...register("title.en")} />
            {errors.title?.en && <p className="text-xs text-red-400">{errors.title.en.message}</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Accroche (FR) *</label>
            <Textarea rows={3} {...register("tagline.fr")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Accroche (EN) *</label>
            <Textarea rows={3} {...register("tagline.en")} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Contact</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Email *</label>
            <Input type="email" {...register("email")} />
            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Téléphone *</label>
            <Input {...register("phone")} />
            {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input placeholder="Localisation FR" {...register("location.fr")} />
          <Input placeholder="Localisation EN" {...register("location.en")} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">GitHub</label>
            <Input placeholder="https://github.com/…" {...register("github")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">LinkedIn</label>
            <Input placeholder="https://www.linkedin.com/in/…" {...register("linkedin")} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">CV</h2>
        <CvUpload initialUrl={cvUrl} />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Disponibilité</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <Switch checked={available} onCheckedChange={(v) => setValue("available", v)} />
          <span className="text-sm">Disponible actuellement</span>
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input placeholder="Message FR (ex. Disponible en alternance)" {...register("seeking.fr")} />
          <Input placeholder="Message EN" {...register("seeking.en")} />
        </div>
      </section>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
