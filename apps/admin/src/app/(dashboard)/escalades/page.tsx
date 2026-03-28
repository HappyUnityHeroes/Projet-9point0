import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'

const RESPONSE_TEMPLATES = [
  'Votre demande dépasse le scope de votre forfait actuel. Nous vous recommandons de passer au tier supérieur.',
  'Cette fonctionnalité nécessite une session de consulting. Souhaitez-vous réserver un créneau à 200€/h ?',
  'Notre équipe va étudier votre demande et vous recontacter sous 24h.',
]

export default async function EscaladesPage() {
  const supabase = await createSupabaseServer()

  const { data } = await supabase
    .from('tickets')
    .select('*, users!tickets_user_id_fkey(email, tier)')
    .eq('scope_check', 'out_of_scope')
    .order('created_at', { ascending: false })

  const escalades = (data ?? []) as Record<string, unknown>[]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-red-400">Escalades</h1>
        <p className="text-gray-400">{escalades.length} demande(s) hors scope</p>
      </div>

      {escalades.length === 0 ? (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 text-center text-gray-500">
          Aucune escalade en cours. Bonne nouvelle !
        </div>
      ) : (
        <div className="space-y-4">
          {escalades.map((e) => {
            const user = e.users as Record<string, string> | null
            const brief = e.brief as Record<string, string>
            return (
              <div key={e.id as string} className="bg-gray-900 rounded-xl border border-red-900/50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-100">
                      {brief?.request ?? `Escalade #${(e.id as string).slice(0, 8)}`}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {user?.email} — <span className="capitalize">{user?.tier}</span> — {new Date(e.created_at as string).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-red-900 text-red-300 text-xs rounded-full font-bold">
                    Hors scope
                  </span>
                </div>

                {/* Response templates */}
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-400 font-medium">Réponses rapides :</p>
                  {RESPONSE_TEMPLATES.map((tpl, i) => (
                    <button
                      key={i}
                      className="block w-full text-left p-3 text-sm bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-750 transition"
                    >
                      {tpl}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-600 transition text-sm">
                    Proposer consulting (200€/h)
                  </button>
                  <Link
                    href={`/tickets/${e.id}`}
                    className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg font-medium hover:bg-gray-700 transition text-sm"
                  >
                    Voir le ticket
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
