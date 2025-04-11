import { type NextRequest, NextResponse } from "next/server"
import type { PubStop } from "@/lib/pub-crawl-types"

export async function POST(request: NextRequest) {
  try {
    const { stops, mapType } = await request.json()

    if (!stops || !Array.isArray(stops)) {
      return NextResponse.json({ error: "Invalid stops data" }, { status: 400 })
    }

    // Get API key from environment variable (server-side only)
    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Maps API key not configured" }, { status: 500 })
    }

    let mapUrl

    if (mapType === "pins") {
      mapUrl = generatePinsMapUrl(stops, apiKey)
    } else {
      mapUrl = generateDirectionsMapUrl(stops, apiKey)
    }

    return NextResponse.json({ mapUrl })
  } catch (error) {
    console.error("Error generating map URL:", error)
    return NextResponse.json({ error: "Failed to generate map URL" }, { status: 500 })
  }
}

// Function to generate a Google Maps URL with directions between stops
function generateDirectionsMapUrl(stops: PubStop[], apiKey: string): string {
  // Base URL for Google Maps embed
  const baseUrl = "https://www.google.com/maps/embed/v1/directions"

  // Extract addresses for waypoints
  const origin = encodeURIComponent(stops[0]?.address || "")
  const destination = encodeURIComponent(stops[stops.length - 1]?.address || "")

  // Create waypoints string (excluding first and last stops)
  const waypoints = stops
    .slice(1, -1)
    .map((stop) => encodeURIComponent(stop.address))
    .join("|")

  // Build the URL
  let url = `${baseUrl}?key=${apiKey}&origin=${origin}&destination=${destination}&mode=walking`

  if (waypoints) {
    url += `&waypoints=${waypoints}`
  }

  return url
}

// Function to generate a map with pins for each location
function generatePinsMapUrl(stops: PubStop[], apiKey: string): string {
  // Base URL for Google Maps embed
  const baseUrl = "https://www.google.com/maps/embed/v1/view"

  // Calculate center point (average of all locations)
  const center = calculateCenterPoint(stops)

  // Build the URL for the view
  const url = `${baseUrl}?key=${apiKey}&center=${center}&zoom=14&maptype=roadmap`

  // Add markers for each stop
  const markers = stops
    .map((stop, index) => {
      return `&markers=color:red|label:${index + 1}|${encodeURIComponent(stop.address)}`
    })
    .join("")

  return url + markers
}

// Helper function to calculate the center point of all stops
function calculateCenterPoint(stops: PubStop[]): string {
  // For simplicity, we'll use the address of the middle stop as the center
  const middleIndex = Math.floor(stops.length / 2)
  return encodeURIComponent(stops[middleIndex]?.address || stops[0]?.address || "")
}
