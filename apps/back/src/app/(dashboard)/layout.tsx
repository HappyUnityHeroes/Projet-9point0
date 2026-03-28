import { createSupabaseServer } from '@/lib/supabase-server'
import { Sidebar } from '@/components/sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  let tier = 'orbite'
  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('tier')
      .eq('id', user.id)
      .single()
    if (profile) tier = profile.tier
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar tier={tier} userEmail={user?.email ?? ''} />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
