import { getAllProjectsAdmin } from "@/lib/admin-data";
import { ProjectsList } from "@/components/admin/projects/projects-list";

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();
  return <ProjectsList projects={projects} />;
}
