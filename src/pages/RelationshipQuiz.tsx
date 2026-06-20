import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedBackground from '../components/AnimatedBackground'
import NavigationButtons from '../components/NavigationButtons'
import MusicPlayer from '../components/MusicPlayer'

// ── 🎯 CUSTOMIZE: Edit quiz questions and response messages below ──
const QUESTIONS = [
  {
    question: 'Do you remember where we had our first date? 💕',
    yesMessage: 'Of course you do! You remember everything 🥰',
    noMessage: 'That\'s okay... I\'ll remind you someday 😄',
    emoji: '💕',
  },
  {
    question: 'Is chocolate your favorite snack? 🍫',
    yesMessage: 'We have the BEST taste 🍫✨',
    noMessage: 'More for me then! 😂',
    emoji: '🍫',
  },
  {
    question: 'Do you love watching movies with me? 🎬',
    yesMessage: 'Even when I pick bad ones? 😅 Love that.',
    noMessage: 'You just haven\'t seen the right ones yet... 😏',
    emoji: '🎬',
  },
  {
    question: 'Do you steal the blanket at night? 🛏️',
    yesMessage: 'Caught you. Don\'t worry, it\'s adorable 😂',
    noMessage: 'Bold of you to deny it 😂',
    emoji: '🛏️',
  },
  {
    question: 'Do you think I\'m funny? 😂',
    yesMessage: 'You have EXCELLENT taste in humor 🌟',
    noMessage: 'Rude. You are so lucky you\'re cute 😂',
    emoji: '😂',
  },
  {
    question: 'Would you travel anywhere with me? ✈️',
    yesMessage: 'Adventure awaits us! Let\'s go!! 🗺️',
    noMessage: 'Okay fine, I\'ll pick better destinations 😅',
    emoji: '✈️',
  },
  {
    question: 'Do you believe in us? 💖',
    yesMessage: 'Me too. Always. 💖',
    noMessage: '...challenge accepted. Watch me prove it 😤💕',
    emoji: '💖',
  },
  {
    question: 'Are you smiling right now? 😊',
    yesMessage: 'That\'s literally all I wanted 🥹',
    noMessage: 'Not yet?? Keep reading, I\'ll get you there 💪',
    emoji: '😊',
  },
  {
    question: 'Will you always be my person? 🌟',
    yesMessage: '✨ I knew it. I love you so much. ✨',
    noMessage: 'Okay okay I\'m going to be so romantic you won\'t be able to resist 😂💕',
    emoji: '🌟',
  },
  {
    question: 'Are you having a happy birthday? 🎂',
    yesMessage: 'Best birthday ever? I hope so. You deserve it all 🎉💖',
    noMessage: 'Don\'t worry — there\'s still more surprise ahead! 🎁',
    emoji: '🎂',
  },
]

const STICKERS = ['💕', '🌸', '✨', '🐻', '🥰', '💖', '🦋', '⭐', '🍓', '🎀']

const RelationshipQuiz: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0)
  const [answered, setAnswered] = useState<'yes' | 'no' | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const question = QUESTIONS[currentQ]

  const handleAnswer = (answer: 'yes' | 'no') => {
    setAnswered(answer)
    if (answer === 'yes') setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1)
      setAnswered(null)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div
        className="page-wrapper flex items-center justify-center"
        style={{
          background: 'linear-gradient(160deg, #fff1f2 0%, #fce7f3 50%, #f3e8ff 100%)',
          minHeight: '100vh',
        }}
      >
        <AnimatedBackground density="heavy" emojis={['🎉', '💕', '✨', '🎊', '💖']} />
        <MusicPlayer />

        <motion.div
          className="relative z-10 glass-card rounded-3xl p-5 sm:p-8 max-w-sm mx-4 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1, repeat: 3 }}
          >
            🎉
          </motion.div>
          <h2 className="heading-romantic text-3xl mb-3">Quiz Complete!</h2>
          <p className="text-gray-600 font-inter text-sm mb-4">
            You scored <span className="text-rose-500 font-semibold">{score}/{QUESTIONS.length}</span>
          </p>
          <p
            className="text-[#4b5563] font-medium font-inter text-base mb-6"
            style={{ lineHeight: '1.8' }}
          >
            {score >= 8
              ? 'You know us so well 🥹 I love you forever.'
              : score >= 5
              ? 'We have so many more memories to make! 💕'
              : 'Guess we need more dates 😂💕'}
          </p>
          <NavigationButtons
            prevPath="/cake"
            nextPath="/tribute"
            nextLabel="Something Special"
            nextEmoji="🎵"
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className="page-wrapper flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 60%, #ede9fe 100%)',
        minHeight: '100vh',
      }}
    >
      <AnimatedBackground density="light" emojis={STICKERS} />
      <MusicPlayer />

      <div className="relative z-10 w-full max-w-md mx-4 py-12">
        {/* Header */}
        <motion.div className="text-center mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-rose-400 text-xs font-inter tracking-widest uppercase mb-2">
            ✦ The Love Quiz ✦
          </p>
          <h1 className="heading-romantic text-4xl mb-1">How Well Do You Know Us? 🎯</h1>
          <p className="text-gray-400 text-xs font-inter">
            Question {currentQ + 1} of {QUESTIONS.length}
          </p>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 bg-rose-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #f43f5e, #c084fc)' }}
              animate={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            className="glass-card rounded-3xl p-5 sm:p-8 text-center mb-6"
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="text-5xl mb-5"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
            >
              {question.emoji}
            </motion.div>

            <p
              className="text-[#4b5563] font-medium font-inter text-xl mb-5 leading-snug"
              style={{ lineHeight: '1.6' }}
            >
              {question.question}
            </p>

            {/* Answer response */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  className="mb-5 p-3 rounded-2xl"
                  style={{
                    background:
                      answered === 'yes'
                        ? 'rgba(244,63,94,0.08)'
                        : 'rgba(192,132,252,0.08)',
                    border: `1px solid ${answered === 'yes' ? '#fda4af' : '#d8b4fe'}`,
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p
                    className="text-[#4b5563] font-medium font-inter text-base"
                    style={{ lineHeight: '1.6' }}
                  >
                    {answered === 'yes' ? question.yesMessage : question.noMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Yes / No buttons */}
            {!answered ? (
              <div className="flex gap-3 justify-center">
                <motion.button
                  onClick={() => handleAnswer('yes')}
                  className="btn-rose flex-1 text-base py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yes! 💕
                </motion.button>
                <motion.button
                  onClick={() => handleAnswer('no')}
                  className="btn-outline flex-1 text-base py-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  No 😬
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={handleNext}
                className="btn-rose w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {currentQ < QUESTIONS.length - 1 ? 'Next Question →' : 'See Results 🎉'}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RelationshipQuiz
