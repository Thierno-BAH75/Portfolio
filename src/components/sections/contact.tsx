"use client";

import { useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionBackground } from "@/components/ui/section-background";
import type { PersonalInfo } from "@/lib/data";
import type { SocialLink } from "@/types";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import { makeContactSchema, type ContactFormData } from "@/lib/contact-schema";
import { submitContactMessage } from "@/lib/actions/contact-messages";

// Spotlight radial qui suit la souris — CSS vars poussées sur la carte,
// zéro re-render React (même technique que src/components/sections/skills.tsx)
function setSpotlight(e: MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
}

const fieldClass =
  "bg-background/60 border-border/60 focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:border-cyan-400/50";

// Astérisque discret marquant les champs obligatoires
function RequiredMark() {
  return (
    <span className="text-violet-400 ml-0.5" aria-hidden="true">
      *
    </span>
  );
}

// Carte au style établi du site : bordure fine → anneau dégradé violet→cyan
// au survol, glow doux, spotlight qui suit la souris. Neutralisée sous
// prefers-reduced-motion (bordure statique, pas de spotlight ni de glow).
function ContactCard({
  className,
  children,
  reduceMotion,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  reduceMotion: boolean | null;
  delay?: number;
}) {
  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={reduceMotion ? undefined : setSpotlight}
      className={cn(
        "group relative rounded-2xl p-[1px]",
        !reduceMotion &&
          "transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15),0_0_18px_rgba(34,211,238,0.08)]",
        className
      )}
    >
      {/* Bordure fine de base */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-2xl border border-border/60 transition-all duration-300",
          reduceMotion ? "group-hover:border-violet-500/40" : "group-hover:opacity-0"
        )}
      />
      {/* Bordure dégradée violet→cyan au hover */}
      {!reduceMotion && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/60 to-cyan-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}

      <div className="relative h-full rounded-[calc(1rem-1px)] bg-card p-6 lg:p-8 overflow-hidden">
        {/* Spotlight radial discret qui suit la souris */}
        {!reduceMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(139,92,246,0.10), rgba(34,211,238,0.05) 45%, transparent 70%)",
            }}
          />
        )}
        <div className="relative h-full">{children}</div>
      </div>
    </motion.div>
  );
}

export function Contact({
  personalInfo,
  socialLinks,
}: {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const PHONE_HREF = `tel:+33${personalInfo.phone.replace(/\s/g, "").slice(1)}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(makeContactSchema(t.contact.errors)),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      console.error(
        "[Contact] NEXT_PUBLIC_FORMSPREE_ENDPOINT n'est pas défini. Ajoutez-le dans .env.local (voir .env.example)."
      );
      setSubmitError(t.contact.form.errorText);
      setIsSubmitting(false);
      return;
    }

    try {
      // Formspree affiche un champ "name" unique dans ses notifications ;
      // on concatène nom + prénom pour rester lisible côté réception.
      const payload = {
        name: `${data.lastName} ${data.firstName}`.trim(),
        email: data.email,
        subject: data.subject,
        message: data.message,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setSubmitError(t.contact.form.errorText);
        return;
      }

      // Copie du message en base pour la boîte de réception admin — en plus
      // de Formspree (jamais à sa place). Best-effort : un échec ici reste
      // invisible au visiteur, l'email étant déjà parti à ce stade.
      submitContactMessage(data).catch(() => {});

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setSubmitError(t.contact.form.errorText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-32" id="contact">
      <SectionBackground glowPosition="bottom-right" variant="cyan" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — même pattern que src/components/sections/skills.tsx */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {t.contact.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t.contact.titleStart}{" "}
            <span className="gradient-text">{t.contact.titleGradient}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {/* Formulaire */}
          <ContactCard reduceMotion={reduceMotion} className="lg:col-span-3">
            {isSubmitted ? (
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t.contact.form.successTitle}
                </h3>
                <p className="text-muted-foreground">{t.contact.form.successText}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t.contact.form.lastName}
                      <RequiredMark />
                    </label>
                    <Input
                      placeholder={t.contact.form.lastNamePlaceholder}
                      {...register("lastName")}
                      className={cn(fieldClass, errors.lastName && "border-red-500")}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-400">{errors.lastName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t.contact.form.firstName}
                      <RequiredMark />
                    </label>
                    <Input
                      placeholder={t.contact.form.firstNamePlaceholder}
                      {...register("firstName")}
                      className={cn(fieldClass, errors.firstName && "border-red-500")}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-400">{errors.firstName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t.contact.form.email}
                    <RequiredMark />
                  </label>
                  <Input
                    type="email"
                    placeholder={t.contact.form.emailPlaceholder}
                    {...register("email")}
                    className={cn(fieldClass, errors.email && "border-red-500")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.contact.form.subject}</label>
                  <Input
                    placeholder={t.contact.form.subjectPlaceholder}
                    {...register("subject")}
                    className={cn(fieldClass, errors.subject && "border-red-500")}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {t.contact.form.message}
                    <RequiredMark />
                  </label>
                  <Textarea
                    placeholder={t.contact.form.messagePlaceholder}
                    rows={5}
                    {...register("message")}
                    className={cn(fieldClass, errors.message && "border-red-500")}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {submitError && (
                  <motion.div
                    initial={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  >
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{submitError}</span>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full border-0 bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      {t.contact.form.sending}
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      {t.contact.form.send}
                    </>
                  )}
                </Button>
              </form>
            )}
          </ContactCard>

          {/* Contact rapide */}
          <ContactCard reduceMotion={reduceMotion} delay={0.1} className="lg:col-span-2">
            <div className="flex flex-col gap-6 h-full">
              <h3 className="font-semibold text-lg">{t.contact.quickTitle}</h3>

              {personalInfo.available && (
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-xs font-medium text-green-500 w-fit">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    {t.header.availableFull}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {t.contact.quickAvailability}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 text-sm">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-cyan-400 transition-colors"
                >
                  <Mail size={16} className="text-cyan-400 shrink-0" />
                  <span className="font-medium text-foreground break-all">
                    {personalInfo.email}
                  </span>
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-violet-400 transition-colors"
                >
                  <Phone size={16} className="text-violet-400 shrink-0" />
                  <span className="font-medium text-foreground">
                    {personalInfo.phone}
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-3">
                {socialLinks
                  .filter((social) => social.icon === "github" || social.icon === "linkedin")
                  .map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={cn(
                        "p-2.5 rounded-lg border border-border/60 text-muted-foreground transition-colors",
                        social.icon === "github"
                          ? "hover:text-violet-400 hover:border-violet-500/50"
                          : "hover:text-cyan-400 hover:border-cyan-400/50"
                      )}
                    >
                      {social.icon === "github" ? (
                        <Github size={18} />
                      ) : (
                        <Linkedin size={18} />
                      )}
                    </a>
                  ))}
              </div>

              <p className="text-sm text-muted-foreground mt-auto pt-2 border-t border-border/60">
                {t.contact.responseTime}
              </p>
            </div>
          </ContactCard>
        </div>
      </div>
    </section>
  );
}
