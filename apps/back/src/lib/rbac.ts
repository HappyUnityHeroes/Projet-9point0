import type { Tier } from '@9point0/db'

const TIER_LEVEL: Record<Tier, number> = {
  orbite: 0,
  ariane: 1,
  interstellar: 2,
  multivers: 3,
}

export function checkTierAccess(userTier: Tier, requiredTier: Tier): boolean {
  return TIER_LEVEL[userTier] >= TIER_LEVEL[requiredTier]
}

// Route-based RBAC mapping
const ROUTE_TIER_MAP: Record<string, Tier> = {
  '/contenu/blog': 'ariane',
  '/crm': 'ariane',
  '/crm/pipeline': 'interstellar',
  '/stats': 'ariane',
}

export function getRequiredTierForRoute(pathname: string): Tier | null {
  for (const [route, tier] of Object.entries(ROUTE_TIER_MAP)) {
    if (pathname.startsWith(route)) {
      return tier
    }
  }
  return null
}
