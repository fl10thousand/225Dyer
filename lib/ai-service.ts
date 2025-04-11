export interface TripPreferences {
  location: string
  interests: string[]
  budget: "budget" | "moderate" | "luxury"
  transportationMode: "walking" | "public transport" | "driving"
  startTime: string
  endTime: string
  mealPreferences?: string
  accessibility?: boolean
}

export interface TripActivity {
  time: string
  title: string
  description: string
  type: string
  duration: string
  location: string
  website?: string
  map_link?: string
  image_url?: string // Add this new field
}

export interface TripPlan {
  title: string
  location: string
  date: string
  summary: string
  activities: TripActivity[]
}

// Helper function to clean markdown code blocks from text
function cleanMarkdownCodeBlocks(text: string): string {
  // Remove markdown code block markers
  return text
    .replace(/^```json\s*/g, "") // Remove opening \`\`\`json
    .replace(/^```\s*/g, "") // Remove opening \`\`\` (without json)
    .replace(/\s*```$/g, "") // Remove closing \`\`\`
    .trim()
}

export async function generateTripPlan(preferences: TripPreferences): Promise<TripPlan> {
  try {
    console.log("Starting trip generation process...")

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

    const apiUrl = `${baseUrl}/api/generate-trip`
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

          if (recoveredData.title && recoveredData.location && Array.isArray(recoveredData.activities)) {
            console.log("Successfully recovered data from error response!")
            return recoveredData as TripPlan
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
    if (!data.title || !data.location || !Array.isArray(data.activities)) {
      console.error("Invalid API response format:", data)
      throw new Error("Invalid response format from API")
    }

    // Check if this looks like a fallback plan
    const isFallback =
      data.summary.includes("fallback") ||
      data.summary.includes("placeholder") ||
      data.activities.some(
        (a: any) =>
          a.description.includes("placeholder") ||
          a.title.includes(`Morning in ${preferences.location}`) ||
          a.title === "Afternoon Exploration" ||
          a.title === "End of Day",
      )

    if (isFallback) {
      console.warn("Received what appears to be a fallback plan from the API")
    } else {
      console.log("Successfully received personalized trip plan")
    }

    return data as TripPlan
  } catch (error) {
    console.error("Error generating trip plan:", error)

    // If there's an error, return a fallback trip plan
    console.warn("Falling back to placeholder trip plan due to error")
    return createFallbackTripPlan(preferences)
  }
}

// Create a fallback trip plan for when the API call fails
export function createFallbackTripPlan(preferences: TripPreferences): TripPlan {
  // Create a more specific title based on the location
  const title = `Exploring ${preferences.location}: A Day of Discovery`

  // Create a more specific summary
  const summary = `A relaxed day trip around ${preferences.location}, featuring local attractions and dining options. This is a basic itinerary since we couldn't generate a fully personalized one at this time.`

  // Try to create more specific activities based on the location
  const morningActivity = {
    time: preferences.startTime,
    title: `Morning in ${preferences.location}`,
    description: `Begin your day exploring the central area of ${preferences.location}. This is a placeholder activity since we couldn't generate a personalized itinerary at this time.`,
    type: "activity" as const,
    duration: "2 hours",
    location: `${preferences.location} City Center`,
    map_link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(preferences.location + " attractions")}`,
  }

  const lunchActivity = {
    time: "12:00",
    title: `Lunch in ${preferences.location}`,
    description: `Enjoy a meal at a local restaurant. ${preferences.mealPreferences ? `Consider looking for places that offer ${preferences.mealPreferences}.` : ""}`,
    type: "meal" as const,
    duration: "1 hour 30 minutes",
    location: `${preferences.location} Downtown`,
    map_link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("restaurants in " + preferences.location)}`,
  }

  const afternoonActivity = {
    time: "14:00",
    title: `Afternoon Exploration`,
    description: `Spend your afternoon visiting a popular attraction in ${preferences.location}.`,
    type: "activity" as const,
    duration: "2 hours",
    location: `${preferences.location}`,
    map_link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("attractions in " + preferences.location)}`,
  }

  const endActivity = {
    time: preferences.endTime,
    title: "End of Day",
    description: `Conclude your day trip in ${preferences.location}. Consider trying a local café or viewpoint before heading back.`,
    type: "activity" as const,
    duration: "1 hour",
    location: `${preferences.location} City Center`,
    map_link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(preferences.location + " viewpoint")}`,
  }

  return {
    title,
    location: preferences.location,
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    summary,
    activities: [morningActivity, lunchActivity, afternoonActivity, endActivity],
  }
}
