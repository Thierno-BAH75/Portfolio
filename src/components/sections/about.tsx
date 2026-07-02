"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Network, Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { personalInfo } from "@/data/experience";

const skillCards = [
  {
    icon: Shield,
    title: "Cybersécurité",
    color: "text-violet-400",
    borderHover: "hover:border-violet-500/60",
    glowHover: "hover:shadow-[0_0_28px_rgba(139,92,246,0.35)]",
    items: ["Fortinet", "pfSense", "VPN", "Audit", "Durcissement"],
  },
  {
    icon: Network,
    title: "Systèmes & Réseaux",
    color: "text-cyan-400",
    borderHover: "hover:border-cyan-500/60",
    glowHover: "hover:shadow-[0_0_28px_rgba(6,182,212,0.35)]",
    items: ["Active Directory", "DNS / DHCP", "VLANs", "GPO", "Exchange", "SCCM"],
  },
  {
    icon: Terminal,
    title: "Automatisation & Supervision",
    color: "text-blue-400",
    borderHover: "hover:border-blue-500/60",
    glowHover: "hover:shadow-[0_0_28px_rgba(59,130,246,0.35)]",
    items: ["Zabbix", "Python", "Bash", "PowerShell", "CI/CD"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function About() {
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

        /* ── Border glow animé carte description (hover only) ── */
        @keyframes border-spin {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .desc-card-wrap {
          position: relative;
          border-radius: 0.75rem;
        }
        .desc-card-wrap::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4, #3b82f6, #8b5cf6);
          background-size: 300% 300%;
          animation: border-spin 4s linear infinite;
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 0;
        }
        .desc-card-wrap:hover::before {
          opacity: 1;
        }
        .desc-card-inner {
          position: relative;
          z-index: 1;
        }
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
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">

          {/* Colonne gauche — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-full lg:h-auto lg:aspect-[3/4] rounded-2xl overflow-hidden border border-border/50 shadow-lg">
              <Image
                src="/thierno-bah.jpeg"
                alt={personalInfo.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 256px, 280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Colonne droite — Contenu */}
          <div className="space-y-8">

            {/* Titre avec lignes décoratives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <span
                className="line-violet h-px flex-1 rounded-full"
                style={{ background: "linear-gradient(to right, transparent, #8b5cf6)" }}
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="dot-left w-3 h-3 rounded-full flex-shrink-0" />
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
                  À propos
                </h2>
                <span className="dot-right w-3 h-3 rounded-full flex-shrink-0" />
              </div>
              <span
                className="line-cyan h-px flex-1 rounded-full"
                style={{ background: "linear-gradient(to left, transparent, #06b6d4)" }}
              />
            </motion.div>

            {/* Carte texte — même style que skill cards + border glow au hover */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="desc-card-wrap"
            >
              <div className="desc-card-inner">
                <Card className="border-border/50 bg-background/60 backdrop-blur-sm">
                  <CardContent className="p-5">
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-justify">
                      Futur étudiant en Master IRS spécialité Cybersécurité, orienté supervision et sécurité des infrastructures. Compétences en administration systèmes &amp; réseaux (Active Directory, VLANs, VPN), virtualisation (Proxmox, VMware, Hyper-V) et automatisation (Python, Bash, PowerShell) pour administrer et sécuriser des environnements critiques.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* 3 cartes de compétences */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {skillCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                >
                  <Card className={`h-full border-border/50 bg-background/60 backdrop-blur-sm transition-all duration-300 ${card.borderHover} ${card.glowHover}`}>
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <card.icon className={`w-5 h-5 ${card.color}`} />
                        <h3 className={`font-semibold text-sm ${card.color}`}>{card.title}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {card.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-br from-violet-500 to-cyan-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
