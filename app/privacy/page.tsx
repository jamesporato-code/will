import type { Metadata } from 'next';
import { LegalLayout } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Will',
  description: "Comment Will collecte, utilise et protège tes données personnelles.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="29 avril 2026">
      <p>
        Cette politique décrit comment Will (« nous ») collecte, utilise et protège
        les données personnelles que tu nous confies en utilisant le service via
        WhatsApp.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement est l&apos;éditeur de Will, joignable à
        l&apos;adresse <a href="mailto:hello@will-coach.com">hello@will-coach.com</a>.
      </p>

      <h2>2. Données collectées</h2>
      <p>Quand tu utilises Will, nous collectons :</p>
      <ul>
        <li>Ton numéro WhatsApp (identifiant unique du service).</li>
        <li>
          Les informations que tu nous fournis pendant l&apos;onboarding : prénom,
          secteur d&apos;activité, niveau, heure préférée pour la session quotidienne.
        </li>
        <li>
          L&apos;historique de tes échanges avec Will, utilisé pour personnaliser le
          parcours et améliorer la qualité des sessions.
        </li>
        <li>
          Des données techniques minimales (statut d&apos;envoi des messages, horodatage)
          fournies par l&apos;API WhatsApp Cloud de Meta.
        </li>
      </ul>

      <h2>3. Finalités</h2>
      <ul>
        <li>Te délivrer le service Will et adapter les sessions à ton métier.</li>
        <li>Gérer ton abonnement (essai gratuit, plan payant).</li>
        <li>Améliorer la qualité du service de manière agrégée et anonymisée.</li>
        <li>Répondre à tes demandes de support.</li>
      </ul>

      <h2>4. Base légale</h2>
      <p>
        Les traitements reposent sur l&apos;exécution du contrat qui te lie à Will (CGU)
        et, pour les améliorations produit, sur notre intérêt légitime à faire évoluer
        le service.
      </p>

      <h2>5. Destinataires</h2>
      <p>
        Tes données ne sont jamais vendues. Elles sont accessibles à l&apos;équipe Will
        et à nos sous-traitants techniques (hébergeur, fournisseur d&apos;API IA,
        plateforme WhatsApp Cloud, prestataire de paiement). Chacun est lié par un
        engagement de confidentialité.
      </p>

      <h2>6. Durée de conservation</h2>
      <p>
        Les données sont conservées tant que ton compte est actif. Si tu cesses
        d&apos;utiliser Will pendant 12 mois consécutifs, ton compte et tes échanges
        sont supprimés automatiquement.
      </p>

      <h2>7. Tes droits</h2>
      <p>
        Tu disposes d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
        de limitation et de portabilité de tes données. Tu peux les exercer à tout
        moment en écrivant à{' '}
        <a href="mailto:hello@will-coach.com">hello@will-coach.com</a>. Tu peux aussi
        introduire une réclamation auprès de la CNIL.
      </p>

      <h2>8. Sécurité</h2>
      <p>
        Les échanges WhatsApp sont chiffrés bout en bout par Meta. Côté Will, tes
        données sont stockées sur des serveurs sécurisés en Europe et l&apos;accès
        est restreint au strict nécessaire.
      </p>

      <h2>9. Mises à jour</h2>
      <p>
        Cette politique peut être mise à jour. Toute modification significative te
        sera signalée directement sur WhatsApp.
      </p>
    </LegalLayout>
  );
}
