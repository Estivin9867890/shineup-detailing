'use client'

import { useState, useEffect } from 'react'
import { Zap, Droplets, Star, Check, ChevronRight, MapPin, Clock, Shield, ArrowRight, Phone, Mail, ChevronDown } from 'lucide-react'
import BookingTunnel from '@/components/site/BookingTunnel'
import BeforeAfterSlider from '@/components/site/BeforeAfterSlider'
import type { FormulaSlug } from '@/lib/types'
import { FORMULAS } from '@/lib/mockData'

const FORMULA_ICONS = { express: Zap, 'deep-clean': Droplets, premium: Star }

// Numéro WhatsApp — à remplacer par votre vrai numéro (format: 33XXXXXXXXX)
const WA_NUMBER = '33600000000'
const WA_MSG    = encodeURIComponent('Bonjour, je voudrais un devis pour un nettoyage de véhicule 🚗')

const BEFORE_AFTER_EXAMPLES = [
  {
    imageSrc: '/ba/mercedes.png',
    composite: true,
    label: 'Carrosserie extérieure',
    formula: 'Deep Clean ou Intégrale Premium',
  },
  {
    imageSrc: '/ba/siege.png',
    composite: true,
    label: 'Sièges tissu & moquettes',
    formula: 'Deep Clean — Shampouinage injecteur-extracteur',
  },
  {
    imageSrc: '/ba/interieur.png',
    composite: true,
    label: 'Intérieur complet',
    formula: 'Deep Clean ou Intégrale Premium',
  },
]

const WHY_US = [
  { label: 'Tarif',        bad: '3 – 8 € (machine)',          good: 'Dès 45 € (valeur réelle)' },
  { label: 'Durée',        bad: '3 min de convoyeur',         good: '1h à 2h30 de soin manuel' },
  { label: 'Résultat',     bad: 'Médiocre → rayures',         good: 'Showroom — garanti' },
  { label: 'Déplacement',  bad: 'Vous bougez',                good: 'On vient chez vous' },
  { label: 'Intérieur',    bad: '❌ Non traité',              good: '✅ Compris selon formule' },
  { label: 'Produits',     bad: 'Chimiques génériques',       good: 'Koch Chemie Pro' },
  { label: 'Garantie',     bad: 'Aucune',                     good: 'Retour gratuit sous 24h' },
]

const TEAM = [
  {
    name: 'Louis',
    role: 'Co-fondateur · Polissage & finition',
    passion: 'Passionné de carrosserie, il redonne vie aux peintures oxydées et effectue chaque polish à la main.',
    emoji: '🔴',
  },
  {
    name: 'Alexandre',
    role: 'Co-fondateur · Shampouinage & intérieur',
    passion: 'Expert en nettoyage tissu et cuir, il transforme les intérieurs les plus encrassés en quelques heures.',
    emoji: '🔵',
  },
  {
    name: 'Nicolas',
    role: 'Co-fondateur · Organisation & relation client',
    passion: "Garant de la satisfaction client — il s'assure que chaque prestation dépasse les attentes.",
    emoji: '🟢',
  },
]

const STEPS_HOW = [
  { n: '01', title: 'Réservez en ligne', desc: 'Choisissez votre formule, votre date et votre créneau en 2 minutes.' },
  { n: '02', title: 'On arrive chez vous', desc: 'Notre équipe vient avec tout le matériel pro. Accès à votre eau & électricité suffit.' },
  { n: '03', title: 'Résultat garanti', desc: 'Votre voiture rendue impeccable. Photos avant/après incluses (formule Premium).' },
]

const TESTIMONIALS = [
  { name: 'Marie D.', formula: 'Deep Clean', rating: 5, text: 'Résultat bluffant. Les sièges sont comme neufs après 3 ans d\'utilisation. Équipe pro et ponctuelle.' },
  { name: 'Sophie M.', formula: 'Intégrale Premium', rating: 5, text: 'Mon BMW X5 n\'avait jamais été aussi propre. Le polissage donne un éclat impressionnant.' },
  { name: 'Antoine R.', formula: 'Deep Clean', rating: 5, text: 'Prix honnête, qualité remarquable. Je prends le Deep Clean tous les 2 mois maintenant.' },
]

const FAQ = [
  { q: 'Vous avez besoin d\'eau et d\'électricité chez moi ?', a: 'Oui, un robinet et une prise standard suffisent. Tout notre matériel (aspirateur, shampouineuse) est amené par nos soins.' },
  { q: 'Combien de temps dure la prestation ?', a: 'De 1h (Express) à 2h30 (Intégrale Premium). Vous n\'avez pas besoin d\'être présent — nous vous contactons quand c\'est terminé.' },
  { q: 'Quelles zones couvrez-vous ?', a: 'Rayon de 20 km autour de Brest. Au-delà, supplément de 0,40 €/km.' },
  { q: 'Et si je ne suis pas satisfait ?', a: 'Nous revenons gratuitement corriger tout défaut signalé dans les 24h suivant la prestation.' },
]

