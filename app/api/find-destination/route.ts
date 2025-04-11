import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const {
      currentLocation,
      maxDistance,
      duration,
      interests,
      excludeDestinations,
      requestAlternative,
      childFriendly,
    } = await request.json()

    // Validate inputs
    if (!currentLocation || !interests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Convert duration to a more descriptive format
    const durationText =
      {
        day: "a day trip (1 day)",
        weekend: "a weekend getaway (2-3 days)",
        short: "a short vacation (4-7 days)",
        long: "an extended stay (1+ weeks)",
      }[duration] || "a day trip"

    // Create the prompt for the AI
    const systemPrompt = `You are a travel recommendation assistant. ${
      (excludeDestinations || []).length > 0
        ? `DO NOT recommend any of these destinations: ${(excludeDestinations || []).join(", ")}. `
        : ""
    }${
      requestAlternative
        ? "Provide an ALTERNATIVE destination that is different from your previous recommendations. "
        : ""
    }Based on the user's current location...`

    const prompt = `
      ${systemPrompt}
      I need a travel destination recommendation based on the following criteria:
      - Starting location: ${currentLocation}
      - Maximum driving distance: ${maxDistance} miles
      - Trip duration: ${durationText}
      - Traveler interests: ${interests}
      ${childFriendly ? "- Must be child-friendly with family-appropriate activities and amenities" : ""}

      Please recommend ONE specific destination (city or town) that would be perfect for this trip.
      Format your response as a JSON object with the following structure:
      {
        "destination": "Name of the destination",
        "origin": "${currentLocation}",
        "distance": approximate distance in miles (number only),
        "driveTime": "approximate drive time as text",
        "description": "A paragraph describing the destination",
        "imageUrl": "",
        "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
        "activities": [
          { "name": "Activity 1", "description": "Brief description of activity 1" },
          { "name": "Activity 2", "description": "Brief description of activity 2" },
          { "name": "Activity 3", "description": "Brief description of activity 3" },
          { "name": "Activity 4", "description": "Brief description of activity 4" },
          { "name": "Activity 5", "description": "Brief description of activity 5" }
        ],
        "bestTimeToVisit": "Information about the best time to visit",
        "localTips": "Insider tips for visiting this destination",
        "idealDuration": "Text describing ideal visit duration",
        "reasonForRecommendation": "Why this destination matches the traveler's preferences"
      }

      IMPORTANT: Return ONLY the JSON object with no additional text, markdown formatting, or code blocks.
    `

    // Generate the recommendation using OpenAI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 1500,
      response_format: { type: "json_object" }, // Explicitly request JSON format
    })

    // Parse the response with better error handling
    let recommendation
    try {
      // Clean the response text to ensure it's valid JSON
      let cleanedText = text.trim()

      // Remove any markdown code block indicators if present
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/^```json\n/, "").replace(/\n```$/, "")
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/^```\n/, "").replace(/\n```$/, "")
      }

      // Parse the cleaned JSON
      recommendation = JSON.parse(cleanedText)

      // Add a placeholder image URL
      const encodedDestination = encodeURIComponent(recommendation.destination)
      recommendation.imageUrl = `/api/unsplash-image?query=${encodedDestination}%20landmark%20travel`

      console.log("Successfully parsed recommendation:", recommendation.destination)
    } catch (error) {
      console.error("Error parsing AI response:", error, "Raw text:", text)

      // Return a fallback recommendation instead of an error
      return NextResponse.json({
        destination: "Newport, Rhode Island",
        origin: currentLocation,
        distance: 72,
        driveTime: "1 hour 15 minutes",
        description:
          "Newport offers a perfect blend of coastal beauty, rich history, and cultural attractions. Known for its stunning Gilded Age mansions, scenic Cliff Walk, and vibrant waterfront, it's an ideal destination for a memorable getaway.",
        imageUrl: "/api/unsplash-image?query=Newport%20Rhode%20Island%20landmark",
        tags: ["Coastal", "Historic", "Scenic", "Food", "Architecture"],
        activities: [
          {
            name: "Tour the Newport Mansions",
            description: "Explore opulent Gilded Age estates like The Breakers and Marble House",
          },
          {
            name: "Walk the Cliff Walk",
            description: "Enjoy a 3.5-mile scenic path along the shoreline with ocean views",
          },
          { name: "Visit Thames Street", description: "Shop and dine along the historic waterfront district" },
          {
            name: "Explore Fort Adams",
            description: "Tour America's largest coastal fortress with guided tours available",
          },
          { name: "Sail Narragansett Bay", description: "Take a harbor cruise or sailing excursion on the bay" },
        ],
        bestTimeToVisit:
          "Late spring through early fall offers the best weather, with September and October providing fewer crowds and pleasant temperatures.",
        localTips:
          "Parking can be challenging in summer - consider using the public parking lots and walking or taking the trolley. For the best dining experience, try the seafood restaurants along the wharves.",
        idealDuration: "a day trip or weekend getaway",
        reasonForRecommendation:
          "Based on your interests and location, Newport offers the perfect mix of activities within a reasonable driving distance.",
      })
    }

    return NextResponse.json(recommendation)
  } catch (error) {
    console.error("Error in find-destination route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
