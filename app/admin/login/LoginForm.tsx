'use client';

import { useState, FormEvent } from 'react';

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token.trim() }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error || 'Erreur ' + res.status);
        return;
      }
      window.location.href = nextPath;
    } catch {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <input
        type="password"
        autoFocus
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="x-admin-token"
        className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 font-mono text-sm text-[#e6edf3] placeholder-[#6e7681] focus:border-[#1f6feb] focus:outline-none"
      />
      {error && (
        <p className="rounded border border-[#da3633] bg-[#2a1213] px-3 py-2 text-xs text-[#ff7b72]">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !token.trim()}
        className="w-full rounded-md bg-[#238636] px-4 py-2 text-sm font-medium text-white hover:bg-[#2ea043] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Vérification…' : 'Entrer'}
      </button>
    </form>
  );
}
