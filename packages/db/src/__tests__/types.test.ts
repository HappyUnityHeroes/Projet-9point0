import { describe, it, expect } from 'vitest'
import type { Tier, ProjectStatus, TicketStatus, ContactStatus } from '../types'

describe('Database types', () => {
  it('Tier type should accept valid values', () => {
    const tiers: Tier[] = ['orbite', 'ariane', 'interstellar', 'multivers']
    expect(tiers).toHaveLength(4)
  })

  it('ProjectStatus should accept valid values', () => {
    const statuses: ProjectStatus[] = ['building', 'review', 'live', 'paused']
    expect(statuses).toHaveLength(4)
  })

  it('TicketStatus should accept valid values', () => {
    const statuses: TicketStatus[] = ['open', 'in_progress', 'review', 'done', 'rejected']
    expect(statuses).toHaveLength(5)
  })

  it('ContactStatus should accept valid values', () => {
    const statuses: ContactStatus[] = ['lead', 'prospect', 'client', 'perdu']
    expect(statuses).toHaveLength(4)
  })
})
