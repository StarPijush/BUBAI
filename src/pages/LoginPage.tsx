import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'

// ── 🔐 CUSTOMIZE: Change the secret code here ──
const SECRET_CODE = 'bubu'

// ── 🐱 Hint messages for wrong answers ──
const HINT_MESSAGES = [
  'You call me this every day 💕',
  "It's not Bubai 😘",
  "It's not Surjit 😜",
  'Think of the nickname you use most 💌',
]

// ── 🐱 Cat SVG Components ──
const CatIdle: React.FC = () => (
  <svg viewBox="0 0 200 200" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    {/* Ears */}
    <polygon points="55,70 70,30 90,65" fill="#f9a8d4" stroke="#ec4899" strokeWidth="2" />
    <polygon points="145,70 130,30 110,65" fill="#f9a8d4" stroke="#ec4899" strokeWidth="2" />
    <polygon points="62,65 72,40 85,62" fill="#fce7f3" />
    <polygon points="138,65 128,40 115,62" fill="#fce7f3" />
    {/* Head */}
    <ellipse cx="100" cy="100" rx="55" ry="50" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
    {/* Eyes - cute closed happy */}
    <path d="M75,92 Q80,85 85,92" fill="none" stroke="#6b21a8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M115,92 Q120,85 125,92" fill="none" stroke="#6b21a8" strokeWidth="2.5" strokeLinecap="round" />
    {/* Blush */}
    <ellipse cx="70" cy="100" rx="8" ry="5" fill="#fda4af" opacity="0.5" />
    <ellipse cx="130" cy="100" rx="8" ry="5" fill="#fda4af" opacity="0.5" />
    {/* Nose */}
    <ellipse cx="100" cy="100" rx="4" ry="3" fill="#f472b6" />
    {/* Mouth */}
    <path d="M94,105 Q100,112 106,105" fill="none" stroke="#6b21a8" strokeWidth="1.5" strokeLinecap="round" />
    {/* Whiskers */}
    <line x1="55" y1="95" x2="78" y2="98" stroke="#d8b4fe" strokeWidth="1.2" />
    <line x1="55" y1="103" x2="78" y2="102" stroke="#d8b4fe" strokeWidth="1.2" />
    <line x1="145" y1="95" x2="122" y2="98" stroke="#d8b4fe" strokeWidth="1.2" />
    <line x1="145" y1="103" x2="122" y2="102" stroke="#d8b4fe" strokeWidth="1.2" />
    {/* Paws */}
    <ellipse cx="80" cy="148" rx="14" ry="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
    <ellipse cx="120" cy="148" rx="14" ry="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
    {/* Paw pads */}
    <circle cx="76" cy="148" r="2.5" fill="#f9a8d4" />
    <circle cx="84" cy="148" r="2.5" fill="#f9a8d4" />
    <circle cx="116" cy="148" r="2.5" fill="#f9a8d4" />
    <circle cx="124" cy="148" r="2.5" fill="#f9a8d4" />
  </svg>
)

