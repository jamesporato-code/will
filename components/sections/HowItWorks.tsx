import { Container } from '../Container';

const steps = [
  {
    n: '01',
    title: 'Tu dis bonjour',
    body:
      "Un message sur WhatsApp, pas d'inscription. Will te demande ton métier et ton niveau pour adapter chaque session.",
    chat: 'Salut Will, je veux essayer.',
  },
  {
    n: '02',
    title: 'Tu reçois ta session',
    body:
      "5 minutes par jour, à l'heure que tu choisis. Un concept, un exemple appliqué à ton secteur, un mini-défi à tester.",
    chat: 'Module 1 · Session 2/5 — écrire un bon prompt.',
  },
  {
    n: '03',
    title: 'Tu progresses',
    body:
      "Au bout d'une semaine tu écris de meilleurs prompts. Au bout d'un mois, tu sais où l'IA t'aide vraiment.",
    chat: '3 jours d\'affilée. Tu prends le rythme.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-line/60 py-24 sm:py-32">
      <Container>
        <div className="mb-16 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.18em] text-muted">
              Comment ça marche
            </p>
            <h2 className="mt-4 text-4xl tracking-tighter2 sm:text-5xl">
              Trois étapes, zéro friction.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted lg:block">
            Pas d&apos;app, pas de compte, pas de mot de passe.
            Tu chattes, tu apprends.
          </p>
        </div>

        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="group relative flex flex-col gap-5 rounded-2xl border border-line bg-paper p-7 transition-colors hover:border-ink/25"
            >
              <div className="flex items-baseline justify-between">
                <span className="display-italic text-3xl text-accent">{s.n}</span>
                {i < steps.length - 1 && (
                  <span
                    className="hidden text-2xl text-line transition-colors group-hover:text-ink/30 md:block"
                    aria-hidden
                  >
                    →
                  </span>
                )}
              </div>
              <h3 className="text-xl tracking-tightish">{s.title}</h3>
              <p className="text-muted">{s.body}</p>

              <div className="mt-auto rounded-xl bg-ink/[0.03] px-4 py-3 text-[13px] text-ink/70">
                <span className="text-muted">↪</span> {s.chat}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
