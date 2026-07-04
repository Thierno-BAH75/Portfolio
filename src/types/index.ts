// ========================================
// Types - Portfolio Thierno BAH
// ========================================

// i18n : tout champ traduisible porte les deux langues —
// oublier une traduction est une erreur de compilation.
export type Locale = "fr" | "en";
export type Localized<T = string> = Record<Locale, T>;

export interface Project {
  id: string;
  slug: string;
  title: Localized;
  description: Localized;
  longDescription?: Localized;
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
  title: Localized;
  company: string;
  companyLogo?: string;
  location: string;
  type: "fulltime" | "parttime" | "freelance" | "internship";
  startDate: string;
  endDate?: string;
  current: boolean;
  description: Localized;
  achievements: Localized<string[]>;
  technologies: string[];
}

export interface Education {
  id: string;
  degree: Localized;
  school: string;
  location?: string;
  startDate: string;
  endDate: string;
  description?: Localized;
  status?: "validated" | "ongoing" | "admitted";
  note?: Localized; // mise en avant (ex. recherche d'alternance)
}

export interface Certification {
  name: Localized;
  issuer: string;
  date: string;
  expiry?: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: Localized;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
