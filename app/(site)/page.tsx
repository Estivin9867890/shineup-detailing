import Link from 'next/link'
import { ArrowRight, Shield, ChevronDown } from 'lucide-react'

const STATS = [
  { value: '150+',  label: 'Voitures traitées' },
  { value: '4,9/5', label: 'Note Google' },
  { value: '24h',   label: 'Garantie satisfaction' },
  { value: '20 km', label: 'Rayon Brest' },
]

const TEASER_WHY = [
  { label: 'Déplacement',  bad: 'Vous bougez',          good: 'On vient chez vous' },
  { label: 'Résultat',     bad: 'Médiocre → rayures',   good: 'Showroom — garanti' },
  { label: 'Produits',     bad: 'Chimiques génériques', good: 'Koch Chemie Pro' },
  { label: 'Garantie',     bad: 'Aucune',               good: 'Retour gratuit sous 24h' },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/25" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(16,185,129,0.1) 0%, transparent 65%)' }}
        />
        <div className="absolute top-1/3 right-[8%] w-72 h-72 rounded-full border border-emerald-500/8" />
        <div className="absolute top-1/3 right-[8%] w-[28rem] h-[28rem] rounded-full border border-emerald-500/5 translate-x-10 translate-y-10" />

        <div className="relative max-w-6xl mx-auto px-4 py-28">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-7">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Disponible à Brest et alentours · Dès 45 €
              </div>
              <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold px-3 py-1.5 rounded-full">
                🔥 3 créneaux restants cette semaine
              </div>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black leading-[1.05] tracking-tight mb-6">
              Votre voiture<br />mérite mieux<br />
              <span className="text-emerald-400">qu&apos;un lavage<br />automatique.</span>
            </h1>

            <p className="text-xl text-slate-400 mb-9 max-w-xl leading-relaxed">
              Detailing mobile professionnel à domicile. Produits Koch Chemie, matériel pro.
              On vient chez vous — le résultat est garanti.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/formules"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-100"
              >
                Voir nos formules <ArrowRight size={20} />
              </Link>
              <Link
                href="/avant-apres"
                className="flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all"
              >
                Voir les résultats
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-6 bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-fit">
              <Shield size={16} className="text-emerald-400 flex-shrink-0" />
              <span className="text-sm text-slate-300">
                <span className="text-white font-bold">Garantie satisfaction</span> — Pas satisfait ? On revient gratuitement dans les 24h.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="font-semibold text-white">4,9/5</span> Google
              </div>
              <div className="flex items-center gap-1.5">
                <Shield size={14} className="text-emerald-400" />
                Produits Koch Chemie Pro
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">150+</span> voitures traitées
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── STATS BANDEAU ── */}
      <section className="py-12 px-4 border-y border-slate-800 bg-slate-900/40">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="text-4xl font-black text-emerald-400 mb-1">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEASER : Pourquoi ShineUp ? ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-2">Lavage auto ou ShineUp ?</h2>
            <p className="text-slate-400">La différence n&apos;est pas que dans le prix.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-4 px-5 text-slate-500 font-medium w-1/3"></th>
                  <th className="py-4 px-5 text-center w-1/3">
                    <span className="text-slate-400 font-bold">Lavage classique</span>
                  </th>
                  <th className="py-4 px-5 text-center w-1/3">
                    <span className="text-emerald-400 font-bold">✨ ShineUp</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {TEASER_WHY.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-900/20' : ''}>
                    <td className="py-3.5 px-5 font-semibold text-white">{row.label}</td>
                    <td className="py-3.5 px-5 text-center text-slate-500">{row.bad}</td>
                    <td className="py-3.5 px-5 text-center text-emerald-400 font-semibold">{row.good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/formules"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              Voir nos formules <ArrowRight size={18} />
            </Link>
            <Link
              href="/comment-ca-marche"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              Comment ça marche ?
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-16 px-4 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">
            Prêt à retrouver une voiture<br />
            <span className="text-emerald-400">comme au premier jour ?</span>
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Réservez en 2 minutes. On vient chez vous avec tout le matériel.
            Résultat garanti ou on revient — sans condition.
          </p>
          <Link
            href="/formules"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 py-4 rounded-xl transition-all hover:scale-105 text-lg"
          >
            Choisir ma formule <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
