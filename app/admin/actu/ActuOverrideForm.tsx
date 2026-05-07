'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ForcedResp = {
  date: string;
  forced: { news: string[]; setAt: string } | null;
};

export function ActuOverrideForm({ initial }: { initial: ForcedResp }) {
  const router = useRouter();
  const [news, setNews] = useState<string[]>(
    initial.forced?.news?.length === 3
      ? initial.forced.news
      : initial.forced?.news?.length
      ? [...initial.forced.news, '', '', ''].slice(0, 3)
      : ['', '', '']
  );
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function save() {
    const cleaned = news.map((s) => s.trim()).filter(Boolean);
    if (cleaned.length === 0) {
      setMsg({ ok: false, text: 'Au moins une news non vide.' });
      return;
    }
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin-proxy/forced-actu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ news: cleaned }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        setMsg({ ok: false, text: d.error || `Erreur ${res.status}` });
        return;
      }
      setMsg({ ok: true, text: 'Override actif pour aujourd\'hui.' });
      router.refresh();
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : 'Erreur' });
    } finally {
      setSaving(false);
    }
  }

  async function clear() {
    if (!window.confirm('Supprimer l\'override ? Les users recevront à nouveau des news générées automatiquement.')) {
      return;
    }
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin-proxy/forced-actu', { method: 'DELETE' });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        setMsg({ ok: false, text: d.error || `Erreur ${res.status}` });
        return;
      }
      setNews(['', '', '']);
      setMsg({ ok: true, text: 'Override supprimé.' });
      router.refresh();
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : 'Erreur' });
    } finally {
      setSaving(false);
    }
  }

  const isActive = !!initial.forced;
  const setAt = initial.forced?.setAt;

  return (
    <div className="space-y-4">
      {isActive && (
        <div className="rounded-lg border border-[#238636] bg-[#0e2d18] p-4 text-sm text-[#3fb950]">
          ✓ Override actif. Défini le {setAt ? new Date(setAt).toLocaleString('fr-FR') : '?'}.
          Tous les users qui demandent l&apos;actu IA aujourd&apos;hui recevront ces 3 news.
        </div>
      )}

      <div className="space-y-3">
        {news.map((n, i) => (
          <div key={i}>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
              News {i + 1}/3
            </label>
            <textarea
              rows={6}
              value={n}
              onChange={(e) => {
                const copy = [...news];
                copy[i] = e.target.value;
                setNews(copy);
              }}
              placeholder={`Titre court (max 8 mots)\nDeux phrases d'analyse adaptées au métier.\nCe que ça change pour toi : action concrète.\nSource : nom-domaine.com`}
              className="mt-1 w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 font-mono text-xs focus:border-[#1f6feb] focus:outline-none"
            />
          </div>
        ))}
      </div>

      {msg && (
        <p
          className={`rounded border px-3 py-2 text-xs ${
            msg.ok
              ? 'border-[#238636] bg-[#0e2d18] text-[#3fb950]'
              : 'border-[#da3633] bg-[#2a1213] text-[#ff7b72]'
          }`}
        >
          {msg.text}
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-md bg-[#238636] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#2ea043] disabled:opacity-50"
        >
          {saving ? 'Enregistrement…' : (isActive ? 'Mettre à jour' : 'Activer pour aujourd\'hui')}
        </button>
        {isActive && (
          <button
            onClick={clear}
            disabled={saving}
            className="rounded-md border border-[#30363d] px-3 py-1.5 text-sm text-[#8b949e] hover:border-[#da3633] hover:text-[#ff7b72] disabled:opacity-50"
          >
            Supprimer l&apos;override
          </button>
        )}
      </div>

      <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-4 text-xs text-[#8b949e]">
        <strong className="text-[#c9d1d9]">Format suggéré (par news)</strong>
        <pre className="mt-2 whitespace-pre-wrap font-mono leading-relaxed">{`Titre court (max 8 mots)

Deux phrases d'analyse adaptées au métier.

Ce que ça change pour toi : action concrète.

Source : nom-domaine.com`}</pre>
      </div>
    </div>
  );
}
