import { FolderKanban, Briefcase, Wrench, Award, FileCheck2, FileClock } from "lucide-react";
import { getAdminCounts } from "@/lib/admin-data";

export default async function AdminDashboardPage() {
  const counts = await getAdminCounts();

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
    </div>
  );
}
