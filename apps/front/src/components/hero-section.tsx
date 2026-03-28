'use client'

import { motion } from 'framer-motion'

const AGENT_PILLS = [
  { name: 'Léa', role: 'Design & Web', color: 'from-pink-500 to-rose-500' },
  { name: 'Sofia', role: 'CRM & Clients', color: 'from-blue-500 to-cyan-500' },
  { name: 'Marc', role: 'Création & TPE', color: 'from-amber-500 to-orange-500' },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[12rem] font-black leading-none tracking-tighter bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            9.0
          </h1>
        </motion.div>

        <motion.p
          className="text-2xl text-gray-300 max-w-2xl mx-auto mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Votre site web & CRM propulsé par l&apos;IA.
          <br />
          <span className="text-gray-500">De la parole au deploy.</span>
        </motion.p>

        {/* Agent pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {AGENT_PILLS.map((agent) => (
            <span
              key={agent.name}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${agent.color} bg-opacity-10 border border-white/10 text-sm text-white`}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {agent.name} — {agent.role}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <a
            href="#pricing"
            className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition shadow-lg shadow-white/10"
          >
            Voir les offres
          </a>
          <a
            href="/agents"
            className="px-8 py-4 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition"
          >
            Découvrir nos agents
          </a>
        </motion.div>
      </div>
    </section>
  )
}
