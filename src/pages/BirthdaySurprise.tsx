import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedBackground from '../components/AnimatedBackground'
import MusicPlayer from '../components/MusicPlayer'

// ── Refined, slow animations for premium feel ──
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 1.2, // Very slow staggered reveal
      delayChildren: 0.8,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1], // Smooth, premium ease
    },
  },
}

// ── Gentle SVG Cat Companion ──
const CatCompanion: React.FC = () => {
  const [isBlinking, setIsBlinking] = useState(false)
  const [isSmiling, setIsSmiling] = useState(false)
  const [showSpeech, setShowSpeech] = useState(false)
  const [showHeart, setShowHeart] = useState(false)

  // Blinking logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 200) // 200ms blink duration
    }, 4000) // Blink every 4 seconds

    return () => clearInterval(blinkInterval)
  }, [])

  // Speech bubble logic
  useEffect(() => {
    const showTimer = setTimeout(() => setShowSpeech(true), 2500)
    const hideTimer = setTimeout(() => setShowSpeech(false), 7000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  // Interaction handler
  const handleTap = () => {
    if (isSmiling) return
    setIsSmiling(true)
    setShowHeart(true)
    setTimeout(() => {
      setIsSmiling(false)
      setShowHeart(false)
    }, 2000)
  }

  return (
    <div className="relative flex flex-col items-center mb-16">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute -top-14 bg-white/80 backdrop-blur-md px-5 py-2 rounded-2xl shadow-[0_4px_12px_rgba(219,39,119,0.05)] border border-pink-100/50 text-pink-600 text-sm font-inter tracking-wide whitespace-nowrap z-20"
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.2rem' }}
          >
            Look what Bubu made for you ✨
            {/* Bubble tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-solid border-t-white/80 border-t-8 border-x-transparent border-x-8 border-b-0" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Heart Interaction */}
      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -40, scale: 1.2 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute -top-4 right-8 text-xl z-20 pointer-events-none"
          >
            💖
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Cat */}
      <motion.div
        className="cursor-pointer"
        onClick={handleTap}
        // Slow, gentle breathing/floating (optimized for mobile)
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 200 200" width="140" height="140" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
          {/* Ears with subtle wiggle */}
          <motion.g
            animate={{ rotate: [0, 2, -1, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            style={{ transformOrigin: '70px 60px' }}
          >
            <polygon points="55,70 70,30 90,65" fill="#f9a8d4" stroke="#ec4899" strokeWidth="1.5" />
            <polygon points="62,65 72,40 85,62" fill="#fce7f3" />
          </motion.g>

          <motion.g
            animate={{ rotate: [0, -2, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
            style={{ transformOrigin: '130px 60px' }}
          >
            <polygon points="145,70 130,30 110,65" fill="#f9a8d4" stroke="#ec4899" strokeWidth="1.5" />
            <polygon points="138,65 128,40 115,62" fill="#fce7f3" />
          </motion.g>

          {/* Head */}
          <ellipse cx="100" cy="100" rx="55" ry="50" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
          
          {/* Blush */}
          <ellipse cx="70" cy="105" rx="8" ry="5" fill="#fda4af" opacity="0.4" />
          <ellipse cx="130" cy="105" rx="8" ry="5" fill="#fda4af" opacity="0.4" />

          {/* Eyes */}
          {isBlinking ? (
            <g>
              <line x1="75" y1="92" x2="85" y2="92" stroke="#6b21a8" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="115" y1="92" x2="125" y2="92" stroke="#6b21a8" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ) : isSmiling ? (
            <g>
              <path d="M72,92 Q78,85 84,92" fill="none" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" />
              <path d="M116,92 Q122,85 128,92" fill="none" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" />
              <circle cx="78" cy="90" r="1.5" fill="#6b21a8" />
              <circle cx="122" cy="90" r="1.5" fill="#6b21a8" />
            </g>
          ) : (
            <g>
              <circle cx="80" cy="92" r="4.5" fill="#6b21a8" />
              <circle cx="120" cy="92" r="4.5" fill="#6b21a8" />
              <circle cx="82" cy="90" r="1.5" fill="white" />
              <circle cx="122" cy="90" r="1.5" fill="white" />
            </g>
          )}

          {/* Nose */}
          <ellipse cx="100" cy="102" rx="3.5" ry="2.5" fill="#f472b6" />

          {/* Mouth */}
          {isSmiling ? (
            <path d="M92,108 Q100,116 108,108" fill="none" stroke="#6b21a8" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M94,107 Q100,111 106,107" fill="none" stroke="#6b21a8" strokeWidth="1.2" strokeLinecap="round" />
          )}

          {/* Whiskers */}
          <line x1="55" y1="95" x2="68" y2="98" stroke="#d8b4fe" strokeWidth="1" strokeLinecap="round" />
          <line x1="55" y1="103" x2="68" y2="102" stroke="#d8b4fe" strokeWidth="1" strokeLinecap="round" />
          <line x1="145" y1="95" x2="132" y2="98" stroke="#d8b4fe" strokeWidth="1" strokeLinecap="round" />
          <line x1="145" y1="103" x2="132" y2="102" stroke="#d8b4fe" strokeWidth="1" strokeLinecap="round" />

          {/* Paws */}
          <motion.g
            animate={isSmiling ? { y: [-2, 0] } : {}}
            transition={{ duration: 0.2, yoyo: Infinity }}
          >
            <ellipse cx="80" cy="145" rx="12" ry="7" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
            <ellipse cx="120" cy="145" rx="12" ry="7" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  )
}

const BirthdaySurprise: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div
      className="page-wrapper flex items-center justify-center"
      style={{
        // Soft, dreamy, desaturated gradient
        background: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 40%, #f3e8ff 80%, #faf5ff 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Minimal background elements: just a few soft sparkles and white hearts */}
      <AnimatedBackground density="light" emojis={['✨', '🤍', '✨']} />
      <MusicPlayer />

      <div className="relative z-10 max-w-lg mx-auto px-6 py-20 flex flex-col items-center">
        
        {/* ── Main Elegant Heading ── */}
        <motion.div
          className="mb-8 w-full flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-center leading-relaxed"
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: '#db2777', // Deep, elegant rose (tailwind pink-600)
              textShadow: '0 2px 10px rgba(219, 39, 119, 0.08)',
            }}
          >
            Happy Birthday<br />
            Misses Mukhi ✨
          </h1>
        </motion.div>

        {/* ── Returning Character: Gentle Cat ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          <CatCompanion />
        </motion.div>

        {/* ── Staggered Emotional Message ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center w-full flex flex-col gap-10 mb-20"
        >
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg sm:text-xl font-inter tracking-wide font-light"
          >
            Today is all about you.
          </motion.p>

          <div className="flex flex-col gap-4">
            <motion.p
              variants={itemVariants}
              className="text-pink-500 text-lg sm:text-xl font-inter tracking-widest uppercase text-xs"
            >
              Every smile.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-pink-500 text-lg sm:text-xl font-inter tracking-widest uppercase text-xs"
            >
              Every memory.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-pink-500 text-lg sm:text-xl font-inter tracking-widest uppercase text-xs"
            >
              Every little moment.
            </motion.p>
          </div>

          <div className="mt-8">
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg sm:text-xl font-inter tracking-wide font-light"
            >
              And before we continue...
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-pink-600 text-xl sm:text-2xl mt-4 leading-relaxed"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              I have a small surprise waiting for you ❤️
            </motion.p>
          </div>
        </motion.div>

        {/* ── Premium Minimal Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 6.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            onClick={() => navigate('/cake')}
            className="px-12 py-4 rounded-full font-inter text-white text-sm sm:text-base tracking-[0.15em] uppercase min-h-[48px] flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #db2777, #c084fc)',
              boxShadow: '0 6px 20px -6px rgba(219, 39, 119, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 8px 24px -4px rgba(219, 39, 119, 0.25)',
              background: 'linear-gradient(135deg, #e11d48, #d8b4fe)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            Open Your Surprise 🎁
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default BirthdaySurprise
