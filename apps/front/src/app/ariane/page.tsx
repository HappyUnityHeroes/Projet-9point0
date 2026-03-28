import { TierPage } from '@/components/tier-page'

export const metadata = {
  title: '9.0 — Ariane : Pour ceux qui veulent grandir',
  description: 'Pages illimitées, back-office, blog IA, CRM contacts, analytics. 79€/mois.',
}

export default function ArianePage() {
  return (
    <TierPage
      name="Ariane"
      price={79}
      gradient="from-blue-500 to-blue-600"
      description="Pour ceux qui veulent grandir. Back-office complet, blog IA et premiers outils CRM."
      features={[
        'Pages illimitées',
        'Back-office complet',
        'Blog avec génération IA',
        'Analytics avancés (Plausible)',
        'CRM contacts léger',
        'Éditeur de contenu avancé',
        'Agent vocal Léa',
        '15 000 tokens IA / jour',
        '1 utilisateur',
        'Deploy automatique',
      ]}
      highlights={[
        'Blog alimenté par l\'IA',
        'Vos premiers contacts CRM',
        'Analytics pour comprendre votre audience',
      ]}
    />
  )
}
