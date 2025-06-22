import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface SearchResult {
  title: string
  snippet: string
  url: string
  imageUrl: string
}

interface SearchResponse {
  avaSummary: string
  answer: string
  sources: SearchResult[]
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [avaSummary, setAvaSummary] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [progressWidth, setProgressWidth] = useState(0)
  const [showProgressBar, setShowProgressBar] = useState(false)
  const [showAvaSummary, setShowAvaSummary] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)

  const clearResultsAndMessages = () => {
    setErrorMessage('')
    setAvaSummary('')
    setSearchResults([])
    setShowProgressBar(false)
    setShowAvaSummary(false)
    setProgressWidth(0)
  }

  const updateProgressBar = (percentage: number) => {
    setProgressWidth(percentage)
  }

  const performSearch = async () => {
    if (!query.trim()) {
      if (searchInputRef.current) {
        const originalPlaceholder = searchInputRef.current.placeholder
        searchInputRef.current.placeholder = "Please enter a query..."
        setTimeout(() => {
          if (searchInputRef.current) {
            searchInputRef.current.placeholder = originalPlaceholder
          }
        }, 2000)
      }
      return
    }

    clearResultsAndMessages()
    setIsSearching(true)
    setShowProgressBar(true)
    updateProgressBar(5)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`)
      }

      const data: SearchResponse = await response.json()
      
      // Show AVA summary first
      if (data.avaSummary) {
        setAvaSummary(data.avaSummary)
        setShowAvaSummary(true)
        updateProgressBar(30)
      }

      // Then reveal results one by one with staggered animation
      if (data.sources && data.sources.length > 0) {
        const progressIncrement = 70 / data.sources.length
        let currentProgress = 30

        for (let i = 0; i < data.sources.length; i++) {
          setTimeout(() => {
            setSearchResults(prev => [...prev, data.sources[i]])
            currentProgress += progressIncrement
            updateProgressBar(currentProgress)
            
            if (i === data.sources.length - 1) {
              updateProgressBar(100)
              setTimeout(() => setShowProgressBar(false), 500)
            }
          }, i * 300) // Stagger by 300ms
        }
      } else {
        updateProgressBar(100)
        setTimeout(() => setShowProgressBar(false), 500)
      }

    } catch (error) {
      console.error('Search error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred')
      updateProgressBar(0)
      setShowProgressBar(false)
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      performSearch()
    }
  }

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
          <Link href="/about-tech" className="text-gray-700 header-link text-sm md:text-base hover:text-gray-900 transition duration-300">
            About the Tech
          </Link>
        </nav>
      </header>

      {/* Main Content Area: Centered Search Interface */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 py-8 md:py-0 relative">
        <div className="search-container w-full max-w-3xl flex flex-col items-center">
          {/* Brand Tagline */}
          <h1 className="text-2xl md:text-4xl font-montserrat font-light text-center mb-8 md:mb-12 text-gray-800">
            Crafting <span className="font-normal">Timeless Elegance</span>, Defined by <span className="font-normal">Your Vision</span>.
          </h1>

          {/* Search Bar and Button Container */}
          <div className="w-full flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 rounded-full p-1 max-w-lg mx-auto">
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input flex-grow w-full sm:w-auto h-12 md:h-14 px-5 md:px-6 rounded-full text-base md:text-lg text-gray-700 placeholder-gray-400 focus:placeholder-gray-500 focus:ring-0"
              placeholder="Ask any question in natural language to find amazing results."
              aria-label="Search query input"
            />
            <button
              onClick={performSearch}
              disabled={isSearching}
              className="action-button flex-shrink-0 w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 rounded-full text-base md:text-lg font-montserrat font-normal text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75 whitespace-nowrap disabled:opacity-50"
              aria-label="Discover results"
            >
              Discover
            </button>
          </div>

          {/* Progress Bar Container */}
          {showProgressBar && (
            <div id="progress-bar-container" className="mt-4">
              <div id="progress-bar" style={{ width: `${progressWidth}%` }}></div>
            </div>
          )}

          {/* Loading indicator */}
          {isSearching && (
            <div className="mt-4 text-gray-500 text-sm">Searching for opulent yachts...</div>
          )}

          {/* Error message */}
          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm">Error: {errorMessage}</div>
          )}
        </div>

        {/* AVA Summary Section */}
        {showAvaSummary && avaSummary && (
          <div className="w-full max-w-3xl mt-12 mb-8 p-6 bg-white rounded-xl shadow-lg animate-fade-in">
            <h2 className="text-xl md:text-2xl font-montserrat font-normal text-gray-800 mb-4">
              A Little Note from AVA:
            </h2>
            <p className="text-gray-700 leading-relaxed">{avaSummary}</p>
          </div>
        )}

        {/* Search Results Section */}
        {searchResults.length > 0 && (
          <div className="w-full max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image
                  src={result.imageUrl}
                  alt={result.title || 'Yacht Image'}
                  width={800}
                  height={600}
                  className="w-full h-48 object-cover rounded-t-lg mb-4 shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://placehold.co/800x600/E0E0E0/333333?text=Image%20Not%20Found'
                  }}
                />
                <h3 className="text-lg md:text-xl font-montserrat font-normal text-gray-800 mb-2">
                  {result.title || 'Untitled Result'}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {result.snippet || 'No description available.'}
                </p>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm font-montserrat font-medium"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        )}
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