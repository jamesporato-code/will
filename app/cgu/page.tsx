import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Conditions générales — Will',
  description: "Les conditions d'utilisation du service Will.",
};

export default function CGUPage() {
  return (
    <LegalLayout title="Conditions générales d'utilisation" updated="29 avril 2026">
      <p>
        Les présentes conditions encadrent l&apos;usage de Will, un service de coaching
        IA accessible via WhatsApp. En démarrant une conversation avec Will, tu
        acceptes ces conditions.
      </p>

      <h2>1. Description du service</h2>
      <p>
        Will est un assistant qui t&apos;envoie chaque jour, sur WhatsApp, une session
        courte d&apos;apprentissage de l&apos;IA adaptée à ton métier, avec des
        défis, des outils et des prompts.
      </p>

      <h2>2. Inscription et accès</h2>
      <p>
        L&apos;accès se fait sans création de compte traditionnelle : ton numéro
        WhatsApp tient lieu d&apos;identifiant. Tu déclares être majeur·e et utiliser
        le service à titre personnel ou professionnel.
      </p>

      <h2>3. Essai gratuit</h2>
      <p>
        Sept jours d&apos;essai sont offerts, sans carte bancaire. Pendant cette période,
        tu accèdes au Module 1 du parcours. À la fin de l&apos;essai, tu peux
        souscrire au plan Pro pour poursuivre.
      </p>

      <h2>4. Abonnement Pro</h2>
      <ul>
        <li>Tarif : 6,99 € par mois, sans engagement.</li>
        <li>Paiement mensuel, prélevé d&apos;avance.</li>
        <li>
          Résiliation possible à tout moment en envoyant <em>stop</em> à Will. Tu
          gardes l&apos;accès jusqu&apos;à la fin de la période en cours.
        </li>
      </ul>

      <h2>5. Engagements de Will</h2>
      <ul>
        <li>Te fournir un service disponible et fonctionnel.</li>
        <li>Adapter les sessions à ton métier et faire évoluer le parcours.</li>
        <li>Protéger tes données conformément à la politique de confidentialité.</li>
      </ul>

      <h2>6. Tes engagements</h2>
      <ul>
        <li>Utiliser Will de bonne foi, sans contenu illicite ni harcèlement.</li>
        <li>
          Ne pas tenter de contourner les limites du service ni d&apos;extraire
          massivement des contenus.
        </li>
        <li>Respecter les droits de propriété intellectuelle attachés au service.</li>
      </ul>

      <h2>7. Propriété intellectuelle</h2>
      <p>
        Les contenus générés par Will (sessions, défis, récaps) te sont concédés
        pour ton usage personnel. La marque, le parcours pédagogique et la
        structure du service restent la propriété de Will.
      </p>

      <h2>8. Responsabilité</h2>
      <p>
        Will est un outil pédagogique. Les recommandations qu&apos;il fournit ne se
        substituent pas à un conseil professionnel (juridique, financier, médical).
        Tu restes responsable de l&apos;usage que tu fais des contenus.
      </p>

      <h2>9. Disponibilité du service</h2>
      <p>
        Will dépend de l&apos;API WhatsApp et de prestataires tiers. Une interruption
        temporaire ne peut donner lieu à indemnisation au-delà du remboursement
        prorata du mois en cours, le cas échéant.
      </p>

      <h2>10. Modification des CGU</h2>
      <p>
        Will peut faire évoluer ces conditions. Toute modification importante te
        sera signalée sur WhatsApp avant son entrée en vigueur.
      </p>

      <h2>11. Droit applicable</h2>
      <p>
        Les présentes conditions sont soumises au droit français. Tout litige sera
        porté devant les tribunaux compétents, sous réserve des dispositions
        légales applicables aux consommateurs.
      </p>

      <h2>12. Contact</h2>
      <p>
        Pour toute question :{' '}
        <a href="mailto:hello@will-coach.com">hello@will-coach.com</a>.
      </p>
    </LegalLayout>
  );
}
