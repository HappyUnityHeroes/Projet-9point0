'use client'

import { motion } from 'framer-motion'

export function AddonBanner() {
  return (
    <section className="py-24 px-4 bg-gradient-to-r from-amber-950/30 via-orange-950/30 to-amber-950/30 border-y border-amber-500/10">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
          Add-on
        </span>
        <h2 className="text-4xl font-bold text-white mb-4">
          Lancement 9.0
        </h2>
        <p className="text-lg text-gray-400 mb-6 max-w-xl mx-auto">
          Créez votre entreprise de A à Z avec Marc, votre conseiller IA.
          Statut juridique, business plan, identité, formalités et pitch investisseur.
        </p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-5xl font-black text-white">490€</span>
          <div className="text-left">
            <p className="text-sm text-gray-400 line-through">490€ sans abonnement</p>
            <p className="text-sm text-amber-400 font-semibold">350€ avec un abonnement actif</p>
          </div>
        </div>
        <a
          href="/lancement"
          className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition shadow-lg shadow-orange-500/20"
        >
          Découvrir le Lancement 9.0
        </a>
      </motion.div>
    </section>
  )
}
