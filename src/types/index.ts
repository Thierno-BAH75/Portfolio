// ========================================
// Types - Portfolio Thierno BAH
// ========================================

// i18n : tout champ traduisible porte les deux langues —
// oublier une traduction est une erreur de compilation.
export type Locale = "fr" | "en";
export type Localized<T = string> = Record<Locale, T>;

export interface ProjectMetric {
  icon: string;    // nom d'icône Lucide
  value: string;
  label: Localized;
}

export interface ProjectChallenge {
  title: Localized;
  problem: Localized;
  solution: Localized;
}

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
  metrics?: ProjectMetric[];
  challenges?: ProjectChallenge[];
  architectureDiagram?: string; // chemin SVG
}

export type ProjectCategory =
  | "security"
  | "infrastructure"
  | "monitoring"
  | "automation"
  | "cloud"
  | "network";

export interface Skill {
  // Localized pour les rares noms qui changent selon la langue (ex. RGPD/GDPR)
  name: string | Localized;
  icon: string;
  category: SkillCategory;
  // Preuves choisies en admin (jamais déduites automatiquement) :
  // expérience qui atteste de la compétence et/ou certification qui la valide
  proofExperienceId?: string;
  isCertified?: boolean;
  relatedCertificationId?: string;
  // Affichée dans la sous-section "En cours d'apprentissage", hors grille
  // des compétences maîtrisées
  isLearning?: boolean;
  updatedAt?: string;
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
  type: "fulltime" | "parttime" | "freelance" | "internship" | "apprenticeship" | "contract";
  startDate: string;
  endDate?: string;
  current: boolean;
  description: Localized;
  achievements: Localized<string[]>;
  impact?: Localized; // ligne de résultat affichée en bas de carte (zone dépliée)
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
  level?: Localized; // niveau de diplôme (ex. Bac+5)
}

export interface Certification {
  // Absent des données statiques de secours (générées sans base) — présent
  // dès que la certification vient de Supabase
  id?: string;
  name: Localized;
  issuer: string;
  date: string;
  expiry?: string;
  icon: string;
  pdfUrl?: string;
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
