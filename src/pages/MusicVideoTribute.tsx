import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedBackground from '../components/AnimatedBackground'
import NavigationButtons from '../components/NavigationButtons'
import MusicPlayer from '../components/MusicPlayer'
import { useMusic } from '../context/MusicContext'

// ── 💌 CUSTOMIZE: Edit the personal note below ──
const PERSONAL_NOTE = {
  title: 'For Sheoshri ❤️',
  body: `This isn't a perfect video.

I might smile too much.
I might get nervous.
I might forget what I wanted to say.

But every word comes from my heart.

And every second of this message is just for you.`,
}

// ── 🎨 CUSTOMIZE: Video poster image ──
// Add a path to a poster image (e.g. '/videos/poster.jpg') if you want one to show before playing
const VIDEO_POSTER = ''

const MusicVideoTribute: React.FC = () => {
  const [isVideoFinished, setIsVideoFinished] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const { isPlaying, toggleMusic, startMusic } = useMusic()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleVideoPlay = () => {
    setIsVideoFinished(false)
    if (isPlaying) {
      toggleMusic()
    }
  }

  const handleVideoEnded = () => {
    setIsVideoFinished(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    // Wait 2 seconds, then resume background music with a smooth fade-in
    timeoutRef.current = setTimeout(() => {
      startMusic()
    }, 2000)
  }

  const handleVideoLoaded = () => {
    setIsVideoLoading(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      className="page-wrapper"
      style={{
        background: 'linear-gradient(160deg, #0f0716 0%, #1a0a2e 50%, #0d1117 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Light ambient background: Max 2 hearts and 2 sparkles (3 particles total) */}
      <AnimatedBackground density="light" emojis={['❤️', '✨']} />
      <MusicPlayer />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-3">
            ✦ JUST FOR YOU ✦
          </p>
          <h1
            className="text-4xl md:text-5xl mb-4 px-2 font-bold"
            style={{
              fontFamily: "'Dancing Script', cursive",
              background: 'linear-gradient(135deg, #fda4af, #c084fc, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            A Little Message From Bubu ❤️
          </h1>
          <p className="text-purple-300 text-sm md:text-base font-inter max-w-md mx-auto leading-relaxed px-4">
            Before we continue...
            <br />
            there's something I wanted to tell you.
          </p>
        </motion.div>

        {/* Video Player Card */}
        <motion.div
          className="relative w-full mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
          style={{
            maxWidth: '800px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(253, 164, 175, 0.15)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            minHeight: isVideoLoading ? '320px' : 'auto',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        >
          <video
            src="/videos/VID-20260620-WA0000.mp4"
            controls
            playsInline
            poster={VIDEO_POSTER || undefined}
            className="w-full max-h-[70vh] object-contain block mx-auto rounded-2xl"
            onPlay={handleVideoPlay}
            onEnded={handleVideoEnded}
            onLoadedData={handleVideoLoaded}
            onError={handleVideoLoaded}
          />

          {/* Premium Loading Overlay */}
          <AnimatePresence>
            {isVideoLoading && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#120822]/95 z-20"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-4xl mb-3 select-none"
                >
                  💌
                </motion.div>
                <p className="text-purple-300 text-sm font-inter font-medium tracking-wide">
                  Loading your message...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Special Touch: Thank you message */}
        <AnimatePresence>
          {isVideoFinished && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="text-center mt-2 mb-8"
            >
              <div
                className="inline-block py-2.5 px-6 rounded-full"
                style={{
                  background: 'rgba(244, 63, 94, 0.08)',
                  border: '1px solid rgba(244, 63, 94, 0.15)',
                  boxShadow: '0 4px 15px rgba(244, 63, 94, 0.05)',
                }}
              >
                <span className="text-rose-300 font-medium text-sm md:text-base tracking-wide font-inter">
                  Thank you for listening to me ❤️
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Personal Note Card */}
        <motion.div
          className="rounded-3xl p-6 md:p-8 text-center mb-8"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(253, 164, 175, 0.15)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
        >
          <h2
            className="text-2xl md:text-3xl mb-4 text-rose-300 font-bold"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {PERSONAL_NOTE.title}
          </h2>
          <p
            className="text-purple-100 font-medium font-inter whitespace-pre-line text-sm md:text-base"
            style={{ lineHeight: '1.75' }}
          >
            {PERSONAL_NOTE.body}
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <NavigationButtons
            prevPath="/quiz"
            nextPath="/final"
            nextLabel="The Grand Finale"
            nextEmoji="🎂"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default MusicVideoTribute
