// Helper function to create safe search terms
export function cleanSearchTerm(term: string): string {
  if (!term) return ""

  return term
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // Replace special chars with spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/\b(inc|llc|co|ltd|corporation|company)\b/gi, "") // Remove business suffixes
    .trim()
}

// Map of specific location names to better search terms
export const locationImageMap: Record<string, string[]> = {
  // New York locations
  "Staten Island Ferry": ["Staten Island Ferry new york", "new york harbor view", "statue of liberty ferry"],
  "Brooklyn Boulders": ["Brooklyn Boulders climbing gym", "indoor rock climbing brooklyn"],
  "The Cliffs at LIC": ["The Cliffs LIC climbing gym", "Long Island City climbing"],
  "Central Park": ["Central Park new york", "Central Park manhattan"],
  "Times Square": ["Times Square new york", "Times Square manhattan night"],
  "Empire State Building": ["Empire State Building new york", "Empire State Building skyline"],
  "Brooklyn Bridge": ["Brooklyn Bridge new york", "Brooklyn Bridge manhattan"],
  "High Line": ["High Line park new york", "High Line elevated park manhattan"],
  "Metropolitan Museum of Art": ["Metropolitan Museum of Art new york", "The Met museum manhattan"],
  "Museum of Modern Art": ["Museum of Modern Art new york", "MoMA new york"],

  // Generic fallbacks for common types of places
  Park: ["public park", "city park greenery"],
  Museum: ["museum exhibition", "museum interior"],
  Restaurant: ["restaurant dining", "restaurant interior"],
  Cafe: ["cafe coffee shop", "cafe bakery"],
  Beach: ["beach ocean view", "beach coastline"],
}

// Extract keywords for better search
export function extractKeywords(text: string): string[] {
  // Remove common words and keep only meaningful ones
  const words = text.toLowerCase().split(/\s+/)
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "with",
    "by",
    "of",
    "from",
  ])
  return words.filter((word) => word.length > 2 && !stopWords.has(word))
}

// Function to get alternative search terms for a place
export function getAlternativeSearchTerms(placeName: string, description?: string): string[] {
  // First check if we have a direct mapping
  if (locationImageMap[placeName]) {
    return locationImageMap[placeName]
  }

  const searchTerms = []

  // Add the full place name
  searchTerms.push(`${placeName} landmark`)

  // If we have a description, extract keywords and use them
  if (description) {
    const keywords = extractKeywords(description)
    if (keywords.length >= 3) {
      searchTerms.push(`${placeName} ${keywords.slice(0, 3).join(" ")}`)
    }
  }

  // Add generic type if identifiable
  for (const [type, terms] of Object.entries(locationImageMap)) {
    if (placeName.toLowerCase().includes(type.toLowerCase())) {
      searchTerms.push(`${placeName} ${terms[0]}`)
      break
    }
  }

  // Last resort: just use the place name with some additional context
  if (searchTerms.length === 0) {
    searchTerms.push(`${placeName} attraction`)
    searchTerms.push(`${placeName} location`)
  }

  return searchTerms
}

// Get image from Google Custom Search via our API
export async function getImageFromSearch(searchTerm: string): Promise<string | null> {
  try {
    const cleanTerm = cleanSearchTerm(searchTerm)
    const response = await fetch(`/api/image-search?query=${encodeURIComponent(cleanTerm)}`)

    if (!response.ok) {
      throw new Error(`Search API error: ${response.status}`)
    }

    const data = await response.json()
    return data.imageUrl || null
  } catch (error) {
    console.error("Error fetching image from search:", error)
    return null
  }
}

// Cache for image search results to reduce API calls
const imageCache: Record<string, string> = {}

// Function to get image with caching and fallbacks
export async function getImageUrl(
  activityTitle: string,
  location: string,
  description?: string,
  city?: string,
  state?: string,
): Promise<string> {
  // Create a cache key
  const cacheKey = `${activityTitle}-${location}`.toLowerCase().replace(/\s+/g, "-")

  // Return cached result if available
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey]
  }

  // Infer activity type from description or title
  const activityType = inferActivityTypeFromText(activityTitle, description || "")

  // Create search terms in order of preference with enhanced context
  const searchTerms = [
    `${activityTitle} ${location} ${city || ""} ${state || ""} photo`.trim(), // Most specific
    `${activityTitle} ${city || ""} ${state || ""} photo`.trim(),
    `${activityTitle} ${location} photo`.trim(),
    activityTitle,
    ...getAlternativeSearchTerms(activityTitle, description),
    `${location} ${activityType} photo`.trim(),
    location,
  ].filter((term) => term.length > 0)

  // Try each search term until we find an image
  for (const term of searchTerms) {
    try {
      const imageUrl = await getImageFromSearch(term)
      if (imageUrl) {
        // Cache the result
        imageCache[cacheKey] = imageUrl
        return imageUrl
      }
    } catch (error) {
      console.error(`Error searching for "${term}":`, error)
      // Continue to the next search term
    }
  }

  // Return placeholder if all searches fail
  return `/placeholder.svg?height=160&width=320&text=${encodeURIComponent(activityTitle || "Activity")}`
}

// Add a function to infer activity type from text
function inferActivityTypeFromText(title: string, description: string): string {
  const combinedText = `${title} ${description}`.toLowerCase()

  if (/restaurant|cafe|dining|eatery|bistro|food|eat|breakfast|lunch|dinner|brunch/.test(combinedText)) {
    return "restaurant"
  }
  if (/museum|gallery|exhibit|art|collection|display/.test(combinedText)) {
    return "museum"
  }
  if (/park|garden|nature|outdoor|trail|hike|walk/.test(combinedText)) {
    return "park"
  }
  if (/beach|shore|coast|ocean|sea|bay/.test(combinedText)) {
    return "beach"
  }
  if (/landmark|monument|memorial|historic|heritage|site/.test(combinedText)) {
    return "landmark"
  }
  if (/shop|store|mall|market|boutique|shopping/.test(combinedText)) {
    return "shopping"
  }
  if (/theater|theatre|cinema|movie|show|performance|concert/.test(combinedText)) {
    return "entertainment"
  }

  return "attraction"
}

// Legacy function for compatibility
export function createUnsplashUrl(searchTerm: string): string {
  // Fallback to placeholder while we transition to the new system
  return `/placeholder.svg?height=160&width=320&text=${encodeURIComponent(searchTerm)}`
}
