import { notFound } from "next/navigation";
import { getProjectByIdAdmin } from "@/lib/admin-data";
import { ProjectForm } from "@/components/admin/projects/project-form";
import type { ProjectFormValues } from "@/lib/schemas";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectByIdAdmin(id);
  if (!project) notFound();

  const initial: ProjectFormValues = {
    slug: project.slug,
    title: project.title,
    description: project.description,
    longDescription: project.longDescription ?? { fr: "", en: "" },
    image: project.image,
    technologies: project.technologies,
    category: project.category,
    links: project.links ?? {},
    featured: project.featured,
    status: project.status,
    date: project.date,
    metrics: project.metrics ?? [],
    challenges: project.challenges ?? [],
  };

  return <ProjectForm mode="edit" projectId={project.id} initial={initial} />;
}
