import { Metadata } from "next";
import { About, Skills, Experience } from "@/components/sections";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez mon parcours, mes compétences et mon expérience en tant que développeur Full Stack.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <About />
      <Skills />
      <Experience />
    </div>
  );
}
