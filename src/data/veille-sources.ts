// Filet de secours si Supabase est injoignable — source de vérité normale :
// table veille_sources, gérée depuis /admin/veille.
export interface VeilleSource {
  name: string;
  url: string;
  domain: string;
}

export const veilleSources: VeilleSource[] = [
  // ── Cybersécurité ────────────────────────────────────────────────
  { url: "https://www.cert.ssi.gouv.fr/feed/", name: "ANSSI", domain: "Cybersécurité" },
  { url: "https://krebsonsecurity.com/feed/", name: "Krebs on Security", domain: "Cybersécurité" },
  { url: "https://feeds.feedburner.com/TheHackersNews", name: "The Hacker News", domain: "Cybersécurité" },
  { url: "https://isc.sans.edu/rssfeed.xml", name: "SANS ISC", domain: "Cybersécurité" },
  // ── Réseaux & Infrastructure ─────────────────────────────────────
  { url: "https://blogs.cisco.com/feed", name: "Cisco Blog", domain: "Réseaux & Infrastructure" },
  { url: "https://blog.cloudflare.com/rss/", name: "Cloudflare", domain: "Réseaux & Infrastructure" },
  // ── Cloud & DevSecOps ────────────────────────────────────────────
  { url: "https://aws.amazon.com/blogs/security/feed/", name: "AWS Security", domain: "Cloud & DevSecOps" },
  { url: "https://azure.microsoft.com/en-us/blog/feed/", name: "Microsoft Azure", domain: "Cloud & DevSecOps" },
  // ── Système & Linux ──────────────────────────────────────────────
  { url: "https://www.redhat.com/en/rss/blog", name: "Red Hat", domain: "Système & Linux" },
];
