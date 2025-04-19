'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <motion.span 
      className={`text-4xl font-exo font-black tracking-wider text-[#00FFD1] transition-all duration-300 ${className}`}
      style={{
        textShadow: `
          0 0 10px rgba(0, 255, 209, 0.24),
          0 0 15px rgba(0, 255, 209, 0.12)
        `
      }}
      whileHover={{
        textShadow: `
          0 0 7px rgba(0, 255, 209, 0.4),
          0 0 10px rgba(0, 255, 209, 0.4),
          0 0 21px rgba(0, 255, 209, 0.4),
          0 0 42px rgba(0, 255, 209, 0.3),
          0 0 82px rgba(0, 255, 209, 0.2)
        `,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      BHAAG
    </motion.span>
  )
} 