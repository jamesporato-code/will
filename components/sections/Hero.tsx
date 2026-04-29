import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { WhatsappMock } from '../WhatsappMock';
import { WHATSAPP_LINK } from '@/lib/constants';

export function Hero() {
  return (
    <section className="pt-20 pb-24 sm:pt-28 sm:pb-32">
      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="mb-8 text-xs uppercase tracking-[0.22em] text-muted">
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
              <ButtonLink href={WHATSAPP_LINK} external variant="primary">
                Démarrer
              </ButtonLink>
              <span className="text-sm text-muted">
                7 jours offerts, sans carte.
              </span>
            </div>
          </div>

          <div>
            <WhatsappMock />
          </div>
        </div>
      </Container>
    </section>
  );
}
