"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Le logo (bouclier) est détouré sur fond transparent, dessiné pour un fond
// sombre à l'origine (texte "TB" et halo blancs) ; les variantes -light.png
// reprennent la même composition recolorée pour fond clair (texte foncé,
// sans halo qui se fondrait dans un fond clair).
//
// Deux variantes :
// - "icon" (logo-icon*.png) : bouclier seul, utilisé par le footer.
// - "full" (logo-full*.png) : bouclier + tagline "Ingénierie Systèmes &
//   Réseaux" composités dans une seule image (texte figé en français, pas
//   de traduction EN), utilisé par le header.
//
// `mounted` évite un hydration mismatch : resolvedTheme n'est fiable qu'après
// le premier rendu client — tant qu'on n'est pas monté, on garde le fichier
// sombre (identique au HTML serveur), même pattern que ThemeToggle.
export function useThemedLogoSrc(variant: "icon" | "full" = "icon") {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";
  const base = variant === "full" ? "/logo-full" : "/logo-icon";
  return isLight ? `${base}-light.png` : `${base}.png`;
}
