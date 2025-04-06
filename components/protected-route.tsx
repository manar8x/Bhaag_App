'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireEmailVerification?: boolean
}

export default function ProtectedRoute({
  children,
  requireEmailVerification = false,
}: ProtectedRouteProps) {
  const { user, isLoading, session } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user || !session) {
        router.push('/auth/login')
      } else if (requireEmailVerification && !user.isEmailVerified) {
        router.push('/auth/verify-email')
      }
    }
  }, [user, isLoading, session, requireEmailVerification, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || !session) {
    return null
  }

  if (requireEmailVerification && !user.isEmailVerified) {
    return null
  }

  return <>{children}</>
} 