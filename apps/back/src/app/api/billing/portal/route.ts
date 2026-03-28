import { createSupabaseServer } from '@/lib/supabase-server'
import { createPortalSession } from '@9point0/billing'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  const { data: profile } = await supabase
    .from('users')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  const customerId = (profile as Record<string, string> | null)?.stripe_customer_id
  if (!customerId) {
    return NextResponse.json({ error: 'No Stripe customer found' }, { status: 400 })
  }

  const session = await createPortalSession(customerId, `${new URL(request.url).origin}/settings`)
  return NextResponse.redirect(session.url)
}
