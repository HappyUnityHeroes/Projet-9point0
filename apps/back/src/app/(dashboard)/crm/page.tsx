import { createSupabaseServer } from '@/lib/supabase-server'

const STATUS_COLORS: Record<string, string> = {
  lead: 'bg-blue-100 text-blue-700',
  prospect: 'bg-yellow-100 text-yellow-700',
  client: 'bg-green-100 text-green-700',
  perdu: 'bg-red-100 text-red-700',
}

export default async function CrmPage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  let contacts: Record<string, unknown>[] = []
  if (user) {
    const { data: projects } = await supabase
      .from('projects')
      .select('id')
      .eq('user_id', user.id)

    if (projects && projects.length > 0) {
      const projectIds = projects.map((p: Record<string, unknown>) => p.id as string)
      const { data } = await supabase
        .from('contacts')
        .select('*')
        .in('project_id', projectIds)
        .order('created_at', { ascending: false })
      contacts = (data ?? []) as Record<string, unknown>[]
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CRM — Contacts</h1>
          <p className="text-gray-600">{contacts.length} contact(s)</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
          + Ajouter un contact
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Nom</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Email</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Téléphone</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Statut</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Score IA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Aucun contact. Importez vos contacts ou laissez Sofia vous aider.
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr key={c.id as string} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name as string}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{c.email as string}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{(c.phone as string) ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${STATUS_COLORS[c.status as string] ?? 'bg-gray-100'}`}>
                      {c.status as string}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {c.score_ia != null ? `${c.score_ia}/100` : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
