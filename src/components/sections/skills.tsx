"use client";

import { motion } from "framer-motion";
import { Shield, Network, Server, Cloud, Wrench, Code, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HoverCard3D, StaggerChildren, StaggerItem } from "@/components/animations";
import { skillsByCategory } from "@/data/skills";

interface CategoryConfig {
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const categoryConfig: Record<string, CategoryConfig> = {
  security: {
    label: "Sécurité",
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  network: {
    label: "Réseaux",
    icon: Network,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  systems: {
    label: "Systèmes",
    icon: Server,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  cloud: {
    label: "Cloud & DevSecOps",
    icon: Cloud,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  tools: {
    label: "Supervision",
    icon: Wrench,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  scripting: {
    label: "Scripting",
    icon: Code,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
};

export function Skills() {
  return (
    <section className="py-16 sm:py-20 lg:py-32" id="skills">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Compétences
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Mon expertise{" "}
            <span className="gradient-text">technique</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Les technologies et outils que je maîtrise pour sécuriser
            et administrer vos infrastructures.
          </p>
        </motion.div>

        {/* Skills Grid - 2 colonnes avec animations */}
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          staggerDelay={0.1}
        >
          {Object.entries(skillsByCategory).map(([category, skills]) => {
            const config = categoryConfig[category];
            const Icon = config.icon;

            return (
              <StaggerItem key={category}>
                <HoverCard3D intensity={5}>
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-base font-semibold">
                        <motion.div
                          className={`p-2 rounded-lg ${config.bgColor}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Icon className={`w-4 h-4 ${config.color}`} />
                        </motion.div>
                        {config.label}
                        <Badge variant="secondary" className="ml-auto text-xs font-normal">
                          {skills.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: skillIndex * 0.05 }}
                            className="space-y-1.5 group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm group-hover:text-primary transition-colors">
                                {skill.name}
                              </span>
                              <span className="text-xs text-muted-foreground">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-1.5" />
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </HoverCard3D>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
