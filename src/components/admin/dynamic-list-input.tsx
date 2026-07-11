"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DynamicListInputProps {
  value: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

// Liste de champs texte ajouter/retirer — utilisée pour achievements
// (points clés d'une expérience), un par ligne, fr et en séparément.
export function DynamicListInput({ value, onChange, placeholder }: DynamicListInputProps) {
  const items = value.length > 0 ? value : [""];

  const update = (index: number, text: string) => {
    const next = [...items];
    next[index] = text;
    onChange(next);
  };

  const remove = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    onChange(next.length > 0 ? next : [""]);
  };

  const add = () => onChange([...items, ""]);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={item}
            onChange={(e) => update(index, e.target.value)}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            disabled={items.length === 1}
            className="flex-shrink-0 p-2 rounded-lg text-muted-foreground hover:text-red-400 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={add}>
        <Plus size={14} />
        Ajouter un point
      </Button>
    </div>
  );
}
