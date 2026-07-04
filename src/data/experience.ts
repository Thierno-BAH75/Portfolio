import { Experience, Education, Certification, SocialLink, NavItem } from "@/types";

export const experiences: Experience[] = [
  {
    id: "1",
    title: {
      fr: "Ingénieur Sécurité Réseau Système",
      en: "Network & Systems Security Engineer",
    },
    company: "KISS",
    companyLogo: "/logos/kiss.png",
    location: "Gentilly, Île-de-France",
    type: "fulltime",
    startDate: "2024-12",
    endDate: "2025-09",
    current: true,
    description: {
      fr: "Conception et déploiement d'infrastructures réseau sécurisées en environnement de production. Mise en place de solutions de supervision et d'optimisation des systèmes IT.",
      en: "Design and rollout of secure network infrastructures in a production environment. Implementation of monitoring solutions and IT systems optimization.",
    },
    achievements: {
      fr: [
        "Architecture et déploiement d'une infrastructure réseau complète avec segmentation VLANs",
        "Mise en place d'une supervision centralisée Zabbix avec alertes en temps réel",
        "Déploiement d'un système d'impression sécurisé avec libération par badge NFC",
        "Configuration du routage inter-VLAN et sécurisation des flux réseau",
      ],
      en: [
        "Architected and deployed a complete network infrastructure with VLAN segmentation",
        "Set up centralized Zabbix monitoring with real-time alerting",
        "Deployed a secure printing system with NFC badge release",
        "Configured inter-VLAN routing and hardened network traffic",
      ],
    },
    technologies: ["Zabbix", "VLANs", "Active Directory", "VMware", "Sécurité Réseau"],
  },
  {
    id: "2",
    title: {
      fr: "Apprenti Administrateur Systèmes et Réseaux",
      en: "Systems & Network Administrator (Apprenticeship)",
    },
    company: "Hôpital Franco-Britannique",
    companyLogo: "/logos/hfb.png",
    location: "Levallois-Perret, Île-de-France",
    type: "fulltime",
    startDate: "2023-08",
    endDate: "2024-09",
    current: false,
    description: {
      fr: "Administration complète de l'infrastructure IT d'un établissement de santé. Gestion du support utilisateur, de la sécurité réseau et de la conformité RGPD.",
      en: "End-to-end administration of a healthcare facility's IT infrastructure. User support, network security and GDPR compliance.",
    },
    achievements: {
      fr: [
        "Amélioration de la couverture Wi-Fi via configuration des bornes Aruba",
        "Mise en place de règles de filtrage sur pare-feu Fortigate",
        "Gestion Active Directory et Exchange pour 500+ utilisateurs",
        "Déploiement SCCM pour la gestion centralisée du parc informatique",
      ],
      en: [
        "Improved Wi-Fi coverage by reconfiguring Aruba access points",
        "Implemented filtering rules on Fortigate firewalls",
        "Managed Active Directory and Exchange for 500+ users",
        "Deployed SCCM for centralized endpoint management",
      ],
    },
    technologies: ["Fortigate", "Active Directory", "SCCM", "Hyper-V", "Aruba", "Exchange"],
  },
  {
    id: "3",
    title: {
      fr: "Administrateur Réseau et Systèmes",
      en: "Network & Systems Administrator",
    },
    company: "CORTECHS",
    location: "Les Pavillons-sous-Bois, Île-de-France",
    type: "internship",
    startDate: "2023-01",
    endDate: "2023-03",
    current: false,
    description: {
      fr: "Stage d'immersion en administration réseau et systèmes au sein d'une entreprise de services informatiques.",
      en: "Hands-on internship in network and systems administration at an IT services company.",
    },
    achievements: {
      fr: [
        "Installation et configuration de réseaux LAN avec switches et pare-feux",
        "Gestion des utilisateurs via Active Directory et Exchange",
        "Résolution d'incidents VPN, imprimantes et domaines",
      ],
      en: [
        "Installed and configured LAN networks with switches and firewalls",
        "Managed users through Active Directory and Exchange",
        "Resolved VPN, printing and domain incidents",
      ],
    },
    technologies: ["Active Directory", "Exchange", "LAN", "VPN", "Pare-feu"],
  },
  {
    id: "4",
    title: {
      fr: "Administrateur Réseau et Systèmes",
      en: "Network & Systems Administrator",
    },
    company: "W3TEL",
    location: "Les Ulis, Île-de-France",
    type: "internship",
    startDate: "2022-05",
    endDate: "2022-07",
    current: false,
    description: {
      fr: "Stage chez un opérateur télécom, focus sur l'administration de pare-feux et le développement de solutions de sécurité.",
      en: "Internship at a telecom operator, focused on firewall administration and building security solutions.",
    },
    achievements: {
      fr: [
        "Administration et configuration de pare-feux pfSense",
        "Création d'un système de tokens pour identifier les numéros indésirables",
      ],
      en: [
        "Administered and configured pfSense firewalls",
        "Built a token-based system to identify unwanted phone numbers",
      ],
    },
    technologies: ["pfSense", "Shell Script", "Sécurité Télécom"],
  },
];

