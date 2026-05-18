'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

// À changer avant la mise en production
const ACCESS_PIN = '2610'
const STORAGE_KEY = 'su_dashboard_v1'

export default function DashboardLogin() {
  const [pin, setPin]           = useState('')
  const [visible, setVisible]   = useState(false)
  const [error, setError]       = useState(false)
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    // Légère pause pour simuler une vérification (évite brute force visuel)
    await new Promise(r => setTimeout(r, 400))

    if (pin === ACCESS_PIN) {
      localStorage.setItem(STORAGE_KEY, 'true')
      router.push('/dashboard')
    } else {
      setError(true)
      setPin('')
      setLoading(false)
    }
  }

  const handleKeypad = (digit: string) => {
    if (digit === '⌫') {
      setPin(p => p.slice(0, -1))
    } else if (pin.length < 4) {
      const next = pin + digit
      setPin(next)
      if (next.length === 4) {
        // Auto-submit quand 4 chiffres saisis
        setTimeout(() => {
          const form = document.getElementById('pin-form') as HTMLFormElement
          form?.requestSubmit()
        }, 150)
      }
    }
  }

  const KEYPAD = [['1','2','3'],['4','5','6'],['7','8','9'],['','0','⌫']]

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h1 className="text-xl font-black text-white">ShineUp · Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Accès réservé à l'équipe</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
            <Lock size={14} />
            <span>Saisissez votre code d'accès</span>
          </div>

          <form id="pin-form" onSubmit={handleSubmit}>
            {/* Affichage PIN */}
            <div className="flex items-center justify-center gap-3 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={[
                    'w-12 h-14 rounded-xl border-2 flex items-center justify-center transition-all',
                    i < pin.length
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : error
                        ? 'border-red-500/50 bg-red-500/5'
                        : 'border-slate-700 bg-slate-800/50',
                  ].join(' ')}
                >
                  {i < pin.length ? (
                    visible
                      ? <span className="text-lg font-bold text-emerald-400">{pin[i]}</span>
                      : <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  ) : null}
                </div>
              ))}
            </div>

            {/* Erreur */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm mb-4 animate-float-in">
                <AlertCircle size={14} />
                Code incorrect. Réessayez.
              </div>
            )}

            {/* Champ caché pour l'accessibilité */}
            <input
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value.slice(0, 4).replace(/\D/g, ''))}
              className="sr-only"
              tabIndex={-1}
              aria-hidden
            />

            {/* Pavé numérique */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {KEYPAD.flat().map((digit, i) => (
                <button
                  key={i}
                  type={digit === '' ? 'button' : 'button'}
                  onClick={() => digit !== '' && handleKeypad(digit)}
                  disabled={digit === ''}
                  className={[
                    'h-14 rounded-xl text-lg font-bold transition-all',
                    digit === ''
                      ? 'invisible'
                      : digit === '⌫'
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 text-base'
                        : 'bg-slate-800 hover:bg-slate-700 active:scale-95 text-white',
                  ].join(' ')}
                >
                  {digit}
                </button>
              ))}
            </div>

            {/* Bouton show/hide + submit */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setVisible(v => !v)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {visible ? <EyeOff size={12} /> : <Eye size={12} />}
                {visible ? 'Masquer' : 'Afficher'}
              </button>
              <button
                type="submit"
                disabled={pin.length !== 4 || loading}
                className={[
                  'flex-1 py-3 rounded-xl font-bold text-sm transition-all',
                  pin.length === 4 && !loading
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed',
                ].join(' ')}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Vérification…
                  </span>
                ) : 'Accéder au dashboard'}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Code disponible auprès des membres de l'équipe ShineUp
        </p>
      </div>
    </div>
  )
}
