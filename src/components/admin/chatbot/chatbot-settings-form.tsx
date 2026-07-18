"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormFeedback } from "@/components/admin/form-feedback";
import { chatbotSettingsSchema, type ChatbotSettingsFormValues } from "@/lib/schemas";
import { updateChatbotSettings } from "@/lib/actions/chatbot-settings";

const TONE_OPTIONS: { value: ChatbotSettingsFormValues["tone"]; label: string; description: string }[] = [
  {
    value: "warm",
    label: "Professionnel et chaleureux",
    description: "Ton par défaut du site : accessible, chaleureux, jamais robotique.",
  },
  {
    value: "direct",
    label: "Direct et concis",
    description: "Va droit au but, réponses plus courtes même sur les questions développées.",
  },
  {
    value: "detailed",
    label: "Détaillé et pédagogue",
    description: "Développe davantage les explications, ajoute contexte et analogies.",
  },
];

export function ChatbotSettingsForm({ initial }: { initial: ChatbotSettingsFormValues }) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ status: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChatbotSettingsFormValues>({
    resolver: zodResolver(chatbotSettingsSchema),
    defaultValues: initial,
  });

  const extraInstructions = watch("extraInstructions") ?? "";

  const onSubmit = (values: ChatbotSettingsFormValues) => {
    startTransition(async () => {
      const result = await updateChatbotSettings(values);
      setFeedback(
        result.success
          ? { status: "success", message: "Réglages du chatbot enregistrés." }
          : { status: "error", message: result.error }
      );
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Chatbot IA</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ton et instructions supplémentaires injectés dans le system prompt de l&apos;assistant.
        </p>
      </div>

      {feedback && (
        <FormFeedback status={feedback.status} errorMessage={feedback.message} successMessage={feedback.message} />
      )}

      <section className="space-y-3">
        <label className="text-xs font-medium text-muted-foreground">Ton général</label>
        <Select {...register("tone")}>
          {TONE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
        <p className="text-xs text-muted-foreground">
          {TONE_OPTIONS.find((o) => o.value === watch("tone"))?.description}
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">Instructions supplémentaires</label>
          <span className="text-[11px] text-muted-foreground">{extraInstructions.length}/2000</span>
        </div>
        <Textarea
          rows={5}
          placeholder="Ex. : insiste davantage sur mon expérience réseau. Évite de mentionner tel sujet."
          {...register("extraInstructions")}
        />
        {errors.extraInstructions && (
          <p className="text-xs text-red-400">{errors.extraInstructions.message}</p>
        )}
      </section>

      <div className="flex items-start gap-2.5 rounded-lg border border-cyan-500/25 bg-cyan-500/5 px-4 py-3 text-xs text-muted-foreground">
        <ShieldCheck size={15} className="shrink-0 mt-0.5 text-cyan-400" />
        <p>
          Ce champ ajoute des consignes de style ou d&apos;emphase — il ne peut jamais désactiver les
          garde-fous de sécurité du chatbot (refus des sujets hors profil/cybersécurité, rejet de toute
          instruction glissée dans un message visiteur, angle strictement défensif, interdiction
          d&apos;inventer des faits sur Thierno). Ces règles restent codées en dur et prioritaires.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
