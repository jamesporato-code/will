import { Container } from '../Container';

const features = [
  {
    tag: '5 min',
    title: 'Sessions de 5 minutes',
    body: "Format court, à l'heure que tu choisis. Compatible avec une vraie journée.",
  },
  {
    tag: 'défi',
    title: 'Mini-défis appliqués',
    body: "Chaque session se termine par un exercice testé sur un cas concret de ton métier.",
  },
  {
    tag: 'matin',
    title: 'Actu IA chaque matin',
    body: "Ce qui sort, ce qui change, ce qui compte vraiment. Sans le bruit Twitter.",
  },
  {
    tag: 'kit',
    title: 'Outils & prompts du jour',
    body: "Des outils testés et des prompts prêts à coller, choisis pour ton secteur.",
  },
  {
    tag: 'récap',
    title: 'Récap hebdo personnalisé',
    body: "Chaque semaine, ce que tu as appris et ce que tu peux appliquer tout de suite.",
  },
  {
    tag: 'WA',
    title: 'Sur WhatsApp, point.',
    body: "Pas d'app, pas de compte, pas de pop-up. Tu chattes, tu apprends.",
  },
];

export function Features() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-paperWarm py-28 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-[26rem] w-[26rem] rounded-full bg-accent/12 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-whatsapp/15 blur-[120px]"
      />

      <Container className="relative">
        <div className="mb-20 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Ce que tu obtiens
          </p>
          <h2 className="mt-5 text-4xl tracking-tighter2 sm:text-5xl">
            Un coach qui tient sur la durée.
          </h2>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li
              key={f.title}
              className="flex flex-col gap-4 rounded-3xl bg-white/45 p-7 ring-1 ring-white/55 backdrop-blur-xl"
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-whatsapp/15 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-whatsapp-deep">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-whatsapp"
                />
                {f.tag}
              </span>
              <div>
                <h3 className="text-lg tracking-tightish">{f.title}</h3>
                <p className="mt-2.5 text-muted">{f.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
