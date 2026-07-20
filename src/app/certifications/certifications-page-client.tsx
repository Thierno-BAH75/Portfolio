"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionBackground } from "@/components/ui/section-background";
import { BackToHomeLink } from "@/components/ui/back-to-home-link";
import { CertificationCard } from "@/components/certifications/certification-card";
import { useI18n } from "@/i18n";
import { sortCertificationsByDate } from "@/lib/utils";
import type { Certification } from "@/types";

export function CertificationsPageClient({
  certifications,
}: {
  certifications: Certification[];
}) {
  const { t } = useI18n();
  const sortedCertifications = sortCertificationsByDate(certifications);

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <SectionBackground glowPosition="top-right" variant="violet" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <BackToHomeLink href="/#certifications" />

        {/* Header — même pattern que Skills/Contact/Parcours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30">
              <Award className="w-5 h-5 text-cyan-400" />
            </span>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {t.certifications.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t.certifications.titleStart}{" "}
            <span className="gradient-text">{t.certifications.titleGradient}</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t.certifications.subtitle}
          </p>
        </motion.div>

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {sortedCertifications.map((cert, index) => (
            <CertificationCard key={cert.name.fr} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
