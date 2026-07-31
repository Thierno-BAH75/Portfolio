import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://thiernobah.dev").replace(/\/+$/, "");

// /about et /experience ne sont pas listées : ce sont des redirections vers
// les ancres de la home (architecture « vitrine à ancres »), Google les
// marquerait « page avec redirection » sans les indexer. /contact, elle, est
// désormais une vraie page dédiée (même pattern que Projets/Certifications,
// cf. src/app/contact/) et a donc sa place ici.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/certifications`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/outils`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/veille`, changeFrequency: "daily", priority: 0.6 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
