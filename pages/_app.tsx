import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Opulent Shipyards - Bespoke Superyacht Crafting & Natural Language Search</title>
        <meta name="description" content="Opulent Shipyards crafts the world's most luxurious, bespoke superyachts at the heart of the Riviera, blending Monaco's legendary glamour with next-generation shipbuilding mastery." />
        
        {/* Open Graph */}
        <meta property="og:title" content="Opulent Shipyards - Bespoke Superyacht Crafting & Natural Language Search" />
        <meta property="og:description" content="Discover the world's most luxurious superyachts and experience a new era of bespoke craftsmanship through Opulent Shipyards' innovative natural language search." />
        <meta property="og:url" content="https://opulentshipyards.trendible.news" />
        <meta property="og:site_name" content="Opulent Shipyards" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://placehold.co/1200x630/E0E0E0/333333?text=Opulent%20Yacht%20Image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Opulent Shipyards - Bespoke Superyacht Crafting & Natural Language Search" />
        <meta name="twitter:description" content="Discover the world's most luxurious superyachts and experience a new era of bespoke craftsmanship through Opulent Shipyards' innovative natural language search." />
        <meta name="twitter:image" content="https://placehold.co/1200x630/E0E0E0/333333?text=Opulent%20Yacht%20Image" />
      </Head>
      <div className="selection:bg-blue-200 selection:text-blue-900">
        <Component {...pageProps} />
      </div>
    </>
  )
}