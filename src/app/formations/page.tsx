"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, MapPin, Calendar, CheckCircle2,
  Clock, Sparkles, Repeat2, ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────── */
type Status = "obtained" | "ongoing" | "upcoming" | "searching" | "preparing";

interface Diploma {
  title: string;
  specialty?: string;
  level: string;
  school: string;
  location?: string;
  period: string;
  rhythm?: string;
  status: Status;
  description: string;
  skills: string[];
  highlight?: boolean;
  dotColor: string;
  href: string;
}

/* ─────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────── */
const DIPLOMAS: Diploma[] = [
  {
    title: "Master M2 IRS — option Cybersécurité",
    specialty: "Ingénierie des Réseaux et Systèmes",
    level: "Bac+5",
    school: "Université Paris-Saclay — AFORP",
    period: "2026 – 2027",
    rhythm: "4 sem. école · 3 sem. entreprise / 1 sem. école",
    status: "searching",
    highlight: true,
    dotColor: "bg-amber-400",
    href: "https://www.aforp.fr/formation-alternance/formation/master-cybersecurite-en-partenariat-avec-paris-saclay-copy",
    description:
      "Master M2 en ingénierie des réseaux et systèmes option cybersécurité, en partenariat avec l'Université Paris-Saclay. Formation accessible uniquement par apprentissage, orientée sécurité des infrastructures, cyber-défense, audits, tests d'intrusion et gestion de crise.",
    skills: ["Cybersécurité", "Sécurité infrastructures", "Audit & pentest", "Cyber-défense", "Gestion de crise", "Sécurité by design"],
  },
  {
    title: "Mastère CARE",
    specialty: "Titre RNCP Administrateur des Réseaux d'Entreprises",
    level: "Bac+4",
    school: "AFORP",
    location: "Île-de-France",
    period: "2024 – 2025",
    rhythm: "3 sem. entreprise · 1 sem. école",
    status: "obtained",
    highlight: true,
    dotColor: "bg-green-400",
    href: "https://www.aforp.fr/formation-alternance/formation/mastere-care-cyber-administrateur-des-reseaux-dentreprises",
    description:
      "Titre RNCP parcours préparatoire M2 IRS. Formation intensive spécialisée en réseau et cybersécurité en alternance. Conception et déploiement d'infrastructures réseau, haute disponibilité, PRA/PCA, supervision et sécurisation des systèmes d'information.",
    skills: ["Administration réseaux", "pfSense", "Zabbix", "Proxmox", "Hyper-V", "VLANs", "SNMP", "iDRAC", "PRA/PCA"],
  },
  {
    title: "Licence Pro Réseaux & Télécoms — CyDops",
    specialty: "Cybersécurité & DevOps",
    level: "Bac+3",
    school: "Université Paris-Saclay",
    location: "Orsay",
    period: "2023 – 2024",
    status: "obtained",
    dotColor: "bg-cyan-400",
    href: "https://www.universite-paris-saclay.fr",
    description:
      "Licence professionnelle spécialisée Cybersécurité & DevOps. Projet SIEM/NSM avec Security Onion, administration systèmes Linux/Windows, scripting Python et Bash, virtualisation.",
    skills: ["Security Onion", "SIEM", "Python", "Bash", "Linux", "Windows Server", "Virtualisation", "DevOps"],
  },
  {
    title: "BTS SIO SISR",
    specialty: "Solutions d'Infrastructure, Systèmes et Réseaux",
    level: "Bac+2",
    school: "Lycée Parc de Vilgénis",
    location: "Massy",
    period: "2021 – 2023",
    status: "obtained",
    dotColor: "bg-violet-400",
    href: "https://www.lycee-vilgenis.fr",
    description:
      "Formation technique en administration des systèmes et réseaux. Bases solides en infrastructure IT, virtualisation, Active Directory, DNS/DHCP et sécurité réseau.",
    skills: ["Active Directory", "DNS", "DHCP", "Virtualisation", "Réseaux", "Windows Server", "Linux"],
  },
];

