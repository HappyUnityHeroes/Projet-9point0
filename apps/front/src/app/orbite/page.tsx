import { TierPage } from '@/components/tier-page'

export const metadata = {
  title: '9.0 — Orbite : L\'essentiel pour démarrer',
  description: 'Site 5 pages, formulaire, hébergement, éditeur de contenu et agent vocal Léa. 29€/mois.',
}

export default function OrbitePage() {
  return (
    <TierPage
      name="Orbite"
      price={29}
      gradient="from-gray-500 to-gray-600"
      description="L'essentiel pour démarrer votre présence en ligne. Simple, rapide, efficace."
      features={[
        'Site web 5 pages',
        '1 formulaire de contact',
        'Hébergement inclus',
        'Éditeur de contenu visuel',
        'Analytics basique',
        'Agent vocal Léa',
        '5 000 tokens IA / jour',
        '1 utilisateur',
        'Deploy automatique',
        'Support par agent IA',
      ]}
      highlights={[
        'En ligne en quelques heures',
        'Aucune compétence technique requise',
        'Agent vocal disponible 24h/24',
      ]}
    />
  )
}
