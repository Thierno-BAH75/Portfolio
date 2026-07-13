"use client";

import { useState } from "react";
import { Code2 } from "lucide-react";
import { useI18n } from "@/i18n";
import { ToolTextarea } from "./tool-ui";

function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function fromBase64(b64: string): string {
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function Base64Codec() {
  const { t } = useI18n();
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [error, setError] = useState(false);

  const fromText = (v: string) => {
    setText(v);
    setError(false);
    setEncoded(v === "" ? "" : toBase64(v));
  };

  const fromEncoded = (v: string) => {
    setEncoded(v);
    if (v === "") {
      setText("");
      setError(false);
      return;
    }
    try {
      setText(fromBase64(v));
      setError(false);
    } catch {
      setError(true);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.base64Codec.intro}</p>

      <div>
        <label className="block text-xs font-medium mb-1">{t.tools.base64Codec.textLabel}</label>
        <ToolTextarea
          value={text}
          onChange={(e) => fromText(e.target.value)}
          placeholder={t.tools.base64Codec.textPlaceholder}
        />
      </div>

      <div className="flex justify-center text-muted-foreground">
        <Code2 size={16} />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">{t.tools.base64Codec.base64Label}</label>
        <ToolTextarea
          value={encoded}
          onChange={(e) => fromEncoded(e.target.value)}
          placeholder={t.tools.base64Codec.base64Placeholder}
        />
        {error && <p className="text-xs text-red-400 mt-1.5">{t.tools.base64Codec.invalidBase64}</p>}
      </div>
    </div>
  );
}
