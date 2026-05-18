'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, CalendarDays, Package, LogOut,
  Plus, X, Globe, Users, Trash2, BarChart2, ShoppingBag, Car, CalendarRange,
  TrendingUp, Database, FileText, Search, AlertCircle,
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

type FormulaKey    = 'express' | 'deep-clean' | 'premium'
type VehicleSize   = 'standard' | 'suv'
type Source        = 'web' | 'manual'
type BookingStatus = 'completed' | 'confirmed' | 'pending'
type ExpenseCat    = 'marketing' | 'material' | 'transport'

interface Booking {
  id: string; date: string; clientName: string
  formula: FormulaKey; vehicleSize: VehicleSize
  source: Source; status: BookingStatus
  price: number; assignedTo: string
}

interface Expense {
  id: string; date: string
  category: ExpenseCat; label: string; amount: number
}

interface Supply {
  id: string; name: string
  category: 'product' | 'equipment' | 'consumable'
  unit: string; qty: number; minQty: number
  usePerJob: number; cost: number
}

interface ClientProfile {
  name: string; totalSpent: number; visits: number
  lastVisit: string; daysSince: number
  favoriteFormula: FormulaKey; formulas: Record<FormulaKey, number>
}

// ═══════════════════════════════════════════════════════════════
// CONSTANTES
// ═══════════════════════════════════════════════════════════════

const FORMULA_LABELS: Record<FormulaKey, string> = {
  'express': 'Express Intérieur',
  'deep-clean': 'Deep Clean',
  'premium': 'Intégrale Premium',
}
const FORMULA_PRICES: Record<FormulaKey, Record<VehicleSize, number>> = {
  'express':    { standard: 45,  suv: 65  },
  'deep-clean': { standard: 85,  suv: 105 },
  'premium':    { standard: 125, suv: 145 },
}
const FORMULA_HOURS: Record<FormulaKey, number> = {
  'express': 1, 'deep-clean': 1.75, 'premium': 2.5,
}
const TEAM         = ['Louis', 'Alexandre', 'Nicolas']
const URSSAF_RATE  = 0.212
const GOAL         = 1000

// ═══════════════════════════════════════════════════════════════
// DONNÉES MOCKÉES — remplacez par des appels Supabase
// ═══════════════════════════════════════════════════════════════

