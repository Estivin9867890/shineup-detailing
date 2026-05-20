import { Client, Databases } from 'node-appwrite'

export const DB_ID = 'shineup-db'
export const COLS  = { bookings: 'bookings', expenses: 'expenses', supplies: 'supplies' } as const

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT  ?? 'https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')
  .setKey(process.env.APPWRITE_API_KEY ?? '')

export const dbServer = new Databases(client)
