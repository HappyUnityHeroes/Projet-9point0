import { createSupabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const supabase = await createSupabaseServer()

  // Update ticket status to rejected
  const { error } = await supabase
    .from('tickets')
    .update({ status: 'rejected' })
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // In production: notify client via agent + email (Resend)

  return NextResponse.redirect(new URL('/tickets', request.url))
}
