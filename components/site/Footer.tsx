import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/formules',          label: 'Nos Formules' },
  { href: '/avant-apres',       label: 'Avant / Après' },
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '/contact',           label: 'Contact' },
  { href: '/about',             label: 'À propos' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-10 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span>✨</span>
              <span className="font-black text-base tracking-tight">
                ShineUp <span className="text-emerald-400">Detailing</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Detailing mobile professionnel à Brest et alentours.<br />
              On vient chez vous. Résultat showroom garanti.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {FOOTER_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
          <span>© 2026 ShineUp Detailing · Micro-entreprise · Brest, Finistère</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-slate-400 transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
