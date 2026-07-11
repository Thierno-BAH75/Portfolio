import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const VIEWED_COOKIE = "viewed_projects";
const VIEWED_COOKIE_MAX_AGE = 60 * 60 * 24; // 24h — anti-abus simple, pas une source de vérité

// Incrémente view_count une fois par session/jour et par projet. Best-effort :
// une erreur ici ne doit jamais impacter l'affichage de la page projet.
export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "invalid_slug" }, { status: 400 });
  }

  const alreadyViewed = (request.cookies.get(VIEWED_COOKIE)?.value ?? "")
    .split(",")
    .filter(Boolean);

  if (alreadyViewed.includes(slug)) {
    return NextResponse.json({ counted: false });
  }

  const admin = getSupabaseAdmin();
  const { data: project, error: fetchError } = await admin
    .from("projects")
    .select("id, view_count")
    .eq("slug", slug)
    .maybeSingle();

  if (fetchError || !project) {
    return NextResponse.json({ counted: false });
  }

  const { error: updateError } = await admin
    .from("projects")
    .update({ view_count: (project.view_count as number) + 1 })
    .eq("id", project.id);

  if (updateError) {
    console.error(`[api/projects/${slug}/view] échec incrément :`, updateError.message);
    return NextResponse.json({ counted: false });
  }

  const response = NextResponse.json({ counted: true });
  response.cookies.set(VIEWED_COOKIE, [...alreadyViewed, slug].join(","), {
    maxAge: VIEWED_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
  return response;
}
