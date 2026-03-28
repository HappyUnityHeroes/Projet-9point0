import { createSupabaseServer } from '@/lib/supabase-server'

export default async function SettingsPage() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  const p = profile as Record<string, string> | null

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600">Gérez votre profil et votre abonnement</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Profil</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="text-gray-900">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Forfait actuel</label>
            <p className="text-gray-900 capitalize font-semibold">{p?.tier ?? 'orbite'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Statut abonnement</label>
            <p className="text-gray-900 capitalize">{p?.subscription_status ?? 'active'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Abonnement</h2>
        <p className="text-sm text-gray-600">
          Gérez votre facturation et changez de forfait via le portail Stripe.
        </p>
        <a
          href="/api/billing/portal"
          className="inline-block px-6 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Gérer mon abonnement
        </a>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-red-600">Déconnexion</h2>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="px-6 py-2 border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </div>
  )
}
