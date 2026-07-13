import type { Locale } from "@/types";

// ============================================================
// Dictionnaire UI — le français est la source de vérité.
// `en` est contraint par le type dérivé de `fr` : une clé
// manquante ou en trop est une erreur de compilation.
// ============================================================

const fr = {
  langSwitch: "Changer de langue",
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
    badge: "Formation & Expérience",
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
      "Bonjour ! Je suis l'assistant de Thierno. Posez-moi vos questions sur son profil, ses compétences, ses projets ou sa disponibilité.",
    placeholder: "Posez une question sur Thierno...",
    send: "Envoyer",
    typing: "écrit...",
    error: "Assistant momentanément indisponible",
    quickQuestions: [
      "Quelles sont ses compétences clés ?",
      "Est-il disponible en alternance ?",
      "Parle-moi de ses projets",
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
    },
    wiresharkReference: {
      useCases: [
        "Capture et inspection de trafic réseau (TCP/IP, HTTP, DNS, TLS…)",
        "Diagnostic de problèmes réseau et détection d'anomalies",
        "Analyse pédagogique de protocoles lors de travaux pratiques",
      ],
      context:
        "Utilisé en formation réseau pour comprendre le fonctionnement des protocoles et diagnostiquer des incidents — une capture n'est bien sûr pas possible depuis un navigateur.",
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
        "Générez un scénario fictif d'email de phishing pour vous entraîner à repérer les signaux d'alerte. Aucune entreprise réelle n'est utilisée, aucun lien n'est cliquable.",
      sectorLabel: "Secteur",
      newScenario: "Nouveau scénario",
      fictionalNote: "Exemple entièrement fictif — à des fins de sensibilisation uniquement.",
      from: "De",
      subject: "Objet",
      redFlagsLabel: "Signaux d'alerte à repérer",
      footnote: "Cliquez sur « Nouveau scénario » pour générer un autre exemple.",
      scenarios: {
        banking: {
          sector: "Banque",
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
        corporate: {
          sector: "Entreprise",
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
        delivery: {
          sector: "Livraison",
          sender: "no-reply@colis-expresstrack.example",
          subject: "Votre colis est en attente — frais de douane à régler",
          body:
            "Bonjour,\n\nVotre colis ne peut être livré tant que des frais de douane de 2,99 € ne sont pas réglés. Cliquez sur le lien ci-dessous pour procéder au paiement et débloquer la livraison.\n\nService client — ExpressTrack (fictif)",
          redFlags: [
            "Petit montant demandé pour paraître anodin et inciter au clic rapide",
            "Aucune référence de commande ou de numéro de suivi vérifiable",
            "Nom de service de livraison générique et non officiel",
            "Lien de paiement externe non lié à un site de suivi connu",
          ],
        },
        itSupport: {
          sector: "Support IT",
          sender: "support-it@helpdesk-corpnet.example",
          subject: "Votre mot de passe expire aujourd'hui",
          body:
            "Bonjour,\n\nVotre mot de passe professionnel expire dans quelques heures. Merci de le renouveler immédiatement via le portail ci-dessous pour éviter la perte d'accès à votre messagerie.\n\nSupport informatique (fictif)",
          redFlags: [
            "Pression temporelle sur un sujet technique habituellement planifié à l'avance",
            "Lien vers un portail de connexion externe imitant l'outil interne",
            "Adresse d'expéditeur ne correspondant pas au domaine interne habituel",
            "Aucune personnalisation (nom, service, identifiant) dans le message",
          ],
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
    badge: "Education & Experience",
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
      "Hi! I'm Thierno's assistant. Ask me anything about his profile, skills, projects or availability.",
    placeholder: "Ask about Thierno...",
    send: "Send",
    typing: "typing...",
    error: "Assistant temporarily unavailable",
    quickQuestions: [
      "What are his key skills?",
      "Is he available for a work-study?",
      "Tell me about his projects",
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
    },
    wiresharkReference: {
      useCases: [
        "Capturing and inspecting network traffic (TCP/IP, HTTP, DNS, TLS…)",
        "Diagnosing network issues and detecting anomalies",
        "Educational protocol analysis during hands-on labs",
      ],
      context:
        "Used in network training to understand how protocols work and diagnose incidents — a live capture is of course not possible from a browser.",
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
        "Generate a fictional phishing email scenario to practice spotting warning signs. No real company is ever used, no link is clickable.",
      sectorLabel: "Sector",
      newScenario: "New scenario",
      fictionalNote: "Entirely fictional example — for awareness purposes only.",
      from: "From",
      subject: "Subject",
      redFlagsLabel: "Red flags to spot",
      footnote: "Click “New scenario” to generate another example.",
      scenarios: {
        banking: {
          sector: "Banking",
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
        corporate: {
          sector: "Corporate",
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
        delivery: {
          sector: "Delivery",
          sender: "no-reply@expresstrack-parcel.example",
          subject: "Your parcel is on hold — customs fee due",
          body:
            "Hello,\n\nYour parcel cannot be delivered until a customs fee of €2.99 is paid. Click the link below to pay and release the delivery.\n\nCustomer service — ExpressTrack (fictional)",
          redFlags: [
            "Small amount requested to seem harmless and encourage a quick click",
            "No verifiable order reference or tracking number",
            "Generic, non-official delivery service name",
            "External payment link unrelated to any known tracking site",
          ],
        },
        itSupport: {
          sector: "IT Support",
          sender: "it-support@corpnet-helpdesk.example",
          subject: "Your password expires today",
          body:
            "Hello,\n\nYour work password expires in a few hours. Please renew it immediately via the portal below to avoid losing access to your mailbox.\n\nIT Support (fictional)",
          redFlags: [
            "Time pressure on a technical matter that's usually scheduled in advance",
            "Link to an external login portal mimicking the internal tool",
            "Sender address not matching the usual internal domain",
            "No personalization (name, department, ID) in the message",
          ],
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
  },
};

export const dictionaries: Record<Locale, Dictionary> = { fr, en };
