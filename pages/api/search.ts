import type { NextApiRequest, NextApiResponse } from 'next'

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { query } = req.body

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required' })
  }

  try {
    // For Pages Router, we'll redirect to the Netlify Function
    // This ensures compatibility with static export
    const netlifyFunctionUrl = `${req.headers.origin || 'https://opulentshipyards.trendible.news'}/.netlify/functions/search`
    
    const response = await fetch(netlifyFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(`Netlify Function failed: ${response.status}`)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Search API error:', error)
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    })
  }
}