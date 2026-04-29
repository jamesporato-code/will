import { Container } from './Container';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line/60 py-12">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="display-italic text-2xl text-ink">Will</p>
            <p className="mt-1 text-sm text-muted">Coach IA sur WhatsApp · Fait à Paris.</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <a href="/privacy" className="hover:text-ink">Confidentialité</a>
            <a href="/cgu" className="hover:text-ink">CGU</a>
            <a href="mailto:hello@will-coach.com" className="hover:text-ink">Contact</a>
          </nav>
        </div>
        <p className="mt-8 text-xs text-muted">© {year} Will. Tous droits réservés.</p>
      </Container>
    </footer>
  );
}
