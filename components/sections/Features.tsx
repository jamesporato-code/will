import { Container } from '../Container';

const features = [
  {
    title: 'Sessions de 5 minutes',
    body:
      "Un format court, à l'heure que tu choisis. Compatible avec une vraie journée de travail.",
  },
  {
    title: 'Mini-défis appliqués',
    body:
      "Chaque session se termine par un exercice à tester sur un cas concret de ton métier.",
  },
  {
    title: 'Actu IA chaque matin',
    body:
      "Ce qui sort, ce qui change, ce qui compte vraiment pour toi. Sans le bruit Twitter.",
  },
  {
    title: 'Outils & prompts du jour',
    body:
      "Des outils testés et des prompts prêts à coller, choisis pour ton secteur.",
  },
  {
    title: 'Récap hebdo personnalisé',
    body:
      "Chaque semaine, ce que tu as appris et ce que tu peux mettre en pratique tout de suite.",
  },
  {
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
            Un coach qui{' '}
            <span className="display-italic text-accent">tient sur la durée</span>.
          </h2>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li
              key={f.title}
              className="rounded-2xl border border-line bg-paper p-7 transition-colors hover:border-ink/25"
            >
              <h3 className="text-lg tracking-tightish">{f.title}</h3>
              <p className="mt-3 text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
