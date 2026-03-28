import { createClient as supabaseCreateClient } from '@supabase/supabase-js'
import type { Database } from './types'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return supabaseCreateClient<Database>(supabaseUrl, supabaseAnonKey)
}

export function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return supabaseCreateClient<Database>(supabaseUrl, serviceRoleKey)
}
