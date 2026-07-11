import { getAllEducationAdmin } from "@/lib/admin-data";
import { EducationList } from "@/components/admin/education/education-list";

export default async function AdminEducationPage() {
  const items = await getAllEducationAdmin();
  return <EducationList items={items} />;
}
