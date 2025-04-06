'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const { verifyEmail, isLoading, error } = useAuth()
  const [isVerified, setIsVerified] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      verifyEmail(token)
        .then(() => setIsVerified(true))
        .catch(() => setIsVerified(false))
        .finally(() => setIsVerifying(false))
    } else {
      setIsVerifying(false)
    }
  }, [searchParams, verifyEmail])

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-lg rounded-lg p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Email Verification</h1>

        {isVerifying ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-300">Verifying your email...</p>
          </div>
        ) : isVerified ? (
          <div className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-semibold mb-2">Email Verified!</h2>
            <p className="text-gray-300 mb-6">
              Your email has been successfully verified. You can now access all features.
            </p>
            <Link href="/dashboard">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">✕</div>
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-gray-300 mb-6">
              {error || 'The verification link is invalid or has expired.'}
            </p>
            <div className="space-y-4">
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  // TODO: Implement resend verification email
                }}
              >
                Resend Verification Email
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
} 