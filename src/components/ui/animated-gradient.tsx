"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientBorderProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  gradientClassName?: string;
  duration?: number;
}

export function AnimatedGradientBorder({
  children,
  className,
  containerClassName,
  gradientClassName,
  duration = 3,
}: AnimatedGradientBorderProps) {
  return (
    <div className={cn("relative p-[1px] rounded-2xl overflow-hidden", containerClassName)}>
      {/* Animated border */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-2xl",
          "bg-primary",
          gradientClassName
        )}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content container */}
      <div
        className={cn(
          "relative rounded-2xl bg-background",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={cn(
        "text-primary",
        className
      )}
      animate={{
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
}

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  onClick?: () => void;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "rgba(255, 255, 255, 0.2)",
  onClick,
}: ShimmerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl px-6 py-3",
        "bg-primary text-primary-foreground font-medium",
        "transition-all duration-300",
        "hover:shadow-lg hover:shadow-primary/25",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
