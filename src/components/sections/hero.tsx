"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Floating } from "@/components/animations";
import type { PersonalInfo } from "@/lib/data";
import { TechMarquee } from "./tech-marquee";
import { useI18n } from "@/i18n";
import { useHashLinkClick } from "@/hooks/use-hash-link-click";

// Charger le composant 3D dynamiquement pour éviter les erreurs SSR
const FloatingShapes = dynamic(
  () => import("@/components/3d/floating-shapes").then((mod) => mod.FloatingShapes),
  { ssr: false }
);

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const TYPING_SPEED  = 52;
const ERASING_SPEED = 28;
const PAUSE_TYPED   = 2000;
const PAUSE_ERASED  = 350;

// Le wrapper `hidden sm:block` masque déjà la scène 3D sous ce seuil — inutile
// d'initialiser Three.js/WebGL (compilation de shaders, boucle de rendu) pour
// un canvas jamais affiché. Sur desktop/tablette, on attend un instant d'idle
// du thread principal (après le rendu du LCP : titre/photo) avant de monter
// le canvas, pour ne plus entrer en concurrence avec le contenu critique.
// On réagit aussi si le viewport franchit le seuil desktop (resize, rotation).
function useDeferredCanvasMount(timeoutMs = 1200) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    let handle: number | undefined;

    const schedule = () => {
      handle = hasIdleCallback
        ? window.requestIdleCallback(() => setReady(true), { timeout: timeoutMs })
        : window.setTimeout(() => setReady(true), timeoutMs);
    };
    const cancel = () => {
      if (handle === undefined) return;
      if (hasIdleCallback) {
        window.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
    };

    const mql = window.matchMedia("(min-width: 640px)");
    if (mql.matches) schedule();

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches && handle === undefined) schedule();
    };
    mql.addEventListener("change", handleChange);

    return () => {
      cancel();
      mql.removeEventListener("change", handleChange);
    };
  }, [timeoutMs]);

  return ready;
}

function LoopingTypewriter({ titles }: { titles: string[] }) {
  const [idx, setIdx]       = useState(0);
  const [count, setCount]   = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const text = titles[idx];

    if (!erasing && count < text.length) {
      const t = setTimeout(() => setCount((c) => c + 1), TYPING_SPEED);
      return () => clearTimeout(t);
    }
    if (!erasing && count === text.length) {
      const t = setTimeout(() => setErasing(true), PAUSE_TYPED);
      return () => clearTimeout(t);
    }
    if (erasing && count > 0) {
      const t = setTimeout(() => setCount((c) => c - 1), ERASING_SPEED);
      return () => clearTimeout(t);
    }
    if (erasing && count === 0) {
      const t = setTimeout(() => {
        setErasing(false);
        setIdx((i) => (i + 1) % titles.length);
      }, PAUSE_ERASED);
      return () => clearTimeout(t);
    }
  }, [idx, count, erasing, titles]);

  const text = titles[idx];

  return (
    <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
      {text.slice(0, count)}
      <span className="animate-blink inline-block w-[3px] h-[0.8em] bg-cyan-400 ml-1 align-middle rounded-sm" />
    </span>
  );
}

export function Hero({ personalInfo }: { personalInfo: PersonalInfo }) {
  const containerRef = useRef<HTMLElement>(null);
  const { t, tx, locale } = useI18n();
  const canvasReady = useDeferredCanvasMount();
  const handleHashClick = useHashLinkClick();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={containerRef}
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24"
    >
      {/* 3D Background - Hidden on mobile for performance, montage différé desktop/tablette */}
      <div className="hidden sm:block">
        {canvasReady && (
          <Suspense fallback={null}>
            <FloatingShapes />
          </Suspense>
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-background/60 pointer-events-none" />
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Avatar — mt-* : respire sous le header fixe (avant, trop collé). */}
          <motion.div variants={itemVariants} className="mt-6 sm:mt-10 lg:mt-12 mb-8 flex justify-center">
            <div className="animate-float">
              <div className="animate-glow">
                <Image
                  src="/hero-avatar.png"
                  alt="Thierno BAH"
                  width={240}
                  height={240}
                  priority
                  className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px] object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Nom — point d'ancrage visuel principal, h1 (le rôle animé juste en
              dessous précise le poste mais n'est plus le titre de page). Chaîne
              statique et courte : aucune réserve de hauteur nécessaire, pas de
              risque de retour à la ligne (whitespace-nowrap en garde-fou). */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 whitespace-nowrap bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Rôle — looping typewriter. Toujours 1 seule ligne (whitespace-nowrap) :
              min-h réserve la hauteur d'une ligne pour éviter tout CLS pendant
              la frappe/rotation des titres. */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold mb-6 min-h-[1.3em] whitespace-nowrap"
          >
            <LoopingTypewriter key={locale} titles={t.hero.titles} />
          </motion.p>

          {/* Availability Badge */}
          {personalInfo.available && (
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm border-green-500/30 bg-green-500/10 text-green-500 hover:bg-green-500/20"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {tx(personalInfo.seeking)}
              </Badge>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Dégradé violet→cyan — Voir mes projets */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="w-full sm:w-auto min-w-[180px] bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.45)]"
                asChild
              >
                <Link href="/projects">
                  {t.hero.viewProjects}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Violet — Me contacter */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="w-full sm:w-auto min-w-[180px] bg-violet-600 hover:bg-violet-500 text-white shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                asChild
              >
                <Link href="/#contact" onClick={(e) => handleHashClick(e, "/#contact")}>
                  {t.hero.contact}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator — en flux sous les CTA, ne peut jamais les chevaucher */}
          <motion.div
            className="mt-10 sm:mt-12 hidden sm:flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <Floating duration={2} distance={8}>
              <motion.button
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-xs">{t.hero.scroll}</span>
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </Floating>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Bandeau technologies */}
      <TechMarquee />
    </section>
  );
}
