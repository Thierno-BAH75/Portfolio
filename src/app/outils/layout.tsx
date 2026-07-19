import type { Metadata } from "next";

// page.tsx est un composant client ("use client") et ne peut pas exporter de
// metadata — ce layout serveur porte le title/description propres à la page.
export const metadata: Metadata = {
  title: "Outils cybersécurité",
  description:
    "19 mini-outils réseau & sécurité interactifs : calculateur de sous-réseaux, analyseur d'en-têtes HTTP, générateur de hash, simulateur de phishing et plus.",
};

export default function OutilsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
