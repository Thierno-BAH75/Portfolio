// Chaîne de fournisseurs LLM pour l'assistant IA — 4 niveaux de bascule :
// Gemini flash → Gemini flash-lite → Groq → Mistral. Chaque fournisseur
// expose la même interface (systemPrompt + historique → texte de réponse +
// nom exact du modèle ayant répondu) ; l'appelant (src/app/api/chat/route.ts)
// essaie chacun dans l'ordre et passe au suivant à la moindre erreur. Fetch
// natif uniquement, aucune clé ni appel ne quitte jamais le serveur.

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AiCallResult {
  reply: string;
  // Nom exact du modèle ayant produit la réponse, tel que rapporté par le
  // fournisseur lui-même (modelVersion pour Gemini, model pour Groq/Mistral)
  // — jamais juste l'alias envoyé en entrée, qui peut être résolu vers une
  // version différente côté fournisseur.
  model: string;
}

export interface AiProvider {
  name: string;
  // Lève une erreur (message clair) en cas d'échec — l'appelant décide de
  // logger et d'essayer le fournisseur suivant.
  call: (systemPrompt: string, history: ChatMessage[]) => Promise<AiCallResult>;
}

const TIMEOUT_MS = 10_000;
// Légère hausse depuis 0.3 : un phrasé plus naturel et moins mécanique,
// tout en restant largement dans la zone factuelle (rien à voir avec la
// créativité libre d'une température élevée).
const TEMPERATURE = 0.45;
const MAX_TOKENS = 500;

// ── Gemini ───────────────────────────────────────────────────────────
const geminiUrl = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

async function callGeminiModel(
  model: string,
  systemPrompt: string,
  history: ChatMessage[]
): Promise<AiCallResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("clé GEMINI_API_KEY absente");

  const payload = JSON.stringify({
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: {
      maxOutputTokens: MAX_TOKENS,
      temperature: TEMPERATURE,
      // Sans ça, les modèles Gemini récents consomment le budget de tokens
      // en « réflexion » interne invisible avant même de produire la
      // réponse visible, tronquant les réponses en plein milieu de phrase.
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  const res = await fetch(`${geminiUrl(model)}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    body: payload,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`${model}: HTTP ${res.status} — ${detail.slice(0, 200)}`);
  }

  const data = await res.json();
  const reply: string | undefined = data?.candidates?.[0]?.content?.parts
    ?.map((p: { text?: string }) => p.text ?? "")
    .join("")
    .trim();

  if (!reply) {
    throw new Error(`${model}: réponse vide ou filtrée — ${JSON.stringify(data).slice(0, 200)}`);
  }

  // "modelVersion" est le nom exact renvoyé par l'API Gemini elle-même —
  // il peut différer de l'alias envoyé (ex. "gemini-flash-latest" résout
  // aujourd'hui vers "gemini-3.5-flash").
  const exactModel: string = data?.modelVersion ?? model;
  return { reply, model: exactModel };
}

// Niveau 1 : modèle standard, meilleure qualité de raisonnement, quota
// gratuit serré (~20 req/jour) — un seul essai, le niveau 2 sert de secours.
async function callGeminiFlash(systemPrompt: string, history: ChatMessage[]): Promise<AiCallResult> {
  return callGeminiModel("gemini-flash-latest", systemPrompt, history);
}

// Niveau 2 : variante "lite", quota gratuit nettement plus généreux. Deux
// alias essayés en interne : si les deux échouent, le niveau est considéré
// en échec et la chaîne passe à Groq.
const GEMINI_LITE_MODELS = ["gemini-flash-lite-latest", "gemini-3.1-flash-lite"];

async function callGeminiFlashLite(systemPrompt: string, history: ChatMessage[]): Promise<AiCallResult> {
  const errors: string[] = [];
  for (const model of GEMINI_LITE_MODELS) {
    try {
      return await callGeminiModel(model, systemPrompt, history);
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }
  throw new Error(errors.join(" | "));
}

// ── Fournisseurs OpenAI-compatibles (Groq, Mistral) ────────────────────
// Même format de requête/réponse chez les deux : on factorise l'appel.
interface OpenAiCompatibleConfig {
  envVar: string;
  url: string;
  model: string;
}

async function callOpenAiCompatible(
  { envVar, url, model }: OpenAiCompatibleConfig,
  systemPrompt: string,
  history: ChatMessage[]
): Promise<AiCallResult> {
  const apiKey = process.env[envVar];
  if (!apiKey) throw new Error(`clé ${envVar} absente`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        ...history.map((m) => ({ role: m.role, content: m.content })),
      ],
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} — ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  const reply: string | undefined = data?.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    throw new Error(`réponse vide ou malformée — ${JSON.stringify(data).slice(0, 300)}`);
  }

  // "model" dans la réponse est le nom exact utilisé côté fournisseur —
  // là aussi potentiellement différent de l'alias envoyé.
  const exactModel: string = data?.model ?? model;
  return { reply, model: exactModel };
}

// Llama 3.3 70B : modèle de production recommandé par Groq, disponible sur
// le tier gratuit, bon compromis qualité/vitesse pour ce cas d'usage.
const callGroq = (systemPrompt: string, history: ChatMessage[]) =>
  callOpenAiCompatible(
    {
      envVar: "GROQ_API_KEY",
      url: "https://api.groq.com/openai/v1/chat/completions",
      model: "llama-3.3-70b-versatile",
    },
    systemPrompt,
    history
  );

const callMistral = (systemPrompt: string, history: ChatMessage[]) =>
  callOpenAiCompatible(
    {
      envVar: "MISTRAL_API_KEY",
      url: "https://api.mistral.ai/v1/chat/completions",
      model: "mistral-small-latest",
    },
    systemPrompt,
    history
  );

// ── Chaîne de bascule ────────────────────────────────────────────────
// Ordre : Gemini flash (qualité max) → Gemini flash-lite (quota généreux)
// → Groq → Mistral (dernier filet). Un niveau en échec (réseau, timeout,
// HTTP 4xx/5xx — dont 429 quota —, réponse vide/malformée, clé absente)
// est loggé puis on passe au suivant.
export const AI_PROVIDERS: AiProvider[] = [
  { name: "gemini-flash", call: callGeminiFlash },
  { name: "gemini-flash-lite", call: callGeminiFlashLite },
  { name: "groq", call: callGroq },
  { name: "mistral", call: callMistral },
];

export async function generateReply(
  systemPrompt: string,
  history: ChatMessage[]
): Promise<{ reply: string; provider: string; model: string } | null> {
  for (const provider of AI_PROVIDERS) {
    try {
      const { reply, model } = await provider.call(systemPrompt, history);
      return { reply, provider: provider.name, model };
    } catch (err) {
      console.warn(
        `[api/chat] Fournisseur "${provider.name}" indisponible :`,
        err instanceof Error ? err.message : String(err)
      );
    }
  }
  return null;
}
