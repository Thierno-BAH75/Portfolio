"use server";

import { updateTag } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  veilleSourceSchema,
  veilleBookmarkSchema,
  type VeilleSourceFormValues,
  type VeilleBookmarkFormValues,
} from "@/lib/schemas";
import { requireAdminUser, UnauthorizedError, type ActionResult } from "./require-admin";

function sourceToRow(values: VeilleSourceFormValues) {
  return {
    name: values.name,
    url: values.url,
    domain: values.domain,
    category: values.category || null,
    is_active: values.isActive,
    display_order: values.displayOrder,
  };
}

export async function createVeilleSource(values: VeilleSourceFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = veilleSourceSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin.from("veille_sources").insert(sourceToRow(parsed.data));
    if (error) return { success: false, error: error.message };

    updateTag("veille-sources");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function updateVeilleSource(id: string, values: VeilleSourceFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = veilleSourceSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin.from("veille_sources").update(sourceToRow(parsed.data)).eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("veille-sources");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function deleteVeilleSource(id: string): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("veille_sources").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("veille-sources");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export type TestSourceResult = { success: true; status: number } | { success: false; error: string };

// Vérifie juste que le flux répond — aucune écriture en base.
export async function testVeilleSource(url: string): Promise<TestSourceResult> {
  try {
    await requireAdminUser();
    const res = await fetch(url, {
      method: "GET",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RSSBot/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { success: false, error: `HTTP ${res.status}` };
    return { success: true, status: res.status };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Flux injoignable" };
  }
}

function bookmarkToRow(values: VeilleBookmarkFormValues) {
  return {
    article_url: values.articleUrl,
    article_title: values.articleTitle,
    source_name: values.sourceName || null,
    comment_fr: values.commentFr || null,
    comment_en: values.commentEn || null,
    is_pinned: values.isPinned,
  };
}

export async function createBookmark(values: VeilleBookmarkFormValues): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const parsed = veilleBookmarkSchema.safeParse(values);
    if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Formulaire invalide" };

    const admin = getSupabaseAdmin();
    const { error } = await admin.from("veille_bookmarks").insert(bookmarkToRow(parsed.data));
    if (error) return { success: false, error: error.message };

    updateTag("veille-bookmarks");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function togglePinBookmark(id: string, isPinned: boolean): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("veille_bookmarks").update({ is_pinned: isPinned }).eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("veille-bookmarks");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}

export async function deleteBookmark(id: string): Promise<ActionResult> {
  try {
    await requireAdminUser();
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("veille_bookmarks").delete().eq("id", id);
    if (error) return { success: false, error: error.message };

    updateTag("veille-bookmarks");
    return { success: true };
  } catch (err) {
    if (err instanceof UnauthorizedError) return { success: false, error: err.message };
    return { success: false, error: err instanceof Error ? err.message : "Erreur inconnue" };
  }
}