/* ─────────────────────────────────────────────────────────────────
   Status config
───────────────────────────────────────────────────────────────── */
const STATUS_CONFIG: Record<Status, { label: string; color: string; icon: React.ReactNode }> = {
  obtained: {
    label: "Obtenu",
    color: "bg-green-500/20 text-green-300 border-green-500/40",
    icon: <CheckCircle2 size={11} />,
  },
  ongoing: {
    label: "En cours",
    color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    icon: <Clock size={11} />,
  },
  upcoming: {
    label: "À venir",
    color: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    icon: <Sparkles size={11} />,
  },
  searching: {
    label: "En recherche d'alternance",
    color: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    icon: <Sparkles size={11} />,
  },
  preparing: {
    label: "En préparation",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    icon: <Clock size={11} />,
  },
};

function accentGradient(status: Status) {
  if (status === "obtained")  return "from-green-500 to-cyan-500";
  if (status === "ongoing")   return "from-violet-600 to-cyan-500";
  if (status === "searching") return "from-amber-500 to-violet-500";
  return "from-violet-700 to-violet-400";
}

function iconColor(status: Status) {
  if (status === "obtained")  return "bg-green-500/10 border-green-500/30 text-green-400";
  if (status === "ongoing")   return "bg-cyan-500/10 border-cyan-500/30 text-cyan-400";
  if (status === "searching") return "bg-amber-500/10 border-amber-500/30 text-amber-400";
  return "bg-violet-500/10 border-violet-500/30 text-violet-400";
}

/* ─────────────────────────────────────────────────────────────────
   Skill badge color by category
───────────────────────────────────────────────────────────────── */
function skillColor(skill: string): string {
  const s = skill.toLowerCase();
  if (/cyber|sécurité|audit|pentest|défense|crise|intrusion|design/.test(s))
    return "border-violet-500/40 bg-violet-500/15 text-violet-300 hover:bg-violet-500/30 hover:border-violet-400/70 hover:shadow-[0_0_8px_rgba(139,92,246,0.3)]";
  if (/réseau|réseau|vlan|dns|dhcp|snmp|pfsense|firewall|administration/.test(s))
    return "border-cyan-500/40 bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/30 hover:border-cyan-400/70 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)]";
  if (/zabbix|siem|security onion|supervision|monitoring/.test(s))
    return "border-teal-500/40 bg-teal-500/15 text-teal-300 hover:bg-teal-500/30 hover:border-teal-400/70 hover:shadow-[0_0_8px_rgba(20,184,166,0.3)]";
  if (/proxmox|hyper-v|vmware|virtualisation/.test(s))
    return "border-sky-500/40 bg-sky-500/15 text-sky-300 hover:bg-sky-500/30 hover:border-sky-400/70 hover:shadow-[0_0_8px_rgba(14,165,233,0.3)]";
  if (/python|bash|powershell|devops|ci\/cd|scripting/.test(s))
    return "border-indigo-500/40 bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/30 hover:border-indigo-400/70 hover:shadow-[0_0_8px_rgba(99,102,241,0.3)]";
  if (/linux|windows|active directory|server|idrac|pra|pca/.test(s))
    return "border-blue-500/40 bg-blue-500/15 text-blue-300 hover:bg-blue-500/30 hover:border-blue-400/70 hover:shadow-[0_0_8px_rgba(59,130,246,0.3)]";
  return "border-border/60 bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:border-border hover:text-foreground/80";
}

