// Types du dashboard — partagés entre la couche Appwrite et les composants

export type FormulaKey    = 'express' | 'deep-clean' | 'premium'
export type VehicleSize   = 'standard' | 'suv'
export type Source        = 'web' | 'manual'
export type BookingStatus = 'completed' | 'confirmed' | 'pending'
export type ExpenseCat    = 'marketing' | 'material' | 'transport'

export interface Booking {
  id: string
  date: string          // YYYY-MM-DD
  clientName: string
  formula: FormulaKey
  vehicleSize: VehicleSize
  source: Source
  status: BookingStatus
  price: number
  assignedTo: string
  time?: string
  phone?: string
  email?: string
  address?: string
  notes?: string
}

export interface Expense {
  id: string
  date: string
  category: ExpenseCat
  label: string
  amount: number
}

export interface Supply {
  id: string
  name: string
  category: 'product' | 'equipment' | 'consumable'
  unit: string
  qty: number
  minQty: number
  usePerJob: number
  cost: number
}

export interface ClientProfile {
  name: string
  totalSpent: number
  visits: number
  lastVisit: string
  daysSince: number
  favoriteFormula: FormulaKey
  formulas: Record<FormulaKey, number>
}
