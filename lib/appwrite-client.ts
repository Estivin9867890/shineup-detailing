import type { Booking, Expense, Supply } from './dash-types'

export const COLS = { bookings: 'bookings', expenses: 'expenses', supplies: 'supplies' } as const

async function dbGet(collection: string) {
  const res = await fetch(`/api/db?collection=${collection}`)
  if (!res.ok) throw new Error(`fetch ${collection} failed`)
  return res.json()
}

async function dbPost(body: object) {
  const res = await fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!res.ok) throw new Error('save failed')
}

async function dbPatch(body: object) {
  const res = await fetch('/api/db', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!res.ok) throw new Error('update failed')
}

async function dbDelete(body: object) {
  const res = await fetch('/api/db', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!res.ok) throw new Error('delete failed')
}

// ── Bookings ──────────────────────────────────────────────────

export async function fetchBookings(): Promise<Booking[]> {
  const docs = await dbGet(COLS.bookings)
  return docs.map((d: Record<string, unknown>) => ({
    id: d.$id, date: d.date, clientName: d.clientName,
    formula: d.formula, vehicleSize: d.vehicleSize,
    source: d.source, status: d.status,
    price: d.price, assignedTo: d.assignedTo,
  }))
}

export async function saveBooking(b: Booking): Promise<void> {
  const { id, ...data } = b
  await dbPost({ collection: COLS.bookings, id, data })
}

export async function removeBooking(id: string): Promise<void> {
  await dbDelete({ collection: COLS.bookings, id })
}

// ── Expenses ──────────────────────────────────────────────────

export async function fetchExpenses(): Promise<Expense[]> {
  const docs = await dbGet(COLS.expenses)
  return docs.map((d: Record<string, unknown>) => ({
    id: d.$id, date: d.date, category: d.category,
    label: d.label, amount: d.amount,
  }))
}

export async function saveExpense(e: Expense): Promise<void> {
  const { id, ...data } = e
  await dbPost({ collection: COLS.expenses, id, data })
}

export async function removeExpense(id: string): Promise<void> {
  await dbDelete({ collection: COLS.expenses, id })
}

// ── Supplies ──────────────────────────────────────────────────

export async function fetchSupplies(): Promise<Supply[]> {
  const docs = await dbGet(COLS.supplies)
  return docs.map((d: Record<string, unknown>) => ({
    id: d.$id, name: d.name, category: d.category,
    unit: d.unit, qty: d.qty, minQty: d.minQty,
    usePerJob: d.usePerJob, cost: d.cost,
  }))
}

export async function updateSupplyQty(id: string, qty: number): Promise<void> {
  await dbPatch({ collection: COLS.supplies, id, data: { qty } })
}

export async function saveSupply(s: Supply): Promise<void> {
  const { id, ...data } = s
  await dbPost({ collection: COLS.supplies, id, data })
}
