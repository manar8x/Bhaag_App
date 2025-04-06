"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const router = useRouter()
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

  const handleLoginClick = () => {
    router.push("/auth/login")
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
          <a href="#" onClick={() => scrollToSection("home")} className="flex items-center">
            <span className="text-4xl font-exo font-black tracking-wider text-primary">BHAAG</span>
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
            <Button onClick={handleLoginClick} className="bg-primary text-black font-raleway font-semibold hover:glow">
              Login
            </Button>
          </motion.div>
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
            <MobileNavLink href="#features" label="How it Works" onClick={() => scrollToSection("features")} />
            <MobileNavLink href="#faq" label="FAQ" onClick={() => scrollToSection("faq")} />
            <MobileNavLink href="#sample" label="Try a Sample Plan" onClick={() => scrollToSection("sample")} />
            <Button
              onClick={() => {
                handleLoginClick()
                setIsOpen(false)
              }}
              className="bg-primary text-black font-raleway font-semibold w-full"
            >
              Login
            </Button>
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

