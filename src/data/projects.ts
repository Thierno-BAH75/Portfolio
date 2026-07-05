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
KISS, ESN spécialisée en infogérance, hébergement et cybersécurité, souhaitait moderniser et consolider son infrastructure interne. L'entreprise héberge des services critiques pour ses propres besoins et pour ceux de ses clients via KHosting, mais reposait jusqu'alors sur un réseau peu structuré et difficile à maintenir. Un datacenter interne sur 3 baies a été conçu et déployé de zéro dans ce contexte.

## 🎯 Objectifs
- Construire un datacenter interne robuste, sécurisé et évolutif sur 3 baies
- Séparer les environnements clients, production et préproduction via des VLANs dédiés
- Garantir la haute disponibilité réseau via des switches stackés et des LAGs
- Documenter intégralement l'architecture pour assurer la continuité opérationnelle

## 🛠️ Technologies utilisées
Switches Netgear stackés, liens SFP+ 10 Gb, LAGs (agrégation de ports), VLANs, pare-feu pfSense, serveurs Dell PowerEdge R6615, contrôleur PERC H330 Mini, RAID 10, NAS Synology, hyperviseurs Proxmox et Hyper-V.

## 💡 Démarche
Installation physique des baies, câblage structuré et brassage. Configuration des switches avec stacking (haute disponibilité, bascule automatique), mise en place des VLANs et des LAGs pour l'agrégation de bande passante. Installation des serveurs Dell avec ajout de RAM et SSD, configuration du RAID 10 via le contrôleur PERC H330 Mini, ports iDRAC configurés pour l'administration à distance. Installation et configuration des hyperviseurs Proxmox et Hyper-V, création des premières VMs de services. Rédaction d'une documentation technique complète de l'architecture.

## 📊 Résultats
- Architecture datacenter opérationnelle et documentée pour KISS et KHosting
- Haute disponibilité réseau assurée par le stacking des switches et bascule automatique
- Environnements cloisonnés : production, préproduction et clients hébergés bien isolés
- Infrastructure évolutive posant les bases d'une supervision et d'une gestion centralisée

## 🚀 Compétences développées
Conception d'architecture réseau, câblage structuré, administration de switches (VLANs, LAGs, stacking), configuration de serveurs Dell (RAID 10, iDRAC), virtualisation (Proxmox, Hyper-V), documentation technique d'infrastructure.`,
      en: `## 📋 Project context
KISS, an IT managed-services company specialising in hosting and cybersecurity, needed to modernise and consolidate its internal infrastructure. The company runs critical services both for its own operations and for its clients through KHosting, but was relying on an unstructured, hard-to-maintain network. A 3-rack in-house datacenter was designed and deployed from scratch.

## 🎯 Objectives
- Build a robust, secure, and scalable in-house datacenter across 3 racks
- Isolate client, production, and pre-production environments via dedicated VLANs
- Ensure network high availability with stacked switches and LAGs
- Fully document the architecture to ensure operational continuity

## 🛠️ Technologies used
Stacked Netgear switches, 10 Gb SFP+ links, LAGs (link aggregation), VLANs, pfSense firewall, Dell PowerEdge R6615 servers, PERC H330 Mini controller, RAID 10, Synology NAS, Proxmox and Hyper-V hypervisors.

## 💡 Approach
Physical rack installation, structured cabling and patch panel setup. Switch configuration with stacking (high availability, automatic failover), VLAN and LAG setup for bandwidth aggregation. Dell server installation with RAM and SSD upgrades, RAID 10 configuration via the PERC H330 Mini controller, iDRAC ports configured for remote management. Proxmox and Hyper-V installation and configuration, creation of first service VMs. Full technical architecture documentation written.

## 📊 Results
- Fully operational, documented datacenter for KISS and KHosting
- Network high availability ensured via switch stacking and automatic failover
- Isolated environments: production, pre-production and hosted clients properly segmented
- Scalable infrastructure laying the groundwork for centralised monitoring and management

