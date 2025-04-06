"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const { signup, googleLogin, isLoading, error, validatePassword } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  })

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setPasswordValidation(validatePassword(value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      // TODO: Add proper error handling
      return
    }

    const validation = validatePassword(password)
    if (!Object.values(validation).every(Boolean)) {
      // TODO: Add proper error handling
      return
    }

    try {
      await signup(name, email, password)
      // TODO: Show success message and redirect to email verification page
      router.push("/auth/verify-email")
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await googleLogin()
      router.push("/dashboard") // TODO: Update with actual dashboard route
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-[#0A0A0A] to-[#1C1C2E] rounded-xl border border-white/10 p-8"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-exo font-black mb-2">Create Account</h2>
          <p className="text-gray-400 font-barlow">
            Sign up to start your running journey
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-black/50 border-white/20 focus:border-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border-white/20 focus:border-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="bg-black/50 border-white/20 focus:border-primary pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    passwordValidation.hasMinLength ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                At least 8 characters
              </div>
              <div className="flex items-center text-sm">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    passwordValidation.hasUpperCase ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                At least one uppercase letter
              </div>
              <div className="flex items-center text-sm">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    passwordValidation.hasLowerCase ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                At least one lowercase letter
              </div>
              <div className="flex items-center text-sm">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    passwordValidation.hasNumber ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                At least one number
              </div>
              <div className="flex items-center text-sm">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    passwordValidation.hasSpecialChar ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                At least one special character
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-black/50 border-white/20 focus:border-primary"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full btn-primary font-barlow"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#1C1C2E] text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full bg-black/50 border-white/20 hover:bg-white/5 text-white"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400 font-barlow">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
} 