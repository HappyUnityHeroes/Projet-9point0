import { createSupabaseServer } from '@/lib/supabase-server'

export default async function DashboardPage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  const tier = (profile as Record<string, string> | null)?.tier ?? 'orbite'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bienvenue sur votre espace 9.0</p>
      </div>

      {/* Agent CTA */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-semibold">
          {tier === 'interstellar' || tier === 'multivers'
            ? 'Parlez à Sofia, votre experte CRM'
            : 'Parlez à Léa, votre spécialiste web'}
        </h2>
        <p className="mt-1 text-blue-100">
          Décrivez votre besoin à voix haute, on s&apos;occupe du reste.
        </p>
        <a
          href="/agent"
          className="inline-block mt-4 px-6 py-2 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition"
        >
          Lancer une session
        </a>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Visiteurs', value: '—', sub: 'ce mois' },
          { label: 'Leads', value: '—', sub: 'ce mois' },
          { label: 'Contacts', value: '—', sub: 'total' },
          { label: 'Conversion', value: '—', sub: 'taux' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tickets récents</h3>
        <p className="text-gray-500 text-sm">Aucun ticket pour le moment.</p>
      </div>
    </div>
  )
}
