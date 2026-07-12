import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Certification } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Tri explicite par date d'obtention décroissante (format "AAAA-MM", donc
// comparable en chaîne) — ne se fie jamais à display_order, qui peut être
// incohérent avec la chronologie réelle.
export function sortCertificationsByDate(certifications: Certification[]): Certification[] {
  return [...certifications].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(
  date: Date | string,
  locale: "fr" | "en" = "fr"
): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "fr-FR", {
    year: "numeric",
    month: "long",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
