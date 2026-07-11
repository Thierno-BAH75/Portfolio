"use server";

import { updateTag } from "next/cache";
import { getSupabaseAdmin, supabase } from "@/lib/supabase";
import { projectSchema, type ProjectFormValues } from "@/lib/schemas";
import { requireAdminUser, UnauthorizedError, type ActionResult } from "./require-admin";

function toRow(values: ProjectFormValues) {
  return {
    slug: values.slug,
    title: values.title,
    description: values.description,
    long_description: values.longDescription ?? null,
    image: values.image,
    technologies: values.technologies,
    category: values.category,
    links: values.links,
    featured: values.featured,
    status: values.status,
    date: values.date,
    metrics: values.metrics ?? null,
    challenges: values.challenges ?? null,
  };
}

async function nextDisplayOrder(): Promise<number> {
  const { data } = await supabase
    .from("projects")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  return ((data?.display_order as number | undefined) ?? -1) + 1;
}

export async function createProject(values: ProjectFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = projectSchema.safeParse(values);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
    }

    const admin = getSupabaseAdmin();
    const displayOrder = await nextDisplayOrder();
    const { error } = await admin.from("projects").insert({ ...toRow(parsed.data), display_order: displayOrder });

    if (error) {
      if (error.code === "23505") return { success: false, error: "Ce slug est déjà utilisé par un autre projet." };
      return { success: false, error: error.message };
    }

    updateTag("projects");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function updateProject(id: string, values: ProjectFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = projectSchema.safeParse(values);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };
    }

    const admin = getSupabaseAdmin();
    const { error } = await admin
      .from("projects")
      .update({ ...toRow(parsed.data), updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      if (error.code === "23505") return { success: false, error: "Ce slug est déjà utilisé par un autre projet." };
      return { success: false, error: error.message };
    }

    updateTag("projects");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("projects").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("projects");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function duplicateProject(id: string): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { data: original, error: fetchError } = await admin
      .from("projects")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) return { success: false, error: fetchError.message };
    if (!original) return { success: false, error: "Projet introuvable." };

    // Slug unique garanti : suffixe -copy, puis -copy-2, -copy-3… si collision.
    let slug = `${original.slug}-copy`;
    let suffix = 2;
    while (true) {
      const { data: existing } = await admin.from("projects").select("id").eq("slug", slug).maybeSingle();
      if (!existing) break;
      slug = `${original.slug}-copy-${suffix}`;
      suffix += 1;
    }

    const displayOrder = await nextDisplayOrder();
    const { error: insertError } = await admin.from("projects").insert({
      slug,
      title: original.title,
      description: original.description,
      long_description: original.long_description,
      image: original.image,
      images: original.images,
      technologies: original.technologies,
      category: original.category,
      links: original.links,
      featured: false,
      status: "draft",
      date: original.date,
      metrics: original.metrics,
      challenges: original.challenges,
      architecture_diagram: original.architecture_diagram,
      display_order: displayOrder,
    });

    if (insertError) return { success: false, error: insertError.message };

    updateTag("projects");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

// Une seule requête réseau (RPC) — un upsert partiel {id, display_order}
// échoue sur les colonnes NOT NULL sans défaut (slug, title…), Postgres
// validant la ligne avant de retomber sur ON CONFLICT DO UPDATE.
export async function reorderProjects(orderedIds: string[]): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.rpc("reorder_projects", { ids: orderedIds });
    if (error) return { success: false, error: error.message };

    updateTag("projects");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}
