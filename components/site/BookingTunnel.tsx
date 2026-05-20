'use client'

import { useState, useMemo } from 'react'
import { X, ChevronRight, ChevronLeft, Check, Zap, Droplets, Star, Car, CalendarDays, User, MapPin, Clock } from 'lucide-react'
import type { FormulaSlug, VehicleSize } from '@/lib/types'
import { FORMULAS } from '@/lib/mockData'

interface BookingTunnelProps {
  onClose: () => void
  initialFormula?: FormulaSlug
}

interface BookingForm {
  formula: FormulaSlug | null
  vehicleSize: VehicleSize | null
  date: string
  time: string
  name: string
  phone: string
  email: string
  address: string
  notes: string
}

const VEHICLE_SIZES = [
  { value: 'citadine' as VehicleSize, label: 'Citadine', examples: 'Clio, Polo, 208...', icon: '🚗', surcharge: 0 },
  { value: 'berline' as VehicleSize, label: 'Berline / Break', examples: 'Mégane, Golf, 308...', icon: '🚘', surcharge: 0 },
  { value: 'suv' as VehicleSize, label: 'SUV / Monospace', examples: '3008, Kuga, Koleos...', icon: '🚙', surcharge: 20 },
]

const FORMULA_ICONS = { express: Zap, 'deep-clean': Droplets, premium: Star }

function getAvailableSlots(dateStr: string): string[] {
  const date = new Date(dateStr + 'T12:00:00')
  const day = date.getDay()
  const isWeekend = day === 0 || day === 6
  const slots = isWeekend
    ? ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']
    : ['18:00', '18:30', '19:00', '19:30', '20:00']
  return slots
}

function MiniCalendar({ selected, onSelect }: { selected: string; onSelect: (d: string) => void }) {
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }, [])
  const todayStr = useMemo(() => (
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  ), [today])

  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear]   = useState(today.getFullYear())

  const monthName   = new Date(viewYear, viewMonth, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  const firstDay    = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const days = useMemo(() => {
    const cells: Array<{ date: string; day: number; disabled: boolean; isToday: boolean }> = []
    for (let i = 0; i < firstDay; i++) cells.push({ date: '', day: 0, disabled: true, isToday: false })
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const dateObj = new Date(dateStr + 'T12:00:00')
      const isPast  = dateObj < today
      const isToday = dateStr === todayStr
      cells.push({ date: dateStr, day: d, disabled: isPast, isToday })
    }
    return cells
  }, [viewMonth, viewYear, firstDay, daysInMonth, today, todayStr])

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  return (
    <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="p-1 hover:text-emerald-400 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold capitalize text-white">{monthName}</span>
        <button onClick={nextMonth} className="p-1 hover:text-emerald-400 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map(d => (
          <div key={d} className="text-center text-xs text-slate-500 font-medium py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((cell, i) => (
          <button
            key={i}
            disabled={cell.disabled || !cell.date}
            onClick={() => cell.date && onSelect(cell.date)}
            className={[
              'h-8 w-full rounded-lg text-sm font-medium transition-all',
              !cell.date ? 'invisible' : '',
              cell.disabled ? 'text-slate-700 cursor-not-allowed' : 'hover:bg-emerald-500/20 hover:text-emerald-400 cursor-pointer',
              cell.isToday ? 'ring-1 ring-emerald-500/50 text-emerald-400' : '',
              selected === cell.date ? 'bg-emerald-500 text-white hover:bg-emerald-500' : 'text-slate-300',
            ].join(' ')}
          >
            {cell.day || ''}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-3 text-center">
        🌙 En semaine : disponible après 18h · Week-end : toute la journée
      </p>
    </div>
  )
}

