import { Experience, Education, SocialLink, NavItem } from "@/types";

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Ingénieur Sécurité Réseau Système",
    company: "KISS",
    companyLogo: "/logos/kiss.png",
    location: "Gentilly, Île-de-France",
    type: "fulltime",
    startDate: "2024-12",
    endDate: "2025-09",
    current: true,
    description:
      "Conception et déploiement d'infrastructures réseau sécurisées en environnement de production. Mise en place de solutions de supervision et d'optimisation des systèmes IT.",
    achievements: [
      "Architecture et déploiement d'une infrastructure réseau complète avec segmentation VLANs",
      "Mise en place d'une supervision centralisée Zabbix avec alertes en temps réel",
      "Déploiement d'un système d'impression sécurisé avec libération par badge NFC",
      "Configuration du routage inter-VLAN et sécurisation des flux réseau",
    ],
    technologies: ["Zabbix", "VLANs", "Active Directory", "VMware", "Sécurité Réseau"],
  },
  {
    id: "2",
    title: "Apprenti Administrateur Systèmes et Réseaux",
    company: "Hôpital Franco-Britannique",
    companyLogo: "/logos/hfb.png",
    location: "Levallois-Perret, Île-de-France",
    type: "fulltime",
    startDate: "2023-08",
    endDate: "2024-09",
    current: false,
    description:
      "Administration complète de l'infrastructure IT d'un établissement de santé. Gestion du support utilisateur, de la sécurité réseau et de la conformité RGPD.",
    achievements: [
      "Amélioration de la couverture Wi-Fi via configuration des bornes Aruba",
      "Mise en place de règles de filtrage sur pare-feu Fortigate",
      "Gestion Active Directory et Exchange pour 500+ utilisateurs",
      "Déploiement SCCM pour la gestion centralisée du parc informatique",
    ],
    technologies: ["Fortigate", "Active Directory", "SCCM", "Hyper-V", "Aruba", "Exchange"],
  },
  {
    id: "3",
    title: "Administrateur Réseau et Systèmes",
    company: "CORTECHS",
    location: "Les Pavillons-sous-Bois, Île-de-France",
    type: "internship",
    startDate: "2023-01",
    endDate: "2023-03",
    current: false,
    description:
      "Stage d'immersion en administration réseau et systèmes au sein d'une entreprise de services informatiques.",
    achievements: [
      "Installation et configuration de réseaux LAN avec switches et pare-feux",
      "Gestion des utilisateurs via Active Directory et Exchange",
      "Résolution d'incidents VPN, imprimantes et domaines",
    ],
    technologies: ["Active Directory", "Exchange", "LAN", "VPN", "Pare-feu"],
  },
  {
    id: "4",
    title: "Administrateur Réseau et Systèmes",
    company: "W3TEL",
    location: "Les Ulis, Île-de-France",
    type: "internship",
    startDate: "2022-05",
    endDate: "2022-07",
    current: false,
    description:
      "Stage chez un opérateur télécom, focus sur l'administration de pare-feux et le développement de solutions de sécurité.",
    achievements: [
      "Administration et configuration de pare-feux pfSense",
      "Création d'un système de tokens pour identifier les numéros indésirables",
    ],
    technologies: ["pfSense", "Shell Script", "Sécurité Télécom"],
  },
];

export const education: Education[] = [
  {
    id: "1",
    degree: "Master IRS option Cybersécurité",
    school: "UVSQ - Université de Versailles Saint-Quentin-en-Yvelines",
    location: "Versailles, France",
    startDate: "2025",
    endDate: "2026",
    description: "Ingénierie des Réseaux et Systèmes, spécialisation Cybersécurité.",
  },
  {
    id: "2",
    degree: "Mastère CARE - Cyber Administrateur des Réseaux d'Entreprises",
    school: "AFORP - Pôle Formation UIMM Île-de-France",
    location: "Issy-les-Moulineaux, France",
    startDate: "2024",
    endDate: "2025",
    description: "Administration Systèmes & Réseaux et Cybersécurité. Conception d'infrastructures sécurisées, gestion des identités et certificats.",
  },
  {
    id: "3",
    degree: "Licence Pro MRIT - Cybersécurité et DevOps",
    school: "Université Évry Paris-Saclay",
    location: "Évry, France",
    startDate: "2023",
    endDate: "2024",
    description: "Métiers des Réseaux Informatiques et Télécommunications. Virtualisation, conteneurisation, Cloud Security, DevSecOps.",
  },
  {
    id: "4",
    degree: "BTS SIO option SISR",
    school: "Lycée Parc de Vilgénis",
    location: "Massy, France",
    startDate: "2021",
    endDate: "2023",
    description: "Solutions d'Infrastructure, Systèmes et Réseaux. Certifications CISCO CCNAv7 et ANSSI MOOC.",
  },
];

export const certifications = [
  {
    name: "Administrateur Système, Réseau et Sécurité",
    issuer: "AFORP",
    date: "2025-12",
    icon: "shield",
  },
  {
    name: "CSNA - Certified Stormshield Network Administrator",
    issuer: "Stormshield",
    date: "2023-03",
    icon: "shield",
  },
  {
    name: "Cisco CCNA v7",
    issuer: "Cisco",
    date: "2023-03",
    expiry: "2026-03",
    icon: "network",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "2024-12",
    icon: "lock",
  },
  {
    name: "Introduction to IoT",
    issuer: "Cisco",
    date: "2025-03",
    icon: "cpu",
  },
  {
    name: "ANSSI MOOC SecNumAcadémie",
    issuer: "ANSSI",
    date: "2022-04",
    icon: "shield",
  },
  {
    name: "Certification PIX",
    issuer: "Pix",
    date: "2023-03",
    icon: "check",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Thierno-BAH75",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/thierno-abdoul-bah/",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:thierno-abdoul-bah@hotmail.com",
    icon: "mail",
  },
];

export const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "/projects" },
  { label: "Parcours", href: "/experience" },
  { label: "Veille", href: "/veille" },
  { label: "Form.", href: "/formations" },
  { label: "Outils", href: "/outils" },
  { label: "Contact", href: "/contact" },
];

export const personalInfo = {
  name: "Thierno BAH",
  title: "Ingénieur Sécurité Réseau & Système",
  tagline: "Ingénieur Systèmes & Réseaux (Bac+4 validé), 2 ans d'expérience en milieux critiques (hôpital, infogérance IT). Je conçois, administre et sécurise des infrastructures complexes. En recherche d'une alternance pour finaliser mon Master IRS.",
  email: "thierno-abdoul-bah@hotmail.com",
  location: "Paris et périphérie",
  available: true,
  seeking: "Disponible en alternance · Master IRS",
};
