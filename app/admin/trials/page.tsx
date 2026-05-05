import Link from 'next/link';
import { adminFetch } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Trials — Will admin' };

type Trial = {
  id: number;
  display_name: string | null;
  whatsapp_id: string;
  created_at: string;
  days_since_signup: number;
  days_remaining: number;
  message_count: string;
  status: 'active' | 'expires_soon' | 'expires_tomorrow' | 'expired';
};

type TrialsResp = {
  total: number;
  trials: Trial[];
  summary: {
    active: number;
    expires_soon: number;
    expires_tomorrow: number;
    expired: number;
  };
};

export default async function TrialsPage() {
  const res = await adminFetch<TrialsResp>('/api/admin/trials');
  if (!res.ok) {
    return (
      <ErrorPanel error={res.error} status={res.status} />
    );
  }
  const { trials, summary, total } = res.data;
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Trials</h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          {total} essais · suivi du temps restant et de l&apos;activité.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <SummaryCard label="Actifs" value={summary.active} tone="ok" />
        <SummaryCard label="Expire bientôt" value={summary.expires_soon} tone="warn" />
        <SummaryCard label="Expire demain" value={summary.expires_tomorrow} tone="alert" />
        <SummaryCard label="Expirés" value={summary.expired} tone="dead" />
      </div>

      <div className="overflow-hidden rounded-lg border border-[#21262d] bg-[#0d1117]">
        <table className="w-full text-sm">
          <thead className="bg-[#161b22] text-[11px] uppercase tracking-wider text-[#8b949e]">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-right">Jour</th>
              <th className="px-4 py-3 text-right">Restant</th>
              <th className="px-4 py-3 text-right">Msgs</th>
              <th className="px-4 py-3 text-left">Inscrit</th>
            </tr>
          </thead>
          <tbody>
            {trials.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[#8b949e]">
                  Aucun trial en cours
                </td>
              </tr>
            )}
            {trials.map((t) => (
              <tr key={t.id} className="border-t border-[#21262d] hover:bg-[#161b22]">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/users/${t.id}`}
                    className="text-[#58a6ff] hover:underline"
                  >
                    {t.display_name || `#${t.id}`}
                  </Link>
                  <div className="font-mono text-[11px] text-[#6e7681]">
                    {t.whatsapp_id}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-4 py-3 text-right font-mono">
                  J{Math.min(7, t.days_since_signup + 1)}
                </td>
                <td className="px-4 py-3 text-right font-mono">
                  {t.days_remaining > 0 ? `${t.days_remaining}j` : '—'}
                </td>
                <td className="px-4 py-3 text-right font-mono text-[#c9d1d9]">
                  {t.message_count}
                </td>
                <td className="px-4 py-3 text-[11px] text-[#8b949e]">
                  {new Date(t.created_at).toLocaleDateString('fr-FR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Trial['status'] }) {
  const styles = {
    active: 'bg-[#1f6feb33] text-[#58a6ff]',
    expires_soon: 'bg-[#d2992233] text-[#e3b341]',
    expires_tomorrow: 'bg-[#f85a4933] text-[#ff7b72]',
    expired: 'bg-[#8b949e33] text-[#8b949e]',
  } as const;
  const labels = {
    active: 'Actif',
    expires_soon: 'Expire bientôt',
    expires_tomorrow: 'Expire demain',
    expired: 'Expiré',
  } as const;
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'ok' | 'warn' | 'alert' | 'dead';
}) {
  const borders = {
    ok: 'border-[#1f6feb]',
    warn: 'border-[#d29922]',
    alert: 'border-[#da3633]',
    dead: 'border-[#30363d]',
  } as const;
  return (
    <div className={`rounded-lg border ${borders[tone]} bg-[#0d1117] p-4`}>
      <div className="text-[11px] uppercase tracking-wider text-[#8b949e]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function ErrorPanel({ error, status }: { error: string; status: number }) {
  return (
    <div className="rounded-lg border border-[#da3633] bg-[#2a1213] p-6 text-[#ff7b72]">
      Erreur {status} : {error.substring(0, 200)}
    </div>
  );
}
