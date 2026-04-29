import { Container } from '../Container';

const features = [
  {
    title: 'Sessions de 5 minutes',
    body: "Format court, à l'heure que tu choisis. Compatible avec une vraie journée.",
  },
  {
    title: 'Mini-défis appliqués',
    body: "Chaque session se termine par un exercice testé sur un cas concret de ton métier.",
  },
  {
    title: 'Actu IA chaque matin',
    body: "Ce qui sort, ce qui change, ce qui compte vraiment. Sans le bruit Twitter.",
  },
  {
    title: 'Outils & prompts du jour',
    body: "Des outils testés et des prompts prêts à coller, choisis pour ton secteur.",
  },
  {
    title: 'Récap hebdo personnalisé',
    body: "Chaque semaine, ce que tu as appris et ce que tu peux appliquer tout de suite.",
  },
  {
    title: 'Sur WhatsApp, point.',
    body: "Pas d'app, pas de compte, pas de pop-up. Tu chattes, tu apprends.",
  },
];

export function Features() {
  return (
    <section className="border-t border-line py-28 sm:py-40">
      <Container>
        <div className="mb-20 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Ce que tu obtiens
          </p>
          <h2 className="mt-5 text-4xl tracking-tighter2 sm:text-5xl">
            Un coach qui tient sur la durée.
          </h2>
        </div>

        <ul className="grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li key={f.title}>
              <h3 className="text-lg tracking-tightish">{f.title}</h3>
              <p className="mt-3 text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
