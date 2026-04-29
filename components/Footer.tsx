import { Container } from './Container';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-16">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="display-italic text-3xl text-ink">Will</p>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Coach IA sur WhatsApp. Cinq minutes par jour, sur ton métier.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a href="#pricing" className="text-ink hover:text-accent">
              Tarifs
            </a>
            <a href="#faq" className="text-ink hover:text-accent">
              FAQ
            </a>
            <a href="/privacy" className="text-ink hover:text-accent">
              Confidentialité
            </a>
            <a href="/cgu" className="text-ink hover:text-accent">
              CGU
            </a>
            <a
              href="mailto:hello@will-coach.com"
              className="text-ink hover:text-accent"
            >
              Contact
            </a>
          </nav>
        </div>

        <p className="mt-12 text-xs text-muted">
          © {year} Will. WhatsApp est une marque de Meta — Will est un service indépendant.
        </p>
      </Container>
    </footer>
  );
}
