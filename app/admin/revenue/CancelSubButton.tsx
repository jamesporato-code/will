'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CancelSubButton({ subId }: { subId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function cancel(atPeriodEnd: boolean) {
    setLoading(true);
    try {
      const url =
        `/api/admin-proxy/subscriptions/${subId}` +
        (atPeriodEnd ? '?at_period_end=1' : '');
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        alert('Erreur : ' + (d.error || res.status));
        return;
      }
      setOpen(false);
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded border border-[#30363d] px-2 py-1 text-[11px] text-[#8b949e] hover:border-[#da3633] hover:text-[#ff7b72]"
      >
        Annuler
      </button>
    );
  }
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={() => cancel(true)}
        disabled={loading}
        title="Reste actif jusqu'à fin de période"
        className="rounded bg-[#d2992233] px-2 py-1 text-[10px] text-[#e3b341] hover:bg-[#d2992266] disabled:opacity-50"
      >
        À fin
      </button>
      <button
        onClick={() => cancel(false)}
        disabled={loading}
        title="Annule immédiatement"
        className="rounded bg-[#da363333] px-2 py-1 text-[10px] text-[#ff7b72] hover:bg-[#da363366] disabled:opacity-50"
      >
        Now
      </button>
      <button
        onClick={() => setOpen(false)}
        className="rounded border border-[#30363d] px-2 py-1 text-[10px] text-[#8b949e] hover:bg-[#161b22]"
      >
        ✕
      </button>
    </div>
  );
}
