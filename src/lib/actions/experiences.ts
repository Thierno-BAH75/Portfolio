"use server";

import { updateTag } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { experienceSchema, type ExperienceFormValues } from "@/lib/schemas";
import { requireAdminUser, UnauthorizedError, type ActionResult } from "./require-admin";

function toRow(values: ExperienceFormValues) {
  return {
    title: values.title,
    company: values.company,
    company_logo: values.companyLogo || null,
    location: values.location,
    type: values.type,
    start_date: values.startDate,
    end_date: values.current ? null : values.endDate || null,
    current: values.current,
    description: values.description,
    achievements: values.achievements,
    impact: values.impact ?? null,
    technologies: values.technologies,
    display_order: values.displayOrder,
  };
}

export async function createExperience(values: ExperienceFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = experienceSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin.from("experiences").insert(toRow(parsed.data));
    if (error) return { success: false, error: error.message };

    updateTag("experiences");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function updateExperience(id: string, values: ExperienceFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = experienceSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin
      .from("experiences")
      .update({ ...toRow(parsed.data), updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("experiences");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function deleteExperience(id: string): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("experiences").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("experiences");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}
