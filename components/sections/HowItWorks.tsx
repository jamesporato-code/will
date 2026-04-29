import { Container } from '../Container';

const steps = [
  {
    n: '01',
    title: 'Tu dis bonjour',
    body: "Un message sur WhatsApp. Will te demande ton métier et ton niveau pour adapter chaque session.",
    chatFrom: 'toi',
    chat: 'Salut Will, je veux essayer.',
    bubble: 'out',
  },
  {
    n: '02',
    title: 'Tu reçois ta session',
    body: "Cinq minutes par jour, à l'heure que tu choisis. Un concept, un exemple, un défi.",
    chatFrom: 'Will',
    chat: 'Module 1 · Session 2/5 — écrire un bon prompt.',
    bubble: 'in',
  },
  {
    n: '03',
    title: 'Tu progresses',
    body: "Au bout d'une semaine tu écris de meilleurs prompts. Au bout d'un mois, tu sais où l'IA t'aide vraiment.",
    chatFrom: 'Will',
    chat: '3 jours d\'affilée. Tu prends le rythme.',
    bubble: 'in',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden border-t border-line bg-paperWarm py-28 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-whatsapp/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-20 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[120px]"
      />

      <Container className="relative">
        <div className="mb-20 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Comment ça marche
          </p>
          <h2 className="mt-5 text-4xl tracking-tighter2 sm:text-5xl">
            Trois étapes, zéro friction.
          </h2>
        </div>

        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex flex-col gap-6 rounded-3xl bg-white/40 p-8 ring-1 ring-white/50 backdrop-blur-xl"
            >
              <span className="display-italic text-2xl text-muted">{s.n}</span>
              <div>
                <h3 className="text-xl tracking-tightish">{s.title}</h3>
                <p className="mt-3 text-muted">{s.body}</p>
              </div>

              {/* Mini WhatsApp bubble */}
              <div className="mt-auto">
                <div
                  className={
                    'inline-block max-w-full rounded-[10px] px-3 py-2 text-[13px] leading-snug shadow-sm ' +
                    (s.bubble === 'out'
                      ? 'rounded-tr-[2px] bg-[#D9FDD3] text-[#111B21]'
                      : 'rounded-tl-[2px] bg-white text-[#111B21]')
                  }
                >
                  {s.chat}
                </div>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.16em] text-muted">
                  {s.chatFrom}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
