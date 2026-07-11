"use client";

import { useRef, useState, useTransition } from "react";
import { Upload, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadProjectImage } from "@/lib/actions/uploads";

interface ProjectImageUploadProps {
  value: string;
  projectId?: string;
  onUploaded: (url: string) => void;
}

export function ProjectImageUpload({ value, projectId, onUploaded }: ProjectImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ status: "success" | "error"; message: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeedback(null);

    const formData = new FormData();
    formData.set("file", file);

    startTransition(async () => {
      const result = await uploadProjectImage(formData, projectId);
      if (!result.success) {
        setFeedback({ status: "error", message: result.error });
        return;
      }
      onUploaded(result.url);
      setFeedback({ status: "success", message: "Image mise à jour." });
      if (inputRef.current) inputRef.current.value = "";
    });
  };

  return (
    <div className="space-y-3">
      <div className="w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-border/60 bg-muted/30 flex items-center justify-center">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- aperçu admin, source dynamique (Storage ou statique)
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <ImageOff size={24} className="text-muted-foreground" />
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
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
        {isPending ? "Envoi…" : value ? "Remplacer l'image" : "Téléverser une image"}
      </Button>
      <p className="text-xs text-muted-foreground">PNG, JPG ou WebP, 2 Mo maximum.</p>

      {feedback && (
        <p className={`text-xs ${feedback.status === "success" ? "text-green-500" : "text-red-400"}`}>
          {feedback.message}
        </p>
      )}
    </div>
  );
}
