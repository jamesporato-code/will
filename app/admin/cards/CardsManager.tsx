'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ToolCard, PromptCard } from './page';

type Tab = 'tools' | 'prompts';

export function CardsManager({
  initialTools,
  initialPrompts,
}: {
  initialTools: ToolCard[];
  initialPrompts: PromptCard[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('tools');

  return (
    <div>
      <div className="mb-4 flex gap-1 border-b border-[#21262d]">
        <TabButton active={tab === 'tools'} onClick={() => setTab('tools')}>
          Outils ({initialTools.length})
        </TabButton>
        <TabButton active={tab === 'prompts'} onClick={() => setTab('prompts')}>
          Prompts ({initialPrompts.length})
        </TabButton>
      </div>

      {tab === 'tools' && (
        <div className="space-y-3">
          {initialTools.map((t) => (
            <ToolRow key={t.id} tool={t} onSaved={() => router.refresh()} />
          ))}
          {initialTools.length === 0 && (
            <Empty msg="Aucun outil. Soumets via /api/admin/tool-cards." />
          )}
        </div>
      )}

      {tab === 'prompts' && (
        <div className="space-y-3">
          {initialPrompts.map((p) => (
            <PromptRow key={p.id} prompt={p} onSaved={() => router.refresh()} />
          ))}
          {initialPrompts.length === 0 && (
            <Empty msg="Aucun prompt. Soumets via /api/admin/prompt-cards." />
          )}
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm transition-colors ${
        active
          ? 'border-b-2 border-[#1f6feb] font-semibold text-[#e6edf3]'
          : 'text-[#8b949e] hover:text-[#c9d1d9]'
      }`}
    >
      {children}
    </button>
  );
}

function Empty({ msg }: { msg: string }) {
  return (
    <div className="rounded-lg border border-dashed border-[#30363d] p-8 text-center text-sm text-[#8b949e]">
      {msg}
    </div>
  );
}

function ToolRow({ tool, onSaved }: { tool: ToolCard; onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: tool.name,
    category: tool.category || '',
    description: tool.description || '',
    url: tool.url || '',
    why_it_matters: tool.why_it_matters || '',
    how_to_use: tool.how_to_use || '',
    target_level: tool.target_level || '',
    active: tool.active,
    position: String(tool.position),
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin-proxy/tool-cards/${tool.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          position: parseInt(form.position, 10) || 0,
        }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        setMsg(d.error || `Erreur ${res.status}`);
        return;
      }
      setMsg(null);
      setOpen(false);
      onSaved();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-lg border border-[#21262d] bg-[#0d1117]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-[#161b22]"
      >
        <div>
          <div className="text-sm font-semibold">{tool.name}</div>
          <div className="text-[11px] text-[#8b949e]">
            {tool.slug} · {tool.category || 'sans catégorie'} · pos {tool.position}
            {!tool.active && ' · inactif'}
          </div>
        </div>
        <span className="text-[#8b949e]">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="border-t border-[#21262d] p-4 space-y-3">
          <Input label="Nom" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Input label="Catégorie" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
          <Input label="URL" value={form.url} onChange={(v) => setForm({ ...form, url: v })} />
          <Textarea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          <Textarea label="Pourquoi c'est utile" value={form.why_it_matters} onChange={(v) => setForm({ ...form, why_it_matters: v })} />
          <Textarea label="Comment l'utiliser" value={form.how_to_use} onChange={(v) => setForm({ ...form, how_to_use: v })} />
          <div className="grid grid-cols-3 gap-3">
            <Input label="Niveau cible" value={form.target_level} onChange={(v) => setForm({ ...form, target_level: v })} />
            <Input label="Position" value={form.position} onChange={(v) => setForm({ ...form, position: v })} />
            <div className="flex items-end">
              <Checkbox label="Actif" value={form.active} onChange={(v) => setForm({ ...form, active: v })} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={save} disabled={saving} className="rounded-md bg-[#1f6feb] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#2f81f7] disabled:opacity-50">
              {saving ? 'Sauvegarde…' : 'Sauvegarder'}
            </button>
            {msg && <span className="text-xs text-[#ff7b72]">{msg}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function PromptRow({ prompt, onSaved }: { prompt: PromptCard; onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: prompt.title,
    category: prompt.category || '',
    use_case: prompt.use_case || '',
    prompt_template: prompt.prompt_template,
    example_output: prompt.example_output || '',
    target_level: prompt.target_level || '',
    active: prompt.active,
    position: String(prompt.position),
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin-proxy/prompt-cards/${prompt.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          position: parseInt(form.position, 10) || 0,
        }),
      });
      if (!res.ok) {
        const d = (await res.json().catch(() => ({}))) as { error?: string };
        setMsg(d.error || `Erreur ${res.status}`);
        return;
      }
      setMsg(null);
      setOpen(false);
      onSaved();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-lg border border-[#21262d] bg-[#0d1117]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-[#161b22]"
      >
        <div>
          <div className="text-sm font-semibold">{prompt.title}</div>
          <div className="text-[11px] text-[#8b949e]">
            {prompt.slug} · {prompt.category || 'sans catégorie'} · pos {prompt.position}
            {!prompt.active && ' · inactif'}
          </div>
        </div>
        <span className="text-[#8b949e]">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="border-t border-[#21262d] p-4 space-y-3">
          <Input label="Titre" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <Input label="Catégorie" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
          <Textarea label="Use case" value={form.use_case} onChange={(v) => setForm({ ...form, use_case: v })} />
          <Textarea label="Prompt template" value={form.prompt_template} onChange={(v) => setForm({ ...form, prompt_template: v })} rows={8} />
          <Textarea label="Exemple de sortie" value={form.example_output} onChange={(v) => setForm({ ...form, example_output: v })} />
          <div className="grid grid-cols-3 gap-3">
            <Input label="Niveau cible" value={form.target_level} onChange={(v) => setForm({ ...form, target_level: v })} />
            <Input label="Position" value={form.position} onChange={(v) => setForm({ ...form, position: v })} />
            <div className="flex items-end">
              <Checkbox label="Actif" value={form.active} onChange={(v) => setForm({ ...form, active: v })} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={save} disabled={saving} className="rounded-md bg-[#1f6feb] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#2f81f7] disabled:opacity-50">
              {saving ? 'Sauvegarde…' : 'Sauvegarder'}
            </button>
            {msg && <span className="text-xs text-[#ff7b72]">{msg}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
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

function Textarea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="text-xs text-[#8b949e]">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 font-mono text-xs focus:border-[#1f6feb] focus:outline-none"
      />
    </div>
  );
}

function Checkbox({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
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
