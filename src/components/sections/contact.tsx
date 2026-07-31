"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionBackground } from "@/components/ui/section-background";
import { useI18n } from "@/i18n";
import type { PersonalInfo } from "@/lib/data";

// Badge carré-arrondi 40×40 : fond transparent, bordure fine, glow violet au
// survol (même signature de glow que ContactCard sur /contact — cf.
// contact-page-client.tsx). Icône en text-foreground plutôt qu'un blanc en
// dur : blanc en thème sombre (comme demandé), mais reste lisible en clair
// au lieu de disparaître sur fond blanc.
function InfoBubble({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const badge = (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border/60 transition-all duration-300 group-hover:border-violet-500/50 group-hover:shadow-[0_0_16px_rgba(139,92,246,0.3)]">
      <Icon size={18} className="text-foreground" />
    </span>
  );
  const text = (
    <span className="text-left">
      <span className="block text-xs text-muted-foreground">{label}</span>
      <span className="block text-sm font-medium text-foreground">{value}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} className="group flex items-center gap-3">
        {badge}
        {text}
      </a>
    );
  }
  return (
    <div className="group flex items-center gap-3">
      {badge}
      {text}
    </div>
  );
}

// Aperçu léger de la section Contact — même pattern « page dédiée + aperçu
// home » que Projets/Certifications (cf. certifications-preview.tsx) : le
// formulaire complet (+ carte contact rapide) vit désormais sur /contact
// (src/app/contact/contact-page-client.tsx), déplacé tel quel depuis ce
// fichier. Header identique à celui de la page dédiée (eyebrow/titre/
// sous-titre partagés, même convention que Certifications). Enrichi de 3
// bulles de contact rapide (email/téléphone/localisation) et d'un encart
// CTA unique — id="contact" conservé pour l'ancrage retour depuis
// BackToHomeLink et les liens historiques vers "/#contact".
export function Contact({ personalInfo }: { personalInfo: PersonalInfo }) {
  const { t, tx } = useI18n();
  const PHONE_HREF = `tel:+33${personalInfo.phone.replace(/\s/g, "").slice(1)}`;

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-32" id="contact">
      <SectionBackground glowPosition="bottom-right" variant="cyan" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto flex flex-col items-center text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {t.contact.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t.contact.titleStart}{" "}
            <span className="gradient-text">{t.contact.titleGradient}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl">{t.contact.subtitle}</p>

          {personalInfo.available && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-xs font-medium text-green-500 mt-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {t.header.availableFull}
            </span>
          )}

          {/* Bulles de contact rapide — valeurs depuis personal_info (Supabase) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            <InfoBubble
              icon={Mail}
              label={t.contact.emailLabel}
              value={personalInfo.email}
              href={`mailto:${personalInfo.email}`}
            />
            <InfoBubble
              icon={Phone}
              label={t.contact.phoneLabel}
              value={personalInfo.phone}
              href={PHONE_HREF}
            />
            <InfoBubble
              icon={MapPin}
              label={t.contact.locationLabel}
              value={tx(personalInfo.location)}
            />
          </div>

          {/* Encart CTA — dégradé violet→cyan sur le bouton, fond de carte +
              bordure dégradée (même traitement que la carte "Profil en bref"
              d'À propos), seul appel à l'action du teaser. */}
          <div className="mt-10 w-full max-w-xl rounded-2xl p-[1px] bg-gradient-to-br from-violet-500/50 via-border/40 to-cyan-400/50">
            <div className="rounded-[calc(1rem-1px)] bg-card/95 backdrop-blur-sm p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold">{t.contact.ctaTitle}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t.contact.ctaSubtitle}</p>
              <Button
                size="lg"
                asChild
                className="mt-6 border-0 bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
              >
                <Link href="/contact">
                  <Send size={18} />
                  {t.contact.sendMessage}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
