import { NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase-service'

export async function POST(request: Request) {
  const supabase = getServiceClient()
  const event = request.headers.get('x-github-event')
  const body = await request.json()

  switch (event) {
    case 'check_suite': {
      const conclusion = body.check_suite?.conclusion
      const branch = body.check_suite?.head_branch
      if (conclusion === 'success' && branch?.startsWith('build/')) {
        const ticketId = branch.replace('build/', '')
        await supabase
          .from('tickets')
          .update({ status: 'review' })
          .eq('id', ticketId)
      }
      break
    }

    case 'deployment_status': {
      // Vercel deploy status — could update project preview_url
      break
    }
  }

  return NextResponse.json({ received: true })
}
