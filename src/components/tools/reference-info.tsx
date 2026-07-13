import { Check } from "lucide-react";

// Bloc de contenu purement informatif, réutilisé par les fiches Burp Suite
// et Wireshark : liste à puces + paragraphe de contexte pro/formation
export function ReferenceInfo({
  useCases,
  context,
  useCasesLabel,
  contextLabel,
}: {
  useCases: string[];
  context: string;
  useCasesLabel: string;
  contextLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          {useCasesLabel}
        </p>
        <ul className="space-y-1.5">
          {useCases.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
              <Check size={13} className="text-cyan-400 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          {contextLabel}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">{context}</p>
      </div>
    </div>
  );
}
