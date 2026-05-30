'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    let x = -100, y = -100, tx = -100, ty = -100, hovering = false

    // Mantém o cursor fora da tela até o primeiro mousemove
    const onFirstMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      cursor.style.opacity = '1'
    }
    window.addEventListener('mousemove', onFirstMove, { once: true, passive: true })

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }

    const onOver = (e: MouseEvent) => {
      const over = !!(e.target as HTMLElement).closest('a, button, .reveal-photo')
      if (over !== hovering) {
        hovering = over
        cursor.dataset.state = over ? 'hover' : 'default'
      }
    }

    const tick = () => {
      // 0.22 — responde em ~8 frames (≈130ms) em vez de ~18 frames (≈300ms)
      x += (tx - x) * 0.22
      y += (ty - y) * 0.22
      // translate(-50%,-50%) centraliza independente do tamanho (normal ou hover)
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onFirstMove)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="
        pointer-events-none fixed left-0 top-0 z-[80]
        hidden h-5 w-5 rounded-full border border-branco/70
        opacity-0 will-change-transform
        transition-[width,height,border-color,background,opacity] duration-150
        data-[state=hover]:h-10 data-[state=hover]:w-10
        data-[state=hover]:border-dourado data-[state=hover]:bg-dourado/10
        md:block
      "
    />
  )
}
