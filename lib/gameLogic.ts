import type { Booking, Quest, MonthStats, XPData, StreakData, AlertData, PerformanceData } from './types'

const CURRENT_DATE = new Date('2026-05-17')
const URSSAF_RATE = 0.212
const NET_GOAL = 1000

const LEVELS = [
  { level: 1, name: 'Chiffon Rookie', icon: '🧹', minXP: 0, maxXP: 100 },
  { level: 2, name: 'Shampouineur Novice', icon: '🚿', minXP: 100, maxXP: 250 },
  { level: 3, name: 'Détailleur Pro', icon: '⚡', minXP: 250, maxXP: 500 },
  { level: 4, name: 'Maître du Microfibre', icon: '🏆', minXP: 500, maxXP: 900 },
  { level: 5, name: 'Légende du Detailing', icon: '👑', minXP: 900, maxXP: 9999 },
]

export function computeMonthStats(bookings: Booking[]): MonthStats {
  const currentMonth = `${CURRENT_DATE.getFullYear()}-${String(CURRENT_DATE.getMonth() + 1).padStart(2, '0')}`
  const completed = bookings.filter(
    b => b.status === 'completed' && b.date.startsWith(currentMonth)
  )

  const caGross = completed.reduce((s, b) => s + b.revenue, 0)
  const netRevenue = completed.reduce((s, b) => s + b.netRevenue, 0)
  const hoursWorked = completed.reduce((s, b) => s + b.durationHours, 0)
  const urssafAmount = Math.round(caGross * URSSAF_RATE)
  const consommables = completed.reduce((s, b) => {
    if (b.formulaSlug === 'express') return s + 8
    if (b.formulaSlug === 'deep-clean') return s + 20
    return s + 30
  }, 0)
  const carburant = completed.length * 7

  return {
    caGross,
    netRevenue,
    jobsCompleted: completed.length,
    hoursWorked,
    urssafAmount,
    consommables,
    carburant,
    goalPercent: Math.min(100, Math.round((netRevenue / NET_GOAL) * 100)),
  }
}

export function computeXP(bookings: Booking[], quests: Quest[]): XPData {
  const completedBookings = bookings.filter(b => b.status === 'completed')
  const bookingXP = completedBookings.reduce((s, b) => s + b.xpEarned, 0)
  const questXP = quests.filter(q => q.completed).reduce((s, q) => s + q.xpReward, 0)
  const totalXP = bookingXP + questXP

  const levelData = LEVELS.find(l => totalXP >= l.minXP && totalXP < l.maxXP) ?? LEVELS[LEVELS.length - 1]
  const xpInLevel = totalXP - levelData.minXP
  const xpRange = levelData.maxXP - levelData.minXP
  const progressPercent = Math.min(100, Math.round((xpInLevel / xpRange) * 100))

  return {
    totalXP,
    level: levelData.level,
    levelName: levelData.name,
    levelIcon: levelData.icon,
    xpInLevel,
    xpToNextLevel: levelData.maxXP - totalXP,
    progressPercent,
  }
}

export function computeStreak(bookings: Booking[]): StreakData {
  const completedDates = new Set(
    bookings
      .filter(b => b.status === 'completed')
      .map(b => b.date)
  )

  let streak = 0
  const check = new Date(CURRENT_DATE)
  check.setDate(check.getDate() - 1) // start from yesterday

  while (true) {
    const key = check.toISOString().split('T')[0]
    if (completedDates.has(key)) {
      streak++
      check.setDate(check.getDate() - 1)
    } else {
      break
    }
  }

  let multiplier = 1.0
  let multiplierLabel = ''
  if (streak >= 10) { multiplier = 1.5; multiplierLabel = 'x1.5 🔥🔥🔥' }
  else if (streak >= 7) { multiplier = 1.25; multiplierLabel = 'x1.25 🔥🔥' }
  else if (streak >= 5) { multiplier = 1.2; multiplierLabel = 'x1.2 🔥' }
  else if (streak >= 3) { multiplier = 1.1; multiplierLabel = 'x1.1' }

  return { currentStreak: streak, multiplier, multiplierLabel }
}

