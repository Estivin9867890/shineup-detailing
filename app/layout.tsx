import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShineUp Detailing — Nettoyage Auto à Domicile',
  description: 'Service de detailing automobile mobile professionnel. On se déplace chez vous. Dès 45 €.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
