'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Parlez à votre agent',
    description: 'Décrivez votre besoin par la voix. Léa, Sofia ou Marc vous guide avec des questions structurées.',
    icon: '🎙️',
  },
  {
    number: '02',
    title: 'L\'IA construit',
    description: 'Claude Code analyse votre brief et scaffold votre projet React. Tests automatiques inclus.',
    icon: '⚡',
  },
  {
    number: '03',
    title: 'Preview & validation',
    description: 'Votre site est déployé en preview. Vérifiez, ajustez, validez. Tout est sous contrôle.',
    icon: '👁️',
  },
  {
    number: '04',
    title: 'En production',
    description: 'Un clic et c\'est live. Votre agent vous présente le résultat et vous accompagne.',
    icon: '🚀',
  },
]

export function WorkflowSteps() {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Comment ça marche
        </h2>

        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex items-start gap-8 py-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {/* Line connector */}
              {i < STEPS.length - 1 && (
                <div className="absolute left-6 top-20 w-px h-full bg-gradient-to-b from-white/20 to-transparent" />
              )}

              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-lg">
                {step.icon}
              </div>

              <div>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                  Étape {step.number}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{step.title}</h3>
                <p className="text-gray-400 mt-2 max-w-lg">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
