"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

interface AvatarProps {
  photoURL?: string | null
  name?: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base'
}

export default function Avatar({ photoURL, name, size = 'md', className = '' }: AvatarProps) {
  const getInitials = (name: string) => {
    if (!name) return '?'
    const nameParts = name.trim().split(/\s+/).filter(Boolean)
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase()
    }
    const firstInitial = nameParts[0].charAt(0)
    const lastInitial = nameParts[nameParts.length - 1].charAt(0)
    return (firstInitial + lastInitial).toUpperCase()
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative rounded-full overflow-hidden border-[4px] border-[#00FFD1]/70 shadow-[0_0_8px_#00FFD1]/40 hover:border-[#00FFD1] hover:shadow-[0_0_12px_#00FFD1] transition-all duration-300 ${sizeClasses[size]} ${className}`}
    >
      {photoURL ? (
        <Image
          src={photoURL}
          alt={name || 'User avatar'}
          fill
          className="object-cover"
        />
      ) : (
        <div className="h-full w-full bg-black/50 flex items-center justify-center font-medium text-white">
          {name ? getInitials(name) : '?'}
        </div>
      )}
    </motion.div>
  )
}
