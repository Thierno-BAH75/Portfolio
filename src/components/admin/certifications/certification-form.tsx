"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormFeedback } from "@/components/admin/form-feedback";
import { certificationSchema, type CertificationFormValues } from "@/lib/schemas";
import { createCertification, updateCertification } from "@/lib/actions/certifications";

const EMPTY_VALUES: CertificationFormValues = {
  name: { fr: "", en: "" },
  issuer: "",
  date: "",
  expiry: "",
  icon: "shield",
  displayOrder: 0,
};

interface CertificationFormProps {
  mode: "create" | "edit";
  certificationId?: string;
  initial?: CertificationFormValues;
}

export function CertificationForm({ mode, certificationId, initial }: CertificationFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ status: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
    defaultValues: initial ?? EMPTY_VALUES,
  });

  const onSubmit = (values: CertificationFormValues) => {
    startTransition(async () => {
      const result =
        mode === "create"
          ? await createCertification(values)
          : await updateCertification(certificationId!, values);

      if (!result.success) {
        setFeedback({ status: "error", message: result.error });
        return;
      }

      setFeedback({ status: "success", message: "Certification enregistrée." });
      router.push("/admin/certifications");
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold">
        {mode === "create" ? "Nouvelle certification" : "Modifier la certification"}
      </h1>

      {feedback && (
        <FormFeedback status={feedback.status} errorMessage={feedback.message} successMessage={feedback.message} />
      )}

      <section className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Nom (FR) *</label>
            <Input {...register("name.fr")} />
            {errors.name?.fr && <p className="text-xs text-red-400">{errors.name.fr.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Nom (EN) *</label>
            <Input {...register("name.en")} />
            {errors.name?.en && <p className="text-xs text-red-400">{errors.name.en.message}</p>}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Émetteur *</label>
          <Input {...register("issuer")} />
          {errors.issuer && <p className="text-xs text-red-400">{errors.issuer.message}</p>}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Date d&apos;obtention (AAAA-MM) *</label>
            <Input placeholder="2025-12" {...register("date")} />
            {errors.date && <p className="text-xs text-red-400">{errors.date.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Date d&apos;expiration (optionnel)</label>
            <Input placeholder="2028-03" {...register("expiry")} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Icône (Lucide)</label>
            <Input placeholder="shield" {...register("icon")} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Ordre d&apos;affichage</label>
            <Input type="number" {...register("displayOrder", { valueAsNumber: true })} />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enregistrement…" : mode === "create" ? "Créer" : "Enregistrer"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/certifications")}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
