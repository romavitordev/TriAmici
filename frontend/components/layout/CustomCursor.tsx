'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    let x = 0, y = 0, tx = 0, ty = 0

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      cursor.dataset.state = target.closest('a, button, .reveal-photo') ? 'hover' : 'default'
    }

    const tick = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      cursor.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
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
        will-change-transform
        transition-[width,height,border-color,background] duration-200
        data-[state=hover]:h-12 data-[state=hover]:w-12
        data-[state=hover]:border-dourado data-[state=hover]:bg-dourado/10
        md:block
      "
    />
  )
}
