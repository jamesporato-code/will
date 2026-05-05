import Link from 'next/link';
import { adminFetch } from '@/lib/admin-api';
import { TriggerDailyButton } from './TriggerDailyButton';
import { CustomerPortalButton } from './CustomerPortalButton';

export const dynamic = 'force-dynamic';

type UserDetail = {
  user: {
    id: number;
    whatsapp_id: string;
    display_name: string | null;
    plan: string;
    level: string | null;
    job: string | null;
    sector: string | null;
    secondary_jobs: string[] | null;
    onboarding_complete: boolean;
    onboarding_step: number;
    created_at: string;
    updated_at: string;
    last_user_message_at: string | null;
    last_message_date: string | null;
    preferred_hour: number | null;
    preferred_minute: number | null;
    daily_opt_in: boolean | null;
    daily_message_count: number;
    current_module: number | null;
    module_progress: Record<string, number> | null;
    streak: number;
    pending_action: string | null;
    pending_daily: boolean;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    payment_failed_at: string | null;
    payment_grace_until: string | null;
    trial_reminder_j5: boolean;
    trial_reminder_j6: boolean;
    trial_reminder_j7: boolean;
    trial_reminder_j14: boolean;
    ia_interest: string | null;
    ia_interest_other: string | null;
    message_count: string;
  };
  recentMessages: { role: string; content: string; created_at: string }[];
  activity: { date: string; count: string }[];
};

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await adminFetch<UserDetail>(`/api/admin/user/${id}`);
  if (!result.ok) {
    return (
      <div className="rounded-lg border border-[#da3633] bg-[#2a1213] p-6 text-[#ff7b72]">
        Erreur {result.status} : {result.error.substring(0, 200)}
      </div>
    );
  }
  const { user, recentMessages, activity } = result.data;

  return (
    <div className="space-y-8">
      <header>
        <Link
          href="/admin/users"
          className="text-sm text-[#8b949e] hover:text-[#c9d1d9]"
        >
          ← Tous les users
        </Link>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {user.display_name || `User #${user.id}`}
            </h1>
            <p className="mt-1 font-mono text-sm text-[#8b949e]">
              {user.whatsapp_id} · id {user.id}
            </p>
          </div>
          <TriggerDailyButton userId={user.id} />
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Plan">
          <div className="flex items-center gap-2">
            <PlanBadge plan={user.plan} />
            {!user.onboarding_complete && (
              <span className="text-[10px] uppercase tracking-wider text-[#d29922]">
                onboarding step {user.onboarding_step}
              </span>
            )}
          </div>
          <Field label="Inscrit le" value={fmtDateLong(user.created_at)} />
          {user.plan === 'trial' && (
            <Field
              label="Jour trial"
              value={String(trialDay(user.created_at))}
            />
          )}
        </Card>

        <Card title="Profil">
          <Field label="Métier" value={user.job || '—'} />
          {user.secondary_jobs && user.secondary_jobs.length > 0 && (
            <Field label="Aussi" value={user.secondary_jobs.join(', ')} />
          )}
          <Field label="Niveau" value={user.level || '—'} />
          <Field
            label="Focus IA"
            value={user.ia_interest || user.ia_interest_other || '—'}
          />
        </Card>

        <Card title="Activité">
          <Field label="Messages totaux" value={String(user.message_count)} />
          <Field label="Streak" value={String(user.streak || 0) + ' jour(s)'} />
          <Field
            label="Module en cours"
            value={
              user.current_module
                ? `Module ${user.current_module}`
                : '—'
            }
          />
          <Field
            label="Dernier msg"
            value={fmtDateLong(user.last_user_message_at)}
          />
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card title="Daily">
          <Field
            label="Opt-in"
            value={
              user.daily_opt_in === false
                ? 'désactivé'
                : 'actif'
            }
            tone={user.daily_opt_in === false ? 'warn' : 'ok'}
          />
          <Field
            label="Heure préférée"
            value={fmtHour(user.preferred_hour, user.preferred_minute)}
          />
          <Field
            label="Compteur du jour"
            value={String(user.daily_message_count)}
          />
          <Field
            label="Pending action"
            value={user.pending_action || '—'}
            tone={user.pending_action ? 'warn' : 'mute'}
          />
        </Card>

        <Card title="Stripe">
          <Field
            label="Customer ID"
            value={user.stripe_customer_id || '—'}
          />
          <Field
            label="Subscription ID"
            value={user.stripe_subscription_id || '—'}
          />
          <div className="pt-2">
            <CustomerPortalButton
              userId={user.id}
              hasStripeCustomer={!!user.stripe_customer_id}
            />
          </div>
        </Card>

        <Card title="Trial reminders / paiement">
          <div className="flex flex-wrap gap-2">
            {(['j5', 'j6', 'j7', 'j14'] as const).map((j) => (
              <span
                key={j}
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  user[`trial_reminder_${j}` as const]
                    ? 'bg-[#238636] text-white'
                    : 'bg-[#21262d] text-[#8b949e]'
                }`}
              >
                {j}
              </span>
            ))}
          </div>
          {user.payment_failed_at && (
            <div className="mt-3 rounded border border-[#da3633] bg-[#2a1213] p-2 text-xs text-[#ff7b72]">
              Paiement échoué le {fmtDateLong(user.payment_failed_at)}
              {user.payment_grace_until &&
                ` · grâce jusqu'au ${fmtDateLong(user.payment_grace_until)}`}
            </div>
          )}
        </Card>
      </section>

      <section>
        <SectionTitle>Activité (30 derniers jours)</SectionTitle>
        <ActivityHeatmap activity={activity} />
      </section>

      <section>
        <SectionTitle>Conversation récente</SectionTitle>
        <div className="space-y-2">
          {recentMessages.length === 0 && (
            <p className="text-sm text-[#8b949e]">Aucun message.</p>
          )}
          {recentMessages.map((m, i) => (
            <div
              key={i}
              className={`rounded-md border p-3 text-sm ${
                m.role === 'user'
                  ? 'border-[#1f6feb] bg-[#0a1929]'
                  : 'border-[#21262d] bg-[#0d1117]'
              }`}
            >
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#8b949e]">
                  {m.role}
                </span>
                <span className="text-[11px] text-[#6e7681]">
                  {fmtDateLong(m.created_at)}
                </span>
              </div>
              <div className="whitespace-pre-wrap text-[#c9d1d9]">
                {m.content}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-5">
      <div className="mb-3 text-xs uppercase tracking-[0.18em] text-[#8b949e]">
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

const FIELD_TONE = {
  ok: 'text-[#3fb950]',
  warn: 'text-[#d29922]',
  mute: 'text-[#6e7681]',
} as const;

function Field({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: keyof typeof FIELD_TONE;
}) {
  const cls = tone ? FIELD_TONE[tone] : 'text-[#c9d1d9]';
  return (
    <div className="flex items-baseline justify-between text-sm">
      <span className="text-[#8b949e]">{label}</span>
      <span className={cls}>{value}</span>
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

function ActivityHeatmap({
  activity,
}: {
  activity: { date: string; count: string }[];
}) {
  // Heatmap 30j : un cube par jour, intensite proportionnelle au nb de msgs
  const map = new Map<string, number>();
  activity.forEach((a) =>
    map.set(a.date.substring(0, 10), parseInt(a.count, 10))
  );
  const days: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().substring(0, 10);
    days.push({ date: key, count: map.get(key) || 0 });
  }
  const max = Math.max(1, ...days.map((d) => d.count));
  return (
    <div className="flex gap-1">
      {days.map((d) => {
        const intensity = d.count === 0 ? 0 : d.count / max;
        const bg =
          d.count === 0
            ? '#161b22'
            : intensity > 0.66
            ? '#26a641'
            : intensity > 0.33
            ? '#1d752a'
            : '#0e4429';
        return (
          <div
            key={d.date}
            title={`${d.date} · ${d.count} msgs`}
            className="h-8 w-8 rounded"
            style={{ background: bg }}
          />
        );
      })}
    </div>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  const styles: Record<string, string> = {
    trial: 'bg-[#238636] text-white',
    pro: 'bg-[#a371f7] text-white',
    cancelled: 'bg-[#da3633] text-white',
  };
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${
        styles[plan] || 'bg-[#30363d] text-[#c9d1d9]'
      }`}
    >
      {plan}
    </span>
  );
}

function fmtDateLong(d: string | null): string {
  if (!d) return '—';
  return new Date(d).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function fmtHour(h: number | null, m: number | null): string {
  if (h === null || h === undefined) return '—';
  const min = m === null || m === undefined ? 0 : m;
  return `${h}h${String(min).padStart(2, '0')}`;
}

function trialDay(createdAt: string): number {
  const days = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(1, Math.min(7, days + 1));
}
