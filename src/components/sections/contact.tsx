"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionBackground } from "@/components/ui/section-background";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import type { PersonalInfo } from "@/lib/data";

// Carte info : même signature que ProjectCard/CertificationCard (bordure
// fine → anneau dégradé violet→cyan au survol, léger lift au hover), mais
// contenu texte centré et empilé (icône nue → libellé → valeur) plutôt que
// la mise en page habituelle alignée à gauche. `href` optionnel : email/
// téléphone restent cliquables (mailto/tel), localisation reste un <div>.
function InfoCard({
  icon: Icon,
  iconClassName,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  iconClassName: string;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <Icon size={40} strokeWidth={1.5} className={cn("shrink-0", iconClassName)} />
      <p className="font-bold text-foreground mt-3">{label}</p>
      <p className="text-sm text-muted-foreground mt-1 break-all">{value}</p>
    </>
  );
  const innerClassName =
    "relative flex h-full flex-col items-center text-center rounded-[calc(1rem-1px)] bg-card p-6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative h-full rounded-2xl p-[1px]"
    >
      {/* Bordure fine de base */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl border border-border/50 transition-opacity duration-300 group-hover:opacity-0"
      />
      {/* Anneau dégradé violet→cyan au hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/70 to-cyan-400/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      {href ? (
        <a href={href} className={innerClassName}>
          {content}
        </a>
      ) : (
        <div className={innerClassName}>{content}</div>
      )}
    </motion.div>
  );
}

// Aperçu léger de la section Contact — même pattern « page dédiée + aperçu
// home » que Projets/Certifications : le formulaire complet vit sur
// /contact (src/app/contact/contact-page-client.tsx). Deux temps ici :
// 1. Header + badge + 3 cartes de contact rapide (email/téléphone/
//    localisation depuis personal_info), dans le container habituel.
// 2. Bannière CTA plein fond violet→cyan, volontairement HORS du container
//    (pleine largeur, sans le padding horizontal du site) pour trancher
//    visuellement avec le reste de la home — pas un encart discret.
// id="contact" conservé sur la section pour l'ancrage retour depuis
// BackToHomeLink et les liens historiques vers "/#contact".
export function Contact({ personalInfo }: { personalInfo: PersonalInfo }) {
  const { t, tx } = useI18n();
  const PHONE_HREF = `tel:+33${personalInfo.phone.replace(/\s/g, "").slice(1)}`;

  return (
    <section className="relative overflow-hidden" id="contact">
      <SectionBackground glowPosition="bottom-right" variant="cyan" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-28 pb-14 sm:pb-16 lg:pb-20">
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
        </motion.div>

        {/* Cartes de contact rapide — 1 col mobile / 2 tablette / 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto mt-10">
          <InfoCard
            icon={Mail}
            iconClassName="text-cyan-400"
            label={t.contact.emailLabel}
            value={personalInfo.email}
            href={`mailto:${personalInfo.email}`}
          />
          <InfoCard
            icon={Phone}
            iconClassName="text-violet-400"
            label={t.contact.phoneLabel}
            value={personalInfo.phone}
            href={PHONE_HREF}
          />
          <InfoCard
            icon={MapPin}
            iconClassName="text-cyan-400"
            label={t.contact.locationLabel}
            value={tx(personalInfo.location)}
          />
        </div>
      </div>

      {/* Bannière CTA — fond dégradé plein, pleine largeur (hors container) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative bg-gradient-to-br from-violet-600 to-cyan-500 py-16 sm:py-20 lg:py-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white">
            {t.contact.bannerTitle}
          </h3>
          <p className="text-white/85 mt-3 max-w-xl mx-auto">{t.contact.bannerSubtitle}</p>
          <Button
            size="lg"
            asChild
            className="mt-8 border-0 bg-white text-violet-700 shadow-lg hover:bg-white/90 hover:shadow-xl hover:scale-[1.02]"
          >
            <Link href="/contact">{t.contact.bannerCta}</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
