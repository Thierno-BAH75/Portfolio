// Lecture de contenu pour le panneau admin — contrairement à src/lib/data.ts
// (site public), ces fonctions renvoient TOUT (y compris les brouillons),
// incluent l'id Supabase de chaque ligne (nécessaire pour éditer/supprimer),
// et ne passent pas par le cache Next.js : l'admin doit toujours voir l'état
// le plus frais possible juste après une écriture.
import { supabase, getSupabaseAdmin } from "./supabase";
import type {
  Project,
  Experience,
  Education,
  Certification,
  Skill,
  Localized,
} from "@/types";
import type { PersonalInfo } from "./data";

export type AdminProject = Project & {
  status: "draft" | "published";
  viewCount: number;
  displayOrder: number;
};

export type AdminExperience = Experience & { displayOrder: number };

export type AdminEducation = Education & { displayOrder: number };

export type AdminCertification = Certification & { id: string; displayOrder: number };

export type AdminSkill = { id: string; name: Skill["name"]; icon: string; category: Skill["category"]; displayOrder: number };

export interface AdminPersonalInfo extends PersonalInfo {
  github?: string;
  linkedin?: string;
  cvUrl?: string;
}

export interface AdminContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  archived: boolean;
  createdAt: string;
}

function rowToAdminProject(row: Record<string, unknown>): AdminProject {
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
    status: row.status as "draft" | "published",
    viewCount: row.view_count as number,
    displayOrder: row.display_order as number,
  };
}

export async function getAllProjectsAdmin(): Promise<AdminProject[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw new Error(`getAllProjectsAdmin: ${error.message}`);
  return (data ?? []).map(rowToAdminProject);
}

export async function getProjectByIdAdmin(id: string): Promise<AdminProject | null> {
  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`getProjectByIdAdmin: ${error.message}`);
  return data ? rowToAdminProject(data) : null;
}

function rowToAdminExperience(row: Record<string, unknown>): AdminExperience {
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
    displayOrder: row.display_order as number,
  };
}

export async function getAllExperiencesAdmin(): Promise<AdminExperience[]> {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw new Error(`getAllExperiencesAdmin: ${error.message}`);
  return (data ?? []).map(rowToAdminExperience);
}

export async function getExperienceByIdAdmin(id: string): Promise<AdminExperience | null> {
  const { data, error } = await supabase.from("experiences").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`getExperienceByIdAdmin: ${error.message}`);
  return data ? rowToAdminExperience(data) : null;
}

function rowToAdminSkill(row: Record<string, unknown>): AdminSkill {
  return {
    id: row.id as string,
    name: row.name as Skill["name"],
    icon: row.icon as string,
    category: row.category as Skill["category"],
    displayOrder: row.display_order as number,
  };
}

export async function getAllSkillsAdmin(): Promise<AdminSkill[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw new Error(`getAllSkillsAdmin: ${error.message}`);
  return (data ?? []).map(rowToAdminSkill);
}

function rowToAdminEducation(row: Record<string, unknown>): AdminEducation {
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
    displayOrder: row.display_order as number,
  };
}

export async function getAllEducationAdmin(): Promise<AdminEducation[]> {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw new Error(`getAllEducationAdmin: ${error.message}`);
  return (data ?? []).map(rowToAdminEducation);
}

export async function getEducationByIdAdmin(id: string): Promise<AdminEducation | null> {
  const { data, error } = await supabase.from("education").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`getEducationByIdAdmin: ${error.message}`);
  return data ? rowToAdminEducation(data) : null;
}

function rowToAdminCertification(row: Record<string, unknown>): AdminCertification {
  return {
    id: row.id as string,
    name: row.name as Localized,
    issuer: row.issuer as string,
    date: row.date as string,
    expiry: (row.expiry as string) ?? undefined,
    icon: row.icon as string,
    displayOrder: row.display_order as number,
  };
}

export async function getAllCertificationsAdmin(): Promise<AdminCertification[]> {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw new Error(`getAllCertificationsAdmin: ${error.message}`);
  return (data ?? []).map(rowToAdminCertification);
}

export async function getCertificationByIdAdmin(id: string): Promise<AdminCertification | null> {
  const { data, error } = await supabase.from("certifications").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`getCertificationByIdAdmin: ${error.message}`);
  return data ? rowToAdminCertification(data) : null;
}

export async function getPersonalInfoAdmin(): Promise<AdminPersonalInfo | null> {
  const { data, error } = await supabase.from("personal_info").select("*").eq("id", 1).maybeSingle();
  if (error) throw new Error(`getPersonalInfoAdmin: ${error.message}`);
  if (!data) return null;

  const socialLinks = (data.social_links as { name: string; url: string; icon: string }[]) ?? [];
  return {
    name: data.name as string,
    title: data.title as Localized,
    tagline: data.tagline as Localized,
    email: data.email as string,
    phone: data.phone as string,
    location: data.location as Localized,
    available: data.available as boolean,
    seeking: data.availability_message as Localized,
    github: socialLinks.find((s) => s.icon === "github")?.url,
    linkedin: socialLinks.find((s) => s.icon === "linkedin")?.url,
    cvUrl: (data.cv_url as string) ?? undefined,
  };
}

function rowToAdminContactMessage(row: Record<string, unknown>): AdminContactMessage {
  return {
    id: row.id as string,
    firstName: row.first_name as string,
    lastName: row.last_name as string,
    email: row.email as string,
    subject: (row.subject as string) ?? null,
    message: row.message as string,
    read: row.read as boolean,
    archived: row.archived as boolean,
    createdAt: row.created_at as string,
  };
}

// contact_messages a une policy de lecture restreinte aux utilisateurs
// authentifiés (RLS) — le client anon `supabase` n'a pas de session côté
// serveur et ne verrait donc jamais rien. On lit ces fetchers avec le
// client service_role, qui contourne RLS comme pour les écritures admin.
export async function getAllMessagesAdmin(): Promise<AdminContactMessage[]> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getAllMessagesAdmin: ${error.message}`);
  return (data ?? []).map(rowToAdminContactMessage);
}

export async function getMessageByIdAdmin(id: string): Promise<AdminContactMessage | null> {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.from("contact_messages").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`getMessageByIdAdmin: ${error.message}`);
  return data ? rowToAdminContactMessage(data) : null;
}

export async function getUnreadMessageCount(): Promise<number> {
  const admin = getSupabaseAdmin();
  const { count, error } = await admin
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("read", false)
    .eq("archived", false);
  if (error) throw new Error(`getUnreadMessageCount: ${error.message}`);
  return count ?? 0;
}

export interface AdminCounts {
  projectsPublished: number;
  projectsDraft: number;
  experiences: number;
  skills: number;
  education: number;
  certifications: number;
}

export async function getAdminCounts(): Promise<AdminCounts> {
  const [projects, experiences, skills, education, certifications] = await Promise.all([
    supabase.from("projects").select("status"),
    supabase.from("experiences").select("id", { count: "exact", head: true }),
    supabase.from("skills").select("id", { count: "exact", head: true }),
    supabase.from("education").select("id", { count: "exact", head: true }),
    supabase.from("certifications").select("id", { count: "exact", head: true }),
  ]);

  const projectRows = projects.data ?? [];
  return {
    projectsPublished: projectRows.filter((p) => p.status === "published").length,
    projectsDraft: projectRows.filter((p) => p.status === "draft").length,
    experiences: experiences.count ?? 0,
    skills: skills.count ?? 0,
    education: education.count ?? 0,
    certifications: certifications.count ?? 0,
  };
}
