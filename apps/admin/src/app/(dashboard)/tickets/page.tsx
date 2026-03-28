import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-blue-900 text-blue-300',
  in_progress: 'bg-yellow-900 text-yellow-300',
  review: 'bg-purple-900 text-purple-300',
  done: 'bg-green-900 text-green-300',
  rejected: 'bg-red-900 text-red-300',
}

export default async function AdminTicketsPage() {
  const supabase = await createSupabaseServer()

  const { data } = await supabase
    .from('tickets')
    .select('*, users!tickets_user_id_fkey(email, tier)')
    .order('created_at', { ascending: false })

  const tickets = (data ?? []) as Record<string, unknown>[]

  // Separate: validation required (interstellar+) on top
  const needsValidation = tickets.filter((t) => {
    const user = t.users as Record<string, string> | null
    const tier = user?.tier
    return (tier === 'interstellar' || tier === 'multivers') && t.status === 'review'
  })
  const others = tickets.filter((t) => !needsValidation.includes(t))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Tickets</h1>
        <p className="text-gray-400">{tickets.length} ticket(s) total</p>
      </div>

      {/* Validation queue */}
      {needsValidation.length > 0 && (
        <div className="bg-purple-950/30 rounded-xl border border-purple-800 p-6">
          <h2 className="font-semibold text-purple-300 mb-4">
            Validation requise ({needsValidation.length})
          </h2>
          <div className="space-y-3">
            {needsValidation.map((t) => {
              const user = t.users as Record<string, string> | null
              return (
                <Link
                  key={t.id as string}
                  href={`/tickets/${t.id}`}
                  className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-purple-700 transition"
                >
                  <div>
                    <p className="font-medium text-gray-200">
                      {((t.brief as Record<string, string>)?.request) ?? `#${(t.id as string).slice(0, 8)}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email} — <span className="capitalize">{user?.tier}</span>
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-purple-800 text-purple-200 text-xs rounded-full font-bold">
                    Validation requise
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* All tickets */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 divide-y divide-gray-800">
        {others.length === 0 && needsValidation.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Aucun ticket</div>
        ) : (
          others.map((t) => {
            const user = t.users as Record<string, string> | null
            const tier = user?.tier ?? ''
            const autoDeployable = tier === 'orbite' || tier === 'ariane'
            return (
              <Link
                key={t.id as string}
                href={`/tickets/${t.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-800/50 transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-gray-200">
                      {((t.brief as Record<string, string>)?.request) ?? `#${(t.id as string).slice(0, 8)}`}
                    </p>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${STATUS_COLORS[t.status as string] ?? 'bg-gray-700'}`}>
                      {t.status as string}
                    </span>
                    {autoDeployable && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-green-900 text-green-300">
                        Auto-deploy
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {user?.email} — <span className="capitalize">{tier}</span> — {new Date(t.created_at as string).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <span className="text-gray-600">&rarr;</span>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
