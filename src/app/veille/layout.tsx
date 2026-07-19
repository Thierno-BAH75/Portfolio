import type { Metadata } from "next";

// page.tsx est un composant client ("use client") et ne peut pas exporter de
// metadata — ce layout serveur porte le title/description propres à la page.
export const metadata: Metadata = {
  title: "Veille techno",
  description:
    "Veille cybersécurité et infrastructure en temps réel : CVE, vulnérabilités, actualités réseaux et cloud agrégées par flux RSS.",
};

export default function VeilleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
