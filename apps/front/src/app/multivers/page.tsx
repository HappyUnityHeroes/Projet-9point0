import { TierPage } from '@/components/tier-page'

export const metadata = {
  title: '9.0 — Multivers : Le CRM IA ultime',
  description: 'Scoring IA, utilisateurs illimités, tous les agents, support dédié. 499€/mois.',
}

export default function MultiversPage() {
  return (
    <TierPage
      name="Multivers"
      price={499}
      gradient="from-pink-500 to-rose-600"
      description="Le CRM IA ultime. Scoring intelligent, équipe illimitée et tous les agents à votre service."
      features={[
        'Tout Interstellar inclus',
        'Scoring IA des contacts (0-100)',
        'IA avancée pour automatisations',
        'Utilisateurs illimités',
        'Tous les agents (Léa, Sofia, Marc)',
        '50 000 tokens IA / jour',
        'Validation admin dédiée',
        'Support prioritaire',
        'Projections et simulations',
        'Dashboard opérateur complet',
      ]}
      highlights={[
        'L\'IA score vos contacts automatiquement',
        'Toute votre équipe connectée',
        '3 agents IA à disposition 24h/24',
      ]}
    />
  )
}
