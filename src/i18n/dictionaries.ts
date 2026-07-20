import type { Locale } from "@/types";

// ============================================================
// Dictionnaire UI — le français est la source de vérité.
// `en` est contraint par le type dérivé de `fr` : une clé
// manquante ou en trop est une erreur de compilation.
// ============================================================

const fr = {
  langSwitch: "Changer de langue",
  // Bouton de retour partagé par les pages standalone (Certifications,
  // Veille, Outils, Projets) — même pattern que projects.detail.back.
  backToHome: "Retour à l'accueil",
  // Titres d'onglet par route — le serveur rend toujours les <title> FR ;
  // LanguageSync (i18n/index.tsx) les remplace côté client quand EN est actif.
  meta: {
    home: "Thierno BAH | Ingénieur Sécurité Réseau & Système",
    projects: "Projets | Thierno BAH",
    certifications: "Certifications | Thierno BAH",
    outils: "Outils cybersécurité | Thierno BAH",
    veille: "Veille techno | Thierno BAH",
  },
  header: {
    availableShort: "Disponible",
    availableFull: "Disponible · Alternance",
    contact: "Me contacter",
    login: "Connexion",
  },
  hero: {
    titles: [
      "Ingénieur Sécurité Réseau & Système",
      "Administrateur Infrastructure",
      "Spécialiste Supervision & Automatisation",
    ],
    viewProjects: "Voir mes projets",
    contact: "Me contacter",
    scroll: "Scroll",
  },
  about: {
    title: "À propos",
    p1: "Ingénieur Systèmes & Réseaux (Bac+4 validé), j'ai deux ans d'expérience en environnements critiques — hôpital et infogérance IT — où la disponibilité et la sécurité ne se négocient pas.",
    p2: "Je conçois, administre et sécurise des infrastructures complexes, avec un goût particulier pour :",
    bullets: [
      "Déploiement réseau multi-sites",
      "Supervision & monitoring",
      "Sécurisation des accès (PAM, firewall)",
      "Automatisation",
    ],
    p3: "Je recherche une alternance pour finaliser mon Master IRS option Cybersécurité, dès septembre 2026.",
    locationLabel: "Localisation",
    locationValue: "Paris, France",
    emailLabel: "E-mail",
    phoneLabel: "Téléphone",
    downloadCv: "Télécharger mon CV",
    contact: "Me contacter",
    profile: {
      title: "Profil en bref",
      status: "Statut",
      statusValue: "Recherche alternance",
      availability: "Disponibilité",
      availabilityValue: "Septembre 2026",
      rhythm: "Rythme",
      rhythmValue: "3 sem. entreprise / 1 sem. école",
      location: "Localisation",
      locationValue: "Paris & Île-de-France",
      mobility: "Mobilité",
      mobilityValue: "Permis B",
      english: "Anglais",
      englishValue: "B2",
      certifications: "Certifications",
    },
  },
  skills: {
    eyebrow: "Stack technique",
    titleStart: "Mon expertise",
    titleGradient: "technique",
    subtitle:
      "Les technologies et outils que je maîtrise pour sécuriser et administrer vos infrastructures.",
    stats: {
      projects: "Projets réalisés",
      certifications: "Certifications",
      years: "Années d'expérience",
      technologies: "Technologies maîtrisées",
    },
    categories: {
      security: "Sécurité",
      network: "Réseaux",
      systems: "Systèmes",
      cloud: "Cloud & DevSecOps",
      tools: "Supervision",
      scripting: "Scripting",
    },
    proof: {
      usedAt: "Utilisé chez",
      certified: "Certifié",
    },
    learning: {
      title: "En cours d'apprentissage",
      hint: "Compétences en construction — volontairement séparées de celles que je maîtrise.",
    },
    terminal: {
      title: "thierno@portfolio:~/api",
      online: "API en ligne",
      endpointsLabel: "Endpoints publics",
      copy: "Copier le JSON",
      copied: "Copié !",
      welcome1: "Bienvenue dans le terminal du portfolio.",
      welcome2: "Cliquez sur un endpoint ci-dessus ou tapez 'help'.",
      placeholder: "Tapez une commande… (help)",
      inputLabel: "Ligne de commande du terminal",
      notFound: "commande introuvable :",
      notFoundHint: "essayez 'help'",
      fetchError: "erreur : impossible de joindre l'API",
      contactHint: "Formulaire complet dans la section Contact ci-dessous.",
      help: [
        "skills [catégorie]    compétences (security, network, systems, cloud, tools, scripting, all)",
        "certifications        liste des certifications",
        "contact               coordonnées",
        "projects              projets mis en avant",
        "clear                 efface le terminal",
        "help                  cette aide",
      ],
    },
  },
  projects: {
    title: "Mes Projets",
    sectionSubtitle:
      "Une sélection de mes meilleurs projets en sécurité réseau et administration système.",
    viewAll: "Voir tous les projets",
    details: "Détails",
    viewProject: "Voir le projet",
    featured: "Mis en avant",
    categories: {
      security: "Sécurité",
      infrastructure: "Infrastructure",
      monitoring: "Supervision",
      network: "Réseaux",
      cloud: "Cloud",
      automation: "Automation",
    },
    page: {
      subtitle:
        "Réalisations en sécurité réseau, infrastructure et supervision de systèmes.",
      searchPlaceholder: "Rechercher un projet...",
      filters: "Filtres :",
      allCategories: "Toutes les catégories",
      sortFeatured: "⭐ Favoris",
      sortRecent: "Plus récent",
      sortName: "Nom (A-Z)",
      found: "projet trouvé",
      foundPlural: "projets trouvés",
      none: "Aucun projet trouvé.",
      techGroups: {
        network: "Réseau",
        system: "Système",
        monitoring: "Supervision",
        security: "Sécurité",
        automation: "Automatisation",
      },
    },
    panel: {
      close: "Fermer",
      viewCase: "Voir l'étude complète",
    },
    detail: {
      back: "Retour aux projets",
      about: "À propos du projet",
      technologies: "Technologies utilisées",
      featuredBadge: "Projet vedette",
      previous: "Projet précédent",
      next: "Projet suivant",
      viewSite: "Voir le site",
      sourceCode: "Code source",
      metrics: "Résultats chiffrés",
      architecture: "Schéma d'architecture",
      challenges: "Défis rencontrés",
      challengeProblem: "Le défi",
      challengeSolution: "Comment je l'ai résolu",
    },
  },
  experience: {
    eyebrow: "Formation & Expérience",
    titleStart: "Mon",
    titleGradient: "parcours",
    subtitle:
      "Formation académique d'un côté, expérience professionnelle de l'autre — deux fils d'un même parcours.",
    school: "Scolaire",
    professional: "Professionnel",
    certifications: "Certifications",
    present: "Présent",
    current: "Actuel",
    seeMore: "Voir plus",
    seeLess: "Voir moins",
    status: {
      validated: "Validé",
      ongoing: "En cours",
      admitted: "Admis",
    },
    types: {
      fulltime: "CDI",
      parttime: "Temps partiel",
      freelance: "Freelance",
      internship: "Stage",
      apprenticeship: "Alternance",
      contract: "CDD",
    },
    seekingPlaceholder: "Recherche d'alternance en cours",
  },
  certifications: {
    eyebrow: "Certifications",
    titleStart: "Mes",
    titleGradient: "certifications",
    subtitle:
      "Les certifications qui valident mes compétences en réseaux, systèmes et cybersécurité.",
    obtainedOn: "Obtenue",
    expiresOn: "Expire",
    viewAll: "Voir toutes mes certifications",
    viewCertificate: "Voir certification",
    verifyOnline: "Vérifier en ligne",
    viewer: {
      close: "Fermer",
      openInNewTab: "Ouvrir le document",
      previewUnavailable:
        "Aperçu non disponible pour ce document — ouvrez-le dans un nouvel onglet.",
    },
  },
  contact: {
    eyebrow: "Contact",
    titleStart: "Travaillons",
    titleGradient: "ensemble",
    subtitle:
      "Vous avez un projet en tête ? N'hésitez pas à me contacter. Je serai ravi de discuter de vos idées.",
    emailLabel: "Email",
    quickTitle: "Contact rapide",
    quickAvailability: "Disponible dès septembre 2026",
    responseTime: "Prêt à en discuter dès maintenant",
    form: {
      firstName: "Prénom",
      firstNamePlaceholder: "Votre prénom",
      lastName: "Nom",
      lastNamePlaceholder: "Votre nom",
      email: "Email",
      emailPlaceholder: "votre@email.com",
      subject: "Sujet",
      subjectPlaceholder: "Le sujet de votre message",
      message: "Message",
      messagePlaceholder: "Décrivez votre projet ou votre message...",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      successTitle: "Message envoyé !",
      successText:
        "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
      errorTitle: "Une erreur est survenue",
      errorText:
        "Impossible d'envoyer le message pour le moment. Réessayez plus tard ou écrivez-moi directement par email.",
    },
    errors: {
      firstName: "Le prénom doit contenir au moins 2 caractères",
      lastName: "Le nom doit contenir au moins 2 caractères",
      email: "Email invalide",
      subject: "Le sujet doit contenir au moins 5 caractères",
      message: "Le message doit contenir au moins 10 caractères",
    },
  },
  footer: {
    navigation: "Navigation",
    explore: "Explorer",
    keywords: "Réseaux • Cybersécurité • Cloud",
    rights: "Tous droits réservés.",
  },
  veille: {
    title: "Veille Techno",
    subtitleIntro:
      "Actualités, vulnérabilités et menaces en temps réel dans les domaines",
    and: "et",
    domainSecurity: "Cybersécurité",
    domainNetworks: "Réseaux",
    domainInfra: "Infrastructure",
    searchPlaceholder: "Rechercher un article, une vulnérabilité, un outil...",
    refresh: "Actualiser",
    article: "article",
    articles: "articles",
    newSingular: "nouvel article disponible",
    newPlural: "nouveaux articles disponibles",
    error:
      "Impossible de récupérer les flux RSS. Vérifiez votre connexion ou réessayez.",
    emptyTitle: "Aucun article trouvé",
    emptyHint: "Modifiez vos filtres ou actualisez les flux.",
    justNow: "à l'instant",
    oneMinAgo: "il y a 1 min",
    minutesAgoPrefix: "il y a ",
    minutesAgoSuffix: " min",
    readSource: "Lire la source",
    domains: {
      all: "Tous les domaines",
      cyber: "Cybersécurité",
      network: "Réseaux & Infrastructure",
      cloud: "Cloud & DevSecOps",
      system: "Système & Linux",
    },
    allSources: "Toutes les sources",
    sourcesNote:
      "Sources : ANSSI · Krebs on Security · The Hacker News · SANS ISC · Cisco Blog · Cloudflare · AWS Security · Microsoft Azure · Red Hat — flux RSS mis à jour toutes les 5 min",
  },
  chat: {
    title: "Assistant IA",
    online: "En ligne",
    openLabel: "Ouvrir l'assistant IA",
    closeLabel: "Fermer l'assistant",
    expandLabel: "Agrandir",
    minimizeLabel: "Réduire",
    welcome:
      "Bonjour ! Je suis l'assistant de Thierno. Posez-moi vos questions sur son profil, ses compétences, ses projets et sa disponibilité — ou demandez-moi un conseil général de cybersécurité, de réseau ou de systèmes.",
    placeholder: "Posez une question sur Thierno...",
    send: "Envoyer",
    typing: "écrit...",
    error: "Assistant momentanément indisponible",
    quickQuestions: [
      "Quelles sont ses compétences clés ?",
      "Est-il disponible en alternance ?",
      "Comment me protéger du phishing ?",
      "Parle-moi de ses projets",
      "Comment sécuriser mon réseau Wi-Fi ?",
      "Comment le contacter ?",
      "Quelles certifications a-t-il ?",
      "Où a-t-il fait ses stages ?",
      "Quel est son parcours scolaire ?",
      "Quelle est sa stack technique ?",
    ],
  },
  tools: {
    eyebrow: "Cybersécurité pratique",
    titleStart: "Mini-outils",
    titleGradient: "réseau & sécurité",
    subtitle:
      "Une boîte à outils pédagogique — démonstrations et simulations 100% côté client, sans jamais cibler un domaine tiers.",
    badges: {
      live: "Analyse réelle",
      simulation: "Simulation",
      reference: "Référence",
      interactive: "Interactif",
      educational: "Pédagogique",
    },
    common: {
      fetchError: "Erreur : impossible de récupérer les données.",
      ownDomainOnly:
        "Vous avez saisi « {domain} » : cet outil analyse uniquement mon propre site en démonstration. Pour un vrai scan de ce domaine, utilisez",
      analyzeMine: "Analyser {domain} à la place",
      useCasesLabel: "Cas d'usage",
      contextLabel: "Contexte professionnel",
      remediationLabel: "Remédiation :",
      severity: {
        critical: "Critique",
        high: "Élevée",
        medium: "Moyenne",
        low: "Faible",
      },
    },
    cards: {
      securityHeaders: {
        title: "Analyseur d'en-têtes de sécurité HTTP",
        description: "Analyse en direct des en-têtes de sécurité de ce site (CSP, HSTS, etc.).",
      },
      sslChecker: {
        title: "Testeur SSL/TLS",
        description: "Démonstration pédagogique de ce que vérifierait un vrai testeur TLS.",
      },
      portScan: {
        title: "Simulateur de scan de ports",
        description: "Simulation éducative façon Nmap — aucune requête réseau réelle.",
      },
      burpReference: {
        title: "Burp Suite",
        description: "Fiche de présentation de l'outil de test d'intrusion web.",
      },
      riskCalculator: {
        title: "Calculateur de risques cybersécurité",
        description: "Score de risque agrégé à partir de 4 curseurs, calcul 100% côté client.",
      },
      vulnDatabase: {
        title: "Base de connaissances vulnérabilités critiques",
        description: "Fiches informatives sur des CVE majeures et connues du grand public.",
      },
      phishing: {
        title: "Simulateur de sensibilisation au phishing",
        description: "Génère des scénarios fictifs d'emails de phishing avec red flags expliqués.",
      },
      dataLeak: {
        title: "Vérificateur de fuites de données",
        description: "Simulation éducative basée sur un jeu de données fixe — aucune vraie API.",
      },
      wiresharkReference: {
        title: "Wireshark",
        description: "Fiche de présentation de l'analyseur de protocoles réseau.",
      },
      subnetCalculator: {
        title: "Calculateur de sous-réseaux",
        description: "IP + masque → adresse réseau, broadcast, plage d'hôtes utilisables.",
      },
      addressConverter: {
        title: "Convertisseur d'adresses",
        description: "Conversion simultanée décimal / binaire / hexadécimal, dans les deux sens.",
      },
      portLookup: {
        title: "Lookup de ports courants",
        description: "Recherche par numéro ou nom de service : protocole et usage.",
      },
      bandwidthCalculator: {
        title: "Calculateur de bande passante",
        description: "Taille de fichier + vitesse → temps de transfert estimé.",
      },
      passwordStrength: {
        title: "Analyseur de force de mot de passe",
        description: "Entropie et temps de cassage estimé, calcul 100% local.",
      },
      hashGenerator: {
        title: "Générateur de hash",
        description: "MD5, SHA-1, SHA-256, SHA-512 à partir d'un texte, calcul local.",
      },
      passwordGenerator: {
        title: "Générateur de mot de passe sécurisé",
        description: "Options personnalisables, génération cryptographiquement sûre.",
      },
      base64Codec: {
        title: "Encodeur / décodeur Base64",
        description: "Conversion texte ↔ Base64 dans les deux sens, en direct.",
      },
      raidCalculator: {
        title: "Calculateur RAID",
        description: "Type, disques et taille → capacité utile et tolérance de panne.",
      },
      cronCalculator: {
        title: "Calculateur CRON",
        description: "Expression cron → explication en clair et prochaines exécutions.",
      },
    },
    securityHeaders: {
      intro:
        "Analyse en direct des en-têtes de sécurité HTTP renvoyés par ce site, via une route API serveur qui ne peut cibler que son propre domaine.",
      analyze: "Analyser",
      statsStatusLabel: "Statut HTTP",
      statsPresentLabel: "En-têtes présents",
      statsMissingLabel: "Manquants",
      sectionPresentTitle: "Déjà en place",
      sectionMissingTitle: "À corriger",
      missingRemediation: "Ajoutez cet en-tête à la configuration de votre serveur.",
      headerInfo: {
        "content-security-policy":
          "Restreint les sources de scripts, styles et ressources autorisées, limitant les attaques XSS et d'injection de contenu.",
        "strict-transport-security":
          "Force le navigateur à toujours utiliser HTTPS pour ce domaine, empêchant le retour vers HTTP.",
        "x-frame-options":
          "Empêche le site d'être chargé dans une iframe tierce, protégeant contre le clickjacking.",
        "x-content-type-options":
          "Empêche le navigateur de deviner le type MIME, réduisant les risques d'exécution de contenu imprévu.",
        "referrer-policy":
          "Contrôle les informations de provenance envoyées lors de la navigation vers un autre site.",
        "permissions-policy":
          "Restreint l'accès aux API sensibles du navigateur (caméra, micro, géolocalisation, etc.).",
        "x-xss-protection":
          "Ancien mécanisme de filtrage XSS des navigateurs, aujourd'hui largement remplacé par la CSP.",
      },
    },
    sslChecker: {
      intro:
        "Démonstration pédagogique illustrant ce que vérifierait un vrai testeur SSL/TLS (protocoles supportés, validité du certificat). Aucune connexion réseau réelle n'est effectuée.",
      analyze: "Vérifier",
      simulatedNote:
        "Résultat simulé à des fins pédagogiques — aucune connexion TLS réelle n'est établie.",
      protocol: "Protocole",
      cipher: "Suite cryptographique",
      certValid: "Certificat valide",
      certValidYes: "Oui",
      issuedOn: "Émis le",
      expiresOn: "Expire le",
      legacyProtocols: "Protocoles obsolètes",
      legacyDisabled: "Désactivés",
    },
    portScan: {
      warning: "Simulation éducative — aucun scan réel n'est effectué contre une cible externe.",
      intro:
        "Saisissez un nom de domaine ou une IP fictive : le résultat est généré localement, de façon déterministe, à titre d'illustration.",
      defaultTarget: "cible-exemple.local",
      placeholder: "ex. cible-exemple.local",
      scan: "Lancer la simulation",
      open: "ouvert",
      closed: "fermé",
      statsScannedLabel: "Ports scannés",
      statsOpenLabel: "Ports ouverts",
      statsClosedLabel: "Ports fermés",
      footnote:
        "Résultat pseudo-aléatoire dérivé du texte saisi — ne reflète l'état d'aucune machine réelle.",
    },
    burpReference: {
      useCases: [
        "Interception et modification de requêtes HTTP/HTTPS via proxy",
        "Recherche de vulnérabilités web (injections, XSS, contrôle d'accès)",
        "Automatisation de tests avec le Repeater et l'Intruder",
      ],
      context:
        "Outil utilisé en formation et en environnement de test pour l'analyse de la sécurité des applications web, dans le cadre d'exercices encadrés et de CTF.",
      simulation: {
        warning: "Simulation éducative — aucune requête n'est envoyée vers l'URL saisie.",
        intro:
          "Aperçu de ce que renverrait un scan Burp Suite typique — résultat entièrement simulé et déterministe, à des fins de démonstration.",
        urlLabel: "URL cible",
        urlPlaceholder: "https://exemple.com",
        scanTypeLabel: "Type de scan",
        scanTypeHeaders: "En-têtes et configuration",
        scanTypeFull: "Audit complet",
        run: "Lancer la simulation",
        statsRiskLabel: "Risque global",
        statsVulnsLabel: "Vulnérabilités trouvées",
        statsTestsLabel: "Tests effectués",
        riskLevels: {
          low: "Faible",
          medium: "Moyen",
          high: "Élevé",
          critical: "Critique",
        },
        findings: {
          missingCsp: {
            title: "Content-Security-Policy manquant",
            description: "Aucune politique de sécurité du contenu détectée, ce qui augmente l'exposition aux attaques XSS.",
            remediation: "Définir une CSP restrictive limitant les sources de scripts et de ressources.",
          },
          missingXFrameOptions: {
            title: "X-Frame-Options manquant",
            description: "Le site pourrait être intégré dans une iframe tierce à des fins de clickjacking.",
            remediation: "Ajouter X-Frame-Options ou une directive frame-ancestors dans la CSP.",
          },
          missingHsts: {
            title: "Strict-Transport-Security manquant",
            description: "Le navigateur n'est pas forcé d'utiliser HTTPS pour ce domaine.",
            remediation: "Activer HSTS avec une durée suffisante et l'option includeSubDomains.",
          },
          outdatedTls: {
            title: "Configuration TLS obsolète",
            description: "Des protocoles ou suites cryptographiques dépréciés semblent encore acceptés.",
            remediation: "Désactiver TLS 1.0/1.1 et les suites de chiffrement faibles côté serveur.",
          },
          verboseErrorMessages: {
            title: "Messages d'erreur trop verbeux",
            description: "Les pages d'erreur exposent des détails techniques (stack trace, versions) utiles à un attaquant.",
            remediation: "Afficher des pages d'erreur génériques en production et journaliser les détails côté serveur.",
          },
          weakSessionCookie: {
            title: "Cookies de session mal protégés",
            description: "Les attributs Secure et HttpOnly semblent absents sur le cookie de session.",
            remediation: "Ajouter les attributs Secure, HttpOnly et SameSite sur tous les cookies sensibles.",
          },
          missingRateLimiting: {
            title: "Absence de limitation de débit",
            description: "Aucune limitation détectée sur les tentatives de connexion, facilitant les attaques par force brute.",
            remediation: "Mettre en place un rate limiting et un verrouillage progressif après échecs répétés.",
          },
          directoryListing: {
            title: "Listing de répertoire activé",
            description: "Le contenu d'un répertoire semble accessible sans page d'index, exposant sa structure.",
            remediation: "Désactiver le listing de répertoire côté serveur web.",
          },
        },
      },
    },
    wiresharkReference: {
      useCases: [
        "Capture et inspection de trafic réseau (TCP/IP, HTTP, DNS, TLS…)",
        "Diagnostic de problèmes réseau et détection d'anomalies",
        "Analyse pédagogique de protocoles lors de travaux pratiques",
      ],
      context:
        "Utilisé en formation réseau pour comprendre le fonctionnement des protocoles et diagnostiquer des incidents — une capture n'est bien sûr pas possible depuis un navigateur.",
      tabs: {
        protocols: "Protocoles",
        attacks: "Attaques réseau",
        defense: "Défense",
      },
      protocolsData: {
        tcpip: { name: "TCP/IP", description: "Suite de protocoles fondamentale d'Internet, base du transport fiable et de l'adressage." },
        udp: { name: "UDP", description: "Transport sans connexion, rapide mais sans garantie de livraison ni de vérification d'origine." },
        http: { name: "HTTP/HTTPS", description: "Protocole web ; en clair (HTTP) le trafic est lisible en clair, HTTPS le chiffre via TLS." },
        dns: { name: "DNS", description: "Résolution de noms de domaine, historiquement en clair et vulnérable au spoofing/empoisonnement de cache." },
        ssh: { name: "SSH", description: "Accès distant chiffré, remplace Telnet pour l'administration sécurisée des systèmes." },
        smb: { name: "SMB", description: "Partage de fichiers Windows, cible historique de vulnérabilités critiques (ex. EternalBlue)." },
        arp: { name: "ARP", description: "Résolution d'adresses MAC sur le réseau local, sans authentification — trivialement falsifiable." },
      },
      attacksData: {
        arpSpoofing: {
          title: "ARP Spoofing",
          description: "Falsification de réponses ARP pour associer sa propre adresse MAC à l'IP d'une victime et intercepter son trafic local.",
        },
        dnsSpoofing: {
          title: "DNS Spoofing",
          description: "Falsification de réponses DNS pour rediriger une victime vers un serveur malveillant à son insu.",
        },
        mitm: {
          title: "Man-in-the-Middle",
          description: "Interception et éventuelle altération des communications entre deux parties qui pensent communiquer directement.",
        },
        synFlood: {
          title: "SYN Flood",
          description: "Saturation d'un serveur par un grand nombre de requêtes de connexion TCP incomplètes.",
        },
        ddos: {
          title: "DDoS / Amplification",
          description: "Submersion d'une cible par un trafic massif distribué, parfois amplifié via des services tiers mal configurés.",
        },
      },
      defenseData: {
        vlanSegmentation: {
          title: "Segmentation VLAN",
          description: "Isoler les segments réseau limite la portée d'une compromission et la propagation d'attaques locales.",
        },
        tlsEncryption: {
          title: "Chiffrement TLS",
          description: "Chiffrer les communications rend leur interception inutile sans les clés correspondantes.",
        },
        firewallFiltering: {
          title: "Filtrage / pare-feu",
          description: "Restreindre les flux autorisés réduit la surface d'attaque exposée sur le réseau.",
        },
        monitoringIds: {
          title: "Monitoring / IDS",
          description: "La détection d'intrusion et la supervision permettent d'identifier une activité anormale rapidement.",
        },
        updates: {
          title: "Mises à jour régulières",
          description: "Corriger les vulnérabilités connues limite les vecteurs d'attaque disponibles pour un adversaire.",
        },
      },
    },
    riskCalculator: {
      intro:
        "Ajustez les 4 curseurs pour obtenir un score de risque indicatif. Calcul entièrement local — aucune donnée n'est envoyée.",
      factors: {
        network: "Risque réseau",
        users: "Risque utilisateurs",
        data: "Risque données",
        compliance: "Risque conformité",
      },
      levels: {
        low: "Risque faible",
        medium: "Risque moyen",
        high: "Risque élevé",
        critical: "Risque critique",
      },
      levelHints: {
        low: "Le niveau global de vigilance semble adapté. Continuez le suivi régulier.",
        medium: "Quelques axes méritent une attention renforcée avant qu'ils ne deviennent critiques.",
        high: "Plusieurs facteurs demandent une action corrective rapide.",
        critical: "Situation à traiter en priorité — plusieurs facteurs de risque cumulés.",
      },
    },
    vulnDatabase: {
      intro:
        "Vulnérabilités majeures et publiquement documentées — contenu strictement informatif, aucun code d'exploit.",
      entries: {
        eternalblue: {
          name: "EternalBlue (MS17-010)",
          description:
            "Faille dans l'implémentation du protocole SMBv1 de Windows, exploitée notamment par le ransomware WannaCry en 2017 pour se propager sans interaction utilisateur.",
          remediation:
            "Appliquer les correctifs Microsoft, désactiver SMBv1 et segmenter le réseau.",
        },
        log4shell: {
          name: "Log4Shell",
          description:
            "Vulnérabilité d'exécution de code à distance dans la bibliothèque de journalisation Java Log4j, exploitable via une simple chaîne de caractères journalisée.",
          remediation:
            "Mettre à jour Log4j vers une version corrigée et surveiller les tentatives d'exploitation dans les journaux.",
        },
        heartbleed: {
          name: "Heartbleed",
          description:
            "Faille dans la bibliothèque OpenSSL permettant de lire des zones de mémoire du serveur, exposant potentiellement clés privées et données sensibles.",
          remediation:
            "Mettre à jour OpenSSL, régénérer les certificats et clés, puis invalider les sessions actives.",
        },
        shellshock: {
          name: "Shellshock",
          description:
            "Vulnérabilité dans l'interpréteur de commandes Bash permettant l'exécution de code arbitraire via des variables d'environnement forgées.",
          remediation:
            "Mettre à jour Bash et limiter l'exposition des scripts CGI et systèmes concernés.",
        },
        proxylogon: {
          name: "ProxyLogon",
          description:
            "Chaîne de vulnérabilités sur Microsoft Exchange Server permettant un accès non authentifié et l'exécution de code à distance.",
          remediation:
            "Appliquer les correctifs Microsoft et auditer les serveurs Exchange exposés à internet.",
        },
      },
    },
    phishing: {
      intro:
        "Choisissez un secteur et un niveau de difficulté pour générer un scénario fictif d'email de phishing et vous entraîner à repérer les signaux d'alerte. Aucune entreprise réelle n'est utilisée, aucun lien n'est cliquable.",
      sectorLabel: "Secteur",
      difficultyLabel: "Difficulté",
      generate: "Générer",
      fictionalNote: "Exemple entièrement fictif — à des fins de sensibilisation uniquement.",
      from: "De",
      subject: "Objet",
      redFlagsLabel: "Signaux d'alerte à repérer",
      sectors: {
        banking: "Bancaire",
        corporate: "Professionnel / Entreprise",
        ecommerce: "E-commerce",
        socialMedia: "Réseaux sociaux",
      },
      difficulties: {
        easy: "Facile",
        medium: "Moyen",
        hard: "Difficile",
      },
      scenarios: {
        banking: {
          easy: {
            sender: "securite@banque-nordis-alertes.example",
            subject: "URGENT!!! VOTRE COMPTE VA ETRE BLOKER",
            body:
              "Cher client,\n\nVotre compte a été SUSPENDU pour des raisons de securite. Vous devez confirmer vos information dans les 2 heure sinon votre compte sera fermé définitivement !!!\n\nCliquez ici pour reactiver votre compte et entrer votre mot de passe.\n\nCordialement,\nLe Service",
            redFlags: [
              "Fautes d'orthographe multiples (« bloker », « securite », « information »)",
              "Urgence extrême et menace immédiate (« 2 heures », majuscules, points d'exclamation)",
              "Demande explicite du mot de passe",
              "Signature vague sans nom ni service précis",
            ],
          },
          medium: {
            sender: "securite@banque-nordis.example",
            subject: "Action requise : votre compte va être suspendu",
            body:
              "Cher client,\n\nNous avons détecté une activité inhabituelle sur votre compte. Pour éviter la suspension sous 24h, veuillez confirmer votre identité en cliquant sur le lien ci-dessous et en renseignant vos identifiants.\n\nL'équipe sécurité — Banque Nordis (fictive)",
            redFlags: [
              "Urgence artificielle (« sous 24h ») pour pousser à agir sans réfléchir",
              "Demande de confirmer des identifiants par email — une banque ne le fait jamais",
              "Domaine d'expéditeur générique et non officiel",
              "Formule de politesse impersonnelle (« Cher client »)",
            ],
          },
          hard: {
            sender: "notifications@nordis-banque.example",
            subject: "Confirmation de votre dernière connexion",
            body:
              "Bonjour,\n\nNous avons enregistré une connexion à votre espace client le 12 mars depuis un nouvel appareil. Si vous êtes à l'origine de cette connexion, aucune action n'est nécessaire. Dans le cas contraire, vous pouvez vérifier l'activité récente de votre compte depuis votre espace habituel.\n\nL'équipe Banque Nordis",
            redFlags: [
              "Nom de domaine discrètement inversé par rapport à l'habituel (« nordis-banque » au lieu de « banque-nordis »)",
              "Ton rassurant qui incite à ne rien vérifier activement",
              "Aucune faute, aucune urgence visible — seul l'examen attentif du domaine trahit l'email",
            ],
          },
        },
        corporate: {
          easy: {
            sender: "direction@groupe-altavia-fr.example",
            subject: "URGENT - VIREMENT A FAIRE MAINTENANT !!",
            body:
              "Bonjour,\n\nJe suis en reunion tres important et j'ai besoin que tu fasse un virement URGENT pour un fournisseur avant 15h !! C'est tres urgent, repond moi vite je peux pas parler au telephone la.\n\nMerci\nLa direction",
            redFlags: [
              "Fautes grammaticales et d'orthographe nombreuses (« tres important », « fasse », « repond moi »)",
              "Urgence artificielle extrême avec majuscules et points d'exclamation",
              "Tutoiement inhabituel pour une communication de direction",
              "Prétexte pour éviter tout contact vocal de vérification",
            ],
          },
          medium: {
            sender: "direction@groupe-altavia.example",
            subject: "Virement urgent à valider avant 17h",
            body:
              "Bonjour,\n\nJe suis en réunion et j'ai besoin que vous traitiez en urgence un virement pour un nouveau fournisseur. Répondez-moi rapidement, je vous enverrai les coordonnées bancaires par ce canal.\n\nMerci,\nLa Direction (fictif)",
            redFlags: [
              "Usurpation d'un dirigeant pour créer une pression hiérarchique",
              "Demande financière urgente hors procédure habituelle",
              "Indisponibilité prétendue de l'expéditeur pour éviter toute vérification",
              "Canal de communication inhabituel pour une demande financière",
            ],
          },
          hard: {
            sender: "j.martin@groupe-altavia.example",
            subject: "Petite question rapide",
            body:
              "Bonjour,\n\nEs-tu disponible dans les prochaines minutes ? J'ai besoin de valider rapidement un paiement fournisseur avant la clôture comptable et je préfère faire ça avec toi directement plutôt que par le circuit habituel, ça ira plus vite.\n\nMerci d'avance,\nJulien",
            redFlags: [
              "Contourne discrètement la procédure de validation habituelle, sans le présenter comme suspect",
              "Ton naturel, crédible, sans urgence agressive ni faute apparente",
              "Nom et adresse d'expéditeur plausibles — seul le contournement de procédure est un indice",
            ],
          },
        },
        ecommerce: {
          easy: {
            sender: "commande@shop-online-livraison.example",
            subject: "PROBLEME AVEC VOTRE COMMANDE - ACTION IMMEDIATE !!!",
            body:
              "Bonjour,\n\nIl y a un probleme avec le paiement de votre commande N°38291. Vous devez mettre a jour vos information de paiement immediatement sinon votre commande sera ANNULER !!!\n\nCliquez ici maintenant pour eviter l'annulation.\n\nLe service client",
            redFlags: [
              "Fautes d'orthographe (« probleme », « ANNULER », « eviter »)",
              "Numéro de commande générique impossible à vérifier",
              "Urgence exagérée avec majuscules et points d'exclamation multiples",
              "Demande de mise à jour des informations de paiement par email",
            ],
          },
          medium: {
            sender: "no-reply@shopnexa-commandes.example",
            subject: "Votre commande est en attente de confirmation",
            body:
              "Bonjour,\n\nVotre commande récente n'a pas pu être finalisée en raison d'un souci de paiement. Merci de confirmer vos informations bancaires sous 48h pour éviter l'annulation automatique de la commande.\n\nL'équipe ShopNexa (fictive)",
            redFlags: [
              "Souci de paiement vague et non détaillé",
              "Délai de 48h créant une pression modérée",
              "Demande de confirmation d'informations bancaires par email",
              "Nom de boutique générique difficile à vérifier indépendamment",
            ],
          },
          hard: {
            sender: "suivi@shopnexa.example",
            subject: "Votre colis a été expédié",
            body:
              "Bonjour,\n\nBonne nouvelle : votre commande vient d'être expédiée et devrait arriver sous 3 à 5 jours ouvrés. Vous pouvez suivre son acheminement depuis votre espace client habituel.\n\nMerci pour votre confiance,\nL'équipe ShopNexa",
            redFlags: [
              "Ton neutre et positif, sans urgence apparente — ce qui le rend crédible",
              "Pertinent seulement si aucune commande récente ne correspond réellement",
              "Invite à se rendre sur un « espace client habituel » sans fournir de lien direct vérifiable",
            ],
          },
        },
        socialMedia: {
          easy: {
            sender: "support@social-verification-center.example",
            subject: "ALERTE : Votre compte sera SUPPRIMER dans 24H",
            body:
              "Attention,\n\nNous avons detecté une activité suspecte sur votre compte. Votre compte sera SUPPRIMER definitivement dans 24H si vous ne confirmer pas votre identité maintenant !!\n\nCliquez sur le lien pour verifier votre compte et eviter la suppression.\n\nL'equipe de securite",
            redFlags: [
              "Fautes d'orthographe répétées (« confirmer », « verifier », « L'equipe »)",
              "Nom de domaine générique et non officiel",
              "Menace de suppression définitive sous 24h",
              "Ton alarmiste dès la salutation (« Attention »)",
            ],
          },
          medium: {
            sender: "no-reply@socialhub-security.example",
            subject: "Connexion inhabituelle détectée sur votre compte",
            body:
              "Bonjour,\n\nNous avons remarqué une connexion depuis un appareil non reconnu. Si ce n'était pas vous, sécurisez votre compte immédiatement en confirmant votre mot de passe via le lien ci-dessous.\n\nL'équipe SocialHub (fictif)",
            redFlags: [
              "Demande de confirmer un mot de passe existant — aucun réseau social légitime ne le fait par email",
              "Nom de plateforme générique et fictif, difficile à rattacher à un vrai service",
              "Pression modérée autour d'une « connexion suspecte » non détaillée",
            ],
          },
          hard: {
            sender: "notification@socialhub.example",
            subject: "Quelqu'un vous a mentionné dans un commentaire",
            body:
              "Bonjour,\n\nVous avez été mentionné(e) dans un commentaire par un contact. Connectez-vous à votre compte habituel pour voir la conversation complète et y répondre si vous le souhaitez.\n\nL'équipe SocialHub",
            redFlags: [
              "Prétexte anodin et plausible qui abaisse naturellement la vigilance",
              "Aucune urgence, aucune faute visible",
              "Invite à se reconnecter plutôt que de fournir un lien direct, ce qui paraît plus légitime",
            ],
          },
        },
      },
    },
    dataLeak: {
      simulatedNote: "Simulation éducative — pour une vérification réelle, utilisez",
      intro:
        "Simulation basée sur un jeu de données fixe, non connecté à une vraie base de fuites — aucun appel à une API externe.",
      check: "Vérifier",
      noneFound: "Aucune fuite trouvée dans ce jeu de données simulé.",
      found: "{count} fuite(s) trouvée(s) dans ce jeu de données simulé :",
      footnote:
        "Résultat déterministe généré localement à partir de l'email saisi — ne reflète aucune fuite réelle.",
    },
    subnetCalculator: {
      intro: "Calcule la plage d'adresses d'un sous-réseau à partir d'une IP et d'un masque (CIDR ou décimal). Calcul entièrement local.",
      ipLabel: "Adresse IP",
      maskLabel: "Masque (/24 ou 255.255.255.0)",
      statsNetworkLabel: "Adresse réseau",
      statsBroadcastLabel: "Broadcast",
      statsHostsLabel: "Hôtes utilisables",
      usableRangeLabel: "Plage utilisable :",
      invalidInput: "IP ou masque invalide.",
    },
    addressConverter: {
      intro: "Conversion en direct entre décimal, binaire et hexadécimal — modifiez n'importe quel champ.",
      decimalLabel: "Décimal",
      binaryLabel: "Binaire",
      hexLabel: "Hexadécimal",
    },
    portLookup: {
      intro: "Recherchez un port par numéro ou un service par nom, parmi les ports les plus courants.",
      placeholder: "ex. 443 ou HTTPS",
      noResults: "Aucun port ne correspond à cette recherche.",
      footnote: "Liste statique des ports les plus courants — aucune vérification réseau réelle.",
      usages: {
        "20": "Transfert de données FTP",
        "21": "Contrôle de connexion FTP",
        "22": "Accès distant sécurisé (SSH)",
        "23": "Accès distant non chiffré (obsolète)",
        "25": "Envoi d'emails (SMTP)",
        "53": "Résolution de noms de domaine (DNS)",
        "67": "Attribution d'adresses IP côté serveur (DHCP)",
        "68": "Attribution d'adresses IP côté client (DHCP)",
        "80": "Trafic web non chiffré (HTTP)",
        "110": "Réception d'emails (POP3)",
        "123": "Synchronisation d'horloge réseau (NTP)",
        "143": "Réception d'emails avec synchronisation (IMAP)",
        "161": "Supervision réseau (SNMP)",
        "389": "Annuaire d'entreprise (LDAP)",
        "443": "Trafic web chiffré (HTTPS)",
        "445": "Partage de fichiers Windows (SMB)",
        "465": "Envoi d'emails chiffré (SMTPS)",
        "514": "Journalisation réseau centralisée (Syslog)",
        "587": "Soumission d'emails sortants authentifiée",
        "636": "Annuaire d'entreprise chiffré (LDAPS)",
        "993": "Réception d'emails chiffrée (IMAPS)",
        "995": "Réception d'emails chiffrée (POP3S)",
        "1433": "Base de données Microsoft SQL Server",
        "3306": "Base de données MySQL",
        "3389": "Bureau à distance Windows (RDP)",
        "5432": "Base de données PostgreSQL",
        "5900": "Contrôle d'écran à distance (VNC)",
        "6379": "Base de données en mémoire Redis",
        "8080": "Trafic web alternatif (proxy, applications)",
        "27017": "Base de données MongoDB",
      },
    },
    bandwidthCalculator: {
      intro: "Estime le temps de transfert d'un fichier en fonction de sa taille et de la vitesse de connexion.",
      sizeLabel: "Taille du fichier",
      speedLabel: "Vitesse de connexion",
      resultLabel: "Résultat estimé",
      statsTimeLabel: "Temps estimé",
      statsSpeedLabel: "Débit utilisé",
      units: { s: "s", m: "min", h: "h", d: "j" },
    },
    passwordStrength: {
      intro: "Analyse locale d'un mot de passe — jamais envoyé nulle part, calcul entièrement dans le navigateur.",
      placeholder: "Saisissez un mot de passe à analyser",
      show: "Afficher",
      hide: "Masquer",
      criteria: {
        minLength: "Au moins 8 caractères",
        recommendedLength: "12 caractères ou plus (recommandé)",
        mixedCase: "Mélange de minuscules et majuscules",
        digit: "Au moins un chiffre",
        symbol: "Au moins un caractère spécial",
      },
      statsEntropyLabel: "Entropie",
      statsCrackTimeLabel: "Temps de cassage estimé",
      statsLengthLabel: "Longueur",
      levels: {
        weak: "Faible",
        fair: "Moyen",
        good: "Bon",
        strong: "Fort",
      },
      units: {
        second: "seconde(s)",
        minute: "minute(s)",
        hour: "heure(s)",
        day: "jour(s)",
        year: "an(s)",
      },
    },
    hashGenerator: {
      intro: "Calcule plusieurs empreintes cryptographiques d'un texte, entièrement dans le navigateur (Web Crypto API + implémentation MD5 locale).",
      placeholder: "Saisissez le texte à hacher…",
      copy: "Copier",
    },
    passwordGenerator: {
      intro: "Génère un mot de passe aléatoire cryptographiquement sûr (crypto.getRandomValues), selon vos critères.",
      lengthLabel: "Longueur",
      optionUpper: "Majuscules (A-Z)",
      optionDigits: "Chiffres (0-9)",
      optionSymbols: "Caractères spéciaux",
      generate: "Générer",
      statsStrengthLabel: "Force",
      statsEntropyLabel: "Entropie",
      statsLengthLabel: "Longueur",
      levels: {
        weak: "Faible",
        fair: "Moyen",
        good: "Bon",
        strong: "Fort",
      },
    },
    base64Codec: {
      intro: "Encodage et décodage Base64 dans les deux sens, en direct et entièrement local.",
      textLabel: "Texte",
      textPlaceholder: "Saisissez du texte à encoder…",
      base64Label: "Base64",
      base64Placeholder: "Ou collez du Base64 à décoder…",
      invalidBase64: "Base64 invalide — impossible de décoder.",
    },
    raidCalculator: {
      intro: "Calcule la capacité utile et la tolérance de panne selon le type de RAID, le nombre de disques et leur taille.",
      typeLabel: "Type de RAID",
      disksLabel: "Nombre de disques",
      sizeLabel: "Taille par disque (TB)",
      totalLabel: "Capacité brute totale",
      statsUsableLabel: "Capacité utile",
      statsToleranceLabel: "Disque(s) tolérés en panne",
      statsEfficiencyLabel: "Efficacité",
      invalidInput: "Configuration invalide — ce type de RAID nécessite au moins {min} disques (nombre pair pour le RAID 10).",
    },
    cronCalculator: {
      intro: "Traduit une expression cron en explication lisible et calcule ses 5 prochaines exécutions, entièrement en local.",
      nextRunsLabel: "5 prochaines exécutions",
      noUpcoming: "Aucune exécution trouvée dans les prochains mois.",
      invalidExpression: "Expression cron invalide — format attendu : minute heure jour mois jour-semaine.",
      explain: {
        everyMinute: "S'exécute toutes les minutes.",
        everyHourAt: "S'exécute toutes les heures, à la minute {minute}.",
        dailyAt: "S'exécute tous les jours à {time}.",
        generic: "S'exécute selon un horaire personnalisé.",
        onDays: "Les jours suivants : {days}.",
        onDayOfMonth: "Le(s) jour(s) {days} du mois.",
        inMonths: "En {months}.",
      },
    },
  },
};

