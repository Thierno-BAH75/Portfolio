import { NextResponse } from "next/server";

// Analyse réelle des en-têtes de sécurité HTTP — mais UNIQUEMENT de ce
// site : la cible est une constante serveur figée (NEXT_PUBLIC_SITE_URL),
// JAMAIS dérivée d'un en-tête de la requête entrante. Un en-tête comme
// Host ou X-Forwarded-Host est entièrement sous le contrôle de l'appelant
// dans une requête brute (curl, script) — les utiliser comme cible de
// fetch() ouvrait un SSRF trivial (Host: exemple.com → le serveur
// exécutait réellement une requête vers exemple.com).
const EXPLAINED_HEADERS = [
  "content-security-policy",
  "strict-transport-security",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-xss-protection",
] as const;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export async function GET() {
  const targetUrl = `${SITE_URL}/`;

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
