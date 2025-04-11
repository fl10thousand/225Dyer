// Set to track cities not found in viatorDestinations or viatorAliases
const missingCities = new Set<string>()

/**
 * Normalizes a location string by extracting just the city name
 * when state abbreviations are present (e.g., "Portland, ME" -> "Portland")
 */
export function normalizeLocation(location: string): string {
  // Match city followed by comma and space and 2-letter state code
  const cityStateMatch = location.match(/^(.+),\s+[A-Z]{2}$/)
  if (cityStateMatch) {
    return cityStateMatch[1].trim()
  }
  return location.trim()
}

/**
 * Generates a Viator affiliate link for a given location
 * @param location The city or location name
 * @returns A Viator affiliate link for the location, or null if the location is not found
 */
export function generateViatorLink(location: string): string | null {
  if (!location) return null

  // Normalize the location (remove state abbreviation if present)
  const normalizedLocation = normalizeLocation(location)

  // Check if the location is in viatorDestinations
  const { viatorDestinations, viatorAliases } = require("./viator-data")

  // Direct match in destinations
  if (viatorDestinations[normalizedLocation]) {
    const { slug, id } = viatorDestinations[normalizedLocation]
    // Using the correct URL format
    return `https://www.viator.com/${slug}/d${id}?pid=P00244457&mcid=56757&medium=affiliate`
  }

  // Check aliases
  if (viatorAliases[normalizedLocation]) {
    const parentLocation = viatorAliases[normalizedLocation]
    if (viatorDestinations[parentLocation]) {
      const { slug, id } = viatorDestinations[parentLocation]
      return `https://www.viator.com/${slug}/d${id}?pid=P00244457&mcid=56757&medium=affiliate`
    }
  }

  // Special case for Portland, Maine
  if (
    normalizedLocation === "Portland Maine" ||
    normalizedLocation === "Portland, Maine" ||
    normalizedLocation.toLowerCase() === "portland maine"
  ) {
    return `https://www.viator.com/Portland-Maine/d22910?pid=P00244457&mcid=56757&medium=link`
  }

  // Track missing cities in development mode
  if (process.env.NODE_ENV !== "production") {
    if (!missingCities.has(normalizedLocation)) {
      missingCities.add(normalizedLocation)
      console.log(`City not found in Viator destinations or aliases: ${normalizedLocation}`)
    }
  }

  return null
}

/**
 * Debug function to get all missing cities
 * @returns Array of all cities that were not found in viatorDestinations or viatorAliases
 */
export function getMissingCities(): string[] {
  return Array.from(missingCities)
}
