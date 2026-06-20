import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back, className = '' }) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      className={`flip-card h-40 ${className}`}
      onClick={() => setFlipped(!flipped)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
      role="button"
      aria-pressed={flipped}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`} style={{ height: '100%' }}>
        {/* Front */}
        <div className="flip-card-front glass-card flex items-center justify-center p-4 text-center">
          {front}
        </div>
        {/* Back */}
        <div
          className="flip-card-back flex items-center justify-center p-4 text-center"
          style={{
            background: 'linear-gradient(135deg, #fda4af, #c084fc)',
          }}
        >
          {back}
        </div>
      </div>
    </motion.div>
  )
}

export default FlipCard