export const education: Education[] = [
  {
    id: "5",
    degree: {
      fr: "Master 2 IRS option Cybersécurité",
      en: "Master's (M2) in Network & Systems Engineering — Cybersecurity track",
    },
    school: "Université Paris-Saclay — Groupe AFORP",
    startDate: "2026",
    endDate: "2027",
    description: {
      fr: "Ingénierie des Réseaux et Systèmes option Cybersécurité, en partenariat avec l'Université Paris-Saclay. Formation par apprentissage orientée sécurité des infrastructures, cyber-défense, audits, tests d'intrusion et gestion de crise.",
      en: "Network & Systems Engineering with a Cybersecurity specialization, in partnership with Université Paris-Saclay. Work-study program focused on infrastructure security, cyber defense, audits, penetration testing and crisis management.",
    },
    status: "admitted",
    note: {
      fr: "Recherche d'alternance · dès sept. 2026",
      en: "Seeking a work-study contract · from Sept 2026",
    },
  },
  {
    id: "1",
    degree: {
      fr: "Master IRS option Cybersécurité",
      en: "Master's in Network & Systems Engineering (IRS) — Cybersecurity track",
    },
    school: "UVSQ - Université de Versailles Saint-Quentin-en-Yvelines",
    location: "Versailles, France",
    startDate: "2025",
    endDate: "2026",
    description: {
      fr: "Ingénierie des Réseaux et Systèmes, spécialisation Cybersécurité.",
      en: "Network & Systems Engineering, specializing in Cybersecurity.",
    },
    status: "ongoing",
  },
  {
    id: "2",
    degree: {
      fr: "Mastère CARE - Cyber Administrateur des Réseaux d'Entreprises",
      en: "CARE Advanced Master's — Cyber Administrator of Enterprise Networks",
    },
    school: "AFORP - Pôle Formation UIMM Île-de-France",
    location: "Issy-les-Moulineaux, France",
    startDate: "2024",
    endDate: "2025",
    description: {
      fr: "Administration Systèmes & Réseaux et Cybersécurité. Conception d'infrastructures sécurisées, gestion des identités et certificats.",
      en: "Systems & Network Administration and Cybersecurity. Design of secure infrastructures, identity and certificate management.",
    },
    status: "validated",
  },
  {
    id: "3",
    degree: {
      fr: "Licence Pro MRIT - Cybersécurité et DevOps",
      en: "Professional Bachelor's in IT Networks & Telecom (MRIT) — Cybersecurity & DevOps",
    },
    school: "Université Évry Paris-Saclay",
    location: "Évry, France",
    startDate: "2023",
    endDate: "2024",
    description: {
      fr: "Métiers des Réseaux Informatiques et Télécommunications. Virtualisation, conteneurisation, Cloud Security, DevSecOps.",
      en: "IT Networks and Telecommunications. Virtualization, containerization, cloud security, DevSecOps.",
    },
    status: "validated",
  },
  {
    id: "4",
    degree: {
      fr: "BTS SIO option SISR",
      en: "BTS SIO — Infrastructure, Systems & Networks (SISR)",
    },
    school: "Lycée Parc de Vilgénis",
    location: "Massy, France",
    startDate: "2021",
    endDate: "2023",
    description: {
      fr: "Solutions d'Infrastructure, Systèmes et Réseaux. Certifications CISCO CCNAv7 et ANSSI MOOC.",
      en: "Infrastructure, Systems & Networks solutions. Cisco CCNAv7 and ANSSI MOOC certifications.",
    },
    status: "validated",
  },
];

