import type { SkillCategory } from "@/types";

export const skillCategoryLabels: Record<SkillCategory, string> = {
  security: "Sécurité",
  network: "Réseaux",
  systems: "Systèmes",
  cloud: "Cloud & DevSecOps",
  tools: "Supervision",
  scripting: "Scripting",
};

export const skillCategoryDefaultIcon: Record<SkillCategory, string> = {
  security: "shield",
  network: "network",
  systems: "server",
  cloud: "cloud",
  tools: "tool",
  scripting: "code",
};

export const skillCategoryOrder: SkillCategory[] = [
  "security",
  "network",
  "systems",
  "cloud",
  "tools",
  "scripting",
];
