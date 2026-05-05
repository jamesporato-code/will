import Link from 'next/link';
import { adminFetch } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Payment issues — Will admin' };

type PaymentIssue = {
  id: number;
  display_name: string | null;
  whatsapp_id: string;
  plan: string;
  payment_failed_at: string | null;
  payment_grace_until: string | null;
  stripe_customer_id: string | null;
  status: 'in_grace_period' | 'grace_expired' | 'payment_failed' | 'ok';
};

type Resp = { total: number; users: PaymentIssue[] };

export default async function PaymentIssuesPage() {
  const res = await adminFetch<Resp>('/api/admin/payment-issues');
  if (!res.ok) {
    return (
      <div className="rounded-lg border border-[#da3633] bg-[#2a1213] p-6 text-[#ff7b72]">
        Erreur {res.status} : {res.error.substring(0, 200)}
      </div>
    );
  }
  const { users, total } = res.data;
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Payment issues</h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          {total} cas · paiements échoués, période de grâce, abonnements annulés.
        </p>
      </header>

      <div className="overflow-hidden rounded-lg border border-[#21262d] bg-[#0d1117]">
        <table className="w-full text-sm">
          <thead className="bg-[#161b22] text-[11px] uppercase tracking-wider text-[#8b949e]">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Plan</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-left">Échec le</th>
              <th className="px-4 py-3 text-left">Grâce jusqu&apos;au</th>
              <th className="px-4 py-3 text-left">Stripe</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-[#8b949e]">
                  Aucun problème de paiement
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="border-t border-[#21262d] hover:bg-[#161b22]">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/users/${u.id}`}
                    className="text-[#58a6ff] hover:underline"
                  >
                    {u.display_name || `#${u.id}`}
                  </Link>
                  <div className="font-mono text-[11px] text-[#6e7681]">
                    {u.whatsapp_id}
                  </div>
                </td>
                <td className="px-4 py-3">{u.plan}</td>
                <td className="px-4 py-3">
                  <Status status={u.status} />
                </td>
                <td className="px-4 py-3 text-[11px] text-[#8b949e]">
                  {fmt(u.payment_failed_at)}
                </td>
                <td className="px-4 py-3 text-[11px] text-[#8b949e]">
                  {fmt(u.payment_grace_until)}
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-[#6e7681]">
                  {u.stripe_customer_id || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Status({ status }: { status: PaymentIssue['status'] }) {
  const styles = {
    in_grace_period: 'bg-[#d2992233] text-[#e3b341]',
    grace_expired: 'bg-[#f85a4933] text-[#ff7b72]',
    payment_failed: 'bg-[#da363333] text-[#ff7b72]',
    ok: 'bg-[#23863633] text-[#3fb950]',
  } as const;
  const labels = {
    in_grace_period: 'En grâce',
    grace_expired: 'Grâce expirée',
    payment_failed: 'Échec',
    ok: 'OK',
  } as const;
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function fmt(d: string | null): string {
  if (!d) return '—';
  return new Date(d).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
