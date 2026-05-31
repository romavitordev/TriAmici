'use client'

import { Music, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(true), 3000)
    return () => window.clearTimeout(timeout)
  }, [])

  // Áudio ausente/indisponível: não renderiza o player (evita quebrar a página)
  if (!visible || audioError) return null

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
    <div className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-dourado/30 bg-preto/70 text-branco backdrop-blur transition-[width] duration-300 md:right-5 md:top-auto md:bottom-5 md:h-11 md:w-11 md:justify-start md:gap-3 md:rounded-none md:border-dourado/40 md:bg-preto/85 md:px-3 md:hover:w-64">
      <audio ref={audioRef} src="/midias/jingle-triamici.mp3" loop onError={() => setAudioError(true)} />
      <button onClick={toggle} aria-label="Tocar jingle Tri Amici" className="grid h-6 w-6 shrink-0 place-items-center text-dourado">
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <Music size={15} className="hidden shrink-0 text-dourado md:block" />
      <span className="hidden whitespace-nowrap text-xs text-cinza md:inline">Faca Colorida a Sua Vida</span>
    </div>
  )
}
