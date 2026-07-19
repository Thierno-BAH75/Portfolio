import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { PublicChrome } from "@/components/layout/public-chrome";
import { LanguageSync } from "@/i18n";
import { getPersonalInfo, getSocialLinks } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Domaine final pas encore choisi : l'URL canonique vient de l'environnement
// (NEXT_PUBLIC_SITE_URL, à configurer sur Vercel) avec un repli neutre —
// les URLs OG et le sitemap suivront automatiquement le domaine déployé.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thiernobah.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Thierno BAH | Ingénieur Sécurité Réseau & Système",
    template: "%s | Thierno BAH",
  },
  description:
    "Portfolio de Thierno BAH, Ingénieur Sécurité Réseau & Système. Expert en cybersécurité, architecture réseau, pare-feux Fortigate/Stormshield et administration Active Directory. Certifié CCNA et CSNA.",
  keywords: [
    "cybersécurité",
    "sécurité réseau",
    "ingénieur système",
    "fortigate",
    "stormshield",
    "active directory",
    "zabbix",
    "ccna",
    "csna",
    "infrastructure",
    "paris",
    "alternance",
    "master cybersécurité",
  ],
  authors: [{ name: "Thierno BAH", url: SITE_URL }],
  // "./" (relatif) = canonical auto-référentiel résolu par page via
  // metadataBase — un "/" absolu ici s'hériterait tel quel sur toutes les
  // routes enfants et ferait pointer chaque page vers la home.
  alternates: { canonical: "./" },
  creator: "Thierno BAH",
  publisher: "Thierno BAH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Thierno BAH Portfolio",
    title: "Thierno BAH | Ingénieur Sécurité Réseau & Système",
    description:
      "Portfolio de Thierno BAH, Ingénieur Cybersécurité. Expert en sécurisation d'infrastructures, pare-feux et supervision. Certifié CCNA et CSNA.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Thierno BAH - Ingénieur Sécurité Réseau & Système",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thierno BAH | Ingénieur Sécurité Réseau & Système",
    description:
      "Portfolio de Thierno BAH, Ingénieur Cybersécurité. Expert en sécurisation d'infrastructures, pare-feux et supervision.",
    images: ["/og-image.png"],
    // Pas de creator: ce n'est pas un compte X appartenant à Thierno (handle
    // placeholder du scaffolding initial) — la carte fonctionne très bien sans.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [personalInfo, socialLinks] = await Promise.all([getPersonalInfo(), getSocialLinks()]);

  return (
    <html
      lang="fr"
      suppressHydrationWarning
      style={
        {
          "--accent-color-1": personalInfo.accentColor1,
          "--accent-color-2": personalInfo.accentColor2,
        } as React.CSSProperties
      }
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          {/* <html lang> suit la langue active (défaut : fr) */}
          <LanguageSync />

          {/* Header/Footer/Preloader/curseur/chat : absents sur /admin/*
              (son propre layout sobre, voir public-chrome.tsx), sauf sur
              /admin/login qui garde le chrome public complet */}
          <PublicChrome personalInfo={personalInfo} socialLinks={socialLinks}>
            {children}
          </PublicChrome>
        </Providers>
      </body>
    </html>
  );
}
