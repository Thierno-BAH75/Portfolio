"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// `compact` : variante resserrée pour le cluster d'actions desktop (header),
// aligné sur le même esprit de compacité que la nav. Non utilisé côté
// tablette/mobile, qui garde la taille par défaut.
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const iconClass = compact ? "h-3.5 w-3.5" : "h-5 w-5";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn("relative", compact && "h-7 w-7")}
    >
      {mounted ? (
        <motion.div
          key={resolvedTheme}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Sun className={iconClass} />
          ) : (
            <Moon className={iconClass} />
          )}
        </motion.div>
      ) : (
        <span className={iconClass} />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
