'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Dumbbell, 
  LineChart, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import ProtectedRoute from '@/components/protected-route'
import Link from 'next/link'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  )
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(10px)"]
  )

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1C1C2E] text-white">
        <motion.div 
          className="fixed inset-0 z-0 opacity-20" 
          style={{ y: useTransform(scrollY, [0, 1], ["0%", "20%"]) }}
          initial={false}
        >
          <div className="absolute inset-0 bg-[url('/background-grid.svg')] bg-repeat opacity-10"></div>
        </motion.div>

        <motion.header
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
          style={{
            backgroundColor,
            backdropFilter: backdropBlur,
          }}
        >
          <div className="container mx-auto flex items-center justify-between">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                href="/" 
                className="flex items-center group"
                onClick={handleHomeClick}
              >
                <span className="text-4xl font-exo font-black tracking-wider text-primary group-hover:glow transition-all duration-300">BHAAG</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleHomeClick}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => router.push('/dashboard')}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => router.push('/dashboard/workouts')}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold"
                >
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Workouts
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => router.push('/dashboard/progress')}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold"
                >
                  <LineChart className="mr-2 h-4 w-4" />
                  Progress
                </Button>
              </motion.div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary/50 hover:border-primary transition-all duration-300"
                  >
                    {user?.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt="User avatar"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto flex flex-col space-y-4 px-6">
                <Button
                  onClick={() => {
                    handleHomeClick(new MouseEvent('click') as any)
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
                <Button
                  onClick={() => {
                    router.push('/dashboard')
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  onClick={() => {
                    router.push('/dashboard/workouts')
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Workouts
                </Button>
                <Button
                  onClick={() => {
                    router.push('/dashboard/progress')
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <LineChart className="mr-2 h-4 w-4" />
                  Progress
                </Button>
                <Button
                  onClick={() => {
                    router.push('/profile')
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  onClick={() => {
                    router.push('/dashboard/settings')
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-primary text-black font-raleway font-semibold hover:glow w-full justify-start"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </motion.div>
          )}
        </motion.header>

        {/* Main content */}
        <div className="relative z-10 flex flex-col flex-1 pt-20">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
} 