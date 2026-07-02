import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "infrastructure-reseau-kiss",
    title: "Infrastructure Réseau & Datacenter — KISS",
    description:
      "Dans le cadre de l'extension des services d'une ESN, conception et déploiement d'un datacenter interne dédié à l'hébergement de clients stratégiques. Mise en œuvre d'une infrastructure sécurisée et scalable incluant câblage structuré, segmentation VLAN, pare-feu pfSense et intégration de serveurs Dell (RAID 10, iDRAC) sous Proxmox et Hyper-V. Cette architecture 10Gb hautement disponible assure fiabilité, performance et continuité de service pour des environnements critiques, notamment Foncia.",
    longDescription:
      "Dans le cadre de l'extension des services d'une ESN, conception et déploiement d'un datacenter interne dédié à l'hébergement de clients stratégiques. Mise en œuvre d'une infrastructure sécurisée et scalable incluant câblage structuré, segmentation VLAN, pare-feu pfSense et intégration de serveurs Dell (RAID 10, iDRAC) sous Proxmox et Hyper-V. Cette architecture 10Gb hautement disponible assure fiabilité, performance et continuité de service pour des environnements critiques, notamment Foncia.",
    image: "/projects/network-infrastructure.jpg",
    technologies: ["VLANs", "Routage", "Switches", "Sécurité Réseau", "Cisco"],
    category: "infrastructure",
    links: {},
    featured: true,
    date: "2024-12",
  },
  {
    id: "2",
    slug: "supervision-zabbix",
    title: "Supervision Centralisée Zabbix — KISS",
    description:
      "Déploiement d'une solution de supervision centralisée afin d'améliorer la visibilité et le pilotage du SI. Implémentation de Zabbix avec supervision SNMP/IPMI, création de templates personnalisés, intégration de Grafana et automatisation des alertes via Slack (API OAuth), le tout sur une architecture haute disponibilité. Résultat : supervision proactive, réduction des incidents et amélioration significative de la réactivité opérationnelle.",
    longDescription:
      "Déploiement d'une solution de supervision centralisée afin d'améliorer la visibilité et le pilotage du SI. Implémentation de Zabbix avec supervision SNMP/IPMI, création de templates personnalisés, intégration de Grafana et automatisation des alertes via Slack (API OAuth), le tout sur une architecture haute disponibilité. Résultat : supervision proactive, réduction des incidents et amélioration significative de la réactivité opérationnelle.",
    image: "/projects/monitoring-zabbix.jpg",
    technologies: ["Zabbix", "SNMP", "Alerting", "Dashboards", "Linux"],
    category: "monitoring",
    links: {},
    featured: true,
    date: "2024-12",
  },
  {
    id: "3",
    slug: "siem-security-onion",
    title: "Infrastructure Préproduction — KISS",
    description:
      "Mise en place d'un environnement de préproduction isolé dans une démarche d'industrialisation des déploiements. Conception d'une architecture segmentée (VLANs), déploiement de Proxmox et Hyper-V, et reconfiguration du stockage DELL EqualLogic PS4100. Cet environnement permet de valider et fiabiliser les configurations avant mise en production, réduisant les risques et renforçant la qualité des déploiements.",
    longDescription:
      "Mise en place d'un environnement de préproduction isolé dans une démarche d'industrialisation des déploiements. Conception d'une architecture segmentée (VLANs), déploiement de Proxmox et Hyper-V, et reconfiguration du stockage DELL EqualLogic PS4100. Cet environnement permet de valider et fiabiliser les configurations avant mise en production, réduisant les risques et renforçant la qualité des déploiements.",
    image: "/projects/siem-security.jpg",
    technologies: ["Security Onion", "SIEM", "IDS/IPS", "Elasticsearch", "Zeek"],
    category: "security",
    links: {},
    featured: true,
    date: "2024-06",
  },
  {
    id: "4",
    slug: "securite-parc-hospitalier",
    title: "Sécurisation Infrastructure Hospitalière",
    description:
      "Administration et sécurisation de l'infrastructure IT d'un établissement de santé avec gestion de 500+ utilisateurs et conformité RGPD.",
    longDescription:
      "Gestion complète de l'infrastructure IT de l'Hôpital Franco-Britannique. Mise en place de règles de filtrage sur pare-feu Fortigate, amélioration de la couverture Wi-Fi via configuration des bornes Aruba, gestion Active Directory et Exchange pour plus de 500 utilisateurs, et déploiement SCCM pour la gestion centralisée du parc informatique.",
    image: "/projects/hospital-security.jpg",
    technologies: ["Fortigate", "Active Directory", "SCCM", "Aruba", "Exchange"],
    category: "security",
    links: {},
    featured: true,
    date: "2024-09",
  },
  {
    id: "5",
    slug: "impression-securisee-nfc",
    title: "Système d'Impression Sécurisé NFC",
    description:
      "Déploiement d'un système d'impression sécurisé avec authentification par badge NFC pour la libération des documents confidentiels.",
    longDescription:
      "Conception et mise en œuvre d'une solution d'impression sécurisée permettant aux utilisateurs de libérer leurs impressions uniquement après authentification par badge NFC. Ce système garantit la confidentialité des documents imprimés et permet une traçabilité complète des impressions dans l'entreprise.",
    image: "/projects/secure-print.jpg",
    technologies: ["NFC", "Sécurité", "Active Directory", "Serveur d'impression"],
    category: "security",
    links: {},
    featured: false,
    date: "2024-12",
  },
  {
    id: "6",
    slug: "stadium-company-infra",
    title: "Infrastructure Stadium Company",
    description:
      "Conception de l'infrastructure réseau et système complète pour Stadium Company avec haute disponibilité et sécurité renforcée.",
    longDescription:
      "Projet de conception et déploiement d'une infrastructure IT complète pour Stadium Company. Architecture réseau avec redondance, mise en place de la virtualisation, configuration des services d'annuaire et de messagerie, et implémentation des politiques de sécurité conformes aux standards de l'industrie.",
    image: "/projects/stadium-infra.jpg",
    technologies: ["VMware", "Active Directory", "Fortigate", "VLANs", "Exchange"],
    category: "infrastructure",
    links: {},
    featured: false,
    date: "2024-03",
  },
  {
    id: "7",
    slug: "amelioration-wifi-hfb",
    title: "Optimisation Couverture Wi-Fi",
    description:
      "Audit et amélioration de la couverture Wi-Fi d'un établissement hospitalier via reconfiguration des bornes Aruba.",
    longDescription:
      "Réalisation d'un audit complet de la couverture Wi-Fi existante, identification des zones de faible signal et des interférences. Reconfiguration des bornes Aruba pour optimiser la couverture, ajustement des canaux et de la puissance d'émission, et mise en place d'un roaming transparent pour les équipements mobiles.",
    image: "/projects/wifi-optimization.jpg",
    technologies: ["Aruba", "Wi-Fi", "Site Survey", "Analyse RF"],
    category: "network",
    links: {},
    featured: false,
    date: "2024-05",
  },
  {
    id: "8",
    slug: "token-anti-spam-telecom",
    title: "Système Anti-Spam Télécom",
    description:
      "Développement d'un système de tokens pour identifier et bloquer les numéros indésirables chez un opérateur télécom.",
    longDescription:
      "Création d'une solution innovante de protection contre les appels indésirables pour W3TEL. Développement de scripts Shell pour la gestion automatisée des tokens d'identification, intégration avec l'infrastructure télécom existante et mise en place d'une interface de gestion pour les administrateurs.",
    image: "/projects/telecom-security.jpg",
    technologies: ["Shell Script", "pfSense", "Sécurité Télécom", "Automation"],
    category: "automation",
    links: {},
    featured: false,
    date: "2022-07",
  },
  {
    id: "9",
    slug: "lab-devsecops",
    title: "Lab DevSecOps Personnel",
    description:
      "Création d'un environnement de lab personnel pour la pratique DevSecOps avec conteneurisation et orchestration.",
    longDescription:
      "Mise en place d'un laboratoire personnel pour expérimenter les pratiques DevSecOps. Installation et configuration de Docker et Kubernetes, déploiement de pipelines CI/CD sécurisés, mise en place de scans de vulnérabilités automatisés et pratique de l'Infrastructure as Code avec des outils comme Terraform et Ansible.",
    image: "/projects/devsecops-lab.jpg",
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
  { id: "all", name: "Tous" },
  { id: "security", name: "Sécurité" },
  { id: "infrastructure", name: "Infrastructure" },
  { id: "monitoring", name: "Supervision" },
  { id: "network", name: "Réseaux" },
  { id: "cloud", name: "Cloud" },
  { id: "automation", name: "Automation" },
];
