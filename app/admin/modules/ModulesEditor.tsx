'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Session = {
  id: number;
  module_id: number;
  position: number;
  topic: string;
  active: boolean;
};

type Module = {
  id: number;
  slug: string;
  position: number;
  name: string;
  level: string;
  dynamic: boolean;
  active: boolean;
  applicable_sectors: string[] | null;
  applicable_levels: string[] | null;
  sessions: Session[];
};

export function ModulesEditor({ initialModules }: { initialModules: Module[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          onClick={() => setCreating(true)}
          className="rounded-md bg-[#238636] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#2ea043]"
        >
          + Nouveau module
        </button>
      </div>

      {creating && (
        <NewModuleForm
          onCancel={() => setCreating(false)}
          onCreated={() => {
            setCreating(false);
            router.refresh();
          }}
          nextPosition={
            Math.max(...initialModules.map((m) => m.position), 0) + 1
          }
        />
      )}

      <div className="space-y-2">
        {initialModules.map((m) => (
          <ModuleRow
            key={m.id}
            module={m}
            isOpen={openId === m.id}
            onToggle={() => setOpenId(openId === m.id ? null : m.id)}
            onChanged={() => router.refresh()}
          />
        ))}
      </div>
    </div>
  );
}

function ModuleRow({
  module: mod,
  isOpen,
  onToggle,
  onChanged,
}: {
  module: Module;
  isOpen: boolean;
  onToggle: () => void;
  onChanged: () => void;
}) {
  return (
    <div className="rounded-lg border border-[#21262d] bg-[#0d1117]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-[#161b22]"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#8b949e]">
            {String(mod.position).padStart(2, '0')}
          </span>
          <div>
            <div className="text-sm font-semibold text-[#e6edf3]">
              {mod.name}
            </div>
            <div className="text-[11px] text-[#8b949e]">
              {mod.slug} · {mod.level} · {mod.sessions.length} sessions
              {mod.dynamic && ' · dynamic'}
              {!mod.active && ' · inactif'}
            </div>
          </div>
        </div>
        <span className="text-[#8b949e]">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="border-t border-[#21262d] p-4">
          <ModuleEditForm module={mod} onSaved={onChanged} />
          <div className="mt-6 border-t border-[#21262d] pt-4">
            <SessionsEditor module={mod} onChanged={onChanged} />
          </div>
        </div>
      )}
    </div>
  );
}

