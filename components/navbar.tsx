"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Settings, LogOut, Home, Dumbbell } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/components/ui/logo"
import Avatar from "@/components/ui/avatar"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const router = useRouter()
  const { user, logout } = useAuth()
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "faq", "sample"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const handleDashboardClick = () => {
    router.push('/dashboard')
  }

  const handleWorkoutsClick = () => {
    router.push('/workouts')
  }

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/')
  }

  return (
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
            className="flex items-center"
            onClick={handleHomeClick}
          >
            <Logo />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {user ? (
            <>
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
                  onClick={handleDashboardClick}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleWorkoutsClick}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold"
                >
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Workouts
                </Button>
              </motion.div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Avatar photoURL={user?.photoURL} name={user?.name} size="sm" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <NavLink
                href="#features"
                label="How it Works"
                active={activeSection === "features"}
                onClick={() => scrollToSection("features")}
              />
              <NavLink href="#faq" label="FAQ" active={activeSection === "faq"} onClick={() => scrollToSection("faq")} />
              <NavLink
                href="#sample"
                label="Try a Sample Plan"
                active={activeSection === "sample"}
                onClick={() => scrollToSection("sample")}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => router.push('/auth/login')} className="bg-primary text-black font-raleway font-semibold hover:glow">
                  Login
                </Button>
              </motion.div>
            </>
          )}
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto flex flex-col space-y-4 px-6">
            {user ? (
              <>
                <Button
                  onClick={() => {
                    handleHomeClick(new MouseEvent('click') as any)
                    setIsOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
                <Button
                  onClick={() => {
                    handleDashboardClick()
                    setIsOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  onClick={() => {
                    handleWorkoutsClick()
                    setIsOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Workouts
                </Button>
                <Button
                  onClick={() => {
                    router.push('/profile')
                    setIsOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  onClick={() => {
                    router.push('/settings')
                    setIsOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-raleway font-semibold w-full justify-start"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <MobileNavLink href="#features" label="How it Works" onClick={() => scrollToSection("features")} />
                <MobileNavLink href="#faq" label="FAQ" onClick={() => scrollToSection("faq")} />
                <MobileNavLink href="#sample" label="Try a Sample Plan" onClick={() => scrollToSection("sample")} />
                <Button
                  onClick={() => {
                    router.push('/auth/login')
                    setIsOpen(false)
                  }}
                  className="bg-primary text-black font-raleway font-semibold w-full"
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string
  label: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`font-barlow font-medium transition-colors ${
        active ? "text-primary" : "text-white/70 hover:text-white"
      }`}
    >
      {label}
    </a>
  )
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick: () => void
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="font-barlow font-medium text-white/70 hover:text-white transition-colors"
    >
      {label}
    </a>
  )
}

