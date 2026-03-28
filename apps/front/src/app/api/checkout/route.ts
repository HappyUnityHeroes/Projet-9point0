import { createCheckoutSession } from '@9point0/billing'
import { TIERS } from '@9point0/billing'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const tier = formData.get('tier') as string
  const email = formData.get('email') as string | null

  const tierConfig = TIERS[tier as keyof typeof TIERS]
  if (!tierConfig) {
    return NextResponse.json({ error: 'Tier invalide' }, { status: 400 })
  }

  if (!tierConfig.stripe_price_id) {
    // Stripe not configured yet — redirect to a placeholder
    return NextResponse.redirect(new URL(`/${tier}?checkout=pending`, request.url))
  }

  const origin = new URL(request.url).origin
  const session = await createCheckoutSession(
    tierConfig.stripe_price_id,
    email ?? '',
    `${origin}/?success=true&tier=${tier}`,
    `${origin}/?canceled=true`,
  )

  return NextResponse.redirect(session.url!)
}
