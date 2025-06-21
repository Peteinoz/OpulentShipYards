import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Opulent Shipyards - Bespoke Superyacht Crafting & Natural Language Search',
  description: 'Opulent Shipyards crafts the world\'s most luxurious, bespoke superyachts at the heart of the Riviera, blending Monaco\'s legendary glamour with next-generation shipbuilding mastery.',
  openGraph: {
    title: 'Opulent Shipyards - Bespoke Superyacht Crafting & Natural Language Search',
    description: 'Discover the world\'s most luxurious superyachts and experience a new era of bespoke craftsmanship through Opulent Shipyards\' innovative natural language search.',
    url: 'https://opulentshipyards.trendible.news',
    siteName: 'Opulent Shipyards',
    images: [
      {
        url: 'https://placehold.co/1200x630/E0E0E0/333333?text=Opulent%20Yacht%20Image',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opulent Shipyards - Bespoke Superyacht Crafting & Natural Language Search',
    description: 'Discover the world\'s most luxurious superyachts and experience a new era of bespoke craftsmanship through Opulent Shipyards\' innovative natural language search.',
    images: ['https://placehold.co/1200x630/E0E0E0/333333?text=Opulent%20Yacht%20Image'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="selection:bg-blue-200 selection:text-blue-900">
        {children}
      </body>
    </html>
  )
}