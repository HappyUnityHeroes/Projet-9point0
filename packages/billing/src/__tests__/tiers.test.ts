import { describe, it, expect } from 'vitest'
import { TIERS, SERVICES, ADDONS, COSTS } from '../tiers'

describe('TIERS config', () => {
  it('should have 4 tiers', () => {
    expect(Object.keys(TIERS)).toHaveLength(4)
  })

  it('should have correct prices', () => {
    expect(TIERS.orbite.price_eur).toBe(29)
    expect(TIERS.ariane.price_eur).toBe(79)
    expect(TIERS.interstellar.price_eur).toBe(199)
    expect(TIERS.multivers.price_eur).toBe(499)
  })

  it('should have increasing token caps', () => {
    expect(TIERS.orbite.tokens_daily).toBeLessThan(TIERS.ariane.tokens_daily)
    expect(TIERS.ariane.tokens_daily).toBeLessThan(TIERS.interstellar.tokens_daily)
    expect(TIERS.interstellar.tokens_daily).toBeLessThan(TIERS.multivers.tokens_daily)
  })

  it('should have correct user limits', () => {
    expect(TIERS.orbite.users).toBe(1)
    expect(TIERS.ariane.users).toBe(1)
    expect(TIERS.interstellar.users).toBe(3)
    expect(TIERS.multivers.users).toBe(-1) // unlimited
  })
})

describe('SERVICES config', () => {
  it('should have consulting at 200€/h', () => {
    expect(SERVICES.consulting.price_eur).toBe(200)
  })

  it('should have compta at 100€/h with 65€ cost', () => {
    expect(SERVICES.compta_check.price_eur).toBe(100)
    expect(SERVICES.compta_check.cost_eur).toBe(65)
  })

  it('should have pack mensuel at 980€', () => {
    expect(SERVICES.pack_mensuel.price_eur).toBe(980)
  })
})

describe('ADDONS config', () => {
  it('should have lancement at 490€ (350€ with sub)', () => {
    expect(ADDONS.lancement.price_eur).toBe(490)
    expect(ADDONS.lancement.price_with_sub).toBe(350)
  })

  it('should have 5 steps', () => {
    expect(ADDONS.lancement.steps).toHaveLength(5)
  })
})

describe('COSTS config', () => {
  it('should have costs for all tiers', () => {
    expect(Object.keys(COSTS)).toHaveLength(4)
  })

  it('should have increasing costs per tier', () => {
    const totalCost = (tier: keyof typeof COSTS) => {
      const c = COSTS[tier]
      return c.hosting + c.ai + c.storage + c.support
    }
    expect(totalCost('orbite')).toBeLessThan(totalCost('ariane'))
    expect(totalCost('ariane')).toBeLessThan(totalCost('interstellar'))
    expect(totalCost('interstellar')).toBeLessThan(totalCost('multivers'))
  })

  it('should have positive margins for all tiers', () => {
    for (const [key, tier] of Object.entries(TIERS)) {
      const cost = COSTS[key as keyof typeof COSTS]
      const totalCost = cost.hosting + cost.ai + cost.storage + cost.support
      expect(tier.price_eur).toBeGreaterThan(totalCost)
    }
  })
})
