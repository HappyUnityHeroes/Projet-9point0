import { createSupabaseServer } from '@/lib/supabase-server'

const STAGES = [
  { id: 'lead', label: 'Leads', color: 'border-blue-300 bg-blue-50' },
  { id: 'prospect', label: 'Prospects', color: 'border-yellow-300 bg-yellow-50' },
  { id: 'client', label: 'Clients', color: 'border-green-300 bg-green-50' },
  { id: 'perdu', label: 'Perdus', color: 'border-red-300 bg-red-50' },
]

export default async function PipelinePage() {
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
      contacts = (data ?? []) as Record<string, unknown>[]
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
        <p className="text-gray-600">Vue kanban de vos contacts</p>
      </div>

      <div className="grid grid-cols-4 gap-4 min-h-[500px]">
        {STAGES.map((stage) => {
          const stageContacts = contacts.filter((c) => c.status === stage.id)
          return (
            <div key={stage.id} className={`rounded-xl border-2 ${stage.color} p-4`}>
              <h3 className="font-semibold text-gray-900 mb-1">{stage.label}</h3>
              <p className="text-xs text-gray-500 mb-4">{stageContacts.length} contact(s)</p>

              <div className="space-y-3">
                {stageContacts.map((c) => (
                  <div key={c.id as string} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                    <p className="font-medium text-gray-900 text-sm">{c.name as string}</p>
                    <p className="text-xs text-gray-500">{c.email as string}</p>
                    {c.score_ia != null && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${c.score_ia}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{c.score_ia as number}</span>
                      </div>
                    )}
                  </div>
                ))}
                {stageContacts.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">Aucun contact</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
