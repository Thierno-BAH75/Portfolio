"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn, StaggerChildren, StaggerItem, GlowOnHover } from "@/components/animations";
import { personalInfo } from "@/data/experience";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import { makeContactSchema, type ContactFormData } from "@/lib/contact-schema";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { t, tx } = useI18n();

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
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setSubmitError(t.contact.form.errorText);
        return;
      }

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
    <section className="pt-10 pb-20 lg:pt-16 lg:pb-32 bg-muted/30" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <span className="text-primary font-medium">{t.contact.eyebrow}</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              {t.contact.titleStart}{" "}
              <span className="gradient-text">{t.contact.titleGradient}</span>
            </h2>
            <p className="text-muted-foreground mt-4">{t.contact.subtitle}</p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <FadeIn direction="left" className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">
                {t.contact.infoTitle}
              </h3>

              <StaggerChildren className="space-y-4" staggerDelay={0.15}>
                <StaggerItem>
                  <motion.div 
                    className="flex items-center space-x-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GlowOnHover glowColor="rgba(99, 102, 241, 0.4)">
                      <motion.div 
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail size={20} />
                      </motion.div>
                    </GlowOnHover>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.contact.emailLabel}</p>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </motion.div>
                </StaggerItem>

                <StaggerItem>
                  <motion.div 
                    className="flex items-center space-x-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GlowOnHover glowColor="rgba(99, 102, 241, 0.4)">
                      <motion.div 
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MapPin size={20} />
                      </motion.div>
                    </GlowOnHover>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.contact.locationLabel}</p>
                      <p className="font-medium">{tx(personalInfo.location)}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              </StaggerChildren>
            </div>

            {/* Availability */}
            {personalInfo.available && (
              <motion.div 
                className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, borderColor: "rgba(34, 197, 94, 0.5)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-2">
                  <motion.span 
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-green-500 font-medium">
                    {t.contact.availableBanner}
                  </span>
                </div>
              </motion.div>
            )}
            {/* Disponibilité */}
            <FadeIn delay={0.2}>
              <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Clock size={16} />
                  </div>
                  <h3 className="font-semibold text-foreground">{t.contact.availabilityTitle}</h3>
                </div>

                <ul className="space-y-2">
                  {[
                    { day: t.contact.monFri, hours: t.contact.hoursWeek, open: true },
                    { day: t.contact.saturday, hours: t.contact.hoursSat, open: true },
                    { day: t.contact.sunday, hours: t.contact.closed, open: false },
                  ].map(({ day, hours, open }) => (
                    <li key={day} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{day}</span>
                      <span className={cn("font-medium", open ? "text-foreground" : "text-muted-foreground")}>
                        {hours}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-1 border-t border-border">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {t.contact.responseGuarantee}
                  </span>
                </div>
              </div>
            </FadeIn>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="right" className="lg:col-span-3">
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t.contact.form.successTitle}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.contact.form.successText}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t.contact.form.name}</label>
                      <Input
                        placeholder={t.contact.form.namePlaceholder}
                        {...register("name")}
                        className={cn(errors.name && "border-red-500")}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t.contact.form.email}</label>
                      <Input
                        type="email"
                        placeholder={t.contact.form.emailPlaceholder}
                        {...register("email")}
                        className={cn(errors.email && "border-red-500")}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.contact.form.subject}</label>
                    <Input
                      placeholder={t.contact.form.subjectPlaceholder}
                      {...register("subject")}
                      className={cn(errors.subject && "border-red-500")}
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-500">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.contact.form.message}</label>
                    <Textarea
                      placeholder={t.contact.form.messagePlaceholder}
                      rows={5}
                      {...register("message")}
                      className={cn(errors.message && "border-red-500")}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
                    >
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{submitError}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
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
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
