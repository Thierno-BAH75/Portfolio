import { Experience, Education, Certification, SocialLink, NavItem } from "@/types";

export const experiences: Experience[] = [
  {
    id: "0",
    title: {
      fr: "Technicien VIP Support & Migration Digital Workplace",
      en: "VIP Support Technician & Digital Workplace Migration",
    },
    company: "AXA (via Neurones IT)",
    location: "Nanterre, Île-de-France",
    type: "contract",
    startDate: "2026-01",
    endDate: "2026-06",
    current: false,
    description: {
      fr: "Support VIP et migration à grande échelle des postes de travail vers le Modern Virtual Desktop au sein d'un grand groupe d'assurance.",
      en: "VIP support and large-scale workstation migration to the Modern Virtual Desktop at a major insurance group.",
    },
    achievements: {
      fr: [
        "Accompagnement de +3 000 utilisateurs dans la migration MVD (Modern Virtual Desktop) : configuration Citrix Workspace, enrôlement MFA, sensibilisation aux nouveaux outils",
        "Rythme de 60 migrations/jour en équipe, sans interruption de service",
        "Coordination avec la DSI : gestion des comptes, configuration des accès, suivi des dossiers de migration dans les délais",
        "Support Helpdesk N1/N2 sur parc multi-OS (Windows, macOS, Android, iPad), ticketing Microsoft 365",
      ],
      en: [
        "Supported 3,000+ users through the MVD (Modern Virtual Desktop) migration: Citrix Workspace configuration, MFA enrollment, onboarding to the new tools",
        "Sustained a team pace of 60 migrations per day with no service interruption",
        "Coordinated with the IT department: account management, access configuration, on-time tracking of migration cases",
        "Delivered L1/L2 helpdesk support across a multi-OS fleet (Windows, macOS, Android, iPad) with Microsoft 365 ticketing",
      ],
    },
    impact: {
      fr: "Migration à grande échelle menée sans rupture de service pour les utilisateurs VIP",
      en: "Large-scale migration delivered with zero service disruption for VIP users",
    },
    technologies: ["Citrix", "MFA", "Microsoft 365", "Windows", "macOS"],
  },
  {
    id: "1",
    title: {
      fr: "Ingénieur Sécurité Réseau Système",
      en: "Network & Systems Security Engineer",
    },
    company: "KISS",
    companyLogo: "/logos/kiss.png",
    location: "Gentilly, Île-de-France",
    type: "apprenticeship",
    startDate: "2024-11",
    endDate: "2025-12",
    current: false,
    description: {
      fr: "Conception et déploiement d'infrastructures réseau sécurisées en environnement de production. Mise en place de solutions de supervision et d'optimisation des systèmes IT.",
      en: "Design and rollout of secure network infrastructures in a production environment. Implementation of monitoring solutions and IT systems optimization.",
    },
    achievements: {
      fr: [
        "Déploiement d'une infrastructure réseau de production : 1 salle serveur, 3 baies, ~10 serveurs Dell — installation, câblage et brassage complets",
        "Supervision centralisée Zabbix (SNMP) sur 100 % de l'infrastructure : ~10 alertes critiques, optimisation CPU/RAM/disque, MTTR réduit d'~30 %",
        "Architectures réseaux multi-sites haute disponibilité (LAN/WAN/VPN) pour les services KHosting : stacks de switchs, LAG",
        "Segmentation en 6+ VLANs avec routage inter-VLAN ; administration LAN, Wi-Fi et VPN",
        "Administration de 2 hyperviseurs (Proxmox, Hyper-V) : ~30 VM en exploitation, stockage RAID, hébergement de services internes critiques",
        "Bastion d'accès sécurisé Apache Guacamole : accès privilégiés (PAM) de 40+ VM sécurisés et tracés",
        "Impression sécurisée par badge NFC intégrée à l'Active Directory",
        "Configuration switchs, pare-feu, serveurs et NAS",
        "Automatisation des tâches courantes (Bash, PowerShell) : ~10 h/mois gagnées, erreurs manuelles éliminées",
        "Audits, PoC et maquettes d'infrastructure client (dont refonte complète pour Group BML, déployée en production), documentation technique exploitable",
      ],
      en: [
        "Deployed a production network infrastructure: 1 server room, 3 racks, ~10 Dell servers — full installation, cabling and patching",
        "Centralized Zabbix monitoring (SNMP) across 100% of the infrastructure: ~10 critical alerts, CPU/RAM/disk optimization, MTTR cut by ~30%",
        "Designed multi-site high-availability network architectures (LAN/WAN/VPN) for KHosting services: switch stacks, LAG",
        "Segmented the network into 6+ VLANs with inter-VLAN routing; LAN, Wi-Fi and VPN administration",
        "Administered 2 hypervisors (Proxmox, Hyper-V): ~30 VMs in operation, RAID storage, hosting business-critical internal services",
        "Deployed an Apache Guacamole secure access bastion: privileged access (PAM) to 40+ VMs secured and audited",
        "NFC badge-release secure printing integrated with Active Directory",
        "Configured switches, firewalls, servers and NAS",
        "Automated routine tasks (Bash, PowerShell): ~10 hours/month saved, manual errors eliminated",
        "Audits, PoCs and client infrastructure mock-ups (including a full redesign for Group BML, deployed to production), actionable technical documentation",
      ],
    },
    impact: {
      fr: "Infrastructure stable, sécurisée et évolutive, exploitée en production réelle — visibilité et réactivité incidents nettement améliorées",
      en: "A stable, secure and scalable infrastructure running in live production — significantly improved incident visibility and response",
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
    type: "apprenticeship",
    startDate: "2023-08",
    endDate: "2024-09",
    current: false,
    description: {
      fr: "Administration complète de l'infrastructure IT d'un établissement de santé. Gestion du support utilisateur, de la sécurité réseau et de la conformité RGPD.",
      en: "End-to-end administration of a healthcare facility's IT infrastructure. User support, network security and GDPR compliance.",
    },
    achievements: {
      fr: [
        "Audit et refonte du Wi-Fi hospitalier : reconfiguration et déploiement de 120+ bornes Aruba sur 3 bâtiments — couverture, stabilité et expérience utilisateur nettement améliorées",
        "Support N1 à N3 pour ~500 utilisateurs en environnement critique, sur site et à distance : 10+ tickets/jour (matériel, logiciels, OS, imprimantes, VPN)",
        "Administration Active Directory & Exchange (+1 000 comptes, 3 sites) : comptes, messageries, lecteurs réseau",
        "GPO d'automatisation et de durcissement de la sécurité des postes",
        "Administration des switchs Aruba et pare-feu Fortinet : VLANs, règles de filtrage, Web Filtering, VPN IPsec/SSL",
        "Gestion d'un parc de plusieurs centaines d'équipements : inventaire matériel et logiciel via Clarilog, prises en main à distance DameWare",
        "Déploiement SCCM sur 1 000+ actifs : création et maintenance d'images masters (Sysprep), standardisation et sécurité du parc",
        "Installation, câblage et organisation des équipements réseau en baies",
        "Virtualisation Hyper-V : création et exploitation de machines virtuelles",
        "Contribution à la migration de l'infrastructure vers un nouveau site : AD, switch cœur, bornes Aruba, pare-feu Fortinet, serveurs, NAS, onduleur, téléphonie DECT Mitel",
        "Téléphonie : création et gestion des lignes utilisateurs ; formations et accompagnement des équipes ; veille technologique et amélioration continue",
      ],
      en: [
        "Audited and overhauled the hospital Wi-Fi: reconfigured and deployed 120+ Aruba access points across 3 buildings — significantly improved coverage, stability and user experience",
        "Delivered L1–L3 support for ~500 users in a critical environment, on-site and remotely: 10+ tickets/day (hardware, software, OS, printers, VPN)",
        "Administered Active Directory & Exchange (1,000+ accounts, 3 sites): accounts, mailboxes, network drives",
        "Built GPOs for workstation automation and security hardening",
        "Administered Aruba switches and Fortinet firewalls: VLANs, filtering rules, web filtering, IPsec/SSL VPN",
        "Managed a fleet of several hundred devices: hardware and software inventory with Clarilog, remote support via DameWare",
        "Deployed SCCM across 1,000+ assets: master image creation and maintenance (Sysprep), fleet standardization and security",
        "Installed, cabled and organized network equipment in racks",
        "Hyper-V virtualization: created and operated virtual machines",
        "Contributed to the infrastructure migration to a new site: AD, core switch, Aruba access points, Fortinet firewalls, servers, NAS, UPS, Mitel DECT telephony",
        "Telephony: created and managed user lines; trained and supported staff; technology watch and continuous improvement",
      ],
    },
    impact: {
      fr: "Support fiable en environnement hospitalier critique — parc standardisé et maîtrisé, réseau et Wi-Fi optimisés pour la continuité de service",
      en: "Reliable support in a critical hospital environment — a standardized, well-controlled fleet, with network and Wi-Fi optimized for service continuity",
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
    location: "Aulnay-sous-Bois, Île-de-France",
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
        "Support Helpdesk N1 (3CX, Forms) : ~20 appels/jour pour un parc de +1 000 utilisateurs",
        "Déploiement de postes utilisateurs et configuration de l'infrastructure LAN : câblage, brassage, switchs, pare-feux",
        "Gestion des utilisateurs et messageries (Active Directory, Exchange)",
        "Diagnostic et résolution d'incidents (VPN, réseau, périphériques) : MCO du parc assuré",
      ],
      en: [
        "Provided L1 helpdesk support (3CX, Forms): ~20 calls/day for a fleet of 1,000+ users",
        "Deployed user workstations and configured the LAN infrastructure: cabling, patching, switches, firewalls",
        "Managed users and mailboxes (Active Directory, Exchange)",
        "Diagnosed and resolved incidents (VPN, network, peripherals), keeping the fleet in operational condition",
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
        "Installation et configuration de réseaux locaux : VLANs, switchs, pare-feu",
        "Administration et configuration de firewall pfSense",
        "Élaboration de procédures et formation des utilisateurs",
        "Projet opérateur : mise en place de tokens d'identification des numéros indésirables",
      ],
      en: [
        "Installed and configured local networks: VLANs, switches, firewalls",
        "Administered and configured pfSense firewalls",
        "Wrote procedures and trained users",
        "Carrier project: built a token-based system to identify unwanted phone numbers",
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
    level: {
      fr: "Bac+5",
      en: "Master's degree (5-yr)",
    },
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
    level: {
      fr: "Bac+4 — validé",
      en: "4-yr degree — completed",
    },
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
    level: {
      fr: "Bac+3",
      en: "Bachelor's degree",
    },
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
    level: {
      fr: "Bac+2",
      en: "2-yr technical degree",
    },
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
  { label: { fr: "Certifications", en: "Certifications" }, href: "/certifications" },
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
  phone: "07 83 70 96 40",
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
