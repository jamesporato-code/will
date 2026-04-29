import { Container } from '../Container';
import { SECTORS } from '@/lib/constants';

const sampleQuotes: Record<string, string> = {
  sales: "« Aujourd'hui : un prompt pour relancer un prospect froid sans copier-coller. »",
  marketing: "« Aujourd'hui : décliner un brief en 5 angles éditoriaux en 30 secondes. »",
  consulting: "« Aujourd'hui : structurer une note client en pyramide de Minto, avec un prompt. »",
  product: "« Aujourd'hui : écrire des user stories testables en parlant à Claude. »",
  finance: "« Aujourd'hui : nettoyer un export Excel sale, sans VBA, juste un prompt. »",
  rh: "« Aujourd'hui : reformuler un feedback difficile sans tomber dans l'évasif. »",
  legal: "« Aujourd'hui : résumer un contrat de 30 pages en 5 points actionnables. »",
  education: "« Aujourd'hui : générer 10 variantes d'une consigne pour différencier en classe. »",
  creative: "« Aujourd'hui : casser le syndrome de la page blanche avec un prompt à 3 niveaux. »",
  entrepreneur: "« Aujourd'hui : tester un pitch en 60 secondes face à 3 personas IA. »",
};

export function Sectors() {
  return (
    <section id="secteurs" className="border-t border-line/60 py-24 sm:py-32">
      <Container>
        <div className="mb-14 max-w-2xl">
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

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((s) => (
            <li
              key={s.slug}
              className="group flex flex-col gap-3 rounded-xl border border-line bg-paper p-5 transition-colors hover:border-ink/25"
            >
              <div className="flex items-center justify-between">
                <span className="text-[15px] tracking-tightish text-ink">
                  {s.label}
                </span>
                <span
                  className="text-line transition-colors group-hover:text-accent"
                  aria-hidden
                >
                  →
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-muted">
                {sampleQuotes[s.slug] || ''}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-xl text-sm text-muted">
          Tu ne te reconnais pas dans cette liste ? Will s&apos;adapte aussi à un
          métier custom — tu lui décris en deux phrases ce que tu fais et il cale
          le parcours.
        </p>
      </Container>
    </section>
  );
}
