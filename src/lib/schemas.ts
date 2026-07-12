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
export const veilleSourceSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  url: z.string().url("URL invalide"),
  domain: z.string().min(1, "Le domaine est requis"),
  category: z.string().optional(),
  isActive: z.boolean(),
  displayOrder: z.number().int().min(0),
});

export type VeilleSourceFormValues = z.infer<typeof veilleSourceSchema>;

export const veilleBookmarkSchema = z.object({
  articleUrl: z.string().url("URL invalide"),
  articleTitle: z.string().min(1, "Le titre est requis"),
  sourceName: z.string().optional(),
  commentFr: z.string().optional(),
  commentEn: z.string().optional(),
  isPinned: z.boolean(),
});

export type VeilleBookmarkFormValues = z.infer<typeof veilleBookmarkSchema>;
