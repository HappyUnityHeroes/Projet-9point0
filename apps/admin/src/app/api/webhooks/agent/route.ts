import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase-service'

export async function POST(request: Request) {
  const supabase = getServiceClient()
  const body = await request.json()
  const { event, ticket, client_id } = body

  switch (event) {
    case 'scope_exceeded': {
      if (ticket) {
        await supabase.from('tickets').insert({
          ...ticket,
          scope_check: 'out_of_scope',
          created_by: 'agent_ia',
        })
      }

      if (process.env.SLACK_WEBHOOK_URL) {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `Escalade : demande hors scope de ${client_id}. Ticket créé.`,
          }),
        })
      }
      break
    }

    case 'ticket_created': {
      if (ticket) {
        await supabase.from('tickets').insert({
          ...ticket,
          created_by: 'agent_ia',
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
