import { Container } from './Container';
import { ButtonLink } from './Button';
import { WHATSAPP_LINK } from '@/lib/constants';

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/85 backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-ink">
            <span className="display-italic text-2xl tracking-tightish">Will</span>
            <span className="hidden text-sm text-muted sm:inline">— Coach IA</span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-muted md:flex">
            <a href="#how" className="hover:text-ink">Comment ça marche</a>
            <a href="#secteurs" className="hover:text-ink">Secteurs</a>
            <a href="#pricing" className="hover:text-ink">Tarifs</a>
            <a href="#faq" className="hover:text-ink">FAQ</a>
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
