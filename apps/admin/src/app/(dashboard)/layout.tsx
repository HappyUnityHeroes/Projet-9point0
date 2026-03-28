import { createSupabaseServer } from '@/lib/supabase-server'
import { AdminSidebar } from '@/components/sidebar'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex h-screen bg-gray-950">
      <AdminSidebar email={user?.email ?? ''} />
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
