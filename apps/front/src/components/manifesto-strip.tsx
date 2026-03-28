'use client'

import { motion } from 'framer-motion'

export function ManifestoStrip() {
  return (
    <section className="py-24 px-4 bg-black border-y border-white/5">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-3xl md:text-5xl font-bold leading-tight text-white">
          Le monde change.
          <br />
          <span className="text-gray-500">Votre présence en ligne aussi.</span>
        </p>
        <p className="mt-8 text-lg text-gray-400 max-w-2xl mx-auto">
          Fini les devis à 5 chiffres et les projets à 6 mois.
          Décrivez votre besoin à voix haute, nos agents IA construisent votre site
          et votre CRM en quelques heures. Pas en semaines.
        </p>
      </motion.div>
    </section>
  )
}
