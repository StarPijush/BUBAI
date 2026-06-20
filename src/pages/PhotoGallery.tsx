import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 }
    }
  })
}

const PhotoGallery: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)

  const handleNext = useCallback(() => {
    setDirection(1)
    setActivePhotoIndex((prev) => (prev === null ? 0 : (prev + 1) % PHOTOS.length))
  }, [])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setActivePhotoIndex((prev) => (prev === null ? PHOTOS.length - 1 : (prev - 1 + PHOTOS.length) % PHOTOS.length))
  }, [])

  const handleClose = useCallback(() => {
    setActivePhotoIndex(null)
  }, [])

  const handleDragEnd = (_: any, info: any) => {
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold) {
      handleNext()
    } else if (info.offset.x > swipeThreshold) {
      handlePrev()
    }
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return
      if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePhotoIndex, handleNext, handlePrev, handleClose])

  const activePhoto = activePhotoIndex !== null ? PHOTOS[activePhotoIndex] : null

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
          className="text-center mb-6"
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={item}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={() => {
                setDirection(0)
                setActivePhotoIndex(index)
              }}
            >
              <div
                className="rounded-2xl overflow-hidden bg-white/70 h-full flex flex-col justify-between"
                style={{
                  boxShadow: '0 4px 12px rgba(244,63,94,0.05)',
                  border: '2px solid rgba(255,255,255,0.8)',
                }}
              >
                <motion.img
                  layoutId={`photo-img-${photo.id}`}
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
                <div className="bg-white/90 px-3 py-2 flex items-center gap-1.5 min-h-[44px] justify-center flex-grow">
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

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex flex-col justify-between py-6 px-4 touch-none"
            onClick={handleClose}
          >
            {/* Top Header Controls */}
            <div
              className="flex justify-between items-center w-full max-w-4xl mx-auto px-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-white/80 font-inter text-sm font-semibold tracking-wider">
                {activePhotoIndex + 1} / {PHOTOS.length}
              </span>
              <button
                onClick={handleClose}
                className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400 min-h-[48px] min-w-[48px]"
                aria-label="Close gallery"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Image Slider Area */}
            <div
              className="relative w-full max-w-4xl mx-auto flex-grow flex items-center justify-center px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Navigation Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-rose-400 min-h-[48px] min-w-[48px]"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Slide Image Wrapper */}
              <div className="relative w-full max-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activePhotoIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={handleDragEnd}
                    className="w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
                  >
                    <motion.img
                      layoutId={`photo-img-${activePhoto.id}`}
                      src={activePhoto.src}
                      alt={activePhoto.caption}
                      className="max-h-[55vh] max-w-full object-contain rounded-2xl shadow-2xl pointer-events-none"
                    />
                    {/* Caption */}
                    <div className="text-center mt-6 px-4">
                      <p className="text-white text-base md:text-lg font-inter font-medium leading-relaxed">
                        <span className="mr-2 text-xl select-none">{activePhoto.emoji}</span>
                        {activePhoto.caption}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Navigation Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-rose-400 min-h-[48px] min-w-[48px]"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Empty bottom space to center image content nicely */}
            <div className="h-12 w-full pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PhotoGallery
