import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as Record<string, unknown>)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if not authenticated
  if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Don't redirect if already on auth page and logged in
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // RBAC check: get user tier from DB
  if (user && !request.nextUrl.pathname.startsWith('/auth')) {
    const { data: profile } = await supabase
      .from('users')
      .select('tier')
      .eq('id', user.id)
      .single()

    if (profile) {
      const tier = profile.tier as string
      const pathname = request.nextUrl.pathname

      const ROUTE_TIERS: Record<string, string[]> = {
        '/contenu/blog': ['ariane', 'interstellar', 'multivers'],
        '/crm/pipeline': ['interstellar', 'multivers'],
        '/crm': ['ariane', 'interstellar', 'multivers'],
        '/stats': ['ariane', 'interstellar', 'multivers'],
      }

      for (const [route, allowedTiers] of Object.entries(ROUTE_TIERS)) {
        if (pathname.startsWith(route) && !allowedTiers.includes(tier)) {
          const url = request.nextUrl.clone()
          url.pathname = '/dashboard'
          url.searchParams.set('upgrade', 'true')
          return NextResponse.redirect(url)
        }
      }
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
