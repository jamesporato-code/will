import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { PRICING, WHATSAPP_LINK } from '@/lib/constants';

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-line/60 py-24 sm:py-32">
      <Container>
        <div className="mb-16 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.18em] text-muted">Tarifs</p>
            <h2 className="mt-4 text-4xl tracking-tighter2 sm:text-5xl">
              Clair, sans engagement,{' '}
              <span className="display-italic text-accent">moins cher qu&apos;un café</span>.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted lg:block">
            Tu démarres gratuitement. Si tu continues, c&apos;est 6,99 € par mois,
            stop quand tu veux.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <PricingCard
            name={PRICING.trial.name}
            price={PRICING.trial.price}
            period={PRICING.trial.period}
            description={PRICING.trial.description}
            features={[...PRICING.trial.features]}
            cta={PRICING.trial.cta}
            ctaHref={WHATSAPP_LINK}
          />
          <PricingCard
            name={PRICING.pro.name}
            price={PRICING.pro.price}
            period={PRICING.pro.period}
            description={PRICING.pro.description}
            features={[...PRICING.pro.features]}
            cta={PRICING.pro.cta}
            ctaHref={WHATSAPP_LINK}
            highlighted
          />
        </div>

        <p className="mt-8 text-center text-xs text-muted sm:text-left">
          Paiement sécurisé · Résiliable en envoyant <em>stop</em> à Will.
        </p>
      </Container>
    </section>
  );
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  ctaHref,
  highlighted = false,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={
        'relative flex flex-col rounded-3xl border p-8 sm:p-10 ' +
        (highlighted
          ? 'border-ink bg-ink text-paper'
          : 'border-line bg-paper text-ink')
      }
    >
      {highlighted && (
        <div className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-paper">
          Recommandé
        </div>
      )}

      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl tracking-tightish">{name}</h3>
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="display-italic text-6xl leading-none">{price}</span>
        <span className={highlighted ? 'text-paper/60' : 'text-muted'}>
          / {period}
        </span>
      </div>

      <p className={'mt-5 ' + (highlighted ? 'text-paper/75' : 'text-muted')}>
        {description}
      </p>

      <ul
        className={
          'mt-8 space-y-3 border-t pt-8 text-sm ' +
          (highlighted ? 'border-paper/15' : 'border-line')
        }
      >
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span
              className={
                'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ' +
                (highlighted ? 'bg-accent text-paper' : 'bg-accent/15 text-accent')
              }
              aria-hidden
            >
              ✓
            </span>
            <span className={highlighted ? 'text-paper/90' : 'text-ink'}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <ButtonLink
          href={ctaHref}
          external
          variant={highlighted ? 'primary' : 'secondary'}
          className="w-full sm:w-auto"
        >
          {cta}
        </ButtonLink>
      </div>
    </div>
  );
}
