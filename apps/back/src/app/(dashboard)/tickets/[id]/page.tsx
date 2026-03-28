import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  review: 'bg-purple-100 text-purple-700',
  done: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServer()
  const { data } = await supabase
    .from('tickets')
    .select('*')
    .eq('id', params.id)
    .single()

  const ticket = data as Record<string, unknown> | null

  if (!ticket) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900">Ticket introuvable</h1>
        <Link href="/tickets" className="text-blue-600 mt-4 inline-block">Retour aux tickets</Link>
      </div>
    )
  }

  const brief = ticket.brief as Record<string, unknown>

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href="/tickets" className="text-sm text-gray-500 hover:text-gray-700">&larr; Tous les tickets</Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {(brief?.request as string) ?? `Ticket #${(ticket.id as string).slice(0, 8)}`}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Créé le {new Date(ticket.created_at as string).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[ticket.status as string] ?? 'bg-gray-100'}`}>
          {ticket.status as string}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Type</p>
          <p className="font-medium text-gray-900 capitalize">{ticket.type as string}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Créé par</p>
          <p className="font-medium text-gray-900 capitalize">{ticket.created_by as string}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Scope</p>
          <p className={`font-medium ${ticket.scope_check === 'in_scope' ? 'text-green-600' : 'text-red-600'}`}>
            {ticket.scope_check === 'in_scope' ? 'Dans le scope' : 'Hors scope'}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Projet</p>
          <p className="font-medium text-gray-900 text-xs">{ticket.project_id as string}</p>
        </div>
      </div>

      {brief && Object.keys(brief).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-3">Brief</h2>
          <pre className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4 overflow-auto">
            {JSON.stringify(brief, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
