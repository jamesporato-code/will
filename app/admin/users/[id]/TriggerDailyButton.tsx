'use client';

import { useState } from 'react';

export function TriggerDailyButton({ userId }: { userId: number }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    msg: string;
  } | null>(null);

  async function trigger() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/admin-proxy/trigger-daily/${userId}`, {
        method: 'POST',
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        type?: string;
        day?: number;
        error?: string;
      };
      if (res.ok && data.success) {
        setResult({
          ok: true,
          msg: `Envoyé · ${data.type}${data.day ? ` · jour ${data.day}` : ''}`,
        });
      } else {
        setResult({
          ok: false,
          msg: data.error || `Erreur ${res.status}`,
        });
      }
    } catch (e) {
      setResult({
        ok: false,
        msg: e instanceof Error ? e.message : 'Erreur',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {result && (
        <span
          className={`text-xs ${
            result.ok ? 'text-[#3fb950]' : 'text-[#ff7b72]'
          }`}
        >
          {result.msg}
        </span>
      )}
      <button
        onClick={trigger}
        disabled={loading}
        className="rounded-md bg-[#1f6feb] px-4 py-2 text-sm font-medium text-white hover:bg-[#2f81f7] disabled:opacity-50"
      >
        {loading ? 'Envoi…' : 'Envoyer le daily'}
      </button>
    </div>
  );
}
