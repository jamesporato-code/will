import { adminFetch } from '@/lib/admin-api';
import { ActuOverrideForm } from './ActuOverrideForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Actu IA — Will admin' };

type ForcedResp = {
  date: string;
  forced: { news: string[]; setAt: string } | null;
};

export default async function ActuPage() {
  const res = await adminFetch<ForcedResp>('/api/admin/forced-actu');
  if (!res.ok) {
    return (
      <div className="rounded-lg border border-[#da3633] bg-[#2a1213] p-6 text-[#ff7b72]">
        Erreur {res.status} : {res.error.substring(0, 200)}
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Actu IA du jour
        </h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          Override manuel : 3 news poussées identiquement à tous les users
          aujourd&apos;hui ({res.data.date}). Si aucun override n&apos;est défini,
          chaque user reçoit des news générées via Tavily + Claude, ciblées
          par secteur.
        </p>
      </header>
      <ActuOverrideForm initial={res.data} />
    </div>
  );
}
