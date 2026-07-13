import { NextRequest, NextResponse } from "next/server";

// Analyse réelle des en-têtes de sécurité HTTP — mais UNIQUEMENT de ce
// site : la cible n'est jamais fournie par l'appelant, elle est dérivée du
// Host de la requête entrante elle-même. Aucun paramètre de domaine
// arbitraire n'existe sur cette route, donc aucune requête vers un tiers
// n'est possible par construction.
const EXPLAINED_HEADERS = [
  "content-security-policy",
  "strict-transport-security",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-xss-protection",
] as const;

export async function GET(request: NextRequest) {
  const host = request.headers.get("host") ?? "localhost:3000";
  const proto = request.headers.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const targetUrl = `${proto}://${host}/`;

  try {
    const res = await fetch(targetUrl, { method: "GET", cache: "no-store", redirect: "manual" });
    const headers: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    const present = EXPLAINED_HEADERS.filter((h) => headers[h] !== undefined);
    const missing = EXPLAINED_HEADERS.filter((h) => headers[h] === undefined);

    return NextResponse.json({
      url: targetUrl,
      status: res.status,
      headers: Object.fromEntries(present.map((h) => [h, headers[h]])),
      missing,
    });
  } catch {
    return NextResponse.json({ error: "fetch_failed", url: targetUrl }, { status: 502 });
  }
}