const INIT_BOOKINGS: Booking[] = [
  { id:'bk-001', date:'2026-05-03', clientName:'Marie Dupont',      formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Louis'  },
  { id:'bk-002', date:'2026-05-03', clientName:'Julien Martin',     formula:'express',    vehicleSize:'standard', source:'manual', status:'completed', price:45,  assignedTo:'Alexandre' },
  { id:'bk-003', date:'2026-05-04', clientName:'Sophie Mercier',    formula:'premium',    vehicleSize:'suv',      source:'web',    status:'completed', price:145, assignedTo:'Louis'  },
  { id:'bk-004', date:'2026-05-04', clientName:'Pierre Leblanc',    formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Alexandre' },
  { id:'bk-005', date:'2026-05-05', clientName:'Claire Thomas',     formula:'deep-clean', vehicleSize:'standard', source:'manual', status:'completed', price:85,  assignedTo:'Louis'  },
  { id:'bk-006', date:'2026-05-06', clientName:'Kevin Rousseau',    formula:'express',    vehicleSize:'standard', source:'manual', status:'completed', price:45,  assignedTo:'Alexandre' },
  { id:'bk-007', date:'2026-05-07', clientName:'Isabelle Girard',   formula:'premium',    vehicleSize:'standard', source:'web',    status:'completed', price:125, assignedTo:'Louis'  },
  { id:'bk-008', date:'2026-05-08', clientName:'Franck Petit',      formula:'deep-clean', vehicleSize:'suv',      source:'web',    status:'completed', price:105, assignedTo:'Alexandre' },
  { id:'bk-009', date:'2026-05-09', clientName:'Nathalie Simon',    formula:'express',    vehicleSize:'standard', source:'manual', status:'completed', price:45,  assignedTo:'Louis'  },
  { id:'bk-010', date:'2026-05-09', clientName:'Antoine Morel',     formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Alexandre' },
  { id:'bk-011', date:'2026-05-10', clientName:'Emma Bernard',      formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Louis'  },
  { id:'bk-012', date:'2026-05-11', clientName:'Nicolas Faure',     formula:'express',    vehicleSize:'standard', source:'manual', status:'completed', price:45,  assignedTo:'Alexandre' },
  { id:'bk-013', date:'2026-05-12', clientName:'Laure Chevalier',   formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Louis'  },
  { id:'bk-014', date:'2026-05-14', clientName:'Sébastien Laurent', formula:'express',    vehicleSize:'standard', source:'manual', status:'completed', price:45,  assignedTo:'Alexandre' },
  { id:'bk-015', date:'2026-05-15', clientName:'Audrey Roux',       formula:'premium',    vehicleSize:'suv',      source:'web',    status:'completed', price:145, assignedTo:'Louis'  },
  { id:'bk-016', date:'2026-05-16', clientName:'Maxime Blanc',      formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Alexandre' },
  { id:'bk-017', date:'2026-05-16', clientName:'Camille Dubois',    formula:'deep-clean', vehicleSize:'standard', source:'manual', status:'completed', price:85,  assignedTo:'Louis'  },
  { id:'bk-018', date:'2026-05-18', clientName:'Paul Fontaine',     formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'pending',   price:85,  assignedTo:'Alexandre' },
  { id:'bk-019', date:'2026-05-20', clientName:'Léa Garnier',       formula:'express',    vehicleSize:'standard', source:'web',    status:'confirmed', price:45,  assignedTo:'Louis'  },
]

const INIT_EXPENSES: Expense[] = [
  { id:'ex-001', date:'2026-05-01', category:'marketing', label:'Google Ads – Brest Local',           amount:70  },
  { id:'ex-002', date:'2026-05-01', category:'marketing', label:'Meta Ads – Reels avant/après',       amount:50  },
  { id:'ex-003', date:'2026-05-02', category:'material',  label:'Koch Chemie – Produits détailing',   amount:95  },
  { id:'ex-004', date:'2026-05-02', category:'material',  label:'Microfibres premium (pack 10)',       amount:35  },
  { id:'ex-005', date:'2026-05-10', category:'material',  label:'APC concentré + dégraissant jantes', amount:28  },
  { id:'ex-006', date:'2026-05-05', category:'transport', label:'Essence – semaine 1',                amount:35  },
  { id:'ex-007', date:'2026-05-12', category:'transport', label:'Essence – semaine 2',                amount:30  },
  { id:'ex-008', date:'2026-05-07', category:'transport', label:'Péages A630',                        amount:12  },
]
// CA = 1 425 € | URSSAF = 302 € | Dépenses = 355 € | Net = 768 € | /pers = 256 €

const INIT_SUPPLIES: Supply[] = [
  { id:'sp-001', name:'APC Koch Chemie MO',      category:'product',    unit:'L',   qty:3.5,  minQty:1.0, usePerJob:0.15, cost:12   },
  { id:'sp-002', name:'Shampoing carrosserie',   category:'product',    unit:'L',   qty:2.0,  minQty:0.5, usePerJob:0.10, cost:8    },
  { id:'sp-003', name:'Dégraissant jantes',      category:'product',    unit:'L',   qty:0.4,  minQty:0.5, usePerJob:0.08, cost:9    },
  { id:'sp-004', name:'Cire / Sealant',          category:'product',    unit:'L',   qty:0.8,  minQty:0.3, usePerJob:0.05, cost:25   },
  { id:'sp-005', name:'Nettoyant vitres',        category:'product',    unit:'L',   qty:1.5,  minQty:0.4, usePerJob:0.06, cost:6    },
  { id:'sp-006', name:'Microfibres premium',     category:'consumable', unit:'pcs', qty:12,   minQty:4,   usePerJob:0.5,  cost:3.5  },
  { id:'sp-007', name:'Gants jetables',          category:'consumable', unit:'pcs', qty:6,    minQty:10,  usePerJob:2,    cost:0.3  },
  { id:'sp-008', name:'Sacs poubelle',           category:'consumable', unit:'pcs', qty:40,   minQty:10,  usePerJob:2,    cost:0.15 },
  { id:'sp-009', name:'Brosses détailing kit',   category:'equipment',  unit:'pcs', qty:8,    minQty:3,   usePerJob:0,    cost:15   },
  { id:'sp-010', name:'Éponges applicateur',     category:'equipment',  unit:'pcs', qty:6,    minQty:2,   usePerJob:0,    cost:2    },
]

// Historique des 5 mois précédents (mocké — à remplacer par Supabase)
const HISTORY_PREV = [
  { month: 'Déc', year: 2025, net: 0,   goalPct: 0,  jobs: 0 },
  { month: 'Jan', year: 2026, net: 0,   goalPct: 0,  jobs: 0 },
  { month: 'Fév', year: 2026, net: 0,   goalPct: 0,  jobs: 0 },
  { month: 'Mar', year: 2026, net: 0,   goalPct: 0,  jobs: 0 },
  { month: 'Avr', year: 2026, net: 321, goalPct: 32, jobs: 8 },
]

// ═══════════════════════════════════════════════════════════════
// MOTEUR DE CALCUL — toutes les métriques sont dérivées ici
// ═══════════════════════════════════════════════════════════════

function computeStats(bookings: Booking[], expenses: Expense[]) {
  const done   = bookings.filter(b => b.status === 'completed')
  const caGross = done.reduce((s, b) => s + b.price, 0)
  const urssaf  = Math.round(caGross * URSSAF_RATE)
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0)
  const netProfit = caGross - urssaf - totalExp
  const netPerPerson = Math.round(netProfit / 3)
  const goalPct   = Math.min(100, Math.round((netProfit / GOAL) * 100))
  const avgBasket = done.length ? Math.round(caGross / done.length) : 0

  const totalHours = done.reduce((s, b) => s + FORMULA_HOURS[b.formula], 0)
  const availHours = 40  // ~13 sessions × 3h dispo (étudiants, temps partiel)
  const fillRate   = Math.round((totalHours / availHours) * 100)

  const webN    = done.filter(b => b.source === 'web').length
  const manN    = done.filter(b => b.source === 'manual').length
  const webPct  = done.length ? Math.round((webN / done.length) * 100) : 0

  const fCount: Record<FormulaKey, number>  = { express: 0, 'deep-clean': 0, premium: 0 }
  const fRev:   Record<FormulaKey, number>  = { express: 0, 'deep-clean': 0, premium: 0 }
  done.forEach(b => { fCount[b.formula]++; fRev[b.formula] += b.price })

  const expByCat: Record<ExpenseCat, number> = { marketing: 0, material: 0, transport: 0 }
  expenses.forEach(e => { expByCat[e.category] += e.amount })

  const perPerson: Record<string, { jobs: number; revenue: number }> = {}
  TEAM.forEach(n => { perPerson[n] = { jobs: 0, revenue: 0 } })
  done.forEach(b => {
    if (perPerson[b.assignedTo]) {
      perPerson[b.assignedTo].jobs++
      perPerson[b.assignedTo].revenue += b.price
    }
  })

  // Projection fin de mois (interpolation linéaire sur les 31 jours de mai)
  const dayOfMonth = 18  // aujourd'hui = 18 mai
  const projection = Math.round(netProfit / dayOfMonth * 31)

  return {
    caGross, urssaf, totalExp, netProfit, netPerPerson, goalPct,
    avgBasket, totalHours, fillRate,
    webN, manN, webPct, manPct: 100 - webPct,
    fCount, fRev, expByCat, perPerson,
    doneCount: done.length,
    pendingCount: bookings.filter(b => b.status !== 'completed').length,
    projection,
  }
}

// ═══════════════════════════════════════════════════════════════
// PETITS COMPOSANTS UI
// ═══════════════════════════════════════════════════════════════

function GoalBar({ pct }: { pct: number }) {
  const [w, setW] = useState(0)
  useEffect(() => { const t = setTimeout(() => setW(pct), 300); return () => clearTimeout(t) }, [pct])
  return (
    <div>
      <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
          style={{ width: `${w}%`, transition: 'width 1.2s cubic-bezier(.4,0,.2,1)' }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] text-neutral-600 font-mono">
        {['0 €', '250 €', '500 €', '750 €', '1 000 €'].map(l => <span key={l}>{l}</span>)}
      </div>
    </div>
  )
}

function MiniBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

type BadgeVariant = 'green' | 'red' | 'orange' | 'blue' | 'purple' | 'dim'
const BADGE_CLS: Record<BadgeVariant, string> = {
  green:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  red:    'bg-red-500/10 text-red-400 border-red-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  blue:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  dim:    'bg-neutral-800 text-neutral-500 border-neutral-700',
}
function Chip({ children, v = 'dim' }: { children: React.ReactNode; v?: BadgeVariant }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${BADGE_CLS[v]}`}>
      {children}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════
// MODALE — AJOUTER UN LAVAGE MANUEL
// ═══════════════════════════════════════════════════════════════

function AddBookingModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (b: Booking) => void
}) {
  const [name, setName]     = useState('')
  const [formula, setFormula] = useState<FormulaKey>('deep-clean')
  const [size, setSize]     = useState<VehicleSize>('standard')
  const [who, setWho]       = useState('Louis')
  const [date, setDate]     = useState(new Date().toISOString().slice(0, 10))

  const price = FORMULA_PRICES[formula][size]

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({
      id: `bk-${Date.now()}`, date, clientName: name.trim(),
      formula, vehicleSize: size, source: 'manual',
      status: 'completed', price, assignedTo: who,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-t-2xl sm:rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <h3 className="font-black text-white">Ajouter un lavage manuel</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition-colors">
            <X size={14} />
          </button>
        </div>

        <form onSubmit={submit} className="p-5 space-y-4">
          <div>
            <label className="label-sm">Nom du client *</label>
            <input
              required autoFocus
              value={name} onChange={e => setName(e.target.value)}
              placeholder="Jean Dupont"
              className="inp"
            />
          </div>

          <div>
            <label className="label-sm">Formule</label>
            <div className="grid grid-cols-3 gap-2">
              {(['express', 'deep-clean', 'premium'] as FormulaKey[]).map(f => (
                <button key={f} type="button" onClick={() => setFormula(f)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${formula === f ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'}`}>
                  {f === 'express' ? 'Express' : f === 'deep-clean' ? 'Deep Clean' : 'Premium'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label-sm">Véhicule</label>
            <div className="grid grid-cols-2 gap-2">
              {(['standard', 'suv'] as VehicleSize[]).map(s => (
                <button key={s} type="button" onClick={() => setSize(s)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${size === s ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'}`}>
                  {s === 'standard' ? 'Standard' : 'SUV (+20 €)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-sm">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                style={{ colorScheme: 'dark' }} className="inp" />
            </div>
            <div>
              <label className="label-sm">Attribué à</label>
              <select value={who} onChange={e => setWho(e.target.value)} className="inp">
                {TEAM.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3">
            <span className="text-sm text-neutral-400">Prix calculé</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{price} €</span>
          </div>

          <button type="submit" disabled={!name.trim()}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white font-bold rounded-xl text-sm transition-colors">
            Enregistrer le lavage
          </button>
        </form>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MODALE — AJOUTER UNE DÉPENSE
// ═══════════════════════════════════════════════════════════════

function AddExpenseModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (e: Expense) => void
}) {
  const [cat, setCat]   = useState<ExpenseCat>('material')
  const [label, setLbl] = useState('')
  const [amt, setAmt]   = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  const parsed = parseFloat(amt)
  const valid  = label.trim() && parsed > 0

  const CATS: { v: ExpenseCat; label: string; emoji: string }[] = [
    { v: 'marketing', label: 'Marketing',  emoji: '📢' },
    { v: 'material',  label: 'Matériel',   emoji: '🧽' },
    { v: 'transport', label: 'Transport',  emoji: '⛽' },
  ]

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    onAdd({ id: `ex-${Date.now()}`, date, category: cat, label: label.trim(), amount: parsed })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-t-2xl sm:rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <h3 className="font-black text-white">Ajouter une dépense</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition-colors">
            <X size={14} />
          </button>
        </div>

        <form onSubmit={submit} className="p-5 space-y-4">
          <div>
            <label className="label-sm">Catégorie</label>
            <div className="grid grid-cols-3 gap-2">
              {CATS.map(c => (
                <button key={c.v} type="button" onClick={() => setCat(c.v)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${cat === c.v ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'}`}>
                  <span className="block text-lg mb-0.5">{c.emoji}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label-sm">Description *</label>
            <input required value={label} onChange={e => setLbl(e.target.value)}
              placeholder="ex. Koch Chemie APC 5L"
              className="inp focus:border-red-500" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-sm">Montant (€) *</label>
              <input required type="number" min="0.01" step="0.01"
                value={amt} onChange={e => setAmt(e.target.value)}
                placeholder="0.00" className="inp focus:border-red-500" />
            </div>
            <div>
              <label className="label-sm">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                style={{ colorScheme: 'dark' }} className="inp" />
            </div>
          </div>

          {parsed > 0 && (
            <div className="flex items-center justify-between bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3">
              <span className="text-sm text-neutral-400">Impact bénéfice net</span>
              <span className="text-lg font-black text-red-400 font-mono">−{parsed.toFixed(2)} €</span>
            </div>
          )}

          <button type="submit" disabled={!valid}
            className="w-full py-3 bg-red-600/80 hover:bg-red-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white font-bold rounded-xl text-sm transition-colors">
            Enregistrer la dépense
          </button>
        </form>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MODALE — NOUVELLE CAMPAGNE ADS
// ═══════════════════════════════════════════════════════════════

function AddAdsModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (e: Expense) => void
}) {
  const PLATFORMS = [
    { v: 'Google Ads',  emoji: '🔍' },
    { v: 'Meta Ads',    emoji: '📘' },
    { v: 'TikTok Ads',  emoji: '🎵' },
    { v: 'Instagram',   emoji: '📸' },
    { v: 'Flyers',      emoji: '📄' },
    { v: 'Autre',       emoji: '📢' },
  ]
  const [platform, setPlatform] = useState('Google Ads')
  const [campaign, setCampaign] = useState('')
  const [amt, setAmt]           = useState('')
  const [date, setDate]         = useState(new Date().toISOString().slice(0, 10))

  const parsed = parseFloat(amt)
  const valid  = campaign.trim() && parsed > 0

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    onAdd({ id: `ex-${Date.now()}`, date, category: 'marketing', label: `${platform} – ${campaign.trim()}`, amount: parsed })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-t-2xl sm:rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <h3 className="font-black text-white">Nouvelle campagne Ads</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition-colors">
            <X size={14} />
          </button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-4">
          <div>
            <label className="label-sm">Plateforme</label>
            <div className="grid grid-cols-3 gap-2">
              {PLATFORMS.map(p => (
                <button key={p.v} type="button" onClick={() => setPlatform(p.v)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${platform === p.v ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'}`}>
                  <span className="block text-base mb-0.5">{p.emoji}</span>
                  {p.v}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label-sm">Nom de la campagne *</label>
            <input required value={campaign} onChange={e => setCampaign(e.target.value)}
              placeholder="ex. Brest Local – Mai 2026"
              className="inp focus:border-orange-500" autoFocus />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-sm">Budget (€) *</label>
              <input required type="number" min="0.01" step="0.01"
                value={amt} onChange={e => setAmt(e.target.value)}
                placeholder="0.00" className="inp focus:border-orange-500" />
            </div>
            <div>
              <label className="label-sm">Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                style={{ colorScheme: 'dark' }} className="inp" />
            </div>
          </div>
          {parsed > 0 && (
            <div className="flex items-center justify-between bg-orange-500/5 border border-orange-500/20 rounded-xl px-4 py-3">
              <span className="text-sm text-neutral-400">Impact budget marketing</span>
              <span className="text-lg font-black text-orange-400 font-mono">−{parsed.toFixed(2)} €</span>
            </div>
          )}
          <button type="submit" disabled={!valid}
            className="w-full py-3 bg-orange-600/80 hover:bg-orange-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white font-bold rounded-xl text-sm transition-colors">
            Enregistrer la campagne
          </button>
        </form>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ONGLET 1 — VUE D'ENSEMBLE
// ═══════════════════════════════════════════════════════════════

type Stats = ReturnType<typeof computeStats>

function OverviewTab({ s }: { s: Stats }) {
  const AVATAR = ['bg-emerald-500/10 text-emerald-400', 'bg-blue-500/10 text-blue-400', 'bg-purple-500/10 text-purple-400']

  return (
    <div className="space-y-4">

      {/* ── Objectif + barre ── */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="label-xs mb-1">Objectif Mai 2026</p>
            <h2 className="text-base font-black text-white">Bénéfice Net · 1 000 €</h2>
          </div>
          <div className="text-right">
            <p className="text-[38px] font-black font-mono leading-none text-emerald-400">
              {s.netProfit.toLocaleString('fr-FR')} <span className="text-xl text-emerald-600">€</span>
            </p>
            <p className="text-[11px] text-neutral-600 mt-0.5">sur 1 000 € objectif</p>
          </div>
        </div>
        <GoalBar pct={s.goalPct} />

        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: 'Avancement',    value: `${s.goalPct}%`,                            color: 'text-white' },
            { label: 'Projection',    value: `${s.projection.toLocaleString('fr-FR')} €`, color: 'text-emerald-400' },
            { label: 'Par personne',  value: `${s.netPerPerson} €`,                       color: 'text-white' },
          ].map(c => (
            <div key={c.label} className="bg-neutral-800/50 rounded-xl p-4 text-center">
              <p className="label-xs mb-1">{c.label}</p>
              <p className={`text-2xl font-black font-mono ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <p className="label-xs mb-3">CA Brut</p>
          <p className="kpi text-white">{s.caGross.toLocaleString('fr-FR')}<span className="text-sm font-normal text-neutral-500 ml-1">€</span></p>
          <p className="text-[11px] text-red-400 font-semibold mt-1">URSSAF : −{s.urssaf} €</p>
        </div>
        <div className="card p-5">
          <p className="label-xs mb-3">Bénéfice Net</p>
          <p className="kpi text-emerald-400">{s.netProfit.toLocaleString('fr-FR')}<span className="text-sm font-normal text-neutral-500 ml-1">€</span></p>
          <p className="text-[11px] text-neutral-600 mt-1">{s.netPerPerson} € / personne</p>
        </div>
        <div className="card p-5">
          <p className="label-xs mb-3">Panier moyen</p>
          <p className="kpi text-white">{s.avgBasket}<span className="text-sm font-normal text-neutral-500 ml-1">€</span></p>
          <p className="text-[11px] text-neutral-600 mt-1">{s.doneCount} prestations</p>
        </div>
        <div className="card p-5">
          <p className="label-xs mb-3">Taux de remplissage</p>
          <p className="kpi text-white">{s.fillRate}<span className="text-sm font-normal text-neutral-500 ml-1">%</span></p>
          <p className="text-[11px] text-neutral-600 mt-1">{s.totalHours}h / 78h dispo</p>
        </div>
      </div>

      {/* ── Sources + Formules ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <p className="label-xs mb-4">Répartition des sources</p>
          <div className="space-y-4">
            {[
              { icon: <Globe size={13} className="text-blue-400" />,   label: 'Site Internet',   n: s.webN, pct: s.webPct,  color: 'bg-blue-500'   },
              { icon: <Users size={13} className="text-purple-400" />, label: 'Bouche à oreille', n: s.manN, pct: s.manPct, color: 'bg-purple-500' },
            ].map(row => (
              <div key={row.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    {row.icon}
                    <span className="text-sm font-semibold text-white">{row.label}</span>
                  </div>
                  <span className="text-sm font-black text-white font-mono">{row.pct}% · {row.n} jobs</span>
                </div>
                <MiniBar pct={row.pct} color={row.color} />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <p className="label-xs mb-4">Répartition des formules</p>
          <div className="space-y-4">
            {(['express', 'deep-clean', 'premium'] as FormulaKey[]).map((f, i) => {
              const cols = [
                { bar: 'bg-yellow-500', text: 'text-yellow-400' },
                { bar: 'bg-emerald-500', text: 'text-emerald-400' },
                { bar: 'bg-purple-500', text: 'text-purple-400' },
              ]
              const pct = s.doneCount ? Math.round((s.fCount[f] / s.doneCount) * 100) : 0
              return (
                <div key={f}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`text-sm font-semibold ${cols[i].text}`}>{FORMULA_LABELS[f]}</span>
                    <span className="text-sm font-black text-white font-mono">{s.fCount[f]} · {s.fRev[f]} €</span>
                  </div>
                  <MiniBar pct={pct} color={cols[i].bar} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Équipe ── */}
      <div className="card p-5">
        <p className="label-xs mb-4">Répartition par équipier</p>
        <div className="grid grid-cols-3 gap-4">
          {TEAM.map((name, i) => {
            const p = s.perPerson[name]
            return (
              <div key={name} className="bg-neutral-800/50 rounded-xl p-4 text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 font-black text-sm ${AVATAR[i]}`}>
                  {name.slice(0, 2).toUpperCase()}
                </div>
                <p className="font-bold text-white text-sm">{name}</p>
                <p className="text-[11px] text-neutral-600 mt-0.5">{p.jobs} jobs</p>
                <p className="text-base font-black text-emerald-400 font-mono mt-1">{p.revenue} €</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ONGLET 2 — RÉSERVATIONS & CLIENTS
// ═══════════════════════════════════════════════════════════════

function BookingsTab({ bookings, onAdd, onDelete }: {
  bookings: Booking[]
  onAdd: () => void
  onDelete: (id: string) => void
}) {
  const [filter, setFilter] = useState<'all' | BookingStatus>('all')

  const STATUS: Record<BookingStatus, { label: string; cls: string }> = {
    completed: { label: 'Terminé',    cls: 'text-emerald-400' },
    confirmed: { label: 'Confirmé',   cls: 'text-blue-400'    },
    pending:   { label: 'En attente', cls: 'text-orange-400'  },
  }

  const rows = [...bookings]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter(b => filter === 'all' || b.status === filter)

  const doneRevenue = rows.filter(b => b.status === 'completed').reduce((s, b) => s + b.price, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-1">
          {(['all', 'completed', 'confirmed', 'pending'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filter === f ? 'bg-neutral-700 text-white' : 'text-neutral-600 hover:text-neutral-300'}`}>
              {f === 'all' ? 'Tous' : STATUS[f].label}
            </button>
          ))}
        </div>
        <button onClick={onAdd}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors">
          <Plus size={14} /> Ajouter un lavage manuel
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                {['Date', 'Client', 'Formule', 'Source', 'Prix', 'Attribué', 'Statut', ''].map(h => (
                  <th key={h} className={`px-5 py-3.5 label-xs text-left ${h === 'Prix' ? 'text-right' : ''} ${['Formule','Attribué'].includes(h) ? 'hidden md:table-cell' : ''} ${h === 'Source' ? 'hidden lg:table-cell' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(b => (
                <tr key={b.id} className="border-b border-neutral-800/40 hover:bg-neutral-800/20 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-neutral-500 text-xs whitespace-nowrap">
                    {new Date(b.date + 'T12:00:00').toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-white whitespace-nowrap">{b.clientName}</td>
                  <td className="px-5 py-3.5 text-neutral-400 hidden md:table-cell whitespace-nowrap">{FORMULA_LABELS[b.formula]}</td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    {b.source === 'web'
                      ? <Chip v="blue">🌐 Web</Chip>
                      : <Chip v="purple">👥 Manuel</Chip>}
                  </td>
                  <td className="px-5 py-3.5 text-right font-black text-white font-mono">{b.price} €</td>
                  <td className="px-5 py-3.5 text-neutral-500 hidden md:table-cell">{b.assignedTo}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-bold ${STATUS[b.status].cls}`}>{STATUS[b.status].label}</span>
                  </td>
                  <td className="px-3 py-3.5">
                    <button onClick={() => onDelete(b.id)}
                      className="w-6 h-6 flex items-center justify-center rounded text-neutral-700 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 size={11} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <p className="py-12 text-center text-neutral-700 text-sm">Aucune prestation trouvée</p>
        )}
        <div className="px-5 py-3.5 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-xs text-neutral-600">{rows.length} ligne{rows.length > 1 ? 's' : ''}</span>
          <span className="text-sm font-black text-white font-mono">{doneRevenue.toLocaleString('fr-FR')} € CA</span>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ONGLET 3 — LOGISTIQUE & DÉPENSES
// ═══════════════════════════════════════════════════════════════

const CAT_CFG: Record<ExpenseCat, { label: string; icon: React.ReactNode; cls: string; bg: string }> = {
  marketing: { label: 'Marketing / Ads',        icon: <BarChart2 size={14} />,  cls: 'text-orange-400', bg: 'bg-orange-500/10' },
  material:  { label: 'Matériel & Consommables', icon: <ShoppingBag size={14} />, cls: 'text-blue-400',   bg: 'bg-blue-500/10'   },
  transport: { label: 'Transport',               icon: <Car size={14} />,         cls: 'text-purple-400', bg: 'bg-purple-500/10' },
}

function LogisticsTab({ expenses, s, onAdd, onDelete }: {
  expenses: Expense[]
  s: Stats
  onAdd: () => void
  onDelete: (id: string) => void
}) {
  const rows = [...expenses].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="space-y-4">

      {/* Résumé chiffré */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <p className="label-xs mb-3">Total Dépenses</p>
          <p className="kpi text-red-400">{s.totalExp}<span className="text-sm font-normal text-neutral-500 ml-1">€</span></p>
          <p className="text-[11px] text-neutral-600 mt-1">{expenses.length} lignes</p>
        </div>
        {(['marketing', 'material', 'transport'] as ExpenseCat[]).map(cat => {
          const c = CAT_CFG[cat]
          return (
            <div key={cat} className="card p-5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${c.bg}`}>
                <span className={c.cls}>{c.icon}</span>
              </div>
              <p className="label-xs mb-2">{c.label}</p>
              <p className={`text-2xl font-black font-mono ${c.cls}`}>{s.expByCat[cat]} €</p>
            </div>
          )
        })}
      </div>

      {/* Équation du bénéfice net */}
      <div className="card p-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="label-xs mb-1">Équation du bénéfice net</p>
          <p className="text-sm text-neutral-400 leading-relaxed">
            CA Brut <span className="text-white font-bold font-mono">{s.caGross} €</span>
            {' − '}URSSAF <span className="text-red-400 font-bold font-mono">{s.urssaf} €</span>
            {' − '}Dépenses <span className="text-red-400 font-bold font-mono">{s.totalExp} €</span>
            {' = '}
            <span className="text-emerald-400 font-black font-mono">{s.netProfit} €</span>
          </p>
        </div>
        <button onClick={onAdd}
          className="flex items-center gap-2 bg-red-600/80 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors">
          <Plus size={14} /> Ajouter une dépense
        </button>
      </div>

      {/* Tableau des dépenses */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                {['Date', 'Catégorie', 'Description', 'Montant', ''].map(h => (
                  <th key={h} className={`px-5 py-3.5 label-xs text-left ${h === 'Montant' ? 'text-right' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(ex => {
                const c = CAT_CFG[ex.category]
                return (
                  <tr key={ex.id} className="border-b border-neutral-800/40 hover:bg-neutral-800/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-neutral-500 text-xs whitespace-nowrap">
                      {new Date(ex.date + 'T12:00:00').toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg ${c.bg} ${c.cls}`}>
                        {c.icon} {c.label.split(' ')[0]}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-neutral-400">{ex.label}</td>
                    <td className="px-5 py-3.5 text-right font-black text-red-400 font-mono">−{ex.amount} €</td>
                    <td className="px-3 py-3.5">
                      <button onClick={() => onDelete(ex.id)}
                        className="w-6 h-6 flex items-center justify-center rounded text-neutral-700 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 size={11} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <p className="py-12 text-center text-neutral-700 text-sm">Aucune dépense enregistrée</p>
        )}
        <div className="px-5 py-3.5 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-xs text-neutral-600">{rows.length} dépense{rows.length > 1 ? 's' : ''}</span>
          <span className="text-sm font-black text-red-400 font-mono">−{s.totalExp} €</span>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MODALE — CALCULATEUR DE DEVIS
// ═══════════════════════════════════════════════════════════════

const SUPPLY_EST: Record<FormulaKey, number> = { express: 12, 'deep-clean': 20, premium: 32 }

function DevisModal({ onClose }: { onClose: () => void }) {
  const [formula, setFormula] = useState<FormulaKey>('deep-clean')
  const [size, setSize]       = useState<VehicleSize>('standard')
  const [discount, setDiscount] = useState(0)

  const base      = FORMULA_PRICES[formula][size]
  const price     = Math.round(base * (1 - discount / 100))
  const urssafAmt = Math.round(price * URSSAF_RATE)
  const supplies  = SUPPLY_EST[formula]
  const fuel      = 7
  const net       = price - urssafAmt - supplies - fuel

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-t-2xl sm:rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <FileText size={15} className="text-blue-400" />
            <h3 className="font-black text-white">Calculateur de devis</h3>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition-colors">
            <X size={14} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="label-sm">Formule</label>
            <div className="grid grid-cols-3 gap-2">
              {(['express', 'deep-clean', 'premium'] as FormulaKey[]).map(f => (
                <button key={f} type="button" onClick={() => setFormula(f)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${formula === f ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'}`}>
                  <span className="block text-[10px] text-neutral-600 mb-0.5">{FORMULA_HOURS[f]}h</span>
                  {f === 'express' ? 'Express' : f === 'deep-clean' ? 'Deep Clean' : 'Premium'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label-sm">Véhicule</label>
            <div className="grid grid-cols-2 gap-2">
              {(['standard', 'suv'] as VehicleSize[]).map(s => (
                <button key={s} type="button" onClick={() => setSize(s)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${size === s ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400'}`}>
                  {s === 'standard' ? 'Standard' : 'SUV (+20 €)'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label-sm">Remise client</label>
            <div className="flex gap-1.5">
              {[0, 5, 10, 15].map(d => (
                <button key={d} type="button" onClick={() => setDiscount(d)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${discount === d ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-neutral-800 border-neutral-700 text-neutral-500'}`}>
                  {d === 0 ? '0%' : `-${d}%`}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-neutral-800/60 border border-neutral-700 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between items-center pb-2.5 border-b border-neutral-700">
              <div>
                <p className="text-xs text-neutral-500">Prix à annoncer</p>
                {discount > 0 && <p className="text-[10px] text-neutral-700 line-through font-mono">{base} €</p>}
              </div>
              <p className="text-[28px] font-black text-blue-400 font-mono leading-none">{price} €</p>
            </div>
            {[
              { label: `URSSAF (${(URSSAF_RATE * 100).toFixed(1)}%)`, val: urssafAmt, color: 'text-red-400' },
              { label: 'Consommables estimés',                        val: supplies,  color: 'text-orange-400' },
              { label: 'Carburant estimé',                            val: fuel,      color: 'text-orange-400' },
            ].map(r => (
              <div key={r.label} className="flex justify-between">
                <span className="text-xs text-neutral-600">{r.label}</span>
                <span className={`text-xs font-bold font-mono ${r.color}`}>−{r.val} €</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2.5 border-t border-neutral-700">
              <span className="text-sm font-bold text-white">Net estimé</span>
              <span className={`text-xl font-black font-mono ${net >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {net >= 0 ? '+' : ''}{net} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ONGLET 5 — CLIENTS (CRM)
// ═══════════════════════════════════════════════════════════════

function buildClients(bookings: Booking[]): ClientProfile[] {
  const map: Record<string, { totalSpent: number; visits: number; lastVisit: string; formulas: Record<FormulaKey, number> }> = {}
  bookings.filter(b => b.status === 'completed').forEach(b => {
    if (!map[b.clientName]) map[b.clientName] = { totalSpent: 0, visits: 0, lastVisit: b.date, formulas: { express: 0, 'deep-clean': 0, premium: 0 } }
    const p = map[b.clientName]
    p.totalSpent += b.price; p.visits++
    if (b.date > p.lastVisit) p.lastVisit = b.date
    p.formulas[b.formula]++
  })
  const TODAY = new Date('2026-05-18T12:00:00')
  return Object.entries(map).map(([name, d]) => {
    const favF = (Object.entries(d.formulas) as [FormulaKey, number][])
      .reduce<[FormulaKey, number]>((best, cur) => cur[1] > best[1] ? cur : best, ['deep-clean', 0])[0]
    const daysSince = Math.round((TODAY.getTime() - new Date(d.lastVisit + 'T12:00:00').getTime()) / 86400000)
    return { name, ...d, favoriteFormula: favF, daysSince }
  }).sort((a, b) => b.totalSpent - a.totalSpent)
}

const F_COLOR: Record<FormulaKey, string> = { 'express': 'text-yellow-400', 'deep-clean': 'text-emerald-400', 'premium': 'text-purple-400' }

function ClientsTab({ bookings }: { bookings: Booking[] }) {
  const clients  = useMemo(() => buildClients(bookings), [bookings])
  const [search, setSearch] = useState('')
  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const toRelance  = clients.filter(c => c.daysSince > 30).length
  const fideles    = clients.filter(c => c.visits > 1).length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5"><p className="label-xs mb-2">Clients uniques</p><p className="kpi text-white">{clients.length}</p></div>
        <div className="card p-5">
          <p className="label-xs mb-2">Clients fidèles</p>
          <p className="kpi text-emerald-400">{fideles}</p>
          <p className="text-[11px] text-neutral-600 mt-1">2+ visites</p>
        </div>
        <div className={`card p-5 ${toRelance > 0 ? 'border-orange-500/30' : ''}`}>
          <p className="label-xs mb-2">À relancer</p>
          <p className={`kpi ${toRelance > 0 ? 'text-orange-400' : 'text-emerald-400'}`}>{toRelance}</p>
          <p className="text-[11px] text-neutral-600 mt-1">&gt;30 jours absents</p>
        </div>
      </div>

      <div className="relative">
        <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un client…" className="inp pl-9" />
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="px-5 py-3.5 label-xs text-left">Client</th>
              <th className="px-5 py-3.5 label-xs text-left hidden sm:table-cell">Formule préférée</th>
              <th className="px-5 py-3.5 label-xs text-right">Total</th>
              <th className="px-5 py-3.5 label-xs text-center hidden md:table-cell">Visites</th>
              <th className="px-5 py-3.5 label-xs text-left hidden lg:table-cell">Dernière visite</th>
              <th className="px-5 py-3.5 label-xs text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.name} className="border-b border-neutral-800/40 hover:bg-neutral-800/20 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] font-black text-neutral-400 flex-shrink-0">
                      {c.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-semibold text-white whitespace-nowrap">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 hidden sm:table-cell">
                  <span className={`text-xs font-semibold ${F_COLOR[c.favoriteFormula]}`}>{FORMULA_LABELS[c.favoriteFormula]}</span>
                </td>
                <td className="px-5 py-3.5 text-right font-black text-white font-mono">{c.totalSpent} €</td>
                <td className="px-5 py-3.5 text-center text-neutral-400 hidden md:table-cell">{c.visits}</td>
                <td className="px-5 py-3.5 text-neutral-500 text-xs font-mono whitespace-nowrap hidden lg:table-cell">
                  {new Date(c.lastVisit + 'T12:00:00').toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                  <span className="text-neutral-700 ml-1">({c.daysSince}j)</span>
                </td>
                <td className="px-5 py-3.5">
                  {c.daysSince > 30
                    ? <Chip v="orange">Relancer</Chip>
                    : c.visits > 1 ? <Chip v="green">Fidèle</Chip>
                    : <Chip v="dim">Nouveau</Chip>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="py-8 text-center text-neutral-700 text-sm">Aucun client trouvé</p>}
        <div className="px-5 py-3 border-t border-neutral-800 text-xs text-neutral-600">
          {filtered.length} client{filtered.length > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ONGLET 6 — MARKETING & ROI
// ═══════════════════════════════════════════════════════════════

function MarketingTab({ bookings, expenses, s, onAddAds }: { bookings: Booking[]; expenses: Expense[]; s: Stats; onAddAds: () => void }) {
  const mktExp  = expenses.filter(e => e.category === 'marketing')
  const mktCost = mktExp.reduce((acc, e) => acc + e.amount, 0)

  const webDone    = bookings.filter(b => b.status === 'completed' && b.source === 'web')
  const webCA      = webDone.reduce((acc, b) => acc + b.price, 0)
  const webNetEst  = Math.round(webCA * (1 - URSSAF_RATE) - webDone.length * 15)

  const cac = webDone.length > 0 ? Math.round((mktCost / webDone.length) * 10) / 10 : 0
  const roi = mktCost > 0 ? Math.round(((webNetEst - mktCost) / mktCost) * 100) : 0

  const w1 = bookings.filter(b => b.status === 'completed' && b.date >= '2026-05-03' && b.date <= '2026-05-09')
  const w2 = bookings.filter(b => b.status === 'completed' && b.date >= '2026-05-10' && b.date <= '2026-05-16')
  const w1CA = w1.reduce((a, b) => a + b.price, 0)
  const w2CA = w2.reduce((a, b) => a + b.price, 0)
  const weekDelta = w1CA > 0 ? Math.round(((w2CA - w1CA) / w1CA) * 100) : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-base font-black text-white">Marketing & ROI</p>
        <button onClick={onAddAds}
          className="flex items-center gap-1.5 text-[11px] font-bold text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 px-3 py-1.5 rounded-full transition-colors">
          <Plus size={11} />
          Campagne Ads
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5">
          <p className="label-xs mb-3">Dépenses Ads</p>
          <p className="kpi text-red-400">{mktCost}<span className="text-sm font-normal text-neutral-500 ml-1">€</span></p>
          <p className="text-[11px] text-neutral-600 mt-1">{mktExp.length} campagnes</p>
        </div>
        <div className="card p-5">
          <p className="label-xs mb-3">CA généré (Web)</p>
          <p className="kpi text-white">{webCA}<span className="text-sm font-normal text-neutral-500 ml-1">€</span></p>
          <p className="text-[11px] text-neutral-600 mt-1">{webDone.length} résa via site</p>
        </div>
        <div className="card p-5">
          <p className="label-xs mb-3">Coût / Acquisition</p>
          <p className="kpi text-orange-400">{cac}<span className="text-sm font-normal text-neutral-500 ml-1">€</span></p>
          <p className="text-[11px] text-neutral-600 mt-1">par réservation web</p>
        </div>
        <div className={`card p-5 ${roi >= 0 ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
          <p className="label-xs mb-3">ROI Marketing</p>
          <p className={`kpi ${roi >= 100 ? 'text-emerald-400' : roi >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>
            {roi >= 0 ? '+' : ''}{roi}<span className="text-sm font-normal text-neutral-500 ml-0.5">%</span>
          </p>
          <p className="text-[11px] text-neutral-600 mt-1">net vs invest</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Campagnes */}
        <div className="card p-5">
          <p className="label-xs mb-4">Détail des campagnes</p>
          <div className="space-y-4">
            {mktExp.map(e => {
              const pct = mktCost > 0 ? Math.round((e.amount / mktCost) * 100) : 0
              return (
                <div key={e.id}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-semibold text-white">{e.label}</span>
                    <span className="text-sm font-bold text-red-400 font-mono">−{e.amount} €</span>
                  </div>
                  <MiniBar pct={pct} color="bg-orange-500" />
                  <p className="text-[10px] text-neutral-700 mt-1">{pct}% du budget marketing</p>
                </div>
              )
            })}
            {mktExp.length === 0 && <p className="text-sm text-neutral-700">Aucune dépense marketing enregistrée</p>}
          </div>
        </div>

        {/* Semaines + sources */}
        <div className="space-y-4">
          <div className="card p-5">
            <p className="label-xs mb-3">Tendance hebdomadaire</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '3–9 mai',   jobs: w1.length, ca: w1CA },
                { label: '10–16 mai', jobs: w2.length, ca: w2CA },
              ].map(w => (
                <div key={w.label} className="bg-neutral-800/50 rounded-xl p-3">
                  <p className="text-[10px] text-neutral-600 mb-1">{w.label}</p>
                  <p className="text-lg font-black text-white font-mono">{w.ca} €</p>
                  <p className="text-[10px] text-neutral-600 mt-0.5">{w.jobs} prestations</p>
                </div>
              ))}
            </div>
            <div className={`mt-3 flex items-center gap-1.5 text-sm font-semibold ${weekDelta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              <TrendingUp size={13} />
              {weekDelta >= 0 ? '+' : ''}{weekDelta}% vs semaine précédente
            </div>
          </div>

          <div className="card p-5">
            <p className="label-xs mb-3">Acquisition — sources</p>
            <div className="space-y-3">
              {[
                { icon: <Globe size={12} className="text-blue-400" />, label:'Site Internet',   n: s.webN,  pct: s.webPct,  ca: webCA,              color:'bg-blue-500'   },
                { icon: <Users size={12} className="text-purple-400" />, label:'Bouche à oreille', n: s.manN, pct: s.manPct, ca: s.caGross - webCA, color:'bg-purple-500' },
              ].map(row => (
                <div key={row.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white flex items-center gap-1.5">{row.icon} {row.label}</span>
                    <span className="text-sm font-black text-white font-mono">{row.pct}%</span>
                  </div>
                  <MiniBar pct={row.pct} color={row.color} />
                  <p className="text-[10px] text-neutral-700 mt-1">{row.n} résa · {row.ca} € CA</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ONGLET 7 — STOCKS & CONSOMMABLES
// ═══════════════════════════════════════════════════════════════

const CAT_SUPPLY: Record<Supply['category'], { label: string; color: string; bg: string }> = {
  product:    { label: 'Produit',     color: 'text-blue-400',   bg: 'bg-blue-500/10'   },
  consumable: { label: 'Consommable', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  equipment:  { label: 'Équipement',  color: 'text-purple-400', bg: 'bg-purple-500/10' },
}

function StocksTab({ supplies, setSupplies }: {
  supplies: Supply[]
  setSupplies: React.Dispatch<React.SetStateAction<Supply[]>>
}) {
  const lowStock    = supplies.filter(s => s.qty < s.minQty)
  const stockValue  = supplies.reduce((a, s) => a + s.qty * s.cost, 0)

  const consume = (id: string) => setSupplies(prev => prev.map(s =>
    s.id === id ? { ...s, qty: Math.max(0, Math.round((s.qty - s.usePerJob) * 100) / 100) } : s
  ))
  const restock = (id: string) => setSupplies(prev => prev.map(s =>
    s.id === id ? { ...s, qty: Math.round(s.minQty * 4 * 10) / 10 } : s
  ))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5">
          <p className="label-xs mb-2">Articles suivis</p>
          <p className="kpi text-white">{supplies.length}</p>
        </div>
        <div className="card p-5">
          <p className="label-xs mb-2">Valeur stock</p>
          <p className="kpi text-white">{Math.round(stockValue)}<span className="text-sm font-normal text-neutral-500 ml-1">€</span></p>
        </div>
        <div className={`card p-5 ${lowStock.length > 0 ? 'border-red-500/30 bg-red-500/[0.03]' : ''}`}>
          <p className="label-xs mb-2">Alertes</p>
          <p className={`kpi ${lowStock.length > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{lowStock.length}</p>
          <p className="text-[11px] text-neutral-600 mt-1">{lowStock.length > 0 ? 'sous le seuil' : 'tout est OK'}</p>
        </div>
      </div>

      {lowStock.length > 0 && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-400">Stock critique · {lowStock.length} article{lowStock.length > 1 ? 's' : ''} à commander</p>
            <p className="text-xs text-neutral-600 mt-0.5">{lowStock.map(s => s.name).join(' · ')}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {supplies.map(s => {
          const cfg      = CAT_SUPPLY[s.category]
          const isLow    = s.qty < s.minQty
          const fillPct  = Math.min(100, Math.round((s.qty / (s.minQty * 4)) * 100))
          const jobsLeft = s.usePerJob > 0 ? Math.floor(s.qty / s.usePerJob) : null

          return (
            <div key={s.id} className={`card p-4 ${isLow ? 'border-red-500/30' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                    {isLow && <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-red-500/10 text-red-400">CRITIQUE</span>}
                  </div>
                  <p className="font-bold text-white text-sm">{s.name}</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-black font-mono leading-none ${isLow ? 'text-red-400' : 'text-white'}`}>{s.qty}</p>
                  <p className="text-[10px] text-neutral-600">{s.unit}</p>
                </div>
              </div>

              <MiniBar pct={fillPct} color={isLow ? 'bg-red-500' : fillPct < 40 ? 'bg-orange-500' : 'bg-emerald-500'} />
              <div className="flex justify-between mt-1 mb-3">
                <span className="text-[9px] text-neutral-700">Min : {s.minQty} {s.unit}</span>
                {jobsLeft !== null && (
                  <span className="text-[9px] text-neutral-600">~{jobsLeft} job{jobsLeft > 1 ? 's' : ''}</span>
                )}
              </div>

              <div className="flex gap-2">
                {s.usePerJob > 0 && (
                  <button onClick={() => consume(s.id)} disabled={s.qty <= 0}
                    className="flex-1 py-1.5 rounded-lg text-[11px] font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors">
                    −1 job
                  </button>
                )}
                <button onClick={() => restock(s.id)}
                  className="flex-1 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors">
                  Réappro.
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ONGLET 4 — CALENDRIER & PROJECTIONS
// ═══════════════════════════════════════════════════════════════

// May 1 2026 = Friday → offset 4 in Mon-first grid (Mon=0 … Sun=6)
const MAY_START_OFFSET = 4
const MAY_DAYS         = 31
const DAY_TODAY        = 18   // 18 mai 2026

function CalendarTab({ bookings, s }: { bookings: Booking[]; s: Stats }) {
  // ── Par jour ──
  type DayData = { completed: number; pending: number; revenue: number }
  const byDate: Record<string, DayData> = {}
  bookings.forEach(b => {
    if (!byDate[b.date]) byDate[b.date] = { completed: 0, pending: 0, revenue: 0 }
    if (b.status === 'completed') { byDate[b.date].completed++; byDate[b.date].revenue += b.price }
    else byDate[b.date].pending++
  })

  // ── Meilleur jour ──
  const bestEntry = Object.entries(byDate).reduce<[string, DayData] | null>(
    (best, cur) => (!best || cur[1].revenue > best[1].revenue ? cur : best), null
  )
  const bestDayNum     = bestEntry ? parseInt(bestEntry[0].slice(-2)) : 0
  const bestDayRevenue = bestEntry ? bestEntry[1].revenue : 0

  // ── Réservations à venir ──
  const upcoming    = bookings.filter(b => b.status !== 'completed')
  const upcomingCA  = upcoming.reduce((acc, b) => acc + b.price, 0)
  const upcomingNet = Math.round(upcomingCA - upcomingCA * URSSAF_RATE - upcoming.length * 15)

  // ── Projections ──
  const daysElapsed = DAY_TODAY
  const daysLeft    = MAY_DAYS - daysElapsed
  const dailyNet    = s.netProfit / daysElapsed
  const trendProj   = Math.round(s.netProfit + dailyNet * daysLeft)
  const realistProj = Math.round(s.netProfit + upcomingNet + dailyNet * Math.max(0, daysLeft - upcoming.length))
  const optimistProj = Math.round(trendProj * 1.22)

  // ── Grille calendrier ──
  const cells: (number | null)[] = [
    ...Array(MAY_START_OFFSET).fill(null),
    ...Array.from({ length: MAY_DAYS }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  // ── Historique complet (5 mois précédents + mai live) ──
  const history = [...HISTORY_PREV, { month: 'Mai', year: 2026, net: s.netProfit, goalPct: s.goalPct, jobs: s.doneCount }]
  const maxNet  = Math.max(...history.map(m => m.net), 1)

  return (
    <div className="space-y-4">

      {/* ── Bloc projection header ── */}
      <div className="card p-5">
        <div className="flex items-baseline gap-3 mb-4">
          <h2 className="font-black text-white text-base">Projection — Mai 2026</h2>
          <span className="text-sm text-neutral-600">J{DAY_TODAY}/31 · {daysLeft}j restants</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Réalisé */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-2">Réalisé ce mois</p>
            <p className="text-2xl font-black text-emerald-400 font-mono">+{s.netProfit.toLocaleString('fr-FR')} €</p>
            <p className="text-xs text-neutral-500 mt-1.5">
              {s.doneCount} prestations · <span className="text-emerald-600 font-semibold">{s.goalPct}% de l&apos;objectif</span>
            </p>
          </div>

          {/* À venir */}
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-orange-600 mb-2">Réservations à venir</p>
            <p className="text-2xl font-black text-orange-400 font-mono">~+{upcomingNet} €</p>
            <p className="text-xs text-neutral-500 mt-1.5">
              {upcoming.length} réservation{upcoming.length > 1 ? 's' : ''} confirmée{upcoming.length > 1 ? 's' : ''}/en attente
            </p>
          </div>

          {/* Projections */}
          <div className="bg-neutral-800/60 rounded-xl p-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 mb-3">Projections fin de mois</p>
            <div className="space-y-2">
              {[
                { label: 'Tendance actuelle',   val: trendProj,    color: 'text-white'     },
                { label: 'Réaliste (à venir)',  val: realistProj,  color: 'text-emerald-400' },
                { label: 'Optimiste',           val: optimistProj, color: 'text-emerald-300' },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-[11px] text-neutral-500">{row.label}</span>
                  <span className={`text-xs font-black font-mono ${row.color}`}>+{row.val.toLocaleString('fr-FR')} €</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-neutral-700">
                <span className="text-[11px] text-neutral-600">Objectif mensuel</span>
                <span className="text-xs font-bold font-mono text-neutral-500">1 000 €</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── KPIs du mois ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Prestations',   val: `${s.doneCount}`,                      sub: 'mai',        color: 'text-white'       },
          { label: 'CA encaissé',   val: `${s.caGross.toLocaleString('fr-FR')} €`, sub: 'brut',     color: 'text-white'       },
          { label: 'Bénéfice net',  val: `+${s.netProfit.toLocaleString('fr-FR')} €`, sub: 'net',  color: 'text-emerald-400' },
          { label: 'Meilleur jour', val: `${bestDayNum ? bestDayNum + ' mai' : '—'}`, sub: `+${bestDayRevenue} €`, color: 'text-white' },
        ].map(k => (
          <div key={k.label} className="card p-4">
            <p className="label-xs mb-2">{k.label}</p>
            <p className={`text-xl font-black font-mono ${k.color}`}>{k.val}</p>
            <p className="text-[11px] text-neutral-600 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Calendrier ── */}
      <div className="card p-5">
        <p className="label-xs mb-4">Mai 2026</p>

        {/* En-têtes jours */}
        <div className="grid grid-cols-7 mb-1">
          {['LUN','MAR','MER','JEU','VEN','SAM','DIM'].map(d => (
            <div key={d} className="text-center text-[9px] font-black text-neutral-600 py-1 tracking-wider">{d}</div>
          ))}
        </div>

        {/* Cellules */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (!day) return <div key={idx} />

            const key  = `2026-05-${String(day).padStart(2, '0')}`
            const d    = byDate[key]
            const isToday  = day === DAY_TODAY
            const isPast   = day < DAY_TODAY
            const hasJobs  = d?.completed > 0
            const hasPend  = d?.pending > 0
            const count    = hasJobs ? d.completed : hasPend ? d.pending : 0

            return (
              <div
                key={idx}
                title={hasJobs ? `${d.completed} prestation${d.completed > 1 ? 's' : ''} · ${d.revenue} €` : hasPend ? `${d.pending} en attente` : ''}
                className={[
                  'rounded-lg aspect-square flex flex-col items-center justify-center gap-0.5 cursor-default transition-all',
                  isToday  ? 'bg-emerald-500/20 ring-1 ring-emerald-500/60' :
                  hasJobs  ? 'bg-emerald-500/10 hover:bg-emerald-500/15' :
                  hasPend  ? 'bg-orange-500/10 hover:bg-orange-500/15' :
                  isPast   ? 'bg-neutral-800/20' : 'bg-transparent',
                ].join(' ')}
              >
                <span className={[
                  'text-[11px] font-mono',
                  isToday ? 'font-black text-emerald-400' :
                  hasJobs ? 'font-semibold text-neutral-300' :
                  hasPend ? 'font-semibold text-orange-400' :
                  isPast  ? 'text-neutral-700' : 'text-neutral-800',
                ].join(' ')}>
                  {day}
                </span>
                {count > 0 && (
                  <span className={`text-[9px] font-black leading-none ${hasJobs ? 'text-emerald-400' : 'text-orange-400'}`}>
                    {count}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Légende */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-neutral-800">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-500/30" />
            <span className="text-[10px] text-neutral-600">Prestation terminée</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-orange-500/30" />
            <span className="text-[10px] text-neutral-600">Réservation à venir</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded ring-1 ring-emerald-500/60 bg-emerald-500/20" />
            <span className="text-[10px] text-neutral-600">Aujourd&apos;hui</span>
          </div>
        </div>
      </div>

      {/* ── Historique mensuel ── */}
      <div className="card p-5">
        <p className="label-xs mb-4">Historique mensuel · 6 derniers mois</p>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
          {history.map((m, i) => {
            const isCurrent = i === history.length - 1
            const barH      = maxNet > 0 ? Math.max(4, Math.round((m.net / maxNet) * 56)) : 4
            return (
              <div
                key={`${m.month}${m.year}`}
                className={`rounded-xl p-3 flex flex-col items-center gap-2 ${isCurrent ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-neutral-800/40'}`}
              >
                {/* Bar */}
                <div className="w-full flex items-end justify-center h-14">
                  <div
                    className={`w-5 rounded-t-sm transition-all duration-700 ${isCurrent ? 'bg-emerald-500' : m.net > 0 ? 'bg-neutral-600' : 'bg-neutral-800'}`}
                    style={{ height: m.net > 0 ? `${barH}px` : '4px' }}
                  />
                </div>
                <div className="text-center">
                  <p className={`text-[10px] font-black ${isCurrent ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    {m.month}
                  </p>
                  <p className="text-[9px] text-neutral-700">{m.year}</p>
                  <p className={`text-[11px] font-black font-mono mt-1 ${isCurrent ? 'text-emerald-400' : m.net > 0 ? 'text-white' : 'text-neutral-700'}`}>
                    {m.net > 0 ? `+${m.net.toLocaleString('fr-FR')} €` : '+0,00 €'}
                  </p>
                  <p className="text-[9px] text-neutral-600">{m.goalPct}% obj.</p>
                  <p className="text-[9px] text-neutral-700">{m.jobs}v</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ONGLET 8 — STATISTIQUES
// ═══════════════════════════════════════════════════════════════

type StatsPeriod = '7j' | '1m' | '3m' | '6m' | '1an' | 'all'

function SVGBarChart({ data, color = '#10b981' }: { data: { label: string; value: number }[]; color?: string }) {
  if (!data.length) return <p className="text-center text-neutral-700 text-sm py-10">Pas de données</p>
  const max = Math.max(...data.map(d => d.value), 1)
  const W = 600, H = 150
  const P = { t: 10, r: 10, b: 28, l: 44 }
  const cW = W - P.l - P.r, cH = H - P.t - P.b
  const bW = Math.max(4, Math.floor((cW / data.length) * 0.65))
  const gap = cW / data.length
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 150 }}>
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = P.t + cH * (1 - t)
        return (
          <g key={t}>
            <line x1={P.l} y1={y} x2={W - P.r} y2={y} stroke="#262626" strokeWidth="1" />
            <text x={P.l - 4} y={y + 3} textAnchor="end" fontSize="8" fill="#525252">{Math.round(max * t)}€</text>
          </g>
        )
      })}
      {data.map((d, i) => {
        const bH = (d.value / max) * cH
        const x = P.l + i * gap + (gap - bW) / 2
        const show = data.length <= 12 || i % Math.ceil(data.length / 12) === 0
        return (
          <g key={d.label}>
            <rect x={x} y={P.t + cH - bH} width={bW} height={bH} fill={color} rx="2" opacity="0.85" />
            {show && (
              <text x={x + bW / 2} y={H - 5} textAnchor="middle" fontSize="8" fill="#525252">
                {d.label.length > 5 ? d.label.slice(8).replace('-', '/') : d.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

function SVGLineChart({ data, color = '#10b981' }: { data: { label: string; value: number }[]; color?: string }) {
  if (data.length < 2) return <p className="text-center text-neutral-700 text-sm py-10">Pas de données</p>
  const max = Math.max(...data.map(d => d.value), 1)
  const W = 600, H = 150
  const P = { t: 10, r: 10, b: 28, l: 44 }
  const cW = W - P.l - P.r, cH = H - P.t - P.b
  const xOf = (i: number) => P.l + (i / (data.length - 1)) * cW
  const yOf = (v: number) => P.t + cH - (v / max) * cH
  const pts = data.map((d, i) => `${xOf(i)},${yOf(d.value)}`).join(' ')
  const area = `M${xOf(0)},${P.t + cH} ` + data.map((d, i) => `L${xOf(i)},${yOf(d.value)}`).join(' ') + ` L${xOf(data.length - 1)},${P.t + cH} Z`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 150 }}>
      <defs>
        <linearGradient id={`lg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map(t => {
        const y = P.t + cH * (1 - t)
        return (
          <g key={t}>
            <line x1={P.l} y1={y} x2={W - P.r} y2={y} stroke="#262626" strokeWidth="1" />
            <text x={P.l - 4} y={y + 3} textAnchor="end" fontSize="8" fill="#525252">{Math.round(max * t)}€</text>
          </g>
        )
      })}
      <path d={area} fill={`url(#lg-${color.replace('#','')})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => {
        const show = data.length <= 12 || i % Math.ceil(data.length / 12) === 0
        if (!show) return null
        return (
          <text key={d.label} x={xOf(i)} y={H - 5} textAnchor="middle" fontSize="8" fill="#525252">
            {d.label.slice(8).replace('-', '/')}
          </text>
        )
      })}
    </svg>
  )
}

type PersonStat = { jobs: number; ca: number; net: number; avg: number }

function StatsTab({ bookings, expenses }: { bookings: Booking[]; expenses: Expense[] }) {
  const [period, setPeriod] = useState<StatsPeriod>('1m')
  const TODAY = '2026-05-18'

  const cutoffOf = (p: StatsPeriod): string => {
    if (p === 'all') return '2000-01-01'
    const d = new Date(TODAY)
    if (p === '7j')  d.setDate(d.getDate() - 7)
    if (p === '1m')  d.setMonth(d.getMonth() - 1)
    if (p === '3m')  d.setMonth(d.getMonth() - 3)
    if (p === '6m')  d.setMonth(d.getMonth() - 6)
    if (p === '1an') d.setFullYear(d.getFullYear() - 1)
    return d.toISOString().slice(0, 10)
  }

  const cutoff = cutoffOf(period)

  const prevCutoff = (() => {
    if (period === 'all') return '2000-01-01'
    const d = new Date(cutoff)
    if (period === '7j')  d.setDate(d.getDate() - 7)
    if (period === '1m')  d.setMonth(d.getMonth() - 1)
    if (period === '3m')  d.setMonth(d.getMonth() - 3)
    if (period === '6m')  d.setMonth(d.getMonth() - 6)
    if (period === '1an') d.setFullYear(d.getFullYear() - 1)
    return d.toISOString().slice(0, 10)
  })()

  const done      = bookings.filter(b => b.status === 'completed' && b.date >= cutoff && b.date <= TODAY)
  const prevDone  = bookings.filter(b => b.status === 'completed' && b.date >= prevCutoff && b.date < cutoff)
  const exp       = expenses.filter(e => e.date >= cutoff && e.date <= TODAY)
  const prevExp   = expenses.filter(e => e.date >= prevCutoff && e.date < cutoff)

  const calc = (jobs: Booking[], exps: Expense[]) => {
    const ca      = jobs.reduce((s, b) => s + b.price, 0)
    const urssaf  = Math.round(ca * URSSAF_RATE)
    const totalE  = exps.reduce((s, e) => s + e.amount, 0)
    const net     = ca - urssaf - totalE
    const avg     = jobs.length ? Math.round(ca / jobs.length) : 0
    const mkt     = exps.filter(e => e.category === 'marketing').reduce((s, e) => s + e.amount, 0)
    return { ca, urssaf, totalE, net, avg, mkt, count: jobs.length }
  }

  const s = calc(done, exp)
  const p = calc(prevDone, prevExp)

  const vsStr = (curr: number, prev: number): string => {
    if (prev === 0) return curr > 0 ? '+100%' : '–'
    const v = Math.round(((curr - prev) / Math.abs(prev)) * 100)
    return (v >= 0 ? '+' : '') + v + '%'
  }

  // By formula
  const fCount: Record<FormulaKey, number> = { express: 0, 'deep-clean': 0, premium: 0 }
  const fRev:   Record<FormulaKey, number> = { express: 0, 'deep-clean': 0, premium: 0 }
  done.forEach(b => { fCount[b.formula]++; fRev[b.formula] += b.price })

  // Per person
  const perPerson: Record<string, PersonStat> = {}
  TEAM.forEach(n => { perPerson[n] = { jobs: 0, ca: 0, net: 0, avg: 0 } })
  done.forEach(b => {
    if (perPerson[b.assignedTo]) {
      perPerson[b.assignedTo].jobs++
      perPerson[b.assignedTo].ca += b.price
    }
  })
  TEAM.forEach(n => {
    const ps = perPerson[n]
    const share = s.ca > 0 ? ps.ca / s.ca : 0
    ps.net = Math.round(s.net * share)
    ps.avg = ps.jobs > 0 ? Math.round(ps.ca / ps.jobs) : 0
  })

  // Daily CA for bar chart
  const byDate: Record<string, number> = {}
  done.forEach(b => { byDate[b.date] = (byDate[b.date] || 0) + b.price })
  const caChart = Object.keys(byDate).sort().map(d => ({ label: d, value: byDate[d] }))

  // Cumulative net line chart
  const allDates = [...new Set([...done.map(b => b.date), ...exp.map(e => e.date)])].sort()
  let cumCA = 0, cumE = 0
  const cumChart = allDates.map(d => {
    done.filter(b => b.date === d).forEach(b => { cumCA += b.price })
    exp.filter(e => e.date === d).forEach(e => { cumE += e.amount })
    return { label: d, value: Math.max(0, cumCA - Math.round(cumCA * URSSAF_RATE) - cumE) }
  })

  // Best / worst
  const sorted = [...done].sort((a, b) => b.price - a.price)
  const bestJob  = sorted[0]
  const worstJob = sorted[sorted.length - 1]

  // Acquisition
  const webN = done.filter(b => b.source === 'web').length
  const manN = done.filter(b => b.source === 'manual').length
  const webCA = done.filter(b => b.source === 'web').reduce((s, b) => s + b.price, 0)
  const manCA = done.filter(b => b.source === 'manual').reduce((s, b) => s + b.price, 0)

  // All-time CA for fiscalité block
  const allDone   = bookings.filter(b => b.status === 'completed')
  const allCA     = allDone.reduce((s, b) => s + b.price, 0)
  const allURS    = Math.round(allCA * URSSAF_RATE)

  const PERIODS: StatsPeriod[] = ['7j', '1m', '3m', '6m', '1an', 'all']
  const TEAM_COLORS = ['bg-emerald-500/10 text-emerald-400 border-emerald-500/20', 'bg-blue-500/10 text-blue-400 border-blue-500/20', 'bg-purple-500/10 text-purple-400 border-purple-500/20']
  const FORMULA_COLORS = [['text-blue-400', 'bg-blue-500'], ['text-emerald-400', 'bg-emerald-500'], ['text-purple-400', 'bg-purple-500']]
  const RANK_COLORS = ['text-yellow-400', 'text-neutral-400', 'text-orange-600']

  return (
    <div className="space-y-5">

      {/* ── Sélecteur période ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {PERIODS.map(pl => (
          <button key={pl} onClick={() => setPeriod(pl)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              period === pl
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'
            }`}>
            {pl === 'all' ? 'All Time' : pl}
          </button>
        ))}
      </div>

      {/* ── KPI ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { label: 'Chiffre d\'Affaires', val: `${s.ca.toLocaleString('fr-FR')} €`, sub: `${vsStr(s.ca, p.ca)} vs période préc.`, color: 'text-white',         ok: s.ca >= p.ca },
          { label: 'Bénéfice Net',        val: `${s.net >= 0 ? '+' : ''}${s.net.toLocaleString('fr-FR')} €`, sub: `${vsStr(s.net, p.net)} vs période préc.`, color: s.net >= 0 ? 'text-emerald-400' : 'text-red-400', ok: s.net >= p.net },
          { label: 'Prestations',         val: String(s.count),                          sub: 'Sur la période',                      color: 'text-white',         ok: s.count >= p.count },
          { label: 'Panier Moyen',        val: `${s.avg} €`,                             sub: `${vsStr(s.avg, p.avg)} vs période préc.`, color: 'text-white',    ok: s.avg >= p.avg },
          { label: 'Dépenses Ads',        val: `${s.mkt} €`,                             sub: `${exp.filter(e => e.category === 'marketing').length} campagne(s)`, color: 'text-orange-400', ok: false },
          { label: 'Dépenses Totales',    val: `−${s.totalE} €`,                         sub: `URSSAF : ${s.urssaf} €`,              color: 'text-red-400',       ok: false },
        ].map((kpi, i) => (
          <div key={i} className="card p-4">
            <p className="label-xs mb-2">{kpi.label}</p>
            <p className={`text-[22px] font-black font-mono leading-none ${kpi.color}`}>{kpi.val}</p>
            <p className={`text-[10px] mt-1.5 font-medium ${kpi.ok ? 'text-emerald-600' : 'text-neutral-600'}`}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Best / Worst ── */}
      {bestJob && worstJob && (
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4">
            <p className="label-xs mb-2">Meilleure Prestation</p>
            <p className="text-sm font-bold text-white">{FORMULA_LABELS[bestJob.formula]}</p>
            <p className="text-[11px] text-neutral-500 truncate">{bestJob.clientName}</p>
            <p className="text-xl font-black text-emerald-400 font-mono mt-1.5">{bestJob.price} €</p>
          </div>
          <div className="card p-4">
            <p className="label-xs mb-2">Prestation la Moins Chère</p>
            <p className="text-sm font-bold text-white">{FORMULA_LABELS[worstJob.formula]}</p>
            <p className="text-[11px] text-neutral-500 truncate">{worstJob.clientName}</p>
            <p className="text-xl font-black text-neutral-400 font-mono mt-1.5">{worstJob.price} €</p>
          </div>
        </div>
      )}

      {/* ── Évolution CA (barres) ── */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="label-xs">Évolution du CA — par jour</p>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
            <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" /> CA
          </div>
        </div>
        <SVGBarChart data={caChart} color="#10b981" />
      </div>

      {/* ── Bénéfice net cumulé (ligne) ── */}
      <div className="card p-5">
        <p className="label-xs mb-1">📈 Évolution du Bénéfice Net Cumulé</p>
        {cumChart.length > 0 && (
          <p className="text-[11px] text-neutral-600 mb-4">
            {cumChart[0].label.slice(5).replace('-', ' mai')} → {cumChart[cumChart.length - 1].label.slice(5).replace('-', ' mai')} · net cumulé {s.net >= 0 ? '+' : ''}{s.net} €
          </p>
        )}
        <SVGLineChart data={cumChart} color="#10b981" />
      </div>

      {/* ── Distribution formules ── */}
      <div className="card p-5">
        <p className="label-xs mb-4">📊 Distribution Formules</p>
        <div className="space-y-3">
          {(['express', 'deep-clean', 'premium'] as FormulaKey[]).map((f, i) => {
            const pctF = s.count > 0 ? Math.round((fCount[f] / s.count) * 100) : 0
            return (
              <div key={f}>
                <div className="flex justify-between mb-1.5">
                  <span className={`text-sm font-semibold ${FORMULA_COLORS[i][0]}`}>{FORMULA_LABELS[f]}</span>
                  <span className="text-xs text-neutral-500 font-mono">{fCount[f]} job · {fRev[f]} €</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${FORMULA_COLORS[i][1]}`} style={{ width: `${pctF}%` }} />
                </div>
                <p className="text-[10px] text-neutral-700 mt-1">{pctF}% des prestations</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Répartition équipe ── */}
      <div className="card p-5">
        <p className="label-xs mb-4">Répartition Équipe</p>
        <div className="grid grid-cols-3 gap-3">
          {TEAM.map((name, i) => {
            const ps = perPerson[name]
            return (
              <div key={name} className={`rounded-xl border p-4 ${TEAM_COLORS[i]}`}>
                <p className="text-[11px] font-black mb-3">👤 {name.toUpperCase()}</p>
                <div className="space-y-1.5">
                  {[
                    { k: 'Ventes',   v: String(ps.jobs) },
                    { k: 'CA',       v: `${ps.ca} €` },
                    { k: 'Net est.', v: `${ps.net >= 0 ? '+' : ''}${ps.net} €` },
                    { k: 'Moy/job',  v: `${ps.avg} €` },
                  ].map(row => (
                    <div key={row.k} className="flex justify-between text-xs">
                      <span className="text-neutral-500">{row.k}</span>
                      <span className="font-bold font-mono">{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Sources + Top formules ── */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <p className="label-xs mb-4">Acquisition — Sources</p>
          <div className="space-y-4">
            {[
              { label: 'Site Internet',     n: webN, ca: webCA, pct: s.count > 0 ? Math.round(webN / s.count * 100) : 0, color: 'bg-blue-500',   tc: 'text-blue-400'   },
              { label: 'Bouche à oreille',  n: manN, ca: manCA, pct: s.count > 0 ? Math.round(manN / s.count * 100) : 0, color: 'bg-purple-500', tc: 'text-purple-400' },
            ].map(row => (
              <div key={row.label}>
                <div className="flex justify-between mb-1.5">
                  <span className={`text-sm font-semibold ${row.tc}`}>{row.label}</span>
                  <span className="text-xs text-neutral-500 font-mono">{row.n} · {row.ca} €</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                </div>
                <p className="text-[10px] text-neutral-700 mt-1">{row.pct}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <p className="label-xs mb-4">Top Formules — CA Total</p>
          <div className="space-y-0">
            {(['premium', 'deep-clean', 'express'] as FormulaKey[]).map((f, i) => (
              <div key={f} className="flex items-center gap-3 py-3 border-b border-neutral-800 last:border-0">
                <span className={`text-sm font-black font-mono w-5 ${RANK_COLORS[i]}`}>#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{FORMULA_LABELS[f]}</p>
                  <p className="text-[10px] text-neutral-600">{fCount[f]} prestation{fCount[f] !== 1 ? 's' : ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white font-mono">{fRev[f]} €</p>
                  <p className="text-[10px] text-neutral-600">{s.ca > 0 ? Math.round(fRev[f] / s.ca * 100) : 0}% du CA</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Fiscalité ── */}
      <div className="card p-5">
        <p className="label-xs mb-0.5">Fiscalité 2026</p>
        <p className="text-[10px] text-neutral-700 mb-4">Estimation indicative — pas un conseil fiscal</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-neutral-800/50 rounded-xl px-4 py-3">
            <p className="text-[10px] text-neutral-600 mb-1">CA 2026 (all time)</p>
            <p className="text-xl font-black text-white font-mono">{allCA.toLocaleString('fr-FR')} €</p>
          </div>
          <div className="bg-neutral-800/50 rounded-xl px-4 py-3">
            <p className="text-[10px] text-neutral-600 mb-1">Prestations totales</p>
            <p className="text-xl font-black text-white font-mono">{allDone.length}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3">
          <AlertCircle size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-yellow-400">URSSAF micro-entrepreneur — 21,2%</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">Cotisations sociales sur CA brut encaissé</p>
            <p className="text-base font-black text-white font-mono mt-1.5">
              {allCA.toLocaleString('fr-FR')} € × 21,2% = <span className="text-red-400">{allURS} €</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PAGE PRINCIPALE
// ═══════════════════════════════════════════════════════════════

type Tab = 'overview' | 'bookings' | 'logistics' | 'calendar' | 'clients' | 'marketing' | 'stocks' | 'stats'

export default function DashboardPage() {
  const router = useRouter()
  const [tab,        setTab]       = useState<Tab>('overview')
  const [bookings,   setBookings]  = useState<Booking[]>(INIT_BOOKINGS)
  const [expenses,   setExpenses]  = useState<Expense[]>(INIT_EXPENSES)
  const [supplies,   setSupplies]  = useState<Supply[]>(INIT_SUPPLIES)
  const [modalBook,  setModalBook] = useState(false)
  const [modalExp,   setModalExp]  = useState(false)
  const [modalDevis, setModalDevis] = useState(false)
  const [modalAds,   setModalAds]  = useState(false)

  const s = useMemo(() => computeStats(bookings, expenses), [bookings, expenses])

  const logout = () => {
    localStorage.removeItem('su_dashboard_v1')
    router.push('/dashboard/login')
  }

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview',   label: 'Overview',    icon: <LayoutDashboard size={14} /> },
    { id: 'bookings',   label: 'Résa',        icon: <CalendarDays size={14} />   },
    { id: 'logistics',  label: 'Dépenses',    icon: <Package size={14} />        },
    { id: 'calendar',   label: 'Calendrier',  icon: <CalendarRange size={14} />  },
    { id: 'clients',    label: 'Clients',     icon: <Users size={14} />          },
    { id: 'marketing',  label: 'Marketing',   icon: <TrendingUp size={14} />     },
    { id: 'stocks',     label: 'Stocks',      icon: <Database size={14} />       },
    { id: 'stats',      label: 'Stats',       icon: <BarChart2 size={14} />      },
  ]

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white antialiased">

      {modalBook  && <AddBookingModal onClose={() => setModalBook(false)}  onAdd={b => setBookings(prev => [...prev, b])} />}
      {modalExp   && <AddExpenseModal onClose={() => setModalExp(false)}   onAdd={e => setExpenses(prev => [...prev, e])} />}
      {modalDevis && <DevisModal      onClose={() => setModalDevis(false)} />}
      {modalAds   && <AddAdsModal     onClose={() => setModalAds(false)}   onAdd={e => setExpenses(prev => [...prev, e])} />}

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-5">
          <div className="h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">✨</span>
              <span className="font-black text-[15px] tracking-tight">ShineUp</span>
              <span className="text-neutral-700 hidden sm:block">|</span>
              <span className="text-[13px] text-neutral-600 hidden sm:block">Dashboard · Mai 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 py-1.5 rounded-full text-[11px] font-bold font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400">{s.netProfit.toLocaleString('fr-FR')} €</span>
                <span className="text-neutral-600">net</span>
              </div>
              <button onClick={() => setModalDevis(true)}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-2.5 py-1.5 rounded-full transition-colors">
                <FileText size={10} />
                <span className="hidden sm:block">Devis</span>
              </button>
              <button onClick={logout}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-2.5 py-1.5 rounded-full transition-colors">
                <LogOut size={10} />
                <span className="hidden sm:block">Déco.</span>
              </button>
            </div>
          </div>

          {/* Tab bar — scrollable */}
          <div className="flex overflow-x-auto scrollbar-none -mb-px gap-0">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3.5 py-3 text-[13px] font-semibold border-b-2 whitespace-nowrap transition-colors flex-shrink-0 ${
                  tab === t.id ? 'border-emerald-500 text-white' : 'border-transparent text-neutral-600 hover:text-neutral-300'
                }`}>
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Contenu ── */}
      <main className="max-w-6xl mx-auto px-5 py-6">
        {tab === 'overview'  && <OverviewTab s={s} />}
        {tab === 'bookings'  && (
          <BookingsTab bookings={bookings} onAdd={() => setModalBook(true)}
            onDelete={id => setBookings(prev => prev.filter(b => b.id !== id))} />
        )}
        {tab === 'logistics' && (
          <LogisticsTab expenses={expenses} s={s} onAdd={() => setModalExp(true)}
            onDelete={id => setExpenses(prev => prev.filter(e => e.id !== id))} />
        )}
        {tab === 'calendar'  && <CalendarTab bookings={bookings} s={s} />}
        {tab === 'clients'   && <ClientsTab bookings={bookings} />}
        {tab === 'marketing' && <MarketingTab bookings={bookings} expenses={expenses} s={s} onAddAds={() => setModalAds(true)} />}
        {tab === 'stocks'    && <StocksTab supplies={supplies} setSupplies={setSupplies} />}
        {tab === 'stats'     && <StatsTab bookings={bookings} expenses={expenses} />}
      </main>
    </div>
  )
}
