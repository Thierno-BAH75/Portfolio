import { notFound } from "next/navigation";
import { getEducationByIdAdmin } from "@/lib/admin-data";
import { EducationForm } from "@/components/admin/education/education-form";
import type { EducationFormValues } from "@/lib/schemas";

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const education = await getEducationByIdAdmin(id);
  if (!education) notFound();

  const initial: EducationFormValues = {
    degree: education.degree,
    school: education.school,
    location: education.location ?? "",
    startDate: education.startDate,
    endDate: education.endDate,
    description: education.description ?? { fr: "", en: "" },
    status: education.status,
    note: education.note ?? { fr: "", en: "" },
    level: education.level ?? { fr: "", en: "" },
    displayOrder: education.displayOrder,
  };

  return <EducationForm mode="edit" educationId={education.id} initial={initial} />;
}
