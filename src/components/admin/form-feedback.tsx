import { CheckCircle2, AlertCircle } from "lucide-react";

interface FormFeedbackProps {
  status: "success" | "error" | null;
  successMessage?: string;
  errorMessage?: string;
}

// Bandeau de retour après une action serveur — même emplacement et style
// sur tous les formulaires admin, pour une lecture immédiate du résultat.
export function FormFeedback({
  status,
  successMessage = "Enregistré avec succès.",
  errorMessage = "Une erreur est survenue.",
}: FormFeedbackProps) {
  if (!status) return null;

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-500">
        <CheckCircle2 size={16} className="flex-shrink-0" />
        <span>{successMessage}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
      <AlertCircle size={16} className="flex-shrink-0" />
      <span>{errorMessage}</span>
    </div>
  );
}
