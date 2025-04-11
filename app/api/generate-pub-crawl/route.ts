import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { PubCrawlPreferences, PubCrawlPlan } from "@/lib/pub-crawl-types"
import { findImageForPub } from "@/lib/image-search"

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

    // Create a fallback pub crawl when there's an error
    const fallbackPlan = createFallbackPubCrawl(preferences)

    // Return the fallback plan with a 200 status to prevent breaking the UI
    return NextResponse.json(fallbackPlan)
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
    1. A realistic pub name that would exist in ${location} - use authentic local naming conventions
    2. A brief but specific address in ${location} - use real neighborhoods and street names
    3. A recommended beer to try (preferably a ${beerType === "any" ? "local specialty" : beerType} if available)
    4. A short description of the recommended beer
    5. A website URL for the pub (can be fictional but should follow realistic patterns like "thepubname.com")
    
    Make sure each pub is distinctly different from the others and represents the local pub culture of ${location}.
    
    Format the response as a JSON object with this structure:
    {
      "title": "Pub Crawl in ${location}",
      "location": "${location}",
      "date": "Current date",
      "summary": "A brief summary of the pub crawl highlighting what makes ${location}'s pub scene special",
      "duration": ${duration},
      "stops": [
        {
          "name": "Pub Name",
          "address": "Specific Address in ${location}",
          "recommendedBeer": "Beer Name",
          "beerDescription": "Brief description of the beer",
          "website": "https://pubwebsite.com",
          "type": "pub"
        }
      ]
    }
    
    Make sure the pubs are realistic for the location and the beer recommendations match the user's preference for ${beerType === "any" ? "various types of beer" : beerType + " beer"}.
    Distribute the time evenly across all pubs.
  `

  try {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is missing")
      throw new Error("OpenAI API key is missing")
    }

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
              "You are a helpful assistant that creates detailed pub crawl itineraries. You know about pubs, beer types, and locations worldwide. You always provide authentic, location-specific information that reflects the local culture and pub scene.",
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

    // Add proper error handling for the response structure
    if (!data || !data.choices || !data.choices.length || !data.choices[0].message) {
      console.error("Unexpected OpenAI API response structure:", data)
      throw new Error("Invalid response format from OpenAI API")
    }

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

    // Validate the parsed data
    if (!pubCrawlPlan || !pubCrawlPlan.stops || !Array.isArray(pubCrawlPlan.stops)) {
      throw new Error("Invalid pub crawl data structure")
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
    plan.stops.map(async (stop, index) => {
      // Add map link
      const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${stop.name} ${stop.address} ${plan.location}`,
      )}`

      // Delay each request slightly to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, index * 300))

      // Search for an image using the enhanced pub image search
      let imageUrl
      try {
        console.log(`Finding image for pub ${index + 1}/${plan.stops.length}: ${stop.name} in ${plan.location}`)
        imageUrl = await findImageForPub(stop.name, plan.location, stop.website, stop.imageUrl)
        console.log(`Image result for ${stop.name}: ${imageUrl || "None found"}`)
      } catch (error) {
        console.error(`Error fetching image for ${stop.name}:`, error)
      }

      return {
        ...stop,
        mapLink,
        imageUrl: imageUrl || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(stop.name)}`,
      }
    }),
  )

  return {
    ...plan,
    stops: enhancedStops,
  }
}

// Create a fallback pub crawl for when the API call fails
function createFallbackPubCrawl(preferences: PubCrawlPreferences): PubCrawlPlan {
  const { location = "Unknown Location", beerType = "any", pubCount = 3, duration = 3 } = preferences

  // Create a title and summary
  const title = `Pub Crawl in ${location}`
  const summary = `A ${duration}-hour pub crawl in ${location} featuring ${pubCount} pubs with a focus on ${beerType === "any" ? "various" : beerType} beers.`

  // Create generic pub stops
  const stops = Array.from({ length: pubCount }).map((_, index) => {
    const pubNumber = index + 1
    const pubName = `${location} Pub #${pubNumber}`

    // Create a fictional website URL based on the pub name
    const websiteName = pubName.toLowerCase().replace(/[^a-z0-9]/g, "")
    const website = `https://www.${websiteName}.com`

    // Generate beer recommendation based on preference
    let recommendedBeer = "Local Draft Beer"
    let beerDescription = "A refreshing local favorite."

    if (beerType !== "any") {
      switch (beerType) {
        case "ipa":
          recommendedBeer = `${location} IPA`
          beerDescription = "A hoppy India Pale Ale with citrus notes."
          break
        case "stout":
          recommendedBeer = "Creamy Stout"
          beerDescription = "A rich, dark stout with coffee and chocolate notes."
          break
        case "lager":
          recommendedBeer = "Classic Lager"
          beerDescription = "A crisp, refreshing lager with a clean finish."
          break
        case "pilsner":
          recommendedBeer = "Traditional Pilsner"
          beerDescription = "A light, crisp pilsner with subtle hop character."
          break
        case "ale":
          recommendedBeer = "House Ale"
          beerDescription = "A balanced ale with malty sweetness."
          break
        case "wheat":
          recommendedBeer = "Wheat Beer"
          beerDescription = "A smooth wheat beer with notes of banana and clove."
          break
        case "sour":
          recommendedBeer = "Sour Ale"
          beerDescription = "A tart and refreshing sour beer."
          break
        case "porter":
          recommendedBeer = "Robust Porter"
          beerDescription = "A dark porter with roasted malt flavors."
          break
        case "craft":
          recommendedBeer = "Seasonal Craft Beer"
          beerDescription = "A special craft beer from the local brewery."
          break
      }
    }

    return {
      name: pubName,
      address: `${location} City Center`,
      description: `A popular pub in ${location}.`,
      website,
      mapLink: `https://www.google.com/maps/search/?api=1&query=pubs+in+${encodeURIComponent(location)}`,
      recommendedBeer,
      beerDescription,
      type: "pub",
      imageUrl: `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(pubName)}`,
    }
  })

  return {
    title,
    location,
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    summary,
    duration,
    stops,
  }
}
