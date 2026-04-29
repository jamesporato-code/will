import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { WHATSAPP_LINK } from '@/lib/constants';

export function CTA() {
  return (
    <section className="border-t border-line/60 py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-paper sm:px-16 sm:py-20">
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.18em] text-paper/55">
              Prêt en 30 secondes
            </p>
            <h2 className="mt-6 text-4xl tracking-tighter2 sm:text-5xl">
              Dis bonjour à Will, il s&apos;occupe{' '}
              <span className="display-italic text-accent">du reste</span>.
            </h2>
            <p className="mt-6 max-w-xl text-paper/70">
              Sept jours offerts, sans carte bancaire, sans rien à installer.
              Tu peux arrêter en envoyant un mot.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href={WHATSAPP_LINK} external variant="primary">
                Démarrer sur WhatsApp
              </ButtonLink>
              <span className="text-sm text-paper/60">
                ou écris-nous{' '}
                <a
                  href="mailto:hello@will-coach.com"
                  className="text-paper underline underline-offset-4 hover:text-accent"
                >
                  hello@will-coach.com
                </a>
              </span>
            </div>
          </div>

          {/* Decorative orbs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 right-32 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
          />
        </div>
      </Container>
    </section>
  );
}
