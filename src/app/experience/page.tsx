import { Metadata } from "next";
import { Experience } from "@/components/sections";
import { FadeIn } from "@/components/animations";
import { education, certifications } from "@/data/experience";
import { Award, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Expérience",
  description:
    "Mon parcours professionnel et académique en tant qu'Ingénieur Sécurité Réseau & Système. Expériences en cybersécurité, infrastructure et administration système.",
};

export default function ExperiencePage() {
  return (
    <div className="pt-16 sm:pt-20 pb-16 sm:pb-20">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 pt-8 sm:pt-12">
          <FadeIn>
            <span className="text-primary font-medium text-sm sm:text-base">Parcours</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">
              Mon <span className="gradient-text">expérience</span>
            </h1>
            <p className="text-muted-foreground mt-3 sm:mt-4 text-sm sm:text-base px-4">
              Découvrez mon parcours professionnel en cybersécurité et les
              entreprises avec lesquelles j&apos;ai collaboré.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Experience Timeline */}
      <Experience />

      {/* Education Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <FadeIn>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <GraduationCap size={24} />
              </div>
              <span className="text-primary font-medium text-sm sm:text-base block">Formation</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
                Mon parcours <span className="gradient-text">académique</span>
              </h2>
            </FadeIn>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
            {education.map((edu, index) => (
              <FadeIn key={edu.id} delay={index * 0.1}>
                <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                    <h3 className="text-lg sm:text-xl font-semibold">{edu.degree}</h3>
                    <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p className="text-primary font-medium text-sm sm:text-base">{edu.school}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{edu.location}</p>
                  {edu.description && (
                    <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
                      {edu.description}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <FadeIn>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Award size={24} />
              </div>
              <span className="text-primary font-medium text-sm sm:text-base block">Certifications</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
                Mes <span className="gradient-text">certifications</span>
              </h2>
            </FadeIn>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {certifications.map((cert, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <div className="bg-card border border-border rounded-xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Award size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{cert.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                      {cert.date}
                      {cert.expiry && ` - Expire: ${cert.expiry}`}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
