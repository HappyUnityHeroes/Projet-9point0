import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

export async function generateBlogPost(topic: string, tone: string, length: 'short' | 'medium' | 'long') {
  const wordCount = { short: 300, medium: 600, long: 1200 }[length]
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Rédige un article de blog en français sur le sujet suivant : "${topic}".
Ton : ${tone}. Longueur : environ ${wordCount} mots.
Retourne le contenu en HTML (h2, h3, p, ul, li). Pas de balise html/body.`
    }],
  })
  return response.content[0].type === 'text' ? response.content[0].text : ''
}

export async function analyzeTicket(brief: Record<string, unknown>) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Analyse ce brief client et génère un ticket structuré JSON :
${JSON.stringify(brief, null, 2)}

Retourne un JSON avec : type, priority, scope_check, estimated_effort, summary.`
    }],
  })
  const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
  return JSON.parse(text)
}

export async function checkScope(request: string, tier: string) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 256,
    messages: [{
      role: 'user',
      content: `Le client est sur le tier "${tier}". Il demande : "${request}".
Cette demande est-elle dans le scope de son tier ?
Réponds en JSON : { "in_scope": boolean, "reason": string, "suggested_tier": string | null }`
    }],
  })
  const text = response.content[0].type === 'text' ? response.content[0].text : '{}'
  return JSON.parse(text)
}
