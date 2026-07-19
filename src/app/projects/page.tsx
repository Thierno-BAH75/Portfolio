import type { Metadata } from "next";
import { getProjects } from "@/lib/data";
import { ProjectsPageClient } from "./projects-page-client";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Réalisations en sécurité réseau, infrastructure et supervision : datacenter, Zabbix, SIEM Security Onion, Wi-Fi hospitalier, DevSecOps et plus.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsPageClient projects={projects} />;
}
