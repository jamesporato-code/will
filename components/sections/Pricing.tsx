import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { PRICING, WHATSAPP_LINK } from '@/lib/constants';

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-line py-28 sm:py-40">
      <Container>
        <div className="mb-20 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Tarifs</p>
          <h2 className="mt-5 text-4xl tracking-tighter2 sm:text-5xl">
            Clair, sans engagement.
          </h2>
        </div>

        <div className="grid divide-y divide-line border-y border-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          <PricingCard
            name={PRICING.trial.name}
            price={PRICING.trial.price}
            period={PRICING.trial.period}
            description={PRICING.trial.description}
            features={[...PRICING.trial.features]}
            cta={PRICING.trial.cta}
            ctaHref={WHATSAPP_LINK}
            variant="ghost"
          />
          <PricingCard
            name={PRICING.pro.name}
            price={PRICING.pro.price}
            period={PRICING.pro.period}
            description={PRICING.pro.description}
            features={[...PRICING.pro.features]}
            cta={PRICING.pro.cta}
            ctaHref={WHATSAPP_LINK}
            variant="primary"
          />
        </div>

        <p className="mt-10 text-sm text-muted">
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
  variant,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  variant: 'ghost' | 'primary';
}) {
  const isPrimary = variant === 'primary';
  return (
    <div className="flex flex-col gap-8 px-2 py-12 sm:px-10">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl tracking-tightish">{name}</h3>
        {isPrimary && (
          <span className="text-xs uppercase tracking-[0.18em] text-accent">
            Recommandé
          </span>
        )}
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="display-italic text-6xl leading-none">{price}</span>
          <span className="text-muted">/ {period}</span>
        </div>
        <p className="mt-5 max-w-md text-muted">{description}</p>
      </div>

      <ul className="space-y-2.5 text-[15px] text-ink">
        {features.map((f) => (
          <li key={f} className="flex gap-3">
            <span className="text-muted" aria-hidden>—</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-2">
        <ButtonLink
          href={ctaHref}
          external
          variant={isPrimary ? 'primary' : 'ghost'}
        >
          {cta}
        </ButtonLink>
      </div>
    </div>
  );
}
