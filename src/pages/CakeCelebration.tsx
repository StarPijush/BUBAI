import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MusicPlayer from '../components/MusicPlayer'

// ── Types ──
type GameStep = 'candles' | 'unlock' | 'cutting' | 'celebration' | 'gift'
type CandleState = 'lit' | 'blowing' | 'out'

interface Particle {
  id: number
  x: number
  y: number
  color?: string
  size?: number
  angle?: number
  speed?: number
}

// ── Constants ──
const CRUMB_COLORS = ['#ffccd5', '#ffb3c1', '#ff8fa3', '#fff0f3', '#ffdca3', '#ffffff']

// ── Ambient Particles Component ──
const AmbientDust: React.FC = React.memo(() => {
  const particles = React.useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 20 + Math.random() * 70,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * -10,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <style>{`
        @keyframes dust-float {
          0% {
            transform: translateY(20vh) translateX(0px);
            opacity: 0;
          }
          20% {
            opacity: 0.4;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-80vh) translateX(15px);
            opacity: 0;
          }
        }
        .dust-particle {
          animation: dust-float var(--dur) linear infinite;
          animation-delay: var(--delay);
          will-change: transform;
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/30 dust-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            ['--dur' as any]: `${p.duration}s`,
            ['--delay' as any]: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
})

// ── Tiny Sparkles Component ──
const AmbientSparkles: React.FC = React.memo(() => {
  const sparkles = React.useMemo(() => {
    return Array.from({ length: 2 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 30 + Math.random() * 50,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 3,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <style>{`
        @keyframes sparkle-pulse {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(90deg);
            opacity: 0.5;
          }
        }
        .sparkle-particle {
          animation: sparkle-pulse var(--dur) ease-in-out infinite;
          animation-delay: var(--delay);
          will-change: transform;
        }
      `}</style>
      {sparkles.map((s) => (
        <svg
          key={s.id}
          className="absolute text-pink-300/40 fill-current sparkle-particle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            ['--dur' as any]: `${s.duration}s`,
            ['--delay' as any]: `${s.delay}s`,
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.6L12 0Z" />
        </svg>
      ))}
    </div>
  )
})

// ── Premium Bubu Cat Companion ──
interface BubuProps {
  step: GameStep
  blownCount: number
  catReaction: 'idle' | 'happy' | 'smile'
}

const BubuCompanion: React.FC<BubuProps> = React.memo(({ step, blownCount, catReaction }) => {
  const [isBlinking, setIsBlinking] = useState(false)

  // Speech bubble text based on stage
  const getSpeechBubbleText = () => {
    if (step === 'candles') {
      if (blownCount === 0) return 'Ready for your birthday surprise? 🎂'
      if (blownCount === 1) return 'Ooh! Make a wish! ✨'
      if (blownCount === 2) return 'Two down! You are doing great! 💕'
      if (blownCount === 3) return 'Just one more candle! 🕯️'
      return 'Make your final wish! 💖'
    }
    if (step === 'unlock') return 'Wow... something magical is happening! 🌟'
    if (step === 'cutting') return 'Cut the cake and share a slice! 🔪🍰'
    if (step === 'celebration') return 'Yay! We did it! 💖'
    return 'Bubu unlocked a piece of my heart for you! 💌'
  }

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 200)
    }, 3500)
    return () => clearInterval(blinkInterval)
  }, [])

  const isCatHappy = catReaction === 'happy' || step === 'celebration' || step === 'gift'
  const isCatSmiling = catReaction === 'smile' && !isCatHappy

  return (
    <div className="flex flex-col items-center select-none pointer-events-none mb-6 relative">
      {/* Speech Bubble */}
      <motion.div
        key={getSpeechBubbleText()}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -10 }}
        className="bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-2xl shadow-md border border-pink-100/80 text-pink-600 text-sm font-semibold tracking-wide whitespace-nowrap z-20 mb-3 relative font-inter"
        style={{
          boxShadow: '0 8px 24px rgba(244, 63, 94, 0.08)',
        }}
      >
        {getSpeechBubbleText()}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-pink-100/80 rotate-45" />
      </motion.div>

      {/* Floating Heart React */}
      <AnimatePresence>
        {isCatHappy && (
          <motion.div
            key={`heart-react-${blownCount}`}
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: [1, 1, 0], scale: [1, 1.4, 1], y: -40 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-10 text-xl z-30"
          >
            💖
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubu Cat SVG */}
      <motion.div
        animate={isCatHappy ? { y: [0, -12, 0], scaleY: [1, 0.9, 1.1, 1] } : { y: [0, -3, 0] }}
        transition={isCatHappy ? { duration: 0.5, repeat: 0 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-24 h-24 drop-shadow-sm overflow-visible"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Party Hat for Celebration */}
          {(step === 'celebration' || step === 'gift') && (
            <g transform="translate(50, 16)">
              <polygon points="-12,0 12,0 0,-24" fill="url(#partyHatGrad)" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#fda4af" strokeWidth="1" />
              {/* Pom pom */}
              <circle cx="0" cy="-25" r="4.5" fill="#fbcfe8" />
              <circle cx="0" cy="-25" r="3" fill="#fff" />
              {/* Hat Stripes */}
              <path d="M-8,-8 L8,-8" stroke="#ffffff" strokeWidth="2.5" opacity="0.6" />
              <path d="M-5,-16 L5,-16" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
            </g>
          )}

          {/* Ears */}
          <polygon points="22,42 34,16 50,38" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1.8" strokeLinejoin="round" />
          <polygon points="27,38 34,22 43,36" fill="#ffe4e6" />

          <polygon points="78,42 66,16 50,38" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1.8" strokeLinejoin="round" />
          <polygon points="73,38 66,22 57,36" fill="#ffe4e6" />

          {/* Body */}
          <ellipse cx="50" cy="74" rx="28" ry="20" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1.8" />

          {/* Head */}
          <ellipse cx="50" cy="48" rx="34" ry="28" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1.8" />

          {/* Cheeks */}
          <ellipse cx="26" cy="54" rx="5" ry="3.5" fill="#fda4af" opacity="0.5" />
          <ellipse cx="74" cy="54" rx="5" ry="3.5" fill="#fda4af" opacity="0.5" />

          {/* Eyes */}
          {isBlinking ? (
            <g stroke="#4c1d95" strokeWidth="2.5" strokeLinecap="round">
              <line x1="32" y1="46" x2="40" y2="46" />
              <line x1="60" y1="46" x2="68" y2="46" />
            </g>
          ) : isCatHappy ? (
            /* Happy curved eyes */
            <g stroke="#4c1d95" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M 31,48 Q 36,41 41,48" />
              <path d="M 59,48 Q 64,41 69,48" />
            </g>
          ) : isCatSmiling ? (
            /* Smiling eyes */
            <g stroke="#4c1d95" strokeWidth="2" strokeLinecap="round" fill="none">
              <path d="M 32,46 Q 36,43 40,46" />
              <path d="M 60,46 Q 64,43 68,46" />
            </g>
          ) : (
            /* Normal Eyes */
            <g>
              <circle cx="36" cy="46" r="3.5" fill="#4c1d95" />
              <circle cx="64" cy="46" r="3.5" fill="#4c1d95" />
              <circle cx="37.5" cy="44.5" r="1.2" fill="#ffffff" />
              <circle cx="65.5" cy="44.5" r="1.2" fill="#ffffff" />
            </g>
          )}

          {/* Nose */}
          <polygon points="50,51 48,49 52,49" fill="#f43f5e" />

          {/* Mouth */}
          {isCatHappy ? (
            /* Open happy mouth */
            <path d="M 46,53 Q 50,60 54,53 Z" fill="#fda4af" stroke="#4c1d95" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            /* Cat w mouth */
            <path d="M 45,53 C 45,55.5 48.5,55.5 50,53 C 51.5,55.5 55,55.5 55,53" fill="none" stroke="#4c1d95" strokeWidth="1.5" strokeLinecap="round" />
          )}

          {/* Paws */}
          <ellipse cx="38" cy="74" rx="6" ry="4" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1.2" />
          <ellipse cx="62" cy="74" rx="6" ry="4" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1.2" />
        </svg>
      </motion.div>
    </div>
  )
})

// ── Main Page Component ──
const CakeCelebration: React.FC = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<GameStep>('candles')

  // Candle Blowing states
  const [candles, setCandles] = useState<CandleState[]>(['lit', 'lit', 'lit', 'lit'])
  const [catReaction, setCatReaction] = useState<'idle' | 'happy' | 'smile'>('idle')
  const [smokeParticles, setSmokeParticles] = useState<Particle[]>([])
  const [blowSparkles, setBlowSparkles] = useState<Particle[]>([])

  // Cutting states
  const [progress, setProgress] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const [knifePath, setKnifePath] = useState<{ x: number; y: number }[]>([])
  const [frostingSplashes, setFrostingSplashes] = useState<Particle[]>([])
  const [floatingHearts, setFloatingHearts] = useState<Particle[]>([])
  const [cakeJiggle, setCakeJiggle] = useState(false)

  // Celebration state
  const [confetti, setConfetti] = useState<Particle[]>([])

  const containerRef = useRef<HTMLDivElement>(null)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)
  const particleId = useRef(0)

  const blownCount = candles.filter((c) => c === 'out').length

  // Trigger quick cake jiggle
  const triggerJiggle = useCallback(() => {
    setCakeJiggle(true)
    setTimeout(() => setCakeJiggle(false), 400)
  }, [])

  // Satisfying vibration
  const triggerVibrate = useCallback((pattern: number[]) => {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(pattern)
      } catch (e) {}
    }
  }, [])

  // Candle Tap logic
  const handleCandleTap = useCallback(
    (index: number) => {
      if (step !== 'candles' || candles[index] !== 'lit') return

      triggerVibrate([30])
      // Set to blowing state (flame shrinks, flickers rapidly)
      setCandles((prev) => {
        const next = [...prev]
        next[index] = 'blowing'
        return next
      })
      setCatReaction('smile')

      // Emit tiny sparkles immediately
      const candlePositions = [
        { x: 170, y: 175 },
        { x: 220, y: 205 },
        { x: 280, y: 205 },
        { x: 330, y: 175 },
      ]
      const pos = candlePositions[index]

      // Spawn blow sparkles
      const newSparkles: Particle[] = Array.from({ length: 3 }).map((_, i) => {
        const angle = (i * 360) / 3 + Math.random() * 15
        const speed = 2 + Math.random() * 3
        return {
          id: particleId.current++,
          x: pos.x,
          y: pos.y - 12,
          angle,
          speed,
        }
      })
      setBlowSparkles((prev) => [...prev, ...newSparkles])

      // After 500ms, candle goes out, smoke rises
      setTimeout(() => {
        setCandles((prev) => {
          const next = [...prev]
          next[index] = 'out'

          // Check if all candles are blown
          if (next.every((c) => c === 'out')) {
            setTimeout(() => triggerUnlockMoment(), 800)
          }
          return next
        })

        // Spawn smoke particles
        const newSmoke: Particle[] = Array.from({ length: 2 }).map((_) => ({
          id: particleId.current++,
          x: pos.x + (Math.random() * 6 - 3),
          y: pos.y - 10,
          speed: 0.8 + Math.random() * 1,
        }))
        setSmokeParticles((prev) => [...prev, ...newSmoke])

        setCatReaction('happy')
        triggerJiggle()
        triggerVibrate([80])

        // Reset cat reaction back to idle after a while
        setTimeout(() => setCatReaction('idle'), 1500)
      }, 500)
    },
    [candles, step, triggerJiggle, triggerVibrate]
  )

  // Transition to Unlock Moment
  const triggerUnlockMoment = () => {
    setStep('unlock')
    triggerVibrate([100, 50, 100])

    // Wait and switch to Cutting stage
    setTimeout(() => {
      setStep('cutting')
    }, 4000)
  }

  // Pointer Down for Swipe Cutting
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (step !== 'cutting' || progress >= 100) return
      setIsSwiping(true)
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setKnifePath([{ x, y }])
      lastPointRef.current = { x, y }
      triggerVibrate([20])
    },
    [step, progress, triggerVibrate]
  )

  // Pointer Move for Swipe Cutting
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isSwiping || step !== 'cutting' || progress >= 100) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setKnifePath((prev) => [...prev.slice(-12), { x, y }])

      if (lastPointRef.current) {
        const dx = x - lastPointRef.current.x
        const dy = y - lastPointRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Convert client pixels to SVG viewBox space coordinates (0 to 500)
        const svgX = (x / rect.width) * 500
        const svgY = (y / rect.height) * 500
        const svgLastY = (lastPointRef.current.y / rect.height) * 500
        const svgDy = svgY - svgLastY

        // Track vertical cutting progress down the middle (x around 250 in viewBox units)
        const centerDist = Math.abs(svgX - 250)

        // If swipe is within center margin and moving down (widened to 90 units for thumb ease)
        if (centerDist < 90 && svgDy > 0 && dist > 3) {
          setProgress((prev) => {
            // Map cutting region from y=120 to y=380 (height 260 units in viewBox)
            const deltaProgress = (svgDy / 260) * 100
            const nextProg = Math.min(prev + deltaProgress, 100)

            // Spawn frosting splashes/crumbs (reduced density)
            if (Math.random() > 0.8) {
              const color = CRUMB_COLORS[Math.floor(Math.random() * CRUMB_COLORS.length)]
              setFrostingSplashes((prevSplashes) => [
                ...prevSplashes.slice(-8),
                {
                  id: particleId.current++,
                  x,
                  y,
                  color,
                  speed: 1.5 + Math.random() * 2,
                },
              ])
              triggerJiggle()
              triggerVibrate([15])
            }

            // Spawn floating hearts (reduced density)
            if (Math.random() > 0.95) {
              setFloatingHearts((prevHearts) => [
                ...prevHearts.slice(-3),
                {
                  id: particleId.current++,
                  x,
                  y,
                  speed: 1 + Math.random() * 1.5,
                },
              ])
            }

            // Trigger Celebration on completed cut
            if (nextProg >= 100 && prev < 100) {
              setTimeout(() => {
                triggerCelebration()
              }, 400)
            }

            return nextProg
          })
        }
        lastPointRef.current = { x, y }
      }
    },
    [isSwiping, step, progress, triggerJiggle, triggerVibrate]
  )

  // Pointer Up for Cutting
  const handlePointerUp = useCallback(() => {
    setIsSwiping(false)
    lastPointRef.current = null
    setTimeout(() => setKnifePath([]), 350)
  }, [])

  // Celebration sequence
  const triggerCelebration = () => {
    setStep('celebration')
    triggerVibrate([100, 50, 100, 50, 200])

    // Generate burst confetti (reduced count for smooth mobile performance)
    const newConfetti: Particle[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: 250 + (Math.random() * 20 - 10),
      y: 280 + (Math.random() * 20 - 10),
      color: ['#ff4d6d', '#ff8fa3', '#fff0f3', '#ffdca3', '#c084fc', '#fb7185', '#ffffff'][i % 7],
      size: 14 + Math.random() * 12,
      angle: Math.random() * 360,
      speed: 3 + Math.random() * 6,
    }))
    setConfetti(newConfetti)

    // Wait and switch to Final Gift reward
    setTimeout(() => {
      setStep('gift')
    }, 6500)
  }

  // Animation variants
  const leftHalfVariants = {
    closed: { x: 0, y: 0, rotate: 0 },
    open: {
      x: -45,
      y: 15,
      rotate: -7,
      transition: { type: 'spring', stiffness: 80, damping: 15, duration: 1.2 },
    },
  }

  const rightHalfVariants = {
    closed: { x: 0, y: 0, rotate: 0 },
    open: {
      x: 45,
      y: 15,
      rotate: 7,
      transition: { type: 'spring', stiffness: 80, damping: 15, duration: 1.2 },
    },
  }

  return (
    <div
      className="page-wrapper min-h-screen flex flex-col items-center justify-start py-8 px-4 overflow-x-hidden"
      style={{
        background: 'linear-gradient(to bottom, #fff7fb 0%, #ffeef7 50%, #fce7f3 100%)',
      }}
    >
      {/* Ambient backgrounds */}
      <AmbientDust />
      <AmbientSparkles />

      {/* Spotlight Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)',
        }}
      />

      <MusicPlayer />

      {/* Heart Confetti Burst */}
      <AnimatePresence>
        {confetti.length > 0 && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confetti.map((c) => (
              <motion.div
                key={c.id}
                className="absolute select-none font-bold"
                style={{
                  left: c.x,
                  top: c.y,
                  fontSize: `${c.size}px`,
                  color: c.color,
                  textShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
                initial={{ opacity: 1, scale: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0, 1.4, 0.8],
                  x: Math.cos((c.angle! * Math.PI) / 180) * c.speed! * 45,
                  y: Math.sin((c.angle! * Math.PI) / 180) * c.speed! * 45 - 80 + (c.id % 2 === 0 ? 250 : 350),
                  rotate: [0, c.angle! * 2],
                }}
                transition={{ duration: 2.2 + Math.random() * 0.8, ease: 'easeOut' }}
              >
                {c.id % 4 === 0 ? '💝' : c.id % 4 === 1 ? '✨' : c.id % 4 === 2 ? '💖' : '💕'}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="w-full max-w-md mx-auto z-10 flex flex-col items-center flex-grow justify-between">
        
        {/* Cat Companion */}
        <BubuCompanion step={step} blownCount={blownCount} catReaction={catReaction} />

        {/* Dynamic Titles */}
        <div className="text-center min-h-[90px] flex flex-col justify-center mb-4">
          <AnimatePresence mode="wait">
            {step === 'candles' && (
              <motion.div
                key="candles-title"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="heading-romantic text-3xl sm:text-4xl font-bold text-pink-600 drop-shadow-sm">
                  Make Your Birthday Wish ✨
                </h1>
                <p className="text-pink-400 text-sm font-medium mt-1.5 font-inter">
                  Every candle holds a little bit of birthday magic.
                </p>
              </motion.div>
            )}

            {step === 'unlock' && (
              <motion.div
                key="unlock-title"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="heading-romantic text-3xl sm:text-4xl font-bold text-pink-600">
                  {blownCount === 4 && progress < 100 && step === 'unlock' ? 'You did it ✨' : 'The cake is ready...'}
                </h1>
                <p className="text-pink-400 text-sm font-medium mt-1.5 font-inter">
                  Get ready for the final touch.
                </p>
              </motion.div>
            )}

            {step === 'cutting' && (
              <motion.div
                key="cutting-title"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <h1 className="heading-romantic text-3xl sm:text-4xl font-bold text-pink-600">
                  Cut the cake and share a slice 🎂
                </h1>
                <p className="text-pink-400 text-sm font-medium mt-1.5 font-inter">
                  Swipe vertically down the center line!
                </p>
              </motion.div>
            )}

            {step === 'celebration' && (
              <motion.div
                key="celebration-title"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="heading-romantic text-3xl sm:text-4xl font-bold text-pink-600">
                  Yay! We did it! 🎉
                </h1>
                <p className="text-pink-400 text-sm font-medium mt-1.5 font-inter">
                  A sweet surprise inside for you...
                </p>
              </motion.div>
            )}

            {step === 'gift' && (
              <motion.div
                key="gift-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="heading-romantic text-3xl sm:text-4xl font-bold text-pink-600">
                  For Shreyasi, with Love ❤️
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Small Progress Badge */}
        <AnimatePresence>
          {step === 'candles' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="px-4 py-1.5 rounded-full border border-pink-200/80 bg-white/70 backdrop-blur-md flex items-center gap-2 mb-6"
              style={{ boxShadow: '0 4px 16px rgba(244, 63, 94, 0.04)' }}
            >
              <span className="flex gap-0.5 text-xs">
                {candles.map((c, i) => (
                  <span key={i} className="filter drop-shadow-sm">
                    {c === 'lit' ? '🕯️' : '💨'}
                  </span>
                ))}
              </span>
              <span className="w-px h-3 bg-pink-200" />
              <span className="text-xs font-bold text-pink-500 font-inter tracking-wide uppercase">
                {blownCount} / 4 candles
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Cutting progress bar overlay (only when cutting) ── */}
        <AnimatePresence>
          {step === 'cutting' && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              className="w-48 h-2.5 rounded-full bg-pink-100 border border-pink-200/50 overflow-hidden mb-6"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400 shadow-sm"
                style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ THE CAKE STAGE ═══ */}
        <div className="relative flex items-center justify-center w-full min-h-[360px] max-w-sm mb-6 flex-grow">
          {/* Cake Glowing Effect when unlocked */}
          <AnimatePresence>
            {step === 'unlock' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: [0, 0.7, 0.3, 0.7, 0],
                  scale: [1, 1.08, 1, 1.08, 1],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3.5, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-rose-300/20 blur-3xl pointer-events-none z-0"
              />
            )}
          </AnimatePresence>

          {/* Secret Message Revealed Behind Sliced Cake */}
          <AnimatePresence>
            {(step === 'celebration' || step === 'gift') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                transition={{ delay: 0.8, duration: 1.2, type: 'spring', damping: 12 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none"
              >
                <div
                  className="px-6 py-5 rounded-3xl border border-pink-200/40 bg-white/75 backdrop-blur-md shadow-md max-w-[280px]"
                  style={{
                    boxShadow: '0 6px 18px rgba(244, 63, 94, 0.04)',
                  }}
                >
                  <p
                    className="text-2.5xl font-bold leading-relaxed text-pink-500 drop-shadow-sm select-none"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    Every year with you is my favorite year ❤️
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slices of Cake Grouped in SVG */}
          <motion.div
            key="cake-box"
            animate={cakeJiggle ? { rotate: [-1.5, 1.5, -1, 1, 0], scale: [1, 1.02, 0.98, 1] } : {}}
            transition={{ duration: 0.4 }}
            style={{ width: '75%', maxWidth: '320px' }}
            className="relative z-10 flex justify-center items-center touch-none select-none"
          >
            <div
              ref={containerRef}
              className="w-full relative"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Main SVG Container */}
              <svg viewBox="0 0 500 500" className="w-full overflow-visible">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="partyHatGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                  <linearGradient id="plateGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#f3f4f6" />
                    <stop offset="100%" stopColor="#e5e7eb" />
                  </linearGradient>
                  <linearGradient id="bottomTierGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffe4e6" />
                    <stop offset="40%" stopColor="#fbcfe8" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                  <linearGradient id="topTierGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff1f2" />
                    <stop offset="40%" stopColor="#ffe4e6" />
                    <stop offset="100%" stopColor="#fda4af" />
                  </linearGradient>
                  <linearGradient id="creamDripGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#db2777" />
                  </linearGradient>
                  <linearGradient id="creamTopGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="100%" stopColor="#ffe4e6" />
                  </linearGradient>
                  <linearGradient id="cakeCutSponge" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ffe8bd" />
                    <stop offset="20%" stopColor="#ffdca3" />
                    <stop offset="45%" stopColor="#f43f5e" /> {/* Strawberry filling */}
                    <stop offset="55%" stopColor="#f43f5e" />
                    <stop offset="80%" stopColor="#ffdca3" />
                    <stop offset="100%" stopColor="#ffe8bd" />
                  </linearGradient>
                  <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                  </radialGradient>
                  <filter id="shadowFilter">
                    <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#db2777" floodOpacity="0.06" />
                  </filter>

                  {/* Left & Right Clips for perfect split */}
                  <clipPath id="left-half-clip">
                    <rect x="-100" y="-100" width="350" height="700" />
                  </clipPath>
                  <clipPath id="right-half-clip">
                    <rect x="250" y="-100" width="350" height="700" />
                  </clipPath>
                </defs>

                {/* Plate Shadow underneath */}
                <ellipse cx="250" cy="405" rx="200" ry="24" fill="rgba(244, 63, 94, 0.05)" />

                {/* ═══ LEFT HALF OF CAKE ═══ */}
                <motion.g
                  clipPath="url(#left-half-clip)"
                  variants={leftHalfVariants}
                  initial="closed"
                  animate={step === 'celebration' || step === 'gift' ? 'open' : 'closed'}
                >
                  {/* Left Plate half */}
                  <ellipse cx="250" cy="400" rx="190" ry="22" fill="url(#plateGrad)" stroke="#e5e7eb" strokeWidth="1" />
                  <ellipse cx="250" cy="397" rx="180" ry="19" fill="none" stroke="rgba(219, 39, 119, 0.1)" strokeWidth="1.5" />

                  {/* Left Bottom Tier */}
                  {/* Bottom Tier shadow */}
                  <ellipse cx="250" cy="365" rx="155" ry="15" fill="rgba(0,0,0,0.03)" />
                  {/* Side wall */}
                  <path d="M 80 280 A 170 45 0 0 0 250 325 L 250 405 A 170 45 0 0 1 80 360 Z" fill="url(#bottomTierGrad)" />
                  {/* Top face */}
                  <ellipse cx="250" cy="280" rx="170" ry="45" fill="#ffe4e6" stroke="#fbcfe8" strokeWidth="1" />

                  {/* Left Bottom Frosting Wave */}
                  <path d="M 80 280 Q 110 295 130 282 Q 150 270 170 282 Q 190 295 210 282 Q 230 270 250 282" fill="none" stroke="#f472b6" strokeWidth="6" strokeLinecap="round" opacity="0.7" />

                  {/* Cream dots along bottom edge */}
                  {[90, 115, 140, 165, 190, 215, 240].map((cx, idx) => (
                    <circle key={`pearl-b-l-${idx}`} cx={cx} cy={356 + (cx - 250) ** 2 / 3000} r="3" fill="#fff" stroke="#fbcfe8" strokeWidth="0.5" />
                  ))}

                  {/* Left Top Tier */}
                  {/* Top Tier side wall */}
                  <path d="M 130 190 A 120 32 0 0 0 250 222 L 250 302 A 120 32 0 0 1 130 270 Z" fill="url(#topTierGrad)" />
                  {/* Top face */}
                  <ellipse cx="250" cy="190" rx="120" ry="32" fill="#fff1f2" stroke="#ffe4e6" strokeWidth="1" />

                  {/* Left Top Frosting Wave */}
                  <path d="M 130 190 Q 150 200 170 191 Q 190 182 210 191 Q 230 200 250 191" fill="none" stroke="#fda4af" strokeWidth="5" strokeLinecap="round" opacity="0.8" />

                  {/* Cream swirls top edge left */}
                  {[135, 160, 185, 210, 235].map((cx, idx) => (
                    <g key={`pip-t-l-${idx}`} transform={`translate(${cx}, ${190 + (cx - 250) ** 2 / 1800})`}>
                      <ellipse cx="0" cy="0" rx="6" ry="4" fill="url(#creamTopGrad)" />
                      <circle cx="-1" cy="-1.5" r="1.5" fill="#fff" />
                    </g>
                  ))}

                  {/* Strawberries left side */}
                  <g transform="translate(160, 262)">
                    <ellipse cx="0" cy="0" rx="10" ry="12" fill="#f43f5e" />
                    <ellipse cx="-2.5" cy="-2.5" rx="1.5" ry="2" fill="#ffccd5" opacity="0.6" />
                    <path d="M-3,-10 L0,-6 L3,-10" fill="#4ade80" />
                  </g>
                  <g transform="translate(210, 282)">
                    <ellipse cx="0" cy="0" rx="9" ry="11" fill="#e11d48" />
                    <ellipse cx="-2.5" cy="-2.5" rx="1.5" ry="2" fill="#ffccd5" opacity="0.6" />
                    <path d="M-3,-9 L0,-5 L3,-9" fill="#4ade80" />
                  </g>

                  {/* Decorative Bow at Front Center */}
                  <g id="bottom-tier-bow-l">
                    {/* Left Loop */}
                    <path d="M 250 325 Q 232 312 225 325 Q 232 338 250 325 Z" fill="#f43f5e" stroke="#db2777" strokeWidth="1" />
                    <path d="M 250 325 Q 236 318 232 325 Z" fill="#ffe4e6" opacity="0.4" />
                    {/* Right Loop */}
                    <path d="M 250 325 Q 268 312 275 325 Q 268 338 250 325 Z" fill="#f43f5e" stroke="#db2777" strokeWidth="1" />
                    <path d="M 250 325 Q 264 318 268 325 Z" fill="#ffe4e6" opacity="0.4" />
                    {/* Left Ribbon Tail */}
                    <path d="M 250 325 Q 238 340 236 352" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                    {/* Right Ribbon Tail */}
                    <path d="M 250 325 Q 262 340 264 352" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                    {/* Knot in Center */}
                    <circle cx="250" cy="325" r="4.5" fill="#e11d48" stroke="#be185d" strokeWidth="0.8" />
                    <circle cx="249" cy="323.8" r="1.5" fill="#fff" opacity="0.6" />
                  </g>

                  {/* Inside Cut Face: Revealed when splitting left */}
                  <g transform="translate(0, 0)">
                    {/* Top Tier Slice face */}
                    <path d="M 250 158 L 250 222 L 250 302 L 250 238 Z" fill="url(#cakeCutSponge)" stroke="#f472b6" strokeWidth="1.5" />
                    {/* Cream layers on top cut face */}
                    <path d="M 250 185 L 250 188 M 250 210 L 250 213 M 250 265 L 250 268" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                    {/* Bottom Tier Slice face */}
                    <path d="M 250 235 L 250 325 L 250 405 L 250 315 Z" fill="url(#cakeCutSponge)" stroke="#f472b6" strokeWidth="1.5" />
                    {/* Cream layers on bottom cut face */}
                    <path d="M 250 268 L 250 271 M 250 295 L 250 298 M 250 355 L 250 358" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                  </g>
                </motion.g>

                {/* ═══ RIGHT HALF OF CAKE ═══ */}
                <motion.g
                  clipPath="url(#right-half-clip)"
                  variants={rightHalfVariants}
                  initial="closed"
                  animate={step === 'celebration' || step === 'gift' ? 'open' : 'closed'}
                >
                  {/* Right Plate half */}
                  <ellipse cx="250" cy="400" rx="190" ry="22" fill="url(#plateGrad)" stroke="#e5e7eb" strokeWidth="1" />
                  <ellipse cx="250" cy="397" rx="180" ry="19" fill="none" stroke="rgba(219, 39, 119, 0.1)" strokeWidth="1.5" />

                  {/* Right Bottom Tier */}
                  {/* Bottom Tier shadow */}
                  <ellipse cx="250" cy="365" rx="155" ry="15" fill="rgba(0,0,0,0.03)" />
                  {/* Side wall */}
                  <path d="M 250 325 A 170 45 0 0 0 420 280 L 420 360 A 170 45 0 0 1 250 405 Z" fill="url(#bottomTierGrad)" />
                  {/* Top face */}
                  <ellipse cx="250" cy="280" rx="170" ry="45" fill="#ffe4e6" stroke="#fbcfe8" strokeWidth="1" />

                  {/* Right Bottom Frosting Wave */}
                  <path d="M 250 282 Q 270 270 290 282 Q 310 295 330 282 Q 350 270 370 282 Q 400 295 420 280" fill="none" stroke="#f472b6" strokeWidth="6" strokeLinecap="round" opacity="0.7" />

                  {/* Cream dots along bottom edge */}
                  {[265, 290, 315, 340, 365, 390, 410].map((cx, idx) => (
                    <circle key={`pearl-b-r-${idx}`} cx={cx} cy={356 + (cx - 250) ** 2 / 3000} r="3" fill="#fff" stroke="#fbcfe8" strokeWidth="0.5" />
                  ))}

                  {/* Right Top Tier */}
                  {/* Top Tier side wall */}
                  <path d="M 250 222 A 120 32 0 0 0 370 190 L 370 270 A 120 32 0 0 1 250 302 Z" fill="url(#topTierGrad)" />
                  {/* Top face */}
                  <ellipse cx="250" cy="190" rx="120" ry="32" fill="#fff1f2" stroke="#ffe4e6" strokeWidth="1" />

                  {/* Right Top Frosting Wave */}
                  <path d="M 250 191 Q 270 200 290 191 Q 310 182 330 191 Q 350 200 370 190" fill="none" stroke="#fda4af" strokeWidth="5" strokeLinecap="round" opacity="0.8" />

                  {/* Cream swirls top edge right */}
                  {[265, 290, 315, 340, 365].map((cx, idx) => (
                    <g key={`pip-t-r-${idx}`} transform={`translate(${cx}, ${190 + (cx - 250) ** 2 / 1800})`}>
                      <ellipse cx="0" cy="0" rx="6" ry="4" fill="url(#creamTopGrad)" />
                      <circle cx="-1" cy="-1.5" r="1.5" fill="#fff" />
                    </g>
                  ))}

                  {/* Strawberries right side */}
                  <g transform="translate(340, 262)">
                    <ellipse cx="0" cy="0" rx="10" ry="12" fill="#f43f5e" />
                    <ellipse cx="-2.5" cy="-2.5" rx="1.5" ry="2" fill="#ffccd5" opacity="0.6" />
                    <path d="M-3,-10 L0,-6 L3,-10" fill="#4ade80" />
                  </g>
                  <g transform="translate(290, 280)">
                    <ellipse cx="0" cy="0" rx="9" ry="11" fill="#e11d48" />
                    <ellipse cx="-2.5" cy="-2.5" rx="1.5" ry="2" fill="#ffccd5" opacity="0.6" />
                    <path d="M-3,-9 L0,-5 L3,-9" fill="#4ade80" />
                  </g>

                  {/* Decorative Bow at Front Center */}
                  <g id="bottom-tier-bow-r">
                    {/* Left Loop */}
                    <path d="M 250 325 Q 232 312 225 325 Q 232 338 250 325 Z" fill="#f43f5e" stroke="#db2777" strokeWidth="1" />
                    <path d="M 250 325 Q 236 318 232 325 Z" fill="#ffe4e6" opacity="0.4" />
                    {/* Right Loop */}
                    <path d="M 250 325 Q 268 312 275 325 Q 268 338 250 325 Z" fill="#f43f5e" stroke="#db2777" strokeWidth="1" />
                    <path d="M 250 325 Q 264 318 268 325 Z" fill="#ffe4e6" opacity="0.4" />
                    {/* Left Ribbon Tail */}
                    <path d="M 250 325 Q 238 340 236 352" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                    {/* Right Ribbon Tail */}
                    <path d="M 250 325 Q 262 340 264 352" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                    {/* Knot in Center */}
                    <circle cx="250" cy="325" r="4.5" fill="#e11d48" stroke="#be185d" strokeWidth="0.8" />
                    <circle cx="249" cy="323.8" r="1.5" fill="#fff" opacity="0.6" />
                  </g>

                  {/* Inside Cut Face: Revealed when splitting right */}
                  <g transform="translate(0, 0)">
                    {/* Top Tier Slice face */}
                    <path d="M 250 158 L 250 222 L 250 302 L 250 238 Z" fill="url(#cakeCutSponge)" stroke="#f472b6" strokeWidth="1.5" />
                    {/* Cream layers on top cut face */}
                    <path d="M 250 185 L 250 188 M 250 210 L 250 213 M 250 265 L 250 268" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                    {/* Bottom Tier Slice face */}
                    <path d="M 250 235 L 250 325 L 250 405 L 250 315 Z" fill="url(#cakeCutSponge)" stroke="#f472b6" strokeWidth="1.5" />
                    {/* Cream layers on bottom cut face */}
                    <path d="M 250 268 L 250 271 M 250 295 L 250 298 M 250 355 L 250 358" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                  </g>
                </motion.g>

                {/* ═══ TEXT ON CAKE TOP ═══ */}
                {/* Text splits beautifully too because it sits in both groups and gets clipped */}
                {/* Left Text */}
                <motion.g
                  clipPath="url(#left-half-clip)"
                  variants={leftHalfVariants}
                  initial="closed"
                  animate={step === 'celebration' || step === 'gift' ? 'open' : 'closed'}
                >
                  <text
                    x="250"
                    y="196"
                    textAnchor="middle"
                    fill="#be185d"
                    fontSize="21"
                    fontWeight="800"
                    letterSpacing="1"
                    fontFamily="'Dancing Script', cursive"
                    opacity="0.85"
                  >
                    Shreyasi 💖
                  </text>
                  <text
                    x="250"
                    y="195"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="21"
                    fontWeight="800"
                    letterSpacing="1"
                    fontFamily="'Dancing Script', cursive"
                  >
                    Shreyasi 💖
                  </text>
                </motion.g>
                {/* Right Text */}
                <motion.g
                  clipPath="url(#right-half-clip)"
                  variants={rightHalfVariants}
                  initial="closed"
                  animate={step === 'celebration' || step === 'gift' ? 'open' : 'closed'}
                >
                  <text
                    x="250"
                    y="196"
                    textAnchor="middle"
                    fill="#be185d"
                    fontSize="21"
                    fontWeight="800"
                    letterSpacing="1"
                    fontFamily="'Dancing Script', cursive"
                    opacity="0.85"
                  >
                    Shreyasi 💖
                  </text>
                  <text
                    x="250"
                    y="195"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="21"
                    fontWeight="800"
                    letterSpacing="1"
                    fontFamily="'Dancing Script', cursive"
                  >
                    Shreyasi 💖
                  </text>
                </motion.g>

                {/* ═══ CANDLES (Only shown in candles/unlock/cutting steps) ═══ */}
                {step !== 'celebration' && step !== 'gift' && (
                  <g>
                    {candles.map((state, i) => {
                      // Positions curved on the top ellipse
                      const candlePositions = [
                        { x: 170, y: 175 },
                        { x: 220, y: 205 },
                        { x: 280, y: 205 },
                        { x: 330, y: 175 },
                      ]
                      const pos = candlePositions[i]

                      return (
                        <g
                          key={`candle-${i}`}
                          transform={`translate(${pos.x}, ${pos.y})`}
                          onClick={() => handleCandleTap(i)}
                          className={state === 'lit' ? 'cursor-pointer' : 'pointer-events-none'}
                        >
                          {/* Candle Shadow */}
                          <ellipse cx="0" cy="5" rx="5" ry="2.5" fill="rgba(0,0,0,0.15)" />

                          {/* Candle stick */}
                          <rect
                            x="-5"
                            y="-35"
                            width="10"
                            height="40"
                            rx="3"
                            fill={i % 2 === 0 ? '#fbcfe8' : '#c084fc'}
                            stroke={i % 2 === 0 ? '#f472b6' : '#a855f7'}
                            strokeWidth="1"
                          />
                          {/* Stripes */}
                          <path d="M-5,-25 L5,-20" stroke="#fff" strokeWidth="2.5" opacity="0.6" />
                          <path d="M-5,-15 L5,-10" stroke="#fff" strokeWidth="2.5" opacity="0.6" />
                          <path d="M-5,-5 L5,0" stroke="#fff" strokeWidth="2.5" opacity="0.6" />

                          {/* Wick */}
                          <line x1="0" y1="-35" x2="0" y2="-42" stroke="#4b5563" strokeWidth="1.5" />

                          {/* Flame animations */}
                          <AnimatePresence>
                            {state === 'lit' && (
                              <motion.g
                                animate={{
                                  scaleY: [1, 1.15, 0.95, 1.08, 1],
                                  scaleX: [1, 0.92, 1.08, 0.95, 1],
                                  rotate: [0, -3, 3, -1.5, 0],
                                }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                  duration: 1.1 + i * 0.15,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
                                style={{ transformOrigin: '0px -40px' }}
                              >
                                {/* Outer Glow */}
                                <circle cx="0" cy="-52" r="16" fill="url(#flameGlow)" />
                                {/* Main Orange Flame */}
                                <ellipse cx="0" cy="-50" rx="5.5" ry="11" fill="#f59e0b" />
                                {/* Inner Yellow Flame */}
                                <ellipse cx="0" cy="-48" rx="3.2" ry="7" fill="#fbbf24" />
                                {/* Core White Flame */}
                                <ellipse cx="0" cy="-46" rx="1.8" ry="4" fill="#ffffff" />
                              </motion.g>
                            )}

                            {state === 'blowing' && (
                              <motion.g
                                initial={{ scale: 1, rotate: 0 }}
                                animate={{
                                  scale: [1, 1.4, 0.6, 0],
                                  x: [0, 8, 14, 20],
                                  y: [0, -2, -6, -10],
                                  rotate: [0, 15, 30, 45],
                                }}
                                transition={{ duration: 0.5 }}
                                style={{ transformOrigin: '0px -40px' }}
                              >
                                <ellipse cx="0" cy="-50" rx="5.5" ry="11" fill="#f59e0b" />
                                <ellipse cx="0" cy="-48" rx="3.2" ry="7" fill="#fbbf24" />
                              </motion.g>
                            )}
                          </AnimatePresence>
                        </g>
                      )
                    })}
                  </g>
                )}

                {/* ═══ CUTTING GUIDE LINE (Only in cutting step) ═══ */}
                {step === 'cutting' && (
                  <motion.line
                    x1="250"
                    y1="120"
                    x2="250"
                    y2="380"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeDasharray="8 8"
                    style={{ filter: 'drop-shadow(0 0 5px rgba(244,63,94,0.6))' }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                )}
              </svg>

              {/* Knife Path Trail */}
              {knifePath.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-30">
                  <polyline
                    points={knifePath.map((p) => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points={knifePath.map((p) => `${p.x},${p.y}`).join(' ')}
                    fill="none"
                    stroke="#fbcfe8"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.4"
                  />
                </svg>
              )}

              {/* Smoke Particles */}
              <AnimatePresence>
                {smokeParticles.map((p) => (
                  <motion.div
                    key={`smoke-${p.id}`}
                    className="absolute w-3.5 h-3.5 rounded-full bg-gray-200/50 pointer-events-none"
                    style={{ left: p.x, top: p.y }}
                    initial={{ scale: 0.5, opacity: 0.8, y: 0 }}
                    animate={{
                      scale: [0.5, 2.5, 3.5],
                      opacity: [0.8, 0.4, 0],
                      y: -45 - Math.random() * 20,
                      x: (Math.random() - 0.5) * 20,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                ))}
              </AnimatePresence>

              {/* Candle Blow Sparkles */}
              <AnimatePresence>
                {blowSparkles.map((p) => (
                  <motion.div
                    key={`sparkle-${p.id}`}
                    className="absolute text-yellow-300 pointer-events-none text-xs"
                    style={{ left: p.x, top: p.y }}
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      scale: [0, 1.2, 0.5],
                      x: Math.cos((p.angle! * Math.PI) / 180) * p.speed! * 12,
                      y: Math.sin((p.angle! * Math.PI) / 180) * p.speed! * 12 - 5,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    ✨
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Cutting Crumbs / Splashes */}
              <AnimatePresence>
                {frostingSplashes.map((p) => (
                  <motion.div
                    key={`splash-${p.id}`}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      left: p.x,
                      top: p.y,
                      width: 5 + Math.random() * 5,
                      height: 5 + Math.random() * 5,
                      backgroundColor: p.color,
                    }}
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{
                      scale: [1, 1.5, 0.2],
                      opacity: [1, 0.8, 0],
                      x: (Math.random() - 0.5) * 45,
                      y: (Math.random() - 0.5) * 45 + 15,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                  />
                ))}
              </AnimatePresence>

              {/* Floating Hearts from slice */}
              <AnimatePresence>
                {floatingHearts.map((h) => (
                  <motion.div
                    key={`fheart-${h.id}`}
                    className="absolute text-rose-400 pointer-events-none select-none text-sm z-30"
                    style={{ left: h.x, top: h.y }}
                    initial={{ scale: 0, opacity: 0, y: 0 }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0, 0.9, 0],
                      y: -50 - Math.random() * 30,
                      x: (Math.random() - 0.5) * 30,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                  >
                    💖
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ═══ REWARD GIFT BOX AREA (Only in gift step) ═══ */}
        <div className="w-full flex flex-col items-center min-h-[160px] justify-center mt-2 z-30">
          <AnimatePresence>
            {step === 'gift' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="flex flex-col items-center text-center px-4"
              >
                {/* Premium Bobbing Gift Box */}
                <motion.div
                  className="text-7xl cursor-pointer drop-shadow-lg mb-4 select-none"
                  animate={{
                    y: [0, -12, 0],
                    scale: [1, 1.05, 0.98, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎁
                </motion.div>

                <p className="text-pink-600 font-bold text-sm tracking-wide mb-6 font-inter leading-relaxed max-w-[280px]">
                  You unlocked a little piece of Bubu's heart ❤️
                </p>

                {/* Continue button */}
                <motion.button
                  onClick={() => navigate('/quiz')} // TEMPORARILY SKIPPED // Will be redesigned later.
                  className="btn-rose flex items-center justify-center gap-2 px-10 py-4 text-base font-bold rounded-full font-inter tracking-wider uppercase"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: '0 4px 12px rgba(244, 63, 94, 0.15)',
                  }}
                >
                  Open It 💌
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default CakeCelebration
