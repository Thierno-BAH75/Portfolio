import { NextResponse } from "next/server";
import { getSkills } from "@/lib/data";
import type { SkillCategory } from "@/types";

// API publique en lecture seule : les compétences d'une catégorie, en vrai
// JSON depuis Supabase. Consommée par le terminal de la section Skills du
// site (fetch réel à chaque clic d'endpoint), mais ouverte à quiconque.
// Le cache vient de la couche de données (getSkills : unstable_cache 1h,
// tag "skills" invalidé par les mutations admin) — la réponse reste donc
// fraîche au plus une heure après une modification.

const CATEGORIES: SkillCategory[] = ["security", "network", "systems", "cloud", "tools", "scripting"];

// Quelques alias francophones par confort ("/api/skills/reseau" fonctionne)
const ALIASES: Record<string, SkillCategory | "all"> = {
  all: "all",
  securite: "security",
  reseau: "network",
  reseaux: "network",
  systemes: "systems",
  supervision: "tools",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category: raw } = await params;
  const normalized = raw.toLowerCase();
  const category =
    ALIASES[normalized] ?? (CATEGORIES.includes(normalized as SkillCategory) ? (normalized as SkillCategory) : null);

  if (!category) {
    return NextResponse.json(
      {
        error: "unknown_category",
        message: `Unknown category "${raw}"`,
        available: [...CATEGORIES, "all"],
      },
      { status: 404 }
    );
  }

  const allSkills = await getSkills();
  const skills = category === "all" ? allSkills : allSkills.filter((s) => s.category === category);

  // Date de dernière modification réelle (max des updated_at Supabase) —
  // absente si les données viennent du fallback statique
  const lastUpdated = skills.reduce<string | null>(
    (max, s) => (s.updatedAt && (!max || s.updatedAt > max) ? s.updatedAt : max),
    null
  );

  return NextResponse.json(
    {
      category,
      count: skills.length,
      lastUpdated,
      skills: skills.map((s) => ({
        name: s.name,
        ...(category === "all" ? { category: s.category } : {}),
        ...(s.isCertified ? { certified: true } : {}),
        ...(s.isLearning ? { learning: true } : {}),
      })),
    },
    {
      headers: {
        // Cache CDN/navigateur raisonnable, aligné sur le revalidate 1h de
        // la couche de données
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    }
  );
}