export default function BookingTunnel({ onClose, initialFormula }: BookingTunnelProps) {
  const [step, setStep] = useState(initialFormula ? 2 : 1)
  const [submitted, setSubmitted]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [form, setForm] = useState<BookingForm>({
    formula: initialFormula ?? null,
    vehicleSize: null,
    date: '',
    time: '',
    name: '', phone: '', email: '', address: '', notes: '',
  })

  const surcharge = form.vehicleSize === 'suv' ? 20 : 0
  const basePrice = FORMULAS.find(f => f.slug === form.formula)?.price ?? 0
  const totalPrice = basePrice + surcharge

  const canNext = useMemo(() => {
    if (step === 1) return !!form.formula
    if (step === 2) return !!form.vehicleSize
    if (step === 3) return !!form.date && !!form.time
    if (step === 4) return !!form.name && !!form.phone && !!form.address
    return false
  }, [step, form])

  const availableSlots = form.date ? getAvailableSlots(form.date) : []

  const handleSubmit = async () => {
    setLoading(true)
    setSubmitError(false)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('api_error')
      setSubmitted(true)
    } catch {
      setSubmitError(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    const formula = FORMULAS.find(f => f.slug === form.formula)
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full text-center animate-slide-up">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-emerald-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Réservation envoyée !</h2>
          <p className="text-slate-400 mb-6">
            Nous confirmez votre {formula?.name} le{' '}
            <span className="text-white font-medium">
              {new Date(form.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>{' '}
            à <span className="text-white font-medium">{form.time}</span>.
          </p>
          <div className="bg-slate-900/60 rounded-xl p-4 text-left mb-6 border border-slate-800">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-400">Formule</span>
              <span className="text-white font-medium">{formula?.name}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-400">Véhicule</span>
              <span className="text-white font-medium capitalize">{form.vehicleSize}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-slate-700 pt-2 mt-2">
              <span className="text-slate-400">Total</span>
              <span className="text-emerald-400 font-bold text-lg">{totalPrice} €</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-4">Un SMS de confirmation vous sera envoyé. Acompte de 30% à régler sous 24h.</p>
          <button onClick={onClose} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold transition-colors">
            Parfait, merci !
          </button>
        </div>
      </div>
    )
  }

  const STEPS = [
    { n: 1, label: 'Formule', icon: Star },
    { n: 2, label: 'Véhicule', icon: Car },
    { n: 3, label: 'Date', icon: CalendarDays },
    { n: 4, label: 'Contact', icon: User },
  ]

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white">Réserver une prestation</h2>
            {form.formula && (
              <p className="text-sm text-emerald-400 mt-0.5 font-medium">
                {FORMULAS.find(f => f.slug === form.formula)?.name} · {totalPrice} €
                {surcharge > 0 && <span className="text-slate-400"> (dont +20€ SUV)</span>}
              </p>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex items-center px-6 pt-6 pb-4 gap-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const done = step > s.n
            const active = step === s.n
            return (
              <div key={s.n} className="flex items-center gap-2 flex-1">
                <div className={[
                  'flex items-center gap-1.5 text-xs font-semibold transition-all',
                  active ? 'text-white' : done ? 'text-emerald-400' : 'text-slate-600',
                ].join(' ')}>
                  <div className={[
                    'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
                    active ? 'bg-emerald-500 text-white' : done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600',
                  ].join(' ')}>
                    {done ? <Check size={12} /> : <Icon size={12} />}
                  </div>
                  <span className="hidden sm:block">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={['h-px flex-1 transition-colors', done ? 'bg-emerald-500/50' : 'bg-slate-800'].join(' ')} />
                )}
              </div>
            )
          })}
        </div>

        {/* Body */}
        <div className="px-6 pb-6">

          {/* STEP 1 — Formula */}
          {step === 1 && (
            <div className="space-y-3 animate-float-in">
              <p className="text-slate-400 text-sm mb-4">Quelle prestation souhaitez-vous ?</p>
              {FORMULAS.map(f => {
                const Icon = FORMULA_ICONS[f.slug]
                const selected = form.formula === f.slug
                return (
                  <button
                    key={f.slug}
                    onClick={() => setForm(p => ({ ...p, formula: f.slug }))}
                    className={[
                      'w-full text-left p-4 rounded-xl border-2 transition-all',
                      selected
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-800 hover:border-slate-600 bg-slate-900/40',
                    ].join(' ')}
                  >
                    <div className="flex items-start gap-3">
                      <div className={[
                        'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                        selected ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400',
                      ].join(' ')}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-white">{f.name}</span>
                          {f.popular && (
                            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                              ⭐ Populaire
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{f.description}</p>
                        <ul className="space-y-1">
                          {f.features.slice(0, 3).map((feat, i) => (
                            <li key={i} className="text-xs text-slate-500 flex items-center gap-1.5">
                              <Check size={10} className={selected ? 'text-emerald-400' : 'text-slate-600'} />
                              {feat}
                            </li>
                          ))}
                          {f.features.length > 3 && (
                            <li className="text-xs text-slate-600">+{f.features.length - 3} prestations...</li>
                          )}
                        </ul>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={['text-2xl font-black', selected ? 'text-emerald-400' : 'text-white'].join(' ')}>
                          {f.price} €
                        </div>
                        <div className="text-xs text-slate-500">
                          ~{Math.floor(f.durationMin / 60)}h{f.durationMin % 60 > 0 ? (f.durationMin % 60) : ''}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* STEP 2 — Vehicle size */}
          {step === 2 && (
            <div className="animate-float-in">
              <p className="text-slate-400 text-sm mb-4">Quelle est la taille de votre véhicule ?</p>
              <div className="space-y-3">
                {VEHICLE_SIZES.map(v => {
                  const selected = form.vehicleSize === v.value
                  return (
                    <button
                      key={v.value}
                      onClick={() => setForm(p => ({ ...p, vehicleSize: v.value }))}
                      className={[
                        'w-full text-left p-4 rounded-xl border-2 flex items-center gap-4 transition-all',
                        selected ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-800 hover:border-slate-600 bg-slate-900/40',
                      ].join(' ')}
                    >
                      <span className="text-3xl">{v.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold text-white">{v.label}</div>
                        <div className="text-sm text-slate-400">{v.examples}</div>
                      </div>
                      {v.surcharge > 0 ? (
                        <span className="text-sm font-semibold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg">
                          +{v.surcharge} €
                        </span>
                      ) : (
                        <span className="text-sm text-slate-500">Prix standard</span>
                      )}
                      {selected && <Check className="text-emerald-400 flex-shrink-0" size={18} />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* STEP 3 — Date & time */}
          {step === 3 && (
            <div className="animate-float-in">
              <p className="text-slate-400 text-sm mb-4">Choisissez votre créneau</p>
              <div className="grid md:grid-cols-2 gap-4">
                <MiniCalendar
                  selected={form.date}
                  onSelect={date => setForm(p => ({ ...p, date, time: '' }))}
                />
                {form.date ? (
                  <div>
                    <p className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                      <Clock size={14} className="text-emerald-400" />
                      Créneaux disponibles
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots.length > 0 ? availableSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setForm(p => ({ ...p, time: slot }))}
                          className={[
                            'py-2.5 rounded-lg text-sm font-semibold border transition-all',
                            form.time === slot
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : 'border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400',
                          ].join(' ')}
                        >
                          {slot}
                        </button>
                      )) : (
                        <p className="col-span-2 text-slate-500 text-sm text-center py-8">
                          Aucun créneau disponible ce jour. Choisissez une autre date.
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-slate-600 text-sm">
                    ← Sélectionnez une date
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4 — Contact */}
          {step === 4 && (
            <div className="animate-float-in space-y-4">
              <p className="text-slate-400 text-sm mb-4">Vos coordonnées et l'adresse d'intervention</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block font-medium">Prénom & Nom *</label>
                  <input
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="Jean Dupont"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block font-medium">Téléphone *</label>
                  <input
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="06 12 34 56 78"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block font-medium">Email</label>
                <input
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="jean.dupont@email.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 flex items-center gap-1 font-medium">
                  <MapPin size={12} className="text-emerald-400" /> Adresse d'intervention *
                </label>
                <input
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                  placeholder="14 Rue de Siam, Brest"
                  value={form.address}
                  onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block font-medium">Notes spéciales (optionnel)</label>
                <textarea
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                  rows={3}
                  placeholder="Ex: taches de café sur siège avant, chien, accès par le parking souterrain..."
                  value={form.notes}
                  onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                />
              </div>
              {/* Recap */}
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Récapitulatif</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Formule</span>
                    <span className="text-white">{FORMULAS.find(f => f.slug === form.formula)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Véhicule</span>
                    <span className="text-white capitalize">{form.vehicleSize}{surcharge > 0 && ' (+20€)'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date</span>
                    <span className="text-white">{form.date && new Date(form.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} · {form.time}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-700 pt-2 mt-2">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-emerald-400 font-black text-lg">{totalPrice} €</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Acompte de 30 % ({Math.round(totalPrice * 0.3)} €) à régler après confirmation.</p>
                </div>
              </div>
            </div>
          )}

          {/* Error banner */}
          {submitError && (
            <div className="mt-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400 text-center">
              Une erreur s&apos;est produite. Réessayez ou contactez-nous directement au{' '}
              <a href="tel:+33647805116" className="font-bold underline">06 47 80 51 16</a>
            </div>
          )}

          {/* Navigation */}
          <div className={['flex mt-5 gap-3', step > 1 ? 'justify-between' : 'justify-end'].join(' ')}>
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-all text-sm font-medium disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Retour
              </button>
            )}
            {step < 4 ? (
              <button
                disabled={!canNext}
                onClick={() => setStep(s => s + 1)}
                className={[
                  'flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all',
                  canNext
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed',
                ].join(' ')}
              >
                Continuer <ChevronRight size={16} />
              </button>
            ) : (
              <button
                disabled={!canNext || loading}
                onClick={handleSubmit}
                className={[
                  'flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all',
                  canNext && !loading
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed',
                ].join(' ')}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Envoi en cours…
                  </>
                ) : (
                  <><Check size={16} /> Confirmer la réservation</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
