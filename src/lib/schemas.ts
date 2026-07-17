// Schémas de validation Zod pour le CRUD admin — partagés entre les
// formulaires (react-hook-form + zodResolver) et les server actions, pour
// que la même règle s'applique côté client (UX immédiate) et côté serveur
// (rejeu impossible à contourner depuis le navigateur).
import { z } from "zod";

const localizedString = z.object({
  fr: z.string().min(1, "Le texte en français est requis"),
  en: z.string().min(1, "Le texte en anglais est requis"),
});

const localizedStringOptional = z.object({
  fr: z.string(),
  en: z.string(),
});

const localizedStringArray = z.object({
  fr: z.array(z.string().min(1)).min(1, "Au moins un élément est requis"),
  en: z.array(z.string().min(1)).min(1, "Au moins un élément est requis"),
});

// ── Projets ──────────────────────────────────────────────────────────
export const projectCategories = [
  "security",
  "infrastructure",
  "monitoring",
  "automation",
  "cloud",
  "network",
] as const;

const metricSchema = z.object({
  icon: z.string().min(1),
  value: z.string().min(1),
  label: localizedString,
});

const challengeSchema = z.object({
  title: localizedString,
  problem: localizedString,
  solution: localizedString,
});

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1, "Le slug est requis")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide (minuscules, chiffres, tirets uniquement)"),
  title: localizedString,
  description: localizedString,
  longDescription: localizedStringOptional.optional(),
  image: z.string().min(1, "Le chemin de l'image est requis"),
  technologies: z.array(z.string().min(1)).min(1, "Au moins une technologie est requise"),
  category: z.enum(projectCategories),
  links: z.object({
    live: z.string().optional(),
    github: z.string().optional(),
    demo: z.string().optional(),
  }),
  featured: z.boolean(),
  status: z.enum(["draft", "published"]),
  date: z.string().min(1, "La date est requise"),
  metrics: z.array(metricSchema).optional(),
  challenges: z.array(challengeSchema).optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

// ── Expériences ──────────────────────────────────────────────────────
export const experienceTypes = [
  "fulltime",
  "parttime",
  "freelance",
  "internship",
  "apprenticeship",
  "contract",
] as const;

