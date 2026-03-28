import { createSupabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createSupabaseServer()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:3001'))
}