// Toute feuille est string ou string[] ; toute clé de `fr` doit exister dans `en`
type DeepDict<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends string[]
      ? string[]
      : DeepDict<T[K]>;
};

export type Dictionary = typeof fr;

const en: DeepDict<typeof fr> = {
  langSwitch: "Switch language",
  backToHome: "Back to home",
  meta: {
    home: "Thierno BAH | Network & Systems Security Engineer",
    projects: "Projects | Thierno BAH",
    certifications: "Certifications | Thierno BAH",
    outils: "Cybersecurity tools | Thierno BAH",
    veille: "Tech watch | Thierno BAH",
  },
  header: {
    availableShort: "Available",
    availableFull: "Available · Work-study",
    contact: "Get in touch",
    login: "Login",
  },
  hero: {
    titles: [
      "Network & Systems Security Engineer",
      "Infrastructure Administrator",
      "Monitoring & Automation Specialist",
    ],
    viewProjects: "View my projects",
    contact: "Get in touch",
    scroll: "Scroll",
  },
  about: {
    title: "About",
    p1: "Systems & Network Engineer (4-year degree completed) with two years of experience in critical environments — a hospital and a managed IT services provider — where uptime and security are non-negotiable.",
    p2: "I design, administer and secure complex infrastructures, with a particular focus on:",
    bullets: [
      "Multi-site network rollouts",
      "Supervision & monitoring",
      "Access security (PAM, firewalls)",
      "Automation",
    ],
    p3: "I'm seeking a work-study contract to complete my Master's in Network & Systems Engineering, Cybersecurity track, starting September 2026.",
    locationLabel: "Location",
    locationValue: "Paris, France",
    emailLabel: "Email",
    phoneLabel: "Phone",
    downloadCv: "Download my resume",
    contact: "Get in touch",
    profile: {
      title: "Profile at a glance",
      status: "Status",
      statusValue: "Seeking work-study",
      availability: "Availability",
      availabilityValue: "September 2026",
      rhythm: "Schedule",
      rhythmValue: "3 weeks company / 1 week school",
      location: "Location",
      locationValue: "Paris & Île-de-France area",
      mobility: "Mobility",
      mobilityValue: "Driver's license (B)",
      english: "English",
      englishValue: "B2",
      certifications: "Certifications",
    },
  },
  skills: {
    eyebrow: "Tech stack",
    titleStart: "My technical",
    titleGradient: "expertise",
    subtitle:
      "The technologies and tools I rely on to secure and manage your infrastructure.",
    stats: {
      projects: "Projects delivered",
      certifications: "Certifications",
      years: "Years of experience",
      technologies: "Technologies mastered",
    },
    categories: {
      security: "Security",
      network: "Networking",
      systems: "Systems",
      cloud: "Cloud & DevSecOps",
      tools: "Monitoring",
      scripting: "Scripting",
    },
    proof: {
      usedAt: "Used at",
      certified: "Certified",
    },
    learning: {
      title: "Currently learning",
      hint: "Skills in progress — deliberately kept apart from the ones I've mastered.",
    },
    terminal: {
      title: "thierno@portfolio:~/api",
      online: "API online",
      endpointsLabel: "Public endpoints",
      copy: "Copy JSON",
      copied: "Copied!",
      welcome1: "Welcome to the portfolio terminal.",
      welcome2: "Click an endpoint above or type 'help'.",
      placeholder: "Type a command… (help)",
      inputLabel: "Terminal command line",
      notFound: "command not found:",
      notFoundHint: "try 'help'",
      fetchError: "error: could not reach the API",
      contactHint: "Full form in the Contact section below.",
      help: [
        "skills [category]     skills (security, network, systems, cloud, tools, scripting, all)",
        "certifications        certification list",
        "contact               contact details",
        "projects              featured projects",
        "clear                 clear the terminal",
        "help                  this help",
      ],
    },
  },
  projects: {
    title: "My Projects",
    sectionSubtitle:
      "A selection of my best work in network security and systems administration.",
    viewAll: "View all projects",
    details: "Details",
    viewProject: "View project",
    featured: "Featured",
    categories: {
      security: "Security",
      infrastructure: "Infrastructure",
      monitoring: "Monitoring",
      network: "Networking",
      cloud: "Cloud",
      automation: "Automation",
    },
    page: {
      subtitle:
        "Projects in network security, infrastructure and systems monitoring.",
      searchPlaceholder: "Search projects...",
      filters: "Filters:",
      allCategories: "All categories",
      sortFeatured: "⭐ Featured",
      sortRecent: "Most recent",
      sortName: "Name (A-Z)",
      found: "project found",
      foundPlural: "projects found",
      none: "No projects found.",
      techGroups: {
        network: "Networking",
        system: "Systems",
        monitoring: "Monitoring",
        security: "Security",
        automation: "Automation",
      },
    },
    panel: {
      close: "Close",
      viewCase: "See the full case study",
    },
    detail: {
      back: "Back to projects",
      about: "About the project",
      technologies: "Technologies used",
      featuredBadge: "Featured project",
      previous: "Previous project",
      next: "Next project",
      viewSite: "Visit site",
      sourceCode: "Source code",
      metrics: "Key figures",
      architecture: "Architecture diagram",
      challenges: "Challenges",
      challengeProblem: "The challenge",
      challengeSolution: "How I solved it",
    },
  },
  experience: {
    eyebrow: "Education & Experience",
    titleStart: "My",
    titleGradient: "background",
    subtitle:
      "Academic training on one side, professional experience on the other — two threads of the same journey.",
    school: "Education",
    professional: "Professional",
    certifications: "Certifications",
    present: "Present",
    current: "Current",
    seeMore: "Show more",
    seeLess: "Show less",
    status: {
      validated: "Completed",
      ongoing: "In progress",
      admitted: "Admitted",
    },
    types: {
      fulltime: "Full-time",
      parttime: "Part-time",
      freelance: "Freelance",
      internship: "Internship",
      apprenticeship: "Apprenticeship",
      contract: "Fixed-term",
    },
    seekingPlaceholder: "Currently seeking a work-study role",
  },
  certifications: {
    eyebrow: "Certifications",
    titleStart: "My",
    titleGradient: "certifications",
    subtitle:
      "The certifications that validate my skills in networking, systems and cybersecurity.",
    obtainedOn: "Obtained",
    expiresOn: "Expires",
    viewAll: "View all my certifications",
    viewCertificate: "View certificate",
    verifyOnline: "Verify online",
    viewer: {
      close: "Close",
      openInNewTab: "Open document",
      previewUnavailable: "Preview unavailable for this document — open it in a new tab.",
    },
  },
  contact: {
    eyebrow: "Contact",
    titleStart: "Let's work",
    titleGradient: "together",
    subtitle:
      "Have a project in mind? Feel free to reach out — I'd be happy to discuss your ideas.",
    emailLabel: "Email",
    quickTitle: "Quick contact",
    quickAvailability: "Available from September 2026",
    responseTime: "Ready to talk right now",
    form: {
      firstName: "First name",
      firstNamePlaceholder: "Your first name",
      lastName: "Last name",
      lastNamePlaceholder: "Your last name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      subject: "Subject",
      subjectPlaceholder: "What is your message about?",
      message: "Message",
      messagePlaceholder: "Tell me about your project or message...",
      send: "Send message",
      sending: "Sending...",
      successTitle: "Message sent!",
      successText:
        "Thank you for your message. I'll get back to you as soon as possible.",
      errorTitle: "Something went wrong",
      errorText:
        "Couldn't send the message right now. Please try again later or email me directly.",
    },
    errors: {
      firstName: "First name must be at least 2 characters",
      lastName: "Last name must be at least 2 characters",
      email: "Invalid email address",
      subject: "Subject must be at least 5 characters",
      message: "Message must be at least 10 characters",
    },
  },
  footer: {
    navigation: "Navigation",
    explore: "Explore",
    keywords: "Networking • Cybersecurity • Cloud",
    rights: "All rights reserved.",
  },
  veille: {
    title: "Tech Watch",
    subtitleIntro:
      "Real-time news, vulnerabilities and threats across",
    and: "and",
    domainSecurity: "Cybersecurity",
    domainNetworks: "Networks",
    domainInfra: "Infrastructure",
    searchPlaceholder: "Search articles, vulnerabilities, tools...",
    refresh: "Refresh",
    article: "article",
    articles: "articles",
    newSingular: "new article available",
    newPlural: "new articles available",
    error: "Unable to fetch RSS feeds. Check your connection and try again.",
    emptyTitle: "No articles found",
    emptyHint: "Adjust your filters or refresh the feeds.",
    justNow: "just now",
    oneMinAgo: "1 min ago",
    minutesAgoPrefix: "",
    minutesAgoSuffix: " min ago",
    readSource: "Read source",
    domains: {
      all: "All domains",
      cyber: "Cybersecurity",
      network: "Networking & Infrastructure",
      cloud: "Cloud & DevSecOps",
      system: "Systems & Linux",
    },
    allSources: "All sources",
    sourcesNote:
      "Sources: ANSSI · Krebs on Security · The Hacker News · SANS ISC · Cisco Blog · Cloudflare · AWS Security · Microsoft Azure · Red Hat — RSS feeds refreshed every 5 min",
  },
  chat: {
    title: "AI Assistant",
    online: "Online",
    openLabel: "Open the AI assistant",
    closeLabel: "Close the assistant",
    expandLabel: "Expand",
    minimizeLabel: "Minimize",
    welcome:
      "Hi! I'm Thierno's assistant. Ask me anything about his profile, skills, projects and availability — or ask me for general cybersecurity, networking or systems advice.",
    placeholder: "Ask about Thierno...",
    send: "Send",
    typing: "typing...",
    error: "Assistant temporarily unavailable",
    quickQuestions: [
      "What are his key skills?",
      "Is he available for a work-study?",
      "How do I protect myself from phishing?",
      "Tell me about his projects",
      "How do I secure my Wi-Fi network?",
      "How can I contact him?",
      "What certifications does he have?",
      "Where did he do his internships?",
      "What's his educational background?",
      "What's his tech stack?",
    ],
  },
  tools: {
    eyebrow: "Hands-on cybersecurity",
    titleStart: "Network & security",
    titleGradient: "mini-tools",
    subtitle:
      "An educational toolbox — demos and simulations run 100% client-side, and never target a third-party domain.",
    badges: {
      live: "Live analysis",
      simulation: "Simulation",
      reference: "Reference",
      interactive: "Interactive",
      educational: "Educational",
    },
    common: {
      fetchError: "Error: unable to fetch data.",
      ownDomainOnly:
        "You entered “{domain}”: this tool only analyzes my own site as a demo. For a real scan of that domain, use",
      analyzeMine: "Analyze {domain} instead",
      useCasesLabel: "Use cases",
      contextLabel: "Professional context",
      remediationLabel: "Remediation:",
      severity: {
        critical: "Critical",
        high: "High",
        medium: "Medium",
        low: "Low",
      },
    },
    cards: {
      securityHeaders: {
        title: "HTTP Security Headers Analyzer",
        description: "Live analysis of this site's security headers (CSP, HSTS, etc.).",
      },
      sslChecker: {
        title: "SSL/TLS Checker",
        description: "Educational demo of what a real TLS tester would check.",
      },
      portScan: {
        title: "Port Scan Simulator",
        description: "Nmap-style educational simulation — no real network requests.",
      },
      burpReference: {
        title: "Burp Suite",
        description: "Overview card for the web penetration testing tool.",
      },
      riskCalculator: {
        title: "Cybersecurity Risk Calculator",
        description: "Aggregated risk score from 4 sliders, fully computed client-side.",
      },
      vulnDatabase: {
        title: "Critical Vulnerability Knowledge Base",
        description: "Informational sheets on major, publicly known CVEs.",
      },
      phishing: {
        title: "Phishing Awareness Simulator",
        description: "Generates fictional phishing email scenarios with red flags explained.",
      },
      dataLeak: {
        title: "Data Leak Checker",
        description: "Educational simulation based on a fixed dataset — no real API call.",
      },
      wiresharkReference: {
        title: "Wireshark",
        description: "Overview card for the network protocol analyzer.",
      },
      subnetCalculator: {
        title: "Subnet Calculator",
        description: "IP + mask → network address, broadcast, usable host range.",
      },
      addressConverter: {
        title: "Address Converter",
        description: "Simultaneous decimal / binary / hexadecimal conversion, both ways.",
      },
      portLookup: {
        title: "Common Port Lookup",
        description: "Search by number or service name: protocol and typical usage.",
      },
      bandwidthCalculator: {
        title: "Bandwidth Calculator",
        description: "File size + speed → estimated transfer time.",
      },
      passwordStrength: {
        title: "Password Strength Analyzer",
        description: "Entropy and estimated crack time, 100% local computation.",
      },
      hashGenerator: {
        title: "Hash Generator",
        description: "MD5, SHA-1, SHA-256, SHA-512 from a text, computed locally.",
      },
      passwordGenerator: {
        title: "Secure Password Generator",
        description: "Customizable options, cryptographically secure generation.",
      },
      base64Codec: {
        title: "Base64 Encoder / Decoder",
        description: "Text ↔ Base64 conversion both ways, live.",
      },
      raidCalculator: {
        title: "RAID Calculator",
        description: "Type, disks and size → usable capacity and fault tolerance.",
      },
      cronCalculator: {
        title: "CRON Calculator",
        description: "Cron expression → plain-English explanation and next runs.",
      },
    },
    securityHeaders: {
      intro:
        "Live analysis of the HTTP security headers returned by this site, via a server API route that can only ever target its own domain.",
      analyze: "Analyze",
      statsStatusLabel: "HTTP status",
      statsPresentLabel: "Headers present",
      statsMissingLabel: "Missing",
      sectionPresentTitle: "Already in place",
      sectionMissingTitle: "To fix",
      missingRemediation: "Add this header to your server configuration.",
      headerInfo: {
        "content-security-policy":
          "Restricts allowed sources for scripts, styles and resources, limiting XSS and content-injection attacks.",
        "strict-transport-security":
          "Forces the browser to always use HTTPS for this domain, preventing downgrade to HTTP.",
        "x-frame-options":
          "Prevents the site from being loaded in a third-party iframe, protecting against clickjacking.",
        "x-content-type-options":
          "Prevents the browser from guessing the MIME type, reducing the risk of unintended content execution.",
        "referrer-policy":
          "Controls what referrer information is sent when navigating to another site.",
        "permissions-policy":
          "Restricts access to sensitive browser APIs (camera, microphone, geolocation, etc.).",
        "x-xss-protection":
          "Legacy browser XSS filtering mechanism, now largely superseded by CSP.",
      },
    },
    sslChecker: {
      intro:
        "Educational demo illustrating what a real SSL/TLS tester would check (supported protocols, certificate validity). No real network connection is ever made.",
      analyze: "Check",
      simulatedNote: "Simulated result for educational purposes — no real TLS connection is established.",
      protocol: "Protocol",
      cipher: "Cipher suite",
      certValid: "Certificate valid",
      certValidYes: "Yes",
      issuedOn: "Issued on",
      expiresOn: "Expires on",
      legacyProtocols: "Legacy protocols",
      legacyDisabled: "Disabled",
    },
    portScan: {
      warning: "Educational simulation — no real scan is performed against an external target.",
      intro:
        "Enter a fictional domain name or IP: the result is generated locally and deterministically, purely for illustration.",
      defaultTarget: "example-target.local",
      placeholder: "e.g. example-target.local",
      scan: "Run simulation",
      open: "open",
      closed: "closed",
      statsScannedLabel: "Ports scanned",
      statsOpenLabel: "Ports open",
      statsClosedLabel: "Ports closed",
      footnote:
        "Pseudo-random result derived from the entered text — does not reflect the state of any real machine.",
    },
    burpReference: {
      useCases: [
        "Intercepting and modifying HTTP/HTTPS requests via proxy",
        "Finding web vulnerabilities (injections, XSS, access control issues)",
        "Automating tests with the Repeater and Intruder",
      ],
      context:
        "Tool used in training and test environments for web application security analysis, as part of supervised exercises and CTFs.",
      simulation: {
        warning: "Educational simulation — no request is ever sent to the entered URL.",
        intro:
          "A preview of what a typical Burp Suite scan would return — entirely simulated and deterministic, for demonstration purposes.",
        urlLabel: "Target URL",
        urlPlaceholder: "https://example.com",
        scanTypeLabel: "Scan type",
        scanTypeHeaders: "Headers and configuration",
        scanTypeFull: "Full audit",
        run: "Run simulation",
        statsRiskLabel: "Overall risk",
        statsVulnsLabel: "Vulnerabilities found",
        statsTestsLabel: "Tests performed",
        riskLevels: {
          low: "Low",
          medium: "Medium",
          high: "High",
          critical: "Critical",
        },
        findings: {
          missingCsp: {
            title: "Missing Content-Security-Policy",
            description: "No content security policy detected, increasing exposure to XSS attacks.",
            remediation: "Define a restrictive CSP limiting allowed script and resource sources.",
          },
          missingXFrameOptions: {
            title: "Missing X-Frame-Options",
            description: "The site could be embedded in a third-party iframe for clickjacking purposes.",
            remediation: "Add X-Frame-Options or a frame-ancestors directive in the CSP.",
          },
          missingHsts: {
            title: "Missing Strict-Transport-Security",
            description: "The browser is not forced to use HTTPS for this domain.",
            remediation: "Enable HSTS with a sufficient duration and the includeSubDomains option.",
          },
          outdatedTls: {
            title: "Outdated TLS configuration",
            description: "Deprecated protocols or cipher suites still appear to be accepted.",
            remediation: "Disable TLS 1.0/1.1 and weak cipher suites on the server.",
          },
          verboseErrorMessages: {
            title: "Overly verbose error messages",
            description: "Error pages expose technical details (stack trace, versions) useful to an attacker.",
            remediation: "Show generic error pages in production and log details server-side.",
          },
          weakSessionCookie: {
            title: "Weakly protected session cookies",
            description: "The Secure and HttpOnly attributes appear to be missing on the session cookie.",
            remediation: "Add the Secure, HttpOnly and SameSite attributes on all sensitive cookies.",
          },
          missingRateLimiting: {
            title: "No rate limiting",
            description: "No limitation detected on login attempts, making brute-force attacks easier.",
            remediation: "Implement rate limiting and progressive lockout after repeated failures.",
          },
          directoryListing: {
            title: "Directory listing enabled",
            description: "A directory's contents appear accessible without an index page, exposing its structure.",
            remediation: "Disable directory listing on the web server.",
          },
        },
      },
    },
    wiresharkReference: {
      useCases: [
        "Capturing and inspecting network traffic (TCP/IP, HTTP, DNS, TLS…)",
        "Diagnosing network issues and detecting anomalies",
        "Educational protocol analysis during hands-on labs",
      ],
      context:
        "Used in network training to understand how protocols work and diagnose incidents — a live capture is of course not possible from a browser.",
      tabs: {
        protocols: "Protocols",
        attacks: "Network attacks",
        defense: "Defense",
      },
      protocolsData: {
        tcpip: { name: "TCP/IP", description: "Internet's foundational protocol suite, the basis for reliable transport and addressing." },
        udp: { name: "UDP", description: "Connectionless transport — fast, but with no delivery guarantee or origin verification." },
        http: { name: "HTTP/HTTPS", description: "Web protocol; plaintext (HTTP) traffic is readable in the clear, HTTPS encrypts it via TLS." },
        dns: { name: "DNS", description: "Domain name resolution, historically unencrypted and vulnerable to spoofing/cache poisoning." },
        ssh: { name: "SSH", description: "Encrypted remote access, replaces Telnet for secure system administration." },
        smb: { name: "SMB", description: "Windows file sharing, a historical target for critical vulnerabilities (e.g. EternalBlue)." },
        arp: { name: "ARP", description: "MAC address resolution on the local network, with no authentication — trivially spoofable." },
      },
      attacksData: {
        arpSpoofing: {
          title: "ARP Spoofing",
          description: "Forging ARP replies to associate one's own MAC address with a victim's IP and intercept their local traffic.",
        },
        dnsSpoofing: {
          title: "DNS Spoofing",
          description: "Forging DNS responses to redirect a victim to a malicious server without their knowledge.",
        },
        mitm: {
          title: "Man-in-the-Middle",
          description: "Intercepting, and potentially altering, communications between two parties who believe they are talking directly.",
        },
        synFlood: {
          title: "SYN Flood",
          description: "Overwhelming a server with a large number of incomplete TCP connection requests.",
        },
        ddos: {
          title: "DDoS / Amplification",
          description: "Flooding a target with massive distributed traffic, sometimes amplified via misconfigured third-party services.",
        },
      },
      defenseData: {
        vlanSegmentation: {
          title: "VLAN segmentation",
          description: "Isolating network segments limits the scope of a compromise and the spread of local attacks.",
        },
        tlsEncryption: {
          title: "TLS encryption",
          description: "Encrypting communications makes intercepting them useless without the corresponding keys.",
        },
        firewallFiltering: {
          title: "Filtering / firewall",
          description: "Restricting allowed traffic flows reduces the attack surface exposed on the network.",
        },
        monitoringIds: {
          title: "Monitoring / IDS",
          description: "Intrusion detection and monitoring make it possible to identify abnormal activity quickly.",
        },
        updates: {
          title: "Regular updates",
          description: "Patching known vulnerabilities limits the attack vectors available to an adversary.",
        },
      },
    },
    riskCalculator: {
      intro:
        "Adjust the 4 sliders to get an indicative risk score. Fully local computation — no data is ever sent anywhere.",
      factors: {
        network: "Network risk",
        users: "Users risk",
        data: "Data risk",
        compliance: "Compliance risk",
      },
      levels: {
        low: "Low risk",
        medium: "Medium risk",
        high: "High risk",
        critical: "Critical risk",
      },
      levelHints: {
        low: "The overall vigilance level looks appropriate. Keep up regular monitoring.",
        medium: "A few areas deserve closer attention before they become critical.",
        high: "Several factors call for prompt corrective action.",
        critical: "Situation to address as a priority — several risk factors are compounding.",
      },
    },
    vulnDatabase: {
      intro:
        "Major, publicly documented vulnerabilities — strictly informational content, no exploit code.",
      entries: {
        eternalblue: {
          name: "EternalBlue (MS17-010)",
          description:
            "Flaw in Windows' SMBv1 protocol implementation, notably exploited by the WannaCry ransomware in 2017 to spread without user interaction.",
          remediation: "Apply Microsoft's patches, disable SMBv1, and segment the network.",
        },
        log4shell: {
          name: "Log4Shell",
          description:
            "Remote code execution vulnerability in the Log4j Java logging library, exploitable via a simple logged string.",
          remediation: "Update Log4j to a patched version and monitor logs for exploitation attempts.",
        },
        heartbleed: {
          name: "Heartbleed",
          description:
            "Flaw in the OpenSSL library allowing an attacker to read server memory, potentially exposing private keys and sensitive data.",
          remediation: "Update OpenSSL, regenerate certificates and keys, and invalidate active sessions.",
        },
        shellshock: {
          name: "Shellshock",
          description:
            "Vulnerability in the Bash command interpreter allowing arbitrary code execution via crafted environment variables.",
          remediation: "Update Bash and limit exposure of affected CGI scripts and systems.",
        },
        proxylogon: {
          name: "ProxyLogon",
          description:
            "Chain of vulnerabilities in Microsoft Exchange Server enabling unauthenticated access and remote code execution.",
          remediation: "Apply Microsoft's patches and audit internet-facing Exchange servers.",
        },
      },
    },
    phishing: {
      intro:
        "Pick a sector and a difficulty level to generate a fictional phishing email scenario and practice spotting warning signs. No real company is ever used, no link is clickable.",
      sectorLabel: "Sector",
      difficultyLabel: "Difficulty",
      generate: "Generate",
      fictionalNote: "Entirely fictional example — for awareness purposes only.",
      from: "From",
      subject: "Subject",
      redFlagsLabel: "Red flags to spot",
      sectors: {
        banking: "Banking",
        corporate: "Corporate / Professional",
        ecommerce: "E-commerce",
        socialMedia: "Social media",
      },
      difficulties: {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
      },
      scenarios: {
        banking: {
          easy: {
            sender: "security@nordis-bank-alerts.example",
            subject: "URGENT!!! YOUR ACCOUNT WILL BE BLOCKD",
            body:
              "Dear customer,\n\nYour account has been SUSPENDED for security reasons. You must confirm your informations within 2 hour or your account will be closed permanently !!!\n\nClick here to reactivate your account and enter your password.\n\nRegards,\nThe Service",
            redFlags: [
              "Multiple spelling errors (“BLOCKD”, “informations”, “2 hour”)",
              "Extreme urgency and immediate threat (“2 hours”, caps, exclamation marks)",
              "Explicit request for the password",
              "Vague signature with no name or specific department",
            ],
          },
          medium: {
            sender: "security@nordis-bank.example",
            subject: "Action required: your account will be suspended",
            body:
              "Dear customer,\n\nWe detected unusual activity on your account. To avoid suspension within 24h, please confirm your identity by clicking the link below and entering your credentials.\n\nSecurity Team — Nordis Bank (fictional)",
            redFlags: [
              "Artificial urgency (“within 24h”) to push you into acting without thinking",
              "Asks you to confirm credentials by email — a bank never does this",
              "Generic, non-official sender domain",
              "Impersonal greeting (“Dear customer”)",
            ],
          },
          hard: {
            sender: "notifications@bank-nordis.example",
            subject: "Confirmation of your last login",
            body:
              "Hello,\n\nWe recorded a login to your online account on March 12 from a new device. If this was you, no action is needed. Otherwise, you can review your account's recent activity from your usual account portal.\n\nThe Nordis Bank Team",
            redFlags: [
              "Sender domain subtly reordered compared to the usual one (“bank-nordis” instead of “nordis-bank”)",
              "Reassuring tone that discourages any active verification",
              "No typos, no visible urgency — only close inspection of the domain gives it away",
            ],
          },
        },
        corporate: {
          easy: {
            sender: "management@altavia-group-hq.example",
            subject: "URGENT - TRANSFER NEEDED NOW !!",
            body:
              "Hi,\n\nI'm in a very important meeting and need you to do a transfer URGENT for a supplier before 3pm !! Its very urgent, reply me fast i cant talk on the phone rn.\n\nThanks\nManagement",
            redFlags: [
              "Numerous grammar and spelling mistakes (“Its”, “reply me”, “rn”)",
              "Extreme artificial urgency with caps and exclamation marks",
              "Unusually casual tone for a message from management",
              "Excuse to avoid any voice-call verification",
            ],
          },
          medium: {
            sender: "management@altavia-group.example",
            subject: "Urgent transfer to approve before 5pm",
            body:
              "Hi,\n\nI'm in a meeting and need you to urgently process a transfer for a new supplier. Reply quickly, I'll send the bank details through this channel.\n\nThanks,\nManagement (fictional)",
            redFlags: [
              "Impersonating an executive to create hierarchical pressure",
              "Urgent financial request outside the usual process",
              "Claimed unavailability of the sender to avoid any verification",
              "Unusual communication channel for a financial request",
            ],
          },
          hard: {
            sender: "j.martin@altavia-group.example",
            subject: "Quick question",
            body:
              "Hi,\n\nAre you free in the next few minutes? I need to quickly validate a supplier payment before the accounting close and would rather handle it directly with you than through the usual process, it'll be faster.\n\nThanks in advance,\nJulien",
            redFlags: [
              "Quietly bypasses the usual approval process without framing it as suspicious",
              "Natural, credible tone, no aggressive urgency, no visible typos",
              "Plausible name and sender address — the process bypass is the only real clue",
            ],
          },
        },
        ecommerce: {
          easy: {
            sender: "orders@shop-online-delivery.example",
            subject: "PROBLEM WITH YOUR ORDER - IMMEDIATE ACTION !!!",
            body:
              "Hello,\n\nThere is a problem with the payment for your order N°38291. You must update your payment informations immediately or your order will be CANCELED !!!\n\nClick here now to avoid cancelation.\n\nCustomer service",
            redFlags: [
              "Spelling errors (“informations”, “CANCELED” inconsistency, “cancelation”)",
              "Generic order number impossible to verify",
              "Exaggerated urgency with multiple caps and exclamation marks",
              "Request to update payment information by email",
            ],
          },
          medium: {
            sender: "no-reply@shopnexa-orders.example",
            subject: "Your order is pending confirmation",
            body:
              "Hello,\n\nYour recent order could not be completed due to a payment issue. Please confirm your bank details within 48h to avoid automatic order cancellation.\n\nThe ShopNexa Team (fictional)",
            redFlags: [
              "Vague, undetailed payment issue",
              "48h deadline creating moderate pressure",
              "Request to confirm bank details by email",
              "Generic store name hard to verify independently",
            ],
          },
          hard: {
            sender: "tracking@shopnexa.example",
            subject: "Your parcel has shipped",
            body:
              "Hello,\n\nGood news: your order has just shipped and should arrive within 3 to 5 business days. You can track its progress from your usual account portal.\n\nThanks for shopping with us,\nThe ShopNexa Team",
            redFlags: [
              "Neutral, positive tone with no apparent urgency — precisely what makes it credible",
              "Only relevant as a red flag if no recent order actually matches it",
              "Points to a “usual account portal” without ever giving a directly verifiable link",
            ],
          },
        },
        socialMedia: {
          easy: {
            sender: "support@social-verification-center.example",
            subject: "ALERT: Your account will be DELETD in 24H",
            body:
              "Attention,\n\nWe detected suspicious activity on your account. Your account will be DELETD permanently in 24H if you do not confirm your identity now !!\n\nClick the link to verifiy your account and avoid deletion.\n\nThe security team",
            redFlags: [
              "Repeated spelling errors (“DELETD”, “verifiy”)",
              "Generic, non-official domain name",
              "Threat of permanent deletion within 24h",
              "Alarmist tone from the very first word (“Attention”)",
            ],
          },
          medium: {
            sender: "no-reply@socialhub-security.example",
            subject: "Unusual login detected on your account",
            body:
              "Hello,\n\nWe noticed a login from an unrecognized device. If this wasn't you, secure your account immediately by confirming your password via the link below.\n\nThe SocialHub Team (fictional)",
            redFlags: [
              "Asks to confirm an existing password — no legitimate social network ever does this by email",
              "Generic, fictional platform name, hard to tie to a real service",
              "Moderate pressure built around an undetailed “suspicious login”",
            ],
          },
          hard: {
            sender: "notification@socialhub.example",
            subject: "Someone mentioned you in a comment",
            body:
              "Hello,\n\nYou were mentioned in a comment by a contact. Log in to your usual account to see the full conversation and reply if you'd like.\n\nThe SocialHub Team",
            redFlags: [
              "Mundane, plausible pretext that naturally lowers vigilance",
              "No urgency, no visible typos",
              "Points to logging in rather than providing a direct link, which makes it look more legitimate",
            ],
          },
        },
      },
    },
    dataLeak: {
      simulatedNote: "Educational simulation — for a real check, use",
      intro:
        "Simulation based on a fixed dataset, not connected to any real breach database — no external API call.",
      check: "Check",
      noneFound: "No breach found in this simulated dataset.",
      found: "{count} breach(es) found in this simulated dataset:",
      footnote:
        "Deterministic result generated locally from the entered email — does not reflect any real breach.",
    },
    subnetCalculator: {
      intro: "Calculates a subnet's address range from an IP and a mask (CIDR or decimal). Fully local computation.",
      ipLabel: "IP address",
      maskLabel: "Mask (/24 or 255.255.255.0)",
      statsNetworkLabel: "Network address",
      statsBroadcastLabel: "Broadcast",
      statsHostsLabel: "Usable hosts",
      usableRangeLabel: "Usable range:",
      invalidInput: "Invalid IP or mask.",
    },
    addressConverter: {
      intro: "Live conversion between decimal, binary and hexadecimal — edit any field.",
      decimalLabel: "Decimal",
      binaryLabel: "Binary",
      hexLabel: "Hexadecimal",
    },
    portLookup: {
      intro: "Search a port by number or a service by name, among the most common ports.",
      placeholder: "e.g. 443 or HTTPS",
      noResults: "No port matches this search.",
      footnote: "Static list of the most common ports — no real network check.",
      usages: {
        "20": "FTP data transfer",
        "21": "FTP control connection",
        "22": "Secure remote access (SSH)",
        "23": "Unencrypted remote access (legacy)",
        "25": "Sending emails (SMTP)",
        "53": "Domain name resolution (DNS)",
        "67": "IP address assignment, server side (DHCP)",
        "68": "IP address assignment, client side (DHCP)",
        "80": "Unencrypted web traffic (HTTP)",
        "110": "Receiving emails (POP3)",
        "123": "Network time synchronization (NTP)",
        "143": "Receiving emails with sync (IMAP)",
        "161": "Network monitoring (SNMP)",
        "389": "Enterprise directory (LDAP)",
        "443": "Encrypted web traffic (HTTPS)",
        "445": "Windows file sharing (SMB)",
        "465": "Encrypted email sending (SMTPS)",
        "514": "Centralized network logging (Syslog)",
        "587": "Authenticated outbound email submission",
        "636": "Encrypted enterprise directory (LDAPS)",
        "993": "Encrypted email receiving (IMAPS)",
        "995": "Encrypted email receiving (POP3S)",
        "1433": "Microsoft SQL Server database",
        "3306": "MySQL database",
        "3389": "Windows Remote Desktop (RDP)",
        "5432": "PostgreSQL database",
        "5900": "Remote screen control (VNC)",
        "6379": "Redis in-memory database",
        "8080": "Alternate web traffic (proxy, applications)",
        "27017": "MongoDB database",
      },
    },
    bandwidthCalculator: {
      intro: "Estimates a file's transfer time based on its size and the connection speed.",
      sizeLabel: "File size",
      speedLabel: "Connection speed",
      resultLabel: "Estimated result",
      statsTimeLabel: "Estimated time",
      statsSpeedLabel: "Speed used",
      units: { s: "s", m: "min", h: "h", d: "d" },
    },
    passwordStrength: {
      intro: "Local password analysis — never sent anywhere, computed entirely in the browser.",
      placeholder: "Enter a password to analyze",
      show: "Show",
      hide: "Hide",
      criteria: {
        minLength: "At least 8 characters",
        recommendedLength: "12 characters or more (recommended)",
        mixedCase: "Mix of lowercase and uppercase",
        digit: "At least one digit",
        symbol: "At least one special character",
      },
      statsEntropyLabel: "Entropy",
      statsCrackTimeLabel: "Estimated crack time",
      statsLengthLabel: "Length",
      levels: {
        weak: "Weak",
        fair: "Fair",
        good: "Good",
        strong: "Strong",
      },
      units: {
        second: "second(s)",
        minute: "minute(s)",
        hour: "hour(s)",
        day: "day(s)",
        year: "year(s)",
      },
    },
    hashGenerator: {
      intro: "Computes several cryptographic digests of a text, entirely in the browser (Web Crypto API + local MD5 implementation).",
      placeholder: "Enter the text to hash…",
      copy: "Copy",
    },
    passwordGenerator: {
      intro: "Generates a cryptographically secure random password (crypto.getRandomValues), based on your criteria.",
      lengthLabel: "Length",
      optionUpper: "Uppercase (A-Z)",
      optionDigits: "Digits (0-9)",
      optionSymbols: "Special characters",
      generate: "Generate",
      statsStrengthLabel: "Strength",
      statsEntropyLabel: "Entropy",
      statsLengthLabel: "Length",
      levels: {
        weak: "Weak",
        fair: "Fair",
        good: "Good",
        strong: "Strong",
      },
    },
    base64Codec: {
      intro: "Base64 encoding and decoding both ways, live and entirely local.",
      textLabel: "Text",
      textPlaceholder: "Enter text to encode…",
      base64Label: "Base64",
      base64Placeholder: "Or paste Base64 to decode…",
      invalidBase64: "Invalid Base64 — unable to decode.",
    },
    raidCalculator: {
      intro: "Calculates usable capacity and fault tolerance based on RAID type, disk count and size.",
      typeLabel: "RAID type",
      disksLabel: "Number of disks",
      sizeLabel: "Size per disk (TB)",
      totalLabel: "Total raw capacity",
      statsUsableLabel: "Usable capacity",
      statsToleranceLabel: "Disk(s) tolerated failed",
      statsEfficiencyLabel: "Efficiency",
      invalidInput: "Invalid configuration — this RAID type requires at least {min} disks (even number for RAID 10).",
    },
    cronCalculator: {
      intro: "Translates a cron expression into a plain-English explanation and computes its next 5 executions, entirely locally.",
      nextRunsLabel: "Next 5 executions",
      noUpcoming: "No execution found in the coming months.",
      invalidExpression: "Invalid cron expression — expected format: minute hour day month weekday.",
      explain: {
        everyMinute: "Runs every minute.",
        everyHourAt: "Runs every hour, at minute {minute}.",
        dailyAt: "Runs every day at {time}.",
        generic: "Runs on a custom schedule.",
        onDays: "On the following days: {days}.",
        onDayOfMonth: "On day(s) {days} of the month.",
        inMonths: "In {months}.",
      },
    },
  },
};

export const dictionaries: Record<Locale, Dictionary> = { fr, en };
