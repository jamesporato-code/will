import Link from 'next/link';
import { adminFetch } from '@/lib/admin-api';

export const dynamic = 'force-dynamic';

type User = {
  id: number;
  whatsapp_id: string;
  display_name: string | null;
  plan: string;
  level: string | null;
  job: string | null;
  sector: string | null;
  onboarding_complete: boolean;
  created_at: string;
  last_user_message_at: string | null;
  last_message_at: string | null;
  message_count: string | number;
  pending_action: string | null;
};

type ListResponse = {
  users: User[];
  total: number;
  limit: number;
  offset: number;
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; search?: string; offset?: string }>;
}) {
  const sp = await searchParams;
  const params = new URLSearchParams();
  if (sp.plan) params.set('plan', sp.plan);
  if (sp.search) params.set('search', sp.search);
  if (sp.offset) params.set('offset', sp.offset);
  params.set('limit', '50');

  const result = await adminFetch<ListResponse>(
    '/api/admin/users?' + params.toString()
  );
  if (!result.ok) {
    return (
      <div className="rounded-lg border border-[#da3633] bg-[#2a1213] p-6 text-[#ff7b72]">
        Erreur {result.status} : {result.error.substring(0, 200)}
      </div>
    );
  }

  const { users, total, limit, offset } = result.data;
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="mt-1 text-sm text-[#8b949e]">
            {total} au total · page {currentPage}/{totalPages}
          </p>
        </div>
      </header>

      <Filters defaultSearch={sp.search} defaultPlan={sp.plan} />

      <div className="overflow-hidden rounded-lg border border-[#21262d] bg-[#0d1117]">
        <table className="w-full text-sm">
          <thead className="bg-[#161b22] text-[11px] uppercase tracking-wider text-[#8b949e]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Nom</th>
              <th className="px-4 py-3 text-left font-semibold">Plan</th>
              <th className="px-4 py-3 text-left font-semibold">Métier</th>
              <th className="px-4 py-3 text-left font-semibold">Niveau</th>
              <th className="px-4 py-3 text-right font-semibold">Msgs</th>
              <th className="px-4 py-3 text-left font-semibold">Inscrit</th>
              <th className="px-4 py-3 text-left font-semibold">Dernier msg</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-[#8b949e]">
                  Aucun user
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t border-[#21262d] hover:bg-[#161b22]"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/users/${u.id}`}
                    className="text-[#58a6ff] hover:underline"
                  >
                    {u.display_name || `User #${u.id}`}
                  </Link>
                  <div className="font-mono text-[11px] text-[#6e7681]">
                    {u.whatsapp_id}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <PlanBadge plan={u.plan} />
                  {!u.onboarding_complete && (
                    <span className="ml-2 text-[10px] uppercase tracking-wider text-[#d29922]">
                      onb
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-[#c9d1d9]">{u.job || '—'}</td>
                <td className="px-4 py-3 text-[#c9d1d9]">{u.level || '—'}</td>
                <td className="px-4 py-3 text-right font-mono text-[#c9d1d9]">
                  {u.message_count}
                </td>
                <td className="px-4 py-3 text-[11px] text-[#8b949e]">
                  {fmtDate(u.created_at)}
                </td>
                <td className="px-4 py-3 text-[11px] text-[#8b949e]">
                  {fmtDate(u.last_message_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        offset={offset}
        limit={limit}
        plan={sp.plan}
        search={sp.search}
      />
    </div>
  );
}

function Filters({
  defaultSearch,
  defaultPlan,
}: {
  defaultSearch?: string;
  defaultPlan?: string;
}) {
  return (
    <form className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        name="search"
        defaultValue={defaultSearch || ''}
        placeholder="Recherche (nom, numéro, métier)…"
        className="w-72 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm placeholder-[#6e7681] focus:border-[#1f6feb] focus:outline-none"
      />
      <select
        name="plan"
        defaultValue={defaultPlan || ''}
        className="rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm focus:border-[#1f6feb] focus:outline-none"
      >
        <option value="">Tous les plans</option>
        <option value="trial">Trial</option>
        <option value="pro">Pro</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <button
        type="submit"
        className="rounded-md bg-[#1f6feb] px-4 py-2 text-sm font-medium text-white hover:bg-[#2f81f7]"
      >
        Filtrer
      </button>
    </form>
  );
}

function Pagination({
  currentPage,
  totalPages,
  offset,
  limit,
  plan,
  search,
}: {
  currentPage: number;
  totalPages: number;
  offset: number;
  limit: number;
  plan?: string;
  search?: string;
}) {
  if (totalPages <= 1) return null;
  const params = new URLSearchParams();
  if (plan) params.set('plan', plan);
  if (search) params.set('search', search);
  const prevOffset = Math.max(0, offset - limit);
  const nextOffset = offset + limit;
  return (
    <div className="flex items-center justify-between text-sm">
      <Link
        href={
          currentPage > 1
            ? `?${new URLSearchParams({ ...Object.fromEntries(params), offset: String(prevOffset) }).toString()}`
            : '#'
        }
        className={`rounded-md border border-[#30363d] px-3 py-1.5 ${
          currentPage > 1
            ? 'hover:bg-[#161b22]'
            : 'cursor-not-allowed opacity-40'
        }`}
      >
        ← Précédent
      </Link>
      <span className="text-[#8b949e]">
        Page {currentPage} / {totalPages}
      </span>
      <Link
        href={
          currentPage < totalPages
            ? `?${new URLSearchParams({ ...Object.fromEntries(params), offset: String(nextOffset) }).toString()}`
            : '#'
        }
        className={`rounded-md border border-[#30363d] px-3 py-1.5 ${
          currentPage < totalPages
            ? 'hover:bg-[#161b22]'
            : 'cursor-not-allowed opacity-40'
        }`}
      >
        Suivant →
      </Link>
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
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        styles[plan] || 'bg-[#30363d] text-[#c9d1d9]'
      }`}
    >
      {plan}
    </span>
  );
}

function fmtDate(d: string | null): string {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
