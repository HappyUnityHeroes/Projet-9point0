import { createSupabaseServer } from '@/lib/supabase-server'

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServer()

  // Fetch KPIs
  const { count: totalClients } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })

  const { count: openTickets } = await supabase
    .from('tickets')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'open')

  const { count: escalades } = await supabase
    .from('tickets')
    .select('*', { count: 'exact', head: true })
    .eq('scope_check', 'out_of_scope')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Dashboard Admin</h1>
        <p className="text-gray-400">Vue d&apos;ensemble de la plateforme 9.0</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'MRR', value: '—', sub: 'revenus mensuels' },
          { label: 'Clients actifs', value: String(totalClients ?? 0), sub: 'total' },
          { label: 'Tickets ouverts', value: String(openTickets ?? 0), sub: 'en attente' },
          { label: 'Escalades', value: String(escalades ?? 0), sub: 'hors-scope' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-sm text-gray-500">{kpi.label}</p>
            <p className="text-2xl font-bold text-gray-100 mt-1">{kpi.value}</p>
            <p className="text-xs text-gray-600">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Tickets Queue */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">File de tickets</h3>
        <p className="text-gray-500 text-sm">Aucun ticket en attente de validation.</p>
      </div>

      {/* Escalation Alerts */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-4">Alertes escalade</h3>
        <p className="text-gray-500 text-sm">Aucune escalade en cours.</p>
      </div>
    </div>
  )
}
