import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { PRICING, WHATSAPP_LINK } from '@/lib/constants';

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-line/60 py-24 sm:py-32">
      <Container>
        <div className="mb-16 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.18em] text-muted">Tarifs</p>
          <h2 className="mt-4 text-4xl tracking-tighter2 sm:text-5xl">
            Clair, sans engagement,{' '}
            <span className="display-italic text-accent">moins cher qu&apos;un café</span>.
          </h2>
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
        'flex flex-col rounded-2xl border p-8 ' +
        (highlighted
          ? 'border-ink bg-ink text-paper'
          : 'border-line bg-paper text-ink')
      }
    >
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl tracking-tightish">{name}</h3>
        {highlighted && (
          <span className="rounded-full bg-accent px-3 py-1 text-xs uppercase tracking-[0.16em] text-paper">
            Recommandé
          </span>
        )}
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="display-italic text-5xl">{price}</span>
        <span className={highlighted ? 'text-paper/60' : 'text-muted'}>/ {period}</span>
      </div>

      <p className={'mt-4 ' + (highlighted ? 'text-paper/75' : 'text-muted')}>
        {description}
      </p>

      <ul className="mt-8 space-y-3 text-sm">
        {features.map((f) => (
          <li key={f} className="flex gap-3">
            <span className={highlighted ? 'text-accent' : 'text-accent'}>✓</span>
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
