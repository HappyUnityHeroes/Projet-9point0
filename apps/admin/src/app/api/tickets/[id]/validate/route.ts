import { createSupabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createSupabaseServer()

  // Update ticket status to done
  const { error } = await supabase
    .from('tickets')
    .update({ status: 'done' })
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // In production: trigger Vercel deploy via API
  // await fetch(`https://api.vercel.com/v1/deployments`, { ... })

  return NextResponse.redirect(new URL('/tickets', request.url))
}
