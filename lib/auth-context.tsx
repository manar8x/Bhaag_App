"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  isEmailVerified: boolean
  preferences?: Record<string, any>
}

interface Session {
  token: string
  refreshToken: string
  expiresAt: number
}

interface PasswordValidation {
  hasMinLength: boolean
  hasUpperCase: boolean
  hasLowerCase: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  session: Session | null
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  resetPassword: (email: string) => Promise<void>
  googleLogin: () => Promise<void>
  verifyEmail: (token: string) => Promise<void>
  updateProfile: (profile: Partial<User>) => Promise<void>
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>
  validatePassword: (password: string) => PasswordValidation
}

const SESSION_STORAGE_KEY = 'auth_session'
const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
    const interval = setInterval(refreshSession, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  const saveSession = (newSession: Session) => {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession))
    setSession(newSession)
  }

  const clearSession = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY)
    setSession(null)
  }

  const validatePassword = (password: string): PasswordValidation => {
    return {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }
  }

  const checkAuth = async () => {
    try {
      const storedSession = localStorage.getItem(SESSION_STORAGE_KEY)
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession)
        if (parsedSession.expiresAt > Date.now()) {
          setSession(parsedSession)
          // TODO: Implement session validation with backend
          // const response = await validateSession(parsedSession.token)
          // setUser(response.user)
        } else {
          clearSession()
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      clearSession()
    } finally {
      setIsLoading(false)
    }
  }

  const refreshSession = async () => {
    if (session && session.expiresAt - Date.now() < REFRESH_INTERVAL) {
      try {
        // TODO: Implement session refresh with backend
        // const newSession = await refreshToken(session.refreshToken)
        // saveSession(newSession)
      } catch (error) {
        console.error('Session refresh failed:', error)
        clearSession()
      }
    }
  }

  const login = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Implement login with backend
      // const response = await loginUser(email, password)
      // setUser(response.user)
      // const newSession = {
      //   token: response.token,
      //   refreshToken: response.refreshToken,
      //   expiresAt: Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)
      // }
      // saveSession(newSession)
    } catch (error) {
      setError('Invalid credentials')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const verifyEmail = async (token: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Implement email verification with backend
      // await verifyEmailToken(token)
      // setUser(prev => prev ? { ...prev, isEmailVerified: true } : null)
    } catch (error) {
      setError('Email verification failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (profile: Partial<User>) => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Implement profile update with backend
      // const updatedUser = await updateUserProfile(profile)
      // setUser(updatedUser)
    } catch (error) {
      setError('Profile update failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Implement password change with backend
      // await changeUserPassword(oldPassword, newPassword)
    } catch (error) {
      setError('Password change failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Implement signup with backend
      // const response = await registerUser(name, email, password)
      // setUser(response.user)
    } catch (error) {
      setError('Registration failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement logout with backend
      // await logoutUser()
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Implement password reset with backend
      // await sendPasswordResetEmail(email)
    } catch (error) {
      setError('Failed to send reset email')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const googleLogin = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // TODO: Implement Google OAuth with backend
      // const response = await googleAuth()
      // setUser(response.user)
    } catch (error) {
      setError('Google login failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        session,
        login,
        signup,
        logout,
        resetPassword,
        googleLogin,
        verifyEmail,
        updateProfile,
        changePassword,
        validatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 