## 🚀 Skills developed
Network architecture design, structured cabling, switch administration (VLANs, LAGs, stacking), Dell server configuration (RAID 10, iDRAC), virtualisation (Proxmox, Hyper-V), infrastructure technical documentation.`,
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
Face à un manque de visibilité sur l'état du SI de KISS, une solution de supervision centralisée a été déployée afin de détecter proactivement les incidents, de piloter les ressources et d'assurer la continuité de service. Cette solution devait couvrir l'ensemble du parc : serveurs Dell, switches, pare-feu et hyperviseurs.

## 🎯 Objectifs
- Centraliser la supervision de l'ensemble des équipements IT de KISS
- Déployer Zabbix en haute disponibilité pour garantir la continuité du monitoring
- Intégrer des alertes en temps réel (Slack, e-mail) pour accélérer la réponse aux incidents
- Visualiser l'état du SI via des tableaux de bord Grafana

## 🛠️ Technologies utilisées
Zabbix 7.2, Ubuntu Server 24.04, MySQL, NGINX, Zabbix Agent 2, cluster Zabbix HA, SNMP v2c, IPMI/iDRAC, Grafana, Slack (API OAuth), e-mail avec seuils anti-spam.

## 💡 Démarche
Déploiement de Zabbix 7.2 sur une VM dédiée (Ubuntu Server 24.04, 8 vCPU, 10 Go de RAM, 60 Go de SSD) avec la stack MySQL/NGINX/Zabbix Agent 2. Intégration des serveurs Dell via IPMI/iDRAC (santé disques, températures, alimentations, ventilateurs) et des switches et pare-feu via SNMP v2c (trafic, liens SFP+). Création de templates personnalisés et de triggers adaptés à chaque type d'équipement. Configuration d'un cluster Zabbix en haute disponibilité : en cas de défaillance d'un nœud, l'autre prend le relais automatiquement sans interruption. Intégration avec Grafana pour des visualisations avancées, et configuration d'alertes Slack (bot OAuth) et e-mail avec seuils pour éviter le spam.

## 📊 Résultats
- Supervision proactive couvrant l'ensemble du parc KISS (serveurs, switches, hyperviseurs, VMs)
- Continuité du monitoring garantie par le cluster HA
- Alertes en temps réel opérationnelles sur Slack et e-mail
- Tableaux de bord Grafana permettant un pilotage visuel de l'infrastructure

## 🚀 Compétences développées
Administration Linux, déploiement de solutions de supervision (Zabbix), intégration multi-protocoles (SNMP v2c, IPMI), mise en place de haute disponibilité, visualisation (Grafana), intégration d'alertes automatiques.`,
      en: `## 📋 Project context
Faced with a lack of visibility into KISS's IT estate, a centralised monitoring solution was deployed to proactively detect incidents, manage resources and ensure service continuity. The solution needed to cover the full infrastructure: Dell servers, switches, firewalls and hypervisors.

## 🎯 Objectives
- Centralise monitoring across all KISS IT equipment
- Deploy Zabbix with high availability to guarantee continuous monitoring
- Integrate real-time alerts (Slack, email) to speed up incident response
- Visualise the IT estate through Grafana dashboards

## 🛠️ Technologies used
Zabbix 7.2, Ubuntu Server 24.04, MySQL, NGINX, Zabbix Agent 2, Zabbix HA cluster, SNMP v2c, IPMI/iDRAC, Grafana, Slack (OAuth API), email with anti-spam thresholds.

## 💡 Approach
Deployed Zabbix 7.2 on a dedicated VM (Ubuntu Server 24.04, 8 vCPU, 10 GB RAM, 60 GB SSD) running a MySQL/NGINX/Zabbix Agent 2 stack. Integrated Dell servers via IPMI/iDRAC (disk health, temperatures, power supplies, fans) and switches/firewalls via SNMP v2c (traffic, SFP+ links). Created custom templates and triggers tailored to each device type. Set up a Zabbix HA cluster: if one node fails, the other takes over automatically with no interruption. Integrated Grafana for advanced visualisation and configured Slack (OAuth bot) and email alerts with thresholds to prevent notification spam.

## 📊 Results
- Proactive monitoring covering the full KISS estate (servers, switches, hypervisors, VMs)
- Continuous monitoring guaranteed by the HA cluster
- Real-time alerts operational on Slack and email
- Grafana dashboards enabling visual management of the infrastructure

## 🚀 Skills developed
Linux administration, monitoring solution deployment (Zabbix), multi-protocol integration (SNMP v2c, IPMI), high-availability setup, visualisation (Grafana), automated alerting.`,
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
Le datacenter interne de KISS héberge à la fois des environnements de production et un environnement de préproduction. Ce dernier a été conçu dans une démarche d'industrialisation : valider et fiabiliser les configurations avant toute bascule en production, pour KISS comme pour ses clients hébergés (KHosting), réduisant ainsi les risques d'incidents en production.

