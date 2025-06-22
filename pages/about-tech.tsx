import Image from 'next/image'
import Link from 'next/link'

export default function AboutTech() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="w-full py-4 px-6 md:px-10 flex justify-between items-center bg-transparent z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
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
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6 md:space-x-8">
          <Link href="/about" className="text-gray-700 header-link text-sm md:text-base hover:text-gray-900 transition duration-300">
            About
          </Link>
          <Link href="/about-tech" className="text-gray-700 header-link text-sm md:text-base hover:text-gray-900 transition duration-300 font-medium">
            About the Tech
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 md:px-10 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-montserrat font-light text-center mb-8 text-gray-800">
            About the <span className="font-normal">Technology</span>
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl text-center mb-12 font-light">
              Powered by cutting-edge AI technology, our natural language search revolutionizes 
              how you discover and explore the world of luxury yachts.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-montserrat font-normal mb-6 text-gray-800">Meet AVA - Your AI Concierge</h2>
              <p className="mb-4">
                AVA (Advanced Vessel Assistant) is our sophisticated AI companion designed to understand 
                your yacht preferences in natural language. Simply describe what you're looking for, 
                and AVA will curate personalized results that match your vision.
              </p>
              <p>
                Whether you're seeking "a sleek modern yacht for Mediterranean cruising" or 
                "a classic sailing vessel with traditional craftsmanship," AVA understands the 
                nuances of your request and delivers precisely what you envision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-montserrat font-normal mb-4 text-gray-800">Natural Language Processing</h3>
                <p className="text-sm">
                  Our advanced NLP engine, powered by state-of-the-art language models, 
                  interprets your queries with human-like understanding, recognizing context, 
                  preferences, and subtle requirements.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-montserrat font-normal mb-4 text-gray-800">Intelligent Search</h3>
                <p className="text-sm">
                  Combining multiple data sources and AI-powered analysis, our search engine 
                  delivers comprehensive results with detailed specifications, stunning imagery, 
                  and relevant yacht information.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-montserrat font-normal mb-6 text-gray-800">Technology Stack</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2 text-gray-800">Frontend</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Next.js 13 with Pages Router</li>
                    <li>• TypeScript for type safety</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Responsive design</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-gray-800">AI & Search</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Perplexity AI for search</li>
                    <li>• Google Gemini for AVA</li>
                    <li>• Google Custom Search</li>
                    <li>• Real-time processing</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-gray-800">Infrastructure</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Netlify Functions</li>
                    <li>• Static site generation</li>
                    <li>• Optimized performance</li>
                    <li>• Secure API handling</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-8">
              <h2 className="text-2xl font-montserrat font-normal mb-4 text-gray-800 text-center">The Future of Yacht Discovery</h2>
              <p className="text-center font-light">
                Our platform represents the convergence of luxury craftsmanship and technological innovation, 
                making the discovery of your perfect yacht as elegant and intuitive as the vessels themselves.
              </p>
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