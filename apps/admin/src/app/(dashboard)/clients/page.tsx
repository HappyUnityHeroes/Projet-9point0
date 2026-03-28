import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'

const TIER_COLORS: Record<string, string> = {
  orbite: 'bg-gray-700 text-gray-200',
  ariane: 'bg-blue-700 text-blue-100',
  interstellar: 'bg-purple-700 text-purple-100',
  multivers: 'bg-pink-700 text-pink-100',
}

const SUB_COLORS: Record<string, string> = {
  active: 'text-green-400',
  past_due: 'text-yellow-400',
  canceled: 'text-red-400',
}

export default async function ClientsPage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  const clients = (data ?? []) as Record<string, unknown>[]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Clients</h1>
        <p className="text-gray-400">{clients.length} client(s) enregistré(s)</p>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-800">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Email</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Tier</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Statut</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Inscription</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {clients.map((c) => (
              <tr key={c.id as string} className="hover:bg-gray-800/50">
                <td className="px-4 py-3 font-medium text-gray-200">{c.email as string}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium capitalize ${TIER_COLORS[c.tier as string] ?? 'bg-gray-700'}`}>
                    {c.tier as string}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-medium capitalize ${SUB_COLORS[c.subscription_status as string] ?? 'text-gray-400'}`}>
                    {c.subscription_status as string}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(c.created_at as string).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/clients/${c.id}`} className="text-blue-400 hover:text-blue-300 text-sm">
                    Voir &rarr;
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
