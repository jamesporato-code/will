import { Container } from '../Container';
import { SECTORS } from '@/lib/constants';

export function Sectors() {
  return (
    <section id="secteurs" className="border-t border-line py-28 sm:py-40">
      <Container>
        <div className="mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Pour ton métier
          </p>
          <h2 className="mt-5 text-4xl tracking-tighter2 sm:text-5xl">
            Pas un cours générique. Le tien.
          </h2>
          <p className="mt-7 max-w-prose2 text-lg text-muted">
            Will adapte chaque session à ton secteur — les exemples, les outils,
            les prompts du jour.
          </p>
        </div>

        <ul className="grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-2 sm:divide-y-0 sm:border-y-0 lg:grid-cols-2">
          {SECTORS.map((s, i) => (
            <li
              key={s.slug}
              className={
                'flex items-baseline justify-between gap-6 py-5 sm:px-2 ' +
                'sm:border-b sm:border-line ' +
                (i % 2 === 0 ? 'sm:border-r sm:pr-8' : 'sm:pl-8') +
                ' ' +
                (i < SECTORS.length - 2 ? '' : 'sm:last:border-b')
              }
            >
              <span className="text-lg tracking-tightish text-ink">{s.label}</span>
              <span className="font-mono text-xs text-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-xl text-sm text-muted">
          Pas dans la liste ? Will s&apos;adapte aussi à un métier custom — décris-le
          en deux phrases, il cale le parcours.
        </p>
      </Container>
    </section>
  );
}
