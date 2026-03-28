import { Footer } from '@/components/footer'

export const metadata = {
  title: '9.0 — Lancement 9.0 : Créez votre entreprise avec l\'IA',
  description: 'Statut juridique, business plan, identité, formalités et pitch investisseur. Marc vous accompagne de A à Z.',
}

const STEPS = [
  { icon: '📋', title: 'Choix du statut', desc: 'Marc analyse votre situation et vous recommande le meilleur statut juridique (micro, SAS, SARL...).' },
  { icon: '📊', title: 'Business plan IA', desc: 'Génération d\'un business plan structuré avec prévisionnel financier. Vérification comptable à 100€/h disponible.' },
  { icon: '🎨', title: 'Identité de marque', desc: 'Nom, logo, charte graphique, ton de communication. Tout pour démarrer avec une image pro.' },
  { icon: '📝', title: 'Formalités', desc: 'Checklist administrative complète, documents à préparer, étapes de création pas à pas.' },
  { icon: '🎤', title: 'Pitch investisseur', desc: 'Préparez votre pitch deck et entraînez-vous avec Marc. Feedback et itérations inclus.' },
]

export default function LancementPage() {
  return (
    <main className="bg-black text-white">
      <section className="pt-32 pb-16 px-4 text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
          Add-on
        </span>
        <h1 className="text-5xl font-black text-white mb-4">
          Lancement 9.0
        </h1>
        <p className="text-xl text-gray-400 max-w-xl mx-auto">
          Créez votre entreprise de A à Z avec Marc, votre conseiller IA.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="text-5xl font-black text-white">490€</span>
          <div className="text-left">
            <p className="text-sm text-amber-400 font-semibold">350€ avec un abonnement actif</p>
            <p className="text-xs text-gray-500">Paiement unique</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          5 étapes pour lancer votre activité
        </h2>
        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex gap-6 p-6 rounded-2xl bg-gray-900/50 border border-white/10"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-2xl">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  <span className="text-amber-400 mr-2">0{i + 1}.</span>
                  {step.title}
                </h3>
                <p className="text-gray-400 mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <a
          href="#pricing"
          className="inline-block px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition shadow-lg"
        >
          Démarrer mon lancement
        </a>
      </section>

      <Footer />
    </main>
  )
}
