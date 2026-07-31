"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionBackground } from "@/components/ui/section-background";
import { useI18n } from "@/i18n";
import type { PersonalInfo } from "@/lib/data";

// Aperçu léger de la section Contact — même pattern « page dédiée + aperçu
// home » que Projets/Certifications (cf. certifications-preview.tsx) : le
// formulaire complet (+ carte contact rapide) vit désormais sur /contact
// (src/app/contact/contact-page-client.tsx), déplacé tel quel depuis ce
// fichier. Header identique à celui de la page dédiée (eyebrow/titre/
// sous-titre partagés, même convention que Certifications), suivi d'un seul
// CTA vers /contact — id="contact" conservé pour l'ancrage retour depuis
// BackToHomeLink et les liens historiques vers "/#contact".
export function Contact({ personalInfo }: { personalInfo: PersonalInfo }) {
  const { t } = useI18n();

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

          <Button
            size="lg"
            asChild
            className="mt-8 border-0 bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
          >
            <Link href="/contact">
              <Send size={18} />
              {t.contact.cta}
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-4">{t.contact.responseTime}</p>
        </motion.div>
      </div>
    </section>
  );
}
