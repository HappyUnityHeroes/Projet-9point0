import { TierPage } from '@/components/tier-page'

export const metadata = {
  title: '9.0 — Interstellar : La puissance commerciale',
  description: 'Pipeline kanban, intégration Stripe, CRM complet, agents Léa & Sofia. 199€/mois.',
}

export default function InterstellarPage() {
  return (
    <TierPage
      name="Interstellar"
      price={199}
      gradient="from-purple-500 to-purple-600"
      description="La puissance commerciale. Pipeline, Stripe, CRM complet et deux agents IA dédiés."
      features={[
        'Tout Ariane inclus',
        'Pipeline kanban drag & drop',
        'Intégration paiements Stripe',
        'CRM complet',
        'Analytics avancés',
        'Agents Léa + Sofia',
        '30 000 tokens IA / jour',
        '3 utilisateurs',
        'Validation admin pour les déploiements',
        'Support prioritaire',
      ]}
      highlights={[
        'Pipeline visuel pour vos ventes',
        'Sofia optimise votre relation client',
        'Encaissez directement via Stripe',
      ]}
    />
  )
}
