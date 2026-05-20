import { Client, Databases, Query } from 'appwrite'
import type { Booking, Expense, Supply } from './dash-types'

export const DB_ID = 'shineup-db'
export const COLS  = { bookings: 'bookings', expenses: 'expenses', supplies: 'supplies' } as const

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT  ?? 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')

export const db = new Databases(client)

// ── Bookings ──────────────────────────────────────────────────

export async function fetchBookings(): Promise<Booking[]> {
  const res = await db.listDocuments(DB_ID, COLS.bookings, [
    Query.orderDesc('date'), Query.limit(500),
  ])
  return res.documents.map(d => ({
    id: d.$id, date: d.date, clientName: d.clientName,
    formula: d.formula, vehicleSize: d.vehicleSize,
    source: d.source, status: d.status,
    price: d.price, assignedTo: d.assignedTo,
  }))
}

export async function saveBooking(b: Booking): Promise<void> {
  const { id, ...data } = b
  await fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ collection: COLS.bookings, id, data }) }).then(r => { if (!r.ok) throw new Error('save failed') })
}

export async function removeBooking(id: string): Promise<void> {
  await fetch('/api/db', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ collection: COLS.bookings, id }) }).then(r => { if (!r.ok) throw new Error('delete failed') })
}

// ── Expenses ──────────────────────────────────────────────────

export async function fetchExpenses(): Promise<Expense[]> {
  const res = await db.listDocuments(DB_ID, COLS.expenses, [
    Query.orderDesc('date'), Query.limit(500),
  ])
  return res.documents.map(d => ({
    id: d.$id, date: d.date, category: d.category,
    label: d.label, amount: d.amount,
  }))
}

export async function saveExpense(e: Expense): Promise<void> {
  const { id, ...data } = e
  await fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ collection: COLS.expenses, id, data }) }).then(r => { if (!r.ok) throw new Error('save failed') })
}

export async function removeExpense(id: string): Promise<void> {
  await fetch('/api/db', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ collection: COLS.expenses, id }) }).then(r => { if (!r.ok) throw new Error('delete failed') })
}

// ── Supplies ──────────────────────────────────────────────────

export async function fetchSupplies(): Promise<Supply[]> {
  const res = await db.listDocuments(DB_ID, COLS.supplies, [Query.limit(100)])
  return res.documents.map(d => ({
    id: d.$id, name: d.name, category: d.category,
    unit: d.unit, qty: d.qty, minQty: d.minQty,
    usePerJob: d.usePerJob, cost: d.cost,
  }))
}

export async function updateSupplyQty(id: string, qty: number): Promise<void> {
  await fetch('/api/db', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ collection: COLS.supplies, id, data: { qty } }) }).then(r => { if (!r.ok) throw new Error('update failed') })
}

export async function saveSupply(s: Supply): Promise<void> {
  const { id, ...data } = s
  await fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ collection: COLS.supplies, id, data }) }).then(r => { if (!r.ok) throw new Error('save failed') })
}
