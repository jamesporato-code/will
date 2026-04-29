import { Container } from '../Container';

const steps = [
  {
    n: '01',
    title: 'Tu dis bonjour à Will',
    body:
      "Un message sur WhatsApp, pas d'inscription. Will te demande ton métier et ton niveau pour adapter chaque session.",
  },
  {
    n: '02',
    title: 'Tu reçois ta session du jour',
    body:
      "5 minutes par jour, à l'heure que tu choisis. Un concept, un exemple appliqué à ton secteur, un mini-défi à tester.",
  },
  {
    n: '03',
    title: 'Tu progresses, sans y penser',
    body:
      "Au bout d'une semaine tu écris de meilleurs prompts. Au bout d'un mois, tu sais où l'IA t'aide vraiment dans ton métier.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-line/60 py-24 sm:py-32">
      <Container>
        <div className="mb-16 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.18em] text-muted">Comment ça marche</p>
          <h2 className="mt-4 text-4xl tracking-tighter2 sm:text-5xl">
            Trois étapes,{' '}
            <span className="display-italic text-accent">zéro friction</span>.
          </h2>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col gap-4 bg-paper p-8">
              <span className="display-italic text-3xl text-accent">{s.n}</span>
              <h3 className="text-xl tracking-tightish">{s.title}</h3>
              <p className="text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
