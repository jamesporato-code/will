import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { WHATSAPP_LINK } from '@/lib/constants';

export function CTA() {
  return (
    <section className="border-t border-line/60 py-24 sm:py-32">
      <Container>
        <div className="rounded-3xl bg-ink px-8 py-16 text-paper sm:px-16 sm:py-20">
          <p className="text-sm uppercase tracking-[0.18em] text-paper/60">
            Prêt en 30 secondes
          </p>
          <h2 className="mt-6 max-w-2xl text-4xl tracking-tighter2 sm:text-5xl">
            Dis bonjour à Will, il s&apos;occupe{' '}
            <span className="display-italic text-accent">du reste</span>.
          </h2>
          <p className="mt-6 max-w-xl text-paper/70">
            Sept jours offerts, sans carte bancaire, sans rien à installer.
          </p>
          <div className="mt-10">
            <ButtonLink href={WHATSAPP_LINK} external variant="primary">
              Démarrer mon essai gratuit
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
