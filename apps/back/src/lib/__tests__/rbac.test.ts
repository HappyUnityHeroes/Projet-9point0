import { describe, it, expect } from 'vitest'
import { checkTierAccess, getRequiredTierForRoute } from '../rbac'

describe('RBAC', () => {
  describe('checkTierAccess', () => {
    it('same tier should have access', () => {
      expect(checkTierAccess('orbite', 'orbite')).toBe(true)
      expect(checkTierAccess('ariane', 'ariane')).toBe(true)
    })

    it('higher tier should have access to lower tier features', () => {
      expect(checkTierAccess('multivers', 'orbite')).toBe(true)
      expect(checkTierAccess('interstellar', 'ariane')).toBe(true)
      expect(checkTierAccess('ariane', 'orbite')).toBe(true)
    })

    it('lower tier should NOT have access to higher tier features', () => {
      expect(checkTierAccess('orbite', 'ariane')).toBe(false)
      expect(checkTierAccess('orbite', 'interstellar')).toBe(false)
      expect(checkTierAccess('ariane', 'interstellar')).toBe(false)
      expect(checkTierAccess('ariane', 'multivers')).toBe(false)
    })
  })

  describe('getRequiredTierForRoute', () => {
    it('blog requires ariane', () => {
      expect(getRequiredTierForRoute('/contenu/blog')).toBe('ariane')
    })

    it('crm requires ariane', () => {
      expect(getRequiredTierForRoute('/crm')).toBe('ariane')
    })

    it('pipeline requires interstellar', () => {
      expect(getRequiredTierForRoute('/crm/pipeline')).toBe('interstellar')
    })

    it('stats requires ariane', () => {
      expect(getRequiredTierForRoute('/stats')).toBe('ariane')
    })

    it('dashboard has no tier requirement', () => {
      expect(getRequiredTierForRoute('/dashboard')).toBeNull()
    })

    it('settings has no tier requirement', () => {
      expect(getRequiredTierForRoute('/settings')).toBeNull()
    })
  })
})
