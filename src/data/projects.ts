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
      fr: `## 📋 Contexte du projet
KISS (ESN infogérance, hébergement, cybersécurité) a modernisé son réseau interne, jusqu'alors peu structuré, en construisant un datacenter sur 3 baies pour KHosting et ses environnements internes.

## 🎯 Objectifs
- Datacenter robuste et évolutif sur 3 baies
- VLANs dédiés : clients, production, préproduction
- Haute disponibilité réseau (stacking, LAGs)
- Documentation complète de l'architecture

## 🛠️ Technologies utilisées
Netgear (stacking), SFP+ 10 Gb, LAGs, VLANs, pfSense, Dell PowerEdge R6615, PERC H330 Mini, RAID 10, NAS Synology, Proxmox, Hyper-V

## 💡 Démarche
- Câblage structuré et installation des baies
- Configuration des switches (stacking, VLANs, LAGs)
- Serveurs Dell en RAID 10 + iDRAC, hyperviseurs Proxmox/Hyper-V

## 📊 Résultats
- Datacenter opérationnel et documenté
- Haute disponibilité assurée (bascule automatique)
- Environnements clients/prod/préprod cloisonnés
- Base évolutive pour supervision centralisée

## 🚀 Compétences développées
Architecture réseau, câblage structuré, VLANs, LAGs, stacking, RAID 10, iDRAC, Proxmox, Hyper-V, documentation technique`,
      en: `## 📋 Project context
KISS (IT managed-services, hosting, cybersecurity) modernised its unstructured internal network, building a 3-rack datacenter for KHosting and its internal environments.

## 🎯 Objectives
- Robust, scalable 3-rack datacenter
- Dedicated VLANs: clients, production, pre-production
- Network high availability (stacking, LAGs)
- Full architecture documentation

## 🛠️ Technologies used
Netgear (stacking), 10 Gb SFP+, LAGs, VLANs, pfSense, Dell PowerEdge R6615, PERC H330 Mini, RAID 10, Synology NAS, Proxmox, Hyper-V

## 💡 Approach
- Structured cabling and rack installation
- Switch configuration (stacking, VLANs, LAGs)
- Dell servers in RAID 10 + iDRAC, Proxmox/Hyper-V hypervisors

## 📊 Results
- Operational, documented datacenter
- High availability ensured (automatic failover)
- Client/prod/pre-prod environments isolated
- Scalable base for centralised monitoring

## 🚀 Skills developed
Network architecture, structured cabling, VLANs, LAGs, stacking, RAID 10, iDRAC, Proxmox, Hyper-V, technical documentation`,
    },
    image: "/projects/infrastructure-reseau-kiss.svg",
    architectureDiagram: "/projects/infrastructure-reseau-kiss-architecture.svg",
    technologies: ["VLANs", "Routage", "Switches", "Sécurité Réseau", "Netgear"],
    category: "infrastructure",
    links: {},
    featured: true,
    date: "2024-12",
    metrics: [
      { icon: "Server", value: "3", label: { fr: "Baies datacenter", en: "Datacenter racks" } },
      { icon: "Zap", value: "10 Gb", label: { fr: "Débit SFP+", en: "SFP+ throughput" } },
      { icon: "HardDrive", value: "RAID 10", label: { fr: "Redondance stockage", en: "Storage redundancy" } },
      { icon: "Activity", value: "HA", label: { fr: "Switches stackés", en: "Stacked switches" } },
    ],
    challenges: [
      {
        title: { fr: "Configuration des VLANs et LAGs sur les switches Netgear", en: "VLAN and LAG configuration on Netgear switches" },
        problem: {
          fr: "Comprendre le fonctionnement des ports « taggés » et « untaggés » et leur rôle dans la circulation du trafic entre les différents réseaux segmentés n'a pas été évident au départ. La documentation Netgear est sparse sur les cas de configuration complexes.",
          en: "Understanding how \"tagged\" and \"untagged\" ports work and their role in routing traffic between segmented networks was not straightforward at first. Netgear documentation is sparse on complex configuration scenarios.",
        },
        solution: {
          fr: "Consultation approfondie de la documentation officielle et d'exemples de configurations. Réalisation de plusieurs cycles de tests pour valider que chaque VLAN communiquait correctement via le switch cœur. Apprentissage des bonnes pratiques LAG pour éviter les boucles réseau.",
          en: "In-depth review of official documentation and configuration examples. Multiple test cycles to validate that each VLAN was routing correctly through the core switch. Learned LAG best practices to avoid network loops.",
        },
      },
    ],
  },
  {
    id: "2",
    slug: "supervision-zabbix",
    title: {
      fr: "Supervision Centralisée Zabbix — KISS",
      en: "Centralized Zabbix Monitoring — KISS",
    },
    description: {
      fr: "Déploiement d'une solution de supervision centralisée (Zabbix 7.2) pour améliorer la visibilité et le pilotage du SI de KISS. Installation sur une VM dédiée (Ubuntu Server 24.04, 8 vCPU, 10 Go de RAM, 60 Go de SSD), stack MySQL/NGINX/Zabbix Agent 2, puis mise en place d'un cluster Zabbix en haute disponibilité avec bascule automatique en cas de panne d'un nœud. Supervision des serveurs Dell via iDRAC/IPMI et des switches/pare-feu via SNMP v2c, tableaux de bord Grafana et alertes en temps réel via bot Slack (API OAuth) et e-mail, avec seuils anti-spam.",
      en: "Deployed a centralized monitoring solution (Zabbix 7.2) to improve visibility and control over KISS's IT estate. Installed on a dedicated VM (Ubuntu Server 24.04, 8 vCPU, 10 GB RAM, 60 GB SSD) with a MySQL/NGINX/Zabbix Agent 2 stack, then set up a high-availability Zabbix cluster with automatic failover if a node goes down. Monitored Dell servers via iDRAC/IPMI and switches/firewalls via SNMP v2c, with Grafana dashboards and real-time alerts through a Slack bot (OAuth API) and email, with anti-spam thresholds.",
    },
    longDescription: {
      fr: `## 📋 Contexte du projet
Face au manque de visibilité sur le SI de KISS, une supervision centralisée Zabbix a été déployée pour couvrir serveurs, réseau et hyperviseurs.

## 🎯 Objectifs
- Centraliser la supervision du parc IT
- Zabbix en haute disponibilité
- Alertes temps réel (Slack, e-mail)
- Tableaux de bord Grafana

## 🛠️ Technologies utilisées
Zabbix 7.2, Ubuntu Server 24.04, MySQL, NGINX, Zabbix Agent 2, cluster HA, SNMP v2c, IPMI/iDRAC, Grafana, Slack (OAuth), e-mail

## 💡 Démarche
- VM dédiée (8 vCPU / 10 Go / 60 Go SSD), stack MySQL/NGINX
- Intégration serveurs (IPMI/iDRAC) et réseau (SNMP v2c)
- Cluster HA avec bascule automatique + alertes Slack/e-mail

## 📊 Résultats
- Supervision proactive de tout le parc KISS
- Continuité du monitoring garantie (cluster HA)
- Alertes temps réel opérationnelles
- Pilotage visuel via Grafana

## 🚀 Compétences développées
Administration Linux, Zabbix, SNMP v2c, IPMI, haute disponibilité, Grafana, alerting automatisé`,
      en: `## 📋 Project context
Facing a lack of visibility into KISS's IT estate, a centralised Zabbix monitoring solution was deployed to cover servers, network and hypervisors.

## 🎯 Objectives
- Centralise monitoring across the IT estate
- Zabbix with high availability
- Real-time alerts (Slack, email)
- Grafana dashboards

## 🛠️ Technologies used
Zabbix 7.2, Ubuntu Server 24.04, MySQL, NGINX, Zabbix Agent 2, HA cluster, SNMP v2c, IPMI/iDRAC, Grafana, Slack (OAuth), email

## 💡 Approach
- Dedicated VM (8 vCPU / 10 GB / 60 GB SSD), MySQL/NGINX stack
- Server (IPMI/iDRAC) and network (SNMP v2c) integration
- HA cluster with automatic failover + Slack/email alerts

## 📊 Results
- Proactive monitoring across the full KISS estate
- Continuous monitoring guaranteed (HA cluster)
- Real-time alerts operational
- Visual management via Grafana

## 🚀 Skills developed
Linux administration, Zabbix, SNMP v2c, IPMI, high availability, Grafana, automated alerting`,
    },
    image: "/projects/supervision-zabbix.svg",
    architectureDiagram: "/projects/supervision-zabbix-architecture.svg",
    technologies: ["Zabbix", "SNMP", "Alerting", "Dashboards", "Linux"],
    category: "monitoring",
    links: {},
    featured: true,
    date: "2024-12",
    metrics: [
      { icon: "Cpu", value: "8 vCPU", label: { fr: "VM Zabbix", en: "Zabbix VM" } },
      { icon: "MemoryStick", value: "10 Go", label: { fr: "RAM allouée", en: "RAM allocated" } },
      { icon: "HardDrive", value: "60 Go SSD", label: { fr: "Stockage VM", en: "VM storage" } },
      { icon: "Activity", value: "HA", label: { fr: "Cluster haute dispo.", en: "High-avail. cluster" } },
    ],
    challenges: [
      {
        title: { fr: "Intégration multi-protocoles des équipements dans Zabbix", en: "Multi-protocol equipment integration in Zabbix" },
        problem: {
          fr: "Chaque type d'équipement nécessitait une méthode d'intégration différente : les serveurs Dell via IPMI/iDRAC, les switches et le pare-feu via SNMP v2c, les hyperviseurs et VMs via des agents Zabbix ou des scripts. Chaque méthode avait ses propres subtilités de configuration et risques de faux positifs.",
          en: "Each device type required a different integration method: Dell servers via IPMI/iDRAC, switches and firewall via SNMP v2c, hypervisors and VMs via Zabbix agents or scripts. Each method had its own configuration subtleties and risk of false positives.",
        },
        solution: {
          fr: "Suivi des guides officiels Zabbix pour chaque type de supervision. Tests et ajustements itératifs des alertes pour éliminer les faux positifs. Mise en place et validation des graphes et métriques en environnement de test avant la mise en production.",
          en: "Followed official Zabbix documentation for each monitoring method. Iterative alert testing and tuning to eliminate false positives. Built and validated graphs and metrics in a test environment before going live.",
        },
      },
    ],
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
      fr: `## 📋 Contexte du projet
Un environnement de préproduction isolé a été mis en place dans le datacenter KISS pour valider les configurations avant mise en production.

## 🎯 Objectifs
- Isoler la préproduction de la production
- Valider les déploiements en conditions réelles
- Réduire les risques d'incidents

## 🛠️ Technologies utilisées
VLANs dédiés, Netgear (stacking), Proxmox, Hyper-V, NAS Synology, Dell PowerEdge R6615, PERC H330, RAID 10

## 💡 Démarche
- VLANs dédiés sur switches stackés
- Stockage NAS Synology + RAID 10
- Hyperviseurs Proxmox/Hyper-V pour VMs de test

## 📊 Résultats
- Environnement préprod opérationnel et isolé
- Déploiements validés avant mise en production
- Procédures documentées et reproductibles

## 🚀 Compétences développées
VLANs, virtualisation, gestion du stockage, procédures de déploiement`,
      en: `## 📋 Project context
An isolated pre-production environment was set up in the KISS datacenter to validate configurations before going live.

## 🎯 Objectives
- Isolate pre-production from production
- Validate deployments under real conditions
- Reduce the risk of incidents

## 🛠️ Technologies used
Dedicated VLANs, Netgear (stacking), Proxmox, Hyper-V, Synology NAS, Dell PowerEdge R6615, PERC H330, RAID 10

## 💡 Approach
- Dedicated VLANs on stacked switches
- Synology NAS storage + RAID 10
- Proxmox/Hyper-V hypervisors for test VMs

## 📊 Results
- Pre-production environment operational and isolated
- Deployments validated before go-live
- Documented, reproducible procedures

## 🚀 Skills developed
VLANs, virtualisation, storage management, deployment procedures`,
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
      fr: `## 📋 Contexte du projet
À l'Hôpital Franco-Britannique (270+ lits, ~700 professionnels), j'ai administré et sécurisé l'infrastructure IT au quotidien.

## 🎯 Objectifs
- Sécuriser Active Directory et le réseau
- Déployer une messagerie d'entreprise fiable
- Industrialiser la gestion du parc (masterisation)
- Assurer la conformité RGPD santé

## 🛠️ Technologies utilisées
Pare-feux NGFW (cluster HA), Active Directory, GPO, messagerie d'entreprise, gestion de parc centralisée, Sysprep, Wi-Fi Aruba

## 💡 Démarche
- ACL et règles de filtrage sur pare-feux NGFW
- Administration AD (comptes, GPO, DHCP)
- Masterisation Sysprep + déploiement centralisé

## 📊 Résultats
- Infrastructure administrée et sécurisée en continu
- Conformité RGPD assurée
- Déploiement centralisé opérationnel
- Règles réseau documentées et maintenues

## 🚀 Compétences développées
Active Directory, GPO, sécurité réseau (ACL, NGFW), gestion de parc, conformité RGPD santé`,
      en: `## 📋 Project context
At the Hôpital Franco-Britannique (270+ beds, ~700 staff), I administered and secured the IT infrastructure day-to-day.

## 🎯 Objectives
- Secure Active Directory and the network
- Deploy reliable enterprise email
- Industrialise device management (masterisation)
- Ensure healthcare GDPR compliance

## 🛠️ Technologies used
NGFW firewalls (HA cluster), Active Directory, GPOs, enterprise email, centralised device management, Sysprep, Aruba Wi-Fi

## 💡 Approach
- ACLs and filtering rules on NGFW firewalls
- AD administration (accounts, GPOs, DHCP)
- Sysprep masterisation + centralised deployment

## 📊 Results
- Infrastructure administered and secured continuously
- GDPR compliance ensured
- Centralised deployment operational
- Network rules documented and maintained

## 🚀 Skills developed
Active Directory, GPO, network security (ACL, NGFW), device management, healthcare GDPR compliance`,
    },
    image: "/projects/securite-parc-hospitalier.svg",
    architectureDiagram: "/projects/securite-parc-hospitalier-architecture.svg",
    technologies: ["Pare-feu NGFW", "Active Directory", "Gestion de parc", "Aruba", "Messagerie d'entreprise"],
    category: "security",
    links: {},
    featured: true,
    date: "2024-09",
    metrics: [
      { icon: "Building2", value: "270+", label: { fr: "Lits (capacité hôpital)", en: "Beds (hospital capacity)" } },
      { icon: "Users", value: "~700", label: { fr: "Professionnels de santé", en: "Healthcare professionals" } },
    ],
  },
  {
    id: "5",
    slug: "impression-securisee-nfc",
    title: {
      fr: "Gestion d'Impression Centralisée — SavaPage",
      en: "Centralized Print Management — SavaPage",
    },
    description: {
      fr: "Chez KISS, déploiement de SavaPage comme solution d'impression sécurisée centralisée, pour la gestion et la libération maîtrisée des documents confidentiels.",
      en: "At KISS, deployed SavaPage as a centralized secure printing solution, for the management and controlled release of confidential documents.",
    },
    longDescription: {
      fr: `## 📋 Contexte du projet
Chez KISS, l'absence de gestion consolidée des impressions posait un problème de traçabilité et de confidentialité documentaire.

## 🎯 Objectifs
- Centraliser la gestion des impressions
- Assurer la traçabilité des documents
- Renforcer la confidentialité documentaire

## 🛠️ Technologies utilisées
SavaPage, Windows Server, Hyper-V, Active Directory

## 💡 Démarche
- Déploiement de SavaPage sur VM Windows Server (Hyper-V)
- Intégration Active Directory (droits d'impression)
- Configuration des files et politiques d'accès

## 📊 Résultats
- Impressions centralisées et traçables
- Confidentialité renforcée
- Solution hébergée en interne

## 🚀 Compétences développées
Windows Server, SavaPage, intégration Active Directory, virtualisation Hyper-V`,
      en: `## 📋 Project context
At KISS, the lack of consolidated print management created a traceability and document confidentiality issue.

## 🎯 Objectives
- Centralise print management
- Ensure document traceability
- Strengthen document confidentiality

## 🛠️ Technologies used
SavaPage, Windows Server, Hyper-V, Active Directory

## 💡 Approach
- Deployed SavaPage on a Windows Server VM (Hyper-V)
- Active Directory integration (print rights)
- Configured print queues and access policies

## 📊 Results
- Centralised, traceable printing
- Stronger confidentiality
- Internally hosted solution

## 🚀 Skills developed
Windows Server, SavaPage, Active Directory integration, Hyper-V virtualisation`,
    },
    image: "/projects/impression-securisee-nfc.svg",
    technologies: ["SavaPage", "Sécurité", "Active Directory", "Serveur d'impression"],
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
      fr: "Projet d'entraînement personnel : conception de l'infrastructure réseau et système complète pour un client fictif (« Stadium Company »), avec haute disponibilité et sécurité renforcée.",
      en: "Personal training project: designed the complete network and systems infrastructure for a fictional client (\"Stadium Company\"), with high availability and hardened security.",
    },
    longDescription: {
      fr: `## 📋 Contexte du projet
Projet d'entraînement personnel pour un client fictif : conception d'une infrastructure IT complète de bout en bout.

## 🎯 Objectifs
- Architecture réseau redondante (VLANs)
- Virtualisation et services d'annuaire
- Messagerie d'entreprise (Exchange)
- Sécurité conforme aux standards

## 🛠️ Technologies utilisées
VMware, Active Directory, Exchange, VLANs, pare-feu NGFW

## 💡 Démarche
- Conception de l'architecture réseau
- Déploiement VMware + Active Directory + Exchange
- Configuration NGFW, VLANs, GPO

## 📊 Résultats
- Infrastructure complète opérationnelle
- Services annuaire/messagerie validés
- Compétences consolidées en conception d'infrastructure

## 🚀 Compétences développées
Architecture réseau, VMware, Active Directory, Exchange, sécurité périmétrique`,
      en: `## 📋 Project context
Personal training project for a fictional client: end-to-end design of a complete IT infrastructure.

## 🎯 Objectives
- Redundant network architecture (VLANs)
- Virtualisation and directory services
- Corporate email (Exchange)
- Security aligned with standards

## 🛠️ Technologies used
VMware, Active Directory, Exchange, VLANs, NGFW firewall

## 💡 Approach
- Network architecture design
- VMware + Active Directory + Exchange deployment
- NGFW, VLAN, GPO configuration

## 📊 Results
- Complete, operational infrastructure
- Directory/email services validated
- Consolidated infrastructure design skills

## 🚀 Skills developed
Network architecture, VMware, Active Directory, Exchange, perimeter security`,
    },
    image: "/projects/stadium-company-infra.svg",
    technologies: ["VMware", "Active Directory", "Pare-feu NGFW", "VLANs", "Exchange"],
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
      fr: "Audit et amélioration de la couverture Wi-Fi de l'Hôpital Franco-Britannique (plus de 100 bornes Wi-Fi déployées), pour fiabiliser l'accès des soignants au serveur TSE (bureau à distance vers l'application métier de gestion des dossiers patients).",
      en: "Audited and improved Wi-Fi coverage at the Hôpital Franco-Britannique (100+ Wi-Fi access points deployed), to make staff access to the TSE remote-desktop server (running the patient records management application) more reliable.",
    },
    longDescription: {
      fr: `## 📋 Contexte du projet
Depuis 2020, l'Hôpital Franco-Britannique souffrait d'une couverture Wi-Fi instable, pénalisant l'accès du personnel soignant au serveur TSE (application métier).

## 🎯 Objectifs
- Diagnostiquer la cause des coupures Wi-Fi
- Améliorer la stabilité sans interrompre les soins
- Fiabiliser l'accès au serveur TSE

## 🛠️ Technologies utilisées
Bornes/contrôleurs Wi-Fi Aruba, GPO, gestion de parc centralisée, pare-feu (ACL), analyse RF

## 💡 Diagnostic et résolution
- Tests de ping comparatifs (PC-chariots vs portables, batterie vs secteur)
- Tests de roaming borne par borne → configurations Aruba erronées détectées
- GPO (drivers, perf. Wi-Fi max) + bascule 2,4→5 GHz + migration VM TSE

## 📊 Résultats
- Couverture Wi-Fi significativement améliorée
- Accès fiabilisé à l'application métier
- Configurations Aruba corrigées
- Protocole de diagnostic documenté

## 🚀 Compétences développées
Audit Wi-Fi, configuration Aruba, analyse RF, GPO, administration pare-feu, gestion de parc`,
      en: `## 📋 Project context
Since 2020, the Hôpital Franco-Britannique had suffered unstable Wi-Fi coverage, hampering staff access to the TSE server (patient records application).

## 🎯 Objectives
- Diagnose the cause of Wi-Fi dropouts
- Improve stability without disrupting care
- Ensure reliable access to the TSE server

## 🛠️ Technologies used
Aruba Wi-Fi access points/controllers, GPOs, centralised device management, firewall (ACL), RF analysis

## 💡 Diagnosis and resolution
- Comparative ping tests (PC-carts vs laptops, battery vs mains)
- On-site roaming tests per AP → misconfigured Aruba settings found
- GPOs (drivers, max Wi-Fi perf.) + 2.4→5 GHz switch + TSE VM migration

## 📊 Results
- Wi-Fi coverage significantly improved
- Reliable access to the patient records application
- Aruba misconfigurations corrected
- Documented diagnostic protocol

## 🚀 Skills developed
Wi-Fi auditing, Aruba configuration, RF analysis, GPO, firewall administration, device management`,
    },
    image: "/projects/amelioration-wifi-hfb.svg",
    architectureDiagram: "/projects/amelioration-wifi-hfb-architecture.svg",
    technologies: ["Aruba", "Wi-Fi", "GPO", "Gestion de parc", "Site Survey", "Analyse RF"],
    category: "network",
    links: {},
    featured: false,
    date: "2024-05",
    metrics: [
      { icon: "Wifi", value: "100+", label: { fr: "Bornes Wi-Fi", en: "Wi-Fi access points" } },
    ],
    challenges: [
      {
        title: { fr: "Diagnostic multi-facteurs dans un environnement critique", en: "Multi-factor diagnosis in a critical environment" },
        problem: {
          fr: "Cinq causes potentielles à analyser sans pouvoir prendre de mesures perturbantes — c'est un hôpital où le personnel soignant utilise le Wi-Fi en continu. Impossible d'interrompre le service ou de modifier la configuration des bornes sans une analyse préalable rigoureuse.",
          en: "Five potential causes to analyse with no room for disruptive actions — it's a hospital where healthcare staff rely on Wi-Fi continuously. No service interruption or AP configuration change was possible without rigorous prior analysis.",
        },
        solution: {
          fr: "Approche progressive : commencer par les actions non perturbantes (tests de ping, mise à jour des drivers via GPO) avant d'intervenir sur la configuration Aruba. Les tests comparatifs (sur batterie vs sur secteur, PC-chariots vs portables) ont permis d'isoler les variables et de cibler les bonnes corrections.",
          en: "Progressive approach: start with non-disruptive actions (ping tests, GPO-based driver updates) before touching the Aruba configuration. Comparative tests (battery vs mains, PC-carts vs laptops) allowed isolating variables and targeting the right fixes.",
        },
      },
      {
        title: { fr: "Résolution progressive — GPO insuffisante seule", en: "Progressive resolution — GPO alone was insufficient" },
        problem: {
          fr: "Après le déploiement des GPO de mise à jour des drivers et d'optimisation de la carte Wi-Fi, l'amélioration n'était pas suffisante pour conclure le projet. Il fallait identifier et appliquer une correction supplémentaire.",
          en: "After deploying the driver update and Wi-Fi card optimisation GPOs, the improvement was not significant enough to close the project. An additional fix needed to be identified and applied.",
        },
        solution: {
          fr: "Les tests de roaming sur le terrain ont révélé des mauvaises configurations sur plusieurs bornes. La bascule de 2,4 GHz vers 5 GHz et l'ajustement du roaming Aruba ont produit l'amélioration significative finale. La migration de la VM TSE vers des serveurs plus proches a complété l'optimisation.",
          en: "On-site roaming tests revealed misconfigurations on several APs. Switching from 2.4 GHz to 5 GHz and tuning Aruba roaming settings produced the final significant improvement. Migrating the TSE server VM to closer servers completed the optimisation.",
        },
      },
    ],
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
      fr: `## 📋 Contexte du projet
Chez W3TEL, opérateur télécom, j'ai conçu un système de tokens pour filtrer automatiquement les numéros indésirables.

## 🎯 Objectifs
- Identifier et bloquer les numéros indésirables
- Intégrer la solution sans rupture de service
- Fournir une interface de gestion

## 🛠️ Technologies utilisées
Shell Script, pfSense, automatisation télécom

## 💡 Démarche
- Conception du mécanisme de tokens
- Scripts Shell pour la gestion automatisée
- Intégration à l'infrastructure existante + interface admin

## 📊 Résultats
- Filtrage automatisé opérationnel
- Gestion des tokens automatisée
- Aucun impact sur les communications légitimes

## 🚀 Compétences développées
Scripting Shell, automatisation, infrastructure télécom, sécurité des communications`,
      en: `## 📋 Project context
At W3TEL, a telecom operator, I designed a token system to automatically filter unwanted numbers.

## 🎯 Objectives
- Identify and block unwanted numbers
- Integrate the solution without service disruption
- Provide a management interface

## 🛠️ Technologies used
Shell Script, pfSense, telecom automation

## 💡 Approach
- Designed the token mechanism
- Shell scripts for automated management
- Integrated into existing infrastructure + admin interface

## 📊 Results
- Automated filtering operational
- Automated token management
- No impact on legitimate communications

## 🚀 Skills developed
Shell scripting, automation, telecom infrastructure, communications security`,
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
      fr: `## 📋 Contexte du projet
Lab personnel pour pratiquer les concepts DevSecOps : conteneurisation, orchestration et Infrastructure as Code.

## 🎯 Objectifs
- Déployer un cluster Kubernetes local
- Pipelines CI/CD avec scans de sécurité
- Pratiquer l'IaC (Terraform, Ansible)

## 🛠️ Technologies utilisées
Docker, Kubernetes, CI/CD, Terraform, Ansible

## 💡 Démarche
- Installation Docker + cluster Kubernetes
- Pipelines CI/CD avec scans de vulnérabilités automatisés
- Manifestes IaC (Terraform, Ansible)

## 📊 Résultats
- Lab fonctionnel et évolutif
- Pipelines sécurisés opérationnels
- Montée en compétence cloud-native/IaC

## 🚀 Compétences développées
Docker, Kubernetes, CI/CD, Terraform, Ansible, culture DevSecOps`,
      en: `## 📋 Project context
Personal lab to practice DevSecOps concepts: containerisation, orchestration and Infrastructure as Code.

## 🎯 Objectives
- Deploy a local Kubernetes cluster
- CI/CD pipelines with security scans
- Practice IaC (Terraform, Ansible)

## 🛠️ Technologies used
Docker, Kubernetes, CI/CD, Terraform, Ansible

## 💡 Approach
- Docker + local Kubernetes cluster setup
- CI/CD pipelines with automated vulnerability scans
- IaC manifests (Terraform, Ansible)

## 📊 Results
- Functional, scalable lab
- Secure pipelines operational
- Levelled up on cloud-native/IaC

## 🚀 Skills developed
Docker, Kubernetes, CI/CD, Terraform, Ansible, DevSecOps culture`,
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
