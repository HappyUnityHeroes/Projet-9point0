import * as React from 'react'
import { cn } from '../lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        {
          'bg-gray-700 text-gray-200': variant === 'default',
          'bg-green-900 text-green-300': variant === 'success',
          'bg-yellow-900 text-yellow-300': variant === 'warning',
          'bg-red-900 text-red-300': variant === 'destructive',
        },
        className
      )}
      {...props}
    />
  )
}
