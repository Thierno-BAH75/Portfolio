"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

// Le badge "Disponible" du header s'abonne aux UPDATE de personal_info
// (Realtime activé en Phase 3) pour refléter un changement de disponibilité
// fait depuis /admin/settings sans attendre un rechargement de page.
// Le cache Next.js (updateTag) reste la source de vérité au prochain rendu
// serveur ; ceci n'est qu'un raffinement visuel côté client.
export function useRealtimeAvailability(initialAvailable: boolean): boolean {
  const [available, setAvailable] = useState(initialAvailable);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const channel = supabase
      .channel("personal_info_availability")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "personal_info", filter: "id=eq.1" },
        (payload) => {
          const row = payload.new as { available?: boolean };
          if (typeof row.available === "boolean") setAvailable(row.available);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return available;
}
