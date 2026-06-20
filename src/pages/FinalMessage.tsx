import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import MusicPlayer from '../components/MusicPlayer'

// ── 🎂 CUSTOMIZE: Replace with her name ──
const HER_NAME = 'My Love' // e.g. "Priya", "Ananya", "Sofia"

// ── 💌 CUSTOMIZE: Final message ──
const FINAL_MESSAGE =
  'Every single day with you feels like a gift. You are my favorite adventure, my safest place, and my greatest love. Thank you for being you — for all of it, the laughter, the messy parts, the quiet moments, all of it. I love you endlessly.'

// Subtle ambient decorations
const AMBIENT_ITEMS = [
  { id: 1, emoji: '❤️', x: 15, y: 25, size: 14, delay: 0 },
  { id: 2, emoji: '❤️', x: 85, y: 70, size: 12, delay: 1.5 },
  { id: 3, emoji: '❤️', x: 75, y: 15, size: 16, delay: 0.8 },
  { id: 4, emoji: '✨', x: 20, y: 65, size: 18, delay: 2.1 },
  { id: 5, emoji: '✨', x: 88, y: 35, size: 15, delay: 1.2 },
]

const FinalMessage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div
      className="page-wrapper flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fff1f2 0%, #fce7f3 40%, #f3e8ff 80%, #ede9fe 100%)',
        minHeight: '100vh',
      }}
    >
      <MusicPlayer />

      {/* Very Subtle Background Elements (Static for zero mobile GPU overhead) */}
      {AMBIENT_ITEMS.map((item) => (
        <div
          key={item.id}
          className="absolute select-none pointer-events-none opacity-[0.16]"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
          }}
        >
          {item.emoji}
        </div>
      ))}

      <div className="relative z-10 w-full max-w-xl mx-auto px-5 text-center py-12 flex flex-col items-center">
        {/* Elegant Heading */}
        <motion.h1
          className="mb-6 drop-shadow-sm"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            background: 'linear-gradient(135deg, #e11d48 0%, #c084fc 50%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.3,
            textShadow: '0 4px 12px rgba(225, 29, 72, 0.15)', // Subtle glow
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Happy Birthday,<br />{HER_NAME}!
        </motion.h1>

        {/* Handwritten Letter Card */}
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-10 w-full border border-pink-100/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          style={{
            boxShadow: '0 12px 40px rgba(244, 63, 94, 0.05), 0 2px 10px rgba(0, 0, 0, 0.02)',
          }}
        >
          <p
            className="text-[#4b5563] text-left font-medium font-inter"
            style={{ 
              fontSize: '1.15rem',
              lineHeight: '1.9',
              marginBottom: '28px'
            }}
          >
            {FINAL_MESSAGE}
          </p>

          <motion.div
            className="mt-10 text-right flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div
              className="text-rose-500 font-semibold flex items-center gap-2"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.8rem' }}
            >
              Forever Yours?
              <span className="inline-block origin-center select-none">
                ❤️
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Clean Premium Replay Button */}
        <motion.button
          onClick={() => navigate('/')}
          className="mt-8 px-8 py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-sm font-bold rounded-full font-inter tracking-wider uppercase transition-all min-h-[48px] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: '0 6px 18px rgba(244, 63, 94, 0.2)' }}
          whileTap={{ scale: 0.96 }}
          style={{
            boxShadow: '0 4px 12px rgba(244, 63, 94, 0.15)',
          }}
        >
          Replay the Journey
        </motion.button>
      </div>
    </div>
  )
}

export default FinalMessage
