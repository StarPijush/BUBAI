import React from 'react'
import { motion } from 'framer-motion'
import FlipCard from '../components/FlipCard'
import AnimatedBackground from '../components/AnimatedBackground'
import NavigationButtons from '../components/NavigationButtons'
import MusicPlayer from '../components/MusicPlayer'

// ── 💝 CUSTOMIZE: Replace with your own reasons ──
// Click each card to flip it and see the reason!
const REASONS = [
  'The way your eyes light up when you talk about something you love — I could watch that forever.',
  'You always know exactly when I need a hug without me having to say a word.',
  'Your laugh. Seriously. It should be illegal how much I love your laugh.',
  'The way you care so deeply for the people in your life. Your heart is so big.',
  'You make even the most boring errands feel like an adventure.',
  'You are the bravest person I know, even on the days you don\'t feel like it.',
  'The faces you make when you\'re trying not to laugh at something.',
  'How you always find the good in people, even when they don\'t deserve it.',
  'The way you sleep — yes, even when you steal my pillow.',
  'You challenge me to be better, without ever making me feel like I\'m not enough.',
  'Every single time you say my name.',
  'The fact that you chose me — and keep choosing me — every single day.',
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const ReasonsILoveYou: React.FC = () => {
  return (
    <div
      className="page-wrapper"
      style={{
        background: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 50%, #f3e8ff 100%)',
        minHeight: '100vh',
      }}
    >
      <AnimatedBackground density="medium" emojis={['💝', '💗', '💓', '✨', '🌷']} />
      <MusicPlayer />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-rose-400 text-xs font-inter tracking-widest uppercase mb-2">
            ✦ Tap Each Card ✦
          </p>
          <h1 className="heading-romantic text-4xl md:text-5xl mb-3">
            Why I Love You 💝
          </h1>
          <p className="text-gray-500 text-sm font-inter">
            {REASONS.length} reasons (and counting...) 💕
          </p>
        </motion.div>

        {/* Flip cards grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {REASONS.map((reason, index) => (
            <motion.div key={index} variants={item} className="h-40">
              <FlipCard
                className="h-40 w-full"
                front={
                  <div className="flex flex-col items-center gap-2">
                    <motion.span
                      className="text-3xl"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      💕
                    </motion.span>
                    <p
                      className="text-rose-500 font-semibold text-sm"
                      style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                      Reason #{index + 1}
                    </p>
                    <p className="text-gray-400 text-xs font-inter">tap to reveal</p>
                  </div>
                }
                back={
                  <p
                    className="text-white font-medium font-inter"
                    style={{ fontSize: '1.05rem', lineHeight: '1.6' }}
                  >
                    {reason}
                  </p>
                }
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Little note */}
        <motion.p
          className="text-center text-gray-400 text-xs font-inter mt-8 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          These are just the ones that fit on cards. The real list is infinite. 💫
        </motion.p>

        {/* Navigation */}
        <NavigationButtons
          prevPath="/cake"
          nextPath="/tribute"
          nextLabel="A Special Message"
          nextEmoji="💌"
        />
      </div>
    </div>
  )
}

export default ReasonsILoveYou
