import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Will — Coach IA sur WhatsApp',
  description:
    "Will t'apprend à utiliser l'IA dans ton métier, en 5 minutes par jour, directement sur WhatsApp. 7 jours gratuits, sans carte.",
  metadataBase: new URL('https://will-coach.com'),
  openGraph: {
    title: 'Will — Coach IA sur WhatsApp',
    description:
      "Apprends à utiliser l'IA dans ton métier en 5 minutes par jour, directement sur WhatsApp.",
    type: 'website',
    locale: 'fr_FR',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${display.variable}`}>
      <body className="bg-paper text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
