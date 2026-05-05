'use client';

import { useState } from 'react';

type ActionResult = { ok: boolean; msg: string };

export function TriggerDailyButton({ userId }: { userId: number }) {
  const [dailyState, setDailyState] = useState<{ loading: boolean; result: ActionResult | null }>({
    loading: false,
    result: null,
  });
  const [actuState, setActuState] = useState<{ loading: boolean; result: ActionResult | null }>({
    loading: false,
    result: null,
  });

  async function trigger(
    endpoint: string,
    setState: typeof setDailyState
  ) {
    setState({ loading: true, result: null });
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        type?: string;
        day?: number;
        error?: string;
      };
      if (res.ok && data.success) {
        setState({
          loading: false,
          result: {
            ok: true,
            msg: `Envoyé · ${data.type}${data.day ? ` · jour ${data.day}` : ''}`,
          },
        });
      } else {
        setState({
          loading: false,
          result: {
            ok: false,
            msg: data.error || `Erreur ${res.status}`,
          },
        });
      }
    } catch (e) {
      setState({
        loading: false,
        result: { ok: false, msg: e instanceof Error ? e.message : 'Erreur' },
      });
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        {actuState.result && (
          <span className={`text-xs ${actuState.result.ok ? 'text-[#3fb950]' : 'text-[#ff7b72]'}`}>
            {actuState.result.msg}
          </span>
        )}
        <button
          onClick={() => trigger(`/api/admin-proxy/trigger-actu/${userId}`, setActuState)}
          disabled={actuState.loading}
          className="rounded-md bg-[#a371f7] px-3 py-2 text-xs font-medium text-white hover:bg-[#b389ff] disabled:opacity-50"
        >
          {actuState.loading ? 'Envoi…' : '📰 Actu IA'}
        </button>
        {dailyState.result && (
          <span className={`text-xs ${dailyState.result.ok ? 'text-[#3fb950]' : 'text-[#ff7b72]'}`}>
            {dailyState.result.msg}
          </span>
        )}
        <button
          onClick={() => trigger(`/api/admin-proxy/trigger-daily/${userId}`, setDailyState)}
          disabled={dailyState.loading}
          className="rounded-md bg-[#1f6feb] px-3 py-2 text-xs font-medium text-white hover:bg-[#2f81f7] disabled:opacity-50"
        >
          {dailyState.loading ? 'Envoi…' : '📚 Daily'}
        </button>
      </div>
    </div>
  );
}
