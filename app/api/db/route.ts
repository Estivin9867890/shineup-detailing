import { NextResponse } from 'next/server'
import { dbServer, DB_ID } from '@/lib/appwrite-server'
import { Query } from 'node-appwrite'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const collection = searchParams.get('collection')
  if (!collection) return NextResponse.json({ error: 'missing collection' }, { status: 400 })
  const res = await dbServer.listDocuments(DB_ID, collection, [Query.limit(500)])
  return NextResponse.json(res.documents)
}

export async function POST(req: Request) {
  const { collection, id, data } = await req.json()
  await dbServer.createDocument(DB_ID, collection, id, data)
  return NextResponse.json({ ok: true })
}

export async function PATCH(req: Request) {
  const { collection, id, data } = await req.json()
  await dbServer.updateDocument(DB_ID, collection, id, data)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  const { collection, id } = await req.json()
  await dbServer.deleteDocument(DB_ID, collection, id)
  return NextResponse.json({ ok: true })
}
