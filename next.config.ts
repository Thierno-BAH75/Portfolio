import type { NextConfig } from "next";

// Hôte Supabase (REST + Storage + Realtime) — dérivé de l'URL publique pour
// que la CSP reste juste si le projet change.
const supabaseHost = new URL(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://udvhbqniecbopfxiijfq.supabase.co"
).host;

// CSP posée en Report-Only pour l'instant : le navigateur RAPPORTE les
// violations sans rien bloquer. Objectif = valider en conditions réelles
// (Three.js/WebGL, framer-motion, hydratation Next avec ses scripts inline,
// Realtime Supabase en WebSocket, POST Formspree) avant de passer un jour à
// une CSP bloquante. 'unsafe-inline'/'unsafe-eval' sont tolérés ici car Next
// injecte des scripts inline d'amorçage et Turbopack utilise eval en dev.
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://" + supabaseHost,
  "font-src 'self'",
  "connect-src 'self' https://" + supabaseHost + " wss://" + supabaseHost + " https://formspree.io",
  "form-action 'self' https://formspree.io",
  "frame-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // HSTS : ignoré par les navigateurs en HTTP (dev localhost), appliqué en
  // HTTPS (prod Vercel). 2 ans, sous-domaines inclus, éligible preload.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Coupe l'accès aux API sensibles du navigateur (aucune n'est utilisée).
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  // Retire l'en-tête "X-Powered-By: Next.js" (fuite mineure de techno).
  poweredByHeader: false,
  // Sous Turbopack, lucide-react (barrel export) n'était pas tree-shaké par
  // route : chaque page qui en importe au moins une icône embarquait les
  // ~1570 icônes de la lib entière (588 Ko x route). Réécrit chaque import
  // nommé vers son module d'icône individuel — même effet que si le code
  // avait été écrit `import X from "lucide-react/dist/esm/icons/x"`, sans
  // toucher aux imports réels du code.
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{ kebabCase member }}",
    },
  },
  images: {
    // Covers de projets en SVG (remplacés plus tard par de vraies captures
    // au même chemin) : SVG local, sandboxé sans script pour éviter tout XSS.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "udvhbqniecbopfxiijfq.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
