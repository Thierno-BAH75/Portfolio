"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import { ToolInput } from "./tool-ui";

const MAX_SAFE = 4294967295; // 2^32 - 1, gamme confortable pour des adresses/valeurs réseau

export function AddressConverter() {
  const { t } = useI18n();
  const [dec, setDec] = useState("42");
  const [bin, setBin] = useState((42).toString(2));
  const [hex, setHex] = useState((42).toString(16).toUpperCase());

  const fromDecimal = (v: string) => {
    setDec(v);
    if (v === "") {
      setBin("");
      setHex("");
      return;
    }
    const n = Number(v);
    if (Number.isInteger(n) && n >= 0 && n <= MAX_SAFE) {
      setBin(n.toString(2));
      setHex(n.toString(16).toUpperCase());
    }
  };

  const fromBinary = (v: string) => {
    setBin(v);
    if (v === "") {
      setDec("");
      setHex("");
      return;
    }
    if (/^[01]+$/.test(v)) {
      const n = parseInt(v, 2);
      if (n <= MAX_SAFE) {
        setDec(String(n));
        setHex(n.toString(16).toUpperCase());
      }
    }
  };

  const fromHex = (v: string) => {
    setHex(v);
    if (v === "") {
      setDec("");
      setBin("");
      return;
    }
    if (/^[0-9a-fA-F]+$/.test(v)) {
      const n = parseInt(v, 16);
      if (n <= MAX_SAFE) {
        setDec(String(n));
        setBin(n.toString(2));
      }
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{t.tools.addressConverter.intro}</p>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium mb-1">{t.tools.addressConverter.decimalLabel}</label>
          <ToolInput
            type="text"
            inputMode="numeric"
            value={dec}
            onChange={(e) => fromDecimal(e.target.value)}
            className="font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">{t.tools.addressConverter.binaryLabel}</label>
          <ToolInput
            type="text"
            inputMode="numeric"
            value={bin}
            onChange={(e) => fromBinary(e.target.value)}
            className="font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">{t.tools.addressConverter.hexLabel}</label>
          <ToolInput
            type="text"
            value={hex}
            onChange={(e) => fromHex(e.target.value)}
            className="font-mono"
          />
        </div>
      </div>
    </div>
  );
}