function NewModuleForm({
  onCancel,
  onCreated,
  nextPosition,
}: {
  onCancel: () => void;
  onCreated: () => void;
  nextPosition: number;
}) {
  const [form, setForm] = useState({
    slug: '',
    name: '',
    position: String(nextPosition),
    level: 'beginner',
    dynamic: false,
    sessionsText: '',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setErr(null);
    try {
      const sessions = form.sessionsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const res = await fetch('/api/admin-proxy/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: form.slug.trim(),
          name: form.name.trim(),
          position: parseInt(form.position, 10),
          level: form.level,
          dynamic: form.dynamic,
          sessions,
        }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        setErr(d.error || `Erreur ${res.status}`);
        return;
      }
      onCreated();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-[#1f6feb] bg-[#0d1117] p-4">
      <h3 className="text-sm font-semibold">Nouveau module</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Input label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
        <Input label="Position" value={form.position} onChange={(v) => setForm({ ...form, position: v })} />
        <Input label="Nom" value={form.name} onChange={(v) => setForm({ ...form, name: v })} className="md:col-span-2" />
        <Select label="Niveau" value={form.level} onChange={(v) => setForm({ ...form, level: v })} options={['beginner', 'intermediate']} />
        <Checkbox label="Dynamic (filtré par secteur user)" value={form.dynamic} onChange={(v) => setForm({ ...form, dynamic: v })} />
      </div>
      <div className="mt-3">
        <label className="text-xs text-[#8b949e]">Sessions (une par ligne)</label>
        <textarea
          rows={6}
          value={form.sessionsText}
          onChange={(e) => setForm({ ...form, sessionsText: e.target.value })}
          className="mt-1 w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm focus:border-[#1f6feb] focus:outline-none"
        />
      </div>
      {err && (
        <p className="mt-2 rounded border border-[#da3633] bg-[#2a1213] px-3 py-1.5 text-xs text-[#ff7b72]">
          {err}
        </p>
      )}
      <div className="mt-4 flex gap-2">
        <button
          onClick={submit}
          disabled={loading || !form.slug || !form.name}
          className="rounded-md bg-[#238636] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#2ea043] disabled:opacity-50"
        >
          {loading ? 'Création…' : 'Créer'}
        </button>
        <button
          onClick={onCancel}
          className="rounded-md border border-[#30363d] px-3 py-1.5 text-sm text-[#8b949e] hover:bg-[#161b22]"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

function ModuleEditForm({ module: mod, onSaved }: { module: Module; onSaved: () => void }) {
  const [form, setForm] = useState({
    slug: mod.slug,
    name: mod.name,
    position: String(mod.position),
    level: mod.level,
    dynamic: mod.dynamic,
    active: mod.active,
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function save() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin-proxy/modules/${mod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: form.slug.trim(),
          name: form.name.trim(),
          position: parseInt(form.position, 10),
          level: form.level,
          dynamic: form.dynamic,
          active: form.active,
        }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        setMsg({ ok: false, text: d.error || `Erreur ${res.status}` });
        return;
      }
      setMsg({ ok: true, text: 'Sauvegardé.' });
      onSaved();
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : 'Erreur' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
        Module
      </h4>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <Input label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
        <Input label="Position" value={form.position} onChange={(v) => setForm({ ...form, position: v })} />
        <Select label="Niveau" value={form.level} onChange={(v) => setForm({ ...form, level: v })} options={['beginner', 'intermediate']} />
        <Input label="Nom" value={form.name} onChange={(v) => setForm({ ...form, name: v })} className="md:col-span-3" />
        <Checkbox label="Dynamic" value={form.dynamic} onChange={(v) => setForm({ ...form, dynamic: v })} />
        <Checkbox label="Actif" value={form.active} onChange={(v) => setForm({ ...form, active: v })} />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={save}
          disabled={loading}
          className="rounded-md bg-[#1f6feb] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#2f81f7] disabled:opacity-50"
        >
          {loading ? 'Sauvegarde…' : 'Sauvegarder'}
        </button>
        {msg && (
          <span className={`text-xs ${msg.ok ? 'text-[#3fb950]' : 'text-[#ff7b72]'}`}>
            {msg.text}
          </span>
        )}
      </div>
    </div>
  );
}

function SessionsEditor({ module: mod, onChanged }: { module: Module; onChanged: () => void }) {
  const [adding, setAdding] = useState('');
  const [savingId, setSavingId] = useState<number | null>(null);

  async function addSession() {
    if (!adding.trim()) return;
    const res = await fetch(`/api/admin-proxy/modules/${mod.id}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: adding.trim() }),
    });
    if (res.ok) {
      setAdding('');
      onChanged();
    }
  }

  async function updateSession(s: Session, fields: Partial<Session>) {
    setSavingId(s.id);
    const res = await fetch(`/api/admin-proxy/sessions/${s.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    });
    setSavingId(null);
    if (res.ok) onChanged();
  }

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
        Sessions ({mod.sessions.length})
      </h4>
      <div className="mt-3 space-y-2">
        {mod.sessions.map((s, i) => (
          <SessionRow
            key={s.id}
            session={s}
            index={i}
            saving={savingId === s.id}
            onUpdate={(fields) => updateSession(s, fields)}
          />
        ))}
        {mod.sessions.length === 0 && (
          <p className="text-xs text-[#8b949e]">Aucune session.</p>
        )}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={adding}
          onChange={(e) => setAdding(e.target.value)}
          placeholder="Nouvelle session (topic)…"
          className="flex-1 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm placeholder-[#6e7681] focus:border-[#1f6feb] focus:outline-none"
        />
        <button
          onClick={addSession}
          disabled={!adding.trim()}
          className="rounded-md bg-[#238636] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#2ea043] disabled:opacity-50"
        >
          + Ajouter
        </button>
      </div>
    </div>
  );
}

function SessionRow({
  session,
  index,
  saving,
  onUpdate,
}: {
  session: Session;
  index: number;
  saving: boolean;
  onUpdate: (fields: Partial<Session>) => void;
}) {
  const [topic, setTopic] = useState(session.topic);
  const dirty = topic !== session.topic;

  return (
    <div className="flex items-center gap-2 rounded border border-[#21262d] bg-[#0d1117] p-2">
      <span className="w-8 font-mono text-xs text-[#8b949e]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="flex-1 bg-transparent text-sm focus:outline-none"
      />
      {dirty && (
        <button
          onClick={() => onUpdate({ topic })}
          disabled={saving}
          className="rounded bg-[#1f6feb] px-2 py-1 text-[11px] text-white hover:bg-[#2f81f7] disabled:opacity-50"
        >
          {saving ? '…' : 'Save'}
        </button>
      )}
      <button
        onClick={() => onUpdate({ active: !session.active })}
        title={session.active ? 'Désactiver' : 'Réactiver'}
        className={`rounded px-2 py-1 text-[11px] ${
          session.active
            ? 'bg-[#23863633] text-[#3fb950]'
            : 'bg-[#8b949e33] text-[#8b949e]'
        }`}
      >
        {session.active ? 'actif' : 'off'}
      </button>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  className = '',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs text-[#8b949e]">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm focus:border-[#1f6feb] focus:outline-none"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="text-xs text-[#8b949e]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm focus:border-[#1f6feb] focus:outline-none"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4"
      />
      <span className="text-[#c9d1d9]">{label}</span>
    </label>
  );
}
