#!/usr/bin/env tsx
import { Client, Databases } from 'node-appwrite'

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')
  .setKey(process.env.APPWRITE_API_KEY ?? '')

const db = new Databases(client)
const DB_ID = 'shineup-db'

const DEMO_BOOKINGS = Array.from({ length: 19 }, (_, i) => `bk-${String(i + 1).padStart(3, '0')}`)
const DEMO_EXPENSES = Array.from({ length: 8  }, (_, i) => `ex-${String(i + 1).padStart(3, '0')}`)
const DEMO_SUPPLIES = Array.from({ length: 10 }, (_, i) => `sp-${String(i + 1).padStart(3, '0')}`)

async function del(col: string, id: string) {
  try {
    await db.deleteDocument(DB_ID, col, id)
    console.log(`  ✓ ${col}/${id}`)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg.includes('not found') || msg.includes('404')) {
      console.log(`  ~ ${col}/${id} (déjà supprimé)`)
    } else {
      console.log(`  ✗ ${col}/${id}: ${msg}`)
    }
  }
}

async function main() {
  console.log('\n🗑️  Suppression des données démo\n')
  console.log('Réservations :')
  for (const id of DEMO_BOOKINGS) await del('bookings', id)
  console.log('\nDépenses :')
  for (const id of DEMO_EXPENSES) await del('expenses', id)
  console.log('\nStocks :')
  for (const id of DEMO_SUPPLIES) await del('supplies', id)
  console.log('\n✅  Données démo supprimées\n')
}

main().catch(e => { console.error('\n❌', e); process.exit(1) })
