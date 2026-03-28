'use client'

import { motion } from 'framer-motion'

const AGENTS = [
  {
    name: 'Léa',
    role: 'Spécialiste Site Web & Design',
    tone: 'Créatif, enthousiaste, pédagogue',
    description: 'Léa recueille votre brief, conçoit votre site et vous guide dans l\'éditeur de contenu. Elle génère des tickets structurés pour construire votre site automatiquement.',
    gradient: 'from-pink-500 to-rose-600',
    tiers: 'Orbite, Ariane, Interstellar',
  },
  {
    name: 'Sofia',
    role: 'Experte CRM & Relation Client',
    tone: 'Structuré, analytique, rassurant',
    description: 'Sofia configure votre pipeline, crée des automatisations et vous aide à comprendre vos données clients. Elle guide votre prise en main du CRM.',
    gradient: 'from-blue-500 to-cyan-600',
    tiers: 'Interstellar, Multivers',
  },
  {
    name: 'Marc',
    role: 'Conseiller Création & TPE/PME',
    tone: 'Direct, pragmatique, orienté résultats',
    description: 'Marc vous accompagne dans la création de votre entreprise : statut juridique, business plan, identité, formalités et pitch investisseur.',
    gradient: 'from-amber-500 to-orange-600',
    tiers: 'Add-on Lancement 9.0',
  },
]

export function AgentsSection() {
  return (
    <section className="py-24 px-4 bg-gray-950" id="agents">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Vos agents IA
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-xl mx-auto">
          3 experts disponibles 24h/24 par la voix. Ils comprennent vos besoins et agissent.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.name}
              className="rounded-2xl border border-white/10 bg-gray-900/50 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {/* Avatar placeholder */}
              <div className={`h-48 bg-gradient-to-br ${agent.gradient} flex items-center justify-center`}>
                <span className="text-6xl font-black text-white/80">{agent.name[0]}</span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{agent.role}</p>
                <p className="text-xs text-gray-500 italic mb-4">{agent.tone}</p>
                <p className="text-sm text-gray-300 mb-4">{agent.description}</p>
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400">
                  {agent.tiers}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
