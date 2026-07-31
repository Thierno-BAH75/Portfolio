import {
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  CertificationsPreview,
  Contact,
} from "@/components/sections";
import {
  getPersonalInfo,
  getCertifications,
  getEducation,
  getExperiences,
  getSkills,
  getSkillsByCategory,
  getFeaturedProjects,
  getProjects,
} from "@/lib/data";

export default async function Home() {
  const [
    personalInfo,
    certifications,
    education,
    experiences,
    skills,
    skillsByCategory,
    featuredProjects,
    allProjects,
  ] = await Promise.all([
    getPersonalInfo(),
    getCertifications(),
    getEducation(),
    getExperiences(),
    getSkills(),
    getSkillsByCategory(),
    getFeaturedProjects(),
    getProjects(),
  ]);

  return (
    <>
      <Hero personalInfo={personalInfo} />
      <About personalInfo={personalInfo} certifications={certifications} />
      <Skills
        skills={skills}
        skillsByCategory={skillsByCategory}
        projectCount={allProjects.length}
        certificationCount={certifications.length}
        experiences={experiences}
        certifications={certifications}
        featuredProjects={featuredProjects}
        personalInfo={personalInfo}
      />
      <Experience education={education} experiences={experiences} />
      <CertificationsPreview certifications={certifications} />
      <Projects featuredProjects={featuredProjects} />
      <Contact personalInfo={personalInfo} />
    </>
  );
}
