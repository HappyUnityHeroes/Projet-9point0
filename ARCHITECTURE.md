# Architecture 9.0

## Structure des dossiers

```
projet-9point0/
├── apps/
│   ├── front/          # FRONT — Next.js page de vente publique
│   ├── back/           # BACK — Next.js back office client
│   └── admin/          # ADMIN — Next.js back office opérateur
├── packages/
│   ├── db/             # Schéma Supabase + types générés
│   ├── ai/             # Wrappers Claude API + ElevenLabs
│   ├── billing/        # Stripe helpers
│   └── ui/             # Composants partagés (shadcn/ui)
├── supabase/
│   ├── migrations/     # Migrations SQL
│   └── seed.sql        # Données de test
└── .github/
    └── workflows/      # CI/CD GitHub Actions
```

## Flux principal

```
Client → ElevenLabs (brief vocal)
       → Claude Agent (analyse ticket)
       → Claude Code (build)
       → GitHub PR (preview Vercel)
       → ADMIN validation (Interstellar+)
       → Deploy prod auto
       → ElevenLabs (onboarding vocal)
```

## Base de données — tables principales

### users
- id, email, created_at
- tier: orbite | ariane | interstellar | multivers
- stripe_customer_id, stripe_subscription_id
- subscription_status: active | past_due | canceled

### projects
- id, user_id, type: site | crm
- status: building | review | live | paused
- config: jsonb (pages, features, theme)
- deployed_url, preview_url

### tickets
- id, project_id, user_id
- type: content | feature | bug | scope_exceeded
- status: open | in_progress | review | done | rejected
- created_by: client | agent_ia | system
- scope_check: in_scope | out_of_scope

### contacts (CRM)
- id, project_id, name, email, phone
- status: lead | prospect | client | perdu
- pipeline_stage, score_ia
- notes: jsonb

### ai_usage
- id, user_id, date
- tokens_used, tokens_cap (par tier)
- cost_eur

## RBAC — droits par tier

| Feature             | Orbite | Ariane | Interstellar | Multivers |
|---------------------|--------|--------|--------------|-----------|
| Éditeur contenu     | ✓      | ✓      | ✓            | ✓         |
| Blog + IA           | ✗      | ✓      | ✓            | ✓         |
| Analytics           | basique| ✓      | avancé       | avancé    |
| CRM contacts        | ✗      | léger  | ✓            | ✓         |
| Pipeline kanban     | ✗      | ✗      | ✓            | ✓         |
| Stripe intégré      | ✗      | ✗      | ✓            | ✓         |
| IA scoring          | ✗      | ✗      | ✗            | ✓         |
| Utilisateurs multi  | 1      | 1      | 3            | illimité  |
| Tokens IA / jour    | 5k     | 15k    | 30k          | 50k       |
