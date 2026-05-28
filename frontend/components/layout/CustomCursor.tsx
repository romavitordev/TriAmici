'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const cursor = ref.current
    if (!cursor) return
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0

    const move = (event: MouseEvent) => {
      tx = event.clientX
      ty = event.clientY
    }

    const animate = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      cursor.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`
      requestAnimationFrame(animate)
    }

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      cursor.dataset.state = target.closest('a,button,.reveal-photo') ? 'hover' : 'default'
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    animate()
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-5 w-5 rounded-full border border-branco/70 transition-[width,height,border-color,background] duration-200 data-[state=hover]:h-12 data-[state=hover]:w-12 data-[state=hover]:border-dourado data-[state=hover]:bg-dourado/10 md:block" />
}
