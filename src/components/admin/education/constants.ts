import type { Education } from "@/types";

export const educationStatusLabels: Record<NonNullable<Education["status"]>, string> = {
  validated: "Validé",
  ongoing: "En cours",
  admitted: "Admis",
};
