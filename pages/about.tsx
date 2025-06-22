import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="w-full py-4 px-6 md:px-10 flex justify-between items-center bg-transparent z-10">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center space-x-2">
            <Image
              src="https://placehold.co/40x40/000000/FFFFFF?text=OSM"
              alt="Opulent Shipyards Logo"
              width={40}
              height={40}
              className="rounded-full shadow-md"
            />
            <span className="text-lg md:text-xl font-montserrat font-normal text-gray-800 hidden sm:block">
              Opulent Shipyards
            </span>
          </a>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6 md:space-x-8">
          <Link href="/about">
            <a className="text-gray-700 header-link text-sm md:text-base hover:text-gray-900 transition duration-300 font-medium">
              About
            </a>
          </Link>
          <Link href="/about-tech">
            <a className="text-gray-700 header-link text-sm md:text-base hover:text-gray-900 transition duration-300">
              About the Tech
            </a>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 md:px-10 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-montserrat font-light text-center mb-8 text-gray-800">
            About <span className="font-normal">Opulent Shipyards</span>
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-center mb-12 font-light">
              Crafting the world's most luxurious, bespoke superyachts at the heart of the Riviera, 
              blending Monaco's legendary glamour with next-generation shipbuilding mastery.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-montserrat font-normal mb-4 text-gray-800">Our Heritage</h2>
                <p>
                  Founded in the prestigious waters of Monaco, Opulent Shipyards represents the pinnacle of 
                  maritime craftsmanship. Our legacy spans decades of creating vessels that are not merely 
                  boats, but floating masterpieces that embody the dreams and aspirations of their owners.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-montserrat font-normal mb-4 text-gray-800">Bespoke Excellence</h2>
                <p>
                  Every yacht we create is a unique expression of individual vision. From initial concept 
                  to final delivery, our master craftsmen work closely with clients to ensure every detail 
                  reflects their personal style and exceeds their highest expectations.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-montserrat font-normal mb-6 text-gray-800 text-center">Our Philosophy</h2>
              <blockquote className="text-xl italic text-center text-gray-600 font-light">
                "We don't just build yachts; we craft floating sanctuaries where luxury meets the infinite horizon, 
                where every voyage becomes a journey of discovery, and where the extraordinary becomes everyday."
              </blockquote>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-montserrat font-normal mb-3 text-gray-800">Innovation</h3>
                <p className="text-sm">
                  Cutting-edge technology seamlessly integrated with timeless design principles.
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-montserrat font-normal mb-3 text-gray-800">Craftsmanship</h3>
                <p className="text-sm">
                  Master artisans dedicated to perfection in every detail, from hull to helm.
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-montserrat font-normal mb-3 text-gray-800">Exclusivity</h3>
                <p className="text-sm">
                  Limited production ensures each vessel remains truly unique and extraordinary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full py-4 px-6 md:px-10 flex justify-center items-center bg-transparent border-t border-gray-200 mt-auto">
        <a
          href="mailto:tech@opulentshipyards.trendible.news?subject=Opulent Shipyard Inquiry"
          className="text-gray-600 hover:text-gray-800 text-sm md:text-base font-montserrat font-light transition duration-300"
        >
          Powered by AVA — Your Concierge
        </a>
      </footer>
    </div>
  )
}