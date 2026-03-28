import { AgentsSection } from '@/components/agents-section'
import { Footer } from '@/components/footer'

export const metadata = {
  title: '9.0 — Nos Agents IA : Léa, Sofia, Marc',
  description: '3 agents IA disponibles 24h/24 par la voix pour construire votre site, gérer votre CRM et lancer votre entreprise.',
}

export default function AgentsPage() {
  return (
    <main className="bg-black text-white">
      <section className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Nos agents IA
        </h1>
        <p className="text-xl text-gray-400 max-w-xl mx-auto">
          3 experts disponibles 24h/24 par la voix.
          Ils comprennent vos besoins et agissent.
        </p>
      </section>

      <AgentsSection />

      <section className="py-24 px-4 bg-gray-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Comment ça fonctionne ?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-xl bg-gray-900 border border-white/10">
              <p className="text-2xl mb-3">🎙️</p>
              <h3 className="font-bold text-white mb-2">1. Parlez</h3>
              <p className="text-sm text-gray-400">Ouvrez une session vocale avec votre agent. Décrivez votre besoin naturellement.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-900 border border-white/10">
              <p className="text-2xl mb-3">🧠</p>
              <h3 className="font-bold text-white mb-2">2. L&apos;IA comprend</h3>
              <p className="text-sm text-gray-400">L&apos;agent pose les bonnes questions, structure votre demande et génère un ticket.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-900 border border-white/10">
              <p className="text-2xl mb-3">⚡</p>
              <h3 className="font-bold text-white mb-2">3. Action</h3>
              <p className="text-sm text-gray-400">Claude Code construit, teste et déploie. Votre agent vous présente le résultat.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
