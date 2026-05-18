export type FormulaSlug = 'express' | 'deep-clean' | 'premium'
export type VehicleSize = 'citadine' | 'berline' | 'suv'
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
export type QuestType = 'daily' | 'weekly' | 'boss'
export type AlertLevel = 'warning' | 'danger'

export interface Formula {
  slug: FormulaSlug
  name: string
  price: number
  durationMin: number
  description: string
  features: string[]
  xpReward: number
  popular?: boolean
}

export interface Booking {
  id: string
  clientName: string
  clientPhone: string
  address: string
  formulaSlug: FormulaSlug
  vehicleSize: VehicleSize
  vehicleBrand: string
  date: string       // YYYY-MM-DD
  time: string       // HH:MM
  status: BookingStatus
  assignedTo: string
  revenue: number    // euros charged
  netRevenue: number // after URSSAF + consommables + carburant
  durationHours: number
  xpEarned: number
  createdAt: string
}

export interface Quest {
  id: string
  type: QuestType
  icon: string
  title: string
  description: string
  xpReward: number
  completed: boolean
  progress: number
  target: number
}

export interface TeamMember {
  id: string
  name: string
  initials: string
  color: string
  completedJobs: number
  totalNetEarned: number
}

export interface MonthStats {
  caGross: number
  netRevenue: number
  jobsCompleted: number
  hoursWorked: number
  urssafAmount: number
  consommables: number
  carburant: number
  goalPercent: number
}

export interface XPData {
  totalXP: number
  level: number
  levelName: string
  levelIcon: string
  xpInLevel: number
  xpToNextLevel: number
  progressPercent: number
}

export interface StreakData {
  currentStreak: number
  multiplier: number
  multiplierLabel: string
}

export interface AlertData {
  level: AlertLevel
  title: string
  message: string
  flashQuestTitle: string
  xpBonus: number
  currentWeekJobs: number
  prevWeekJobs: number
  dropPercent: number
}

export interface PerformanceData {
  hourlyRateGroup: number
  hourlyRatePerPerson: number
  trend: 'up' | 'down' | 'stable'
  trendPercent: number
  coachingMessage: string
  coachingType: 'success' | 'warning' | 'info'
  topFormulaByNet: string
}
