"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CLICKABLE_SELECTOR =
  'a, button, [role="button"], input, textarea, .cursor-pointer';

// Point qui suit la souris + anneau retardé (spring) qui grossit sur les
// éléments cliquables. Position et scale passent uniquement par des motion
// values → aucun re-render React par mousemove. L'activation (pointeur fin,
// motion non réduit) et le masquage du curseur natif sont gérés en CSS
// (globals.css, classe .custom-cursor) : sur tactile ou reduced-motion le
// composant reste monté mais invisible et le curseur natif est conservé.
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // L'anneau traîne derrière le point
  const ringX = useSpring(x, { stiffness: 250, damping: 25 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25 });

  const targetScale = useMotionValue(1);
  const ringScale = useSpring(targetScale, { stiffness: 300, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      targetScale.set(target?.closest(CLICKABLE_SELECTOR) ? 2.5 : 1);
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
      {/* Point central — suit la souris sans délai */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none mix-blend-difference"
        style={{ x, y }}
      />
      {/* Anneau — léger retard, scale 2.5 sur les cliquables */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] w-10 h-10 -ml-5 -mt-5 rounded-full border-2 border-white pointer-events-none mix-blend-difference"
        style={{ x: ringX, y: ringY, scale: ringScale }}
      />
    </div>
  );
}
