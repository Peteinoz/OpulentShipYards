const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { query } = JSON.parse(event.body);

    if (!query || typeof query !== 'string') {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Query is required and must be a string' })
      };
    }

    // Get API keys from environment variables
    const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!PERPLEXITY_API_KEY || !GOOGLE_API_KEY || !GOOGLE_SEARCH_ENGINE_ID || !GEMINI_API_KEY) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Missing required API keys' })
      };
    }

    // Parallel API calls
    const [perplexityResult, avaResult] = await Promise.allSettled([
      // Perplexity API call
      fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'sonar-pro',
          messages: [
            {
              role: "system",
              content: "You are a yacht search assistant. When asked about yachts, provide detailed information and format your response as a JSON object with 'answer' and 'sources' fields. The 'answer' should be a string with your response, and 'sources' should be an array of yacht objects, each with 'title', 'snippet', and 'url' fields."
            },
            {
              role: "user",
              content: `Find yachts that match this criteria: ${query}. Please provide your response in JSON format with 'answer' and 'sources' fields.`
            }
          ],
          max_tokens: 1024
        })
      }),

      // Gemini API call for AVA summary
      fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: "user",
            parts: [{
              text: `You are AVA, an elegant AI assistant for Opulent Shipyards. You've just started a search for your friend. Give a personal, friendly, and enthusiastic brief introduction about starting the search based on the query "${query}". Make it sound like you're talking directly to a friend. Limit your response to 60 words.`
            }]
          }]
        })
      })
    ]);

    let avaSummary = "AVA is getting ready to find amazing results for you!";
    let answer = "";
    let sources = [];

    // Process AVA summary
    if (avaResult.status === 'fulfilled') {
      try {
        const avaData = await avaResult.value.json();
        if (avaData.candidates && avaData.candidates.length > 0 &&
            avaData.candidates[0].content && avaData.candidates[0].content.parts &&
            avaData.candidates[0].content.parts.length > 0) {
          avaSummary = avaData.candidates[0].content.parts[0].text;
        }
      } catch (error) {
        console.error('Error processing AVA summary:', error);
      }
    }

    // Process Perplexity result
    if (perplexityResult.status === 'fulfilled') {
      try {
        const perplexityData = await perplexityResult.value.json();
        let parsedContent;
        
        try {
          parsedContent = JSON.parse(perplexityData.choices[0].message.content);
        } catch (e) {
          // If JSON parsing fails, create a fallback structure
          parsedContent = {
            answer: perplexityData.choices[0].message.content,
            sources: []
          };
        }

        answer = parsedContent.answer || "";
        const perplexitySources = parsedContent.sources || [];

        // Fetch images for each source
        const sourcesWithImages = await Promise.all(
          perplexitySources.map(async (source) => {
            let imageUrl = 'https://placehold.co/800x600/E0E0E0/333333?text=Image%20Not%20Found';
            
            if (source.title && GOOGLE_API_KEY && GOOGLE_SEARCH_ENGINE_ID) {
              try {
                const imageQuery = encodeURIComponent(`${source.title} yacht`);
                const googleImageApiUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${imageQuery}&searchType=image&num=1`;
                
                const imageResponse = await fetch(googleImageApiUrl);
                if (imageResponse.ok) {
                  const imageData = await imageResponse.json();
                  if (imageData.items && imageData.items.length > 0 && imageData.items[0].link) {
                    imageUrl = imageData.items[0].link;
                  }
                }
              } catch (error) {
                console.error(`Error fetching image for "${source.title}":`, error);
              }
            }

            return {
              title: source.title || 'Untitled Result',
              snippet: source.snippet || 'No description available.',
              url: source.url || '#',
              imageUrl
            };
          })
        );

        sources = sourcesWithImages;

        // Update AVA summary with final results if we have a comprehensive answer
        if (answer && avaSummary.includes("starting the search")) {
          try {
            const refinedAvaResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{
                  role: "user",
                  parts: [{
                    text: `You are AVA, an elegant AI assistant for Opulent Shipyards. You've completed a search for your friend. Give a personal, friendly, and enthusiastic summary of the *final* search results. Make it sound like you're talking directly to a friend. Limit your response to 60 words. Here's the core answer from the search: "${answer}"`
                  }]
                }]
              })
            });

            if (refinedAvaResponse.ok) {
              const refinedAvaData = await refinedAvaResponse.json();
              if (refinedAvaData.candidates && refinedAvaData.candidates.length > 0 &&
                  refinedAvaData.candidates[0].content && refinedAvaData.candidates[0].content.parts &&
                  refinedAvaData.candidates[0].content.parts.length > 0) {
                avaSummary = refinedAvaData.candidates[0].content.parts[0].text;
              }
            }
          } catch (error) {
            console.error("Error refining AVA's summary:", error);
          }
        }

      } catch (error) {
        console.error('Error processing Perplexity result:', error);
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ error: 'Failed to process search results' })
        };
      }
    } else {
      console.error('Perplexity API call failed:', perplexityResult.reason);
      return {
        statusCode: 503,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Search service unavailable' })
      };
    }

    const response = {
      avaSummary,
      answer,
      sources
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Search API error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};