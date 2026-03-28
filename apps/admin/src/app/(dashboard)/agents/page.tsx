import { createSupabaseServer } from '@/lib/supabase-server'

const AGENT_INFO = [
  { key: 'lea', name: 'Léa', role: 'Site Web & Design', gradient: 'from-pink-600 to-rose-700' },
  { key: 'sofia', name: 'Sofia', role: 'CRM & Relation client', gradient: 'from-blue-600 to-cyan-700' },
  { key: 'marc', name: 'Marc', role: 'Création & TPE/PME', gradient: 'from-amber-600 to-orange-700' },
]

export default async function AgentsMonitoringPage() {
  const supabase = await createSupabaseServer()

  // Get today's usage
  const today = new Date().toISOString().split('T')[0]
  const { data: usageData } = await supabase
    .from('ai_usage')
    .select('tokens_used, cost_eur')
    .eq('date', today)

  const totalTokensToday = (usageData ?? []).reduce((sum, r) => sum + ((r as Record<string, number>).tokens_used ?? 0), 0)
  const totalCostToday = (usageData ?? []).reduce((sum, r) => sum + ((r as Record<string, number>).cost_eur ?? 0), 0)

  // Get total tickets by created_by
  const { count: iaTickets } = await supabase
    .from('tickets')
    .select('*', { count: 'exact', head: true })
    .eq('created_by', 'agent_ia')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Monitoring Agents IA</h1>
        <p className="text-gray-400">Marc, Sofia, Léa — vue temps réel</p>
      </div>

      {/* Global stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <p className="text-sm text-gray-500">Tokens aujourd&apos;hui</p>
          <p className="text-3xl font-black text-gray-100 mt-1">{totalTokensToday.toLocaleString()}</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <p className="text-sm text-gray-500">Coût IA aujourd&apos;hui</p>
          <p className="text-3xl font-black text-gray-100 mt-1">{totalCostToday.toFixed(2)}€</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <p className="text-sm text-gray-500">Tickets générés par agents</p>
          <p className="text-3xl font-black text-gray-100 mt-1">{iaTickets ?? 0}</p>
        </div>
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-3 gap-6">
        {AGENT_INFO.map((agent) => (
          <div key={agent.key} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className={`h-24 bg-gradient-to-br ${agent.gradient} flex items-center justify-center`}>
              <span className="text-4xl font-black text-white/80">{agent.name[0]}</span>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-100">{agent.name}</h3>
                <p className="text-sm text-gray-400">{agent.role}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sessions aujourd&apos;hui</span>
                  <span className="text-gray-200">—</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tokens consommés</span>
                  <span className="text-gray-200">—</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tickets générés</span>
                  <span className="text-gray-200">—</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-500">En ligne</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
