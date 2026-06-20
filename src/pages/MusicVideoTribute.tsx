import React from 'react'
import { motion } from 'framer-motion'
import AnimatedBackground from '../components/AnimatedBackground'
import NavigationButtons from '../components/NavigationButtons'
import MusicPlayer from '../components/MusicPlayer'

// ── 🎵 CUSTOMIZE: Replace with your YouTube video ID ──
// Find it in the YouTube URL: youtube.com/watch?v=VIDEO_ID_HERE
// Example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" → VIDEO_ID = "dQw4w9WgXcQ"
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ' // ← Replace this!

// ── 💌 CUSTOMIZE: Your video message ──
const VIDEO_MESSAGE = {
  title: 'A Song That Makes Me Think Of You',
  subtitle: 'Every time I hear this, I think of your smile 💕',
  // Replace with your own message
  description:
    'This song found its way to me at exactly the right time — because it says everything I struggle to say out loud. Every lyric feels like it was written for us. I hope whenever you hear it, you think of me thinking of you.',
}

const MusicVideoTribute: React.FC = () => {
  return (
    <div
      className="page-wrapper"
      style={{
        background: 'linear-gradient(160deg, #0f0716 0%, #1a0a2e 50%, #0d1117 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Dark starfield background */}
      <AnimatedBackground density="heavy" emojis={['⭐', '✨', '💫', '🌟', '💕']} />
      <MusicPlayer />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-purple-400 text-xs font-inter tracking-widest uppercase mb-3">
            ✦ For You ✦
          </p>
          <h1
            className="text-4xl md:text-5xl mb-3"
            style={{
              fontFamily: "'Dancing Script', cursive",
              background: 'linear-gradient(135deg, #fda4af, #c084fc, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {VIDEO_MESSAGE.title}
          </h1>
          <p className="text-purple-300 text-sm font-inter">{VIDEO_MESSAGE.subtitle}</p>
        </motion.div>

        {/* YouTube embed */}
        <motion.div
          className="relative w-full mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            borderRadius: '1.5rem',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(244,63,94,0.08), 0 2px 10px rgba(192,132,252,0.04)',
          }}
        >
          {/* Glow border */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none z-10"
            style={{
              border: '1.5px solid rgba(253,164,175,0.3)',
              borderRadius: '1.5rem',
            }}
          />
          <div
            className="relative w-full"
            style={{ paddingBottom: '56.25%' /* 16:9 ratio */ }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
              title="A song for you"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ borderRadius: '1.5rem' }}
            />
          </div>
        </motion.div>

        {/* Message card */}
        <motion.div
          className="rounded-3xl p-7 text-center"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(253,164,175,0.2)',
            backdropFilter: 'blur(12px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.span
            className="text-4xl block mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            🎵
          </motion.span>
          <p
            className="text-purple-100 font-medium font-inter"
            style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
          >
            {VIDEO_MESSAGE.description}
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
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
