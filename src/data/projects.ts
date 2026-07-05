import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "infrastructure-reseau-kiss",
    title: {
      fr: "Infrastructure Réseau & Datacenter — KISS",
      en: "Network Infrastructure & Datacenter — KISS",
    },
    description: {
      fr: "Dans le cadre de l'extension des services d'une ESN, conception et déploiement d'un datacenter interne dédié à l'hébergement de clients stratégiques. Mise en œuvre d'une infrastructure sécurisée et scalable incluant câblage structuré, segmentation VLAN, pare-feu pfSense et intégration de serveurs Dell (RAID 10, iDRAC) sous Proxmox et Hyper-V. Cette architecture 10Gb hautement disponible assure fiabilité, performance et continuité de service pour des environnements critiques, notamment Foncia.",
      en: "As part of an IT services company's expansion, designed and deployed an in-house datacenter dedicated to hosting strategic clients. Delivered a secure, scalable infrastructure including structured cabling, VLAN segmentation, pfSense firewalls and Dell server integration (RAID 10, iDRAC) running Proxmox and Hyper-V. This highly available 10Gb architecture ensures reliability, performance and service continuity for critical environments, notably Foncia.",
    },
    longDescription: {
      fr: "Dans le cadre de l'extension des services d'une ESN, conception et déploiement d'un datacenter interne dédié à l'hébergement de clients stratégiques. Mise en œuvre d'une infrastructure sécurisée et scalable incluant câblage structuré, segmentation VLAN, pare-feu pfSense et intégration de serveurs Dell (RAID 10, iDRAC) sous Proxmox et Hyper-V. Cette architecture 10Gb hautement disponible assure fiabilité, performance et continuité de service pour des environnements critiques, notamment Foncia.",
      en: "As part of an IT services company's expansion, designed and deployed an in-house datacenter dedicated to hosting strategic clients. Delivered a secure, scalable infrastructure including structured cabling, VLAN segmentation, pfSense firewalls and Dell server integration (RAID 10, iDRAC) running Proxmox and Hyper-V. This highly available 10Gb architecture ensures reliability, performance and service continuity for critical environments, notably Foncia.",
    },
    image: "/projects/infrastructure-reseau-kiss.svg",
    technologies: ["VLANs", "Routage", "Switches", "Sécurité Réseau", "Cisco"],
    category: "infrastructure",
    links: {},
    featured: true,
    date: "2024-12",
  },
  {
    id: "2",
    slug: "supervision-zabbix",
    title: {
      fr: "Supervision Centralisée Zabbix — KISS",
      en: "Centralized Zabbix Monitoring — KISS",
    },
    description: {
      fr: "Déploiement d'une solution de supervision centralisée afin d'améliorer la visibilité et le pilotage du SI. Implémentation de Zabbix avec supervision SNMP/IPMI, création de templates personnalisés, intégration de Grafana et automatisation des alertes via Slack (API OAuth), le tout sur une architecture haute disponibilité. Résultat : supervision proactive, réduction des incidents et amélioration significative de la réactivité opérationnelle.",
      en: "Deployed a centralized monitoring solution to improve visibility and control over the IT estate. Implemented Zabbix with SNMP/IPMI monitoring, built custom templates, integrated Grafana and automated alerting through Slack (OAuth API), all on a highly available architecture. Outcome: proactive monitoring, fewer incidents and significantly improved operational responsiveness.",
    },
    longDescription: {
      fr: "Déploiement d'une solution de supervision centralisée afin d'améliorer la visibilité et le pilotage du SI. Implémentation de Zabbix avec supervision SNMP/IPMI, création de templates personnalisés, intégration de Grafana et automatisation des alertes via Slack (API OAuth), le tout sur une architecture haute disponibilité. Résultat : supervision proactive, réduction des incidents et amélioration significative de la réactivité opérationnelle.",
      en: "Deployed a centralized monitoring solution to improve visibility and control over the IT estate. Implemented Zabbix with SNMP/IPMI monitoring, built custom templates, integrated Grafana and automated alerting through Slack (OAuth API), all on a highly available architecture. Outcome: proactive monitoring, fewer incidents and significantly improved operational responsiveness.",
    },
    image: "/projects/supervision-zabbix.svg",
    technologies: ["Zabbix", "SNMP", "Alerting", "Dashboards", "Linux"],
    category: "monitoring",
    links: {},
    featured: true,
    date: "2024-12",
  },
  {
    id: "3",
    slug: "siem-security-onion",
    title: {
      fr: "Infrastructure Préproduction — KISS",
      en: "Pre-production Infrastructure — KISS",
    },
    description: {
      fr: "Mise en place d'un environnement de préproduction isolé dans une démarche d'industrialisation des déploiements. Conception d'une architecture segmentée (VLANs), déploiement de Proxmox et Hyper-V, et reconfiguration du stockage DELL EqualLogic PS4100. Cet environnement permet de valider et fiabiliser les configurations avant mise en production, réduisant les risques et renforçant la qualité des déploiements.",
      en: "Built an isolated pre-production environment as part of a deployment industrialization effort. Designed a segmented architecture (VLANs), deployed Proxmox and Hyper-V, and reconfigured DELL EqualLogic PS4100 storage. This environment validates and hardens configurations before they reach production, reducing risk and raising deployment quality.",
    },
    longDescription: {
      fr: "Mise en place d'un environnement de préproduction isolé dans une démarche d'industrialisation des déploiements. Conception d'une architecture segmentée (VLANs), déploiement de Proxmox et Hyper-V, et reconfiguration du stockage DELL EqualLogic PS4100. Cet environnement permet de valider et fiabiliser les configurations avant mise en production, réduisant les risques et renforçant la qualité des déploiements.",
      en: "Built an isolated pre-production environment as part of a deployment industrialization effort. Designed a segmented architecture (VLANs), deployed Proxmox and Hyper-V, and reconfigured DELL EqualLogic PS4100 storage. This environment validates and hardens configurations before they reach production, reducing risk and raising deployment quality.",
    },
    image: "/projects/siem-security-onion.svg",
    technologies: ["Security Onion", "SIEM", "IDS/IPS", "Elasticsearch", "Zeek"],
    category: "security",
    links: {},
    featured: true,
    date: "2024-06",
  },
  {
    id: "4",
    slug: "securite-parc-hospitalier",
    title: {
      fr: "Sécurisation Infrastructure Hospitalière",
      en: "Hospital Infrastructure Security",
    },
    description: {
      fr: "Administration et sécurisation de l'infrastructure IT d'un établissement de santé avec gestion de 500+ utilisateurs et conformité RGPD.",
      en: "Administered and secured a healthcare facility's IT infrastructure, managing 500+ users and ensuring GDPR compliance.",
    },
    longDescription: {
      fr: "Gestion complète de l'infrastructure IT de l'Hôpital Franco-Britannique. Mise en place de règles de filtrage sur pare-feu Fortigate, amélioration de la couverture Wi-Fi via configuration des bornes Aruba, gestion Active Directory et Exchange pour plus de 500 utilisateurs, et déploiement SCCM pour la gestion centralisée du parc informatique.",
      en: "End-to-end management of the Hôpital Franco-Britannique IT infrastructure. Implemented filtering rules on Fortigate firewalls, improved Wi-Fi coverage by reconfiguring Aruba access points, managed Active Directory and Exchange for 500+ users, and deployed SCCM for centralized endpoint management.",
    },
    image: "/projects/securite-parc-hospitalier.svg",
    technologies: ["Fortigate", "Active Directory", "SCCM", "Aruba", "Exchange"],
    category: "security",
    links: {},
    featured: true,
    date: "2024-09",
  },
  {
    id: "5",
    slug: "impression-securisee-nfc",
    title: {
      fr: "Système d'Impression Sécurisé NFC",
      en: "NFC Secure Printing System",
    },
    description: {
      fr: "Déploiement d'un système d'impression sécurisé avec authentification par badge NFC pour la libération des documents confidentiels.",
      en: "Deployed a secure printing system with NFC badge authentication to release confidential documents.",
    },
    longDescription: {
      fr: "Conception et mise en œuvre d'une solution d'impression sécurisée permettant aux utilisateurs de libérer leurs impressions uniquement après authentification par badge NFC. Ce système garantit la confidentialité des documents imprimés et permet une traçabilité complète des impressions dans l'entreprise.",
      en: "Designed and implemented a secure printing solution where print jobs are released only after NFC badge authentication. The system guarantees the confidentiality of printed documents and provides full print auditing across the company.",
    },
    image: "/projects/impression-securisee-nfc.svg",
    technologies: ["NFC", "Sécurité", "Active Directory", "Serveur d'impression"],
    category: "security",
    links: {},
    featured: false,
    date: "2024-12",
  },
  {
    id: "6",
    slug: "stadium-company-infra",
    title: {
      fr: "Infrastructure Stadium Company",
      en: "Stadium Company Infrastructure",
    },
    description: {
      fr: "Conception de l'infrastructure réseau et système complète pour Stadium Company avec haute disponibilité et sécurité renforcée.",
      en: "Designed the complete network and systems infrastructure for Stadium Company, with high availability and hardened security.",
    },
    longDescription: {
      fr: "Projet de conception et déploiement d'une infrastructure IT complète pour Stadium Company. Architecture réseau avec redondance, mise en place de la virtualisation, configuration des services d'annuaire et de messagerie, et implémentation des politiques de sécurité conformes aux standards de l'industrie.",
      en: "Design and deployment of a complete IT infrastructure for Stadium Company. Redundant network architecture, virtualization rollout, directory and messaging services configuration, and security policies aligned with industry standards.",
    },
    image: "/projects/stadium-company-infra.svg",
    technologies: ["VMware", "Active Directory", "Fortigate", "VLANs", "Exchange"],
    category: "infrastructure",
    links: {},
    featured: false,
    date: "2024-03",
  },
  {
    id: "7",
    slug: "amelioration-wifi-hfb",
    title: {
      fr: "Optimisation Couverture Wi-Fi",
      en: "Wi-Fi Coverage Optimization",
    },
    description: {
      fr: "Audit et amélioration de la couverture Wi-Fi d'un établissement hospitalier via reconfiguration des bornes Aruba.",
      en: "Audited and improved a hospital's Wi-Fi coverage by reconfiguring Aruba access points.",
    },
    longDescription: {
      fr: "Réalisation d'un audit complet de la couverture Wi-Fi existante, identification des zones de faible signal et des interférences. Reconfiguration des bornes Aruba pour optimiser la couverture, ajustement des canaux et de la puissance d'émission, et mise en place d'un roaming transparent pour les équipements mobiles.",
      en: "Performed a full audit of the existing Wi-Fi coverage, identifying weak-signal areas and interference. Reconfigured Aruba access points to optimize coverage, tuned channels and transmit power, and enabled seamless roaming for mobile devices.",
    },
    image: "/projects/amelioration-wifi-hfb.svg",
    technologies: ["Aruba", "Wi-Fi", "Site Survey", "Analyse RF"],
    category: "network",
    links: {},
    featured: false,
    date: "2024-05",
  },
  {
    id: "8",
    slug: "token-anti-spam-telecom",
    title: {
      fr: "Système Anti-Spam Télécom",
      en: "Telecom Anti-Spam System",
    },
    description: {
      fr: "Développement d'un système de tokens pour identifier et bloquer les numéros indésirables chez un opérateur télécom.",
      en: "Developed a token-based system to identify and block unwanted phone numbers for a telecom operator.",
    },
    longDescription: {
      fr: "Création d'une solution innovante de protection contre les appels indésirables pour W3TEL. Développement de scripts Shell pour la gestion automatisée des tokens d'identification, intégration avec l'infrastructure télécom existante et mise en place d'une interface de gestion pour les administrateurs.",
      en: "Built an innovative protection against unwanted calls for W3TEL. Developed shell scripts to automate identification-token management, integrated the solution with the existing telecom infrastructure and delivered a management interface for administrators.",
    },
    image: "/projects/token-anti-spam-telecom.svg",
    technologies: ["Shell Script", "pfSense", "Sécurité Télécom", "Automation"],
    category: "automation",
    links: {},
    featured: false,
    date: "2022-07",
  },
  {
    id: "9",
    slug: "lab-devsecops",
    title: {
      fr: "Lab DevSecOps Personnel",
      en: "Personal DevSecOps Lab",
    },
    description: {
      fr: "Création d'un environnement de lab personnel pour la pratique DevSecOps avec conteneurisation et orchestration.",
      en: "Built a personal lab environment for hands-on DevSecOps practice with containerization and orchestration.",
    },
    longDescription: {
      fr: "Mise en place d'un laboratoire personnel pour expérimenter les pratiques DevSecOps. Installation et configuration de Docker et Kubernetes, déploiement de pipelines CI/CD sécurisés, mise en place de scans de vulnérabilités automatisés et pratique de l'Infrastructure as Code avec des outils comme Terraform et Ansible.",
      en: "Set up a personal lab to experiment with DevSecOps practices. Installed and configured Docker and Kubernetes, deployed secure CI/CD pipelines, automated vulnerability scanning and practiced Infrastructure as Code with tools such as Terraform and Ansible.",
    },
    image: "/projects/lab-devsecops.svg",
    technologies: ["Docker", "Kubernetes", "CI/CD", "Terraform", "Ansible"],
    category: "cloud",
    links: {
      github: "https://github.com/Thierno-BAH75",
    },
    featured: false,
    date: "2024-01",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectCategories = [
  { id: "all", name: { fr: "Tous", en: "All" } },
  { id: "security", name: { fr: "Sécurité", en: "Security" } },
  { id: "infrastructure", name: { fr: "Infrastructure", en: "Infrastructure" } },
  { id: "monitoring", name: { fr: "Supervision", en: "Monitoring" } },
  { id: "network", name: { fr: "Réseaux", en: "Networking" } },
  { id: "cloud", name: { fr: "Cloud", en: "Cloud" } },
  { id: "automation", name: { fr: "Automation", en: "Automation" } },
];
