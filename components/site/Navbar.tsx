'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/',                    label: 'Accueil' },
  { href: '/formules',            label: 'Nos Formules' },
  { href: '/avant-apres',         label: 'Avant / Après' },
  { href: '/comment-ca-marche',   label: 'Comment ça marche' },
  { href: '/contact',             label: 'Contact' },
  { href: '/about',               label: 'À propos' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <nav className={[
        'fixed top-0 inset-x-0 z-40 transition-all duration-300',
        scrolled || open
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/20'
          : 'bg-transparent',
      ].join(' ')}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl">✨</span>
            <span className="font-black text-lg tracking-tight">
              ShineUp <span className="text-emerald-400">Detailing</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  isActive(link.href)
                    ? 'text-white bg-white/8'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/4',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/formules"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Réserver
            </Link>
            <button
              onClick={() => setOpen(o => !o)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-slate-800/60 bg-slate-950/98 px-4 py-3 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
