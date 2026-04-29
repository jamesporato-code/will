import { Container } from '../Container';

const features = [
  {
    n: '01',
    title: 'Sessions de 5 minutes',
    body:
      "Un format court, à l'heure que tu choisis. Compatible avec une vraie journée de travail.",
  },
  {
    n: '02',
    title: 'Mini-défis appliqués',
    body:
      "Chaque session se termine par un exercice à tester sur un cas concret de ton métier.",
  },
  {
    n: '03',
    title: 'Actu IA chaque matin',
    body:
      "Ce qui sort, ce qui change, ce qui compte vraiment pour toi. Sans le bruit Twitter.",
  },
  {
    n: '04',
    title: 'Outils & prompts du jour',
    body:
      "Des outils testés et des prompts prêts à coller, choisis pour ton secteur.",
  },
  {
    n: '05',
    title: 'Récap hebdo personnalisé',
    body:
      "Chaque semaine, ce que tu as appris et ce que tu peux mettre en pratique tout de suite.",
  },
  {
    n: '06',
    title: 'Sur WhatsApp, point.',
    body:
      "Pas d'app à installer, pas de compte à créer, pas de pop-up. Tu chattes, tu apprends.",
  },
];

export function Features() {
  return (
    <section className="border-t border-line/60 py-24 sm:py-32">
      <Container>
        <div className="mb-16 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.18em] text-muted">Ce que tu obtiens</p>
          <h2 className="mt-4 text-4xl tracking-tighter2 sm:text-5xl">
            Un coach qui tient sur la durée.
          </h2>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li
              key={f.title}
              className="group relative flex flex-col gap-3 bg-paper p-7 transition-colors hover:bg-paper/40"
            >
              <span className="display-italic text-sm text-accent">{f.n}</span>
              <h3 className="text-lg tracking-tightish">{f.title}</h3>
              <p className="text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
