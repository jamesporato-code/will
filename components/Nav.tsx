import { Container } from './Container';
import { ButtonLink } from './Button';
import { WHATSAPP_LINK } from '@/lib/constants';

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/85 backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 text-ink">
            <span
              aria-hidden
              className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper"
            >
              <span className="display-italic text-base leading-none">W</span>
            </span>
            <span className="display-italic text-xl tracking-tightish">Will</span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-muted md:flex">
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
          >
            Essayer
          </ButtonLink>
        </nav>
      </Container>
    </header>
  );
}
