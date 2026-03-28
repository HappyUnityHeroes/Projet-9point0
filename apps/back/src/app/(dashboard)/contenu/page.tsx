import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function ContenuPage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  let pages: { id: string; title: string; status: string }[] = []
  if (user) {
    const { data: projects } = await supabase
      .from('projects')
      .select('id, config')
      .eq('user_id', user.id)
      .eq('type', 'site')
      .limit(1)
      .single()

    if (projects) {
      const config = projects.config as Record<string, unknown>
      const pageList = (config.pages as string[]) ?? ['accueil', 'services', 'contact']
      pages = pageList.map((p, i) => ({
        id: `${projects.id}-page-${i}`,
        title: p.charAt(0).toUpperCase() + p.slice(1),
        status: 'published',
      }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contenu</h1>
          <p className="text-gray-600">Gérez les pages de votre site</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        {pages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Aucune page pour le moment. Parlez à Léa pour créer votre site.
          </div>
        ) : (
          pages.map((page) => (
            <Link
              key={page.id}
              href={`/contenu/${page.id}`}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <div>
                <h3 className="font-medium text-gray-900">{page.title}</h3>
                <p className="text-sm text-gray-500">Page du site</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
                  {page.status}
                </span>
                <span className="text-gray-400">&rarr;</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
