'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface Props {
  imageSrc: string
  label?: string
}

export default function BeforeAfterSlider({ imageSrc, label }: Props) {
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const raw = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.max(5, Math.min(95, raw)))
  }, [])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (dragging) updatePosition(e.clientX) }
    const onMouseUp   = () => setDragging(false)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
    }
  }, [dragging, updatePosition])

  return (
    <div className="space-y-3">
      {label && <p className="text-sm font-semibold text-slate-300">{label}</p>}

      <div
        ref={containerRef}
        className="ba-slider relative overflow-hidden rounded-2xl aspect-video bg-slate-900"
        onMouseDown={e => { e.preventDefault(); setDragging(true); updatePosition(e.clientX) }}
        onTouchMove={e => updatePosition(e.touches[0].clientX)}
        onTouchStart={e => updatePosition(e.touches[0].clientX)}
      >
        {/* APRÈS — image nette, légèrement boostée */}
        <img
          src={imageSrc}
          alt="Après nettoyage"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(1.06) saturate(1.12) contrast(1.04)' }}
        />

        {/* AVANT — même image, filtrée pour paraître sale */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={imageSrc}
            alt="Avant nettoyage"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'grayscale(0.55) brightness(0.62) contrast(1.18) sepia(0.22)' }}
          />
        </div>

        {/* Ligne de séparation */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-lg"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        />

        {/* Poignée */}
        <div
          className="absolute top-1/2 flex items-center justify-center gap-1 w-10 h-10 rounded-full bg-white shadow-xl"
          style={{ left: `${position}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4 rounded-full bg-slate-400" />
            <div className="w-0.5 h-4 rounded-full bg-slate-400" />
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-black/60 text-white px-2 py-1 rounded backdrop-blur-sm">
          Avant
        </span>
        <span className="absolute top-3 right-3 text-[11px] font-bold uppercase tracking-wider bg-emerald-500/90 text-white px-2 py-1 rounded backdrop-blur-sm">
          Après
        </span>

        {/* Hint glisser */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-white/60 font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm whitespace-nowrap">
          ← Glissez pour comparer →
        </div>
      </div>
    </div>
  )
}
