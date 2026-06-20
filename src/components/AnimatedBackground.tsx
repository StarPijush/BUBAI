import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface FloatingHeart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  emoji: string
  opacity: number
}

interface AnimatedBackgroundProps {
  density?: 'light' | 'medium' | 'heavy'
  emojis?: string[]
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  density = 'medium',
  emojis = ['💗', '💕', '🌸', '✨', '💖', '🌷', '💝'],
}) => {
  const count = density === 'light' ? 8 : density === 'medium' ? 14 : 22

  const hearts: FloatingHeart[] = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 20 + 16,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        opacity: Math.random() * 0.35 + 0.1,
      })),
    [count, emojis]
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute select-none"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            filter: 'blur(0.5px)',
          }}
          initial={{ y: '110vh', rotate: 0 }}
          animate={{
            y: '-10vh',
            rotate: [0, 15, -10, 20, -5, 0],
            x: [0, 20, -15, 25, -10, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: heart.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: heart.duration * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default AnimatedBackground
