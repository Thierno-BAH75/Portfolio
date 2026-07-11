import { getAllExperiencesAdmin } from "@/lib/admin-data";
import { ExperiencesList } from "@/components/admin/experiences/experiences-list";

export default async function AdminExperiencesPage() {
  const experiences = await getAllExperiencesAdmin();
  return <ExperiencesList experiences={experiences} />;
}
