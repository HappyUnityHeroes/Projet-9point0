'use client'

import { motion } from 'framer-motion'

const PLANS = [
  {
    name: 'Orbite',
    price: 29,
    description: 'L\'essentiel pour démarrer en ligne',
    gradient: 'from-gray-600 to-gray-700',
    features: [
      'Site 5 pages',
      '1 formulaire de contact',
      'Hébergement inclus',
      'Éditeur de contenu',
      'Analytics basique',
      'Agent vocal Léa',
      '5 000 tokens IA / jour',
      '1 utilisateur',
    ],
    cta: 'Commencer',
  },
  {
    name: 'Ariane',
    price: 79,
    description: 'Pour ceux qui veulent grandir',
    gradient: 'from-blue-600 to-blue-700',
    popular: true,
    features: [
      'Pages illimitées',
      'Back-office complet',
      'Blog + génération IA',
      'Analytics avancés',
      'CRM contacts léger',
      'Agent vocal Léa',
      '15 000 tokens IA / jour',
      '1 utilisateur',
    ],
    cta: 'Choisir Ariane',
  },
  {
    name: 'Interstellar',
    price: 199,
    description: 'La puissance commerciale',
    gradient: 'from-purple-600 to-purple-700',
    features: [
      'Tout Ariane +',
      'Pipeline kanban',
      'Intégration Stripe',
      'Analytics avancés',
      'CRM complet',
      'Agents Léa + Sofia',
      '30 000 tokens IA / jour',
      '3 utilisateurs',
    ],
    cta: 'Passer Interstellar',
  },
  {
    name: 'Multivers',
    price: 499,
    description: 'Le CRM IA ultime',
    gradient: 'from-pink-600 to-rose-700',
    features: [
      'Tout Interstellar +',
      'Scoring IA contacts',
      'IA avancée',
      'Utilisateurs illimités',
      'Support prioritaire',
      'Tous les agents',
      '50 000 tokens IA / jour',
      'Validation admin dédiée',
    ],
    cta: 'Passer Multivers',
  },
]

export function PricingBlocks() {
  return (
    <section className="py-24 px-4 bg-gray-950" id="pricing">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Des prix simples, sans surprise
        </h2>
        <p className="text-center text-gray-400 mb-16">
          Tout est inclus. Pas de frais cachés.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.popular
                  ? 'border-blue-500 bg-gray-900'
                  : 'border-white/10 bg-gray-900/50'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                  Populaire
                </span>
              )}

              <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${plan.gradient} text-white text-sm font-bold w-fit mb-4`}>
                {plan.name}
              </div>

              <div className="mb-4">
                <span className="text-5xl font-black text-white">{plan.price}</span>
                <span className="text-gray-400 text-lg">€/mois</span>
              </div>

              <p className="text-sm text-gray-400 mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-400 mt-0.5">&#10003;</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <form action="/api/checkout" method="POST">
                <input type="hidden" name="tier" value={plan.name.toLowerCase()} />
                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-bold transition ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </button>
              </form>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
