'use client'

import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function TestSupabase() {
  const [status, setStatus] = useState({
    state: 'loading',
    message: 'Initializing...',
    error: null as string | null,
    envVars: {
      url: null as string | null,
      keyExists: false
    }
  })

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Check environment variables
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        setStatus(prev => ({
          ...prev,
          state: 'checking',
          message: 'Checking environment variables...',
          envVars: {
            url: url || null,
            keyExists: !!key
          }
        }))

        if (!url || !key) {
          throw new Error('Environment variables are missing')
        }

        // Initialize Supabase client
        setStatus(prev => ({ ...prev, message: 'Initializing Supabase client...' }))
        const supabase = createClient()

        // Test connection
        setStatus(prev => ({ ...prev, message: 'Testing connection...' }))
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        setStatus(prev => ({
          ...prev,
          state: 'success',
          message: 'Successfully connected to Supabase!',
          error: null
        }))

      } catch (error) {
        console.error('Connection error:', error)
        setStatus(prev => ({
          ...prev,
          state: 'error',
          message: 'Connection failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        }))
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
      
      <div className="space-y-6">
        {/* Status Card */}
        <div className={`p-4 rounded-lg border ${
          status.state === 'loading' ? 'bg-gray-100 border-gray-200' :
          status.state === 'checking' ? 'bg-blue-50 border-blue-200' :
          status.state === 'success' ? 'bg-green-50 border-green-200' :
          'bg-red-50 border-red-200'
        }`}>
          <h2 className="font-semibold mb-2">Status: {status.state}</h2>
          <p>{status.message}</p>
          {status.error && (
            <p className="text-red-600 mt-2">{status.error}</p>
          )}
        </div>

        {/* Environment Variables */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Environment Variables</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Supabase URL: </span>
              {status.envVars.url ? '✅ Present' : '❌ Missing'}
            </p>
            <p>
              <span className="font-medium">Supabase Key: </span>
              {status.envVars.keyExists ? '✅ Present' : '❌ Missing'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 