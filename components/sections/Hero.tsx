import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { WhatsappMock } from '../WhatsappMock';
import { WHATSAPP_LINK } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* Ambient orbs (color presence, blurred behind) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-32 h-[34rem] w-[34rem] rounded-full bg-whatsapp/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 -bottom-24 h-72 w-72 rounded-full bg-whatsapp-deep/10 blur-[100px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
              Coach IA — sur WhatsApp
            </p>

            <h1 className="text-balance text-[44px] leading-[1.02] tracking-tighter2 sm:text-[60px] md:text-[72px]">
              Un{' '}
              <span className="display-italic text-accent">coach&nbsp;IA</span>{' '}
              pour ton métier.
            </h1>

            <p className="mt-8 max-w-prose2 text-lg text-muted sm:text-xl">
              Cinq minutes par jour, sur WhatsApp. Pas une appli de plus à installer —
              juste un message, un concept, un défi appliqué à ce que tu fais.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <ButtonLink href={WHATSAPP_LINK} external variant="primary" trackingSource="hero">
                Démarrer
              </ButtonLink>
              <span className="text-sm text-muted">
                7 jours offerts, sans carte.
              </span>
            </div>
          </div>

          {/* Glass frame around mockup */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[40px] bg-white/30 backdrop-blur-2xl ring-1 ring-white/40"
            />
            <WhatsappMock />
          </div>
        </div>
      </Container>
    </section>
  );
}
