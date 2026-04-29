export const BRAND = {
  name: 'Will',
  tagline: 'Coach IA sur WhatsApp',
} as const;

// Numero WhatsApp business (cf. backend, /Users/jamesporato/Code/will-backend)
export const WHATSAPP_NUMBER = '33749181083';
export const WHATSAPP_DEFAULT_TEXT = 'Salut Will, je veux essayer.';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_TEXT)}`;

export const PRICING = {
  trial: {
    name: 'Essai gratuit',
    price: '0 €',
    period: '7 jours',
    description: 'Decouvre le Module 1 (Introduction a l\'IA) — 5 sessions cadrees sur ton metier.',
    features: [
      '5 sessions du Module 1',
      'Sessions adaptees a ton secteur',
      'Mini-defis quotidiens',
      'Sans carte bancaire',
    ],
    cta: 'Demarrer mon essai',
  },
  pro: {
    name: 'Pro',
    price: '6,99 €',
    period: 'par mois',
    description: 'Le parcours complet qui s\'enrichit en continu, plus l\'actu IA, les outils et les prompts du jour.',
    features: [
      'Parcours complet (10 modules en cours d\'enrichissement)',
      'Actu IA chaque matin',
      'Outils et prompts du jour',
      'Recap hebdo personnalise',
      'Sans engagement, annulable en 1 clic',
    ],
    cta: 'Passer Pro',
  },
} as const;

export const SECTORS = [
  { slug: 'sales',        label: 'Sales / Business Dev' },
  { slug: 'marketing',    label: 'Marketing & Communication' },
  { slug: 'consulting',   label: 'Conseil & Strategie' },
  { slug: 'product',      label: 'Produit & Tech' },
  { slug: 'finance',      label: 'Finance & Compta' },
  { slug: 'rh',           label: 'RH & Management' },
  { slug: 'legal',        label: 'Juridique' },
  { slug: 'education',    label: 'Education & Formation' },
  { slug: 'creative',     label: 'Creation & Contenu' },
  { slug: 'entrepreneur', label: 'Founder / Entrepreneur' },
] as const;
