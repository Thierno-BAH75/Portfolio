// Fond de section léger et statique (grille de points + un glow d'angle),
// pensé pour rester nettement plus discret que Hero/À propos — pas
// d'animation, pas de superposition de glows, juste un repère visuel subtil
// entre les sections plates du site (Skills, Parcours, Projets, Contact).

type GlowPosition = "top-right" | "bottom-left" | "top-center" | "bottom-right";
type GlowVariant = "violet" | "cyan" | "dual";

const GLOW_ORIGIN: Record<GlowPosition, string> = {
  "top-right": "ellipse at top right",
  "bottom-left": "ellipse at bottom left",
  "top-center": "ellipse at 50% 0%",
  "bottom-right": "ellipse at bottom right",
};

const VIOLET = "139,92,246";
const CYAN = "6,182,212";

function glowBackground(position: GlowPosition, variant: GlowVariant): string {
  const origin = GLOW_ORIGIN[position];

  if (variant === "dual") {
    // Alternance douce violet → cyan, deux glows superposés et décalés
    return [
      `radial-gradient(ellipse at 42% 0%, rgba(${VIOLET},0.16) 0%, transparent 50%)`,
      `radial-gradient(ellipse at 58% 0%, rgba(${CYAN},0.13) 0%, transparent 50%)`,
    ].join(", ");
  }

  const color = variant === "violet" ? VIOLET : CYAN;
  return `radial-gradient(${origin}, rgba(${color},0.18) 0%, transparent 55%)`;
}

interface SectionBackgroundProps {
  glowPosition: GlowPosition;
  variant: GlowVariant;
  dotOpacity?: number;
}

export function SectionBackground({
  glowPosition,
  variant,
  dotOpacity = 0.2,
}: SectionBackgroundProps) {
  return (
    <>
      {/* Grille de points fine, commune aux 4 sections */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            `radial-gradient(circle, rgba(${VIOLET},0.22) 1px, transparent 1px), ` +
            `radial-gradient(circle, rgba(${CYAN},0.14) 1px, transparent 1px)`,
          backgroundSize: "32px 32px, 64px 64px",
          backgroundPosition: "0 0, 16px 16px",
          opacity: dotOpacity,
        }}
      />
      {/* Glow d'angle, unique et statique — variation par section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: glowBackground(glowPosition, variant) }}
      />
    </>
  );
}
