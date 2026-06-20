import React from 'react'
import { motion } from 'framer-motion'
import AnimatedBackground from '../components/AnimatedBackground'
import NavigationButtons from '../components/NavigationButtons'
import MusicPlayer from '../components/MusicPlayer'

// ── 📸 CUSTOMIZE: Replace these with your actual photos ──
// To add photos:
//   1. Place image files in /public/photos/ (e.g. /public/photos/photo1.jpg)
//   2. Replace the 'src' value with the path (e.g. '/photos/photo1.jpg')
//   3. Update the 'caption' for each photo
//   4. Add or remove entries as needed
const PHOTOS = [
  {
    id: 1,
    src: 'https://placehold.co/400x400/fda4af/ffffff?text=📸+Photo+1',
    caption: 'The day we first met 💕',
    emoji: '💕',
  },
  {
    id: 2,
    src: 'https://placehold.co/400x400/c084fc/ffffff?text=📸+Photo+2',
    caption: 'Our first adventure together ✈️',
    emoji: '✈️',
  },
  {
    id: 3,
    src: 'https://placehold.co/400x400/f9a8d4/ffffff?text=📸+Photo+3',
    caption: 'That perfect dinner 🍽️',
    emoji: '🍽️',
  },
  {
    id: 4,
    src: 'https://placehold.co/400x400/ddd6fe/ffffff?text=📸+Photo+4',
    caption: 'You laughing at my jokes 😂',
    emoji: '😂',
  },
  {
    id: 5,
    src: 'https://placehold.co/400x400/fda4af/ffffff?text=📸+Photo+5',
    caption: 'Our cozy movie night 🎬',
    emoji: '🎬',
  },
  {
    id: 6,
    src: 'https://placehold.co/400x400/c084fc/ffffff?text=📸+Photo+6',
    caption: 'Surprise flowers for you 🌷',
    emoji: '🌷',
  },
  {
    id: 7,
    src: 'https://placehold.co/400x400/f9a8d4/ffffff?text=📸+Photo+7',
    caption: 'That sunset we chased 🌅',
    emoji: '🌅',
  },
  {
    id: 8,
    src: 'https://placehold.co/400x400/ddd6fe/ffffff?text=📸+Photo+8',
    caption: 'My favorite person 💖',
    emoji: '💖',
  },
  {
    id: 9,
    src: 'https://placehold.co/400x400/fda4af/ffffff?text=📸+Photo+9',
    caption: 'Us being silly together 🤪',
    emoji: '🤪',
  },
  {
    id: 10,
    src: 'https://placehold.co/400x400/c084fc/ffffff?text=📸+Photo+10',
    caption: 'Every moment with you ✨',
    emoji: '✨',
  },
]

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const PhotoGallery: React.FC = () => {
  return (
    <div
      className="page-wrapper"
      style={{
        background: 'linear-gradient(160deg, #fce7f3 0%, #f3e8ff 60%, #ede9fe 100%)',
        minHeight: '100vh',
      }}
    >
      <AnimatedBackground density="light" emojis={['📸', '💕', '🌸', '✨']} />
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
            ✦ Our Story In Pictures ✦
          </p>
          <h1 className="heading-romantic text-4xl md:text-5xl mb-3">
            Our Beautiful Memories 📸
          </h1>
          <p className="text-gray-500 text-sm font-inter">
            Every picture tells our story 💕
          </p>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {PHOTOS.map((photo) => (
            <motion.div
              key={photo.id}
              variants={item}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <div
                className="rounded-2xl overflow-hidden bg-white/70"
                style={{
                  boxShadow: '0 4px 12px rgba(244,63,94,0.05)',
                  border: '2px solid rgba(255,255,255,0.8)',
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
                <div className="bg-white/90 px-3 py-2 flex items-center gap-1.5 min-h-[44px] justify-center">
                  <span className="text-base select-none flex-shrink-0">{photo.emoji}</span>
                  <p className="text-[11px] text-gray-600 font-inter leading-tight text-center">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <NavigationButtons
            prevPath="/letter"
            nextPath="/timeline"
            nextLabel="Birthday Surprise"
            nextEmoji="🎂"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default PhotoGallery
