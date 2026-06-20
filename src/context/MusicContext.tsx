import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react'

interface MusicContextType {
  isPlaying: boolean
  toggleMusic: () => void
  startMusic: () => void
  volume: number
  setVolume: (v: number) => void
}

const MusicContext = createContext<MusicContextType>({
  isPlaying: false,
  toggleMusic: () => {},
  startMusic: () => {},
  volume: 0.35,
  setVolume: () => {},
})

export const useMusic = () => useContext(MusicContext)

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.35)
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // ── 🎵 CUSTOMIZE: Replace this URL with your own music file ──
    // Options:
    //   1. Add a .mp3 file to /public/music/love-song.mp3 and use: '/music/love-song.mp3'
    //   2. Use a royalty-free URL (e.g. from pixabay.com)
    //   3. Keep this placeholder — music simply won't play until you add a file
    const audio = new Audio('/music/love-song.mp3')
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const fadeIn = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.volume = 0
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return
      if (audioRef.current.volume < volume - 0.02) {
        audioRef.current.volume = Math.min(audioRef.current.volume + 0.02, volume)
      } else {
        audioRef.current.volume = volume
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
      }
    }, 100)
  }, [volume])

  const startMusic = useCallback(() => {
    if (!audioRef.current || isPlaying) return
    audioRef.current.play().then(() => {
      setIsPlaying(true)
      fadeIn()
    }).catch(() => {
      // Browser autoplay policy — user must interact first
    })
  }, [isPlaying, fadeIn])

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        fadeIn()
      }).catch(() => {})
    }
  }, [isPlaying, fadeIn])

  const setVolume = useCallback((v: number) => {
    setVolumeState(v)
    if (audioRef.current) audioRef.current.volume = v
  }, [])

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic, startMusic, volume, setVolume }}>
      {children}
    </MusicContext.Provider>
  )
}