export function computeAlert(bookings: Booking[]): AlertData | null {
  const completed = bookings.filter(b => b.status === 'completed')

  const sevenDaysAgo = new Date(CURRENT_DATE)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const fourteenDaysAgo = new Date(CURRENT_DATE)
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)

  const last7 = completed.filter(b => {
    const d = new Date(b.date)
    return d >= sevenDaysAgo && d < CURRENT_DATE
  })

  const prev7 = completed.filter(b => {
    const d = new Date(b.date)
    return d >= fourteenDaysAgo && d < sevenDaysAgo
  })

  if (prev7.length === 0) return null

  const ratio = last7.length / prev7.length
  if (ratio >= 0.75) return null

  const dropPercent = Math.round((1 - ratio) * 100)
  const level = ratio < 0.5 ? 'danger' : 'warning'

  return {
    level,
    title: level === 'danger' ? '🚨 ALERTE CRITIQUE — OBJECTIF EN DANGER' : '⚠️ ALERTE PERFORMANCE',
    message: `Le volume a chuté de ${dropPercent}% sur les 7 derniers jours (${last7.length} prestations vs ${prev7.length} la semaine précédente). À ce rythme, l\'objectif 1 000 € ne sera pas atteint. Activez la quête flash ci-dessous pour reprendre de l\'altitude.`,
    flashQuestTitle: 'Distribuez 50 flyers en zone B2B aujourd\'hui & postez un Reel avant/après',
    xpBonus: 200,
    currentWeekJobs: last7.length,
    prevWeekJobs: prev7.length,
    dropPercent,
  }
}

export function computePerformance(bookings: Booking[]): PerformanceData {
  const completed = bookings.filter(b => b.status === 'completed')
  const totalNet = completed.reduce((s, b) => s + b.netRevenue, 0)
  const totalHours = completed.reduce((s, b) => s + b.durationHours, 0)

  const hourlyRateGroup = totalHours > 0 ? Math.round((totalNet / totalHours) * 10) / 10 : 0
  const hourlyRatePerPerson = Math.round((hourlyRateGroup / 3) * 10) / 10

  // Trend: compare last 7 days net/h vs prev 7 days
  const sevenDaysAgo = new Date(CURRENT_DATE)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const fourteenDaysAgo = new Date(CURRENT_DATE)
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14)

  const last7 = completed.filter(b => new Date(b.date) >= sevenDaysAgo)
  const prev7 = completed.filter(b => {
    const d = new Date(b.date)
    return d >= fourteenDaysAgo && d < sevenDaysAgo
  })

  const last7Rate = last7.length > 0
    ? last7.reduce((s, b) => s + b.netRevenue, 0) / last7.reduce((s, b) => s + b.durationHours, 0)
    : 0
  const prev7Rate = prev7.length > 0
    ? prev7.reduce((s, b) => s + b.netRevenue, 0) / prev7.reduce((s, b) => s + b.durationHours, 0)
    : 0

  let trend: 'up' | 'down' | 'stable' = 'stable'
  let trendPercent = 0
  if (prev7Rate > 0) {
    trendPercent = Math.round(((last7Rate - prev7Rate) / prev7Rate) * 100)
    trend = trendPercent > 3 ? 'up' : trendPercent < -3 ? 'down' : 'stable'
  }

  const premiumCount = completed.filter(b => b.formulaSlug === 'premium').length
  const deepCleanCount = completed.filter(b => b.formulaSlug === 'deep-clean').length
  const expressCount = completed.filter(b => b.formulaSlug === 'express').length

  let coachingMessage: string
  let coachingType: 'success' | 'warning' | 'info'
  const topFormulaByNet = premiumCount >= 3 ? 'Premium' : 'Deep Clean'

  if (hourlyRateGroup >= 16) {
    coachingMessage = 'Excellent ratio €/heure. Mix formules optimal. Maintenez la proportion Deep Clean + Premium pour tenir ce rythme.'
    coachingType = 'success'
  } else if (expressCount > deepCleanCount) {
    coachingMessage = `Trop d'Express dans le mix (${expressCount} vs ${deepCleanCount} Deep Clean). Redirigez vos clients vers la formule Deep Clean : +20 € par job pour 1h30 de travail supplémentaire.`
    coachingType = 'warning'
  } else {
    coachingMessage = `Ratio correct. Pour dépasser 16 €/h, proposez systématiquement l'upgrade "Deep Clean → Premium" aux clients SUV : +62 € net par upsell réussi.`
    coachingType = 'info'
  }

  return {
    hourlyRateGroup,
    hourlyRatePerPerson,
    trend,
    trendPercent: Math.abs(trendPercent),
    coachingMessage,
    coachingType,
    topFormulaByNet,
  }
}
