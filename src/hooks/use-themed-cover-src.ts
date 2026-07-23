"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Les couvertures projet (public/projects/<slug>.svg) sont dessinées pour un
// fond sombre ; chaque slug a une variante `<slug>-light.svg` (même
// composition, palette recolorée pour fond clair). Ce hook resitue la bonne
// source selon le thème résolu.
//
// `mounted` évite un hydration mismatch : resolvedTheme n'est fiable qu'après
// le premier rendu client (le HTML serveur ne connaît pas la préférence
// stockée en localStorage) — tant qu'on n'est pas monté, on garde `src` tel
// quel (identique au HTML serveur), même pattern que ThemeToggle.
export function useThemedCoverSrc(src: string) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (mounted && resolvedTheme === "light") {
    return src.replace(/\.svg$/, "-light.svg");
  }
  return src;
}
