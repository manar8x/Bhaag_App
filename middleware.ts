import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Create a response object that we can modify
    const res = NextResponse.next()

    // Create the Supabase client
    const supabase = createMiddlewareClient({ req: request, res })

    // Refresh session if expired
    const { data: { session } } = await supabase.auth.getSession()

    return res
  } catch (error) {
    // If there's an error, return a basic response to prevent middleware failure
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match only specific paths that need auth:
     * - /dashboard routes
     * - /profile routes
     * Skip all static files and API routes
     */
    '/dashboard/:path*',
    '/profile/:path*'
  ]
} 