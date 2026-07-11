"use server";

import { updateTag } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { requireAdminUser, UnauthorizedError } from "./require-admin";

export type UploadResult = { success: true; url: string } | { success: false; error: string };

const MAX_CV_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const ALLOWED_CV_TYPES = ["application/pdf"];
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_").toLowerCase();
}

export async function uploadCv(formData: FormData): Promise<UploadResult> {
  try {
    await requireAdminUser();

    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { success: false, error: "Aucun fichier fourni." };
    }
    if (!ALLOWED_CV_TYPES.includes(file.type)) {
      return { success: false, error: "Le CV doit être un fichier PDF." };
    }
    if (file.size > MAX_CV_BYTES) {
      return { success: false, error: "Le fichier dépasse la taille maximale de 5 Mo." };
    }

    const admin = getSupabaseAdmin();
    const path = `${Date.now()}-${sanitizeFilename(file.name)}`;

    const { error: uploadError } = await admin.storage.from("cv").upload(path, file, {
      contentType: file.type,
      upsert: true,
    });
    if (uploadError) return { success: false, error: uploadError.message };

    const { data: publicUrlData } = admin.storage.from("cv").getPublicUrl(path);
    const url = publicUrlData.publicUrl;

    const { error: dbError } = await admin
      .from("personal_info")
      .update({ cv_url: url, updated_at: new Date().toISOString() })
      .eq("id", 1);
    if (dbError) return { success: false, error: dbError.message };

    updateTag("personal-info");
    return { success: true, url };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

// projectId optionnel : fourni en édition (met aussi à jour la ligne projet
// immédiatement), absent en création (l'URL est juste renvoyée au formulaire,
// qui la persiste avec le reste des champs à la sauvegarde).
export async function uploadProjectImage(formData: FormData, projectId?: string): Promise<UploadResult> {
  try {
    await requireAdminUser();

    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { success: false, error: "Aucun fichier fourni." };
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { success: false, error: "Format accepté : PNG, JPG ou WebP." };
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return { success: false, error: "Le fichier dépasse la taille maximale de 2 Mo." };
    }

    const admin = getSupabaseAdmin();
    const path = `${Date.now()}-${sanitizeFilename(file.name)}`;

    const { error: uploadError } = await admin.storage.from("project-images").upload(path, file, {
      contentType: file.type,
      upsert: true,
    });
    if (uploadError) return { success: false, error: uploadError.message };

    const { data: publicUrlData } = admin.storage.from("project-images").getPublicUrl(path);
    const url = publicUrlData.publicUrl;

    if (projectId) {
      const { error: dbError } = await admin
        .from("projects")
        .update({ image: url, updated_at: new Date().toISOString() })
        .eq("id", projectId);
      if (dbError) return { success: false, error: dbError.message };
      updateTag("projects");
    }

    return { success: true, url };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}
