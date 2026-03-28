import { createSupabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createSupabaseServer()

  const { data, error } = await supabase
    .from('tickets')
    .select('*, users!tickets_user_id_fkey(email, tier)')
    .eq('scope_check', 'out_of_scope')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
