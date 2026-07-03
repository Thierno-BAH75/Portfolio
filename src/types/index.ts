// ========================================
// Types - Portfolio Thierno BAH
// ========================================

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: ProjectCategory;
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  featured: boolean;
  date: string;
}

export type ProjectCategory =
  | "security"
  | "infrastructure"
  | "monitoring"
  | "automation"
  | "cloud"
  | "network";

export interface Skill {
  name: string;
  icon: string;
  level: number; // 0-100
  category: SkillCategory;
}

export type SkillCategory =
  | "security"
  | "network"
  | "systems"
  | "cloud"
  | "tools"
  | "scripting";

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: "fulltime" | "parttime" | "freelance" | "internship";
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  status?: "validated" | "ongoing" | "admitted";
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
