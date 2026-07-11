"use client";

import { useRef, useState, useTransition } from "react";
import { FileText, Upload, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadCv } from "@/lib/actions/uploads";

function filenameFromUrl(url: string): string {
  try {
    const decoded = decodeURIComponent(url);
    const parts = decoded.split("/");
    // Le nom stocké est préfixé d'un timestamp ("1730000000000-cv.pdf") —
    // on ne garde que la partie lisible pour l'affichage.
    return parts[parts.length - 1].replace(/^\d+-/, "");
  } catch {
    return url;
  }
}

export function CvUpload({ initialUrl }: { initialUrl?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [url, setUrl] = useState(initialUrl);
  const [feedback, setFeedback] = useState<{ status: "success" | "error"; message: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeedback(null);

    const formData = new FormData();
    formData.set("file", file);

    startTransition(async () => {
      const result = await uploadCv(formData);
      if (!result.success) {
        setFeedback({ status: "error", message: result.error });
        return;
      }
      setUrl(result.url);
      setFeedback({ status: "success", message: "CV mis à jour." });
      if (inputRef.current) inputRef.current.value = "";
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 bg-background text-sm min-w-0">
          <FileText size={15} className="text-muted-foreground flex-shrink-0" />
          <span className="truncate max-w-[220px]">
            {url ? filenameFromUrl(url) : "Aucun CV téléversé"}
          </span>
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline"
          >
            Voir <ExternalLink size={12} />
          </a>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() => inputRef.current?.click()}
      >
        <Upload size={14} />
        {isPending ? "Envoi…" : url ? "Remplacer le CV" : "Téléverser un CV"}
      </Button>
      <p className="text-xs text-muted-foreground">PDF uniquement, 5 Mo maximum.</p>

      {feedback && (
        <p className={`text-xs ${feedback.status === "success" ? "text-green-500" : "text-red-400"}`}>
          {feedback.message}
        </p>
      )}
    </div>
  );
}
