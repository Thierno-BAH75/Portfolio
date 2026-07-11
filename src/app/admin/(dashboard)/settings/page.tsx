import { getPersonalInfoAdmin } from "@/lib/admin-data";
import { PersonalInfoForm } from "@/components/admin/settings/personal-info-form";
import type { PersonalInfoFormValues } from "@/lib/schemas";

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
  };

  return <PersonalInfoForm initial={initial} cvUrl={info?.cvUrl} />;
}
