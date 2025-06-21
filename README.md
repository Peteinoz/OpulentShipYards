# Opulent Shipyards - Next.js with Netlify Functions

A luxury yacht search platform powered by AI, built with Next.js 13 and deployed on Netlify.

## 🚀 Deployment on Netlify

### Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `out`
- **Node.js version**: `18`

### Required Environment Variables
Add these in your Netlify dashboard under Site Settings > Environment Variables:

```
PERPLEXITY_API_KEY=your_perplexity_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
GOOGLE_SEARCH_ENGINE_ID=your_google_search_engine_id_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### API Keys Setup

1. **Perplexity AI**: Get your API key from [Perplexity AI](https://www.perplexity.ai/)
2. **Google Custom Search**: 
   - Create a project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Custom Search API
   - Create a Custom Search Engine at [Google CSE](https://cse.google.com/)
3. **Google Gemini**: Get your API key from [Google AI Studio](https://makersuite.google.com/)

## 🏗️ Architecture

- **Frontend**: Next.js 13 with static export
- **API**: Netlify Functions (`/.netlify/functions/search`)
- **Styling**: Tailwind CSS with custom neumorphic design
- **AI Integration**: Perplexity AI, Google Search, Google Gemini

## 📁 Project Structure

```
├── src/app/                 # Next.js app directory
│   ├── page.tsx            # Main search page
│   ├── about/              # About page
│   ├── about-tech/         # About Tech page
│   └── globals.css         # Global styles
├── netlify/functions/       # Netlify Functions
│   └── search.js           # Search API function
├── netlify.toml            # Netlify configuration
└── out/                    # Static export output (generated)
```

## 🔧 Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with your API keys
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## 🌐 Features

- **Natural Language Search**: AI-powered yacht search using Perplexity AI
- **AVA Assistant**: Personalized AI concierge powered by Google Gemini
- **Image Integration**: Automatic yacht image fetching via Google Custom Search
- **Responsive Design**: Optimized for all devices
- **Static Export**: Fast loading with CDN distribution

## 📦 Build Process

The build process creates a static site with Netlify Functions:

1. `npm run build` → Runs `next build && next export`
2. Static files are generated in the `out/` directory
3. Netlify Functions are deployed from `netlify/functions/`
4. API calls to `/api/search` are redirected to `/.netlify/functions/search`

## 🔗 Repository

GitHub: [https://github.com/Peteinoz/OpulentShipYards](https://github.com/Peteinoz/OpulentShipYards)