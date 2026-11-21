// Every event below comes from the club brief — no invented dates, numbers or results.
export const events = [
  {
    id: 'hackathon-avril-2027',
    status: 'upcoming',
    featured: true,
    title: {
      fr: 'Hackathon : le meilleur site de club',
      en: 'Hackathon: the best club website',
    },
    date: { fr: 'avril 2027', en: 'April 2027' },
    dateNote: { fr: 'date à confirmer', en: 'date to be confirmed' },
    badge: { top: 'AVR.', bottom: '2027' },
    description: {
      fr: '6 équipes et 25 participants sur un seul sujet : construire le meilleur site de club.',
      en: '6 teams and 25 participants on a single brief: build the best club website.',
    },
    image: '/images/upcoming-hackathon.webp',
    imageAlt: {
      fr: "Affiche typographique du hackathon d'avril 2027 : « Hackathon avril 2027 — date à confirmer ».",
      en: 'Typographic poster for the April 2027 hackathon: “Hackathon April 2027 — date to be confirmed”.',
    },
    facts: [
      { value: '6', label: { fr: 'équipes', en: 'teams' } },
      { value: '25', label: { fr: 'participants', en: 'participants' } },
    ],
  },
  {
    id: 'hackathon-sante-2026',
    status: 'past',
    title: { fr: 'Hackathon santé', en: 'Health-tech hackathon' },
    date: { fr: '28–29 octobre 2026', en: '28–29 October 2026' },
    badge: { top: '28–29', bottom: 'OCT. 2026' },
    description: {
      fr: 'Un hackathon de 48 heures organisé par le club : 31 participants, 9 projets autour de la santé.',
      en: 'A 48-hour hackathon organised by the club: 31 participants and 9 projects around health.',
    },
    image: '/images/event-health.webp',
    imageAlt: {
      fr: "L'équipe Tibway présente sa plateforme médicale sur la scène du hackathon santé.",
      en: 'The Tibway team presents its medical platform on the health-tech hackathon stage.',
    },
    facts: [
      { value: '31', label: { fr: 'participants', en: 'participants' } },
      { value: '9', label: { fr: 'projets', en: 'projects' } },
      { value: '48 h', label: { fr: 'de construction', en: 'of building' } },
    ],
  },
  {
    id: 'best-website-2026',
    status: 'past',
    title: { fr: 'Best Website Competition', en: 'Best Website Competition' },
    date: { fr: 'mars 2026', en: 'March 2026' },
    badge: { top: 'MAR.', bottom: '2026' },
    description: {
      fr: 'La première édition de la compétition de sites web du club.',
      en: 'The first edition of the club’s website competition.',
    },
    image: '/images/event-website.webp',
    imageAlt: {
      fr: 'Des étudiants réunis autour d’une table devant la bannière NEXTGEN CODERS pendant la Best Website Competition.',
      en: 'Students gathered around a table in front of the NEXTGEN CODERS banner during the Best Website Competition.',
    },
    facts: [{ value: '1re', label: { fr: 'édition', en: 'edition' } }],
  },
  {
    id: 'atelier-n8n-2026',
    status: 'past',
    title: { fr: 'Atelier n8n', en: 'n8n workshop' },
    date: { fr: 'février 2026', en: 'February 2026' },
    badge: { top: 'FÉV.', bottom: '2026' },
    description: {
      fr: "Un atelier sur l'automatisation avec n8n. 50 participants, et de vrais certificats à la sortie.",
      en: 'A workshop on automation with n8n. 50 participants, with real certificates at the end.',
    },
    image: '/images/event-n8n.webp',
    imageAlt: {
      fr: 'Un intervenant présente l’atelier n8n devant un grand écran.',
      en: 'A speaker presents the n8n workshop in front of a large screen.',
    },
    facts: [{ value: '50', label: { fr: 'participants', en: 'participants' } }],
  },
  {
    id: 'computer-day-2026',
    status: 'past',
    title: { fr: 'Computer Day', en: 'Computer Day' },
    date: { fr: '22 janvier 2026', en: '22 January 2026' },
    badge: { top: '22', bottom: 'JAN. 2026' },
    description: {
      fr: "La journée informatique de l'EST Laâyoune, avec le club.",
      en: 'Computer Day at EST Laayoune, with the club.',
    },
    image: '/images/event-computer-day.webp',
    imageAlt: {
      fr: 'Un intervenant présente devant l’écran du club pendant Computer Day.',
      en: 'A speaker presents in front of the club screen during Computer Day.',
    },
    facts: [],
  },
  {
    id: 'rencontre-bmce-2026',
    status: 'past',
    title: { fr: 'Rencontre avec Bank of Africa', en: 'Meeting with Bank of Africa' },
    date: { fr: 'novembre 2026', en: 'November 2026' },
    badge: { top: 'NOV.', bottom: '2026' },
    description: {
      fr: "Une rencontre avec Bank of Africa (BMCE Group) autour de l'offre jeunesse, dans le cadre de la saison 2026/2027.",
      en: 'A meeting with Bank of Africa (BMCE Group) around their youth offer, as part of the 2026/2027 season.',
    },
    image: '/images/event-partners.webp',
    imageAlt: {
      fr: "Un représentant de Bank of Africa présente l'offre jeunesse devant des étudiants.",
      en: 'A Bank of Africa representative presents the youth offer to students.',
    },
    facts: [],
  },
]

export const nextEvent = events.find((event) => event.status === 'upcoming')
