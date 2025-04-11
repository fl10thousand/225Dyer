import type { PubCrawlPreferences, PubCrawlPlan, PubStop } from "./pub-crawl-types"
import { searchForImage } from "./image-search"

// Helper function to clean markdown code blocks from text
function cleanMarkdownCodeBlocks(text: string): string {
  // Remove markdown code block markers
  return text
    .replace(/^```json\s*/g, "") // Remove opening ```json
    .replace(/^```\s*/g, "") // Remove opening ``` (without json)
    .replace(/\s*```$/g, "") // Remove closing ```
    .trim()
}

export async function generatePubCrawl(preferences: PubCrawlPreferences): Promise<PubCrawlPlan> {
  try {
    console.log("Starting pub crawl generation process...")

    // Determine the base URL for the API call
    let baseUrl

    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      baseUrl = window.location.origin
      console.log("Using browser origin for API URL:", baseUrl)
    } else {
      // Server-side, use the environment variable
      baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      console.log("Using environment variable for API URL:", baseUrl)
    }

    const apiUrl = `${baseUrl}/api/generate-pub-crawl`
    console.log(`Calling API at: ${apiUrl}`)

    // Make the API call with a longer timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
      signal: controller.signal,
      cache: "no-store", // Prevent caching
    })

    clearTimeout(timeoutId)

    console.log("API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API error response:", errorText)
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        errorData = { error: errorText }
      }

      // If the error contains raw data that looks like JSON with markdown, try to parse it
      if (
        errorData.rawData &&
        typeof errorData.rawData === "string" &&
        (errorData.rawData.includes("```json") || errorData.rawData.includes("```"))
      ) {
        try {
          console.log("Attempting to recover data from error response...")
          const cleanedText = cleanMarkdownCodeBlocks(errorData.rawData)
          const recoveredData = JSON.parse(cleanedText)

          if (recoveredData.title && recoveredData.location && Array.isArray(recoveredData.stops)) {
            console.log("Successfully recovered data from error response!")
            return recoveredData as PubCrawlPlan
          }
        } catch (e) {
          console.error("Failed to recover data from error response:", e)
        }
      }

      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    const data = await response.json()
    console.log("API response data received:", data)

    // Validate the response data
    if (!data.title || !data.location || !Array.isArray(data.stops)) {
      console.error("Invalid API response format:", data)
      throw new Error("Invalid response format from API")
    }

    // Enhance the pub crawl data with images if they're missing
    const enhancedPlan = await enhancePubCrawlWithImages(data)

    return enhancedPlan as PubCrawlPlan
  } catch (error) {
    console.error("Error generating pub crawl:", error)

    // If there's an error, return a fallback pub crawl plan
    console.warn("Falling back to placeholder pub crawl due to error")
    return createFallbackPubCrawl(preferences)
  }
}

// Function to enhance the pub crawl with images if they're missing
async function enhancePubCrawlWithImages(plan: PubCrawlPlan): Promise<PubCrawlPlan> {
  const enhancedStops = await Promise.all(
    plan.stops.map(async (stop) => {
      if (!stop.imageUrl || stop.imageUrl.includes("placeholder")) {
        try {
          const searchQuery = `${stop.name} pub ${plan.location}`
          const imageUrl = await searchForImage(searchQuery)
          if (imageUrl) {
            return { ...stop, imageUrl }
          }
        } catch (error) {
          console.error(`Error fetching image for ${stop.name}:`, error)
        }
      }
      return stop
    }),
  )

  return { ...plan, stops: enhancedStops }
}

// Create a fallback pub crawl for when the API call fails
function createFallbackPubCrawl(preferences: PubCrawlPreferences): PubCrawlPlan {
  const { location = "Unknown Location", beerType = "any", pubCount = 3, duration = 3 } = preferences

  // Create a title and summary
  const title = `Pub Crawl in ${location}`
  const summary = `A ${duration}-hour pub crawl in ${location} featuring ${pubCount} pubs with a focus on ${beerType === "any" ? "various" : beerType} beers.`

  // Create generic pub stops
  const stops: PubStop[] = Array.from({ length: pubCount }).map((_, index) => {
    const pubNumber = index + 1

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
      name: `${location} Pub #${pubNumber}`,
      address: `${location} City Center`,
      description: `A popular pub in ${location}.`,
      mapLink: `https://www.google.com/maps/search/?api=1&query=pubs+in+${encodeURIComponent(location)}`,
      recommendedBeer,
      beerDescription,
      type: "pub",
      imageUrl: `/placeholder.svg?height=300&width=400`,
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
