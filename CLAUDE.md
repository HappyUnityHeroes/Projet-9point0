# Projet 9.0 — Instructions pour Claude Code

## Contexte
Plateforme SaaS quasi-autonome spécialisée CRM + Site Web React.
3 niveaux : FRONT (public), BACK (client), ADMIN (opérateur).
Stack : Next.js 14, Supabase, Stripe, ElevenLabs, Vercel.

## Règles absolues
- Ne jamais dépasser le scope défini par tier (RBAC strict)
- Chaque feature doit préciser son niveau : FRONT / BACK / ADMIN
- Les coûts IA sont cappés par tier (voir pricing.config.ts)
- Tout dépassement de scope → escalade vers ADMIN, jamais d'absorption silencieuse
- Tests automatiques obligatoires avant tout deploy

## Stack technique
- Framework : Next.js 14 App Router
- DB : Supabase (PostgreSQL + Auth + Realtime)
- Paiements : Stripe Billing
- IA : Anthropic Claude API
- Voix : ElevenLabs Conversational AI
- Deploy : Vercel (preview auto sur PR, prod sur merge main)
- CI/CD : GitHub Actions
- Email : Resend
- Monitoring : Sentry

## Structure des tiers
- Orbite : 29€/mois — site 5 pages, 1 form, hébergement
- Ariane : 79€/mois — pages illimitées, back-office, blog IA
- Interstellar : 199€/mois — back-office avancé, pipeline, Stripe, analytics
- Multivers : 499€/mois — CRM complet, IA avancée, utilisateurs illimités

## Commandes utiles
- `npm run dev` — dev local
- `npm run build` — build prod
- `npm run test` — tests Vitest
- `npm run db:push` — push schema Supabase
- `npm run db:seed` — seed données de test
