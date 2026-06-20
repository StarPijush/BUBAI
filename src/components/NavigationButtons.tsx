import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NavigationButtonsProps {
  prevPath?: string
  nextPath?: string
  prevLabel?: string
  nextLabel?: string
  nextEmoji?: string
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  prevPath,
  nextPath,
  prevLabel = 'Back',
  nextLabel = 'Next',
  nextEmoji = '💖',
}) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center gap-4 mt-8 pb-8">
      {prevPath && (
        <motion.button
          onClick={() => navigate(prevPath)}
          className="btn-outline flex items-center gap-2"
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={16} />
          {prevLabel}
        </motion.button>
      )}
      {nextPath && (
        <motion.button
          onClick={() => navigate(nextPath)}
          className="btn-rose flex items-center gap-2"
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
        >
          {nextLabel} {nextEmoji}
          <ChevronRight size={16} />
        </motion.button>
      )}
    </div>
  )
}

export default NavigationButtons
