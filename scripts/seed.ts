// Migration initiale des données statiques (src/data/*.ts) vers Supabase.
// Idempotent : chaque table est vidée puis réinsérée, donc rejouable sans
// créer de doublons. Utilise le client service_role (contourne RLS).
//
// Usage : npx tsx --env-file=.env.local scripts/seed.ts
import { getSupabaseAdmin } from "../src/lib/supabase";
import { projects } from "../src/data/projects";
import {
  experiences,
  education,
  certifications,
  personalInfo,
  socialLinks,
} from "../src/data/experience";
import { skills } from "../src/data/skills";

async function seed() {
  const supabase = getSupabaseAdmin();

  // ── projects ───────────────────────────────────────────────────────
  const projectRows = projects.map((p, index) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    long_description: p.longDescription ?? null,
    image: p.image,
    images: p.images ?? [],
    technologies: p.technologies,
    category: p.category,
    links: p.links,
    featured: p.featured,
    date: p.date,
    metrics: p.metrics ?? null,
    challenges: p.challenges ?? null,
    architecture_diagram: p.architectureDiagram ?? null,
    status: "published",
    view_count: 0,
    display_order: index,
  }));
  await supabase.from("projects").delete().neq("slug", "__none__");
  const { error: projectsError } = await supabase.from("projects").insert(projectRows);
  if (projectsError) throw new Error(`projects: ${projectsError.message}`);
  console.log(`[seed] projects: ${projectRows.length} lignes insérées`);

  // ── experiences ────────────────────────────────────────────────────
  const experienceRows = experiences.map((e, index) => ({
    title: e.title,
    company: e.company,
    company_logo: e.companyLogo ?? null,
    location: e.location,
    type: e.type,
    start_date: e.startDate,
    end_date: e.endDate ?? null,
    current: e.current,
    description: e.description,
    achievements: e.achievements,
    impact: e.impact ?? null,
    technologies: e.technologies,
    display_order: index,
  }));
  await supabase.from("experiences").delete().not("id", "is", null);
  const { error: experiencesError } = await supabase.from("experiences").insert(experienceRows);
  if (experiencesError) throw new Error(`experiences: ${experiencesError.message}`);
  console.log(`[seed] experiences: ${experienceRows.length} lignes insérées`);

  // ── skills ─────────────────────────────────────────────────────────
  const skillRows = skills.map((s, index) => ({
    name: s.name,
    icon: s.icon,
    category: s.category,
    display_order: index,
  }));
  await supabase.from("skills").delete().not("id", "is", null);
  const { error: skillsError } = await supabase.from("skills").insert(skillRows);
  if (skillsError) throw new Error(`skills: ${skillsError.message}`);
  console.log(`[seed] skills: ${skillRows.length} lignes insérées`);

  // ── education ──────────────────────────────────────────────────────
  const educationRows = education.map((ed, index) => ({
    degree: ed.degree,
    school: ed.school,
    location: ed.location ?? null,
    start_date: ed.startDate,
    end_date: ed.endDate,
    description: ed.description ?? null,
    status: ed.status ?? null,
    note: ed.note ?? null,
    level: ed.level ?? null,
    display_order: index,
  }));
  await supabase.from("education").delete().not("id", "is", null);
  const { error: educationError } = await supabase.from("education").insert(educationRows);
  if (educationError) throw new Error(`education: ${educationError.message}`);
  console.log(`[seed] education: ${educationRows.length} lignes insérées`);

  // ── certifications ─────────────────────────────────────────────────
  const certificationRows = certifications.map((c, index) => ({
    name: c.name,
    issuer: c.issuer,
    date: c.date,
    expiry: c.expiry ?? null,
    icon: c.icon,
    display_order: index,
  }));
  await supabase.from("certifications").delete().not("id", "is", null);
  const { error: certificationsError } = await supabase
    .from("certifications")
    .insert(certificationRows);
  if (certificationsError) throw new Error(`certifications: ${certificationsError.message}`);
  console.log(`[seed] certifications: ${certificationRows.length} lignes insérées`);

  // ── personal_info (singleton, id=1) ───────────────────────────────
  const personalInfoRow = {
    id: 1,
    name: personalInfo.name,
    title: personalInfo.title,
    tagline: personalInfo.tagline,
    email: personalInfo.email,
    phone: personalInfo.phone,
    location: personalInfo.location,
    available: personalInfo.available,
    availability_message: personalInfo.seeking,
    social_links: socialLinks,
  };
  const { error: personalInfoError } = await supabase
    .from("personal_info")
    .upsert(personalInfoRow, { onConflict: "id" });
  if (personalInfoError) throw new Error(`personal_info: ${personalInfoError.message}`);
  console.log("[seed] personal_info: 1 ligne upsertée");

  console.log("[seed] Terminé avec succès.");
}

seed().catch((err) => {
  console.error("[seed] Échec :", err instanceof Error ? err.message : err);
  process.exit(1);
});
