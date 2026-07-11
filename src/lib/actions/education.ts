"use server";

import { updateTag } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { educationSchema, type EducationFormValues } from "@/lib/schemas";
import { requireAdminUser, UnauthorizedError, type ActionResult } from "./require-admin";

function toRow(values: EducationFormValues) {
  return {
    degree: values.degree,
    school: values.school,
    location: values.location || null,
    start_date: values.startDate,
    end_date: values.endDate,
    description: values.description ?? null,
    status: values.status ?? null,
    note: values.note ?? null,
    level: values.level ?? null,
    display_order: values.displayOrder,
  };
}

export async function createEducation(values: EducationFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = educationSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin.from("education").insert(toRow(parsed.data));
    if (error) return { success: false, error: error.message };

    updateTag("education");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function updateEducation(id: string, values: EducationFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = educationSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin
      .from("education")
      .update({ ...toRow(parsed.data), updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("education");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function deleteEducation(id: string): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("education").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("education");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}
