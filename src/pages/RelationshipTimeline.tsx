import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import AnimatedBackground from '../components/AnimatedBackground'
import NavigationButtons from '../components/NavigationButtons'
import MusicPlayer from '../components/MusicPlayer'

// ── 💫 CUSTOMIZE: Edit your relationship milestones below ──
const MILESTONES = [
  {
    date: '[Your Date]',        // e.g. "March 14, 2022"
    title: 'First Time We Met',
    description: 'It was totally unexpected. You walked in and I forgot how to function like a normal human being. Best day ever.',
    emoji: '💕',
    color: '#fda4af',
  },
  {
    date: '[Your Date]',
    title: 'Our First Kiss',
    description: 'I had been working up the courage for weeks. And then it just happened, and everything felt right.',
    emoji: '💋',
    color: '#f43f5e',
  },
  {
    date: '[Your Date]',
    title: 'First Trip Together',
    description: 'Exploring somewhere new with you showed me a whole new way of seeing the world. Mostly because you drag me to try all the local food.',
    emoji: '✈️',
    color: '#c084fc',
  },
  {
    date: '[Your Date]',
    title: 'The Day I Knew',
    description: 'There was this quiet moment — nothing special about it, really — and I just knew. This is the person I want by my side.',
    emoji: '🌟',
    color: '#fbbf24',
  },
  {
    date: '[Your Date]',
    title: 'Our Special Anniversary',
    description: 'Every year I fall more in love with you. Thank you for choosing me, every single day.',
    emoji: '🎉',
    color: '#818cf8',
  },
  {
    date: 'Today',
    title: 'Your Birthday 🎂',
    description: 'Another year of you in this world — and I am so, so grateful. Happy Birthday, my love.',
    emoji: '🎂',
    color: '#f43f5e',
  },
]

const TimelineItem: React.FC<{
  milestone: (typeof MILESTONES)[0]
  index: number
  isLeft: boolean
}> = ({ milestone, index, isLeft }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={`flex items-start gap-4 md:gap-8 mb-10 ${isLeft ? 'flex-row' : 'flex-row-reverse md:flex-row'}`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Card */}
      <div
        className="flex-1 glass-card rounded-2xl p-5"
        style={{
          borderLeft: `3px solid ${milestone.color}`,
          maxWidth: '360px',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{milestone.emoji}</span>
          <span
            className="text-xs font-inter font-medium px-2 py-0.5 rounded-full"
            style={{ background: `${milestone.color}22`, color: milestone.color }}
          >
            {milestone.date}
          </span>
        </div>
        <h3
          className="heading-romantic text-xl mb-2"
          style={{ fontFamily: "'Dancing Script', cursive", color: milestone.color }}
        >
          {milestone.title}
        </h3>
        <p className="text-gray-600 text-sm font-inter leading-relaxed">
          {milestone.description}
        </p>
      </div>

      {/* Center dot */}
      <div className="flex flex-col items-center mt-4">
        <motion.div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${milestone.color}, #c084fc)` }}
          animate={isInView ? { scale: [0, 1.3, 1] } : { scale: 0 }}
          transition={{ delay: index * 0.05 + 0.2, type: 'spring' }}
        >
          {milestone.emoji}
        </motion.div>
        {index < MILESTONES.length - 1 && (
          <div className="w-0.5 flex-1 min-h-[40px] mt-2"
            style={{ background: 'linear-gradient(to bottom, #fda4af44, #c084fc44)' }}
          />
        )}
      </div>

      {/* Spacer for alternating layout on desktop */}
      <div className="hidden md:block flex-1" style={{ maxWidth: '360px' }} />
    </motion.div>
  )
}

const RelationshipTimeline: React.FC = () => {
  return (
    <div
      className="page-wrapper"
      style={{
        background: 'linear-gradient(160deg, #fff1f2 0%, #fce7f3 50%, #ede9fe 100%)',
        minHeight: '100vh',
      }}
    >
      <AnimatedBackground density="light" emojis={['💫', '⭐', '✨', '💕']} />
      <MusicPlayer />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-rose-400 text-xs font-inter tracking-widest uppercase mb-2">
            ✦ How We Got Here ✦
          </p>
          <h1 className="heading-romantic text-4xl md:text-5xl mb-3">
            Our Story 💫
          </h1>
          <p className="text-gray-500 text-sm font-inter">
            Every milestone that brought us closer
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {MILESTONES.map((milestone, index) => (
            <TimelineItem
              key={index}
              milestone={milestone}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>

        {/* Navigation */}
        <NavigationButtons
          prevPath="/gallery"
          nextPath="/reasons"
          nextLabel="Why I Love You"
          nextEmoji="💝"
        />
      </div>
    </div>
  )
}

export default RelationshipTimeline
