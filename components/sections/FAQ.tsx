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
    <section
      id="faq"
      className="relative overflow-hidden border-t border-line py-28 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-whatsapp/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-10 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[120px]"
      />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted">FAQ</p>
            <h2 className="mt-5 text-4xl tracking-tighter2 sm:text-5xl">
              Les questions qui reviennent.
            </h2>
            <p className="mt-7 text-sm text-muted">
              Une autre question ?{' '}
              <a
                href="mailto:hello@will-coach.com"
                className="text-ink underline underline-offset-4 hover:text-accent"
              >
                hello@will-coach.com
              </a>
            </p>
          </div>

          <div className="rounded-3xl bg-white/40 p-2 ring-1 ring-white/50 backdrop-blur-xl sm:p-4">
            <ul className="divide-y divide-line/70">
              {faqs.map((f) => (
                <li key={f.q}>
                  <details className="group px-4 py-5 sm:px-5 sm:py-6">
                    <summary className="flex cursor-pointer list-none items-baseline justify-between gap-8 text-lg tracking-tightish">
                      <span>{f.q}</span>
                      <span
                        aria-hidden
                        className="select-none text-xl font-light leading-none text-muted transition-transform group-open:rotate-45"
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
        </div>
      </Container>
    </section>
  );
}
