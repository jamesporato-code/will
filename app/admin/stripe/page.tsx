import { adminFetch } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Stripe — Will admin' };

type Config = {
  mode: 'live' | 'test' | 'missing';
  has_secret_key: boolean;
  has_webhook_secret: boolean;
  has_price_pro: boolean;
  price_pro: {
    id: string;
    amount: number;
    currency: string;
    interval: string | null;
    active: boolean;
    livemode: boolean;
    product: string;
    nickname: string | null;
  } | null;
  price_pro_error: string | null;
  webhooks: {
    id: string;
    url: string;
    enabled_events: string[];
    status: string;
    livemode: boolean;
  }[];
  webhooks_error: string | null;
};

const REQUIRED_EVENTS = [
  'checkout.session.completed',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
  'customer.subscription.deleted',
  'customer.subscription.updated',
];

export default async function StripeConfigPage() {
  const res = await adminFetch<Config>('/api/admin/stripe-config');
  if (!res.ok) {
    return (
      <div className="rounded-lg border border-[#da3633] bg-[#2a1213] p-6 text-[#ff7b72]">
        Erreur {res.status} : {res.error.substring(0, 300)}
      </div>
    );
  }
  const cfg = res.data;
  const expectedWebhookUrl =
    'https://will-backend-production.up.railway.app/api/stripe/webhook';
  const matchingWebhook = cfg.webhooks.find(
    (w) => w.url === expectedWebhookUrl
  );
  const missingEvents = matchingWebhook
    ? REQUIRED_EVENTS.filter((e) => !matchingWebhook.enabled_events.includes(e))
    : REQUIRED_EVENTS;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Stripe configuration
        </h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          Vérifie que la production est branchée correctement.
        </p>
      </header>

      <section>
        <SectionTitle>Variables d&apos;environnement</SectionTitle>
        <div className="grid gap-3 md:grid-cols-3">
          <Check
            label="STRIPE_SECRET_KEY"
            ok={cfg.has_secret_key}
            extra={cfg.mode}
          />
          <Check
            label="STRIPE_WEBHOOK_SECRET"
            ok={cfg.has_webhook_secret}
            extra={cfg.has_webhook_secret ? '' : 'webhook non sécurisé'}
            warn={!cfg.has_webhook_secret}
          />
          <Check
            label="STRIPE_PRICE_PRO"
            ok={cfg.has_price_pro && !cfg.price_pro_error}
            extra={cfg.price_pro_error || ''}
          />
        </div>
      </section>

      <section>
        <SectionTitle>Mode</SectionTitle>
        <ModeBanner mode={cfg.mode} />
      </section>

      {cfg.price_pro && (
        <section>
          <SectionTitle>Price configuré</SectionTitle>
          <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-5">
            <Field label="ID" value={cfg.price_pro.id} mono />
            <Field
              label="Montant"
              value={`${cfg.price_pro.amount.toFixed(2)} ${cfg.price_pro.currency.toUpperCase()} / ${cfg.price_pro.interval || '?'}`}
            />
            <Field label="Nickname" value={cfg.price_pro.nickname || '—'} />
            <Field
              label="Actif"
              value={cfg.price_pro.active ? 'oui' : 'non'}
              tone={cfg.price_pro.active ? 'ok' : 'err'}
            />
            <Field
              label="Live mode"
              value={cfg.price_pro.livemode ? 'oui' : 'test'}
              tone={
                cfg.price_pro.livemode === (cfg.mode === 'live')
                  ? 'ok'
                  : 'err'
              }
            />
          </div>
        </section>
      )}

      <section>
        <SectionTitle>Webhook endpoints</SectionTitle>
        {cfg.webhooks.length === 0 && (
          <div className="rounded-lg border border-[#da3633] bg-[#2a1213] p-4 text-sm text-[#ff7b72]">
            Aucun webhook configuré côté Stripe. Va sur dashboard.stripe.com →
            Developers → Webhooks → Add endpoint → URL :{' '}
            <code className="rounded bg-[#0d1117] px-1">
              {expectedWebhookUrl}
            </code>
          </div>
        )}
        {!matchingWebhook && cfg.webhooks.length > 0 && (
          <div className="rounded-lg border border-[#d29922] bg-[#2b2510] p-4 text-sm text-[#e3b341]">
            Le webhook attendu (
            <code className="rounded bg-[#0d1117] px-1">
              {expectedWebhookUrl}
            </code>
            ) n&apos;est pas configuré. Tu as d&apos;autres endpoints ci-dessous.
          </div>
        )}
        {matchingWebhook && missingEvents.length > 0 && (
          <div className="rounded-lg border border-[#d29922] bg-[#2b2510] p-4 text-sm text-[#e3b341]">
            Webhook trouvé mais il manque les events :
            <ul className="mt-2 list-disc pl-5 text-xs">
              {missingEvents.map((e) => (
                <li key={e}>
                  <code>{e}</code>
                </li>
              ))}
            </ul>
          </div>
        )}
        {matchingWebhook && missingEvents.length === 0 && (
          <div className="rounded-lg border border-[#238636] bg-[#0e2d18] p-4 text-sm text-[#3fb950]">
            ✓ Webhook OK : URL et events bien configurés.
          </div>
        )}
        <div className="mt-3 space-y-2">
          {cfg.webhooks.map((w) => (
            <div
              key={w.id}
              className="rounded-lg border border-[#21262d] bg-[#0d1117] p-4 text-sm"
            >
              <div className="font-mono text-[12px] text-[#c9d1d9]">{w.url}</div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#8b949e]">
                <span>
                  status :{' '}
                  <span
                    className={
                      w.status === 'enabled'
                        ? 'text-[#3fb950]'
                        : 'text-[#ff7b72]'
                    }
                  >
                    {w.status}
                  </span>
                </span>
                <span>
                  livemode :{' '}
                  <span
                    className={
                      w.livemode ? 'text-[#3fb950]' : 'text-[#e3b341]'
                    }
                  >
                    {w.livemode ? 'oui' : 'test'}
                  </span>
                </span>
                <span>{w.enabled_events.length} events</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Check({
  label,
  ok,
  extra,
  warn,
}: {
  label: string;
  ok: boolean;
  extra?: string;
  warn?: boolean;
}) {
  const border = !ok
    ? 'border-[#da3633]'
    : warn
    ? 'border-[#d29922]'
    : 'border-[#238636]';
  return (
    <div className={`rounded-lg border ${border} bg-[#0d1117] p-4`}>
      <div className="flex items-center gap-2 text-sm font-mono">
        <span
          className={
            ok
              ? warn
                ? 'text-[#e3b341]'
                : 'text-[#3fb950]'
              : 'text-[#ff7b72]'
          }
        >
          {ok ? (warn ? '!' : '✓') : '✗'}
        </span>
        {label}
      </div>
      {extra && (
        <div className="mt-1 text-[11px] text-[#8b949e]">{extra}</div>
      )}
    </div>
  );
}

function ModeBanner({ mode }: { mode: 'live' | 'test' | 'missing' }) {
  const styles = {
    live: 'border-[#238636] bg-[#0e2d18] text-[#3fb950]',
    test: 'border-[#d29922] bg-[#2b2510] text-[#e3b341]',
    missing: 'border-[#da3633] bg-[#2a1213] text-[#ff7b72]',
  } as const;
  const labels = {
    live: 'LIVE — clés de production. Les paiements sont réels.',
    test: 'TEST — clés sandbox. Aucun paiement réel n\'est traité.',
    missing: 'STRIPE_SECRET_KEY manquante.',
  } as const;
  return (
    <div
      className={`rounded-lg border p-4 text-sm font-semibold ${styles[mode]}`}
    >
      {labels[mode]}
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  tone,
}: {
  label: string;
  value: string;
  mono?: boolean;
  tone?: 'ok' | 'err';
}) {
  const cls =
    tone === 'ok'
      ? 'text-[#3fb950]'
      : tone === 'err'
      ? 'text-[#ff7b72]'
      : 'text-[#c9d1d9]';
  return (
    <div className="flex items-baseline justify-between border-b border-[#21262d] py-2 text-sm last:border-0">
      <span className="text-[#8b949e]">{label}</span>
      <span className={`${cls} ${mono ? 'font-mono text-[12px]' : ''}`}>
        {value}
      </span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8b949e]">
      {children}
    </h2>
  );
}
