import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

// metadataBase : prod domain quand defini, sinon URL Vercel auto, sinon localhost.
// Sans ca, l'OG image generee a `/opengraph-image` pointe sur un domaine qui
// n'existe pas encore et le preview LinkedIn/WhatsApp casse.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  title: 'Will — Coach IA sur WhatsApp',
  description:
    "Will t'apprend à utiliser l'IA dans ton métier, en 5 minutes par jour, directement sur WhatsApp. 7 jours gratuits, sans carte.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Will — Coach IA sur WhatsApp',
    description:
      "Apprends à utiliser l'IA dans ton métier en 5 minutes par jour, directement sur WhatsApp.",
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Will',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Will — Coach IA sur WhatsApp',
    description:
      "Apprends à utiliser l'IA dans ton métier en 5 minutes par jour, directement sur WhatsApp.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${display.variable}`}>
      <body className="bg-paper text-ink font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
