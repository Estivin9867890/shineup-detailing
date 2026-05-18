'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, MapPin, Shield, ArrowRight, ChevronRight } from 'lucide-react'

const WA_NUMBER = '33600000000'

const STEPS = [
  { n: '01', title: 'Réservez en ligne', desc: 'Choisissez votre formule, votre date et votre créneau en 2 minutes.' },
  { n: '02', title: 'On arrive chez vous', desc: 'Notre équipe vient avec tout le matériel pro. Accès à votre eau & électricité suffit.' },
  { n: '03', title: 'Résultat garanti', desc: 'Votre voiture rendue impeccable. Photos avant/après incluses (formule Premium).' },
]

const PRACTICAL = [
  { Icon: Clock,  title: 'Horaires flexibles',  desc: 'En semaine dès 18h, week-end de 9h à 19h. On s\'adapte à vos disponibilités.' },
  { Icon: MapPin, title: '100% mobile',          desc: 'Rayon 20 km autour de Brest. Besoin : robinet + prise standard.' },
  { Icon: Shield, title: 'Résultat garanti',     desc: 'Insatisfait ? On revient gratuitement corriger sous 24h. Sans condition.' },
]

const FAQ = [
  { q: 'Vous avez besoin d\'eau et d\'électricité chez moi ?', a: 'Oui, un robinet et une prise standard suffisent. Tout notre matériel (aspirateur, shampouineuse) est amené par nos soins.' },
  { q: 'Combien de temps dure la prestation ?', a: 'De 1h (Express) à 2h30 (Intégrale Premium). Vous n\'avez pas besoin d\'être présent — nous vous contactons quand c\'est terminé.' },
  { q: 'Quelles zones couvrez-vous ?', a: 'Rayon de 20 km autour de Brest. Au-delà, supplément de 0,40 €/km.' },
  { q: 'Et si je ne suis pas satisfait ?', a: 'Nous revenons gratuitement corriger tout défaut signalé dans les 24h suivant la prestation.' },
  { q: 'Dois-je être présent pendant la prestation ?', a: 'Non, pas nécessairement. Il suffit qu\'on ait accès au véhicule et aux points d\'eau/électricité. Nous vous envoyons des photos à la fin.' },
  { q: 'Acceptez-vous les paiements en carte ?', a: 'Oui — CB, virement, espèces ou PayPal. On s\'adapte.' },
]

const REFERRAL_STEPS = [
  { step: '1', title: 'Vous recommandez ShineUp', desc: 'Envoyez le lien du site à un ami qui a besoin d\'un nettoyage auto.' },
  { step: '2', title: 'Votre ami réserve', desc: 'Il mentionne votre prénom lors de la réservation.' },
  { step: '3', title: 'Tout le monde gagne', desc: 'Vous − 20 € · Votre ami − 10 €. Appliqué dès la prestation suivante.' },
]

export default function CommentCaMarchePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
            Simple, rapide, sans contrainte
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Comment ça marche ?</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            De la réservation au résultat showroom — on gère tout.
          </p>
        </div>
      </section>

      {/* ── 3 Steps ── */}
      <section className="py-8 px-4 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          {STEPS.map(s => (
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
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {PRACTICAL.map(({ Icon, title, desc }) => (
            <div key={title} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <Icon className="text-emerald-400 mb-3" size={22} />
              <h3 className="font-bold mb-1">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 bg-slate-900/30 border-t border-slate-800">
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
                  <ChevronRight
                    size={16}
                    className={['text-slate-400 transition-transform flex-shrink-0', openFaq === i ? 'rotate-90' : ''].join(' ')}
                  />
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

      {/* ── Programme Parrainage ── */}
      <section className="py-16 px-4 border-t border-slate-800">
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
                Votre ami réserve une prestation ? Vous recevez{' '}
                <span className="text-white font-bold">−20 € sur votre prochain nettoyage</span>,
                et lui bénéficie de{' '}
                <span className="text-white font-bold">−10 € sur sa première réservation</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Bonjour, je voudrais parrainer un ami !')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Parrainer via WhatsApp
                </a>
                <Link
                  href="/formules"
                  className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
                >
                  Réserver d&apos;abord <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {REFERRAL_STEPS.map(s => (
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

      {/* ── CTA ── */}
      <section className="py-16 px-4 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">Prêt à réserver ?</h2>
          <p className="text-slate-400 mb-8">
            2 minutes suffisent. On s&apos;occupe du reste.
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
