"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/animations";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/experience";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section className="py-20 lg:py-32" id="experience">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <span className="text-primary font-medium">Parcours</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Mon expérience{" "}
              <span className="gradient-text">professionnelle</span>
            </h2>
            <p className="text-muted-foreground mt-4">
              Mon parcours professionnel et les entreprises avec lesquelles
              j&apos;ai eu le plaisir de collaborer.
            </p>
          </FadeIn>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {experiences.map((exp, index) => (
            <FadeIn
              key={exp.id}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={index * 0.1}
            >
              <motion.div
                className={cn(
                  "relative pl-8 md:pl-0 pb-12 last:pb-0",
                  index % 2 === 0
                    ? "md:pr-[calc(50%+2rem)] md:text-right"
                    : "md:pl-[calc(50%+2rem)]"
                )}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <motion.div
                  className={cn(
                    "absolute top-0 w-4 h-4 rounded-full bg-primary border-4 border-background",
                    "left-0 md:left-1/2 md:-translate-x-1/2"
                  )}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                />

                {/* Card */}
                <motion.div
                  className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div
                    className={cn(
                      "flex flex-wrap items-center gap-2 mb-3",
                      index % 2 === 0 ? "md:justify-end" : ""
                    )}
                  >
                    {exp.current && (
                      <Badge variant="default" className="text-xs">
                        Actuel
                      </Badge>
                    )}
                    <Badge variant="ghost" className="text-xs">
                      {exp.type === "fulltime"
                        ? "CDI"
                        : exp.type === "parttime"
                        ? "Temps partiel"
                        : exp.type === "freelance"
                        ? "Freelance"
                        : "Stage"}
                    </Badge>
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>

                  {/* Meta */}
                  <div
                    className={cn(
                      "flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground",
                      index % 2 === 0 ? "md:justify-end" : ""
                    )}
                  >
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(exp.startDate)} -{" "}
                      {exp.current ? "Présent" : formatDate(exp.endDate!)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mt-4 text-sm">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  {exp.achievements.length > 0 && (
                    <ul
                      className={cn(
                        "mt-4 space-y-1 text-sm",
                        index % 2 === 0 ? "md:text-right" : ""
                      )}
                    >
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground flex items-start gap-2"
                          style={{
                            flexDirection:
                              index % 2 === 0 ? "row-reverse" : "row",
                          }}
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technologies */}
                  <div
                    className={cn(
                      "flex flex-wrap gap-2 mt-4",
                      index % 2 === 0 ? "md:justify-end" : ""
                    )}
                  >
                    {exp.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="text-xs px-2 py-1 bg-muted rounded-md"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: techIndex * 0.05 }}
                        whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
