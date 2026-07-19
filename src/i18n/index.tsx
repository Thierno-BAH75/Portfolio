"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import type { Locale, Localized } from "@/types";
import { dictionaries, type Dictionary } from "./dictionaries";

const STORAGE_KEY = "locale";
const CHANGE_EVENT = "app-locale-change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Locale {
  return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "fr";
}

// Le serveur rend toujours en français (langue par défaut)
function getServerSnapshot(): Locale {
  return "fr";
}

export function setLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Hook principal : locale active, dictionnaire typé, résolveur de contenu.
 *   const { locale, t, tx } = useI18n();
 *   t.hero.viewProjects          → libellé d'interface
 *   tx(project.title)            → champ de contenu Localized
 */
export function useI18n() {
  const locale = useLocale();

  const tx = useCallback(
    function tx<T>(localized: Localized<T>): T {
      return localized[locale];
    },
    [locale]
  );

  return { locale, t: dictionaries[locale] as Dictionary, tx };
}

// Routes statiques dont le titre d'onglet est traduit côté client. Les pages
// à titre dynamique (fiches projet) et l'admin sont volontairement absentes :
// leur <title> serveur reste inchangé.
const META_BY_PATH: Record<string, keyof Dictionary["meta"]> = {
  "/": "home",
  "/projects": "projects",
  "/certifications": "certifications",
  "/outils": "outils",
  "/veille": "veille",
};

// Monté dans le layout racine : fait suivre la langue active à <html lang>
// et au <title> (les metadata Next sont rendues serveur, toujours en FR —
// sans cette resynchro, l'onglet resterait français en mode EN).
export function LanguageSync() {
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = locale;
    const key = META_BY_PATH[pathname ?? ""];
    if (key) document.title = dictionaries[locale].meta[key];
  }, [locale, pathname]);

  return null;
}
