#!/usr/bin/env tsx
/**
 * Script d'initialisation Appwrite — ShineUp Detailing
 * Usage : npx tsx scripts/setup-appwrite.ts
 *
 * Prérequis : renseigner PROJECT_ID et API_KEY dans .env.local
 */

import { Client, Databases, Permission, Role } from 'node-appwrite'

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? ''
const API_KEY    = process.env.APPWRITE_API_KEY ?? ''
const ENDPOINT   = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? 'https://cloud.appwrite.io/v1'

if (!PROJECT_ID || !API_KEY) {
  console.error('❌  Ajoutez NEXT_PUBLIC_APPWRITE_PROJECT_ID et APPWRITE_API_KEY dans .env.local')
  process.exit(1)
}

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY)
const db = new Databases(client)

const DB_ID = 'shineup-db'
const PERMS = [
  Permission.read(Role.any()),
  Permission.create(Role.any()),
  Permission.update(Role.any()),
  Permission.delete(Role.any()),
]

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

async function createAttr(dbId: string, colId: string, fn: () => Promise<unknown>, desc: string) {
  try {
    await fn()
    console.log(`  ✓ ${desc}`)
    await sleep(300) // Appwrite needs a moment between attributes
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg.includes('already exists')) {
      console.log(`  ~ ${desc} (déjà existant)`)
    } else {
      console.error(`  ✗ ${desc} :`, msg)
    }
  }
}

