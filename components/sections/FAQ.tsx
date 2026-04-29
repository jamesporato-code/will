import { Container } from '../Container';

const faqs = [
  {
    q: 'Pourquoi WhatsApp et pas une app ?',
    a: "Parce qu'une app de plus, tu vas l'oublier en trois jours. WhatsApp, tu l'as déjà ouvert. Will arrive là où ton attention est déjà.",
  },
  {
    q: "C'est vraiment 5 minutes par jour ?",
    a: "Oui. Une session = un concept court, un exemple appliqué à ton secteur, un mini-défi. Tu peux y répondre tranquillement plus tard si tu préfères.",
  },
  {
    q: "Je n'y connais rien à l'IA, c'est OK ?",
    a: "C'est même fait pour ça. Le module 1 démarre à zéro et reste concret. Pas de jargon, pas de math, juste ce qui sert dans ton métier.",
  },
  {
    q: 'Comment je résilie ?',
    a: "Tu écris « stop » à Will. C'est tout. Pas de formulaire, pas de friction. Et tu peux relancer quand tu veux.",
  },
  {
    q: 'Mes données restent où ?',
    a: "Tes échanges sont chiffrés bout en bout par WhatsApp. Côté Will, on stocke le minimum nécessaire pour adapter les sessions à ton métier — détaillé dans la politique de confidentialité.",
  },
  {
    q: 'Je peux changer de métier en cours de route ?',
    a: 'Oui. Tu envoies « mon compte » à Will, tu changes ton secteur, et le contenu se réadapte dès la session suivante.',
  },
  {
    q: 'Et si Will dit une bêtise ?',
    a: "Ça peut arriver — c'est aussi pour ça que Will t'apprend à reconnaître une hallucination dès le module 1. Tu apprends à utiliser l'IA, pas à la croire aveuglément.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-line/60 py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted">FAQ</p>
            <h2 className="mt-4 text-4xl tracking-tighter2 sm:text-5xl">
              Les questions{' '}
              <span className="display-italic text-accent">qui reviennent</span>.
            </h2>
            <p className="mt-6 text-sm text-muted">
              Une autre question ? Écris-nous à{' '}
              <a
                href="mailto:hello@will-coach.com"
                className="text-ink underline underline-offset-4 hover:text-accent"
              >
                hello@will-coach.com
              </a>
              .
            </p>
          </div>

          <ul className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <li key={f.q}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg tracking-tightish transition-colors group-hover:text-accent">
                    <span>{f.q}</span>
                    <span
                      aria-hidden
                      className="mt-1 select-none text-2xl font-light leading-none text-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-prose2 text-muted">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
