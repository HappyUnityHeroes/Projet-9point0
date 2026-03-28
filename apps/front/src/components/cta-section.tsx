'use client'

import { motion } from 'framer-motion'

export function CtaSection() {
  return (
    <section className="py-32 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl font-black text-white mb-6">
          Prêt à passer en{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            9.0
          </span>{' '}
          ?
        </h2>
        <p className="text-xl text-gray-400 mb-10">
          Rejoignez les entrepreneurs qui construisent leur présence en ligne
          avec l&apos;IA. Sans code, sans attendre, sans stress.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#pricing"
            className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition shadow-lg shadow-white/10"
          >
            Choisir mon offre
          </a>
          <a
            href="/agents"
            className="px-10 py-4 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition"
          >
            Parler à un agent
          </a>
        </div>
      </motion.div>
    </section>
  )
}
