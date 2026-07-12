import * as LucideIcons from "lucide-react";
import { Award, type LucideIcon } from "lucide-react";

// Les icônes de certification sont saisies en admin comme un nom Lucide libre
// (ex. "shield", "network") — on capitalise et on résout dynamiquement dans
// le set complet de lucide-react, avec repli sur Award si le nom est inconnu
// ou vide (badge générique plutôt qu'un rendu cassé).
export function resolveLucideIcon(name: string | undefined): LucideIcon {
  if (!name) return Award;
  const pascal = name.charAt(0).toUpperCase() + name.slice(1);
  const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[pascal];
  return icon ?? Award;
}
