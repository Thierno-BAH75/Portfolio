// Couche de lecture du contenu public — Supabase est la source de vérité,
// src/data/*.ts sert de filet de secours si Supabase est injoignable (le
// site doit rester fonctionnel même en cas de panne du projet Supabase).
// Résultats mis en cache par Next.js (revalidate + tags) pour éviter un
// aller-retour Supabase à chaque visite ; `revalidateProjectsCache()` sera
// appelé par les mutations admin en Phase 2 pour invalider ce cache.
import { unstable_cache } from "next/cache";
import { supabase } from "./supabase";
import { projects as staticProjects } from "@/data/projects";
import {
  experiences as staticExperiences,
  education as staticEducation,
  certifications as staticCertifications,
  personalInfo as staticPersonalInfo,
  socialLinks as staticSocialLinks,
} from "@/data/experience";
import { skills as staticSkills } from "@/data/skills";
import type {
  Project,
  Experience,
  Skill,
  Education,
  Certification,
  SocialLink,
  SkillCategory,
  Localized,
} from "@/types";

const REVALIDATE_SECONDS = 3600;

// ── Mappage lignes Supabase (snake_case) → types du front (camelCase) ──

function rowToProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as Localized,
    description: row.description as Localized,
    longDescription: (row.long_description as Localized) ?? undefined,
    image: row.image as string,
    images: (row.images as string[])?.length ? (row.images as string[]) : undefined,
    technologies: row.technologies as string[],
    category: row.category as Project["category"],
    links: row.links as Project["links"],
    featured: row.featured as boolean,
    date: row.date as string,
    metrics: (row.metrics as Project["metrics"]) ?? undefined,
    challenges: (row.challenges as Project["challenges"]) ?? undefined,
    architectureDiagram: (row.architecture_diagram as string) ?? undefined,
  };
}

function rowToExperience(row: Record<string, unknown>): Experience {
  return {
    id: row.id as string,
    title: row.title as Localized,
    company: row.company as string,
    companyLogo: (row.company_logo as string) ?? undefined,
    location: row.location as string,
    type: row.type as Experience["type"],
    startDate: row.start_date as string,
    endDate: (row.end_date as string) ?? undefined,
    current: row.current as boolean,
    description: row.description as Localized,
    achievements: row.achievements as Localized<string[]>,
    impact: (row.impact as Localized) ?? undefined,
    technologies: row.technologies as string[],
  };
}

function rowToEducation(row: Record<string, unknown>): Education {
  return {
    id: row.id as string,
    degree: row.degree as Localized,
    school: row.school as string,
    location: (row.location as string) ?? undefined,
    startDate: row.start_date as string,
    endDate: row.end_date as string,
    description: (row.description as Localized) ?? undefined,
    status: (row.status as Education["status"]) ?? undefined,
    note: (row.note as Localized) ?? undefined,
    level: (row.level as Localized) ?? undefined,
  };
}

function rowToCertification(row: Record<string, unknown>): Certification {
  return {
    name: row.name as Localized,
    issuer: row.issuer as string,
    date: row.date as string,
    expiry: (row.expiry as string) ?? undefined,
    icon: row.icon as string,
  };
}

function rowToSkill(row: Record<string, unknown>): Skill {
  return {
    name: row.name as Skill["name"],
    icon: row.icon as string,
    category: row.category as SkillCategory,
  };
}

export interface PersonalInfo {
  name: string;
  title: Localized;
  tagline: Localized;
  email: string;
  phone: string;
  location: Localized;
  available: boolean;
  seeking: Localized;
  cvUrl?: string;
}

function rowToPersonalInfo(row: Record<string, unknown>): PersonalInfo {
  return {
    name: row.name as string,
    title: row.title as Localized,
    tagline: row.tagline as Localized,
    email: row.email as string,
    phone: row.phone as string,
    location: row.location as Localized,
    available: row.available as boolean,
    seeking: row.availability_message as Localized,
    cvUrl: (row.cv_url as string) ?? undefined,
  };
}

// ── Projects ─────────────────────────────────────────────────────────

const fetchProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[data] getProjects: fallback statique —", error.message);
      return staticProjects;
    }
    return data.map(rowToProject);
  },
  ["projects"],
  { revalidate: REVALIDATE_SECONDS, tags: ["projects"] }
);

export async function getProjects(): Promise<Project[]> {
  return fetchProjects();
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}

// ── Experiences ──────────────────────────────────────────────────────

export const getExperiences = unstable_cache(
  async (): Promise<Experience[]> => {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[data] getExperiences: fallback statique —", error.message);
      return staticExperiences;
    }
    return data.map(rowToExperience);
  },
  ["experiences"],
  { revalidate: REVALIDATE_SECONDS, tags: ["experiences"] }
);

// ── Education ────────────────────────────────────────────────────────

export const getEducation = unstable_cache(
  async (): Promise<Education[]> => {
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[data] getEducation: fallback statique —", error.message);
      return staticEducation;
    }
    return data.map(rowToEducation);
  },
  ["education"],
  { revalidate: REVALIDATE_SECONDS, tags: ["education"] }
);

// ── Certifications ───────────────────────────────────────────────────

export const getCertifications = unstable_cache(
  async (): Promise<Certification[]> => {
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[data] getCertifications: fallback statique —", error.message);
      return staticCertifications;
    }
    return data.map(rowToCertification);
  },
  ["certifications"],
  { revalidate: REVALIDATE_SECONDS, tags: ["certifications"] }
);

// ── Skills ───────────────────────────────────────────────────────────

const fetchSkills = unstable_cache(
  async (): Promise<Skill[]> => {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn("[data] getSkills: fallback statique —", error.message);
      return staticSkills;
    }
    return data.map(rowToSkill);
  },
  ["skills"],
  { revalidate: REVALIDATE_SECONDS, tags: ["skills"] }
);

export async function getSkills(): Promise<Skill[]> {
  return fetchSkills();
}

export async function getSkillsByCategory(): Promise<Record<SkillCategory, Skill[]>> {
  const skills = await getSkills();
  const categories: SkillCategory[] = ["security", "network", "systems", "cloud", "tools", "scripting"];
  return Object.fromEntries(
    categories.map((category) => [category, skills.filter((s) => s.category === category)])
  ) as Record<SkillCategory, Skill[]>;
}

// ── Personal info + réseaux sociaux ────────────────────────────────────

const fetchPersonalInfo = unstable_cache(
  async (): Promise<{ personalInfo: PersonalInfo; socialLinks: SocialLink[] }> => {
    const { data, error } = await supabase.from("personal_info").select("*").eq("id", 1).maybeSingle();

    if (error || !data) {
      if (error) console.warn("[data] getPersonalInfo: fallback statique —", error.message);
      return { personalInfo: staticPersonalInfo, socialLinks: staticSocialLinks };
    }
    return {
      personalInfo: rowToPersonalInfo(data),
      socialLinks: (data.social_links as SocialLink[]) ?? staticSocialLinks,
    };
  },
  ["personal-info"],
  { revalidate: REVALIDATE_SECONDS, tags: ["personal-info"] }
);

export async function getPersonalInfo(): Promise<PersonalInfo> {
  return (await fetchPersonalInfo()).personalInfo;
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  return (await fetchPersonalInfo()).socialLinks;
}
