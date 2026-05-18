import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const STATS = [
  { value: '150+',  label: 'Voitures traitées' },
  { value: '4,9/5', label: 'Note Google' },
  { value: '24h',   label: 'Garantie satisfaction' },
  { value: '20 km', label: 'Rayon Brest' },
]

const DIFFERENTIATORS = [
  { icon: '🔧', title: 'Matériel professionnel', desc: 'Injecteur-extracteur, polisheuse orbitale, produits Koch Chemie. On ne fait pas semblant.' },
  { icon: '📍', title: '100% mobile à Brest',    desc: 'On se déplace chez vous dans un rayon de 20 km. Besoin : un robinet et une prise.' },
  { icon: '⭐', title: 'Réputation avant tout',  desc: 'On est étudiants — notre réputation se construit voiture par voiture. On ne lâche jamais avant d\'être fiers du résultat.' },
  { icon: '🛡️', title: 'Garantie systématique',  desc: 'Pas satisfait dans les 24h ? On revient. Gratuit. Sans discussion.' },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-12 px-4 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            Brest, Finistère
          </div>
          <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-6">
            Qui se cache derrière<br />
            <span className="text-emerald-400">ShineUp ?</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Trois étudiants brestois. Une vraie passion pour les voitures.
            Et la conviction qu&apos;on peut faire mieux — à domicile, à un prix honnête.
          </p>
        </div>
      </section>

      {/* ── Photo + texte ── */}
      <section className="py-8 px-4 pb-16">
        <div className="max-w-4xl mx-auto">

          {/* Zone photo */}
          <div className="w-full aspect-video rounded-3xl bg-slate-900 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center mb-16 overflow-hidden">
            <span className="text-6xl mb-4">📸</span>
            <p className="text-slate-500 font-medium">Photo de l&apos;équipe à venir</p>
            <p className="text-slate-700 text-sm mt-1">Louis · Alexandre · Nicolas</p>
          </div>

          {/* Notre histoire + Différenciateurs */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-black mb-5">Notre histoire</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  Tout a commencé par une frustration partagée : les lavages automatiques abîment les peintures,
                  ne traitent pas les intérieurs, et laissent les voitures dans un état moyen après 5 minutes de convoyeur.
                  On méritait mieux. Nos voitures aussi.
                </p>
                <p>
                  On est trois étudiants à Brest, passionnés de belles voitures depuis toujours.
                  On a commencé par nettoyer les voitures de nos proches, investi dans du vrai matériel pro —
                  injecteur-extracteur, produits Koch Chemie, polisheuse — et les résultats ont parlé d&apos;eux-mêmes.
                </p>
                <p>
                  Aujourd&apos;hui on vient chez vous, avec tout le matos, pour un résultat showroom.
                  Sans que vous ayez à bouger votre voiture, sans prise de tête.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="text-3xl font-black mb-5">Ce qui nous différencie</h2>
              {DIFFERENTIATORS.map(item => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0 text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-white mb-0.5">{item.title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Chiffres clés ── */}
      <section className="py-16 px-4 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(stat => (
            <div key={stat.label}>
              <p className="text-4xl font-black text-emerald-400 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Prêt à nous faire confiance ?</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Réservez en 2 minutes. On vient chez vous avec tout le matériel.
            Résultat garanti ou on revient — sans condition.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/formules"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              Voir nos formules <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
