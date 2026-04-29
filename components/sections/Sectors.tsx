import { Container } from '../Container';

const sectors = [
  {
    slug: 'sales',
    label: 'Sales / Business Dev',
    teaser: 'Relance de prospect, 60 mots, ton direct.',
  },
  {
    slug: 'marketing',
    label: 'Marketing & Communication',
    teaser: 'Brief créatif structuré en 4 lignes.',
  },
  {
    slug: 'consulting',
    label: 'Conseil & Stratégie',
    teaser: 'Synthèse exec de 12 pages → 3 bullets.',
  },
  {
    slug: 'product',
    label: 'Produit & Tech',
    teaser: 'Spec technique relue par un PM senior.',
  },
  {
    slug: 'finance',
    label: 'Finance & Compta',
    teaser: 'Analyse d\'un P&L en 5 questions.',
  },
  {
    slug: 'rh',
    label: 'RH & Management',
    teaser: 'Feedback difficile, ton ferme et juste.',
  },
  {
    slug: 'legal',
    label: 'Juridique',
    teaser: 'Clause de non-concurrence, version FR claire.',
  },
  {
    slug: 'education',
    label: 'Éducation & Formation',
    teaser: 'Plan de cours adapté niveau débutant.',
  },
  {
    slug: 'creative',
    label: 'Création & Contenu',
    teaser: 'Hook LinkedIn qui donne envie de scroller.',
  },
  {
    slug: 'entrepreneur',
    label: 'Founder / Entrepreneur',
    teaser: 'Pitch 30 secondes, problème → solution → traction.',
  },
];

export function Sectors() {
  return (
    <section
      id="secteurs"
      className="relative overflow-hidden border-t border-line py-28 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-32 h-[28rem] w-[28rem] rounded-full bg-whatsapp/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-accent/10 blur-[120px]"
      />

      <Container className="relative">
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

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {sectors.map((s, i) => (
            <li
              key={s.slug}
              className="group flex items-start justify-between gap-6 rounded-2xl bg-white/40 px-6 py-5 ring-1 ring-white/50 backdrop-blur-xl transition hover:bg-white/55"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-lg tracking-tightish text-ink">
                  {s.label}
                </span>
                <span className="display-italic text-[13.5px] text-muted">
                  « {s.teaser} »
                </span>
              </div>
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
