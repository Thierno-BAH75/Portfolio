"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Le logo (bouclier) est détouré sur fond transparent, dessiné pour un fond
// sombre à l'origine (texte "TB" et halo blancs) ; logo-icon-light.png reprend
// la même composition recolorée pour fond clair (texte foncé, sans halo qui
// se fondrait dans un fond clair). Utilisé par le header et le footer.
//
// `mounted` évite un hydration mismatch : resolvedTheme n'est fiable qu'après
// le premier rendu client — tant qu'on n'est pas monté, on garde le fichier
// sombre (identique au HTML serveur), même pattern que ThemeToggle.
export function useThemedLogoSrc() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && resolvedTheme === "light" ? "/logo-icon-light.png" : "/logo-icon.png";
}
