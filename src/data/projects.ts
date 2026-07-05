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
      fr: "Dans le cadre du renforcement de l'infrastructure interne de KISS (ESN spécialisée en infogérance, hébergement et cybersécurité), conception et déploiement d'un datacenter interne réparti sur 3 baies, entre l'hébergement de clients stratégiques via KHosting et les environnements de production et préproduction internes de KISS. Câblage structuré, VLANs segmentés pour isoler les environnements, switches Netgear stackés (haute disponibilité, bascule automatique), LAGs et liens SFP+ 10 Gb. Serveurs Dell PowerEdge R6615 en RAID 10 (contrôleur Dell PERC H330 Mini), pare-feu pfSense, NAS Synology, hyperviseurs Proxmox et Hyper-V.",
      en: "As part of strengthening KISS's internal infrastructure (an IT services company specializing in managed services, hosting and cybersecurity), designed and deployed an in-house datacenter split across 3 racks, covering both KHosting client hosting for strategic clients and KISS's internal production and pre-production environments. Structured cabling, segmented VLANs to isolate environments, stacked Netgear switches (high availability, automatic failover), LAGs and 10 Gb SFP+ links. Dell PowerEdge R6615 servers in RAID 10 (Dell PERC H330 Mini controller), pfSense firewalls, Synology NAS, Proxmox and Hyper-V hypervisors.",
    },
    longDescription: {
      fr: "Dans le cadre du renforcement de l'infrastructure interne de KISS (ESN spécialisée en infogérance, hébergement et cybersécurité), conception et déploiement d'un datacenter interne réparti sur 3 baies, entre l'hébergement de clients stratégiques via KHosting et les environnements de production et préproduction internes de KISS. Câblage structuré, VLANs segmentés pour isoler les environnements, switches Netgear stackés (haute disponibilité, bascule automatique), LAGs et liens SFP+ 10 Gb. Serveurs Dell PowerEdge R6615 en RAID 10 (contrôleur Dell PERC H330 Mini), pare-feu pfSense, NAS Synology, hyperviseurs Proxmox et Hyper-V. Une architecture pensée pour la fiabilité, la performance et la continuité de service.",
      en: "As part of strengthening KISS's internal infrastructure (an IT services company specializing in managed services, hosting and cybersecurity), designed and deployed an in-house datacenter split across 3 racks, covering both KHosting client hosting for strategic clients and KISS's internal production and pre-production environments. Structured cabling, segmented VLANs to isolate environments, stacked Netgear switches (high availability, automatic failover), LAGs and 10 Gb SFP+ links. Dell PowerEdge R6615 servers in RAID 10 (Dell PERC H330 Mini controller), pfSense firewalls, Synology NAS, Proxmox and Hyper-V hypervisors. An architecture built for reliability, performance and service continuity.",
    },
    image: "/projects/infrastructure-reseau-kiss.svg",
    technologies: ["VLANs", "Routage", "Switches", "Sécurité Réseau", "Netgear"],
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
      fr: "Déploiement d'une solution de supervision centralisée (Zabbix 7.2) pour améliorer la visibilité et le pilotage du SI de KISS. Installation sur une VM dédiée (Ubuntu Server 24.04, 8 vCPU, 10 Go de RAM, 60 Go de SSD), stack MySQL/NGINX/Zabbix Agent 2, puis mise en place d'un cluster Zabbix en haute disponibilité avec bascule automatique en cas de panne d'un nœud. Supervision des serveurs Dell via iDRAC/IPMI et des switches/pare-feu via SNMP v2c, tableaux de bord Grafana et alertes en temps réel via bot Slack (API OAuth) et e-mail, avec seuils anti-spam. Résultat : supervision proactive, réduction des incidents et amélioration significative de la réactivité opérationnelle.",
      en: "Deployed a centralized monitoring solution (Zabbix 7.2) to improve visibility and control over KISS's IT estate. Installed on a dedicated VM (Ubuntu Server 24.04, 8 vCPU, 10 GB RAM, 60 GB SSD) with a MySQL/NGINX/Zabbix Agent 2 stack, then set up a high-availability Zabbix cluster with automatic failover if a node goes down. Monitored Dell servers via iDRAC/IPMI and switches/firewalls via SNMP v2c, with Grafana dashboards and real-time alerts through a Slack bot (OAuth API) and email, with anti-spam thresholds. Outcome: proactive monitoring, fewer incidents and significantly improved operational responsiveness.",
    },
    longDescription: {
      fr: "Déploiement d'une solution de supervision centralisée (Zabbix 7.2) pour améliorer la visibilité et le pilotage du SI de KISS. Installation sur une VM dédiée (Ubuntu Server 24.04, 8 vCPU, 10 Go de RAM, 60 Go de SSD) avec une stack MySQL, NGINX et Zabbix Agent 2, puis mise en place d'un cluster Zabbix en haute disponibilité : en cas de défaillance d'un nœud, un autre prend automatiquement le relais sans interruption. Supervision des serveurs Dell via iDRAC/IPMI (santé disques, températures, ventilateurs, alimentations) et des switches/pare-feu via SNMP v2c (trafic, liens SFP+, statut des VLANs). Intégration de tableaux de bord Grafana et d'alertes en temps réel via un bot Slack (API OAuth) et par e-mail, avec des seuils pour éviter le spam de notifications. Résultat : supervision proactive, réduction des incidents et amélioration significative de la réactivité opérationnelle.",
      en: "Deployed a centralized monitoring solution (Zabbix 7.2) to improve visibility and control over KISS's IT estate. Installed on a dedicated VM (Ubuntu Server 24.04, 8 vCPU, 10 GB RAM, 60 GB SSD) running a MySQL, NGINX and Zabbix Agent 2 stack, then set up a high-availability Zabbix cluster: if a node fails, another automatically takes over with no interruption. Monitored Dell servers via iDRAC/IPMI (disk health, temperatures, fans, power supplies) and switches/firewalls via SNMP v2c (traffic, SFP+ links, VLAN status). Integrated Grafana dashboards and real-time alerts through a Slack bot (OAuth API) and email, with thresholds to prevent notification spam. Outcome: proactive monitoring, fewer incidents and significantly improved operational responsiveness.",
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
      fr: "Mise en place, au sein du datacenter interne de KISS, d'un environnement de préproduction isolé de la production, dans une démarche d'industrialisation des déploiements. VLANs dédiés pour isoler les environnements sur des switches Netgear stackés, hyperviseurs Proxmox et Hyper-V, stockage sur NAS Synology et volumes RAID 10 (serveurs Dell PowerEdge R6615, contrôleur PERC H330). Cet environnement permet de valider et fiabiliser les configurations avant leur bascule en production, réduisant les risques et renforçant la qualité des déploiements pour KISS et ses clients (KHosting).",
      en: "Set up, within KISS's internal datacenter, a pre-production environment isolated from production, as part of a deployment industrialization effort. Dedicated VLANs to isolate environments on stacked Netgear switches, Proxmox and Hyper-V hypervisors, storage on a Synology NAS and RAID 10 volumes (Dell PowerEdge R6615 servers, PERC H330 controller). This environment validates and hardens configurations before they go live, reducing risk and improving deployment quality for KISS and its clients (KHosting).",
    },
    longDescription: {
      fr: "Mise en place, au sein du datacenter interne de KISS, d'un environnement de préproduction isolé de la production, dans une démarche d'industrialisation des déploiements. VLANs dédiés pour isoler les environnements sur des switches Netgear stackés, hyperviseurs Proxmox et Hyper-V, stockage sur NAS Synology et volumes RAID 10 (serveurs Dell PowerEdge R6615, contrôleur PERC H330). Cet environnement permet de valider et fiabiliser les configurations avant leur bascule en production, réduisant les risques et renforçant la qualité des déploiements pour KISS et ses clients (KHosting).",
      en: "Set up, within KISS's internal datacenter, a pre-production environment isolated from production, as part of a deployment industrialization effort. Dedicated VLANs to isolate environments on stacked Netgear switches, Proxmox and Hyper-V hypervisors, storage on a Synology NAS and RAID 10 volumes (Dell PowerEdge R6615 servers, PERC H330 controller). This environment validates and hardens configurations before they go live, reducing risk and improving deployment quality for KISS and its clients (KHosting).",
    },
    image: "/projects/siem-security-onion.svg",
    technologies: ["VLANs", "Netgear", "Proxmox", "Hyper-V", "RAID 10"],
    category: "security",
    links: {},
    featured: true,
    date: "2024-12",
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
      fr: "Administration de l'infrastructure IT de l'Hôpital Franco-Britannique (270+ lits, environ 700 professionnels de santé). Mise en place de règles de filtrage et de flux (ACL) sur des pare-feux de nouvelle génération, administration Active Directory (comptes utilisateurs, ordinateurs, lecteurs réseau, réservations DHCP) et d'une messagerie d'entreprise à grande échelle, GPO d'automatisation et de sécurisation des postes, et déploiement d'une solution de gestion de parc centralisée avec masterisation des postes via Sysprep pour un parc de plusieurs centaines d'équipements. L'ensemble mené dans le respect des exigences RGPD propres au secteur de la santé.",
      en: "Administered the Hôpital Franco-Britannique's IT infrastructure (270+ beds, around 700 healthcare staff). Set up filtering and flow rules (ACLs) on next-generation firewalls, administered Active Directory (user accounts, computers, network drives, DHCP reservations) and enterprise-scale messaging, built GPOs for workstation automation and hardening, and deployed a centralized device management solution with Sysprep-based masterization for a fleet of several hundred devices. All carried out in line with the GDPR requirements specific to the healthcare sector.",
    },
    image: "/projects/securite-parc-hospitalier.svg",
    technologies: ["Pare-feu NGFW", "Active Directory", "Gestion de parc", "Aruba", "Messagerie d'entreprise"],
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
      fr: "Chez KISS, déploiement de SavaPage comme solution d'impression sécurisée centralisée, avec authentification par badge NFC pour la libération des documents confidentiels.",
      en: "At KISS, deployed SavaPage as a centralized secure printing solution, with NFC badge authentication to release confidential documents.",
    },
    longDescription: {
      fr: "Face à l'absence de gestion consolidée des impressions chez KISS, conception et déploiement de SavaPage comme gestionnaire d'impression centralisé, hébergé sur une VM Windows Server (Hyper-V). La solution permet aux utilisateurs de libérer leurs impressions uniquement après authentification par badge NFC, garantissant la confidentialité des documents et une traçabilité complète des impressions dans l'entreprise.",
      en: "To address the lack of consolidated print management at KISS, designed and deployed SavaPage as a centralized print management solution, hosted on a Windows Server VM (Hyper-V). The solution only releases print jobs after NFC badge authentication, ensuring document confidentiality and full print auditing across the company.",
    },
    image: "/projects/impression-securisee-nfc.svg",
    technologies: ["SavaPage", "NFC", "Sécurité", "Active Directory", "Serveur d'impression"],
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
      fr: "Audit et amélioration de la couverture Wi-Fi de l'Hôpital Franco-Britannique (600 à 700 bornes Aruba sur 3 sites), pour fiabiliser l'accès des soignants au serveur TSE (bureau à distance vers l'application de santé DXCARE).",
      en: "Audited and improved Wi-Fi coverage at the Hôpital Franco-Britannique (600 to 700 Aruba access points across 3 sites), to make staff access to the TSE remote-desktop server (running the DXCARE healthcare app) more reliable.",
    },
    longDescription: {
      fr: "Prise en charge d'un problème de couverture Wi-Fi historique (remontant à 2020) pénalisant le personnel soignant, connecté en Wi-Fi aux serveurs TSE (bureau à distance) pour utiliser l'application de santé DXCARE. Diagnostic par tests de ping (comparaison PC-chariots / PC portables, sur batterie et sur secteur) et tests de roaming sur le terrain, ayant révélé de mauvaises configurations sur certaines bornes. Mise à jour des pilotes Wi-Fi via GPO et SCCM, vérification des règles de flux sur le pare-feu, puis bascule d'une partie des bornes de 2,4 GHz vers 5 GHz et ajustement du roaming, avec une amélioration significative de la couverture à la clé. Migration de la VM du serveur TSE vers des serveurs plus proches pour optimiser la communication.",
      en: "Took on a historic Wi-Fi coverage issue (dating back to 2020) affecting healthcare staff, who connect over Wi-Fi to TSE remote-desktop servers to use the DXCARE healthcare application. Diagnosed the issue through ping tests (comparing PC-carts and laptops, on battery vs. mains power) and on-site roaming tests, which revealed misconfigurations on some access points. Updated Wi-Fi drivers via GPO and SCCM, checked firewall flow rules, then switched some access points from 2.4 GHz to 5 GHz and tuned roaming settings, achieving a significant coverage improvement. Migrated the TSE server VM to nearby servers to optimize communication.",
    },
    image: "/projects/amelioration-wifi-hfb.svg",
    technologies: ["Aruba", "Wi-Fi", "GPO", "SCCM", "Site Survey", "Analyse RF"],
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
