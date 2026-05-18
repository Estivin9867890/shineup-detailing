'use client'

import { useState } from 'react'
import { Zap, Droplets, Star, Check, ArrowRight } from 'lucide-react'
import BookingTunnel from '@/components/site/BookingTunnel'
import type { FormulaSlug } from '@/lib/types'
import { FORMULAS } from '@/lib/mockData'

const FORMULA_ICONS = { express: Zap, 'deep-clean': Droplets, premium: Star }

const WHY_US = [
  { label: 'Tarif',        bad: '3 – 8 € (machine)',          good: 'Dès 45 € (valeur réelle)' },
  { label: 'Durée',        bad: '3 min de convoyeur',         good: '1h à 2h30 de soin manuel' },
  { label: 'Résultat',     bad: 'Médiocre → rayures',         good: 'Showroom — garanti' },
  { label: 'Déplacement',  bad: 'Vous bougez',                good: 'On vient chez vous' },
  { label: 'Intérieur',    bad: '❌ Non traité',              good: '✅ Compris selon formule' },
  { label: 'Produits',     bad: 'Chimiques génériques',       good: 'Koch Chemie Pro' },
  { label: 'Garantie',     bad: 'Aucune',                     good: 'Retour gratuit sous 24h' },
]

export default function FormulesPage() {
  const [tunnelOpen, setTunnelOpen]         = useState(false)
  const [selectedFormula, setSelectedFormula] = useState<FormulaSlug | undefined>()
  const [isSuv, setIsSuv]                   = useState(false)

  const openTunnel = (formula?: FormulaSlug) => {
    setSelectedFormula(formula)
    setTunnelOpen(true)
  }

  const displayPrice = (base: number) => isSuv ? base + 20 : base

  return (
    <>
      {tunnelOpen && (
        <BookingTunnel onClose={() => setTunnelOpen(false)} initialFormula={selectedFormula} />
      )}

      {/* ── Header ── */}
      <section className="relative pt-28 pb-12 px-4 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            Dès 45 € · Déplacement inclus
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Nos formules</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Choisissez la prestation adaptée à votre véhicule. On vient chez vous avec tout le matériel.
          </p>
        </div>
      </section>

      {/* ── Sélecteur véhicule ── */}
      <section className="px-4 pb-8">
        <div className="max-w-xs mx-auto">
          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setIsSuv(false)}
              className={[
                'flex-1 py-2.5 rounded-lg text-sm font-bold transition-all',
                !isSuv ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white',
              ].join(' ')}
            >
              Citadine / Berline
            </button>
            <button
              onClick={() => setIsSuv(true)}
              className={[
                'flex-1 py-2.5 rounded-lg text-sm font-bold transition-all',
                isSuv ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white',
              ].join(' ')}
            >
              SUV / Monospace
            </button>
          </div>
          {isSuv && (
            <p className="text-xs text-center text-emerald-400 mt-2 font-medium">
              +20 € appliqué sur chaque formule (véhicule {'>'} 4,5 m)
            </p>
          )}
        </div>
      </section>

      {/* ── Formules ── */}
      <section className="py-4 px-4 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {FORMULAS.map(f => {
            const Icon = FORMULA_ICONS[f.slug]
            return (
              <div
                key={f.slug}
                className={[
                  'relative rounded-2xl border p-6 flex flex-col transition-all hover:-translate-y-1',
                  f.popular
                    ? 'border-emerald-500 bg-emerald-500/5 shadow-lg shadow-emerald-500/10'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700',
                ].join(' ')}
              >
                {f.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ LE PLUS POPULAIRE
                  </div>
                )}
                <div className={[
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                  f.popular ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-emerald-400',
                ].join(' ')}>
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-black mb-1">{f.name}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-1">{f.description}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black">{displayPrice(f.price)} €</span>
                  <span className="text-slate-500 text-sm">
                    · ~{Math.floor(f.durationMin / 60)}h{f.durationMin % 60 > 0 ? String(f.durationMin % 60).padStart(2, '0') : ''}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {f.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openTunnel(f.slug)}
                  className={[
                    'w-full py-3 rounded-xl font-bold transition-all',
                    f.popular
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'border border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400 text-white',
                  ].join(' ')}
                >
                  Réserver cette formule
                </button>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-slate-500 mt-6 max-w-xl mx-auto">
          Majoration +20 € pour les véhicules SUV, monospace et utilitaires (longueur {'>'} 4,5 m).
          Le déplacement dans un rayon de 20 km autour de Brest est inclus.
        </p>
      </section>

      {/* ── Comparatif complet ── */}
      <section className="py-20 px-4 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Lavage auto ou ShineUp ?</h2>
            <p className="text-slate-400">La différence n&apos;est pas que dans le prix.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left pb-4 text-slate-500 font-medium w-1/3"></th>
                  <th className="pb-4 text-center w-1/3">
                    <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2 text-slate-400 font-bold">
                      Lavage auto classique
                    </div>
                  </th>
                  <th className="pb-4 text-center w-1/3">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-2 text-emerald-400 font-bold">
                      ✨ ShineUp Detailing
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {WHY_US.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-900/20' : ''}>
                    <td className="py-3.5 px-4 font-semibold text-white rounded-l-xl">{row.label}</td>
                    <td className="py-3.5 px-4 text-center text-slate-500">{row.bad}</td>
                    <td className="py-3.5 px-4 text-center text-emerald-400 font-semibold rounded-r-xl">{row.good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={() => openTunnel()}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              Je veux le résultat showroom <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
