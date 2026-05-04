'use client';

import { ReactNode } from 'react';
import { track } from '@vercel/analytics';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-paper hover:bg-accent-dark',
  secondary: 'bg-ink text-paper hover:bg-ink/85',
  ghost: 'bg-transparent text-ink border border-ink/15 hover:border-ink/40',
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className = '',
  external = false,
  trackingSource,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  trackingSource?: string;
}) {
  const props = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  const isWhatsappCTA = external && href.includes('wa.me');
  const handleClick = isWhatsappCTA
    ? () => {
        try {
          track('whatsapp_cta_click', {
            source: trackingSource || 'unknown',
          });
        } catch {
          // Analytics ne doit jamais bloquer la navigation
        }
      }
    : undefined;
  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
