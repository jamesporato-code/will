# Will — Site

Site marketing de Will, le coach IA sur WhatsApp.

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript 5
- Tailwind CSS 3.4
- Fonts : Inter + Instrument Serif (via `next/font/google`)
- Déploiement : Vercel

## Lancer en local

```bash
npm install
npm run dev
```

Le site est servi sur `http://localhost:3000`.

## Déploiement Vercel

1. Pousser le repo sur GitHub.
2. Sur [vercel.com](https://vercel.com), `Add new… → Project` puis sélectionner le repo.
3. Vercel détecte automatiquement Next.js. Aucune variable d'environnement requise.
4. `Deploy`. Une URL `*.vercel.app` est générée.
5. Pour le domaine custom (ex. `will-coach.com`) : onglet `Domains`, ajouter le domaine, suivre les instructions DNS.

## Structure

```
app/
  layout.tsx            # fonts, metadata, html lang=fr
  page.tsx              # landing
  globals.css           # tailwind + base
  privacy/page.tsx      # politique de confidentialité
  cgu/page.tsx          # CGU
components/
  Container.tsx
  Button.tsx
  Nav.tsx
  Footer.tsx
  LegalLayout.tsx
  sections/
    Hero.tsx
    HowItWorks.tsx
    Sectors.tsx
    Features.tsx
    Pricing.tsx
    FAQ.tsx
    CTA.tsx
lib/
  constants.ts          # BRAND, WHATSAPP_LINK, PRICING, SECTORS
```

## Charte

- Fond : `#FAF7F2` (paper)
- Texte : `#111111` (ink)
- Accent : `#FF5A1F` (orange vif)
- Display : Instrument Serif (italique signature)
- Body : Inter

Aucun logo bitmap : la marque s'écrit en italique serif.
