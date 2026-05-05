'use client';

import { useState } from 'react';

export function CustomerPortalButton({
  userId,
  hasStripeCustomer,
}: {
  userId: number;
  hasStripeCustomer: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`/api/admin-proxy/customer-portal/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok || !data.url) {
        setErr(data.error || `Erreur ${res.status}`);
        return;
      }
      setUrl(data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  if (!hasStripeCustomer) {
    return (
      <span className="text-xs text-[#8b949e]">
        Pas de customer Stripe (user n&apos;est pas Pro)
      </span>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={generate}
        disabled={loading}
        className="rounded-md bg-[#a371f7] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#b389ff] disabled:opacity-50"
      >
        {loading ? 'Génération…' : 'Générer un lien Customer Portal'}
      </button>
      {err && <p className="text-xs text-[#ff7b72]">{err}</p>}
      {url && (
        <div className="rounded border border-[#a371f7] bg-[#0d1117] p-2">
          <div className="text-[10px] uppercase tracking-wider text-[#8b949e]">
            Lien (valable 1h)
          </div>
          <div className="mt-1 flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 truncate font-mono text-[11px] text-[#58a6ff] hover:underline"
            >
              {url}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(url)}
              className="rounded border border-[#30363d] px-2 py-1 text-[10px] text-[#8b949e] hover:bg-[#161b22]"
            >
              Copier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
