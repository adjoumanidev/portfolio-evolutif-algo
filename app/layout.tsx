import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AlgoMaster Pro - Portfolio Évolutif Algorithmique',
  description: 'Portfolio professionnel avec Supabase pour le cours d\'Algorithmique et Complexité - Master Big Data Analytics UVCI',
  keywords: ['algorithmique', 'complexité', 'big data', 'portfolio', 'UVCI', 'supabase', 'next.js'],
  authors: [{ name: 'Votre Nom' }],
  openGraph: {
    title: 'AlgoMaster Pro - Portfolio Algorithmique',
    description: 'Découvrez mon parcours d\'apprentissage en algorithmique',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}