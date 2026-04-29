import { Container } from '../Container';
import { ButtonLink } from '../Button';
import { PRICING, WHATSAPP_LINK } from '@/lib/constants';

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-line py-28 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[28rem] w-[28rem] rounded-full bg-whatsapp/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-20 h-72 w-72 rounded-full bg-accent/10 blur-[100px]"
      />

      <Container className="relative">
        <div className="mb-20 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Tarifs</p>
          <h2 className="mt-5 text-4xl tracking-tighter2 sm:text-5xl">
            Clair, sans engagement.
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
    <div
      className={
        'relative flex flex-col gap-8 rounded-3xl p-10 sm:p-12 ' +
        (isPrimary
          ? 'bg-whatsapp-deep text-paper shadow-[0_30px_80px_-30px_rgba(7,94,84,0.6)] ring-1 ring-white/10'
          : 'bg-white/40 text-ink ring-1 ring-line backdrop-blur-xl')
      }
    >
      {isPrimary && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-56 w-56 rounded-full bg-whatsapp/30 blur-3xl"
        />
      )}

      <div className="relative flex items-baseline justify-between">
        <h3 className="text-xl tracking-tightish">{name}</h3>
        {isPrimary && (
          <span className="text-xs uppercase tracking-[0.18em] text-paper/70">
            Recommandé
          </span>
        )}
      </div>

      <div className="relative">
        <div className="flex items-baseline gap-2">
          <span className="display-italic text-6xl leading-none">{price}</span>
          <span className={isPrimary ? 'text-paper/60' : 'text-muted'}>
            / {period}
          </span>
        </div>
        <p className={'mt-5 max-w-md ' + (isPrimary ? 'text-paper/75' : 'text-muted')}>
          {description}
        </p>
      </div>

      <ul className="relative space-y-2.5 text-[15px]">
        {features.map((f) => (
          <li key={f} className="flex gap-3">
            <span
              className={isPrimary ? 'text-whatsapp' : 'text-muted'}
              aria-hidden
            >
              —
            </span>
            <span className={isPrimary ? 'text-paper/90' : 'text-ink'}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-2">
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