## 🎯 Objectifs
- Mettre en place un environnement de préproduction isolé de la production au sein des mêmes baies
- Permettre la validation des configurations et des déploiements dans des conditions proches du réel
- Réduire les risques en ajoutant une étape de validation structurée avant chaque mise en production

## 🛠️ Technologies utilisées
VLANs dédiés, switches Netgear stackés, hyperviseurs Proxmox et Hyper-V, NAS Synology, serveurs Dell PowerEdge R6615, contrôleur PERC H330, RAID 10.

## 💡 Démarche
Isolation de l'environnement de préproduction via des VLANs dédiés configurés sur les switches Netgear stackés, garantissant une séparation stricte avec la production. Provisionnement des ressources de stockage sur NAS Synology et volumes RAID 10 (serveurs Dell PowerEdge R6615, contrôleur PERC H330). Déploiement et configuration des hyperviseurs Proxmox et Hyper-V pour accueillir les VMs de test. Définition et documentation des procédures de bascule vers la production.

## 📊 Résultats
- Environnement de préproduction opérationnel et isolé de la production
- Déploiements validés avant mise en production, réduisant les risques d'incidents
- Base documentée pour des procédures de déploiement reproductibles et traçables

## 🚀 Compétences développées
Segmentation réseau (VLANs), virtualisation (Proxmox, Hyper-V), gestion du stockage (NAS Synology, RAID 10), conception et documentation de procédures de déploiement.`,
      en: `## 📋 Project context
KISS's in-house datacenter hosts both production and pre-production environments. The pre-production environment was built as part of a deployment industrialisation initiative: validating and hardening configurations before going live — for KISS and its hosted clients (KHosting) — to reduce the risk of production incidents.

## 🎯 Objectives
- Set up a pre-production environment isolated from production within the same racks
- Enable configuration and deployment validation under near-real conditions
- Reduce risk by adding a structured validation step before every production deployment

## 🛠️ Technologies used
Dedicated VLANs, stacked Netgear switches, Proxmox and Hyper-V hypervisors, Synology NAS, Dell PowerEdge R6615 servers, PERC H330 controller, RAID 10.

## 💡 Approach
Isolated the pre-production environment via dedicated VLANs on stacked Netgear switches, ensuring strict separation from production. Provisioned storage resources on a Synology NAS and RAID 10 volumes (Dell PowerEdge R6615 servers, PERC H330 controller). Deployed and configured Proxmox and Hyper-V hypervisors to host test VMs. Defined and documented deployment-to-production procedures.

## 📊 Results
- Pre-production environment operational and isolated from production
- Deployments validated before go-live, reducing the risk of production incidents
- Documented baseline for reproducible and auditable deployment procedures

