"use client";

import { useI18n } from "@/i18n";
import { ReferenceInfo } from "./reference-info";

export function WiresharkReference() {
  const { t } = useI18n();
  const info = t.tools.wiresharkReference;

  return (
    <ReferenceInfo
      useCases={info.useCases}
      context={info.context}
      useCasesLabel={t.tools.common.useCasesLabel}
      contextLabel={t.tools.common.contextLabel}
    />
  );
}