const NAV_TABS = [
  { id: 'hero',       label: 'Accueil' },
  { id: 'formules',   label: 'Nos Formules' },
  { id: 'avant-apres',label: 'Avant / Après' },
  { id: 'how',        label: 'Comment ça marche' },
  { id: 'contact',    label: 'Contact' },
]

export default function HomePage() {
  const [tunnelOpen, setTunnelOpen]     = useState(false)
  const [selectedFormula, setSelectedFormula] = useState<FormulaSlug | undefined>()
  const [openFaq, setOpenFaq]           = useState<number | null>(null)
  const [activeTab, setActiveTab]       = useState('hero')
  const [scrolled, setScrolled]         = useState(false)

  // Active tab tracking via scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const ids = NAV_TABS.map(t => t.id).reverse()
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveTab(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openTunnel = (formula?: FormulaSlug) => {
    setSelectedFormula(formula)
    setTunnelOpen(true)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {tunnelOpen && (
        <BookingTunnel onClose={() => setTunnelOpen(false)} initialFormula={selectedFormula} />
      )}

      {/* ── Bouton WhatsApp flottant ── */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-sm px-4 py-3 rounded-full shadow-2xl shadow-green-900/50 transition-all hover:scale-105 active:scale-100"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Devis rapide
      </a>

      {/* ── Navbar ── */}
      <nav className={[
        'fixed top-0 inset-x-0 z-40 transition-all duration-300',
        scrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/20' : 'bg-transparent',
      ].join(' ')}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl">✨</span>
            <span className="font-black text-lg tracking-tight">
              ShineUp <span className="text-emerald-400">Detailing</span>
            </span>
          </div>

          {/* Tabs — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                className={[
                  'nav-tab px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  activeTab === tab.id
                    ? 'active text-white'
                    : 'text-slate-400 hover:text-slate-200',
                ].join(' ')}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => openTunnel()}
            className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            Réserver
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/25" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(16,185,129,0.1) 0%, transparent 65%)' }}
        />
        {/* Déco rings */}
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
              <span className="text-emerald-400">qu'un lavage<br />automatique.</span>
            </h1>

            <p className="text-xl text-slate-400 mb-9 max-w-xl leading-relaxed">
              Detailing mobile professionnel à domicile. Produits Koch Chemie, matériel pro.
              On vient chez vous — le résultat est garanti.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openTunnel()}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-100"
              >
                Réserver mon nettoyage <ArrowRight size={20} />
              </button>
              <button
                onClick={() => scrollTo('avant-apres')}
                className="flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all"
              >
                Voir les résultats
              </button>
            </div>

            {/* Garantie visible */}
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

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── FORMULES ── */}
      <section id="formules" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">Nos formules</h2>
            <p className="text-slate-400 text-lg">Choisissez la prestation adaptée à votre véhicule</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
                  <div className={['w-12 h-12 rounded-xl flex items-center justify-center mb-4', f.popular ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-emerald-400'].join(' ')}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-black mb-1">{f.name}</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-1">{f.description}</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-black">{f.price} €</span>
                    <span className="text-slate-500 text-sm">
                      · +20 € SUV · ~{Math.floor(f.durationMin / 60)}h{f.durationMin % 60 > 0 ? String(f.durationMin % 60).padStart(2,'0') : ''}
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
          <p className="text-center text-sm text-slate-500 mt-6">
            Majoration +20 € pour les véhicules SUV, monospace et utilitaires (longueur {'>'} 4,5 m).
          </p>
        </div>
      </section>

      {/* ── POURQUOI SHINEUP ? ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">Lavage auto ou ShineUp ?</h2>
            <p className="text-slate-400 text-lg">La différence n'est pas que dans le prix.</p>
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
            <button onClick={() => openTunnel()}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105">
              Je veux le résultat showroom <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── NOTRE ÉQUIPE ── */}
      <section className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">Qui sommes-nous ?</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              3 étudiants brestois passionnés de voitures. On fait ça mieux qu'un pro parce qu'on y met notre réputation — pas juste du temps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl mb-4">
                  {member.emoji}
                </div>
                <h3 className="text-xl font-black text-white mb-0.5">{member.name}</h3>
                <p className="text-xs text-emerald-400 font-semibold mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{member.passion}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
            <p className="text-slate-300 text-sm flex-1">
              On ne fait pas ça pour arrondir les fins de mois — on veut construire quelque chose qui dure.
              Chaque voiture traitée est une référence de plus. C'est pourquoi on ne lâche jamais avant d'être fiers du résultat.
            </p>
            <button onClick={() => openTunnel()}
              className="flex-shrink-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm whitespace-nowrap">
              Faites confiance à l'équipe <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── AVANT / APRÈS ── */}
      <section id="avant-apres" className="py-24 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">Avant / Après</h2>
            <p className="text-slate-400 text-lg">
              Glissez la barre pour comparer. <span className="text-emerald-400 font-semibold">Les résultats parlent d'eux-mêmes.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BEFORE_AFTER_EXAMPLES.map((ex, i) => (
              <div key={i} className="space-y-2">
                <BeforeAfterSlider imageSrc={ex.imageSrc} composite={ex.composite} />
                <div className="px-1">
                  <p className="font-semibold text-white text-sm">{ex.label}</p>
                  <p className="text-xs text-slate-500">{ex.formula}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Note bas */}
          <div className="mt-10 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-slate-300 leading-relaxed">
              Ces résultats sont obtenus avec notre matériel professionnel et les produits{' '}
              <span className="text-white font-semibold">Koch Chemie</span>.
              Chaque voiture reçoit un traitement personnalisé selon son état.
            </p>
            <button
              onClick={() => openTunnel()}
              className="mt-4 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Je veux ce résultat <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section id="how" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">Comment ça marche ?</h2>
            <p className="text-slate-400">Simple, rapide, sans contrainte de votre côté</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {STEPS_HOW.map(s => (
              <div key={s.n} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black text-emerald-400">{s.n}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Infos pratiques */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <Clock className="text-emerald-400 mb-3" size={22} />
              <h3 className="font-bold mb-1">Horaires flexibles</h3>
              <p className="text-slate-400 text-sm">En semaine dès 18h, week-end de 9h à 19h. On s'adapte.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <MapPin className="text-emerald-400 mb-3" size={22} />
              <h3 className="font-bold mb-1">100% mobile</h3>
              <p className="text-slate-400 text-sm">Rayon 20 km autour de Brest. Besoin : robinet + prise standard.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <Shield className="text-emerald-400 mb-3" size={22} />
              <h3 className="font-bold mb-1">Résultat garanti</h3>
              <p className="text-slate-400 text-sm">Insatisfait ? On revient gratuitement corriger sous 24h.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="py-16 px-4 bg-slate-900/30">
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

      {/* ── AVIS GOOGLE ── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-900/20 to-slate-900 border border-yellow-500/20 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
            <h2 className="text-2xl font-black mb-2">Vous avez été satisfait ?</h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
              Un avis Google, c'est 10 secondes pour vous et ça aide d'autres Brestois à nous trouver.
              Et ça nous fait vraiment plaisir.
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
              <button
                onClick={() => openTunnel()}
                className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Réserver une prestation <ArrowRight size={14} />
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-4">
              Actuellement <span className="text-yellow-400 font-bold">4,9/5</span> · {'>'}20 avis
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10">Questions fréquentes</h2>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-white pr-4">{item.q}</span>
                  <ChevronRight size={16} className={['text-slate-400 transition-transform flex-shrink-0', openFaq === i ? 'rotate-90' : ''].join(' ')} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME PARRAINAGE ── */}
      <section className="py-16 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold px-3 py-1.5 rounded-full mb-5">
                🎁 Programme Parrainage
              </div>
              <h2 className="text-3xl font-black mb-4">
                Recommandez ShineUp.<br />
                <span className="text-emerald-400">On vous récompense tous les deux.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Votre ami réserve une prestation ? Vous recevez <span className="text-white font-bold">−20 € sur votre prochain nettoyage</span>,
                et lui bénéficie de <span className="text-white font-bold">−10 € sur sa première réservation</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Bonjour, je voudrais parrainer un ami !')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Parrainer via WhatsApp
                </a>
                <button onClick={() => openTunnel()}
                  className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 font-semibold px-5 py-3 rounded-xl transition-colors text-sm">
                  Réserver d'abord <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { step: '1', title: 'Vous recommandez ShineUp', desc: 'Envoyez le lien du site à un ami qui a besoin d\'un nettoyage auto.' },
                { step: '2', title: 'Votre ami réserve', desc: 'Il mentionne votre prénom lors de la réservation.' },
                { step: '3', title: 'Tout le monde gagne', desc: 'Vous − 20 € · Votre ami − 10 €. Appliqué dès la prestation suivante.' },
              ].map(s => (
                <div key={s.step} className="flex items-start gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-black text-emerald-400">{s.step}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-0.5">{s.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-4 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-3">Nous contacter</h2>
            <p className="text-slate-400">Une question avant de réserver ? On vous répond vite.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Coordonnées */}
            <div className="space-y-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Téléphone / WhatsApp</p>
                  <p className="font-bold text-white">06 XX XX XX XX</p>
                </div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Email</p>
                  <p className="font-bold text-white">contact@shineup-detailing.fr</p>
                </div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Zone d'intervention</p>
                  <p className="font-bold text-white">Brest & 20 km alentours</p>
                </div>
              </div>
            </div>

            {/* CTA final */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-slate-900 border border-emerald-500/20 rounded-2xl p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-black mb-3">
                Prêt à retrouver une voiture<br />
                <span className="text-emerald-400">comme au premier jour ?</span>
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Réservez en 2 minutes. On vient chez vous. Résultat garanti ou on revient gratuitement.
              </p>
              <button
                onClick={() => openTunnel()}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all hover:scale-105 active:scale-100"
              >
                Réserver maintenant <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span>✨</span>
            <span className="font-bold text-slate-400">ShineUp Detailing</span>
            <span>· Brest & alentours</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-slate-300 transition-colors">CGV</a>
          </div>
          <span>© 2026 ShineUp Detailing · Micro-entreprise</span>
        </div>
      </footer>
    </div>
  )
}
