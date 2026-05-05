'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RefundButton({
  chargeId,
  amountLabel,
}: {
  chargeId: string;
  amountLabel: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function refund() {
    if (!window.confirm(`Rembourser ${amountLabel} ? Cette action est irreversible côté Stripe.`)) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin-proxy/refunds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ charge_id: chargeId }),
      });
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

  return (
    <button
      onClick={refund}
      disabled={loading}
      className="rounded border border-[#30363d] px-2 py-1 text-[11px] text-[#8b949e] hover:border-[#d29922] hover:text-[#e3b341] disabled:opacity-50"
    >
      {loading ? '…' : 'Rembourser'}
    </button>
  );
}
