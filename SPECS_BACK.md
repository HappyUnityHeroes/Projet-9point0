# BACK — Specs back office client

## Routes Next.js (apps/back)
- /dashboard → vue principale (stats, agent, tickets)
- /contenu → éditeur de contenu (Tiptap)
- /contenu/blog → liste articles + génération IA
- /stats → analytics Plausible embed
- /crm → liste contacts (Ariane+)
- /crm/pipeline → kanban (Interstellar+)
- /tickets → liste tickets
- /tickets/[id] → détail ticket
- /agent → session ElevenLabs vocal
- /settings → profil, abonnement, facturation

## Composants clés

### Dashboard
- AgentCTA — bannière appel agent (Léa / Sofia selon tier)
- StatsRow — visiteurs, leads, contacts, taux conversion
- TicketsList — tickets ouverts avec statuts
- RecentLeads — derniers leads reçus

### Éditeur (BACK — contenu)
- TiptapEditor — éditeur rich text
- ImageUpload → Supabase Storage
- PublishButton → déclenche webhook deploy
- AiAssist → génération contenu Claude API (Ariane+)

### CRM (BACK — Interstellar+)
- ContactsList — table triable / filtrable
- ContactCard — fiche détail + historique
- KanbanBoard — pipeline drag & drop
- ImportCsv — import contacts

### Agent vocal (BACK)
- ElevenLabsWidget — session conversationnelle
- TranscriptView — résumé de la session
- TicketCreator → génère ticket depuis la conversation

## Auth BACK
- Supabase Auth magic link (pas de mot de passe)
- Middleware RBAC → redirect si feature hors tier
- Session JWT avec claims tier

## Variables d'environnement BACK
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_ELEVENLABS_AGENT_ID_LEA=
NEXT_PUBLIC_ELEVENLABS_AGENT_ID_SOFIA=
RESEND_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
