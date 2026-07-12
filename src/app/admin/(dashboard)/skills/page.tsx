import { getAllSkillsAdmin, getAllExperiencesAdmin, getAllCertificationsAdmin } from "@/lib/admin-data";
import { SkillsManager, type ProofOption } from "@/components/admin/skills/skills-manager";

export default async function AdminSkillsPage() {
  const [skills, experiences, certifications] = await Promise.all([
    getAllSkillsAdmin(),
    getAllExperiencesAdmin(),
    getAllCertificationsAdmin(),
  ]);

  const experienceOptions: ProofOption[] = experiences.map((exp) => ({
    id: exp.id,
    label: `${exp.company} — ${exp.title.fr}`,
  }));
  const certificationOptions: ProofOption[] = certifications.map((cert) => ({
    id: cert.id,
    label: `${cert.name.fr} (${cert.issuer})`,
  }));

  return (
    <SkillsManager
      skills={skills}
      experiences={experienceOptions}
      certifications={certificationOptions}
    />
  );
}
