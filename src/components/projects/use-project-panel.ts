"use client";

import { useCallback, useRef, useState } from "react";
import type { Project } from "@/types";

// Panneau latéral partagé (home + /projects) : garde le trigger (carte)
// pour lui rendre le focus à la fermeture.
export function useProjectPanel() {
  const [project, setProject] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((next: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setProject(next);
  }, []);

  const close = useCallback(() => {
    setProject(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  return { project, open, close };
}
