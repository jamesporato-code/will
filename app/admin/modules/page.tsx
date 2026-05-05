import { adminFetch } from '@/lib/admin-api';
import { ModulesEditor } from './ModulesEditor';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Modules — Will admin' };

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

type Session = {
  id: number;
  module_id: number;
  position: number;
  topic: string;
  active: boolean;
};

export default async function ModulesPage() {
  const res = await adminFetch<{ modules: Module[] }>('/api/admin/modules');
  if (!res.ok) {
    return (
      <div className="rounded-lg border border-[#da3633] bg-[#2a1213] p-6 text-[#ff7b72]">
        Erreur {res.status} : {res.error.substring(0, 200)}
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Modules</h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          Parcours pédagogique. {res.data.modules.length} modules ·{' '}
          {res.data.modules.reduce((s, m) => s + m.sessions.length, 0)} sessions.
        </p>
      </header>
      <ModulesEditor initialModules={res.data.modules} />
    </div>
  );
}
