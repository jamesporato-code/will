'use client';

import { useState } from 'react';

type ActionResult = { ok: boolean; msg: string };

export function SystemActions() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <ActionCard
        title="Lancer la migration DB"
        description="Applique tous les ALTER TABLE / UPDATE de migrate. À lancer après chaque commit qui change le schéma."
        endpoint="/api/admin-proxy/migrate"
        method="POST"
        confirm={false}
        tone="info"
      />
      <ActionCard
        title="Réinitialiser tous les users"
        description="Vide le profil et l'onboarding de tous les users mais garde les rangées. Le compte WhatsApp existant pourra refaire l'onboarding."
        endpoint="/api/admin-proxy/reset-all-users?confirm=yes"
        method="POST"
        confirm
        tone="warn"
      />
      <ActionCard
        title="Wipe complet (users + messages)"
        description="DELETE total : supprime tous les users et tous les messages, reset les ids à 1. Irréversible."
        endpoint="/api/admin-proxy/wipe-all?confirm=yes"
        method="POST"
        confirm
        tone="danger"
      />
    </div>
  );
}

function ActionCard({
  title,
  description,
  endpoint,
  method,
  confirm,
  tone,
}: {
  title: string;
  description: string;
  endpoint: string;
  method: 'POST' | 'DELETE';
  confirm: boolean;
  tone: 'info' | 'warn' | 'danger';
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);

  const borders = {
    info: 'border-[#1f6feb]',
    warn: 'border-[#d29922]',
    danger: 'border-[#da3633]',
  } as const;
  const buttons = {
    info: 'bg-[#1f6feb] hover:bg-[#2f81f7]',
    warn: 'bg-[#bb800999] hover:bg-[#bb8009]',
    danger: 'bg-[#da3633] hover:bg-[#f85149]',
  } as const;

  async function run() {
    if (
      confirm &&
      !window.confirm(
        `⚠️ ${title}\n\n${description}\n\nÉcris OK pour confirmer dans le prompt suivant.`
      )
    ) {
      return;
    }
    if (confirm) {
      const text = window.prompt(`Tape "OK" pour confirmer : ${title}`);
      if (text !== 'OK') return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
      });
      const data = (await res.json().catch(() => ({}))) as Record<
        string,
        unknown
      >;
      if (res.ok) {
        setResult({ ok: true, msg: JSON.stringify(data).substring(0, 200) });
      } else {
        setResult({
          ok: false,
          msg: `Erreur ${res.status} : ${(data.error as string) || JSON.stringify(data).substring(0, 200)}`,
        });
      }
    } catch (e) {
      setResult({
        ok: false,
        msg: e instanceof Error ? e.message : 'Erreur réseau',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`rounded-lg border ${borders[tone]} bg-[#0d1117] p-5`}
    >
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-xs text-[#8b949e]">{description}</p>
      <button
        onClick={run}
        disabled={loading}
        className={`mt-4 rounded-md ${buttons[tone]} px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50`}
      >
        {loading ? 'En cours…' : 'Lancer'}
      </button>
      {result && (
        <div
          className={`mt-3 rounded border px-3 py-2 text-[11px] ${
            result.ok
              ? 'border-[#238636] bg-[#0e2d18] text-[#3fb950]'
              : 'border-[#da3633] bg-[#2a1213] text-[#ff7b72]'
          }`}
        >
          {result.msg}
        </div>
      )}
    </div>
  );
}
