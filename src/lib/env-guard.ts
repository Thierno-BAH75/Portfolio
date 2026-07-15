// Garde-fou de démarrage : détecte les deux corruptions déjà rencontrées sur
// .env.local — une variable requise manquante/vide, et une valeur contaminée
// par le nom d'une autre variable (signature d'une fusion accidentelle de
// deux lignes, ex. GROQ_API_KEY dont la valeur contient "MISTRAL_API_KEY=...").
// Appelé une seule fois au démarrage du serveur via src/instrumentation.ts.

const REQUIRED = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

const AI_PROVIDER_KEYS = ["GEMINI_API_KEY", "GROQ_API_KEY", "MISTRAL_API_KEY"] as const;

const OPTIONAL = ["NEXT_PUBLIC_FORMSPREE_ENDPOINT"] as const;

const ALL_EXPECTED = [...REQUIRED, ...AI_PROVIDER_KEYS, ...OPTIONAL];

export function validateEnv(): void {
  const missingRequired = REQUIRED.filter((name) => !process.env[name]?.trim());
  const missingAi = AI_PROVIDER_KEYS.filter((name) => !process.env[name]?.trim());
  const missingOptional = OPTIONAL.filter((name) => !process.env[name]?.trim());

  const contaminated: string[] = [];
  for (const name of ALL_EXPECTED) {
    const value = process.env[name];
    if (!value) continue;
    for (const other of ALL_EXPECTED) {
      if (other === name) continue;
      if (value.includes(`${other}=`)) contaminated.push(`${name} contient "${other}="`);
    }
  }

  if (contaminated.length > 0) {
    throw new Error(
      `[env-guard] .env.local corrompu — des lignes semblent fusionnées :\n` +
        contaminated.map((c) => `  - ${c}`).join("\n") +
        `\nCorrigez .env.local (chaque variable doit être sur sa propre ligne) puis redémarrez.`
    );
  }

  if (missingRequired.length > 0) {
    throw new Error(
      `[env-guard] Variable(s) requise(s) absente(s) ou vide(s) dans .env.local : ${missingRequired.join(", ")}. ` +
        `L'application ne peut pas fonctionner sans Supabase — voir .env.example.`
    );
  }

  if (missingAi.length === AI_PROVIDER_KEYS.length) {
    throw new Error(
      `[env-guard] Aucune clé fournisseur IA n'est définie (${AI_PROVIDER_KEYS.join(", ")}) — ` +
        `l'assistant chat sera systématiquement indisponible. Voir .env.example.`
    );
  } else if (missingAi.length > 0) {
    console.warn(
      `[env-guard] Clé(s) fournisseur IA absente(s) : ${missingAi.join(", ")} — ` +
        `la chaîne de bascule continuera avec les fournisseurs restants.`
    );
  }

  if (missingOptional.length > 0) {
    console.warn(`[env-guard] Variable(s) optionnelle(s) absente(s) : ${missingOptional.join(", ")}.`);
  }
}