async function main() {
  console.log('\n🚀 Initialisation Appwrite — ShineUp Detailing\n')

  // ── Créer la base de données ──────────────────────────────────
  try {
    await db.create(DB_ID, 'ShineUp DB')
    console.log('✅  Base de données créée : shineup-db')
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg.includes('already exists')) {
      console.log('~  Base de données déjà existante : shineup-db')
    } else {
      throw e
    }
  }

  await sleep(500)

  // ── Collection : bookings ─────────────────────────────────────
  console.log('\n📋 Collection : bookings')
  try {
    await db.createCollection(DB_ID, 'bookings', 'Réservations', PERMS)
    console.log('  ✓ Collection créée')
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.log(msg.includes('already exists') ? '  ~ Collection déjà existante' : `  ✗ ${msg}`)
  }
  await sleep(500)

  await createAttr(DB_ID, 'bookings', () => db.createStringAttribute(DB_ID,  'bookings', 'date',        10,   true),  'date')
  await createAttr(DB_ID, 'bookings', () => db.createStringAttribute(DB_ID,  'bookings', 'clientName',  100,  true),  'clientName')
  await createAttr(DB_ID, 'bookings', () => db.createStringAttribute(DB_ID,  'bookings', 'formula',     20,   true),  'formula')
  await createAttr(DB_ID, 'bookings', () => db.createStringAttribute(DB_ID,  'bookings', 'vehicleSize', 20,   true),  'vehicleSize')
  await createAttr(DB_ID, 'bookings', () => db.createStringAttribute(DB_ID,  'bookings', 'source',      20,   true),  'source')
  await createAttr(DB_ID, 'bookings', () => db.createStringAttribute(DB_ID,  'bookings', 'status',      20,   true),  'status')
  await createAttr(DB_ID, 'bookings', () => db.createIntegerAttribute(DB_ID, 'bookings', 'price',             true),  'price')
  await createAttr(DB_ID, 'bookings', () => db.createStringAttribute(DB_ID,  'bookings', 'assignedTo',  50,   false), 'assignedTo')

  // ── Collection : expenses ─────────────────────────────────────
  console.log('\n💸 Collection : expenses')
  try {
    await db.createCollection(DB_ID, 'expenses', 'Dépenses', PERMS)
    console.log('  ✓ Collection créée')
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.log(msg.includes('already exists') ? '  ~ Collection déjà existante' : `  ✗ ${msg}`)
  }
  await sleep(500)

  await createAttr(DB_ID, 'expenses', () => db.createStringAttribute(DB_ID, 'expenses', 'date',     10,  true), 'date')
  await createAttr(DB_ID, 'expenses', () => db.createStringAttribute(DB_ID, 'expenses', 'category', 30,  true), 'category')
  await createAttr(DB_ID, 'expenses', () => db.createStringAttribute(DB_ID, 'expenses', 'label',    150, true), 'label')
  await createAttr(DB_ID, 'expenses', () => db.createFloatAttribute(DB_ID,  'expenses', 'amount',        true), 'amount')

  // ── Collection : supplies ─────────────────────────────────────
  console.log('\n📦 Collection : supplies')
  try {
    await db.createCollection(DB_ID, 'supplies', 'Stocks', PERMS)
    console.log('  ✓ Collection créée')
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    console.log(msg.includes('already exists') ? '  ~ Collection déjà existante' : `  ✗ ${msg}`)
  }
  await sleep(500)

  await createAttr(DB_ID, 'supplies', () => db.createStringAttribute(DB_ID, 'supplies', 'name',     100, true),  'name')
  await createAttr(DB_ID, 'supplies', () => db.createStringAttribute(DB_ID, 'supplies', 'category', 30,  true),  'category')
  await createAttr(DB_ID, 'supplies', () => db.createStringAttribute(DB_ID, 'supplies', 'unit',     20,  true),  'unit')
  await createAttr(DB_ID, 'supplies', () => db.createFloatAttribute(DB_ID,  'supplies', 'qty',           true),  'qty')
  await createAttr(DB_ID, 'supplies', () => db.createFloatAttribute(DB_ID,  'supplies', 'minQty',        true),  'minQty')
  await createAttr(DB_ID, 'supplies', () => db.createFloatAttribute(DB_ID,  'supplies', 'usePerJob',     false), 'usePerJob')
  await createAttr(DB_ID, 'supplies', () => db.createFloatAttribute(DB_ID,  'supplies', 'cost',          false), 'cost')

  // ── Seed : données historiques ─────────────────────────────────
  console.log('\n🌱 Seed des données initiales...')
  await sleep(2000) // attendre que les attributs soient prêts

  const BOOKINGS_SEED = [
    { id:'bk-001', date:'2026-05-03', clientName:'Marie Dupont',      formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Louis'     },
    { id:'bk-002', date:'2026-05-03', clientName:'Julien Martin',     formula:'express',    vehicleSize:'standard', source:'manual', status:'completed', price:45,  assignedTo:'Alexandre' },
    { id:'bk-003', date:'2026-05-04', clientName:'Sophie Mercier',    formula:'premium',    vehicleSize:'suv',      source:'web',    status:'completed', price:145, assignedTo:'Louis'     },
    { id:'bk-004', date:'2026-05-04', clientName:'Pierre Leblanc',    formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Alexandre' },
    { id:'bk-005', date:'2026-05-05', clientName:'Claire Thomas',     formula:'deep-clean', vehicleSize:'standard', source:'manual', status:'completed', price:85,  assignedTo:'Louis'     },
    { id:'bk-006', date:'2026-05-06', clientName:'Kevin Rousseau',    formula:'express',    vehicleSize:'standard', source:'manual', status:'completed', price:45,  assignedTo:'Alexandre' },
    { id:'bk-007', date:'2026-05-07', clientName:'Isabelle Girard',   formula:'premium',    vehicleSize:'standard', source:'web',    status:'completed', price:125, assignedTo:'Louis'     },
    { id:'bk-008', date:'2026-05-08', clientName:'Franck Petit',      formula:'deep-clean', vehicleSize:'suv',      source:'web',    status:'completed', price:105, assignedTo:'Alexandre' },
    { id:'bk-009', date:'2026-05-09', clientName:'Nathalie Simon',    formula:'express',    vehicleSize:'standard', source:'manual', status:'completed', price:45,  assignedTo:'Louis'     },
    { id:'bk-010', date:'2026-05-09', clientName:'Antoine Morel',     formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Alexandre' },
    { id:'bk-011', date:'2026-05-10', clientName:'Emma Bernard',      formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Louis'     },
    { id:'bk-012', date:'2026-05-11', clientName:'Nicolas Faure',     formula:'express',    vehicleSize:'standard', source:'manual', status:'completed', price:45,  assignedTo:'Alexandre' },
    { id:'bk-013', date:'2026-05-12', clientName:'Laure Chevalier',   formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Louis'     },
    { id:'bk-014', date:'2026-05-14', clientName:'Sébastien Laurent', formula:'express',    vehicleSize:'standard', source:'manual', status:'completed', price:45,  assignedTo:'Alexandre' },
    { id:'bk-015', date:'2026-05-15', clientName:'Audrey Roux',       formula:'premium',    vehicleSize:'suv',      source:'web',    status:'completed', price:145, assignedTo:'Louis'     },
    { id:'bk-016', date:'2026-05-16', clientName:'Maxime Blanc',      formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'completed', price:85,  assignedTo:'Alexandre' },
    { id:'bk-017', date:'2026-05-16', clientName:'Camille Dubois',    formula:'deep-clean', vehicleSize:'standard', source:'manual', status:'completed', price:85,  assignedTo:'Louis'     },
    { id:'bk-018', date:'2026-05-18', clientName:'Paul Fontaine',     formula:'deep-clean', vehicleSize:'standard', source:'web',    status:'pending',   price:85,  assignedTo:'Alexandre' },
    { id:'bk-019', date:'2026-05-20', clientName:'Léa Garnier',       formula:'express',    vehicleSize:'standard', source:'web',    status:'confirmed', price:45,  assignedTo:'Louis'     },
  ]

  const EXPENSES_SEED = [
    { id:'ex-001', date:'2026-05-01', category:'marketing', label:'Google Ads – Brest Local',           amount:70 },
    { id:'ex-002', date:'2026-05-01', category:'marketing', label:'Meta Ads – Reels avant/après',       amount:50 },
    { id:'ex-003', date:'2026-05-02', category:'material',  label:'Koch Chemie – Produits détailing',   amount:95 },
    { id:'ex-004', date:'2026-05-02', category:'material',  label:'Microfibres premium (pack 10)',       amount:35 },
    { id:'ex-005', date:'2026-05-10', category:'material',  label:'APC concentré + dégraissant jantes', amount:28 },
    { id:'ex-006', date:'2026-05-05', category:'transport', label:'Essence – semaine 1',                amount:35 },
    { id:'ex-007', date:'2026-05-12', category:'transport', label:'Essence – semaine 2',                amount:30 },
    { id:'ex-008', date:'2026-05-07', category:'transport', label:'Péages A630',                        amount:12 },
  ]

  const SUPPLIES_SEED = [
    { id:'sp-001', name:'APC Koch Chemie MO',    category:'product',    unit:'L',   qty:3.5, minQty:1.0, usePerJob:0.15, cost:12   },
    { id:'sp-002', name:'Shampoing carrosserie', category:'product',    unit:'L',   qty:2.0, minQty:0.5, usePerJob:0.10, cost:8    },
    { id:'sp-003', name:'Dégraissant jantes',    category:'product',    unit:'L',   qty:0.4, minQty:0.5, usePerJob:0.08, cost:9    },
    { id:'sp-004', name:'Cire / Sealant',        category:'product',    unit:'L',   qty:0.8, minQty:0.3, usePerJob:0.05, cost:25   },
    { id:'sp-005', name:'Nettoyant vitres',      category:'product',    unit:'L',   qty:1.5, minQty:0.4, usePerJob:0.06, cost:6    },
    { id:'sp-006', name:'Microfibres premium',   category:'consumable', unit:'pcs', qty:12,  minQty:4,   usePerJob:0.5,  cost:3.5  },
    { id:'sp-007', name:'Gants jetables',        category:'consumable', unit:'pcs', qty:6,   minQty:10,  usePerJob:2,    cost:0.3  },
    { id:'sp-008', name:'Sacs poubelle',         category:'consumable', unit:'pcs', qty:40,  minQty:10,  usePerJob:2,    cost:0.15 },
    { id:'sp-009', name:'Brosses détailing kit', category:'equipment',  unit:'pcs', qty:8,   minQty:3,   usePerJob:0,    cost:15   },
    { id:'sp-010', name:'Éponges applicateur',   category:'equipment',  unit:'pcs', qty:6,   minQty:2,   usePerJob:0,    cost:2    },
  ]

  let ok = 0, skip = 0
  for (const b of BOOKINGS_SEED) {
    const { id, ...data } = b
    try {
      await db.createDocument(DB_ID, 'bookings', id, data)
      ok++
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      if (msg.includes('already exists')) skip++
      else console.error(`  ✗ booking ${id}:`, msg)
    }
    await sleep(100)
  }
  console.log(`  Réservations : ${ok} créées, ${skip} ignorées`)

  ok = 0; skip = 0
  for (const e of EXPENSES_SEED) {
    const { id, ...data } = e
    try {
      await db.createDocument(DB_ID, 'expenses', id, data)
      ok++
    } catch (e2: unknown) {
      const msg = e2 instanceof Error ? e2.message : String(e2)
      if (msg.includes('already exists')) skip++
      else console.error(`  ✗ expense ${id}:`, msg)
    }
    await sleep(100)
  }
  console.log(`  Dépenses     : ${ok} créées, ${skip} ignorées`)

  ok = 0; skip = 0
  for (const s of SUPPLIES_SEED) {
    const { id, ...data } = s
    try {
      await db.createDocument(DB_ID, 'supplies', id, data)
      ok++
    } catch (e2: unknown) {
      const msg = e2 instanceof Error ? e2.message : String(e2)
      if (msg.includes('already exists')) skip++
      else console.error(`  ✗ supply ${id}:`, msg)
    }
    await sleep(100)
  }
  console.log(`  Stocks       : ${ok} créées, ${skip} ignorées`)

  console.log('\n✅  Setup terminé ! Lancez le dashboard : npx next dev\n')
}

main().catch(e => { console.error('\n❌  Erreur critique :', e); process.exit(1) })
