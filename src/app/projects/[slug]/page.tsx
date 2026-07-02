import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations";
import { projects } from "@/data/projects";
import { formatDate } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-20 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <FadeIn>
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/projects">
              <ArrowLeft size={16} className="mr-2" />
              Retour aux projets
            </Link>
          </Button>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <FadeIn>
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge>{project.category}</Badge>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(project.date)}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                {project.title}
              </h1>

              <p className="text-xl text-muted-foreground">
                {project.description}
              </p>
            </div>
          </FadeIn>

          {/* Image */}
          <FadeIn delay={0.1}>
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl mb-8 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary/30">
                {project.title.slice(0, 2)}
              </span>
            </div>
          </FadeIn>

          {/* Links */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-4 mb-12">
              {project.links.live && (
                <Button variant="glow" asChild>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Voir le site
                  </a>
                </Button>
              )}
              {project.links.github && (
                <Button variant="outline" asChild>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} className="mr-2" />
                    Code source
                  </a>
                </Button>
              )}
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.3}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>À propos du projet</h2>
              <p>
                {project.longDescription ||
                  `${project.description} Ce projet démontre mes compétences en développement web moderne et mon attention aux détails dans la création d'interfaces utilisateur.`}
              </p>

              <h2>Technologies utilisées</h2>
              <div className="flex flex-wrap gap-2 not-prose">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-muted rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h2>Défis et solutions</h2>
              <p>
                Ce projet m&apos;a permis de relever plusieurs défis techniques
                intéressants, notamment en matière de performance, d&apos;expérience
                utilisateur et d&apos;architecture logicielle.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
