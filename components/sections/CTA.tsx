import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { WHATSAPP_LINK } from '@/lib/constants';

export function CTA() {
  return (
    <section className="border-t border-line py-32 sm:py-48">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl tracking-tighter2 sm:text-6xl">
            Dis bonjour à{' '}
            <span className="display-italic text-accent">Will</span>.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg text-muted">
            Sept jours offerts, sans carte bancaire. Tu peux arrêter en envoyant
            un mot.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href={WHATSAPP_LINK} external variant="primary">
              Démarrer sur WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
