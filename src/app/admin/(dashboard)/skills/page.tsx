import { getAllSkillsAdmin } from "@/lib/admin-data";
import { SkillsManager } from "@/components/admin/skills/skills-manager";

export default async function AdminSkillsPage() {
  const skills = await getAllSkillsAdmin();
  return <SkillsManager skills={skills} />;
}
