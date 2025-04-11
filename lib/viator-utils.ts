import { viatorDestinations, viatorAliases } from "./viator-data"

// Create a global Set to track missing cities (only in development)
// This will persist across function calls but won't be shared across page refreshes
const missingCities: Set<string> = new Set()

/**
 * Normalizes a location string by:
 * - Removing accents
 * - Removing punctuation except spaces
 * - Trimming whitespace
 * - Converting to Title Case
 *
 * @param location The location string to normalize
 * @returns The normalized location string
 */
export function normalizeLocation(location: string): string {
  if (!location) return ""

  // Remove accents
  const withoutAccents = location.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  // Remove punctuation except spaces, convert to lowercase
  const withoutPunctuation = withoutAccents.replace(/[^\w\s]/g, "").toLowerCase()

  // Convert to Title Case and trim
  return withoutPunctuation
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim()
}

/**
 * Tracks cities that aren't found in our destination or alias lists
 * Only logs in development mode and prevents duplicate logging
 *
 * @param cityName The normalized city name that wasn't found
 */
function trackMissingCity(cityName: string): void {
  // Only track in development mode
  if (typeof process !== "undefined" && process.env.NODE_ENV === "production") {
    return
  }

  // Skip if we've already logged this city
  if (missingCities.has(cityName)) {
    return
  }

  // Add to our tracking Set and log to console
  missingCities.add(cityName)
  console.log(`[Viator] Missing city mapping for: "${cityName}"`)
}

/**
 * Returns all missing cities that have been tracked
 * Useful for debugging or reporting
 */
export function getMissingCities(): string[] {
  return Array.from(missingCities)
}

/**
 * Generates a Viator affiliate link based on activity, location, and interests
 *
 * @param activity The activity object containing title and optional type
 * @param location The location string
 * @param interests Optional array of interest strings
 * @returns A Viator affiliate link
 */
export function generateViatorLink(
  activity: { title: string; type?: string },
  location: string,
  interests?: string[],
): string {
  const pid = "P00244457"
  const mcid = "56757"
  const baseUrl = "https://www.viator.com"
  const affiliateParams = `pid=${pid}&mcid=${mcid}&medium=affiliate`

  try {
    // Extract city from location and normalize
    const city = location?.split(",")[0]?.trim() || ""
    const normalizedCity = normalizeLocation(city)

    if (!normalizedCity) {
      // If no valid city, fall back to general search
      return `${baseUrl}/search/results?q=tours&${affiliateParams}`
    }

    // Check if the city has an alias
    const aliasedCity = viatorAliases[normalizedCity] || normalizedCity

    // Check if we have a destination for this city (either directly or via alias)
    const destination = viatorDestinations[aliasedCity]

    if (destination) {
      // FIXED: Use the correct URL format with single 'd' followed by the ID
      // The correct format is: /slug/d{id}
      return `${baseUrl}/${destination.slug}/d${destination.id}?${affiliateParams}`
    }

    // If we get here, the city wasn't found in our maps
    // Track it for future reference (only in development)
    trackMissingCity(normalizedCity)

    // If no destination match, fall back to keyword search
    const searchTerms: string[] = []

    // Prioritize location in search terms
    if (city) searchTerms.push(city)

    // Add activity title if available
    if (activity.title) {
      // Clean up activity title - remove common words that don't help search
      const cleanTitle = activity.title.replace(/tour|experience|visit|explore|discover/gi, "").trim()

      if (cleanTitle) searchTerms.push(cleanTitle)
    }

    // Add first interest if available
    if (interests?.length) searchTerms.push(interests[0])

    // Create the query string, defaulting to "tours" if empty
    const query = encodeURIComponent(searchTerms.filter(Boolean).join(" ") || "tours")

    return `${baseUrl}/search/results?q=${query}&${affiliateParams}`
  } catch (error) {
    // In case of any errors, return a safe fallback URL
    console.error("Error generating Viator link:", error)
    return `${baseUrl}/search/results?q=tours&${affiliateParams}`
  }
}
