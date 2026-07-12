"use client";

import { usePathname } from "next/navigation";
import { CustomCursor } from "./cursor";
import { Preloader } from "./preloader";
import { Header } from "./header";
import { Footer } from "./footer";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { ChatWidgetMount } from "@/components/chat/chat-widget-mount";
import type { PersonalInfo } from "@/lib/data";
import type { SocialLink } from "@/types";

interface PublicChromeProps {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
  children: React.ReactNode;
}

// Le panneau admin est un outil de travail, pas une vitrine : il a son
// propre layout (sidebar) et ne doit pas porter le header/footer/widget de
// chat du site public — sur mobile ils se superposaient au hamburger de la
// sidebar admin. Exception : /admin/login n'a pas encore de sidebar (page
// pré-connexion), donc pas de conflit — elle garde le chrome public complet
// comme n'importe quelle autre page du site.
export function PublicChrome({ personalInfo, socialLinks, children }: PublicChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") && pathname !== "/admin/login";

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Preloader name={personalInfo.name} />
      <CustomCursor />
      <ScrollProgress />
      <Header personalInfo={personalInfo} socialLinks={socialLinks} />
      <main className="min-h-screen">{children}</main>
      <Footer personalInfo={personalInfo} socialLinks={socialLinks} />
      <ChatWidgetMount />
    </>
  );
}
