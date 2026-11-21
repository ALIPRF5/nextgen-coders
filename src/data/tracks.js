// The five club tracks. Text lives here so copy changes never touch the UI code.
export const tracks = [
  {
    id: 'web',
    icon: 'web',
    name: { fr: 'Web & Full-Stack', en: 'Web & Full-Stack' },
    tagline: {
      fr: 'Du premier bouton au site complet.',
      en: 'From the first button to the full site.',
    },
    learn: {
      fr: [
        'HTML, CSS et JavaScript',
        'React et les interfaces modernes',
        'API et bases de données',
        "Déployer un site en ligne",
      ],
      en: [
        'HTML, CSS and JavaScript',
        'React and modern interfaces',
        'APIs and databases',
        'Shipping a site live',
      ],
    },
    forWho: {
      fr: "Pour ceux qui veulent voir leur travail en ligne, accessible à tous.",
      en: 'For people who want their work online, where anyone can use it.',
    },
  },
  {
    id: 'ai',
    icon: 'ai',
    name: { fr: 'AI & Machine Learning', en: 'AI & Machine Learning' },
    tagline: {
      fr: 'Comprendre les modèles, pas seulement les utiliser.',
      en: 'Understand the models, not just use them.',
    },
    learn: {
      fr: [
        'Python et les données',
        'Entraîner un premier modèle',
        'Évaluer et améliorer un modèle',
        'Utiliser des API de LLM',
      ],
      en: [
        'Python and data',
        'Training a first model',
        'Evaluating and improving a model',
        'Working with LLM APIs',
      ],
    },
    forWho: {
      fr: 'Pour les curieux qui aiment les maths et les systèmes qui apprennent.',
      en: 'For curious minds who like maths and systems that learn.',
    },
  },
  {
    id: 'cyber',
    icon: 'cyber',
    name: { fr: 'Cybersecurity & CTF', en: 'Cybersecurity & CTF' },
    tagline: {
      fr: "Penser comme l'attaquant, protéger comme le défenseur.",
      en: 'Think like the attacker, defend like the defender.',
    },
    learn: {
      fr: [
        'Réseaux et Linux',
        'Sécurité des applications web',
        'CTF et challenges',
        'Bonnes pratiques de défense',
      ],
      en: [
        'Networks and Linux',
        'Web application security',
        'CTFs and challenges',
        'Defensive best practices',
      ],
    },
    forWho: {
      fr: "Pour ceux qui aiment les puzzles et comprendre comment ça casse.",
      en: 'For people who like puzzles and understanding how things break.',
    },
  },
  {
    id: 'systems',
    icon: 'systems',
    name: { fr: 'Systems & Robotics', en: 'Systems & Robotics' },
    tagline: {
      fr: 'Du code qui bouge.',
      en: 'Code that moves.',
    },
    learn: {
      fr: [
        'C et Python embarqué',
        'Arduino et capteurs',
        'Électronique de base',
        'Construire un petit robot',
      ],
      en: [
        'C and embedded Python',
        'Arduino and sensors',
        'Basic electronics',
        'Building a small robot',
      ],
    },
    forWho: {
      fr: 'Pour les bidouilleurs qui veulent toucher au matériel.',
      en: 'For tinkerers who want to work with hardware.',
    },
  },
  {
    id: 'design',
    icon: 'design',
    name: { fr: 'UI/UX Design', en: 'UI/UX Design' },
    tagline: {
      fr: 'Concevoir avant de coder.',
      en: 'Design before you code.',
    },
    learn: {
      fr: [
        'Figma et prototypage',
        'Recherche utilisateur',
        'Design systems',
        'Accessibilité',
      ],
      en: [
        'Figma and prototyping',
        'User research',
        'Design systems',
        'Accessibility',
      ],
    },
    forWho: {
      fr: 'Pour les créatifs qui veulent rendre le web clair et utilisable.',
      en: 'For creatives who want the web to be clear and usable.',
    },
  },
]

export const TRACK_IDS = tracks.map((track) => track.id)
