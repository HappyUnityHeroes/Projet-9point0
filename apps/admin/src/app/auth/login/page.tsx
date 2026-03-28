'use client'

import { useState } from 'react'
import { createSupabaseBrowser } from '@/lib/supabase-browser'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [totpCode, setTotpCode] = useState('')
  const [step, setStep] = useState<'credentials' | 'totp'>('credentials')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createSupabaseBrowser()

    if (step === 'credentials') {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Check if MFA is required
      const { data: factors } = await supabase.auth.mfa.listFactors()
      if (factors?.totp && factors.totp.length > 0) {
        setStep('totp')
        setLoading(false)
        return
      }

      // No MFA, redirect directly
      window.location.href = '/dashboard'
      return
    }

    // TOTP verification
    const { data: factors } = await supabase.auth.mfa.listFactors()
    const totpFactor = factors?.totp?.[0]

    if (!totpFactor) {
      setError('Aucun facteur TOTP configuré')
      setLoading(false)
      return
    }

    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId: totpFactor.id,
    })

    if (challengeError) {
      setError(challengeError.message)
      setLoading(false)
      return
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId: totpFactor.id,
      challengeId: challenge.id,
      code: totpCode,
    })

    if (verifyError) {
      setError('Code TOTP invalide')
      setLoading(false)
      return
    }

    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-900 rounded-2xl border border-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            9.0 Admin
          </h1>
          <p className="mt-2 text-gray-400">Panel opérateur</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {step === 'credentials' ? (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500"
                  placeholder="admin@9point0.fr"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="totp" className="block text-sm font-medium text-gray-300">
                Code TOTP (2FA)
              </label>
              <input
                id="totp"
                type="text"
                required
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500"
                placeholder="000000"
                maxLength={6}
                autoFocus
              />
              <p className="mt-2 text-xs text-gray-500">
                Entrez le code de votre application d&apos;authentification
              </p>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Connexion...' : step === 'credentials' ? 'Se connecter' : 'Vérifier'}
          </button>
        </form>
      </div>
    </div>
  )
}
