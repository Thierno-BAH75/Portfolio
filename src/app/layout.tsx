import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/layout/cursor";
import { Preloader } from "@/components/layout/preloader";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { ChatWidgetMount } from "@/components/chat/chat-widget-mount";
import { LanguageSync } from "@/i18n";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://thiernobah.dev"),
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
  authors: [{ name: "Thierno BAH", url: "https://thiernobah.dev" }],
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
    url: "https://thiernobah.dev",
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
    creator: "@thiernobah",
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          {/* <html lang> suit la langue active (défaut : fr) */}
          <LanguageSync />

          {/* Preloader */}
          <Preloader />

          {/* Custom cursor - desktop only */}
          <CustomCursor />

          {/* Scroll progress indicator */}
          <ScrollProgress />

          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="min-h-screen">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Assistant IA — bulle flottante bas-droite */}
          <ChatWidgetMount />
        </Providers>
      </body>
    </html>
  );
}
