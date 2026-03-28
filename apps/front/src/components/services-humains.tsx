'use client'

import { motion } from 'framer-motion'

export function ServicesHumains() {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          L&apos;humain quand il faut
        </h2>
        <p className="text-center text-gray-400 mb-16">
          L&apos;IA fait le gros du travail. L&apos;expert humain valide et affine.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="rounded-2xl border border-white/10 bg-gray-900/50 p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl mb-4">💼</div>
            <h3 className="text-xl font-bold text-white mb-2">Consulting stratégique</h3>
            <p className="text-4xl font-black text-white mb-1">
              200<span className="text-lg text-gray-400">€/h</span>
            </p>
            <p className="text-sm text-gray-400 mb-4">Session avec notre opérateur</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>&#10003; Stratégie digitale personnalisée</li>
              <li>&#10003; Revue de votre pipeline</li>
              <li>&#10003; Optimisation CRM avancée</li>
              <li>&#10003; Plan d&apos;action concret</li>
            </ul>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-white/10 bg-gray-900/50 p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Vérification comptable</h3>
            <p className="text-4xl font-black text-white mb-1">
              100<span className="text-lg text-gray-400">€/h</span>
            </p>
            <p className="text-sm text-gray-400 mb-4">Expert-comptable partenaire</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>&#10003; Validation business plan</li>
              <li>&#10003; Vérification prévisionnel</li>
              <li>&#10003; Conformité fiscale</li>
              <li>&#10003; Recommandations personnalisées</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-2">Pack mensuel</h3>
          <p className="text-4xl font-black text-white mb-2">
            980<span className="text-lg text-gray-400">€/mois</span>
          </p>
          <p className="text-gray-400">4h consulting + 2h comptabilité incluses</p>
        </motion.div>
      </div>
    </section>
  )
}
