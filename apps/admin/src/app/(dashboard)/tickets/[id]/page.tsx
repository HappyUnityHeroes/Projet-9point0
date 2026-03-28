import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function AdminTicketDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServer()
  const { data } = await supabase
    .from('tickets')
    .select('*, users!tickets_user_id_fkey(email, tier)')
    .eq('id', params.id)
    .single()

  const ticket = data as Record<string, unknown> | null

  if (!ticket) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-100">Ticket introuvable</h1>
        <Link href="/tickets" className="text-blue-400 mt-4 inline-block">Retour</Link>
      </div>
    )
  }

  const user = ticket.users as Record<string, string> | null
  const brief = ticket.brief as Record<string, unknown>
  const tier = user?.tier ?? ''
  const needsValidation = (tier === 'interstellar' || tier === 'multivers') && ticket.status === 'review'

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href="/tickets" className="text-sm text-gray-500 hover:text-gray-300">&larr; Tous les tickets</Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">
            {(brief?.request as string) ?? `Ticket #${(ticket.id as string).slice(0, 8)}`}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {user?.email} — <span className="capitalize">{tier}</span> — {new Date(ticket.created_at as string).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-500">Statut</p>
          <p className="font-semibold text-gray-100 capitalize">{ticket.status as string}</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-500">Type</p>
          <p className="font-semibold text-gray-100 capitalize">{ticket.type as string}</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-500">Créé par</p>
          <p className="font-semibold text-gray-100 capitalize">{ticket.created_by as string}</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
          <p className="text-sm text-gray-500">Scope</p>
          <p className={`font-semibold ${ticket.scope_check === 'in_scope' ? 'text-green-400' : 'text-red-400'}`}>
            {ticket.scope_check === 'in_scope' ? 'Dans le scope' : 'Hors scope'}
          </p>
        </div>
      </div>

      {/* Brief */}
      {brief && Object.keys(brief).length > 0 && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="font-semibold text-gray-100 mb-3">Brief</h2>
          <pre className="text-sm text-gray-300 bg-gray-950 rounded-lg p-4 overflow-auto">
            {JSON.stringify(brief, null, 2)}
          </pre>
        </div>
      )}

      {/* Actions */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="font-semibold text-gray-100 mb-4">Actions</h2>
        <div className="flex gap-3">
          {/* Preview button */}
          <button className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg font-medium hover:bg-gray-700 transition">
            Ouvrir preview Vercel
          </button>

          {needsValidation && (
            <>
              <form action={`/api/tickets/${params.id}/validate`} method="POST">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-600 transition"
                >
                  Valider & Déployer
                </button>
              </form>
              <form action={`/api/tickets/${params.id}/reject`} method="POST">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-700 text-white rounded-lg font-medium hover:bg-red-600 transition"
                >
                  Refuser
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
