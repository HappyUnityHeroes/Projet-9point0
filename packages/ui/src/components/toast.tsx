'use client'

import * as React from 'react'
import { cn } from '../lib/utils'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

const ToastContext = React.createContext<{
  toast: (message: string, type?: Toast['type']) => void
}>({ toast: () => {} })

export function useToast() {
  return React.useContext(ToastContext)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-bottom-2',
              {
                'bg-green-600 text-white': t.type === 'success',
                'bg-red-600 text-white': t.type === 'error',
                'bg-gray-800 text-white': t.type === 'info',
              }
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