export const experienceSchema = z.object({
  title: localizedString,
  company: z.string().min(1, "L'entreprise est requise"),
  companyLogo: z.string().optional(),
  location: z.string().min(1, "La localisation est requise"),
  type: z.enum(experienceTypes),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: localizedString,
  achievements: localizedStringArray,
  impact: localizedStringOptional.optional(),
  technologies: z.array(z.string().min(1)),
  displayOrder: z.number().int().min(0),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;

// ── Compétences ──────────────────────────────────────────────────────
export const skillCategories = [
  "security",
  "network",
  "systems",
  "cloud",
  "tools",
  "scripting",
] as const;

export const skillSchema = z.object({
  nameFr: z.string().min(1, "Le nom est requis"),
  nameEn: z.string().optional(),
  icon: z.string().min(1),
  category: z.enum(skillCategories),
  displayOrder: z.number().int().min(0),
  // Preuves choisies à la main : expérience attestante et/ou certification
  proofExperienceId: z.string().uuid().optional().or(z.literal("")),
  isCertified: z.boolean().optional(),
  relatedCertificationId: z.string().uuid().optional().or(z.literal("")),
  isLearning: z.boolean().optional(),
});

export type SkillFormValues = z.infer<typeof skillSchema>;

// ── Formations ───────────────────────────────────────────────────────
export const educationStatuses = ["validated", "ongoing", "admitted"] as const;

export const educationSchema = z.object({
  degree: localizedString,
  school: z.string().min(1, "L'établissement est requis"),
  location: z.string().optional(),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
  description: localizedStringOptional.optional(),
  status: z.enum(educationStatuses).optional(),
  note: localizedStringOptional.optional(),
  level: localizedStringOptional.optional(),
  displayOrder: z.number().int().min(0),
});

export type EducationFormValues = z.infer<typeof educationSchema>;

// ── Certifications ───────────────────────────────────────────────────
export const certificationSchema = z.object({
  name: localizedString,
  issuer: z.string().min(1, "L'émetteur est requis"),
  date: z.string().min(1, "La date d'obtention est requise"),
  expiry: z.string().optional(),
  icon: z.string().min(1),
  pdfUrl: z.string().optional(),
  displayOrder: z.number().int().min(0),
});

export type CertificationFormValues = z.infer<typeof certificationSchema>;

// ── Infos perso ──────────────────────────────────────────────────────
export const personalInfoSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  title: localizedString,
  tagline: localizedString,
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le téléphone est requis"),
  location: localizedString,
  available: z.boolean(),
  seeking: localizedString,
  github: z.string().optional(),
  linkedin: z.string().optional(),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

// ── Veille ───────────────────────────────────────────────────────────
// z.string().url() accepte des schémas dangereux (javascript:, file:) et des
// hôtes internes — le constructeur URL les considère « valides ». On resserre.

// Lien affiché (bookmark, articles) : http/https uniquement, jamais
// javascript:/data:/file: (vecteur XSS sur un href rendu).
export function isHttpUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// Une adresse IPv4-mapped IPv6 (::ffff:a.b.c.d, ou sa forme hex normalisée
// ::ffff:xxxx:yyyy telle que produite par l'URL() de Node/du navigateur)
// encode une vraie adresse IPv4 dans une syntaxe IPv6 — sans cette
// extraction, elle passait entre les mailles des règles IPv4 ci-dessous
// (ex. ::ffff:192.168.1.1 désigne bien 192.168.1.1, une IP privée).
function extractIPv4MappedAddress(host: string): string | null {
  const dotted = host.match(/^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/i);
  if (dotted) return dotted[1];
  const hex = host.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i);
  if (hex) {
    const g1 = parseInt(hex[1], 16);
    const g2 = parseInt(hex[2], 16);
    return [(g1 >> 8) & 0xff, g1 & 0xff, (g2 >> 8) & 0xff, g2 & 0xff].join(".");
  }
  return null;
}

// Source RSS fetchée côté serveur : https obligatoire + blocage des hôtes
// internes/privés (anti-SSRF, dont l'adresse de métadonnées cloud
// 169.254.169.254). Isomorphe (URL dispo navigateur + Node).
export function isSafeRemoteHttpsUrl(raw: string): boolean {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return false;
  }
  if (u.protocol !== "https:") return false;
  const host = u.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost")) return false;
  if (host === "::1") return false; // loopback IPv6
  if (/^fe80:/i.test(host)) return false; // link-local IPv6
  if (/^f[cd][0-9a-f]{2}:/i.test(host)) return false; // ULA IPv6 (fc00::/7)
  // IPv4 loopback / privées / link-local (dont métadonnées cloud) — testées
  // à la fois sur l'hôte brut et sur son équivalent IPv4 si mappé en IPv6.
  const ipv4Host = extractIPv4MappedAddress(host) ?? host;
  if (/^0\./.test(ipv4Host)) return false;
  if (/^127\./.test(ipv4Host)) return false;
  if (/^10\./.test(ipv4Host)) return false;
  if (/^192\.168\./.test(ipv4Host)) return false;
  if (/^169\.254\./.test(ipv4Host)) return false;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ipv4Host)) return false;
  return true;
}

export const veilleSourceSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  url: z
    .string()
    .url("URL invalide")
    .refine(isSafeRemoteHttpsUrl, "URL invalide : https requis, adresses internes/privées interdites"),
  domain: z.string().min(1, "Le domaine est requis"),
  category: z.string().optional(),
  isActive: z.boolean(),
  displayOrder: z.number().int().min(0),
});

export type VeilleSourceFormValues = z.infer<typeof veilleSourceSchema>;

export const veilleBookmarkSchema = z.object({
  articleUrl: z.string().url("URL invalide").refine(isHttpUrl, "URL invalide : lien http/https requis"),
  articleTitle: z.string().min(1, "Le titre est requis"),
  sourceName: z.string().optional(),
  commentFr: z.string().optional(),
  commentEn: z.string().optional(),
  isPinned: z.boolean(),
});

export type VeilleBookmarkFormValues = z.infer<typeof veilleBookmarkSchema>;
