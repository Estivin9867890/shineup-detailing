import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BeforeAfterSlider from '@/components/site/BeforeAfterSlider'

const BEFORE_AFTER_EXAMPLES = [
  { beforeSrc: '/ba/peugeot-avant.png', afterSrc: '/ba/peugeot-apres.png', label: 'Carrosserie extérieure', formula: 'Deep Clean ou Intégrale Premium' },
  { beforeSrc: '/ba/bmw-int-avant.png', afterSrc: '/ba/bmw-int-apres.png', label: 'Intérieur cuir — BMW Série 1', formula: 'Deep Clean ou Intégrale Premium' },
  { beforeSrc: '/ba/sieges-avant.png',  afterSrc: '/ba/sieges-apres.png',  label: 'Sièges tissu & moquettes', formula: 'Deep Clean — Shampouinage injecteur-extracteur' },
]

const TESTIMONIALS = [
  { name: 'Marie D.',    formula: 'Deep Clean',         rating: 5, text: 'Résultat bluffant. Les sièges sont comme neufs après 3 ans d\'utilisation. Équipe pro et ponctuelle.' },
  { name: 'Sophie M.',   formula: 'Intégrale Premium',  rating: 5, text: 'Mon BMW X5 n\'avait jamais été aussi propre. Le polissage donne un éclat impressionnant.' },
  { name: 'Antoine R.',  formula: 'Deep Clean',         rating: 5, text: 'Prix honnête, qualité remarquable. Je prends le Deep Clean tous les 2 mois maintenant.' },
]

export default function AvantApresPage() {
  return (
    <>
      {/* ── Header ── */}
      <section className="relative pt-28 pb-12 px-4 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            Photos réelles · Aucun filtre
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Avant / Après</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Glissez la barre pour comparer.{' '}
            <span className="text-emerald-400 font-semibold">Les résultats parlent d&apos;eux-mêmes.</span>
          </p>
        </div>
      </section>

      {/* ── Sliders ── */}
      <section className="py-4 px-4 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {BEFORE_AFTER_EXAMPLES.map((ex, i) => (
            <div key={i} className="space-y-2">
              <BeforeAfterSlider beforeSrc={ex.beforeSrc} afterSrc={ex.afterSrc} />
              <div className="px-1">
                <p className="font-semibold text-white text-sm">{ex.label}</p>
                <p className="text-xs text-slate-500">{ex.formula}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-3xl mx-auto bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 text-center">
          <p className="text-slate-300 leading-relaxed">
            Ces résultats sont obtenus avec notre matériel professionnel et les produits{' '}
            <span className="text-white font-semibold">Koch Chemie</span>.
            Chaque voiture reçoit un traitement personnalisé selon son état.
          </p>
          <Link
            href="/formules"
            className="mt-4 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Je veux ce résultat <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Témoignages ── */}
      <section className="py-16 px-4 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10">Ce que disent nos clients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                <div className="flex gap-0.5 mb-3 text-yellow-400">{'⭐'.repeat(t.rating)}</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-emerald-400">{t.formula}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Avis Google ── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-900/20 to-slate-900 border border-yellow-500/20 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
            <h2 className="text-2xl font-black mb-2">Vous avez été satisfait ?</h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
              Un avis Google, c&apos;est 10 secondes pour vous et ça aide d&apos;autres Brestois à nous trouver.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://g.page/r/shineup-detailing/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-colors"
              >
                ⭐ Laisser un avis Google
              </a>
              <Link
                href="/formules"
                className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Réserver une prestation <ArrowRight size={14} />
              </Link>
            </div>
            <p className="text-xs text-slate-600 mt-4">
              Actuellement <span className="text-yellow-400 font-bold">4,9/5</span> · {'>'}20 avis
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
