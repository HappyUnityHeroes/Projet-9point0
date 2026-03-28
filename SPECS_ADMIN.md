# ADMIN — Specs back office opérateur

## Routes Next.js (apps/admin)
- /dashboard → KPIs globaux + alertes
- /clients → liste tous les clients + filtres tier/status
- /clients/[id] → fiche client détaillée
- /tickets → file de validation (Interstellar+)
- /tickets/[id] → détail + actions (valider / refuser / preview)
- /revenus → MRR, marges, consulting, projections
- /escalades → hors-scope détectés par agents IA
- /agents → monitoring Marc / Sofia / Léa

## Composants clés

### Dashboard ADMIN
- KpiRow — MRR, marge nette, consulting facturé, temps/semaine
- TicketsQueue — file prioritaire (validation requise en haut)
- EscaladeAlerts — rouge pour hors-scope
- ClientsTable — vue globale avec statuts Stripe

### File de tickets (ADMIN — cœur du workflow)
- TicketCard — titre, client, tier, aperçu, actions
- PreviewButton → ouvre URL Vercel preview
- ValidateButton → appel API Vercel → merge → deploy prod
- RejectButton → message auto au client via agent
- AutoDeploy badge → Orbite/Ariane passent sans validation

### Revenus (ADMIN)
- MrrChart — évolution mensuelle
- MarginBreakdown — coûts fixes vs variables vs marge
- ConsultingTracker — heures facturées par client
- ProjectionTable — simulation à N clients

### Escalades (ADMIN)
- EscaladeCard — description hors-scope + client + tier
- ResponseTemplates — réponses pré-rédigées par l'agent
- ConvertToConsulting — proposition session 200€/h

## Auth ADMIN
- 2FA obligatoire (TOTP via Supabase Auth)
- IP allowlist recommandée
- Logs d'accès Supabase

## Webhooks entrants ADMIN
- Stripe → /api/webhooks/stripe (checkout, renewal, cancel)
- GitHub → /api/webhooks/github (CI checks, deploy status)
- ElevenLabs → /api/webhooks/elevenlabs (fin de session, transcript)
- Claude Agent → /api/webhooks/agent (scope exceeded, ticket créé)

## Variables d'environnement ADMIN
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
GITHUB_TOKEN=
VERCEL_TOKEN=
VERCEL_TEAM_ID=
ANTHROPIC_API_KEY=
SLACK_WEBHOOK_URL= (alertes escalade)
RESEND_API_KEY=
ADMIN_ALLOWED_EMAILS= (liste emails autorisés)
