export type SiteLocale = "fr" | "en";
export type ContactIntent = "member" | "partner" | "project";

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  note: string;
}

export interface AudienceJourney {
  intent: ContactIntent;
  label: string;
  title: string;
  description: string;
  proof: string;
  href: string;
  cta: string;
  contactHref: string;
  contactCta: string;
}

export interface ParticipationStep {
  title: string;
  description: string;
}

export interface ProgrammeItem {
  title: string;
  description: string;
  status: string;
  audience: string;
  window: string;
}

export interface FoundingProject {
  name: string;
  description: string;
  scope: string;
  outcome: string;
  stage: string;
  demonstrates: string;
  supportNeeded: string;
}

export interface MembershipTier {
  title: string;
  audience: string;
  contribution: string;
  benefit: string;
  cta: string;
  nextStep: string;
}

export interface GovernanceNode {
  title: string;
  description: string;
}

export interface ProfileSlot {
  group: string;
  placeholder: string;
  role: string;
  focus: string;
  note: string;
}

export interface PartnerTrack {
  title: string;
  description: string;
  value: string;
}

export interface ProofSlot {
  title: string;
  description: string;
  stateLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
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
  intent: ContactIntent;
  title: string;
  description: string;
  href: string;
  nextStep: string;
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
  audienceJourneys: AudienceJourney[];
  participationSteps: ParticipationStep[];
  contactPaths: ContactPath[];
  stats: StatItem[];
  pillars: string[];
  programmes: ProgrammeItem[];
  sectors: string[];
  projects: FoundingProject[];
  membershipTiers: MembershipTier[];
  supportPoints: string[];
  partnerTracks: PartnerTrack[];
  proofSlots: ProofSlot[];
  leadershipProfiles: ProfileSlot[];
  governance: GovernanceNode[];
  faqs: {
    adhesion: FaqItem[];
    contact: FaqItem[];
  };
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
        title: "Trois chemins pour rejoindre la dynamique.",
        description:
          "Que vous souhaitiez rejoindre l’alliance, devenir partenaire fondateur ou proposer un démonstrateur, l’ATIAA ouvre un cadre de contact simple et lisible.",
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
    audienceJourneys: [
      {
        intent: "member",
        label: "Parcours membre",
        title: "Rejoindre l’alliance",
        description:
          "Pour contribuer aux programmes, apprendre sur des cas d’usage concrets et prendre part à une coalition orientée exécution.",
        proof: "Adhésion structurée en trois niveaux, avec orientation vers le bon cadre d’engagement.",
        href: "/adhesion",
        cta: "Voir les niveaux d’adhésion",
        contactHref: "/contact?intent=member",
        contactCta: "Candidater",
      },
      {
        intent: "partner",
        label: "Parcours partenaire",
        title: "Soutenir une infrastructure utile",
        description:
          "Pour appuyer une plateforme sobre, crédible et ancrée dans le terrain, avec des opportunités de pilotes, de co-branding et d’accès à des talents.",
        proof: "Cadres partenaires distincts pour soutien fondateur, programme ou démonstrateur.",
        href: "/partenaires",
        cta: "Voir le cadre partenaire",
        contactHref: "/contact?intent=partner",
        contactCta: "Parler à l’équipe",
      },
      {
        intent: "project",
        label: "Parcours projet",
        title: "Proposer un démonstrateur",
        description:
          "Pour porter un cas d’usage, un format ou un pilote qui peut renforcer la preuve terrain et enrichir le cercle initial d’initiatives.",
        proof: "Les projets fondateurs servent de point d’entrée à d’autres démonstrateurs documentés.",
        href: "/projets",
        cta: "Voir les démonstrateurs",
        contactHref: "/contact?intent=project",
        contactCta: "Proposer un projet",
      },
    ],
    participationSteps: [
      {
        title: "Cadrage initial",
        description:
          "Un premier échange permet de qualifier votre profil, votre objectif et le niveau d’engagement pertinent.",
      },
      {
        title: "Orientation",
        description:
          "L’équipe vous dirige vers l’adhésion, le cadre partenaire ou le bon format de programme ou de projet.",
      },
      {
        title: "Activation",
        description:
          "Le parcours se traduit ensuite par un atelier, un pilote, une contribution ou un soutien structuré.",
      },
    ],
    contactPaths: [
      {
        intent: "member",
        title: "Je veux rejoindre ATIAA",
        description:
          "Pour contribuer, apprendre, participer aux programmes ou intégrer les projets démonstrateurs.",
        href: "/contact?intent=member",
        nextStep: "Entretien de cadrage avec la coordination de lancement.",
      },
      {
        intent: "partner",
        title: "Je veux devenir partenaire fondateur",
        description:
          "Pour soutenir une plateforme d’activation concrète de l’IA appliquée au Togo avec un cadre clair.",
        href: "/contact?intent=partner",
        nextStep: "Qualification du type d’appui, du périmètre et du rythme de contribution.",
      },
      {
        intent: "project",
        title: "Je veux proposer un projet ou un format",
        description:
          "Pour présenter un démonstrateur, un atelier, un pilote ou un format qui mérite d’être activé avec l’alliance.",
        href: "/contact?intent=project",
        nextStep: "Revue du cas d’usage, de la valeur terrain et des besoins d’accompagnement.",
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
        status: "Ouverture progressive",
        audience: "Grand public, organisations, décideurs",
        window: "Temps forts trimestriels",
      },
      {
        title: "Workshops pratiques",
        description:
          "Des sessions opérationnelles pour manipuler les outils, structurer les méthodes et produire des résultats.",
        status: "Priorité lancement",
        audience: "Équipes, praticiens, étudiants",
        window: "Formats courts et récurrents",
      },
      {
        title: "Bootcamps IA",
        description:
          "Des parcours intensifs pour faire monter des équipes et des individus sur des cas d’usage réels.",
        status: "Cohortes ciblées",
        audience: "Talents, écoles, équipes projet",
        window: "Cycles intensifs",
      },
      {
        title: "AI Clinics",
        description:
          "Des permanences d’accompagnement ciblées pour débloquer des besoins métiers et organisationnels.",
        status: "Activation terrain",
        audience: "PME, institutions, médias",
        window: "Sessions sur rendez-vous",
      },
      {
        title: "Showcases partenaires",
        description:
          "Des vitrines crédibles pour des entreprises et institutions qui veulent co-construire des initiatives utiles.",
        status: "Cadre partenaire",
        audience: "Entreprises, bailleurs, institutions",
        window: "Temps forts de visibilité",
      },
      {
        title: "Projets pilotes",
        description:
          "Des expérimentations encadrées avec objectifs, périmètres et apprentissages documentés.",
        status: "Sélection continue",
        audience: "Organisations prêtes à tester",
        window: "Périmètres de 6 à 12 semaines",
      },
      {
        title: "Formation outils avancés",
        description:
          "Un niveau de maturité supérieur pour les équipes qui veulent passer de l’usage ponctuel à l’intégration.",
        status: "Montée en capacité",
        audience: "Équipes métiers et opérationnelles",
        window: "Parcours en petits groupes",
      },
      {
        title: "Cas d’usage sectoriels",
        description:
          "Des formats adaptés aux réalités des PME, écoles, médias, services publics et structures de terrain.",
        status: "Déclinaisons sectorielles",
        audience: "Responsables secteur et porteurs terrain",
        window: "Cadres thématiques documentés",
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
        stage: "Démonstrateur fondateur",
        demonstrates:
          "Une IA organisée comme surface de travail pour produire, analyser et exécuter avec méthode.",
        supportNeeded:
          "Cas d’usage métiers, retours d’équipes pilotes et partenaires capables de documenter l’impact.",
      },
      {
        name: "Glyph",
        description:
          "Couche d’opérations CMS assistée par IA, orientée gouvernance, validation et publication.",
        scope: "Publication, contrôle éditorial, gouvernance de contenu",
        outcome:
          "Illustrer une IA utile aux équipes qui doivent produire vite sans sacrifier la qualité.",
        stage: "Pilote éditorial",
        demonstrates:
          "Comment l’IA peut fluidifier des circuits de validation et de publication tout en gardant des garde-fous clairs.",
        supportNeeded:
          "Équipes médias, institutions, workflows éditoriaux et cas réels de validation à éprouver.",
      },
      {
        name: "Orbis",
        description:
          "Projet d’intelligence locale visant un accès contextualisé au savoir et aux usages de l’IA.",
        scope: "Accès au savoir, contexte local, intelligence de terrain",
        outcome:
          "Faire émerger une IA plus proche des réalités, besoins et langues d’usage locales.",
        stage: "Chantier de connaissance locale",
        demonstrates:
          "La valeur d’un accès au savoir plus contextualisé, plus ancré dans les usages et plus utile au terrain.",
        supportNeeded:
          "Contributions de terrain, partenaires de diffusion et retours d’usage pour renforcer la contextualisation.",
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
        nextStep: "Entretien de cadrage avec le noyau de lancement.",
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
        nextStep: "Orientation vers un programme, un clinic ou un chantier.",
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
        nextStep: "Qualification du type d’appui et du périmètre utile.",
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
    partnerTracks: [
      {
        title: "Partenaire fondateur",
        description:
          "Pour soutenir l’installation du cadre, la lisibilité publique et les premiers actifs de l’alliance.",
        value: "Visibilité institutionnelle, proximité stratégique et rôle structurant dans le lancement.",
      },
      {
        title: "Partenaire programme",
        description:
          "Pour appuyer un cycle d’ateliers, un bootcamp, un clinic ou un format de montée en capacité.",
        value: "Association directe à des formats utiles, visibles et documentables.",
      },
      {
        title: "Partenaire démonstrateur",
        description:
          "Pour rendre possible un pilote, un cas d’usage sectoriel ou un chantier de preuve terrain.",
        value: "Accès à des pilotes concrets et à des retours d’usage mobilisables rapidement.",
      },
    ],
    proofSlots: [
      {
        title: "Entreprise partenaire à annoncer",
        description:
          "Emplacement prévu pour un logo, un nom d’organisation et un court descriptif de soutien.",
        stateLabel: "Espace preuve",
      },
      {
        title: "Institution contributrice à annoncer",
        description:
          "Emplacement prévu pour documenter un appui public, académique ou territorial.",
        stateLabel: "Espace institution",
      },
      {
        title: "Programme soutenu à documenter",
        description:
          "Emplacement prévu pour relier un partenaire à un format ou à un démonstrateur activé.",
        stateLabel: "Espace cas d’usage",
      },
    ],
    leadershipProfiles: [
      {
        group: "Noyau fondateur",
        placeholder: "Profil fondateur à annoncer",
        role: "Coordination et impulsion",
        focus: "Structuration, mise en relation, lancement public",
        note: "Espace prévu pour nom, organisation, biographie courte et photographie.",
      },
      {
        group: "Noyau fondateur",
        placeholder: "Profil fondateur à annoncer",
        role: "Programmes et démonstrations",
        focus: "Formats pratiques, cas d’usage, qualité d’exécution",
        note: "Espace prévu pour documenter le rôle opérationnel dans les premiers programmes.",
      },
      {
        group: "Conseil d’orientation",
        placeholder: "Profil conseil à annoncer",
        role: "Recul stratégique et intégrité",
        focus: "Neutralité, alignement, intérêt collectif",
        note: "Espace prévu pour futur profil d’orientation ou de référence sectorielle.",
      },
      {
        group: "Experts et contributeurs",
        placeholder: "Profil expert à annoncer",
        role: "Expertise appliquée et accompagnement",
        focus: "Soutien terrain, cas d’usage, accompagnement de pilotes",
        note: "Espace prévu pour expert, partenaire académique ou contributeur sectoriel.",
      },
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
    faqs: {
      adhesion: [
        {
          question: "Faut-il déjà être une structure établie pour adhérer ?",
          answer:
            "Non. L’adhésion vise aussi des porteurs de projet, des experts et des équipes en structuration, tant qu’ils peuvent contribuer de manière concrète.",
        },
        {
          question: "L’adhésion donne-t-elle automatiquement accès à tous les programmes ?",
          answer:
            "Non. L’adhésion clarifie d’abord le rôle et le niveau d’engagement. L’accès aux formats dépend ensuite de la pertinence, des capacités et du calendrier.",
        },
        {
          question: "Comment se passe l’entrée dans l’alliance ?",
          answer:
            "Un premier échange cadre votre profil, puis l’équipe vous oriente vers le bon niveau d’engagement ou le bon format d’activation.",
        },
      ],
      contact: [
        {
          question: "Que se passe-t-il après l’envoi du message ?",
          answer:
            "La coordination examine le parcours sélectionné, puis revient vers vous pour un cadrage, une orientation ou une proposition d’étape suivante.",
        },
        {
          question: "Puis-je proposer un format ou un projet même s’il n’est pas finalisé ?",
          answer:
            "Oui. L’objectif du premier contact est précisément d’évaluer la maturité, le potentiel terrain et les besoins d’accompagnement du projet.",
        },
        {
          question: "Les partenaires peuvent-ils soutenir un seul programme ?",
          answer:
            "Oui. Le soutien peut être global ou ciblé sur un format, un pilote ou un démonstrateur précis selon le type d’appui recherché.",
        },
      ],
    },
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
    audienceJourneys: [],
    participationSteps: [],
    contactPaths: [],
    stats: [],
    pillars: [],
    programmes: [],
    sectors: [],
    projects: [],
    membershipTiers: [],
    supportPoints: [],
    partnerTracks: [],
    proofSlots: [],
    leadershipProfiles: [],
    governance: [],
    faqs: {
      adhesion: [],
      contact: [],
    },
    roadmap: [],
  },
};