const CatCrying: React.FC = () => (
  <svg viewBox="0 0 200 200" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    {/* Ears - droopy */}
    <polygon points="55,72 65,35 90,68" fill="#f9a8d4" stroke="#ec4899" strokeWidth="2" />
    <polygon points="145,72 135,35 110,68" fill="#f9a8d4" stroke="#ec4899" strokeWidth="2" />
    <polygon points="62,67 68,44 85,65" fill="#fce7f3" />
    <polygon points="138,67 132,44 115,65" fill="#fce7f3" />
    {/* Head */}
    <ellipse cx="100" cy="100" rx="55" ry="50" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
    {/* Eyes - sad */}
    <ellipse cx="80" cy="90" rx="8" ry="9" fill="white" stroke="#6b21a8" strokeWidth="1.5" />
    <ellipse cx="120" cy="90" rx="8" ry="9" fill="white" stroke="#6b21a8" strokeWidth="1.5" />
    <ellipse cx="80" cy="92" rx="4" ry="5" fill="#6b21a8" />
    <ellipse cx="120" cy="92" rx="4" ry="5" fill="#6b21a8" />
    <circle cx="82" cy="89" r="1.5" fill="white" />
    <circle cx="122" cy="89" r="1.5" fill="white" />
    {/* Sad eyebrows */}
    <path d="M70,80 Q78,76 88,82" fill="none" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" />
    <path d="M130,80 Q122,76 112,82" fill="none" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" />
    {/* Tears */}
    <ellipse cx="68" cy="102" rx="3" ry="5" fill="#93c5fd" opacity="0.7">
      <animate attributeName="cy" values="102;115;102" dur="1.2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.7;0;0.7" dur="1.2s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="132" cy="104" rx="3" ry="5" fill="#93c5fd" opacity="0.7">
      <animate attributeName="cy" values="104;117;104" dur="1.4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.7;0;0.7" dur="1.4s" repeatCount="indefinite" />
    </ellipse>
    {/* Extra tear drops */}
    <circle cx="65" cy="112" r="2" fill="#93c5fd" opacity="0.5">
      <animate attributeName="cy" values="112;125;112" dur="1.6s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0;0.5" dur="1.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="135" cy="114" r="2" fill="#93c5fd" opacity="0.5">
      <animate attributeName="cy" values="114;127;114" dur="1.3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0;0.5" dur="1.3s" repeatCount="indefinite" />
    </circle>
    {/* Blush */}
    <ellipse cx="70" cy="103" rx="8" ry="5" fill="#fda4af" opacity="0.4" />
    <ellipse cx="130" cy="103" rx="8" ry="5" fill="#fda4af" opacity="0.4" />
    {/* Nose */}
    <ellipse cx="100" cy="100" rx="4" ry="3" fill="#f472b6" />
    {/* Mouth - sad */}
    <path d="M92,112 Q100,106 108,112" fill="none" stroke="#6b21a8" strokeWidth="1.5" strokeLinecap="round" />
    {/* Whiskers - droopy */}
    <line x1="53" y1="100" x2="78" y2="100" stroke="#d8b4fe" strokeWidth="1.2" />
    <line x1="53" y1="108" x2="78" y2="105" stroke="#d8b4fe" strokeWidth="1.2" />
    <line x1="147" y1="100" x2="122" y2="100" stroke="#d8b4fe" strokeWidth="1.2" />
    <line x1="147" y1="108" x2="122" y2="105" stroke="#d8b4fe" strokeWidth="1.2" />
    {/* Paws */}
    <ellipse cx="80" cy="148" rx="14" ry="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
    <ellipse cx="120" cy="148" rx="14" ry="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
  </svg>
)

const CatHappy: React.FC = () => (
  <svg viewBox="0 0 200 200" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
    {/* Ears - perky */}
    <polygon points="52,68 68,22 92,62" fill="#f9a8d4" stroke="#ec4899" strokeWidth="2" />
    <polygon points="148,68 132,22 108,62" fill="#f9a8d4" stroke="#ec4899" strokeWidth="2" />
    <polygon points="60,62 70,34 86,59" fill="#fce7f3" />
    <polygon points="140,62 130,34 114,59" fill="#fce7f3" />
    {/* Head */}
    <ellipse cx="100" cy="100" rx="55" ry="50" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
    {/* Eyes - sparkly happy */}
    <path d="M72,90 L78,84 L84,90 L78,96 Z" fill="#6b21a8" />
    <path d="M116,90 L122,84 L128,90 L122,96 Z" fill="#6b21a8" />
    {/* Sparkle on eyes */}
    <circle cx="76" cy="87" r="1.5" fill="white" />
    <circle cx="120" cy="87" r="1.5" fill="white" />
    {/* Blush - more vibrant */}
    <ellipse cx="68" cy="102" rx="10" ry="6" fill="#fda4af" opacity="0.6" />
    <ellipse cx="132" cy="102" rx="10" ry="6" fill="#fda4af" opacity="0.6" />
    {/* Nose */}
    <ellipse cx="100" cy="100" rx="4" ry="3" fill="#f472b6" />
    {/* Mouth - big smile */}
    <path d="M88,105 Q94,116 100,116 Q106,116 112,105" fill="none" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" />
    {/* Whiskers - perky */}
    <line x1="50" y1="92" x2="76" y2="97" stroke="#d8b4fe" strokeWidth="1.2" />
    <line x1="50" y1="100" x2="76" y2="101" stroke="#d8b4fe" strokeWidth="1.2" />
    <line x1="150" y1="92" x2="124" y2="97" stroke="#d8b4fe" strokeWidth="1.2" />
    <line x1="150" y1="100" x2="124" y2="101" stroke="#d8b4fe" strokeWidth="1.2" />
    {/* Paws - raised in celebration */}
    <ellipse cx="70" cy="142" rx="14" ry="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" transform="rotate(-15 70 142)" />
    <ellipse cx="130" cy="142" rx="14" ry="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" transform="rotate(15 130 142)" />
    {/* Hearts near happy cat */}
    <text x="38" y="60" fontSize="14" opacity="0.8">💖</text>
    <text x="148" y="55" fontSize="12" opacity="0.8">💕</text>
    <text x="30" y="130" fontSize="10" opacity="0.6">✨</text>
    <text x="160" y="125" fontSize="10" opacity="0.6">✨</text>
  </svg>
)

