"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Mail,
  Download,
  BadgeCheck,
  CalendarClock,
  Repeat2,
  Car,
  Languages,
  Award,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo, certifications } from "@/data/experience";
import { useI18n } from "@/i18n";

const CV_PDF = "/CV_Alternance_BAH-Thierno_2026.pdf";

// Les 4 certifications majeures (le tableau est ordonné par poids)
const FEATURED_CERTIFICATIONS = certifications.slice(0, 4);

// Apparition au scroll cohérente avec les autres sections, désactivable
function useFadeProps() {
  const reduce = useReducedMotion();

  return (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: {
            duration: 0.5,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };
}

function ProfileRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 shrink-0">
        <Icon size={15} />
      </span>
      <span className="text-sm text-muted-foreground w-28 shrink-0">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground min-w-0">
        {children}
      </span>
    </li>
  );
}

export function About() {
  const { t, tx } = useI18n();
  const fade = useFadeProps();

  return (
    <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden" id="about">

      <style>{`
        /* ── Fond cyber ─────────────────────────────────────── */
        .about-bg {
          background-color: hsl(var(--background));
        }
        .about-grid {
          background-image:
            radial-gradient(circle, rgba(139,92,246,0.26) 1px, transparent 1px),
            radial-gradient(circle, rgba(6,182,212,0.15) 1px, transparent 1px);
          background-size: 32px 32px, 64px 64px;
          background-position: 0 0, 16px 16px;
        }
        .about-corner-tl {
          background: radial-gradient(ellipse at top left, rgba(139,92,246,0.30) 0%, transparent 55%);
        }
        .about-corner-br {
          background: radial-gradient(ellipse at bottom right, rgba(6,182,212,0.22) 0%, transparent 55%);
        }
        .about-corner-tr {
          background: radial-gradient(ellipse at top right, rgba(59,130,246,0.18) 0%, transparent 50%);
        }
        .about-corner-bl {
          background: radial-gradient(ellipse at bottom left, rgba(139,92,246,0.14) 0%, transparent 50%);
        }
        .about-blob-center {
          background: radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 65%);
        }

        /* ── Lignes titre ───────────────────────────────────── */
        @keyframes pulse-violet {
          0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 0px rgba(139,92,246,0)); }
          50%       { opacity: 1;   filter: drop-shadow(0 0 6px rgba(139,92,246,0.9)); }
        }
        @keyframes pulse-cyan {
          0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 0px rgba(6,182,212,0)); }
          50%       { opacity: 1;   filter: drop-shadow(0 0 6px rgba(6,182,212,0.9)); }
        }
        .line-violet { animation: pulse-violet 2.4s ease-in-out infinite; }
        .line-cyan   { animation: pulse-cyan   2.4s ease-in-out infinite 0.4s; }

        /* ── Ronds clignotants ──────────────────────────────── */
        @keyframes dot-left {
          0%   { opacity: 0; box-shadow: none; }
          5%   { opacity: 1; box-shadow: 0 0 8px 3px rgba(139,92,246,0.9); }
          20%  { opacity: 1; box-shadow: 0 0 8px 3px rgba(139,92,246,0.9); }
          35%  { opacity: 0; box-shadow: none; }
          100% { opacity: 0; box-shadow: none; }
        }
        @keyframes dot-right {
          0%   { opacity: 0; box-shadow: none; }
          45%  { opacity: 0; box-shadow: none; }
          55%  { opacity: 1; box-shadow: 0 0 8px 3px rgba(6,182,212,0.9); }
          70%  { opacity: 1; box-shadow: 0 0 8px 3px rgba(6,182,212,0.9); }
          85%  { opacity: 0; box-shadow: none; }
          100% { opacity: 0; box-shadow: none; }
        }
        .dot-left  { animation: dot-left  3.6s ease-in-out infinite; background: #8b5cf6; }
        .dot-right { animation: dot-right 3.6s ease-in-out infinite; background: #06b6d4; }
      `}</style>

      {/* Fond : grille de points */}
      <div className="about-bg absolute inset-0 -z-10" />
      <div className="about-grid absolute inset-0 -z-10 opacity-60" />
      {/* Lueurs d'angle */}
      <div className="about-corner-tl absolute inset-0 -z-10" />
      <div className="about-corner-br absolute inset-0 -z-10" />
      <div className="about-corner-tr absolute inset-0 -z-10" />
      <div className="about-corner-bl absolute inset-0 -z-10" />
      <div className="about-blob-center absolute inset-0 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Titre avec lignes décoratives */}
        <motion.div {...fade()} className="flex items-center gap-4 mb-10 lg:mb-14">
          <span
            className="line-violet h-px flex-1 rounded-full"
            style={{ background: "linear-gradient(to right, transparent, #8b5cf6)" }}
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="dot-left w-3 h-3 rounded-full flex-shrink-0" />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
              {t.about.title}
            </h2>
            <span className="dot-right w-3 h-3 rounded-full flex-shrink-0" />
          </div>
          <span
            className="line-cyan h-px flex-1 rounded-full"
            style={{ background: "linear-gradient(to left, transparent, #06b6d4)" }}
          />
        </motion.div>

        {/* Deux colonnes : narratif à gauche, profil en bref à droite */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">

          {/* Colonne gauche — narratif en 3 temps */}
          <div className="space-y-6">
            <motion.p
              {...fade(0.05)}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              {t.about.p1}
            </motion.p>

            <motion.div {...fade(0.12)}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t.about.p2}
              </p>
              <ul className="mt-3 space-y-2">
                {t.about.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-2.5 text-sm sm:text-base text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-br from-violet-500 to-cyan-400" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.p
              {...fade(0.19)}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              {t.about.p3}
            </motion.p>

            {/* Infos pratiques — pas de téléphone sur une page publique */}
            <motion.div
              {...fade(0.26)}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
            >
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={15} className="text-violet-400 shrink-0" />
                {t.about.locationLabel}
                <span className="font-medium text-foreground">
                  {t.about.locationValue}
                </span>
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                <Mail size={15} className="text-cyan-400 shrink-0" />
                {t.about.emailLabel}
                <span className="font-medium text-foreground">
                  {personalInfo.email}
                </span>
              </a>
            </motion.div>

            {/* CTA */}
            <motion.div {...fade(0.33)} className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/85 shadow-lg"
                asChild
              >
                <a href={CV_PDF} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  {t.about.downloadCv}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#contact">{t.about.contact}</Link>
              </Button>
            </motion.div>
          </div>

          {/* Colonne droite — carte Profil en bref */}
          <motion.div {...fade(0.2)}>
            <div className="rounded-2xl p-[1px] bg-gradient-to-br from-violet-500/50 via-border/40 to-cyan-400/50">
              <div className="rounded-[calc(1rem-1px)] bg-card/95 backdrop-blur-sm p-6">
                <h3 className="font-semibold text-lg mb-5">
                  {t.about.profile.title}
                </h3>

                <ul className="space-y-3.5">
                  <ProfileRow icon={BadgeCheck} label={t.about.profile.status}>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-500 text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      {t.about.profile.statusValue}
                    </span>
                  </ProfileRow>
                  <ProfileRow
                    icon={CalendarClock}
                    label={t.about.profile.availability}
                  >
                    {t.about.profile.availabilityValue}
                  </ProfileRow>
                  <ProfileRow icon={Repeat2} label={t.about.profile.rhythm}>
                    {t.about.profile.rhythmValue}
                  </ProfileRow>
                  <ProfileRow icon={MapPin} label={t.about.profile.location}>
                    {t.about.profile.locationValue}
                  </ProfileRow>
                  <ProfileRow icon={Car} label={t.about.profile.mobility}>
                    {t.about.profile.mobilityValue}
                  </ProfileRow>
                  <ProfileRow icon={Languages} label={t.about.profile.english}>
                    {t.about.profile.englishValue}
                  </ProfileRow>
                </ul>

                {/* Certifications majeures */}
                <div className="mt-5 pt-5 border-t border-border/60">
                  <p className="flex items-center gap-2 text-sm font-medium mb-3">
                    <Award size={15} className="text-violet-400" />
                    {t.about.profile.certifications}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {FEATURED_CERTIFICATIONS.map((cert) => (
                      <span
                        key={cert.name.fr}
                        className="text-[11px] px-2.5 py-1 rounded-md border border-border/60 bg-background/60 text-muted-foreground"
                      >
                        {tx(cert.name)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
