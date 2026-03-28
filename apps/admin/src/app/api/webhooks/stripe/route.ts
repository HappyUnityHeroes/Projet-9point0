import { NextResponse } from 'next/server'
import { getStripe } from '@9point0/billing'
import { getServiceClient } from '@/lib/supabase-service'

export async function POST(request: Request) {
  const supabase = getServiceClient()
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      // Update user with Stripe customer ID and subscription
      if (session.customer_email) {
        await supabase
          .from('users')
          .update({
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            subscription_status: 'active',
          })
          .eq('email', session.customer_email)
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object
      const status = subscription.status === 'active' ? 'active'
        : subscription.status === 'past_due' ? 'past_due'
        : 'canceled'
      await supabase
        .from('users')
        .update({ subscription_status: status })
        .eq('stripe_subscription_id', subscription.id)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object
      await supabase
        .from('users')
        .update({ subscription_status: 'canceled' })
        .eq('stripe_subscription_id', subscription.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
