import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { WHATSAPP_LINK } from '@/lib/constants';

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-line py-28 sm:py-40">
      {/* Color composition behind glass */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-10 h-96 w-96 rounded-full bg-accent/30 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 bottom-10 h-[28rem] w-[28rem] rounded-full bg-whatsapp/30 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-whatsapp-deep/20 blur-[100px]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl rounded-[32px] bg-white/35 px-8 py-16 text-center backdrop-blur-2xl ring-1 ring-white/40 sm:px-16 sm:py-20">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Prêt en 30 secondes
          </p>
          <h2 className="mt-6 text-balance text-4xl tracking-tighter2 sm:text-6xl">
            Dis bonjour à{' '}
            <span className="display-italic text-accent">Will</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
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
