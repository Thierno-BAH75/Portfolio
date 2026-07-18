import { getPersonalInfoAdmin } from "@/lib/admin-data";
import { PersonalInfoForm } from "@/components/admin/settings/personal-info-form";
import type { PersonalInfoFormValues } from "@/lib/schemas";
import { DEFAULT_ACCENT_COLOR_1, DEFAULT_ACCENT_COLOR_2 } from "@/lib/data";

export default async function AdminSettingsPage() {
  const info = await getPersonalInfoAdmin();

  const initial: PersonalInfoFormValues = {
    name: info?.name ?? "",
    title: info?.title ?? { fr: "", en: "" },
    tagline: info?.tagline ?? { fr: "", en: "" },
    email: info?.email ?? "",
    phone: info?.phone ?? "",
    location: info?.location ?? { fr: "", en: "" },
    available: info?.available ?? true,
    seeking: info?.seeking ?? { fr: "", en: "" },
    github: info?.github ?? "",
    linkedin: info?.linkedin ?? "",
    accentColor1: info?.accentColor1 ?? DEFAULT_ACCENT_COLOR_1,
    accentColor2: info?.accentColor2 ?? DEFAULT_ACCENT_COLOR_2,
  };

  return <PersonalInfoForm initial={initial} cvUrl={info?.cvUrl} />;
}
