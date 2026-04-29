import { Container } from './Container';
import { WHATSAPP_LINK } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line/60 bg-paper py-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-[2fr_1fr_1fr] sm:gap-12">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper"
              >
                <span className="display-italic text-lg leading-none">W</span>
              </span>
              <span className="display-italic text-2xl text-ink">Will</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Coach IA sur WhatsApp. Cinq minutes par jour, sur ton métier.
              Fait à Paris, hébergé en Europe.
            </p>
          </div>

          <nav>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Produit</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#how" className="text-ink hover:text-accent">
                  Comment ça marche
                </a>
              </li>
              <li>
                <a href="#secteurs" className="text-ink hover:text-accent">
                  Secteurs
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-ink hover:text-accent">
                  Tarifs
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-accent"
                >
                  Démarrer →
                </a>
              </li>
            </ul>
          </nav>

          <nav>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Mentions</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/privacy" className="text-ink hover:text-accent">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="/cgu" className="text-ink hover:text-accent">
                  CGU
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@will-coach.com"
                  className="text-ink hover:text-accent"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line/60 pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Will. Tous droits réservés.</p>
          <p>
            Will est un service indépendant. WhatsApp est une marque de Meta.
          </p>
        </div>
      </Container>
    </footer>
  );
}