export const certifications: Certification[] = [
  {
    name: {
      fr: "Administrateur Système, Réseau et Sécurité",
      en: "Systems, Network & Security Administrator",
    },
    issuer: "AFORP",
    date: "2025-12",
    icon: "shield",
  },
  {
    name: {
      fr: "CSNA - Certified Stormshield Network Administrator",
      en: "CSNA - Certified Stormshield Network Administrator",
    },
    issuer: "Stormshield",
    date: "2023-03",
    icon: "shield",
  },
  {
    name: {
      fr: "Cisco CCNA v7",
      en: "Cisco CCNA v7",
    },
    issuer: "Cisco",
    date: "2023-03",
    expiry: "2026-03",
    icon: "network",
  },
  {
    name: {
      fr: "Introduction to Cybersecurity",
      en: "Introduction to Cybersecurity",
    },
    issuer: "Cisco",
    date: "2024-12",
    icon: "lock",
  },
  {
    name: {
      fr: "Introduction to IoT",
      en: "Introduction to IoT",
    },
    issuer: "Cisco",
    date: "2025-03",
    icon: "cpu",
  },
  {
    name: {
      fr: "ANSSI MOOC SecNumAcadémie",
      en: "ANSSI MOOC SecNumAcadémie",
    },
    issuer: "ANSSI",
    date: "2022-04",
    icon: "shield",
  },
  {
    name: {
      fr: "Certification PIX",
      en: "PIX Certification",
    },
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

// Ancres en "/#id" (et non "#id") pour fonctionner depuis /veille ou /projects
export const navItems: NavItem[] = [
  { label: { fr: "Accueil", en: "Home" }, href: "/#accueil" },
  { label: { fr: "À propos", en: "About" }, href: "/#about" },
  { label: { fr: "Parcours", en: "Background" }, href: "/#experience" },
  { label: { fr: "Projets", en: "Projects" }, href: "/projects" },
  { label: { fr: "Veille", en: "Tech Watch" }, href: "/veille" },
  { label: { fr: "Contact", en: "Contact" }, href: "/#contact" },
];

export const personalInfo = {
  name: "Thierno BAH",
  title: {
    fr: "Ingénieur Sécurité Réseau & Système",
    en: "Network & Systems Security Engineer",
  },
  tagline: {
    fr: "Ingénieur Systèmes & Réseaux (Bac+4 validé), 2 ans d'expérience en milieux critiques (hôpital, infogérance IT). Je conçois, administre et sécurise des infrastructures complexes. En recherche d'une alternance pour finaliser mon Master IRS.",
    en: "Systems & Network Engineer (4-year degree completed), with 2 years of experience in critical environments (hospital, managed IT services). I design, administer and secure complex infrastructures. Seeking a work-study contract to complete my Master's in Network & Systems Engineering.",
  },
  email: "thierno-abdoul-bah@hotmail.com",
  location: {
    fr: "Paris et périphérie",
    en: "Paris area, France",
  },
  available: true,
  seeking: {
    fr: "Disponible en alternance · Master IRS",
    en: "Available for work-study · IRS Master's",
  },
};
