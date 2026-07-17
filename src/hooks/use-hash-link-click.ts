"use client";

import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";

// Next.js saute instantanément vers les ancres de page (`/#section`), même
// avec `scroll-behavior: smooth` en CSS — son gestionnaire de scroll interne
// l'ignore. Ce hook intercepte le clic pour un vrai scroll fluide quand on
// est déjà sur la home ; sinon on laisse la navigation normale se faire (le
// saut à l'ancre sur la page d'arrivée reste alors un saut de chargement
// classique, comme n'importe quel lien externe vers une ancre).
//
// `delayMs` : à utiliser quand le clic ferme aussi un panneau animé (menu
// mobile) qui partage le même document — démarrer scrollIntoView pendant
// que ce panneau est encore en train de se refermer annule le scroll en
// cours (observé empiriquement). Laisser le temps à sa transition de
// terminer avant de lancer le scroll règle le problème.
export function useHashLinkClick() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (e: MouseEvent<HTMLAnchorElement>, href: string, delayMs = 0) => {
    if (!href.startsWith("/#") || pathname !== "/") return;

    const id = href.slice(2);
    if (!document.getElementById(id)) return;

    e.preventDefault();
    window.history.pushState(null, "", href);

    const scroll = () => {
      document.getElementById(id)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    };

    if (delayMs > 0) {
      setTimeout(scroll, delayMs);
    } else {
      scroll();
    }
  };
}
