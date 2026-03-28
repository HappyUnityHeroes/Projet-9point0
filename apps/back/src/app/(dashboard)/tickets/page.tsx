import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'

const STATUS_COLORS: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  review: 'bg-purple-100 text-purple-700',
  done: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

const STATUS_LABELS: Record<string, string> = {
  open: 'Ouvert',
  in_progress: 'En cours',
  review: 'En revue',
  done: 'Terminé',
  rejected: 'Refusé',
}

export default async function TicketsPage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  let tickets: Record<string, unknown>[] = []
  if (user) {
    const { data } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    tickets = (data ?? []) as Record<string, unknown>[]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
          <p className="text-gray-600">{tickets.length} ticket(s)</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {tickets.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Aucun ticket. Vos demandes et modifications apparaîtront ici.
          </div>
        ) : (
          tickets.map((ticket) => (
            <Link
              key={ticket.id as string}
              href={`/tickets/${ticket.id}`}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-gray-900">
                    {(ticket.brief as Record<string, string>)?.request ?? `Ticket #${(ticket.id as string).slice(0, 8)}`}
                  </h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${STATUS_COLORS[ticket.status as string] ?? 'bg-gray-100 text-gray-600'}`}>
                    {STATUS_LABELS[ticket.status as string] ?? ticket.status}
                  </span>
                </div>
                <div className="flex gap-4 mt-1 text-sm text-gray-500">
                  <span>Type : {ticket.type as string}</span>
                  <span>Par : {ticket.created_by as string}</span>
                  <span>{new Date(ticket.created_at as string).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
