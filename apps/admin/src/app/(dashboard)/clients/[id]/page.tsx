import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServer()

  const { data: user } = await supabase.from('users').select('*').eq('id', params.id).single()
  const { data: projects } = await supabase.from('projects').select('*').eq('user_id', params.id)
  const { data: tickets } = await supabase.from('tickets').select('*').eq('user_id', params.id).order('created_at', { ascending: false })
  const { data: usage } = await supabase.from('ai_usage').select('*').eq('user_id', params.id).order('date', { ascending: false }).limit(7)

  const u = user as Record<string, unknown> | null
  const proj = (projects ?? []) as Record<string, unknown>[]
  const tix = (tickets ?? []) as Record<string, unknown>[]
  const usg = (usage ?? []) as Record<string, unknown>[]

  if (!u) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-100">Client introuvable</h1>
        <Link href="/clients" className="text-blue-400 mt-4 inline-block">Retour</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Link href="/clients" className="text-sm text-gray-500 hover:text-gray-300">&larr; Tous les clients</Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">{u.email as string}</h1>
          <p className="text-gray-500">ID : {u.id as string}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-bold capitalize bg-purple-700 text-purple-100">
          {u.tier as string}
        </span>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-500">Abonnement</p>
          <p className="font-semibold text-gray-100 capitalize">{u.subscription_status as string}</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-500">Projets</p>
          <p className="font-semibold text-gray-100">{proj.length}</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-500">Tickets</p>
          <p className="font-semibold text-gray-100">{tix.length}</p>
        </div>
      </div>

      {/* Projects */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="font-semibold text-gray-100 mb-4">Projets</h2>
        {proj.length === 0 ? (
          <p className="text-sm text-gray-500">Aucun projet</p>
        ) : (
          <div className="space-y-3">
            {proj.map((p) => (
              <div key={p.id as string} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-200 capitalize">{p.type as string}</span>
                  <span className="ml-3 text-xs text-gray-500">{p.status as string}</span>
                </div>
                {Boolean(p.deployed_url) && (
                  <a href={p.deployed_url as string} target="_blank" className="text-xs text-blue-400">Voir le site</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent tickets */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="font-semibold text-gray-100 mb-4">Tickets récents</h2>
        {tix.length === 0 ? (
          <p className="text-sm text-gray-500">Aucun ticket</p>
        ) : (
          <div className="space-y-2">
            {tix.slice(0, 5).map((t) => (
              <Link
                key={t.id as string}
                href={`/tickets/${t.id}`}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition"
              >
                <span className="text-sm text-gray-200">
                  {((t.brief as Record<string, string>)?.request) ?? `#${(t.id as string).slice(0, 8)}`}
                </span>
                <span className="text-xs text-gray-500 capitalize">{t.status as string}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* AI Usage */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="font-semibold text-gray-100 mb-4">Usage IA (7 derniers jours)</h2>
        {usg.length === 0 ? (
          <p className="text-sm text-gray-500">Aucune donnée</p>
        ) : (
          <div className="space-y-2">
            {usg.map((row) => (
              <div key={row.id as string} className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{row.date as string}</span>
                <span className="text-gray-200">{row.tokens_used as number} / {row.tokens_cap as number} tokens</span>
                <span className="text-gray-500">{row.cost_eur as number}€</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
