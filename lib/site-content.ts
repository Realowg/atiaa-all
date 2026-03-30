export type SiteLocale = "fr" | "en";

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  note: string;
}

export interface ProgrammeItem {
  title: string;
  description: string;
}

export interface FoundingProject {
  name: string;
  description: string;
  scope: string;
  outcome: string;
}

export interface MembershipTier {
  title: string;
  audience: string;
  contribution: string;
  benefit: string;
  cta: string;
}

export interface GovernanceNode {
  title: string;
  description: string;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  description: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  sourceUrl: string;
  sourceLabel: string;
}

export interface PageIntro {
  label: string;
  title: string;
  description: string;
}

export interface ContactPath {
  title: string;
  description: string;
  href: string;
}

export interface SiteContent {
  brand: {
    name: string;
    acronym: string;
    tagline: string;
    location: string;
    status: string;
  };
  navItems: NavItem[];
  footerLinks: NavItem[];
  trustRoles: string[];
  imagery: {
    hero: ImageAsset;
    why: ImageAsset;
    programmes: ImageAsset;
    projects: ImageAsset;
    governance: ImageAsset;
  };
  pageIntros: {
    about: PageIntro;
    programmes: PageIntro;
    projets: PageIntro;
    adhesion: PageIntro;
    partenaires: PageIntro;
    contact: PageIntro;
  };
  statements: {
    why: string;
    activation: string;
    mission: string;
    vision: string;
    support: string;
    trust: string;
    roadmap: string;
  };
  contactPaths: ContactPath[];
  stats: StatItem[];
  pillars: string[];
  programmes: ProgrammeItem[];
  sectors: string[];
  projects: FoundingProject[];
  membershipTiers: MembershipTier[];
  supportPoints: string[];
  governance: GovernanceNode[];
  roadmap: RoadmapPhase[];
}

