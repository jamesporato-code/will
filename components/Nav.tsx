import { Container } from './Container';
import { ButtonLink } from './Button';
import { WHATSAPP_LINK } from '@/lib/constants';

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/70 backdrop-blur-xl">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <a
            href="/"
            className="display-italic text-2xl tracking-tightish text-ink"
          >
            Will
          </a>

          <div className="hidden items-center gap-9 text-sm text-muted md:flex">
            <a href="#how" className="transition-colors hover:text-ink">
              Comment ça marche
            </a>
            <a href="#secteurs" className="transition-colors hover:text-ink">
              Secteurs
            </a>
            <a href="#pricing" className="transition-colors hover:text-ink">
              Tarifs
            </a>
            <a href="#faq" className="transition-colors hover:text-ink">
              FAQ
            </a>
          </div>

          <ButtonLink
            href={WHATSAPP_LINK}
            external
            variant="primary"
            className="px-5 py-2 text-sm"
            trackingSource="nav"
          >
            Essayer
          </ButtonLink>
        </nav>
      </Container>
    </header>
  );
}
