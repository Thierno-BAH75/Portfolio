"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, MapPin, Phone, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn, StaggerChildren, StaggerItem, GlowOnHover } from "@/components/animations";
import { personalInfo, socialLinks } from "@/data/experience";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form data:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();

    // Réinitialiser après 5 secondes
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="pt-10 pb-20 lg:pt-16 lg:pb-32 bg-muted/30" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <span className="text-primary font-medium">Contact</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Travaillons{" "}
              <span className="gradient-text">ensemble</span>
            </h2>
            <p className="text-muted-foreground mt-4">
              Vous avez un projet en tête ? N&apos;hésitez pas à me contacter.
              Je serai ravi de discuter de vos idées.
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Contact Info */}
          <FadeIn direction="left" className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Informations de contact
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
                      <p className="text-sm text-muted-foreground">Email</p>
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
                      <p className="text-sm text-muted-foreground">Localisation</p>
                      <p className="font-medium">{personalInfo.location}</p>
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
                    Disponible pour de nouveaux projets
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
                  <h3 className="font-semibold text-foreground">Disponibilité</h3>
                </div>

                <ul className="space-y-2">
                  {[
                    { day: "Lundi – Vendredi", hours: "9h00 – 18h00", open: true },
                    { day: "Samedi", hours: "10h00 – 16h00", open: true },
                    { day: "Dimanche", hours: "Fermé", open: false },
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
                    Réponse sous 24h garantie
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
                    Message envoyé !
                  </h3>
                  <p className="text-muted-foreground">
                    Merci pour votre message. Je vous répondrai dans les plus
                    brefs délais.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nom</label>
                      <Input
                        placeholder="Votre nom"
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
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
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
                    <label className="text-sm font-medium">Sujet</label>
                    <Input
                      placeholder="Le sujet de votre message"
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
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Décrivez votre projet ou votre message..."
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
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Envoyer le message
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
