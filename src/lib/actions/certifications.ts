"use server";

import { updateTag } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { certificationSchema, type CertificationFormValues } from "@/lib/schemas";
import { requireAdminUser, UnauthorizedError, type ActionResult } from "./require-admin";

function toRow(values: CertificationFormValues) {
  return {
    name: values.name,
    issuer: values.issuer,
    date: values.date,
    expiry: values.expiry || null,
    icon: values.icon,
    display_order: values.displayOrder,
  };
}

export async function createCertification(values: CertificationFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = certificationSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin.from("certifications").insert(toRow(parsed.data));
    if (error) return { success: false, error: error.message };

    updateTag("certifications");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function updateCertification(id: string, values: CertificationFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = certificationSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin
      .from("certifications")
      .update({ ...toRow(parsed.data), updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("certifications");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function deleteCertification(id: string): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("certifications").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("certifications");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}
