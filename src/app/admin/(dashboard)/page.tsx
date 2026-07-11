import { FolderKanban, Briefcase, Wrench, Award, FileCheck2, FileClock, Eye, MessageSquare } from "lucide-react";
import { getAdminCounts, getTopViewedProjects, getChatLogsCountThisWeek } from "@/lib/admin-data";

export default async function AdminDashboardPage() {
  const [counts, topViewed, chatLogsThisWeek] = await Promise.all([
    getAdminCounts(),
    getTopViewedProjects(3),
    getChatLogsCountThisWeek(),
  ]);

  const stats = [
    {
      label: "Projets publiés",
      value: counts.projectsPublished,
      icon: FileCheck2,
      accent: "from-green-500/20 to-green-500/5 text-green-400 border-green-500/20",
    },
    {
      label: "Projets brouillons",
      value: counts.projectsDraft,
      icon: FileClock,
      accent: "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/20",
    },
    {
      label: "Expériences",
      value: counts.experiences,
      icon: Briefcase,
      accent: "from-violet-500/20 to-violet-500/5 text-violet-400 border-violet-500/20",
    },
    {
      label: "Compétences",
      value: counts.skills,
      icon: Wrench,
      accent: "from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/20",
    },
    {
      label: "Formations",
      value: counts.education,
      icon: FolderKanban,
      accent: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/20",
    },
    {
      label: "Certifications",
      value: counts.certifications,
      icon: Award,
      accent: "from-pink-500/20 to-pink-500/5 text-pink-400 border-pink-500/20",
    },
    {
      label: "Questions chatbot cette semaine",
      value: chatLogsThisWeek,
      icon: MessageSquare,
      accent: "from-teal-500/20 to-teal-500/5 text-teal-400 border-teal-500/20",
    },
  ];

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Vue d&apos;ensemble du contenu publié sur le portfolio.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-2xl border bg-card p-5 bg-gradient-to-br ${stat.accent}`}
            >
              <Icon size={20} className="mb-3" />
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Projets les plus vus
        </h2>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          {topViewed.map((project, index) => (
            <div key={project.id} className="flex items-center gap-3 px-4 py-3">
              <span className="text-xs font-mono text-muted-foreground w-4">{index + 1}</span>
              <span className="flex-1 text-sm truncate">{project.title.fr}</span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Eye size={12} /> {project.viewCount}
              </span>
            </div>
          ))}
          {topViewed.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">Aucune vue enregistrée pour l&apos;instant.</p>
          )}
        </div>
      </div>
    </div>
  );
}
