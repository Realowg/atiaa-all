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

export interface HeroPanelItem {
  section: string;
  title: string;
  detail: string;
  status: string;
}

export interface HeroPanelMetric {
  label: string;
  value: string;
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

export interface HomeContent {
  brand: {
    name: string;
    acronym: string;
    tagline: string;
    location: string;
    status: string;
  };
  navItems: NavItem[];
  trustRoles: string[];
  heroPanel: {
    title: string;
    summary: string;
    items: HeroPanelItem[];
    metrics: HeroPanelMetric[];
  };
  stats: StatItem[];
  pillars: string[];
  programmes: ProgrammeItem[];
  sectors: string[];
  projects: FoundingProject[];
  membershipTiers: MembershipTier[];
  supportPoints: string[];
  governance: GovernanceNode[];
  roadmap: RoadmapPhase[];
  footerLinks: NavItem[];
}

export const siteContent: Record<SiteLocale, HomeContent> = {
  fr: {
    brand: {
      name: "Alliance Togolaise pour l’IA Appliquée",
      acronym: "ATIAA",
      tagline: "Démontrer, former, déployer l’IA appliquée au Togo.",
      location: "Lomé, Togo",
      status: "Initiative en structuration",
    },
    navItems: [
      { label: "Accueil", href: "#accueil" },
      { label: "Mission", href: "#mission" },
      { label: "Programmes", href: "#programmes" },
      { label: "Projets", href: "#projets" },
      { label: "Adhésion", href: "#adhesion" },
      { label: "Partenaires", href: "#partenaires" },
      { label: "Contact", href: "#contact" },
    ],
    trustRoles: ["Fondateurs", "Experts", "Entreprises", "Écoles", "Partenaires"],
    heroPanel: {
      title: "Vue d’ensemble ATIAA",
      summary:
        "Une plateforme de coordination pour programmes, projets démonstrateurs, partenaires et pilotes à partir de Lomé.",
      items: [
        {
          section: "Programmes",
          title: "Démonstrations, workshops et AI Clinics",
          detail:
            "Des formats activables pour équipes, écoles, institutions et structures de terrain.",
          status: "En structuration",
        },
        {
          section: "Projets",
          title: "Askia, Glyph et Orbis",
          detail:
            "Trois projets fondateurs pour montrer des usages concrets de l’IA appliquée.",
          status: "Cercle initial",
        },
        {
          section: "Partenaires",
          title: "Entreprises, écoles et institutions",
          detail:
            "Un cadre commun pour visibilité crédible, pilotes et montée en capacité.",
          status: "Ouvert",
        },
      ],
      metrics: [
        { label: "Base de lancement", value: "Lomé" },
        { label: "Projets démonstrateurs", value: "3" },
        { label: "Piliers d’action", value: "5" },
      ],
    },
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
        outcome: "Illustrer une IA utile aux équipes qui doivent produire vite sans sacrifier la qualité.",
      },
      {
        name: "Orbis",
        description:
          "Projet d’intelligence locale visant un accès contextualisé au savoir et aux usages de l’IA.",
        scope: "Accès au savoir, contexte local, intelligence de terrain",
        outcome: "Faire émerger une IA plus proche des réalités, besoins et langues d’usage locales.",
      },
    ],
    membershipTiers: [
      {
        title: "Membres fondateurs",
        audience: "Pour les acteurs qui veulent définir la colonne vertébrale de l’alliance dès son lancement.",
        contribution: "Temps, expertise, capacité de démonstration, légitimité sectorielle et impulsion stratégique.",
        benefit: "Un rôle structurant dans la trajectoire de l’ATIAA, une visibilité forte et un accès prioritaire aux chantiers.",
        cta: "Rejoindre le cercle fondateur",
      },
      {
        title: "Membres actifs",
        audience: "Pour les praticiens, équipes, écoles et organisations qui veulent contribuer au déploiement.",
        contribution: "Participation aux programmes, partage de cas d’usage, animation et co-production d’initiatives.",
        benefit: "Accès aux ateliers, au réseau, aux projets et à une communauté orientée exécution.",
        cta: "Devenir membre actif",
      },
      {
        title: "Partenaires",
        audience: "Pour les entreprises, institutions et soutiens qui veulent appuyer un écosystème crédible.",
        contribution: "Appui financier, logistique, institutionnel ou technique pour accélérer les démonstrations et pilotes.",
        benefit: "Positionnement crédible, opportunités de pilotes, accès à des talents et co-branding d’initiatives.",
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
        description: "Le cercle initial qui lance l’ATIAA, donne l’impulsion et pose le cadre d’action.",
      },
      {
        title: "Conseil d’orientation",
        description: "Une couche de recul et d’alignement pour préserver la pertinence, l’équilibre et l’intérêt collectif.",
      },
      {
        title: "Coordination exécutive",
        description: "Le pilotage opérationnel des programmes, partenariats, démonstrations et relations membres.",
      },
      {
        title: "Experts et partenaires contributeurs",
        description: "Les acteurs qui enrichissent les travaux par leur expertise, leurs terrains et leurs capacités de déploiement.",
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
    footerLinks: [
      { label: "Mission", href: "#mission" },
      { label: "Programmes", href: "#programmes" },
      { label: "Projets", href: "#projets" },
      { label: "Adhésion", href: "#adhesion" },
      { label: "Contact", href: "#contact" },
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
    trustRoles: [],
    heroPanel: {
      title: "",
      summary: "",
      items: [],
      metrics: [],
    },
    stats: [],
    pillars: [],
    programmes: [],
    sectors: [],
    projects: [],
    membershipTiers: [],
    supportPoints: [],
    governance: [],
    roadmap: [],
    footerLinks: [],
  },
};
