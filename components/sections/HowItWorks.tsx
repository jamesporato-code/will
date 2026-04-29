import { Container } from '../Container';

const steps = [
  {
    n: '01',
    title: 'Tu dis bonjour',
    body: "Un message sur WhatsApp. Will te demande ton métier et ton niveau pour adapter chaque session.",
  },
  {
    n: '02',
    title: 'Tu reçois ta session',
    body: "Cinq minutes par jour, à l'heure que tu choisis. Un concept, un exemple, un défi.",
  },
  {
    n: '03',
    title: 'Tu progresses',
    body: "Au bout d'une semaine tu écris de meilleurs prompts. Au bout d'un mois, tu sais où l'IA t'aide vraiment.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-line py-28 sm:py-40">
      <Container>
        <div className="mb-20 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Comment ça marche
          </p>
          <h2 className="mt-5 text-4xl tracking-tighter2 sm:text-5xl">
            Trois étapes, zéro friction.
          </h2>
        </div>

        <ol className="grid gap-12 md:grid-cols-3 md:gap-0">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className={
                'flex flex-col gap-5 md:px-10 md:first:pl-0 md:last:pr-0 ' +
                (i > 0 ? 'md:border-l md:border-line' : '')
              }
            >
              <span className="display-italic text-2xl text-muted">{s.n}</span>
              <h3 className="text-xl tracking-tightish">{s.title}</h3>
              <p className="text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
