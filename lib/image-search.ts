// Cache for storing image search results
const imageCache: Record<string, { url: string; timestamp: number }> = {}
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

/**
 * Clean a search term by removing special characters and extra spaces
 */
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
  Pub: ["pub interior", "pub building exterior"],
  Bar: ["bar interior", "cocktail bar"],
  Brewery: ["brewery taproom", "craft beer brewery"],
}

// Generate alternative search terms for a place
export function getAlternativeSearchTerms(placeName: string, location: string): string[] {
  // First check if we have a direct mapping
  if (locationImageMap[placeName]) {
    return locationImageMap[placeName]
  }

  const searchTerms = []

  // Add the full place name with location
  searchTerms.push(`${placeName} ${location}`)

  // Add the place name alone
  searchTerms.push(placeName)

  // Add generic type if identifiable
  for (const [type, terms] of Object.entries(locationImageMap)) {
    if (placeName.toLowerCase().includes(type.toLowerCase())) {
      searchTerms.push(`${placeName} ${terms[0]}`)
      break
    }
  }

  // Last resort: just use the place name with some additional context
  if (searchTerms.length === 1) {
    searchTerms.push(`${placeName} attraction`)
    searchTerms.push(`${placeName} location`)
  }

  return searchTerms
}

// Search for an image using our API endpoint
export async function searchForImage(query: string): Promise<string | null> {
  try {
    const cleanQuery = cleanSearchTerm(query)

    // Check cache first
    const cachedResult = getCachedImage(cleanQuery)
    if (cachedResult) {
      console.log("Using cached image for:", cleanQuery)
      return cachedResult
    }

    console.log("Searching for image:", cleanQuery)
    const response = await fetch(`/api/image-search?query=${encodeURIComponent(cleanQuery)}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Image search error (${response.status}):`, errorText)
      return null
    }

    const data = await response.json()

    if (data.imageUrl) {
      // Cache the result
      cacheImage(cleanQuery, data.imageUrl)
      return data.imageUrl
    }

    return null
  } catch (error) {
    console.error("Error searching for image:", error)
    return null
  }
}

/**
 * Search for an image using the API
 */
export async function searchImage(query: string): Promise<string | null> {
  try {
    // Clean the query
    const cleanQuery = cleanSearchTerm(query)

    // Check cache first
    const cachedResult = getCachedImage(cleanQuery)
    if (cachedResult) {
      return cachedResult
    }

    // Make API request
    const response = await fetch(`/api/image-search?query=${encodeURIComponent(cleanQuery)}`)
    const data = await response.json()

    if (!response.ok) {
      console.error("Image search error:", data.error)
      return null
    }

    if (data.imageUrl) {
      // Cache the result
      cacheImage(cleanQuery, data.imageUrl)
      return data.imageUrl
    }

    return null
  } catch (error) {
    console.error("Error searching for image:", error)
    return null
  }
}

/**
 * Get an image from cache if available and not expired
 */
export function getCachedImage(query: string): string | null {
  const cacheEntry = imageCache[query]
  if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_DURATION) {
    return cacheEntry.url
  }
  return null
}

/**
 * Cache an image URL for a query
 */
export function cacheImage(query: string, url: string): void {
  imageCache[query] = {
    url,
    timestamp: Date.now(),
  }
}

