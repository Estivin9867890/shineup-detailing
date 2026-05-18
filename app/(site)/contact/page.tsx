import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight, Clock } from 'lucide-react'

const WA_NUMBER = '33600000000'
const WA_MSG = encodeURIComponent('Bonjour, je voudrais un devis pour un nettoyage de véhicule 🚗')

const WA_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function ContactPage() {
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
            Réponse rapide garantie
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Nous contacter</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Une question avant de réserver ? On vous répond rapidement.
          </p>
        </div>
      </section>

      {/* ── Contacts + CTA ── */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Coordonnées */}
          <div className="space-y-4">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366]/60 rounded-xl p-5 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#25D366]/20 rounded-xl flex items-center justify-center flex-shrink-0 text-[#25D366]">
                {WA_ICON}
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">WhatsApp — réponse en quelques minutes</p>
                <p className="font-bold text-white group-hover:text-[#25D366] transition-colors">Envoyer un message</p>
              </div>
              <ArrowRight size={16} className="text-slate-500 group-hover:text-[#25D366] ml-auto transition-colors" />
            </a>

            <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Téléphone</p>
                <p className="font-bold text-white">06 XX XX XX XX</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Email</p>
                <p className="font-bold text-white">contact@shineup-detailing.fr</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Zone d&apos;intervention</p>
                <p className="font-bold text-white">Brest & 20 km alentours</p>
                <p className="text-xs text-slate-500 mt-0.5">Au-delà : +0,40 €/km</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Disponibilités</p>
                <p className="font-bold text-white">En semaine dès 18h</p>
                <p className="text-xs text-slate-500 mt-0.5">Week-end 9h – 19h</p>
              </div>
            </div>
          </div>

          {/* CTA final */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-slate-900 border border-emerald-500/20 rounded-2xl p-8 flex flex-col justify-center">
            <div className="text-4xl mb-4">🚗✨</div>
            <h3 className="text-2xl font-black mb-3">
              Prêt à retrouver une voiture<br />
              <span className="text-emerald-400">comme au premier jour ?</span>
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Réservez en 2 minutes. On vient chez vous avec tout le matériel.
              Résultat garanti ou on revient gratuitement.
            </p>
            <Link
              href="/formules"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all hover:scale-105 active:scale-100"
            >
              Réserver maintenant <ArrowRight size={18} />
            </Link>
            <p className="text-xs text-slate-600 text-center mt-4">
              Garantie satisfaction 24h · Paiement après prestation
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
