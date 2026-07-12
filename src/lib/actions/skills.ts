"use server";

import { updateTag } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { skillSchema, type SkillFormValues } from "@/lib/schemas";
import { requireAdminUser, UnauthorizedError, type ActionResult } from "./require-admin";

function toRow(values: SkillFormValues) {
  const name = values.nameEn && values.nameEn.trim() ? { fr: values.nameFr, en: values.nameEn } : values.nameFr;
  return {
    name,
    icon: values.icon,
    category: values.category,
    display_order: values.displayOrder,
    proof_experience_id: values.proofExperienceId || null,
    is_certified: values.isCertified ?? false,
    // Une certification liée n'a de sens que si le toggle "certifié" est
    // actif — nettoyée côté serveur pour éviter les états incohérents
    related_certification_id: (values.isCertified && values.relatedCertificationId) || null,
    is_learning: values.isLearning ?? false,
  };
}

export async function createSkill(values: SkillFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = skillSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin.from("skills").insert(toRow(parsed.data));
    if (error) return { success: false, error: error.message };

    updateTag("skills");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function updateSkill(id: string, values: SkillFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = skillSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin
      .from("skills")
      .update({ ...toRow(parsed.data), updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("skills");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function deleteSkill(id: string): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("skills").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("skills");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

// orderedIds : les compétences d'UNE catégorie dans leur nouvel ordre —
// display_order n'a de sens que relativement aux autres compétences de la
// même catégorie (le site public filtre par catégorie avant de trier).
export async function reorderSkills(orderedIds: string[]): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.rpc("reorder_skills", { ids: orderedIds });
    if (error) return { success: false, error: error.message };

    updateTag("skills");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}
