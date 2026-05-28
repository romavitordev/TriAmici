'use client'

import { Music, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(true), 3000)
    return () => window.clearTimeout(timeout)
  }, [])

  if (!visible) return null

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center gap-3 overflow-hidden border border-dourado/40 bg-preto/85 px-3 text-branco backdrop-blur transition-[width] duration-300 hover:w-64">
      <audio ref={audioRef} src="/audio/jingle-triamici.mp3" loop />
      <button onClick={toggle} aria-label="Tocar jingle Tri Amici" className="grid h-6 w-6 shrink-0 place-items-center text-dourado">
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <Music size={15} className="shrink-0 text-dourado" />
      <span className="whitespace-nowrap text-xs text-cinza">Faca Colorida a Sua Vida</span>
    </div>
  )
}
