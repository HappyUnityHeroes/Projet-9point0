import { createSupabaseServer } from '@/lib/supabase-server'
import { TIERS, COSTS } from '@9point0/billing'

export default async function RevenusPage() {
  const supabase = await createSupabaseServer()

  // Count clients per tier
  const tierCounts: Record<string, number> = { orbite: 0, ariane: 0, interstellar: 0, multivers: 0 }
  const { data: users } = await supabase.from('users').select('tier').eq('subscription_status', 'active')
  for (const u of (users ?? []) as Record<string, string>[]) {
    if (tierCounts[u.tier] !== undefined) tierCounts[u.tier]++
  }

  // Calculate MRR
  const mrr = Object.entries(tierCounts).reduce((sum, [tier, count]) => {
    return sum + (TIERS[tier as keyof typeof TIERS]?.price_eur ?? 0) * count
  }, 0)

  // Calculate costs
  const totalCosts = Object.entries(tierCounts).reduce((sum, [tier, count]) => {
    const c = COSTS[tier as keyof typeof COSTS]
    return sum + (c ? (c.hosting + c.ai + c.storage + c.support) * count : 0)
  }, 0)

  const margin = mrr - totalCosts
  const marginPct = mrr > 0 ? Math.round((margin / mrr) * 100) : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Revenus</h1>
        <p className="text-gray-400">Vue financière de la plateforme</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <p className="text-sm text-gray-500">MRR</p>
          <p className="text-3xl font-black text-gray-100 mt-1">{mrr}€</p>
          <p className="text-xs text-gray-600">revenus mensuels récurrents</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <p className="text-sm text-gray-500">Coûts variables</p>
          <p className="text-3xl font-black text-red-400 mt-1">{totalCosts}€</p>
          <p className="text-xs text-gray-600">/mois estimés</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <p className="text-sm text-gray-500">Marge nette</p>
          <p className="text-3xl font-black text-green-400 mt-1">{margin}€</p>
          <p className="text-xs text-gray-600">{marginPct}% de marge</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <p className="text-sm text-gray-500">Clients actifs</p>
          <p className="text-3xl font-black text-gray-100 mt-1">{Object.values(tierCounts).reduce((a, b) => a + b, 0)}</p>
          <p className="text-xs text-gray-600">total</p>
        </div>
      </div>

      {/* Breakdown per tier */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="font-semibold text-gray-100 mb-4">Détail par tier</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-2 text-sm text-gray-500">Tier</th>
              <th className="text-right py-2 text-sm text-gray-500">Prix</th>
              <th className="text-right py-2 text-sm text-gray-500">Clients</th>
              <th className="text-right py-2 text-sm text-gray-500">Revenu</th>
              <th className="text-right py-2 text-sm text-gray-500">Coûts</th>
              <th className="text-right py-2 text-sm text-gray-500">Marge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {Object.entries(TIERS).map(([key, tier]) => {
              const count = tierCounts[key] ?? 0
              const rev = tier.price_eur * count
              const cost = COSTS[key as keyof typeof COSTS]
              const totalCost = cost ? (cost.hosting + cost.ai + cost.storage + cost.support) * count : 0
              return (
                <tr key={key}>
                  <td className="py-3 font-medium text-gray-200 capitalize">{key}</td>
                  <td className="py-3 text-right text-gray-400">{tier.price_eur}€/mois</td>
                  <td className="py-3 text-right text-gray-200">{count}</td>
                  <td className="py-3 text-right text-gray-200">{rev}€</td>
                  <td className="py-3 text-right text-red-400">{totalCost}€</td>
                  <td className="py-3 text-right text-green-400">{rev - totalCost}€</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Projection */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="font-semibold text-gray-100 mb-4">Projection</h2>
        <p className="text-sm text-gray-400 mb-4">Simulation si +10 clients par tier</p>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(TIERS).map(([key, tier]) => {
            const simCount = (tierCounts[key] ?? 0) + 10
            const simRev = tier.price_eur * simCount
            return (
              <div key={key} className="bg-gray-800 rounded-lg p-4 text-center">
                <p className="text-xs text-gray-500 capitalize">{key}</p>
                <p className="text-lg font-bold text-gray-200">{simRev}€</p>
                <p className="text-xs text-gray-500">{simCount} clients</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
