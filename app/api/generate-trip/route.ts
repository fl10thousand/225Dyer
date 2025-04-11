import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"
import { z } from "zod"
import type { TripPlan } from "@/lib/ai-service"

// Allow streaming responses up to 60 seconds
export const maxDuration = 60

// Define validation schema for request body
const preferencesSchema = z.object({
  location: z.string().min(2, "Location must be at least 2 characters"),
  interests: z.array(z.string()).min(1, "At least one interest is required"),
  budget: z.enum(["budget", "moderate", "luxury"]),
  transportationMode: z.enum(["walking", "public transport", "driving"]),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time format"),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time format"),
  mealPreferences: z.string().optional(),
  accessibility: z.boolean().optional().default(false),
})

// Helper function to clean markdown code blocks from text
function cleanMarkdownCodeBlocks(text: string): string {
  // Remove markdown code block markers
  return text
    .replace(/^```json\s*/g, "") // Remove opening \`\`\`json
    .replace(/^```\s*/g, "") // Remove opening \`\`\` (without json)
    .replace(/\s*```$/g, "") // Remove closing \`\`\`
    .trim()
}

// Add this helper function after the cleanMarkdownCodeBlocks function
function isValidWebsite(url: string): boolean {
  // Check if the URL is a string and not empty after trimming
  if (typeof url !== "string" || url.trim() === "") {
    return false
  }

  // Normalize the URL
  let normalizedUrl = url.trim()

  // Add https:// if no protocol is specified
  if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
    normalizedUrl = "https://" + normalizedUrl
  }

  // Validate URL structure using URL constructor
  try {
    new URL(normalizedUrl)
    return true
  } catch (error) {
    return false
  }
}

// Add this helper function to generate image URLs from search terms
function generateImageUrl(searchTerm: string): string {
  // Use our custom API endpoint instead of directly using Unsplash
  return `/api/unsplash-image?query=${encodeURIComponent(searchTerm)}`
}

export async function POST(request: Request) {
  console.log("Received request to generate trip")

  try {
    // Parse and validate request body
    const body = await request.json()
    console.log("Request body:", JSON.stringify(body))

    const validationResult = preferencesSchema.safeParse(body)

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error)
      return NextResponse.json(
        { error: "Invalid request data", details: validationResult.error.errors },
        { status: 400 },
      )
    }

    const preferences = validationResult.data
    console.log("Validated preferences:", JSON.stringify(preferences))

    // Ensure OpenAI API key is present
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is not configured")
      return NextResponse.json({ error: "OpenAI API key is not configured" }, { status: 500 })
    }

    const interestsString = preferences.interests.join(", ")

    // Create a more detailed description of the user's interests
    const interestDescriptions = {
      history: "historical sites, museums, landmarks, cultural heritage sites, guided historical tours",
      nature: "parks, gardens, hiking trails, scenic viewpoints, nature reserves, outdoor activities",
      food: "local cuisine, food tours, farmers markets, specialty food shops, cooking classes",
      shopping: "boutiques, malls, markets, artisan shops, local crafts, souvenir stores",
      art: "art galleries, museums, street art, art studios, exhibitions, art workshops",
      entertainment: "theaters, live music venues, comedy clubs, cinemas, performance spaces",
      relaxation: "spas, quiet cafes, meditation spaces, peaceful gardens, wellness centers",
      adventure: "outdoor activities, adrenaline experiences, guided adventure tours, unique experiences",
      photography: "scenic viewpoints, photogenic locations, iconic landmarks, natural beauty spots",
      architecture: "notable buildings, architectural tours, historic structures, design landmarks",
      child_friendly: "family attractions, interactive museums, playgrounds, kid-friendly restaurants",
      teen_friendly: "activities appealing to teenagers, interactive experiences, social media-worthy spots",
    }

    // Build a detailed interests description
    const detailedInterests = preferences.interests
      .map((interest) => {
        return interestDescriptions[interest as keyof typeof interestDescriptions] || interest
      })
      .join("; ")

    // Budget descriptions
    const budgetDescriptions = {
      budget:
        "free or low-cost attractions (under $25 per activity), affordable dining options, public transportation, and budget-friendly experiences",
      moderate:
        "mid-range attractions ($25-75 per activity), casual to mid-range restaurants, and a mix of free and paid experiences",
      luxury:
        "premium attractions ($75+ per activity), fine dining restaurants, exclusive experiences, and high-end venues",
    }

    // Transportation descriptions
    const transportationDescriptions = {
      walking:
        "locations within walking distance of each other (typically within 15-20 minute walks), pedestrian-friendly routes, and walkable neighborhoods",
      "public transport":
        "locations near public transit stops, efficient routes using buses/trains/subways, and transit-accessible attractions",
      driving:
        "locations with parking availability, attractions spread across the city, and destinations that might be further apart",
    }

    // Enhanced AI prompt with stronger personalization focus and global location support
    const prompt = `
 You are a travel planner with GLOBAL expertise creating a HIGHLY PERSONALIZED day trip itinerary for ${preferences.location} that PERFECTLY MATCHES the user's preferences.

 ✅ EVERY ACTIVITY MUST include:
 - A **real, working official website URL** (starting with https://)
 - A **map_link** for navigation
 - A **complete address**
 - A clear explanation of how it relates to the user's interests
 - A **image_search_term** field with specific search terms that would yield a good photo of this place (e.g. "Eiffel Tower Paris sunset", "Central Park NYC autumn")

 🚫 DO NOT include activities that:
 - Lack a valid, working website
 - Have generic placeholder links or are unverifiable
 - Do not align with the user's interests

 🎯 USER PREFERENCES:
 - Interests: ${interestsString}
 - Budget: ${preferences.budget}
 - Transportation: ${preferences.transportationMode}
 - Time frame: ${preferences.startTime} to ${preferences.endTime}
 ${preferences.mealPreferences ? `- Meal Preferences: ${preferences.mealPreferences}` : ""}
 ${preferences.accessibility ? `- Accessibility: Requires wheelchair access` : ""}

 🌍 Use local knowledge of ${preferences.location}, and recommend only real, specific places.

 📦 RESPONSE FORMAT (JSON only):
 {
   "title": "Personalized title referencing interests and location",
   "location": "${preferences.location}",
   "date": "March 15, 2025",
   "summary": "Brief explanation of how the plan aligns with user preferences",
   "activities": [
     {
       "time": "09:00 AM",
       "title": "Specific venue name",
       "description": "Why it matches their interests and what makes it special",
       "type": "activity",
       "duration": "2 hours",
       "location": "Complete address",
       "website": "https://example.com",
       "map_link": "https://maps.google.com/...",
       "image_search_term": "specific search terms for this place"
     }
   ]
 }

 Return ONLY the valid JSON object. No markdown, code blocks, or extra text.
 🔥 Critical: Only include activities with real, working websites. 🔥
 🖼️ For image_search_term, provide 3-5 specific keywords that best describe the visual appearance of the location.
`

    console.log(`Generating personalized trip for ${preferences.location} with interests: ${interestsString}`)

    try {
      const startTime = Date.now()

      console.log("Calling OpenAI API...")
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
        temperature: 0.7,
        maxTokens: 3000,
        response_format: { type: "json_object" },
      })

      const duration = Date.now() - startTime
      console.log(`OpenAI response received in ${duration}ms`)

      try {
        // Ensure the response is a valid JSON object
        if (!text || typeof text !== "string") {
          console.error("Empty or invalid response from OpenAI", text)
          return NextResponse.json({ error: "AI response is empty or invalid" }, { status: 500 })
        }

        console.log("Raw OpenAI response:", text.substring(0, 200) + "...")

        // Clean the response of any markdown code block markers
        const cleanedText = cleanMarkdownCodeBlocks(text)
        console.log("Cleaned response:", cleanedText.substring(0, 200) + "...")

        let parsedResponse
        try {
          parsedResponse = JSON.parse(cleanedText)
        } catch (parseError) {
          console.error("Error parsing cleaned response:", parseError)
          // Try one more time with a more aggressive cleaning approach
          const aggressiveCleanedText = text
            .replace(/```[\s\S]*?```/g, (match) => match.replace(/```json\n|```\n|```/g, ""))
            .trim()

          console.log("Aggressively cleaned response:", aggressiveCleanedText.substring(0, 200) + "...")
          parsedResponse = JSON.parse(aggressiveCleanedText)
        }

        if (!parsedResponse.title || !parsedResponse.location || !Array.isArray(parsedResponse.activities)) {
          console.error("Invalid response structure from OpenAI", parsedResponse)
          return NextResponse.json(
            { error: "Invalid response format from AI", rawData: parsedResponse },
            { status: 500 },
          )
        }

        // Validate and enhance links if needed
        console.log(`Before processing: ${parsedResponse.activities.length} activities`)

        parsedResponse.activities = parsedResponse.activities
          .map((activity) => {
            // Process website field
            if (typeof activity.website === "string") {
              activity.website = activity.website.trim()
              if (activity.website !== "" && !activity.website.startsWith("http")) {
                activity.website = "https://" + activity.website
              }
            } else if (activity.website && typeof activity.website === "object" && activity.website.url) {
              // Handle case where website is an object with url property
              activity.website = typeof activity.website.url === "string" ? activity.website.url.trim() : ""
              if (activity.website !== "" && !activity.website.startsWith("http")) {
                activity.website = "https://" + activity.website
              }
            } else {
              activity.website = ""
            }

            // Process map_link field
            if (typeof activity.map_link === "string") {
              activity.map_link = activity.map_link.trim()
              if (activity.map_link !== "" && !activity.map_link.startsWith("http")) {
                activity.map_link = "https://" + activity.map_link
              }
            } else {
              activity.map_link = ""
            }

            // If no map_link but has location, create a Google Maps search link
            if (!activity.map_link && activity.location) {
              const encodedLocation = encodeURIComponent(activity.title + ", " + activity.location)
              activity.map_link = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`
            }

            // Generate image URL from search term if available
            if (activity.image_search_term) {
              activity.image_url = generateImageUrl(activity.image_search_term)
            } else {
              // Generate a default image search term based on the activity title and location
              const defaultSearchTerm = `${activity.title} ${parsedResponse.location}`
              activity.image_url = generateImageUrl(defaultSearchTerm)
            }

            return activity
          })
          .filter((activity) => {
            // Only keep activities where website is valid
            return isValidWebsite(activity.website)
          })

        console.log(`After filtering: ${parsedResponse.activities.length} activities remain`)

        console.log(`Successfully generated personalized trip: ${parsedResponse.title}`)
        console.log("First activity:", parsedResponse.activities[0]?.title || "No activities")

        return NextResponse.json(parsedResponse as TripPlan)
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError, "Raw response:", text)
        return NextResponse.json(
          { error: "Failed to parse AI response. Please try again.", rawData: text },
          { status: 500 },
        )
      }
    } catch (openaiError: any) {
      console.error("OpenAI API error:", openaiError)
      return NextResponse.json({ error: "Failed to generate trip plan due to AI service error." }, { status: 500 })
    }
  } catch (error) {
    console.error("Unexpected error in generateTripPlan API:", error)
    return NextResponse.json({ error: "Failed to generate trip plan. Please try again." }, { status: 500 })
  }
}
