import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { PubCrawlPreferences, PubCrawlPlan } from "@/lib/pub-crawl-types"
import { searchForImage } from "@/lib/image-search"

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const preferences: PubCrawlPreferences = await request.json()

    // Validate input
    if (!preferences.location) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 })
    }

    // Generate the pub crawl using OpenAI
    const pubCrawlPlan = await generatePubCrawlWithAI(preferences)

    // Return the generated pub crawl
    return NextResponse.json(pubCrawlPlan)
  } catch (error) {
    console.error("Error in generate-pub-crawl API:", error)
    return NextResponse.json(
      { error: "Failed to generate pub crawl", details: (error as Error).message },
      { status: 500 },
    )
  }
}

async function generatePubCrawlWithAI(preferences: PubCrawlPreferences): Promise<PubCrawlPlan> {
  const { location, beerType, pubCount, duration } = preferences

  // Create the prompt for the AI
  const prompt = `
    Create a detailed pub crawl itinerary in ${location} with exactly ${pubCount} pubs.
    The crawl should last approximately ${duration} hours.
    The user prefers ${beerType === "any" ? "a variety of beers" : beerType + " beers"}.
    
    For each pub, include:
    1. A realistic pub name that would exist in ${location}
    2. A brief address
    3. A recommended beer to try (preferably a ${beerType === "any" ? "local specialty" : beerType} if available)
    4. A short description of the recommended beer
    
    Format the response as a JSON object with this structure:
    {
      "title": "Pub Crawl in [Location]",
      "location": "${location}",
      "date": "Current date",
      "summary": "A brief summary of the pub crawl",
      "duration": ${duration},
      "stops": [
        {
          "name": "Pub Name",
          "address": "Pub Address",
          "recommendedBeer": "Beer Name",
          "beerDescription": "Brief description of the beer",
          "type": "pub"
        }
      ]
    }
    
    Make sure the pubs are realistic for the location and the beer recommendations match the user's preference for ${beerType === "any" ? "various types of beer" : beerType + " beer"}.
    Distribute the time evenly across all pubs.
  `

  try {
    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that creates detailed pub crawl itineraries. You know about pubs, beer types, and locations worldwide.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Parse the JSON response
    let pubCrawlPlan: PubCrawlPlan

    try {
      // Try to parse the content directly
      pubCrawlPlan = JSON.parse(content)
    } catch (error) {
      // If direct parsing fails, try to extract JSON from markdown
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
      if (jsonMatch && jsonMatch[1]) {
        pubCrawlPlan = JSON.parse(jsonMatch[1])
      } else {
        throw new Error("Failed to parse AI response as JSON")
      }
    }

    // Enhance the pub crawl with additional data
    const enhancedPlan = await enhancePubCrawlData(pubCrawlPlan)

    return enhancedPlan
  } catch (error) {
    console.error("Error generating pub crawl with AI:", error)
    throw error
  }
}

async function enhancePubCrawlData(plan: PubCrawlPlan): Promise<PubCrawlPlan> {
  // Add current date if not present
  if (!plan.date) {
    plan.date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Enhance each stop with additional data
  const enhancedStops = await Promise.all(
    plan.stops.map(async (stop) => {
      // Add map link
      const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${stop.name} ${stop.address} ${plan.location}`,
      )}`

      // Search for an image
      let imageUrl
      try {
        const searchQuery = `${stop.name} pub ${plan.location}`
        imageUrl = await searchForImage(searchQuery)
      } catch (error) {
        console.error(`Error fetching image for ${stop.name}:`, error)
      }

      return {
        ...stop,
        mapLink,
        imageUrl: imageUrl || undefined,
      }
    }),
  )

  return {
    ...plan,
    stops: enhancedStops,
  }
}
