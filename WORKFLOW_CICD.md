# Workflow CI/CD — De la parole au deploy

## Étape 1 — Brief vocal (ElevenLabs + Claude)
1. Client ouvre une session avec son agent (Léa / Sofia / Marc)
2. L'agent pose les questions structurées
3. Claude génère le ticket JSON
4. Ticket inséré en DB Supabase → status: open

## Étape 2 — Analyse & build (Claude Code)
1. Webhook Supabase déclenche GitHub Action
2. Claude Code lit le ticket JSON
3. Claude Code scaffold le projet React sur une branche `build/ticket-id`
4. Tests Vitest lancés automatiquement
5. Si tests verts → preview Vercel générée → status: review

## Étape 3 — Validation (selon tier)
### Orbite & Ariane (auto-deploy)
- Tests verts → merge auto dans main → deploy prod
- Client notifié par email + agent vocal

### Interstellar & Multivers (validation ADMIN)
- Ticket apparaît dans la file ADMIN avec badge "Validation requise"
- Preview URL disponible en 1 clic
- Bouton "Valider" → appel API Vercel → merge → deploy
- Bouton "Refuser" → message auto au client via agent

## Étape 4 — Livraison (ElevenLabs)
1. Deploy confirmé → webhook → agent appelé
2. Agent présente le livrable au client
3. Résumé session envoyé par email (Resend)

## GitHub Actions — workflow principal
```yaml
# .github/workflows/build-ticket.yml
name: Build from ticket
on:
  repository_dispatch:
    types: [new-ticket]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with: { node-version: 20 }
      - name: Install deps
        run: npm ci
      - name: Run Claude Code
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          TICKET_JSON: ${{ github.event.client_payload.ticket }}
        run: npx claude --ticket "$TICKET_JSON"
      - name: Run tests
        run: npm test
      - name: Deploy preview
        run: vercel deploy --token ${{ secrets.VERCEL_TOKEN }}
```
