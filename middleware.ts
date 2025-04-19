import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  // Add security headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self' https://*.supabase.co; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co;"
  )
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

  // Rate limiting for auth routes
  if (request.nextUrl.pathname.startsWith('/auth')) {
    const ip = request.ip ?? '127.0.0.1'
    const now = Date.now()
    const rateLimit = rateLimitMap.get(ip)

    if (rateLimit) {
      if (now > rateLimit.resetTime) {
        // Reset rate limit
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
      } else if (rateLimit.count >= RATE_LIMIT.max) {
        // Rate limit exceeded
        return new NextResponse('Too Many Requests', { status: 429 })
      } else {
        // Increment count
        rateLimitMap.set(ip, { ...rateLimit, count: rateLimit.count + 1 })
      }
    } else {
      // Initialize rate limit
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 