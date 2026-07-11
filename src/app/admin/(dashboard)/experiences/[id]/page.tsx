import { notFound } from "next/navigation";
import { getExperienceByIdAdmin } from "@/lib/admin-data";
import { ExperienceForm } from "@/components/admin/experiences/experience-form";
import type { ExperienceFormValues } from "@/lib/schemas";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await getExperienceByIdAdmin(id);
  if (!experience) notFound();

  const initial: ExperienceFormValues = {
    title: experience.title,
    company: experience.company,
    companyLogo: experience.companyLogo ?? "",
    location: experience.location,
    type: experience.type,
    startDate: experience.startDate,
    endDate: experience.endDate ?? "",
    current: experience.current,
    description: experience.description,
    achievements: experience.achievements,
    impact: experience.impact ?? { fr: "", en: "" },
    technologies: experience.technologies,
    displayOrder: experience.displayOrder,
  };

  return <ExperienceForm mode="edit" experienceId={experience.id} initial={initial} />;
}