## 🚀 Skills developed
Network segmentation (VLANs), virtualisation (Proxmox, Hyper-V), storage management (Synology NAS, RAID 10), deployment procedure design and documentation.`,
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
L'Hôpital Franco-Britannique (270+ lits, environ 700 professionnels de santé) a engagé une restructuration de son SI dans un contexte de fusion de sites et de montée en puissance des cyberattaques visant les établissements de santé. J'ai contribué à l'administration et à la sécurisation de l'infrastructure IT au quotidien sur cette période.

## 🎯 Objectifs
- Administrer et sécuriser l'Active Directory (comptes, équipements, GPO)
- Configurer les règles de filtrage réseau conformes aux exigences de sécurité
- Déployer et maintenir une messagerie d'entreprise à grande échelle
- Industrialiser la gestion du parc informatique (masterisation, déploiement centralisé)
- Assurer la conformité RGPD propre au secteur de la santé

## 🛠️ Technologies utilisées
Pare-feux de nouvelle génération (NGFW) en cluster HA, Active Directory, GPO, messagerie d'entreprise, solution de gestion de parc centralisée, Sysprep, réseau Wi-Fi Aruba.

## 💡 Démarche
Configuration des ACL et des règles de filtrage sur les pare-feux de nouvelle génération en cluster. Administration Active Directory : gestion des comptes utilisateurs, des objets ordinateurs, des lecteurs réseau et des réservations DHCP. Déploiement et administration de la messagerie d'entreprise à grande échelle. Création et application de GPO pour l'automatisation et la sécurisation des postes. Masterisation des postes via Sysprep et déploiement centralisé sur un parc de plusieurs centaines d'équipements. Ensemble des actions menées dans le strict respect des exigences RGPD propres au secteur de la santé.

## 📊 Résultats
- Infrastructure IT administrée et sécurisée au quotidien dans un environnement hospitalier critique
- Conformité RGPD assurée sur la gestion des accès et des postes utilisateurs
- Déploiement centralisé opérationnel, permettant des mises à jour et masterisations reproductibles
- Règles de sécurité réseau appliquées, documentées et maintenues

## 🚀 Compétences développées
Administration Active Directory, politique de groupe (GPO), sécurisation réseau (ACL, NGFW), gestion de parc (masterisation Sysprep, déploiement centralisé), conformité RGPD en environnement de santé.`,
      en: `## 📋 Project context
The Hôpital Franco-Britannique (270+ beds, around 700 healthcare staff) launched a full IT restructuring driven by site mergers and the growing wave of cyberattacks targeting healthcare organisations. I contributed to the day-to-day administration and security of the IT infrastructure during this period.

## 🎯 Objectives
- Administer and secure Active Directory (accounts, devices, GPOs)
- Configure network filtering rules in line with security requirements
- Deploy and maintain enterprise-scale email
- Industrialise device management (Sysprep masterisation, centralised deployment)
- Ensure GDPR compliance specific to the healthcare sector

## 🛠️ Technologies used
Next-generation firewalls (NGFW) in HA cluster, Active Directory, GPOs, enterprise email, centralised device management solution, Sysprep, Aruba Wi-Fi network.

## 💡 Approach
Configured ACLs and filtering rules on next-generation firewalls in an HA cluster. Active Directory administration: managed user accounts, computer objects, network drives and DHCP reservations. Deployed and administered enterprise-scale email. Created and applied GPOs to automate and harden workstations. Masterised devices with Sysprep and rolled them out centrally across a fleet of several hundred endpoints. All actions carried out in strict compliance with GDPR requirements specific to the healthcare sector.

## 📊 Results
- IT infrastructure administered and secured day-to-day in a critical hospital environment
- GDPR compliance ensured across access management and user workstations
- Centralised deployment operational, enabling reproducible updates and masterisations
- Network security rules applied, documented and maintained

## 🚀 Skills developed
Active Directory administration, Group Policy (GPO), network security (ACL, NGFW), device management (Sysprep masterisation, centralised deployment), GDPR compliance in a healthcare setting.`,
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
Chez KISS, les impressions étaient gérées de façon non consolidée : absence de suivi centralisé, de traçabilité et de maîtrise des flux documentaires. Dans un contexte d'infogérance où la confidentialité des documents est un enjeu opérationnel, une solution d'impression centralisée s'imposait.

## 🎯 Objectifs
- Centraliser la gestion de toutes les impressions sur un serveur dédié
- Assurer la traçabilité complète des documents imprimés
- Maîtriser les flux d'impression et renforcer la confidentialité documentaire au sein de KISS

