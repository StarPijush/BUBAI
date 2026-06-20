import React, { useMemo } from 'react'

interface FloatingHeart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  emoji: string
  opacity: number
  sway: number
}

interface AnimatedBackgroundProps {
  density?: 'light' | 'medium' | 'heavy'
  emojis?: string[]
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  density = 'medium',
  emojis = ['💗', '💕', '🌸', '✨', '💖', '💝'],
}) => {
  // Drastically reduced counts to optimize GPU/CPU rendering and remove visual clutter
  const count = density === 'light' ? 3 : density === 'medium' ? 5 : 8

  const hearts: FloatingHeart[] = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5, // Keep slightly inset from screen edges
        size: Math.random() * 12 + 14, // Subtle sizes (14px - 26px)
        duration: Math.random() * 12 + 18, // Very slow movement (18s to 30s)
        delay: Math.random() * -20, // Negative delay so particles are immediately spread across screen height on mount
        emoji: emojis[i % emojis.length],
        opacity: Math.random() * 0.15 + 0.08, // Very soft opacity (8% - 23%)
        sway: Math.random() * 20 - 10, // Horizontal sway distance in vw
      })),
    [count, emojis]
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <style>{`
        @keyframes float-up-ambient {
          0% {
            transform: translateY(105vh) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(45vh) translateX(var(--sway-x)) rotate(var(--rotate-mid));
          }
          100% {
            transform: translateY(-10vh) translateX(0px) rotate(var(--rotate-end));
          }
        }
        .ambient-particle {
          animation: float-up-ambient var(--dur) linear infinite;
          animation-delay: var(--delay);
          will-change: transform;
        }
      `}</style>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute ambient-particle select-none"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            // Inline custom CSS variables to feed values to the static keyframe animation
            ['--dur' as any]: `${heart.duration}s`,
            ['--delay' as any]: `${heart.delay}s`,
            ['--sway-x' as any]: `${heart.sway}vw`,
            ['--rotate-mid' as any]: `${heart.sway * 1.5}deg`,
            ['--rotate-end' as any]: `${heart.sway * 3}deg`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  )
}

export default AnimatedBackground
