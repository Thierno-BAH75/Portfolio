import { NextResponse } from "next/server";
import { getVeilleSources } from "@/lib/data";
import { isHttpUrl } from "@/lib/schemas";

export interface RSSArticle {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  domain: string;   // "Cybersécurité" | "Réseaux & Infrastructure" | etc.
  category: string; // kept for backward compat — same as domain
  tag: string;
}

function detectTag(title: string, desc: string): string {
  const text = (title + " " + desc).toLowerCase();
  if (/\brce\b|remote code execution/.test(text)) return "RCE";
  if (/ransomware/.test(text)) return "Ransomware";
  if (/phishing/.test(text)) return "Phishing";
  if (/malware|trojan|backdoor|botnet/.test(text)) return "Malware";
  if (/patch|update|fix|fixed|security update/.test(text)) return "Patch";
  if (/\bcve-\d{4}-\d+\b|vulnerability|vulnerabilities|vulnérabilit/.test(text)) return "CVE";
  if (/zero.?day|0day/.test(text)) return "0-Day";
  if (/data breach|leaked|leak|breach/.test(text)) return "Fuite";
  if (/ddos|denial.of.service/.test(text)) return "DDoS";
  if (/cloud|container|kubernetes|k8s|docker/.test(text)) return "Cloud";
  if (/linux|kernel|ubuntu|debian|rhel/.test(text)) return "Linux";
  if (/network|firewall|router|vlan|bgp/.test(text)) return "Réseau";
  return "Actualité";
}

function extractCDATA(raw: string): string {
  const m = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return m ? m[1] : raw;
}

function parseRSS(xml: string, source: string, domain: string): RSSArticle[] {
  // Support both RSS <item> and Atom <entry>
  const itemPattern = xml.includes("<entry>")
    ? /<entry>([\s\S]*?)<\/entry>/g
    : /<item>([\s\S]*?)<\/item>/g;

  const items = xml.match(itemPattern) ?? [];

  return items.slice(0, 12).map((item, idx) => {
    const titleRaw   = item.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? "";
    // RSS <link> can be self-closing or text; Atom uses href attribute
    const linkRaw    = item.match(/<link href="([^"]+)"/)?.[1]
                    ?? item.match(/<link>([\s\S]*?)<\/link>/)?.[1]
                    ?? "";
    const descRaw    = item.match(/<(?:description|summary|content)[^>]*>([\s\S]*?)<\/(?:description|summary|content)>/)?.[1] ?? "";
    const pubDateRaw = item.match(/<(?:pubDate|published|updated)>([\s\S]*?)<\/(?:pubDate|published|updated)>/)?.[1] ?? "";

    const title = extractCDATA(titleRaw).trim();
    // Lien issu d'un flux externe non fiable : on ne le rend que s'il est
    // http/https (un flux compromis pourrait injecter un href javascript:).
    const rawLink = extractCDATA(linkRaw).trim();
    const link = isHttpUrl(rawLink) ? rawLink : "";
    const description = extractCDATA(descRaw)
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#\d+;/g, "")
      .trim()
      .slice(0, 220);
    const pubDate = pubDateRaw.trim();
    const tag = detectTag(title, description);

    return {
      id: `${source}-${idx}-${Date.now()}`,
      title,
      link,
      description,
      pubDate,
      source,
      domain,
      category: domain, // backward compat
      tag,
    };
  });
}

export async function GET() {
  const results: RSSArticle[] = [];
  const sources = await getVeilleSources();

  await Promise.allSettled(
    sources.map(async ({ url, name: source, domain }) => {
      try {
        const res = await fetch(url, {
          next: { revalidate: 300 },
          headers: { "User-Agent": "Mozilla/5.0 (compatible; RSSBot/1.0)" },
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) {
          console.warn(`[api/rss] Flux indisponible (${res.status}) : ${source} — ${url}`);
          return;
        }
        const xml = await res.text();
        results.push(...parseRSS(xml, source, domain));
      } catch (err) {
        console.warn(`[api/rss] Échec de récupération du flux ${source} — ${url} :`, err);
      }
    })
  );

  results.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });

  return NextResponse.json(results, {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
  });
}
