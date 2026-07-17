"use client";

import { Award } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

// Les icônes de certification sont saisies en admin comme un nom Lucide libre
// (ex. "shield", "network", éventuellement PascalCase ou espacé) — normalisé
// en kebab-case puis chargé À LA DEMANDE via DynamicIcon (un seul module par
// icône réellement utilisée, plutôt que d'embarquer les ~1570 icônes de la
// lib entière dans le bundle client comme le faisait l'ancien
// `import * as LucideIcons`). Repli sur Award pendant le bref chargement
// asynchrone et si le nom est inconnu ou vide (badge générique plutôt qu'un
// rendu cassé) — même comportement de repli qu'avant.
function toKebabCase(input: string): string {
  return input
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export function ResolvedIcon({
  name,
  size,
  className,
}: {
  name: string | undefined;
  size?: number;
  className?: string;
}) {
  if (!name) return <Award size={size} className={className} />;
  return (
    <DynamicIcon
      name={toKebabCase(name) as IconName}
      fallback={() => <Award size={size} className={className} />}
      size={size}
      className={className}
    />
  );
}
