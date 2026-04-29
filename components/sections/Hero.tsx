import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { WHATSAPP_LINK } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Nouveau · 7 jours offerts
          </p>

          <h1 className="text-balance text-5xl leading-[1.05] tracking-tighter2 sm:text-6xl md:text-7xl">
            Un <span className="display-italic text-accent">coach IA</span> pour
            ton métier.
            <br />
            Sur WhatsApp.
          </h1>

          <p className="mt-8 max-w-prose2 text-lg text-muted sm:text-xl">
            Will t&apos;envoie chaque jour une session de 5 minutes pour apprendre à
            utiliser l&apos;IA dans ton métier. Pas une appli de plus à installer —
            juste WhatsApp, comme un coach qui te suit.
          </p>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink href={WHATSAPP_LINK} external variant="primary">
              Démarrer mon essai gratuit
            </ButtonLink>
            <a
              href="#how"
              className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              Voir comment ça marche →
            </a>
          </div>

          <p className="mt-6 text-sm text-muted">
            7 jours gratuits · Sans carte bancaire · Annulable en 1 clic
          </p>
        </div>
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 hidden h-96 w-96 rounded-full bg-accent/10 blur-3xl md:block"
      />
    </section>
  );
}
