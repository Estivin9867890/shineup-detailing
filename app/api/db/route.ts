import { NextResponse } from 'next/server'
import { dbServer, DB_ID } from '@/lib/appwrite-server'

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
