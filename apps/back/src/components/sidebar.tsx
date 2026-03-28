'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '□', minTier: 'orbite' },
  { href: '/contenu', label: 'Contenu', icon: '✎', minTier: 'orbite' },
  { href: '/contenu/blog', label: 'Blog IA', icon: '⚡', minTier: 'ariane' },
  { href: '/stats', label: 'Analytics', icon: '◈', minTier: 'ariane' },
  { href: '/crm', label: 'CRM', icon: '◉', minTier: 'ariane' },
  { href: '/crm/pipeline', label: 'Pipeline', icon: '▥', minTier: 'interstellar' },
  { href: '/tickets', label: 'Tickets', icon: '▣', minTier: 'orbite' },
  { href: '/agent', label: 'Agent vocal', icon: '◎', minTier: 'orbite' },
  { href: '/settings', label: 'Paramètres', icon: '⚙', minTier: 'orbite' },
]

const TIER_LEVEL: Record<string, number> = {
  orbite: 0,
  ariane: 1,
  interstellar: 2,
  multivers: 3,
}

export function Sidebar({ tier, userEmail }: { tier: string; userEmail: string }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          9.0
        </h1>
        <p className="text-xs text-gray-500 mt-1">{userEmail}</p>
        <span className="inline-block mt-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 capitalize">
          {tier}
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const accessible = TIER_LEVEL[tier] >= TIER_LEVEL[item.minTier]
          const active = pathname === item.href || pathname.startsWith(item.href + '/')

          if (!accessible) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 cursor-not-allowed"
                title={`Disponible à partir du tier ${item.minTier}`}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
                <span className="ml-auto text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">
                  {item.minTier}
                </span>
              </div>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                active
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
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
