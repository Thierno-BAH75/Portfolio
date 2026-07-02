"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(latest);
    });
  }, [scrollYProgress]);

  return { scrollYProgress, progress };
}

export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