/* ─────────────────────────────────────────────────────────────────
   Card content (shared between mobile + desktop)
───────────────────────────────────────────────────────────────── */
function CardContent({ diploma }: { diploma: Diploma }) {
  const st = STATUS_CONFIG[diploma.status];
  return (
    <>
      {/* Accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${accentGradient(diploma.status)}`} />

      {/* Highlight glow */}
      {diploma.highlight && (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />
      )}

      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">

          {/* Icon */}
          <div className={`shrink-0 p-2.5 rounded-lg border group-hover:scale-110 transition-transform duration-300 ${iconColor(diploma.status)}`}>
            <GraduationCap size={20} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Title + badge */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-base text-foreground leading-snug">
                {diploma.title}
              </h3>
              <span className={`inline-flex items-center gap-1 shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${st.color} ${
                diploma.status === "searching" ? "badge-searching" : ""
              }`}>
                {st.icon}
                {st.label}
              </span>
            </div>

            {/* Specialty + level */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {diploma.specialty && (
                <p className="text-sm text-violet-300/80 font-medium">{diploma.specialty}</p>
              )}
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gradient-to-r from-violet-600/20 to-cyan-500/15 border border-violet-500/30 text-violet-300">
                {diploma.level}
              </span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1.5">
                <GraduationCap size={11} className="shrink-0" />
                {diploma.school}
              </span>
              {diploma.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} className="shrink-0" />
                  {diploma.location}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={11} className="shrink-0" />
                {diploma.period}
              </span>
              {diploma.rhythm && (
                <span className="flex items-center gap-1.5">
                  <Repeat2 size={11} className="shrink-0" />
                  {diploma.rhythm}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              {diploma.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {diploma.skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-[10px] px-2 py-0.5 rounded-md border cursor-default
                    transition-all duration-200 hover:scale-105 ${skillColor(skill)}`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Link */}
            <a
              href={diploma.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300
                         border border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-500/10 hover:bg-cyan-500/20
                         px-3 py-1.5 rounded-lg transition-all duration-200 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
            >
              <ExternalLink size={11} />
              Voir la formation officielle
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Diploma Card — wraps content with motion + leave glow
───────────────────────────────────────────────────────────────── */
function DiplomaCard({ diploma, index, isLast }: {
  diploma: Diploma;
  index: number;
  isLast: boolean;
}) {
  const [leaving, setLeaving] = useState(false);

  return (
    <div className="flex items-start gap-4">
      {/* ── Colonne timeline ── */}
      <div className="relative flex flex-col items-center shrink-0 w-6">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
          className={`relative z-10 w-4 h-4 rounded-full border-2 border-background shadow-lg shrink-0 mt-6
                      ${diploma.dotColor} ${diploma.status === "searching" ? "dot-searching" : ""}`}
        />
        {/* Ligne verticale */}
        {!isLast && (
          <div className="flex-1 w-px bg-gradient-to-b from-border/60 to-border/20 mt-1" />
        )}
      </div>

      {/* ── Carte pleine largeur ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.05 }}
        onHoverEnd={() => {
          setLeaving(true);
          setTimeout(() => setLeaving(false), 600);
        }}
        className={`group relative flex-1 min-w-0 mb-5 rounded-xl border border-border/50 bg-background/60
                    backdrop-blur-sm overflow-hidden
                    hover:border-violet-500/50 hover:shadow-[0_0_32px_rgba(139,92,246,0.25)]
                    transition-[border-color,box-shadow] duration-300
                    ${leaving ? "card-leave-glow" : ""}`}
      >
        <CardContent diploma={diploma} />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Section title
───────────────────────────────────────────────────────────────── */
function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="flex items-center gap-3 mb-8"
    >
      <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-400">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-foreground">{label}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-violet-500/40 to-transparent" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────── */
export default function FormationsPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-24 overflow-hidden">

      <style>{`
        .form-bg          { background-color: hsl(var(--background)); }
        .form-grid {
          background-image:
            radial-gradient(circle, rgba(139,92,246,0.26) 1px, transparent 1px),
            radial-gradient(circle, rgba(6,182,212,0.15)  1px, transparent 1px);
          background-size: 32px 32px, 64px 64px;
          background-position: 0 0, 16px 16px;
        }
        .form-corner-tl   { background: radial-gradient(ellipse at top left,    rgba(139,92,246,0.30) 0%, transparent 55%); }
        .form-corner-br   { background: radial-gradient(ellipse at bottom right, rgba(6,182,212,0.22)  0%, transparent 55%); }
        .form-corner-tr   { background: radial-gradient(ellipse at top right,    rgba(59,130,246,0.18) 0%, transparent 50%); }
        .form-corner-bl   { background: radial-gradient(ellipse at bottom left,  rgba(139,92,246,0.14) 0%, transparent 50%); }
        .form-blob-center { background: radial-gradient(ellipse at 50% 50%,      rgba(139,92,246,0.08) 0%, transparent 65%); }

        @keyframes icon-float-f {
          0%, 100% { transform: translateY(0);    }
          50%      { transform: translateY(-7px); }
        }
        .icon-float-f { animation: icon-float-f 2.2s ease-in-out infinite; }

        @keyframes dot-f-left {
          0%  { opacity:0; box-shadow:none; }
          5%  { opacity:1; box-shadow:0 0 8px 3px rgba(139,92,246,0.9); }
          20% { opacity:1; box-shadow:0 0 8px 3px rgba(139,92,246,0.9); }
          35% { opacity:0; box-shadow:none; }
          100%{ opacity:0; box-shadow:none; }
        }
        @keyframes dot-f-right {
          0%  { opacity:0; box-shadow:none; }
          45% { opacity:0; box-shadow:none; }
          55% { opacity:1; box-shadow:0 0 8px 3px rgba(6,182,212,0.9); }
          70% { opacity:1; box-shadow:0 0 8px 3px rgba(6,182,212,0.9); }
          85% { opacity:0; box-shadow:none; }
          100%{ opacity:0; box-shadow:none; }
        }
        .dot-f-left  { animation: dot-f-left  3.6s ease-in-out infinite; background:#8b5cf6; }
        .dot-f-right { animation: dot-f-right 3.6s ease-in-out infinite; background:#06b6d4; }

        @keyframes dot-searching-pulse {
          0%, 100% { box-shadow: 0 0 0 0   rgba(251,146,60,0.7); }
          50%      { box-shadow: 0 0 0 6px rgba(251,146,60,0);   }
        }
        .dot-searching { animation: dot-searching-pulse 1.4s ease-in-out infinite; }

        @keyframes badge-searching-blink {
          0%, 100% { opacity:1;   box-shadow: 0 0 0   rgba(251,146,60,0);   }
          50%      { opacity:0.6; box-shadow: 0 0 8px rgba(251,146,60,0.5); }
        }
        .badge-searching { animation: badge-searching-blink 1.6s ease-in-out infinite; }

        /* Leave glow — brief violet/cyan pulse after hover */
        @keyframes card-leave-glow-anim {
          0%   { box-shadow: 0 0 32px rgba(139,92,246,0.30), 0 0 16px rgba(6,182,212,0.15); }
          100% { box-shadow: 0 0 0   rgba(139,92,246,0),    0 0 0   rgba(6,182,212,0);    }
        }
        .card-leave-glow {
          animation: card-leave-glow-anim 0.6s ease-out forwards;
        }
      `}</style>

      <div className="form-bg          absolute inset-0 -z-10" />
      <div className="form-grid        absolute inset-0 -z-10 opacity-60" />
      <div className="form-corner-tl   absolute inset-0 -z-10" />
      <div className="form-corner-br   absolute inset-0 -z-10" />
      <div className="form-corner-tr   absolute inset-0 -z-10" />
      <div className="form-corner-bl   absolute inset-0 -z-10" />
      <div className="form-blob-center absolute inset-0 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-5">
            <span className="icon-float-f inline-block p-3 rounded-xl bg-violet-500/10 border border-violet-500/30">
              <GraduationCap size={28} className="text-violet-400" />
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="dot-f-left  w-3 h-3 rounded-full shrink-0" />
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              Formations & Certifications
            </h1>
            <span className="dot-f-right w-3 h-3 rounded-full shrink-0" />
          </div>

          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Mon parcours académique et mes certifications en{" "}
            <span className="text-violet-400 font-medium">Cybersécurité</span>,{" "}
            <span className="text-cyan-400 font-medium">Réseaux</span> et{" "}
            <span className="text-blue-400 font-medium">Systèmes</span>
          </p>
        </motion.div>

        {/* Diplômes */}
        <section>
          <SectionTitle icon={<GraduationCap size={16} />} label="Diplômes" />

          {/* Cartes centrées, max 800px */}
          <div className="max-w-[800px] mx-auto relative">
            {/* Ligne verticale ancrée sur le dot column (w-6 → centre à 12px) */}
            <div className="absolute top-6 bottom-6 w-px bg-gradient-to-b from-violet-500/50 via-border/40 to-border/10"
              style={{ left: "11px" }}
            />
            {DIPLOMAS.map((d, i) => (
              <DiplomaCard
                key={d.title}
                diploma={d}
                index={i}
                isLast={i === DIPLOMAS.length - 1}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
