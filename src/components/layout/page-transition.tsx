"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { ReactNode, useEffect } from "react";

// ─── Overlay cramoisi qui flashe entre les pages ───────────────────────────
function CrimsonOverlay({ pathname }: { pathname: string }) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // Flash violent : apparaît d'un coup, disparaît par à-coups
    animate(
      scope.current,
      {
        opacity:  [0, 0.75, 0.5, 0.65, 0],
        scaleY:   [1,  1.01, 0.99, 1, 1],
        skewX:    [0,  1,   -1,   0, 0],
      },
      {
        duration: 0.22,
        times:    [0, 0.08, 0.14, 0.2, 1],
        ease:     "linear",
      }
    );
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      ref={scope}
      className="fixed inset-0 z-[9998] pointer-events-none opacity-0"
      style={{ background: "linear-gradient(135deg, #8B0000 0%, #C41230 50%, #FF1744 100%)" }}
    />
  );
}

// ─── Wrapper animé par page ────────────────────────────────────────────────
const exitVariants = {
  // Erasure brusque : King Crimson efface le temps en ~3 "frames"
  exit: {
    opacity: [1, 1, 0.4, 0] as number[],
    x:       [0, -3, 3, 0]  as number[],
    filter: [
      "brightness(1) saturate(1) hue-rotate(0deg)",
      "brightness(1.5) saturate(0.4) hue-rotate(-15deg)",
      "brightness(2.5) saturate(0) hue-rotate(-30deg)",
      "brightness(1) saturate(0) hue-rotate(0deg)",
    ],
    transition: {
      duration: 0.09,
      times: [0, 0.35, 0.65, 1],
      ease: "linear" as const,
    },
  },
};

const enterVariants = {
  // Réapparition instantanée + glitch chromatique rouge
  initial: {
    opacity: 0,
    x: 10,
    filter: "brightness(1.6) saturate(0.2) hue-rotate(-20deg)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "brightness(1) saturate(1) hue-rotate(0deg)",
    transition: {
      opacity: { duration: 0.04, ease: "linear" as const },
      x: {
        type: "spring" as const,
        stiffness: 1400,
        damping: 22,
        mass: 0.4,
      },
      filter: { duration: 0.12, ease: "easeOut" as const },
    },
  },
};

// ─── Composant principal ───────────────────────────────────────────────────
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <CrimsonOverlay pathname={pathname} />

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={{ ...exitVariants, ...enterVariants }}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
