"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Floating } from "@/components/animations";
import { personalInfo } from "@/data/experience";
import { TechMarquee } from "./tech-marquee";

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

const TITLE_VARIANTS = [
  "Ingénieur Sécurité Réseau & Système",
  "Administrateur Infrastructure",
  "Spécialiste Supervision & Automatisation",
] as const;

const TYPING_SPEED  = 52;
const ERASING_SPEED = 28;
const PAUSE_TYPED   = 2000;
const PAUSE_ERASED  = 350;

function LoopingTypewriter() {
  const [idx, setIdx]       = useState(0);
  const [count, setCount]   = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const text = TITLE_VARIANTS[idx];

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
        setIdx((i) => (i + 1) % TITLE_VARIANTS.length);
      }, PAUSE_ERASED);
      return () => clearTimeout(t);
    }
  }, [idx, count, erasing]);

  const text = TITLE_VARIANTS[idx];

  return (
    <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
      {text.slice(0, count)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[0.8em] bg-cyan-400 ml-1 align-middle rounded-sm"
      />
    </span>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background - Hidden on mobile for performance */}
      <div className="hidden sm:block">
        <Suspense fallback={null}>
          <FloatingShapes />
        </Suspense>
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
          {/* Avatar */}
          <motion.div variants={itemVariants} className="mb-8 flex justify-center">
            <div className="rounded-full p-[3px] bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_35px_rgba(139,92,246,0.35)]">
              <Image
                src="/thierno-bah.jpeg"
                alt="Thierno BAH"
                width={130}
                height={130}
                priority
                className="w-[130px] h-[130px] rounded-full object-cover"
              />
            </div>
          </motion.div>

          {/* Title — looping typewriter */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 min-h-[1.3em]"
          >
            <LoopingTypewriter />
          </motion.h1>

          {/* Availability Badge */}
          {personalInfo.available && (
            <motion.div variants={itemVariants} className="mb-10 sm:mb-12">
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm border-green-500/30 bg-green-500/10 text-green-500 hover:bg-green-500/20"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {personalInfo.seeking}
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
                  Voir mes projets
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Cyan — Mon CV */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="w-full sm:w-auto min-w-[180px] bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                asChild
              >
                <a href="/CV_Alternance_BAH-Thierno_2026.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  Mon CV
                </a>
              </Button>
            </motion.div>

            {/* Violet — Me contacter */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="w-full sm:w-auto min-w-[180px] bg-violet-600 hover:bg-violet-500 text-white shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                asChild
              >
                <Link href="/#contact">Me contacter</Link>
              </Button>
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Scroll indicator — remonté au-dessus du bandeau technos */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0, y: -20 }}
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
            <span className="text-xs">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </Floating>
      </motion.div>

      {/* Bandeau technologies */}
      <TechMarquee />
    </section>
  );
}
