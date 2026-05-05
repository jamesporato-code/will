import { SystemActions } from './SystemActions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Système — Will admin' };

export default function SystemPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Système</h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          Actions admin destructrices et utilitaires de migration. À utiliser
          avec précaution.
        </p>
      </header>

      <section className="space-y-3">
        <SystemActions />
      </section>
    </div>
  );
}
