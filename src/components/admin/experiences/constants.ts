import type { Experience } from "@/types";

export const experienceTypeLabels: Record<Experience["type"], string> = {
  fulltime: "CDI",
  parttime: "Temps partiel",
  freelance: "Freelance",
  internship: "Stage",
  apprenticeship: "Alternance",
  contract: "CDD",
};
