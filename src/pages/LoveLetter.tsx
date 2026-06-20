import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import AnimatedBackground from '../components/AnimatedBackground'
import NavigationButtons from '../components/NavigationButtons'
import MusicPlayer from '../components/MusicPlayer'
import { useMusic } from '../context/MusicContext'

// ── 💌 CUSTOMIZE: Edit the love letter content below ──
const LETTER = {
  // Replace with her name
  name: 'My Love',
  // Replace with your name
  senderName: 'Yours Forever',
  // Edit each paragraph of your letter
  paragraphs: [
    `From the very first moment I saw you, something shifted in my world — like all the colors got a little brighter and the air a little sweeter. You walked in and somehow, without even trying, you made everything feel more alive.`,
    `Every day with you is a gift I never expected but could never imagine living without. Your laughter is my favorite sound. Your smile is my favorite sight. Your heart is my favorite place to call home.`,
    `I still can't believe I get to be the person who loves you — the one you call when something amazing happens, the one who gets to hold your hand, the one who knows that you steal all the blankets and somehow that's adorable.`,
    `Today, on your birthday, I want you to know: you are extraordinary. Not just to me, but to everyone lucky enough to know you. You carry warmth wherever you go, and the world is genuinely better because you're in it.`,
    `Happy Birthday, my darling. This little surprise is just a tiny way of saying: I love you more than words can hold. Now come see what I've made for you... 💖`,
  ],
}

const LoveLetter: React.FC = () => {
  const { startMusic } = useMusic()

  useEffect(() => {
    // Auto-play music with 2s delay on page load
    const timer = setTimeout(() => startMusic(), 2000)
    return () => clearTimeout(timer)
  }, [startMusic])

  return (
    <div
      className="page-wrapper"
      style={{
        background: 'linear-gradient(160deg, #fff1f2 0%, #fce7f3 50%, #f3e8ff 100%)',
        minHeight: '100vh',
      }}
    >
      <AnimatedBackground density="light" emojis={['💌', '💗', '🌸', '✨', '🦋']} />
      <MusicPlayer />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Page label */}
        <motion.p
          className="text-center text-rose-400 text-xs font-inter tracking-widest uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ✦ A Letter Just For You ✦
        </motion.p>

        {/* Letter card */}
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'rgba(255,255,255,0.72)',
            boxShadow: '0 12px 60px rgba(244,63,94,0.1), 0 4px 20px rgba(192,132,252,0.1)',
          }}
        >
          {/* Decorative top */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            <span className="text-4xl">💌</span>
          </motion.div>

          {/* Greeting */}
          <motion.h1
            className="heading-romantic text-4xl md:text-5xl text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            My Dearest {LETTER.name},
          </motion.h1>

          {/* Letter body */}
          <div className="space-y-7">
            {LETTER.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className="text-[#4b5563] font-medium font-inter"
                style={{ fontSize: '1.15rem', lineHeight: '1.9' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Sign off */}
          <motion.div
            className="mt-10 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <p
              className="font-dancing text-2xl text-rose-500"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              With all my love,
            </p>
            <p
              className="font-dancing text-3xl text-rose-600 font-bold mt-1"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {LETTER.senderName} 💕
            </p>
          </motion.div>

          {/* Decorative bottom rule */}
          <motion.div
            className="mt-8 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
            <span className="text-rose-300 text-sm">💗</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <NavigationButtons nextPath="/gallery" nextLabel="Our Memories" nextEmoji="📸" />
        </motion.div>
      </div>
    </div>
  )
}

export default LoveLetter
