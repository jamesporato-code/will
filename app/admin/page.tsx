import { adminFetch } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';

type Stats = {
  overview: {
    totalUsers: number;
    onboardedUsers: number;
    newUsersWeek: number;
    newUsersMonth: number;
    totalMessages: number;
    messagesToday: number;
    messagesWeek: number;
    paidUsers: number;
    conversionRate: string | number;
  };
  funnel: {
    today: FunnelWindow;
    week: FunnelWindow;
    month: FunnelWindow;
  };
  ops: {
    pending_daily: number;
    pending_trial_reminder: number;
    outside_24h_window: number;
    trial_expired_unconverted: number;
  };
  planStats: { plan: string; count: string }[];
  levelStats: { level: string | null; count: string }[];
};

type FunnelWindow = {
  signups: number;
  onboarded: number;
  active: number;
  pro_conversions: number;
  rate_signup_to_onboarded: string | null;
  rate_onboarded_to_active: string | null;
  rate_signup_to_pro: string | null;
};

export default async function AdminDashboard() {
  const result = await adminFetch<Stats>('/api/admin/stats');
  if (!result.ok) {
    return (
      <ErrorPanel title="Erreur de chargement" message={result.error} status={result.status} />
    );
  }
  const stats = result.data;

  return (
    <div className="space-y-10">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-[#8b949e]">
            Vue d&apos;ensemble — funnel, conversion, santé opérationnelle.
          </p>
        </div>
        <span className="text-xs text-[#6e7681]">
          {new Date().toLocaleString('fr-FR')}
        </span>
      </header>

      <section>
        <SectionTitle>Overview</SectionTitle>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Kpi label="Total users" value={stats.overview.totalUsers} />
          <Kpi
            label="Onboardés"
            value={stats.overview.onboardedUsers}
            sub={percent(stats.overview.onboardedUsers, stats.overview.totalUsers)}
          />
          <Kpi label="Pro" value={stats.overview.paidUsers} accent="purple" />
          <Kpi
            label="Conversion"
            value={`${stats.overview.conversionRate}%`}
            accent="green"
          />
          <Kpi label="Nouveaux 7j" value={stats.overview.newUsersWeek} />
          <Kpi label="Nouveaux 30j" value={stats.overview.newUsersMonth} />
          <Kpi label="Messages 7j" value={stats.overview.messagesWeek} />
          <Kpi label="Messages auj." value={stats.overview.messagesToday} />
        </div>
      </section>

      <section>
        <SectionTitle>Funnel acquisition</SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          <FunnelCard label="Aujourd'hui" data={stats.funnel.today} />
          <FunnelCard label="7 jours" data={stats.funnel.week} />
          <FunnelCard label="30 jours" data={stats.funnel.month} />
        </div>
      </section>

      <section>
        <SectionTitle>Santé opérationnelle</SectionTitle>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Kpi
            label="Daily en attente"
            value={stats.ops.pending_daily}
            accent={stats.ops.pending_daily > 0 ? 'yellow' : undefined}
            hint="Templates envoyés, en attente de réponse"
          />
          <Kpi
            label="Reminder en attente"
            value={stats.ops.pending_trial_reminder}
            accent={stats.ops.pending_trial_reminder > 0 ? 'yellow' : undefined}
            hint="Trial reminder différé via template"
          />
          <Kpi
            label="Hors fenêtre 24h"
            value={stats.ops.outside_24h_window}
            accent={stats.ops.outside_24h_window > 0 ? 'yellow' : undefined}
            hint="Users actifs sans message récent — coût template potentiel"
          />
          <Kpi
            label="Trial expiré non converti"
            value={stats.ops.trial_expired_unconverted}
            accent={stats.ops.trial_expired_unconverted > 0 ? 'red' : undefined}
            hint="À retravailler côté conversion"
          />
        </div>
      </section>

      <section>
        <SectionTitle>Plans</SectionTitle>
        <div className="overflow-hidden rounded-lg border border-[#21262d] bg-[#0d1117]">
          <table className="w-full text-sm">
            <thead className="bg-[#161b22] text-[11px] uppercase tracking-wider text-[#8b949e]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Plan</th>
                <th className="px-4 py-3 text-right font-semibold">Users</th>
              </tr>
            </thead>
            <tbody>
              {stats.planStats.map((row) => (
                <tr key={row.plan} className="border-t border-[#21262d]">
                  <td className="px-4 py-3">
                    <PlanBadge plan={row.plan} />
                  </td>
                  <td className="px-4 py-3 text-right font-mono">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
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

const ACCENT_BORDER = {
  green: 'border-[#238636]',
  purple: 'border-[#a371f7]',
  yellow: 'border-[#d29922]',
  red: 'border-[#da3633]',
} as const;

function Kpi({
  label,
  value,
  sub,
  hint,
  accent,
}: {
  label: string;
  value: number | string;
  sub?: string | null;
  hint?: string;
  accent?: keyof typeof ACCENT_BORDER;
}) {
  const accentClass = accent ? ACCENT_BORDER[accent] : 'border-[#21262d]';
  return (
    <div className={`rounded-lg border ${accentClass} bg-[#0d1117] p-4`}>
      <div className="text-[11px] uppercase tracking-wider text-[#8b949e]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {sub && <div className="mt-1 text-xs text-[#8b949e]">{sub}</div>}
      {hint && <div className="mt-1 text-[11px] text-[#6e7681]">{hint}</div>}
    </div>
  );
}

function FunnelCard({ label, data }: { label: string; data: FunnelWindow }) {
  const steps: { name: string; value: number; rate: string | null }[] = [
    { name: 'Signups', value: data.signups, rate: null },
    { name: 'Onboardés', value: data.onboarded, rate: data.rate_signup_to_onboarded },
    { name: 'Actifs', value: data.active, rate: data.rate_onboarded_to_active },
    { name: 'Pro', value: data.pro_conversions, rate: data.rate_signup_to_pro },
  ];
  const max = Math.max(...steps.map((s) => s.value), 1);

  return (
    <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-5">
      <div className="text-xs uppercase tracking-wider text-[#8b949e]">{label}</div>
      <div className="mt-4 space-y-3">
        {steps.map((s) => (
          <div key={s.name}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-[#c9d1d9]">{s.name}</span>
              <span className="font-mono">
                {s.value}
                {s.rate !== null && (
                  <span className="ml-2 text-xs text-[#8b949e]">{s.rate}%</span>
                )}
              </span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#161b22]">
              <div
                className="h-full bg-[#1f6feb] transition-all"
                style={{ width: `${(s.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
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

function ErrorPanel({
  title,
  message,
  status,
}: {
  title: string;
  message: string;
  status: number;
}) {
  return (
    <div className="rounded-lg border border-[#da3633] bg-[#2a1213] p-6 text-[#ff7b72]">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-xs text-[#ffa198]">
        {status} — {message.substring(0, 200)}
      </div>
    </div>
  );
}

function percent(num: number, den: number): string | null {
  if (!den) return null;
  return `${((num / den) * 100).toFixed(0)}% des users`;
}
