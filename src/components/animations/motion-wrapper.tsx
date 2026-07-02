"use client";

import { motion, HTMLMotionProps, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ============================================
// VARIANTS PRÉDÉFINIES (Animations réutilisables)
// ============================================

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Animation de rotation + scale
export const rotateIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Animation de blur
export const blurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Animation de rebond
export const bounceIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

// Animation slide avec élasticité
export const slideIn: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ============================================
// COMPOSANTS DE BASE
// ============================================

interface MotionDivProps extends HTMLMotionProps<"div"> {
  className?: string;
}

export function MotionDiv({ className, children, ...props }: MotionDivProps) {
  return (
    <motion.div className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}

// ============================================
// COMPOSANT FADEIN (avec direction)
// ============================================

interface FadeInProps extends HTMLMotionProps<"div"> {
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

export function FadeIn({
  direction = "up",
  delay = 0,
  className,
  children,
  ...props
}: FadeInProps) {
  const variants = {
    up: fadeInUp,
    down: fadeInDown,
    left: fadeInLeft,
    right: fadeInRight,
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants[direction]}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// COMPOSANT SCALEIN
// ============================================

interface ScaleInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  className?: string;
}

export function ScaleIn({
  delay = 0,
  className,
  children,
  ...props
}: ScaleInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={scaleIn}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// COMPOSANTS STAGGER (Animation en cascade)
// ============================================

interface StaggerChildrenProps extends HTMLMotionProps<"div"> {
  className?: string;
  staggerDelay?: number;
}

export function StaggerChildren({
  className,
  children,
  staggerDelay = 0.1,
  ...props
}: StaggerChildrenProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeInUp} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}

// ============================================
// HOVER CARD 3D (Effet parallaxe au survol)
// ============================================

interface HoverCard3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // Force de l'effet (défaut: 10)
}

export function HoverCard3D({
  children,
  className,
  intensity = 10
}: HoverCard3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// FLOATING ANIMATION (Flottement continu)
// ============================================

interface FloatingProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export function Floating({
  children,
  className,
  duration = 3,
  distance = 10
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PULSE ANIMATION (Pulsation)
// ============================================

interface PulseProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

export function Pulse({
  children,
  className,
  scale = 1.05,
  duration = 2
}: PulseProps) {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// GLOW ON HOVER (Lueur au survol)
// ============================================

interface GlowOnHoverProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowOnHover({
  children,
  className,
  glowColor = "rgba(99, 102, 241, 0.5)"
}: GlowOnHoverProps) {
  return (
    <motion.div
      whileHover={{
        boxShadow: `0 0 30px ${glowColor}`,
      }}
      transition={{ duration: 0.3 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// REVEAL ON SCROLL (Révélation au scroll)
// ============================================

interface RevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  width?: "fit" | "full";
}

export function Reveal({
  children,
  className,
  width = "fit",
  ...props
}: RevealProps) {
  return (
    <div className={cn("relative overflow-hidden", width === "full" ? "w-full" : "w-fit")}>
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ left: 0 }}
        whileInView={{ left: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute top-0 bottom-0 left-0 right-0 bg-primary z-10"
      />
    </div>
  );
}

// ============================================
// COUNTER ANIMATION (Compteur animé)
// ============================================

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  className,
  suffix = "",
  prefix = ""
}: CounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);

          // Easing function (ease-out)
          const easeOut = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(from + (to - from) * easeOut));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}

// ============================================
// SHAKE ANIMATION (Secousse)
// ============================================

interface ShakeProps {
  children: ReactNode;
  className?: string;
  trigger?: boolean;
}

export function Shake({ children, className, trigger }: ShakeProps) {
  return (
    <motion.div
      animate={trigger ? {
        x: [-10, 10, -10, 10, -5, 5, -2, 2, 0],
        transition: { duration: 0.5 }
      } : {}}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// DRAW SVG (Dessiner un SVG)
// ============================================

interface DrawSVGProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

export function DrawSVG({ children, className, duration = 2 }: DrawSVGProps) {
  return (
    <motion.svg
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration, ease: "easeInOut" }}
      className={cn(className)}
    >
      {children}
    </motion.svg>
  );
}

// ============================================
// PARALLAX (Effet parallaxe au scroll)
// ============================================

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Négatif = plus lent, positif = plus rapide
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn(className)}
      whileInView={{
        y: 0,
      }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  );
}
