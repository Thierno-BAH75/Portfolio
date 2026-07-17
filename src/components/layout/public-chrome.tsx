"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CustomCursor } from "./cursor";
import { Preloader } from "./preloader";
import { Header } from "./header";
import { Footer } from "./footer";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { ChatWidgetMount } from "@/components/chat/chat-widget-mount";
import type { PersonalInfo } from "@/lib/data";
import type { SocialLink } from "@/types";

// Fade + léger slide entre les routes réelles (/, /projects, /outils, ...).
// initial={false} sur AnimatePresence : la toute première page servie ne
// joue jamais cette animation (elle démarrerait à opacity 0, ce qui
// retarderait le LCP du Hero) — seuls les changements de route ultérieurs
// sont animés. Ce composant est monté une seule fois par layout.tsx (il ne
// remonte pas à chaque navigation), condition nécessaire pour qu'AnimatePresence
// détecte réellement l'ancienne route sortante et anime l'entrée/sortie.
const pageTransition = { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

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
  const reduceMotion = useReducedMotion();

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Preloader name={personalInfo.name} />
      <CustomCursor />
      <ScrollProgress />
      <Header personalInfo={personalInfo} socialLinks={socialLinks} />
      <main className="min-h-screen">
        {reduceMotion ? (
          children
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={pageTransition}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
      <Footer personalInfo={personalInfo} socialLinks={socialLinks} />
      <ChatWidgetMount />
    </>
  );
}
