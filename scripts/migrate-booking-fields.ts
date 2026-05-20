#!/usr/bin/env tsx
import { Client, Databases } from 'node-appwrite'

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')
  .setKey(process.env.APPWRITE_API_KEY ?? '')

const db = new Databases(client)
const DB_ID = 'shineup-db'

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

async function addAttr(fn: () => Promise<unknown>, desc: string) {
  try {
    await fn()
    console.log(`  ✓ ${desc}`)
    await sleep(300)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.log(msg.includes('already exists') ? `  ~ ${desc} (existe déjà)` : `  ✗ ${desc}: ${msg}`)
  }
}

async function main() {
  console.log('\n🔧 Migration — ajout champs bookings\n')
  await addAttr(() => db.createStringAttribute(DB_ID, 'bookings', 'time',    10,  false), 'time')
  await addAttr(() => db.createStringAttribute(DB_ID, 'bookings', 'phone',   30,  false), 'phone')
  await addAttr(() => db.createStringAttribute(DB_ID, 'bookings', 'email',   100, false), 'email')
  await addAttr(() => db.createStringAttribute(DB_ID, 'bookings', 'address', 200, false), 'address')
  await addAttr(() => db.createStringAttribute(DB_ID, 'bookings', 'notes',   500, false), 'notes')
  console.log('\n✅  Migration terminée\n')
}

main().catch(e => { console.error('\n❌', e); process.exit(1) })
