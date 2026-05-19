import Link from 'next/link'

const NAV_LINKS = [
  { href: '/formules',            label: 'Nos Formules' },
  { href: '/avant-apres',         label: 'Avant / Après' },
  { href: '/comment-ca-marche',   label: 'Comment ça marche' },
  { href: '/contact',             label: 'Contact' },
  { href: '/about',               label: 'À propos' },
]

const LEGAL_LINKS = [
  { href: '/mentions-legales',            label: 'Mentions légales' },
  { href: '/cgv',                         label: 'CGV' },
  { href: '/politique-confidentialite',   label: 'Politique de confidentialité' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-10 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span>✨</span>
              <span className="font-black text-base tracking-tight">
                ShineUp <span className="text-emerald-400">Detailing</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Detailing mobile professionnel à Brest et alentours.
              On vient chez vous. Résultat showroom garanti.
            </p>
            <div className="space-y-1.5 text-sm">
              <a href="tel:+33647805116" className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors">
                <span className="text-emerald-400">📞</span> 06 47 80 51 16
              </a>
              <a href="mailto:shineup.brest@gmail.com" className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors">
                <span className="text-emerald-400">✉️</span> shineup.brest@gmail.com
              </a>
              <p className="flex items-center gap-2 text-slate-500">
                <span className="text-emerald-400">📍</span> Brest & 20 km alentours
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Navigation</h3>
            <nav className="space-y-2">
              {NAV_LINKS.map(l => (
                <Link key={l.href} href={l.href} className="block text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Informations légales</h3>
            <nav className="space-y-2">
              {LEGAL_LINKS.map(l => (
                <Link key={l.href} href={l.href} className="block text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-5 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
              <p className="text-xs text-slate-600 leading-relaxed">
                TVA non applicable — Art. 293B du CGI.
                Micro-entreprise immatriculée en France.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
          <span>© 2026 ShineUp Detailing · Micro-entreprise · Brest, Finistère</span>
          <span className="flex items-center gap-1">
            <span className="text-emerald-500/60">●</span> Garantie satisfaction 24h sur toutes les prestations
          </span>
        </div>
      </div>
    </footer>
  )
}
