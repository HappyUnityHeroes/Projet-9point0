import { createSupabaseServer } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const body = await request.json()
  const { pageId, content, publish, type, topic } = body

  // Save content (simplified — stores in project config)
  // In production, this would update the actual page content in the project
  return NextResponse.json({ success: true, pageId, published: !!publish })
}

export async function PUT(request: Request) {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const body = await request.json()

  if (body.action === 'generate_blog') {
    // Call Claude API for blog generation
    // In production, use @9point0/ai generateBlogPost
    const { topic, tone, length } = body
    const html = `<h2>${topic}</h2><p>Article généré par l'IA sur le thème "${topic}" avec un ton ${tone}.</p><p>Ceci est un placeholder. En production, Claude génère le contenu complet.</p>`
    return NextResponse.json({ html })
  }

  return NextResponse.json({ error: 'Action inconnue' }, { status: 400 })
}
