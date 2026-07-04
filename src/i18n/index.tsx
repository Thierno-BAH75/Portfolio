"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
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

// Monté dans le layout racine : fait suivre la langue active à <html lang>
export function LanguageSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
