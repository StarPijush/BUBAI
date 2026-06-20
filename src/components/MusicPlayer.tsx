import React from 'react'
import { motion } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'
import { useMusic } from '../context/MusicContext'

const MusicPlayer: React.FC = () => {
  const { isPlaying, toggleMusic } = useMusic()

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center glass-card shadow-lg"
      style={{ background: 'rgba(255,255,255,0.8)' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      <motion.div
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={isPlaying ? { duration: 4, repeat: Infinity, ease: 'linear' } : {}}
      >
        {isPlaying ? (
          <Music size={18} className="text-rose-500" />
        ) : (
          <VolumeX size={18} className="text-gray-400" />
        )}
      </motion.div>
    </motion.button>
  )
}

export default MusicPlayer
