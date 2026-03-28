'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '□' },
  { href: '/clients', label: 'Clients', icon: '◉' },
  { href: '/tickets', label: 'Tickets', icon: '▣' },
  { href: '/revenus', label: 'Revenus', icon: '◈' },
  { href: '/escalades', label: 'Escalades', icon: '⚠' },
  { href: '/agents', label: 'Agents IA', icon: '◎' },
]

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          9.0 Admin
        </h1>
        <p className="text-xs text-gray-500 mt-1">{email}</p>
        <span className="inline-block mt-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-red-900 text-red-300">
          Opérateur
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                active
                  ? 'bg-gray-800 text-white font-medium'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