## 🛠️ Technologies utilisées
SavaPage (gestionnaire d'impression open-source), Windows Server, Hyper-V, Active Directory.

## 💡 Démarche
Analyse du besoin et sélection de SavaPage comme solution d'impression centralisée. Déploiement sur une VM Windows Server hébergée sous Hyper-V. Intégration avec Active Directory pour la gestion des utilisateurs et des droits d'impression. Configuration des files d'impression et des politiques d'accès. Tests de validation avant mise en production.

## 📊 Résultats
- Gestion des impressions centralisée et traçable sur l'ensemble du parc KISS
- Confidentialité renforcée par la maîtrise des flux documentaires
- Solution hébergée en interne, sans dépendance à un service externe d'impression

## 🚀 Compétences développées
Administration Windows Server, déploiement de services métier (SavaPage), intégration Active Directory, virtualisation (Hyper-V), gestion des politiques d'impression.`,
      en: `## 📋 Project context
At KISS, printing was managed in a fragmented way: no centralised tracking, no traceability and no control over document flows. In a managed-services context where document confidentiality is an operational concern, a centralised print management solution was needed.

## 🎯 Objectives
- Centralise all print management on a dedicated server
- Ensure full traceability of printed documents
- Control print flows and strengthen document confidentiality across KISS

## 🛠️ Technologies used
SavaPage (open-source print management), Windows Server, Hyper-V, Active Directory.

## 💡 Approach
Analysed the requirement and selected SavaPage as the centralised print management solution. Deployed on a Windows Server VM hosted on Hyper-V. Integrated with Active Directory for user and print rights management. Configured print queues and access policies. Validated the setup before going live.

## 📊 Results
- Centralised, traceable print management across the KISS fleet
- Improved confidentiality through controlled document flows
- Internally hosted solution with no dependency on an external print service

## 🚀 Skills developed
Windows Server administration, business service deployment (SavaPage), Active Directory integration, virtualisation (Hyper-V), print policy management.`,
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
Projet d'entraînement personnel réalisé pour un client fictif (« Stadium Company »), visant à concevoir et déployer de bout en bout une infrastructure IT d'entreprise complète. L'objectif était de simuler un cahier des charges réel — haute disponibilité, sécurité renforcée, services d'annuaire et de messagerie — pour consolider les compétences acquises en formation.

## 🎯 Objectifs
- Concevoir une architecture réseau redondante avec segmentation par VLANs
- Déployer la virtualisation et les services d'annuaire (Active Directory)
- Configurer la messagerie d'entreprise (Exchange)
- Appliquer des politiques de sécurité conformes aux standards de l'industrie

## 🛠️ Technologies utilisées
VMware, Active Directory, Exchange, VLANs, pare-feu NGFW.

## 💡 Démarche
Définition du cahier des charges et conception du schéma d'architecture réseau. Déploiement de la plateforme de virtualisation VMware, installation et configuration d'Active Directory. Mise en place d'Exchange pour la messagerie interne. Configuration du pare-feu NGFW et des VLANs. Application des GPO et des règles de sécurité. Tests de validation de la redondance et des services.

## 📊 Résultats
- Infrastructure IT complète opérationnelle pour un client fictif
- Architecture redondante avec services d'annuaire et de messagerie configurés et validés
- Consolidation des compétences en conception d'infrastructure d'entreprise

## 🚀 Compétences développées
Architecture réseau, virtualisation (VMware), administration Active Directory, Exchange, sécurité périmétrique (NGFW, VLANs), conception d'infrastructure d'entreprise.`,
      en: `## 📋 Project context
A personal training project carried out for a fictional client ("Stadium Company"), aimed at end-to-end design and deployment of a complete corporate IT infrastructure. The goal was to simulate a real specification — high availability, hardened security, directory and email services — to consolidate skills learned in training.

## 🎯 Objectives
- Design a redundant network architecture with VLAN segmentation
- Deploy virtualisation and directory services (Active Directory)
- Configure corporate email (Exchange)
- Apply security policies in line with industry standards

## 🛠️ Technologies used
VMware, Active Directory, Exchange, VLANs, NGFW firewall.

## 💡 Approach
Defined the specification and designed the network architecture diagram. Deployed the VMware virtualisation platform, installed and configured Active Directory. Set up Exchange for internal email. Configured the NGFW firewall and VLANs. Applied GPOs and security rules. Validated redundancy and services.

## 📊 Results
- Complete, operational IT infrastructure for a fictional client
- Redundant architecture with directory and email services configured and validated
- Consolidated skills in corporate infrastructure design

## 🚀 Skills developed
Network architecture, virtualisation (VMware), Active Directory administration, Exchange, perimeter security (NGFW, VLANs), corporate infrastructure design.`,
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
L'Hôpital Franco-Britannique rencontrait depuis 2020 des problèmes chroniques de couverture Wi-Fi affectant directement le personnel soignant, qui se connectait en Wi-Fi aux serveurs TSE (bureau à distance) pour accéder à l'application métier de gestion des dossiers patients. Coupures, freezes et latences pénalisaient le travail quotidien des infirmières lors de leurs tournées. Il était impératif de résoudre ce problème sans interrompre les services de soins.

## 🎯 Objectifs
- Diagnostiquer la ou les causes réelles des problèmes de couverture Wi-Fi
- Améliorer la stabilité et la qualité du signal sans perturber les services hospitaliers
- Garantir un accès fiable au serveur TSE depuis toutes les zones de soins

## 🛠️ Technologies utilisées
Bornes et contrôleurs Wi-Fi Aruba, GPO, solution de gestion de parc centralisée, pare-feu (règles ACL), serveur TSE, analyse RF.

## 💡 Diagnostic et résolution
Identification de cinq facteurs possibles à l'origine des problèmes : configuration des contrôleurs et bornes Aruba, règles de flux, positionnement des bornes, drivers Wi-Fi, architecture réseau. Tests de ping comparatifs sur différents modèles de PC (PC-chariots Decide Life vs. PC portables HP) sous batterie et sur secteur : les PC sur batterie présentaient des temps de réponse dégradés. Tests de roaming borne par borne sur le terrain : découverte de mauvaises configurations sur plusieurs bornes. Déploiement de GPO pour mettre à jour les drivers Wi-Fi et activer les performances maximales de la carte réseau. Vérification des règles ACL sur le pare-feu. Bascule des bornes concernées de 2,4 GHz vers 5 GHz et ajustement du roaming : amélioration significative constatée. Migration de la VM du serveur TSE vers des serveurs physiquement plus proches pour optimiser la latence.

## 📊 Résultats
- Amélioration significative de la couverture Wi-Fi constatée après les modifications
- Personnel soignant en mesure d'accéder à l'application métier sans interruptions répétées
- Mauvaises configurations Aruba identifiées et corrigées
- Protocole de diagnostic documenté et réutilisable pour les interventions futures

## 🚀 Compétences développées
Audit et diagnostic Wi-Fi, configuration de contrôleurs Aruba, analyse RF, GPO, administration de pare-feu (ACL), gestion de parc, résolution méthodique d'incidents complexes en environnement critique.`,
      en: `## 📋 Project context
The Hôpital Franco-Britannique had been experiencing chronic Wi-Fi coverage issues since 2020, directly affecting healthcare staff who connect over Wi-Fi to TSE remote-desktop servers to use the patient records management application. Dropouts, freezes and latency were disrupting nurses' day-to-day rounds. The issue had to be resolved without interrupting patient care services.

## 🎯 Objectives
- Diagnose the actual root cause(s) of the Wi-Fi coverage issues
- Improve signal stability and quality without disrupting hospital services
- Ensure reliable access to the TSE server from all care areas

## 🛠️ Technologies used
Aruba Wi-Fi access points and controllers, GPOs, centralised device management solution, firewall (ACL rules), TSE server, RF analysis.

## 💡 Diagnosis and resolution
Identified five potential root causes: Aruba controller/AP configuration, flow rules, AP positioning, Wi-Fi drivers, network architecture. Comparative ping tests on different PC types (Decide Life PC-carts vs HP laptops) on battery vs mains power: battery-powered laptops showed degraded response times. On-site roaming tests at each AP: discovered misconfigurations on several access points. Deployed GPOs to update Wi-Fi drivers and enable maximum wireless card performance. Checked ACL rules on the firewall. Switched affected APs from 2.4 GHz to 5 GHz and tuned roaming settings: significant improvement observed. Migrated the TSE server VM to physically closer servers to reduce latency.

## 📊 Results
- Significant Wi-Fi coverage improvement observed after the changes
- Healthcare staff able to access the patient records application without repeated interruptions
- Aruba misconfigurations identified and corrected
- Documented diagnostic protocol available for future interventions

## 🚀 Skills developed
Wi-Fi auditing and diagnosis, Aruba controller configuration, RF analysis, GPO, firewall administration (ACL), device management, methodical complex incident resolution in a critical environment.`,
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
Dans le cadre d'un stage chez W3TEL, opérateur télécom, j'ai été mobilisé sur la conception d'un système de protection contre les appels et communications indésirables. L'enjeu était de filtrer automatiquement les numéros malveillants sans impacter la qualité de service pour les utilisateurs légitimes.

## 🎯 Objectifs
- Identifier et bloquer les numéros indésirables de façon automatisée
- Intégrer la solution dans l'infrastructure télécom existante sans rupture de service
- Fournir une interface de gestion aux administrateurs

## 🛠️ Technologies utilisées
Shell Script, pfSense, outils d'automatisation télécom.

## 💡 Démarche
Analyse du besoin et conception du mécanisme de tokens pour identifier les sources indésirables. Développement de scripts Shell pour automatiser la gestion et le renouvellement des tokens. Intégration avec l'infrastructure télécom existante et tests de validation. Mise en place d'une interface de gestion pour les opérateurs.

## 📊 Résultats
- Système de filtrage automatisé opérationnel pour la détection des numéros indésirables
- Processus de gestion des tokens automatisé, réduisant les interventions manuelles
- Solution intégrée dans l'existant sans impact sur les communications légitimes

## 🚀 Compétences développées
Scripting Shell, automatisation, infrastructure télécom, intégration système, sécurité des communications.`,
      en: `## 📋 Project context
During an internship at W3TEL, a telecom operator, I worked on designing a protection system against unwanted calls and communications. The goal was to automatically filter malicious numbers without impacting service quality for legitimate users.

## 🎯 Objectives
- Identify and block unwanted numbers in an automated way
- Integrate the solution into the existing telecom infrastructure without service disruption
- Provide a management interface for administrators

## 🛠️ Technologies used
Shell Script, pfSense, telecom automation tools.

## 💡 Approach
Analysed the requirement and designed the token mechanism to identify unwanted sources. Developed shell scripts to automate token management and renewal. Integrated with the existing telecom infrastructure and ran validation tests. Set up a management interface for operators.

## 📊 Results
- Automated filtering system operational for detecting unwanted numbers
- Token management process automated, reducing manual interventions
- Solution integrated into the existing stack without impacting legitimate communications

## 🚀 Skills developed
Shell scripting, automation, telecom infrastructure, system integration, communications security.`,
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
Mise en place d'un laboratoire personnel pour pratiquer et approfondir les concepts DevSecOps : conteneurisation, orchestration, Infrastructure as Code et intégration de la sécurité dans les pipelines CI/CD. Ce lab sert d'environnement d'expérimentation en complément de la formation et des expériences professionnelles.

## 🎯 Objectifs
- Déployer et administrer un cluster Kubernetes local
- Mettre en place des pipelines CI/CD avec intégration de contrôles de sécurité
- Automatiser les scans de vulnérabilités
- Pratiquer l'Infrastructure as Code (Terraform, Ansible)

## 🛠️ Technologies utilisées
Docker, Kubernetes, pipelines CI/CD, Terraform, Ansible.

## 💡 Démarche
Installation et configuration de Docker et d'un cluster Kubernetes local. Déploiement de pipelines CI/CD avec intégration de scans de vulnérabilités automatisés à chaque étape. Rédaction de manifestes d'Infrastructure as Code (Terraform pour le provisionnement, Ansible pour la configuration). Expérimentation avec différents patterns de déploiement et de sécurisation des workloads.

## 📊 Résultats
- Environnement de lab fonctionnel et évolutif pour la pratique DevSecOps
- Pipelines CI/CD sécurisés avec scans automatisés opérationnels
- Montée en compétence sur l'écosystème cloud-native et l'IaC

## 🚀 Compétences développées
Conteneurisation (Docker), orchestration (Kubernetes), CI/CD, Infrastructure as Code (Terraform, Ansible), sécurité des pipelines, culture DevSecOps.`,
      en: `## 📋 Project context
Set up a personal lab to practice and deepen DevSecOps concepts: containerisation, orchestration, Infrastructure as Code and integrating security into CI/CD pipelines. This lab serves as an experimentation environment alongside formal training and professional experience.

## 🎯 Objectives
- Deploy and administer a local Kubernetes cluster
- Set up CI/CD pipelines with integrated security controls
- Automate vulnerability scanning
- Practice Infrastructure as Code (Terraform, Ansible)

## 🛠️ Technologies used
Docker, Kubernetes, CI/CD pipelines, Terraform, Ansible.

## 💡 Approach
Installed and configured Docker and a local Kubernetes cluster. Deployed CI/CD pipelines with automated vulnerability scans integrated at each stage. Wrote Infrastructure as Code manifests (Terraform for provisioning, Ansible for configuration). Experimented with different deployment and workload security patterns.

## 📊 Results
- Functional, scalable lab environment for hands-on DevSecOps practice
- Secure CI/CD pipelines with automated scanning operational
- Levelled up on the cloud-native ecosystem and IaC

## 🚀 Skills developed
Containerisation (Docker), orchestration (Kubernetes), CI/CD, Infrastructure as Code (Terraform, Ansible), pipeline security, DevSecOps culture.`,
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