// Find an image for an activity with multiple fallback options
export async function findImageForActivity(
  activityTitle: string,
  location: string,
  existingImageUrl?: string,
  city?: string,
  state?: string,
  activityType?: string,
): Promise<string> {
  // If we already have a valid image URL, use it
  if (
    existingImageUrl &&
    typeof existingImageUrl === "string" &&
    existingImageUrl.startsWith("http") &&
    !existingImageUrl.includes("placeholder")
  ) {
    return existingImageUrl
  }

  // Generate search terms with enhanced context
  const searchTerms = generateImageSearchQueries({
    name: activityTitle,
    location: location,
    type: activityType || inferActivityType(activityTitle, location),
    city: city,
    state: state,
  })

  // Try each search term until we find an image
  for (const term of searchTerms) {
    try {
      const imageUrl = await searchForImage(term)
      if (imageUrl) {
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
/**
 * Generates search queries for an activity based on its details
 * @param activity The activity object with name, location, and type
 * @returns An array of search queries in priority order
 */
export function generateImageSearchQueries(activity: {
  name: string
  location?: string
  type?: string
  city?: string
  state?: string
}): string[] {
  const queries = []
  const cleanName = cleanSearchTerm(activity.name)
  const cleanLocation = activity.location ? cleanSearchTerm(activity.location) : ""
  const cleanCity = activity.city ? cleanSearchTerm(activity.city) : ""
  const cleanState = activity.state ? cleanSearchTerm(activity.state) : ""

  // Most specific query first - activity name + location + city + state
  if (cleanName && cleanLocation && cleanCity && cleanState) {
    queries.push(`${cleanName} ${cleanLocation} ${cleanCity} ${cleanState} photo`)
  }

  // Activity name + city + state
  if (cleanName && cleanCity && cleanState) {
    queries.push(`${cleanName} ${cleanCity} ${cleanState} photo`)
  }

  // Activity name + location
  if (cleanName && cleanLocation) {
    queries.push(`${cleanName} ${cleanLocation} photo`)
  }

  // Activity name + city
  if (cleanName && cleanCity) {
    queries.push(`${cleanName} ${cleanCity} photo`)
  }

  // Activity name only
  if (cleanName) {
    queries.push(`${cleanName} photo`)

    // If name is short, add context
    if (cleanName.split(" ").length < 2) {
      if (activity.type) {
        queries.push(`${cleanName} ${activity.type} photo`)
      }
      queries.push(`${cleanName} travel destination`)
      queries.push(`${cleanName} tourist attraction`)
    }
  }

  // Location + type
  if (cleanLocation && activity.type) {
    queries.push(`${activity.type} in ${cleanLocation} photo`)
  }

  // City + type
  if (cleanCity && activity.type) {
    queries.push(`${activity.type} in ${cleanCity} ${cleanState} photo`)
  }

  // Fallback to a generic query with location context
  if (cleanCity && cleanState) {
    queries.push(`tourist attraction in ${cleanCity} ${cleanState}`)
  } else if (cleanCity) {
    queries.push(`tourist attraction in ${cleanCity}`)
  } else {
    queries.push("scenic travel destination")
  }

  return queries.filter(Boolean)
}

/**
 * Generate alternative search terms for a query
 */
export function generateAlternativeSearchTerms(query: string): string[] {
  const cleanQuery = cleanSearchTerm(query)
  const alternatives = [cleanQuery]

  // Add location-specific alternatives
  if (!cleanQuery.includes("landmark")) {
    alternatives.push(`${cleanQuery} landmark`)
  }

  if (!cleanQuery.includes("attraction")) {
    alternatives.push(`${cleanQuery} attraction`)
  }

  return alternatives
}

/**
 * Search for an image with fallbacks
 */
export async function searchImageWithFallbacks(query: string): Promise<string | null> {
  const alternatives = generateAlternativeSearchTerms(query)

  for (const alt of alternatives) {
    const imageUrl = await searchImage(alt)
    if (imageUrl) {
      return imageUrl
    }
  }

  return null
}

// Add a function to infer activity type from title and location
function inferActivityType(title: string, location: string): string {
  const combinedText = `${title} ${location}`.toLowerCase()

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
  if (/pub|bar|tavern|brewery|taproom|alehouse|beer/.test(combinedText)) {
    return "pub"
  }

  return "attraction"
}

export async function searchGoogleImages(query: string): Promise<string | null> {
  try {
    // Clean and prepare the query
    const cleanQuery = cleanSearchTerm(query)

    // Check cache first
    const cacheKey = `google_${cleanQuery}`
    const cachedResult = getCachedImage(cacheKey)
    if (cachedResult) {
      console.log("Using cached Google image for:", cleanQuery)
      return cachedResult
    }

    // Make sure we have the required environment variables
    if (!process.env.GOOGLE_SEARCH_API_KEY || !process.env.GOOGLE_SEARCH_ENGINE_ID) {
      console.error("Missing Google Search API credentials")
      return null
    }

    // Use the image-search API endpoint which is already set up with Google credentials
    console.log("Searching Google Images for:", cleanQuery)
    const response = await fetch(`/api/image-search?query=${encodeURIComponent(cleanQuery)}&source=google`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Google image search error (${response.status}):`, errorText)
      return null
    }

    const data = await response.json()

    if (data.imageUrl) {
      // Cache the result
      cacheImage(cacheKey, data.imageUrl)
      return data.imageUrl
    }

    return null
  } catch (error) {
    console.error("Error in searchGoogleImages:", error)
    return null
  }
}

/**
 * Extract domain from a URL
 */
function extractDomain(url: string): string | null {
  try {
    if (!url) return null

    // Clean up the URL
    url = url.trim().toLowerCase()

    // Add protocol if missing
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url
    }

    // Parse the URL
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch (error) {
    console.error("Error extracting domain:", error)
    return null
  }
}

/**
 * Check if an image URL is valid and accessible with timeout
 */
async function isImageAccessible(url: string): Promise<boolean> {
  try {
    // Create an AbortController with a timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    return response.ok && response.headers.get("content-type")?.startsWith("image/")
  } catch (error) {
    console.error(`Image accessibility check failed for ${url}:`, error)
    return false
  }
}

/**
 * Get favicon for a website with better error handling
 */
async function getFavicon(domain: string): Promise<string | null> {
  if (!domain) return null

  try {
    console.log(`Attempting to get favicon for domain: ${domain}`)
    const faviconUrl = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`

    if (await isImageAccessible(faviconUrl)) {
      console.log(`Successfully found favicon for ${domain}`)
      return faviconUrl
    }

    console.log(`No favicon found for ${domain}`)
    return null
  } catch (error) {
    console.error(`Error getting favicon for ${domain}:`, error)
    return null
  }
}

/**
 * Get Apple Touch icon for a website with better error handling
 */
async function getAppleTouchIcon(domain: string): Promise<string | null> {
  if (!domain) return null

  try {
    console.log(`Attempting to get Apple Touch icon for domain: ${domain}`)

    // Try common paths for Apple Touch icons
    const touchIconPaths = [
      `/apple-touch-icon.png`,
      `/apple-touch-icon-precomposed.png`,
      `/apple-touch-icon-180x180.png`,
      `/apple-touch-icon-152x152.png`,
      `/apple-touch-icon-120x120.png`,
      `/apple-touch-icon-76x76.png`,
      `/apple-touch-icon-60x60.png`,
    ]

    for (const path of touchIconPaths) {
      const touchIconUrl = `https://${domain}${path}`
      if (await isImageAccessible(touchIconUrl)) {
        console.log(`Successfully found Apple Touch icon at ${touchIconUrl}`)
        return touchIconUrl
      }
    }

    console.log(`No Apple Touch icon found for ${domain}`)
    return null
  } catch (error) {
    console.error(`Error getting Apple Touch icon for ${domain}:`, error)
    return null
  }
}

/**
 * Generate pub-specific search terms that are more likely to return relevant images
 */
function generatePubSearchQueries(pubName: string, location: string): string[] {
  const queries = []
  const cleanPubName = cleanSearchTerm(pubName)
  const cleanLocation = cleanSearchTerm(location)

  // Most specific queries first
  queries.push(`${cleanPubName} pub ${cleanLocation} exterior`)
  queries.push(`${cleanPubName} pub ${cleanLocation}`)
  queries.push(`${cleanPubName} bar ${cleanLocation}`)

  // Add pub type variations
  if (!/pub|bar|tavern|brewery/.test(cleanPubName.toLowerCase())) {
    queries.push(`${cleanPubName} pub exterior`)
    queries.push(`${cleanPubName} bar exterior`)
    queries.push(`${cleanPubName} tavern exterior`)
  }

  // Add location context
  queries.push(`pub in ${cleanLocation}`)
  queries.push(`traditional pub ${cleanLocation}`)

  // Generic fallbacks
  queries.push(`${cleanLocation} pub scene`)
  queries.push(`traditional pub exterior`)

  return queries.filter(Boolean)
}

/**
 * Find an image for a pub with enhanced fallback logic
 * This is specifically for the pub crawl feature
 */
export async function findImageForPub(
  pubName: string,
  location: string,
  website?: string,
  existingImageUrl?: string,
): Promise<string> {
  console.log(`Finding image for pub: ${pubName} in ${location}`)

  // Cache key for this specific pub
  const cacheKey = `pub_${pubName}_${location}`
  const cachedResult = getCachedImage(cacheKey)
  if (cachedResult) {
    console.log(`Using cached image for pub: ${pubName}`)
    return cachedResult
  }

  // If we already have a valid image URL, use it
  if (
    existingImageUrl &&
    typeof existingImageUrl === "string" &&
    existingImageUrl.startsWith("http") &&
    !existingImageUrl.includes("placeholder")
  ) {
    console.log(`Using existing image URL for pub: ${pubName}`)
    cacheImage(cacheKey, existingImageUrl)
    return existingImageUrl
  }

  // Step 1: Try to find an image using pub-specific search queries
  const searchQueries = generatePubSearchQueries(pubName, location)
  console.log(`Generated search queries for ${pubName}:`, searchQueries)

  for (const query of searchQueries) {
    try {
      console.log(`Searching for image with query: "${query}"`)
      const imageUrl = await searchForImage(query)
      if (imageUrl) {
        console.log(`Found image for pub ${pubName} with query "${query}": ${imageUrl}`)
        cacheImage(cacheKey, imageUrl)
        return imageUrl
      }
    } catch (error) {
      console.error(`Error searching for image with query "${query}":`, error)
    }
  }

  // Step 2: If website is provided, try to get favicon or Apple Touch icon
  if (website) {
    console.log(`Trying to get logo from website: ${website}`)
    const domain = extractDomain(website)

    if (domain) {
      console.log(`Extracted domain: ${domain}`)

      // Try Google's favicon service
      try {
        const faviconUrl = await getFavicon(domain)
        if (faviconUrl) {
          console.log(`Found favicon for ${pubName}: ${faviconUrl}`)
          cacheImage(cacheKey, faviconUrl)
          return faviconUrl
        }
      } catch (error) {
        console.error(`Error getting favicon for ${domain}:`, error)
      }

      // Try Apple Touch icon
      try {
        const touchIconUrl = await getAppleTouchIcon(domain)
        if (touchIconUrl) {
          console.log(`Found Apple Touch icon for ${pubName}: ${touchIconUrl}`)
          cacheImage(cacheKey, touchIconUrl)
          return touchIconUrl
        }
      } catch (error) {
        console.error(`Error getting Apple Touch icon for ${domain}:`, error)
      }
    } else {
      console.log(`Could not extract domain from website: ${website}`)
    }
  } else {
    console.log(`No website provided for pub: ${pubName}`)
  }

  // Step 3: Final fallback to placeholder
  console.log(`Using placeholder for pub: ${pubName}`)
  const placeholderUrl = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(pubName || "Pub")}`
  return placeholderUrl
}
