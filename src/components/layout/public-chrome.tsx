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
//
// Pas de mode="wait" : avec mode="wait", la page entrante ne monte qu'une
// fois la sortie de l'ancienne terminée (~250ms) — un clic pendant cette
// fenêtre atterrit sur du contenu qui n'existe pas encore ou sur l'ancienne
// page en train de disparaître, ce qui se lit comme "le clic n'a rien fait".
// Ici les deux se chevauchent : la page entrante est montée et cliquable
// immédiatement, tandis que l'ancienne passe en position absolute (ne
// pousse plus le contenu, évite le double-scroll pendant le fondu) et
// pointer-events: none dès qu'elle commence à sortir, pour ne jamais
// intercepter un clic destiné à la nouvelle page en dessous.
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
      <main className="min-h-screen relative">
        {reduceMotion ? (
          children
        ) : (
          <AnimatePresence initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -8,
                position: "absolute",
                pointerEvents: "none",
                top: 0,
                left: 0,
                right: 0,
              }}
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
