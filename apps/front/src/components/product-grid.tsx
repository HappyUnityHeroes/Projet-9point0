'use client'

import { motion } from 'framer-motion'

const PRODUCTS = [
  {
    title: 'Site Web 9.0',
    description: 'Un site React performant, construit par l\'IA à partir de votre brief vocal. Design sur-mesure, SEO optimisé, déployé en heures.',
    gradient: 'from-blue-600 to-cyan-500',
    features: ['Design personnalisé', 'Éditeur de contenu', 'Hébergement inclus', 'SEO optimisé'],
  },
  {
    title: 'CRM 9.0',
    description: 'Gérez vos contacts, votre pipeline et vos ventes avec un CRM intelligent propulsé par l\'IA. Scoring automatique, kanban, analytics.',
    gradient: 'from-purple-600 to-pink-500',
    features: ['Pipeline kanban', 'Scoring IA', 'Import CSV', 'Analytics avancés'],
  },
  {
    title: 'Lancement 9.0',
    description: 'Créez votre entreprise de A à Z avec Marc, votre conseiller IA. Statut juridique, business plan, identité, formalités, pitch.',
    gradient: 'from-amber-500 to-orange-600',
    features: ['Choix du statut', 'Business plan IA', 'Identité de marque', 'Pitch investisseur'],
  },
]

export function ProductGrid() {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Tout ce qu&apos;il vous faut pour{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            réussir en ligne
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.title}
              className="relative group rounded-2xl border border-white/10 bg-gray-900/50 p-8 hover:border-white/20 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${product.gradient} flex items-center justify-center text-white font-bold text-lg mb-6`}>
                9.0
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{product.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{product.description}</p>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
