import { Container } from '../Container';
import { SECTORS } from '@/lib/constants';

export function Sectors() {
  return (
    <section id="secteurs" className="border-t border-line/60 py-24 sm:py-32">
      <Container>
        <div className="mb-16 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.18em] text-muted">Pour ton métier</p>
          <h2 className="mt-4 text-4xl tracking-tighter2 sm:text-5xl">
            Pas un cours générique.{' '}
            <span className="display-italic text-accent">Le tien.</span>
          </h2>
          <p className="mt-6 text-lg text-muted">
            Will adapte chaque session à ton secteur. Les exemples, les outils, les
            prompts du jour — tout est cadré sur ce que tu fais vraiment.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SECTORS.map((s) => (
            <li
              key={s.slug}
              className="flex items-center justify-center rounded-xl border border-line bg-paper px-4 py-5 text-center text-sm text-ink transition-colors hover:border-ink/30"
            >
              {s.label}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted">
          Tu ne te reconnais pas ? Will s&apos;adapte aussi à un métier custom — tu lui
          décris en deux phrases et il cale.
        </p>
      </Container>
    </section>
  );
}
