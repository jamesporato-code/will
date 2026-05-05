import { adminFetch } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Revenue — Will admin' };

type Subscription = {
  customerId: string;
  customerEmail: string | null;
  customerName: string | null;
  plan: string;
  amount: number;
  currency: string;
  status: string;
  currentPeriodEnd: string;
  created: string;
};

type Payment = {
  amount: number;
  currency: string;
  customerEmail: string | null;
  date: string;
  description: string | null;
};

type RevenueResp = {
  mrr?: number;
  totalRevenue30d?: number;
  activeSubs?: Subscription[];
  recentPayments?: Payment[];
  cancelledRecent?: { customerId: string; cancelled_at: string }[];
  error?: string;
};

export default async function RevenuePage() {
  const res = await adminFetch<RevenueResp>('/api/admin/revenue');
  if (!res.ok) {
    return (
      <div className="rounded-lg border border-[#da3633] bg-[#2a1213] p-6 text-[#ff7b72]">
        Erreur {res.status} : {res.error.substring(0, 300)}
      </div>
    );
  }
  const data = res.data;
  // Separe les abos qui paient vraiment des abos test (promo 100% / 0€).
  // Les abos a 0 polluent le KPI 'Abos actifs' alors qu'ils ne contribuent rien.
  const allSubs = data.activeSubs || [];
  const payingSubs = allSubs.filter((s) => s.amount > 0);
  const testSubs = allSubs.filter((s) => s.amount === 0);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Revenue</h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          Source : Stripe live · MRR + paiements + churn 30 derniers jours.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card label="MRR" value={fmtMoney(data.mrr || 0)} accent="purple" />
        <Card label="Revenu 30j" value={fmtMoney(data.totalRevenue30d || 0)} />
        <Card
          label="Abos payants"
          value={String(payingSubs.length)}
          accent="green"
        />
        <Card
          label="Abos test (0 €)"
          value={String(testSubs.length)}
          accent={testSubs.length > 0 ? 'yellow' : undefined}
        />
      </div>

      <section>
        <SectionTitle>Abonnements payants</SectionTitle>
        <Table
          rows={payingSubs}
          columns={[
            { key: 'customerEmail', label: 'Email' },
            { key: 'customerName', label: 'Nom' },
            { key: 'plan', label: 'Plan' },
            { key: 'amount', label: 'Montant', align: 'right' },
            { key: 'currentPeriodEnd', label: 'Renouv.' },
          ]}
          renderCell={(row, col) => {
            if (col.key === 'amount') {
              return (
                <span>
                  {row.amount.toFixed(2)} {row.currency.toUpperCase()}
                </span>
              );
            }
            const v = (row as unknown as Record<string, unknown>)[String(col.key)];
            if (col.key === 'currentPeriodEnd' || col.key === 'created') {
              return <span>{fmtDate(v as string)}</span>;
            }
            return <span>{(v as string) || '—'}</span>;
          }}
          empty="Aucun abonnement payant"
        />
      </section>

      {testSubs.length > 0 && (
        <section>
          <SectionTitle>
            Abonnements test (0 €) — promo / interne
          </SectionTitle>
          <Table
            rows={testSubs}
            columns={[
              { key: 'customerEmail', label: 'Email' },
              { key: 'customerName', label: 'Nom' },
              { key: 'plan', label: 'Plan' },
              { key: 'currentPeriodEnd', label: 'Renouv.' },
            ]}
            renderCell={(row, col) => {
              const v = (row as unknown as Record<string, unknown>)[String(col.key)];
              if (col.key === 'currentPeriodEnd' || col.key === 'created') {
                return <span>{fmtDate(v as string)}</span>;
              }
              return <span>{(v as string) || '—'}</span>;
            }}
            empty=""
          />
        </section>
      )}

      <section>
        <SectionTitle>Paiements récents (30 jours)</SectionTitle>
        <Table
          rows={data.recentPayments || []}
          columns={[
            { key: 'date', label: 'Date' },
            { key: 'customerEmail', label: 'Email' },
            { key: 'amount', label: 'Montant', align: 'right' },
            { key: 'description', label: 'Description' },
          ]}
          renderCell={(row, col) => {
            if (col.key === 'date') return <span>{fmtDate(row.date)}</span>;
            if (col.key === 'amount') {
              return (
                <span>
                  {row.amount.toFixed(2)} {row.currency.toUpperCase()}
                </span>
              );
            }
            const v = (row as unknown as Record<string, unknown>)[String(col.key)];
            return <span>{(v as string) || '—'}</span>;
          }}
          empty="Aucun paiement sur 30 jours"
        />
      </section>
    </div>
  );
}

type Column<T> = {
  key: keyof T | string;
  label: string;
  align?: 'left' | 'right';
};

function Table<T>({
  rows,
  columns,
  renderCell,
  empty,
}: {
  rows: T[];
  columns: Column<T>[];
  renderCell: (row: T, col: Column<T>) => React.ReactNode;
  empty: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#21262d] bg-[#0d1117]">
      <table className="w-full text-sm">
        <thead className="bg-[#161b22] text-[11px] uppercase tracking-wider text-[#8b949e]">
          <tr>
            {columns.map((c) => (
              <th
                key={String(c.key)}
                className={`px-4 py-3 ${c.align === 'right' ? 'text-right' : 'text-left'}`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-[#8b949e]"
              >
                {empty}
              </td>
            </tr>
          )}
          {rows.map((r, i) => (
            <tr
              key={i}
              className="border-t border-[#21262d] hover:bg-[#161b22]"
            >
              {columns.map((c) => (
                <td
                  key={String(c.key)}
                  className={`px-4 py-3 ${c.align === 'right' ? 'text-right font-mono' : ''} text-[#c9d1d9]`}
                >
                  {renderCell(r, c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: 'green' | 'purple' | 'yellow';
}) {
  const border =
    accent === 'green'
      ? 'border-[#238636]'
      : accent === 'purple'
      ? 'border-[#a371f7]'
      : accent === 'yellow'
      ? 'border-[#d29922]'
      : 'border-[#21262d]';
  return (
    <div className={`rounded-lg border ${border} bg-[#0d1117] p-4`}>
      <div className="text-[11px] uppercase tracking-wider text-[#8b949e]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
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

function fmtMoney(amount: number): string {
  return amount.toFixed(2) + ' €';
}

function fmtDate(d: string): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}
