"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionBackground } from "@/components/ui/section-background";
import { CertificationCard } from "@/components/certifications/certification-card";
import { useI18n } from "@/i18n";
import type { Certification } from "@/types";

export function CertificationsPreview({
  certifications,
}: {
  certifications: Certification[];
}) {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-32" id="certifications">
      <SectionBackground glowPosition="bottom-right" variant="cyan" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — même pattern que Skills/Contact/Parcours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {t.certifications.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t.certifications.titleStart}{" "}
            <span className="gradient-text">{t.certifications.titleGradient}</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t.certifications.subtitle}
          </p>
        </motion.div>

        {/* Grille compacte */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.name.fr} cert={cert} index={index} compact />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-500/40 bg-violet-500/5 text-sm font-medium transition-all hover:border-transparent hover:bg-gradient-to-r hover:from-violet-600 hover:to-cyan-500 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]"
          >
            {t.certifications.viewAll}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
