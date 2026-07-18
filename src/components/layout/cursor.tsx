"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CLICKABLE_SELECTOR =
  'a, button, [role="button"], input, textarea, .cursor-pointer';

// Petite boule pleine qui suit la souris avec un léger retard (spring),
// EN PLUS du curseur natif (qui reste visible — on ne le masque plus).
// Position et scale passent uniquement par des motion values → aucun
// re-render React par mousemove. L'activation (pointeur fin, motion non
// réduit) est gérée en CSS (globals.css, classe .custom-cursor) : sur
// tactile ou reduced-motion le composant reste monté mais invisible.
// Blanc + mix-blend-difference plutôt qu'une couleur d'accent fixe : reste
// lisible quel que soit le fond (glows violet/cyan, thème clair/sombre)
// sans jamais se fondre dedans.
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 250, damping: 25 });
  const dotY = useSpring(y, { stiffness: 250, damping: 25 });

  const targetScale = useMotionValue(1);
  const dotScale = useSpring(targetScale, { stiffness: 300, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      targetScale.set(target?.closest(CLICKABLE_SELECTOR) ? 1.5 : 1);
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y, targetScale]);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <motion.div
        className="fixed top-0 left-0 z-[9999] w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY, scale: dotScale }}
      />
    </div>
  );
}
