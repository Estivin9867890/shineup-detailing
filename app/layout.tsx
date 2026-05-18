import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShineUp Detailing — Nettoyage auto à domicile Brest',
  description: 'Detailing auto mobile professionnel à Brest et alentours. Express intérieur, Deep Clean, Intégrale Premium. Résultat showroom garanti. On vient chez vous — dès 45 €.',
  keywords: 'nettoyage voiture brest, detailing auto brest, lavage auto à domicile brest finistère, nettoyage intérieur voiture brest, polish carrosserie brest',
  openGraph: {
    title: 'ShineUp Detailing — Nettoyage auto à Brest',
    description: 'Detailing mobile professionnel à domicile. Express, Deep Clean, Premium. Résultat showroom garanti.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'ShineUp Detailing',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