export const siteContent: Record<SiteLocale, SiteContent> = {
  fr: {
    brand: {
      name: "Alliance Togolaise pour l’IA Appliquée",
      acronym: "ATIAA",
      tagline: "Démontrer, former, déployer l’IA appliquée au Togo.",
      location: "Lomé, Togo",
      status: "Initiative en structuration",
    },
    navItems: [
      { label: "Accueil", href: "/" },
      { label: "À propos", href: "/about" },
      { label: "Programmes", href: "/programmes" },
      { label: "Projets", href: "/projets" },
      { label: "Adhésion", href: "/adhesion" },
      { label: "Partenaires", href: "/partenaires" },
      { label: "Contact", href: "/contact" },
    ],
    footerLinks: [
      { label: "Accueil", href: "/" },
      { label: "À propos", href: "/about" },
      { label: "Programmes", href: "/programmes" },
      { label: "Projets", href: "/projets" },
      { label: "Adhésion", href: "/adhesion" },
      { label: "Partenaires", href: "/partenaires" },
      { label: "Contact", href: "/contact" },
    ],
    trustRoles: ["Fondateurs", "Experts", "Entreprises", "Écoles", "Partenaires"],
    imagery: {
      hero: {
        src: "/imagery/hero-collaboration.jpg",
        alt: "Deux professionnels en discussion lors d’un événement de travail.",
        sourceUrl: "https://unsplash.com/photos/KHQJf0Gq3RA",
        sourceLabel: "Unsplash",
      },
      why: {
        src: "/imagery/why-collaboration.jpg",
        alt: "Deux femmes collaborant devant leurs ordinateurs portables.",
        sourceUrl: "https://unsplash.com/photos/n_4iTY1KmDE",
        sourceLabel: "Unsplash",
      },
      programmes: {
        src: "/imagery/programmes-workshop.jpg",
        alt: "Un formateur présentant devant un tableau à deux participants.",
        sourceUrl: "https://unsplash.com/photos/CjYnf6YL0NY",
        sourceLabel: "Unsplash",
      },
      projects: {
        src: "/imagery/projects-collaboration.jpg",
        alt: "Deux professionnels collaborant devant un ordinateur dans un atelier technique.",
        sourceUrl: "https://unsplash.com/photos/kwzWjTnDPLk",
        sourceLabel: "Unsplash",
      },
      governance: {
        src: "/imagery/governance-meeting.jpg",
        alt: "Un groupe de professionnels en réunion autour d’une table.",
        sourceUrl: "https://unsplash.com/photos/FV3GConVSss",
        sourceLabel: "Unsplash",
      },
    },
    pageIntros: {
      about: {
        label: "À propos",
        title: "La structure qui rend l’IA appliquée lisible, utile et crédible au Togo.",
        description:
          "ATIAA organise un cadre commun pour passer de l’intérêt à l’exécution, avec une mission claire, une gouvernance lisible et une trajectoire assumée à partir de Lomé.",
      },
      programmes: {
        label: "Programmes",
        title: "Des formats concrets pour apprendre, tester et déployer.",
        description:
          "L’ATIAA active des démonstrations, workshops, clinics et pilotes pour produire de la preuve, de la capacité et des usages applicables.",
      },
      projets: {
        label: "Projets fondateurs",
        title: "Des démonstrateurs réels pour installer la crédibilité par la preuve.",
        description:
          "Le lancement s’appuie sur un premier cercle de projets démonstrateurs conçus pour rendre l’IA appliquée visible, utile et documentée.",
      },
      adhesion: {
        label: "Adhésion",
        title: "Une coalition conçue pour engager des acteurs différents autour d’un même niveau d’exigence.",
        description:
          "ATIAA distingue les rôles, les apports et les bénéfices de chaque niveau d’engagement pour structurer une alliance durable.",
      },
      partenaires: {
        label: "Partenaires",
        title: "Un point d’appui crédible pour les entreprises et institutions.",
        description:
          "Soutenir l’ATIAA, c’est appuyer une infrastructure d’adoption concrète de l’IA avec un positionnement sobre, utile et ancré dans le terrain.",
      },
      contact: {
        label: "Contact",
        title: "Deux chemins pour rejoindre la dynamique.",
        description:
          "Que vous souhaitiez rejoindre l’alliance ou devenir partenaire fondateur, l’ATIAA ouvre un cadre de contact simple et crédible.",
      },
    },
    statements: {
      why:
        "Au Togo, l’IA suscite un intérêt croissant. Le vrai frein n’est plus la curiosité, mais la capacité à outiller, former, tester et déployer des usages réels.",
      activation:
        "ATIAA est la couche d’activation manquante entre la curiosité et l’impact réel.",
      mission:
        "Accélérer l’adoption concrète de l’IA au Togo par la démonstration, la formation pratique, les partenariats et les projets pilotes.",
      vision:
        "Faire du Togo, en commençant par Lomé, un pôle de référence de l’IA appliquée en Afrique francophone.",
      support:
        "Une alliance utile aux acteurs qui veulent démontrer, former et lancer des pilotes, pas simplement afficher un intérêt pour l’IA.",
      trust:
        "Une alliance utile au terrain, pas un véhicule d’appropriation privée.",
      roadmap: "ATIAA est actuellement en phase de structuration.",
    },
    contactPaths: [
      {
        title: "Je veux rejoindre ATIAA",
        description:
          "Pour contribuer, apprendre, participer aux programmes ou intégrer les projets.",
        href: "/contact",
      },
      {
        title: "Je veux devenir partenaire fondateur",
        description:
          "Pour soutenir une plateforme d’activation concrète de l’IA appliquée au Togo.",
        href: "/contact",
      },
    ],
    stats: [
      {
        value: "3",
        label: "projets démonstrateurs",
        note: "Des cas concrets dès le lancement pour montrer l’IA appliquée en action.",
      },
      {
        value: "5",
        label: "piliers d’action",
        note: "De la démonstration publique jusqu’au déploiement opérationnel.",
      },
      {
        value: "3",
        label: "niveaux d’adhésion",
        note: "Des voies d’engagement pensées pour bâtir une coalition durable.",
      },
      {
        value: "Lomé → national",
        label: "trajectoire d’impact",
        note: "Un ancrage local assumé pour préparer une montée à l’échelle crédible.",
      },
    ],
    pillars: [
      "Démonstration",
      "Éducation pratique",
      "Adoption",
      "Partenariats",
      "Impact local",
    ],
    programmes: [
      {
        title: "Démonstrations publiques",
        description:
          "Des moments visibles pour montrer des usages concrets de l’IA dans le travail, l’éducation et les services.",
      },
      {
        title: "Workshops pratiques",
        description:
          "Des sessions opérationnelles pour manipuler les outils, structurer les méthodes et produire des résultats.",
      },
      {
        title: "Bootcamps IA",
        description:
          "Des parcours intensifs pour faire monter des équipes et des individus sur des cas d’usage réels.",
      },
      {
        title: "AI Clinics",
        description:
          "Des permanences d’accompagnement ciblées pour débloquer des besoins métiers et organisationnels.",
      },
      {
        title: "Showcases partenaires",
        description:
          "Des vitrines crédibles pour des entreprises et institutions qui veulent co-construire des initiatives utiles.",
      },
      {
        title: "Projets pilotes",
        description:
          "Des expérimentations encadrées avec objectifs, périmètres et apprentissages documentés.",
      },
      {
        title: "Formation outils avancés",
        description:
          "Un niveau de maturité supérieur pour les équipes qui veulent passer de l’usage ponctuel à l’intégration.",
      },
      {
        title: "Cas d’usage sectoriels",
        description:
          "Des formats adaptés aux réalités des PME, écoles, médias, services publics et structures de terrain.",
      },
    ],
    sectors: ["PME", "Éducation", "Médias", "Santé", "Commerce", "Services", "Administration"],
    projects: [
      {
        name: "Askia",
        description:
          "Workspace d’IA appliquée pour le travail, la recherche, l’analyse et l’exécution structurée.",
        scope: "Productivité, recherche, pilotage d’actions",
        outcome: "Montrer comment l’IA peut devenir un véritable poste de travail augmenté.",
      },
      {
        name: "Glyph",
        description:
          "Couche d’opérations CMS assistée par IA, orientée gouvernance, validation et publication.",
        scope: "Publication, contrôle éditorial, gouvernance de contenu",
        outcome:
          "Illustrer une IA utile aux équipes qui doivent produire vite sans sacrifier la qualité.",
      },
      {
        name: "Orbis",
        description:
          "Projet d’intelligence locale visant un accès contextualisé au savoir et aux usages de l’IA.",
        scope: "Accès au savoir, contexte local, intelligence de terrain",
        outcome:
          "Faire émerger une IA plus proche des réalités, besoins et langues d’usage locales.",
      },
    ],
    membershipTiers: [
      {
        title: "Membres fondateurs",
        audience:
          "Pour les acteurs qui veulent définir la colonne vertébrale de l’alliance dès son lancement.",
        contribution:
          "Temps, expertise, capacité de démonstration, légitimité sectorielle et impulsion stratégique.",
        benefit:
          "Un rôle structurant dans la trajectoire de l’ATIAA, une visibilité forte et un accès prioritaire aux chantiers.",
        cta: "Rejoindre le cercle fondateur",
      },
      {
        title: "Membres actifs",
        audience:
          "Pour les praticiens, équipes, écoles et organisations qui veulent contribuer au déploiement.",
        contribution:
          "Participation aux programmes, partage de cas d’usage, animation et co-production d’initiatives.",
        benefit:
          "Accès aux ateliers, au réseau, aux projets et à une communauté orientée exécution.",
        cta: "Devenir membre actif",
      },
      {
        title: "Partenaires",
        audience:
          "Pour les entreprises, institutions et soutiens qui veulent appuyer un écosystème crédible.",
        contribution:
          "Appui financier, logistique, institutionnel ou technique pour accélérer les démonstrations et pilotes.",
        benefit:
          "Positionnement crédible, opportunités de pilotes, accès à des talents et co-branding d’initiatives.",
        cta: "Devenir partenaire",
      },
    ],
    supportPoints: [
      "Visibilité crédible sur une initiative de structuration à forte valeur publique",
      "Accès à des talents, experts et porteurs de projets ancrés dans l’exécution",
      "Opportunités concrètes de pilotes et de démonstrations appliquées",
      "Positionnement clair sur l’IA appliquée plutôt que sur le simple discours",
      "Co-branding d’initiatives utiles et lisibles pour le terrain",
      "Accès à des cas d’usage sectoriels ancrés dans les réalités togolaises",
    ],
    governance: [
      {
        title: "Noyau fondateur",
        description:
          "Le cercle initial qui lance l’ATIAA, donne l’impulsion et pose le cadre d’action.",
      },
      {
        title: "Conseil d’orientation",
        description:
          "Une couche de recul et d’alignement pour préserver la pertinence, l’équilibre et l’intérêt collectif.",
      },
      {
        title: "Coordination exécutive",
        description:
          "Le pilotage opérationnel des programmes, partenariats, démonstrations et relations membres.",
      },
      {
        title: "Experts et partenaires contributeurs",
        description:
          "Les acteurs qui enrichissent les travaux par leur expertise, leurs terrains et leurs capacités de déploiement.",
      },
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Lomé / structuration",
        description:
          "Constituer le noyau, préciser le cadre, installer les premiers repères publics et poser les fondamentaux.",
      },
      {
        phase: "Phase 2",
        title: "Programmes, ateliers, pilotes",
        description:
          "Activer les démonstrations, les workshops, les clinics et les premiers cas d’usage accompagnés.",
      },
      {
        phase: "Phase 3",
        title: "Extension nationale",
        description:
          "Faire circuler les formats, partenariats et démonstrateurs au-delà de Lomé, avec une logique d’essaimage maîtrisée.",
      },
      {
        phase: "Phase 4",
        title: "Référence francophone régionale",
        description:
          "Positionner l’ATIAA comme plateforme de référence de l’IA appliquée en Afrique francophone.",
      },
    ],
  },
  en: {
    brand: {
      name: "Alliance Togolaise pour l’IA Appliquée",
      acronym: "ATIAA",
      tagline: "Demonstrate, train, deploy applied AI in Togo.",
      location: "Lomé, Togo",
      status: "Structuring initiative",
    },
    navItems: [],
    footerLinks: [],
    trustRoles: [],
    imagery: {
      hero: { src: "", alt: "", sourceUrl: "", sourceLabel: "" },
      why: { src: "", alt: "", sourceUrl: "", sourceLabel: "" },
      programmes: { src: "", alt: "", sourceUrl: "", sourceLabel: "" },
      projects: { src: "", alt: "", sourceUrl: "", sourceLabel: "" },
      governance: { src: "", alt: "", sourceUrl: "", sourceLabel: "" },
    },
    pageIntros: {
      about: { label: "", title: "", description: "" },
      programmes: { label: "", title: "", description: "" },
      projets: { label: "", title: "", description: "" },
      adhesion: { label: "", title: "", description: "" },
      partenaires: { label: "", title: "", description: "" },
      contact: { label: "", title: "", description: "" },
    },
    statements: {
      why: "",
      activation: "",
      mission: "",
      vision: "",
      support: "",
      trust: "",
      roadmap: "",
    },
    contactPaths: [],
    stats: [],
    pillars: [],
    programmes: [],
    sectors: [],
    projects: [],
    membershipTiers: [],
    supportPoints: [],
    governance: [],
    roadmap: [],
  },
};