// ── Cat states ──
type CatState = 'idle' | 'crying' | 'happy'

const LoginPage: React.FC = () => {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const [catState, setCatState] = useState<CatState>('idle')
  const [hintMessage, setHintMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const hintIndexRef = useRef(0)
  const navigate = useNavigate()

  // Reset cat to idle after crying
  useEffect(() => {
    if (catState === 'crying') {
      const timer = setTimeout(() => setCatState('idle'), 3000)
      return () => clearTimeout(timer)
    }
  }, [catState])

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === SECRET_CODE.toLowerCase()) {
      setCatState('happy')
      setSuccess(true)
      setError(false)
      setTimeout(() => navigate('/letter'), 2000)
    } else {
      setError(true)
      setShake(true)
      setCatState('crying')
      // Cycle through hints
      setHintMessage(HINT_MESSAGES[hintIndexRef.current % HINT_MESSAGES.length])
      hintIndexRef.current += 1
      setTimeout(() => setShake(false), 600)
      setTimeout(() => setError(false), 3000)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div
      className="page-wrapper flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #fff1f2 0%, #fce7f3 40%, #f3e8ff 80%, #ede9fe 100%)',
        minHeight: '100vh',
      }}
    >
      <AnimatedBackground density="medium" />

      <motion.div
        className="relative z-10 w-full max-w-sm mx-4"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glowing card */}
        <motion.div
          className="glass-card rounded-3xl p-6 sm:p-8 text-center"
          animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* 🐱 Animated Cat */}
          <motion.div
            className="mx-auto mb-4 flex items-center justify-center"
            animate={
              catState === 'idle'
                ? { y: [0, -2, 0], rotate: [0, 0.5, -0.5, 0] }
                : catState === 'crying'
                  ? { y: [0, 2, 0], rotate: [0, -3, 3, -3, 0] }
                  : { y: [0, -12, 0], scale: [1, 1.15, 1], rotate: [0, 5, -5, 5, 0] }
            }
            transition={{
              duration: catState === 'happy' ? 0.6 : catState === 'crying' ? 0.8 : 6.0,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <AnimatePresence mode="wait">
              {catState === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <CatIdle />
                </motion.div>
              )}
              {catState === 'crying' && (
                <motion.div
                  key="crying"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <CatCrying />
                </motion.div>
              )}
              {catState === 'happy' && (
                <motion.div
                  key="happy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <CatHappy />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ✨ Sparkles & Hearts on success */}
          <AnimatePresence>
            {success && (
              <>
                {['💖', '✨', '💕', '🌟', '💗', '✨'].map((emoji, i) => (
                  <motion.span
                    key={`sparkle-${i}`}
                    className="absolute pointer-events-none text-lg"
                    style={{
                      left: `${15 + i * 14}%`,
                      top: `${10 + (i % 3) * 15}%`,
                    }}
                    initial={{ opacity: 0, scale: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.3, 0.5],
                      y: [0, -30 - i * 8, -50],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.15,
                      ease: 'easeOut',
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Title */}
          <h1 className="heading-romantic text-2xl sm:text-3xl mb-1">
            💌 Do You Remember What You Call Me?
          </h1>
          <p className="text-gray-500 text-sm font-inter mb-6 leading-relaxed">
            You say this name every day... 😘
          </p>

          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your answer..."
            className="w-full px-4 py-3 min-h-[48px] rounded-2xl text-center text-sm font-inter outline-none mb-4"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: error ? '1.5px solid #f43f5e' : '1.5px solid rgba(244,63,94,0.25)',
              color: '#374151',
              letterSpacing: '0.08em',
              transition: 'border-color 0.3s',
            }}
            autoFocus
            disabled={success}
          />

          {/* Error / Hint message */}
          <AnimatePresence>
            {error && (
              <motion.p
                className="text-rose-500 text-xs mb-3 font-inter"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {hintMessage}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Success message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="mb-3"
              >
                <p className="text-fuchsia-600 text-sm font-semibold font-inter">
                  Yay! You remembered 💖
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.button
            onClick={handleSubmit}
            className="btn-rose w-full flex items-center justify-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={success}
            style={success ? { opacity: 0.6, pointerEvents: 'none' } : {}}
          >
            <Heart size={16} fill="white" />
            {success ? 'Opening... 💕' : 'Open the Surprise'}
          </motion.button>

          {/* Hint */}
          <p className="text-gray-300 text-xs mt-5 font-inter italic">
            psst... you know what it is 🤫
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage
