"use server";

import { updateTag } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { personalInfoSchema, type PersonalInfoFormValues } from "@/lib/schemas";
import { requireAdminUser, UnauthorizedError, type ActionResult } from "./require-admin";

interface SocialLinkRow {
  name: string;
  url: string;
  icon: string;
}

export async function updatePersonalInfo(values: PersonalInfoFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = personalInfoSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();

    // Ne gère que github/linkedin depuis ce formulaire — on conserve les
    // autres entrées (ex. l'email en "mailto:") déjà présentes en base.
    const { data: existing } = await admin
      .from("personal_info")
      .select("social_links")
      .eq("id", 1)
      .maybeSingle();
    const previousLinks = ((existing?.social_links as SocialLinkRow[] | null) ?? []).filter(
      (l) => l.icon !== "github" && l.icon !== "linkedin"
    );

    const socialLinks: SocialLinkRow[] = [...previousLinks];
    if (parsed.data.github) socialLinks.push({ name: "GitHub", url: parsed.data.github, icon: "github" });
    if (parsed.data.linkedin) socialLinks.push({ name: "LinkedIn", url: parsed.data.linkedin, icon: "linkedin" });

    const { error } = await admin
      .from("personal_info")
      .upsert(
        {
          id: 1,
          name: parsed.data.name,
          title: parsed.data.title,
          tagline: parsed.data.tagline,
          email: parsed.data.email,
          phone: parsed.data.phone,
          location: parsed.data.location,
          available: parsed.data.available,
          availability_message: parsed.data.seeking,
          social_links: socialLinks,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) return { success: false, error: error.message };

    updateTag("personal-info");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}
