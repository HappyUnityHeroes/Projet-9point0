import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '9.0 — Votre site web & CRM propulsé par l\'IA',
  description: 'Plateforme SaaS quasi-autonome. Site web React + CRM intelligent. De 29€ à 499€/mois.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
