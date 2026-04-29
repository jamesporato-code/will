import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { WhatsappMock } from '../WhatsappMock';
import { WHATSAPP_LINK } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* Left — copy */}
          <div>
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Nouveau · 7 jours offerts
            </p>

            <h1 className="text-balance text-[44px] leading-[1.02] tracking-tighter2 sm:text-6xl md:text-[68px]">
              Un{' '}
              <span className="display-italic text-accent">coach&nbsp;IA</span>{' '}
              pour ton métier. Sur{' '}
              <span className="whitespace-nowrap">
                Wh
                <span className="text-accent">a</span>
                tsApp.
              </span>
            </h1>

            <p className="mt-7 max-w-prose2 text-lg text-muted sm:text-xl">
              Will t&apos;envoie chaque jour une session de 5 minutes pour apprendre à
              utiliser l&apos;IA dans ton métier. Pas une appli de plus à installer —
              juste WhatsApp, comme un coach qui te suit.
            </p>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <ButtonLink href={WHATSAPP_LINK} external variant="primary">
                Démarrer mon essai
              </ButtonLink>
              <a
                href="#how"
                className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Voir comment ça marche →
              </a>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> 7 jours gratuits
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Sans carte bancaire
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Stop en 1 message
              </li>
            </ul>
          </div>

          {/* Right — mock */}
          <div className="relative">
            <WhatsappMock />
          </div>
        </div>
      </Container>

      {/* Background ambience */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-32 hidden h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 hidden h-72 w-72 rounded-full bg-ink/5 blur-3xl lg:block"
      />
    </section>
  );
}
