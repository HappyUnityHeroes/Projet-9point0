# FRONT — Specs page de vente

## Fichier
page-de-vente-9point0-v3.html (déjà produit)

## Routes Next.js (apps/front)
- / → page de vente principale
- /orbite, /ariane, /interstellar, /multivers → pages dédiées par tier
- /lancement → add-on création entreprise
- /agents → présentation Marc / Sofia / Léa

## Composants clés
- HeroSection — titre animé, gros 9.0, agents pills
- ManifestoStrip — "Le monde change"
- ProductGrid — Site Web 9.0 / CRM 9.0 / Lancement
- AgentsSection — Marc, Sofia, Léa (HeyGen embed)
- WorkflowSteps — 4 étapes animées
- PricingBlocks — 4 forfaits en blocs pleine largeur
- ServicesHumains — Consulting 200€/h + compta 100€/h
- AddonBanner — Lancement 9.0
- CtaSection

## Intégrations FRONT
- Stripe Checkout → /api/checkout (création session)
- ElevenLabs widget → agent vocal disponible en bas à droite
- Plausible analytics → tracking conversions par tier

## Variables d'environnement FRONT
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_ELEVENLABS_AGENT_ID_LEA=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
