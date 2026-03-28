# Pricing & caps IA

## Forfaits mensuels
```typescript
export const TIERS = {
  orbite:      { price_eur: 29,  tokens_daily: 5_000,  users: 1, stripe_price_id: '' },
  ariane:      { price_eur: 79,  tokens_daily: 15_000, users: 1, stripe_price_id: '' },
  interstellar:{ price_eur: 199, tokens_daily: 30_000, users: 3, stripe_price_id: '' },
  multivers:   { price_eur: 499, tokens_daily: 50_000, users: -1, stripe_price_id: '' },
} as const
```

## Services humains
```typescript
export const SERVICES = {
  consulting:    { price_eur: 200, unit: 'heure', who: 'operateur' },
  compta_check:  { price_eur: 100, unit: 'heure', who: 'partenaire', cost_eur: 65 },
  pack_mensuel:  { price_eur: 980, unit: 'mois',  who: 'operateur', includes: '4h consulting + 2h compta' },
} as const
```

## Add-on
```typescript
export const ADDONS = {
  lancement: {
    price_eur: 490,
    price_with_sub: 350,
    steps: ['statut', 'bp', 'identite', 'formalites', 'pitch'],
    agent: 'marc',
  }
} as const
```

## Coûts variables estimés par tier (mensuel/client)
```typescript
export const COSTS = {
  orbite:       { hosting: 5,  ai: 2,  storage: 1, support: 2 },
  ariane:       { hosting: 8,  ai: 8,  storage: 2, support: 3 },
  interstellar: { hosting: 15, ai: 20, storage: 5, support: 8 },
  multivers:    { hosting: 30, ai: 50, storage: 15, support: 15 },
} as const
```
