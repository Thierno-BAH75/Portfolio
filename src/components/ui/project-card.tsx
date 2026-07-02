"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Project } from "@/types";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="group relative"
    >
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden",
          "bg-card border border-border",
          "transition-all duration-500",
          "hover:border-primary/50",
          "hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)]"
        )}
      >
        {/* Image container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
          {/* Placeholder or actual image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold text-primary/20 group-hover:scale-110 transition-transform duration-500">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>

          {/* Overlay gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 0.9 : 0.6 }}
          />

          {/* Floating badges on image */}
          <div className="absolute top-4 left-4 z-10">
            <Badge
              variant="default"
              className="bg-primary/90 backdrop-blur-sm text-xs"
            >
              {project.category}
            </Badge>
          </div>

          {/* Quick action buttons */}
          <motion.div
            className="absolute top-4 right-4 flex gap-2 z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={16} />
              </motion.a>
            )}
            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </motion.div>

          {/* Bottom content on image */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/10"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs px-2 py-1 text-white/70">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title with arrow */}
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-2"
          >
            <h3 className="text-xl font-semibold group-hover/link:text-primary transition-colors">
              {project.title}
            </h3>
            <motion.span
              className="text-primary"
              initial={{ x: 0, y: 0 }}
              whileHover={{ x: 4, y: -4 }}
            >
              <ArrowUpRight size={20} />
            </motion.span>
          </Link>

          {/* Description */}
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.1) 55%, transparent 60%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: isHovered ? ["200% 0%", "-200% 0%"] : "200% 0%",
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

// Featured project card - larger and more detailed
interface FeaturedProjectCardProps {
  project: Project;
  reversed?: boolean;
}

export function FeaturedProjectCard({
  project,
  reversed = false,
}: FeaturedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "grid lg:grid-cols-2 gap-8 items-center",
        reversed && "lg:flex-row-reverse"
      )}
    >
      {/* Image side */}
      <motion.div
        className={cn(
          "relative aspect-video rounded-2xl overflow-hidden group",
          "bg-gradient-to-br from-primary/20 to-secondary/20",
          reversed && "lg:order-2"
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl font-bold text-primary/20">
            {project.title.slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Overlay with links */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {project.links.live && (
            <motion.a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white text-black font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={18} />
              Voir le site
            </motion.a>
          )}
          {project.links.github && (
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
              Code
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* Content side */}
      <div className={cn("space-y-4", reversed && "lg:order-1")}>
        <Badge>{project.category}</Badge>

        <h3 className="text-3xl font-bold">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-primary transition-colors"
          >
            {project.title}
          </Link>
        </h3>

        <p className="text-muted-foreground text-lg">{project.description}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm px-3 py-1.5 rounded-full bg-muted text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
