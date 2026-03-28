import { createClient as supabaseCreateClient } from '@supabase/supabase-js'
import type { Tier } from '@9point0/db'

const DAILY_CAPS: Record<Tier, number> = {
  orbite: 5_000,
  ariane: 15_000,
  interstellar: 30_000,
  multivers: 50_000,
}

function getServiceClient() {
  return supabaseCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

export async function trackUsage(userId: string, tokensUsed: number, tier: Tier) {
  const supabase = getServiceClient()
  const today = new Date().toISOString().split('T')[0]

  const { data: existing } = await supabase
    .from('ai_usage')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .single()

  if (existing) {
    await supabase
      .from('ai_usage')
      .update({
        tokens_used: (existing as Record<string, number>).tokens_used + tokensUsed,
        cost_eur: ((existing as Record<string, number>).tokens_used + tokensUsed) * 0.003 / 1000,
      })
      .eq('id', (existing as Record<string, string>).id)
  } else {
    await supabase.from('ai_usage').insert({
      user_id: userId,
      date: today,
      tokens_used: tokensUsed,
      tokens_cap: DAILY_CAPS[tier],
      cost_eur: tokensUsed * 0.003 / 1000,
    })
  }
}

export async function checkCap(userId: string, tier: Tier): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = getServiceClient()
  const today = new Date().toISOString().split('T')[0]
  const cap = DAILY_CAPS[tier]

  const { data } = await supabase
    .from('ai_usage')
    .select('tokens_used')
    .eq('user_id', userId)
    .eq('date', today)
    .single()

  const used = (data as Record<string, number> | null)?.tokens_used ?? 0
  return { allowed: used < cap, remaining: cap - used }
}
