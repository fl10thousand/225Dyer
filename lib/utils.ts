import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { viatorDestinations, viatorAliases } from "./viator-data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugToTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/**
 * Generates a Viator affiliate link based on activity, location, and interests
 * @param activity - The activity object containing title and optional type
 * @param location - The location string (e.g., "Chicago, IL")
 * @param interests - Optional array of user interests
 * @returns A Viator affiliate link
 */
export function generateViatorLink(
  activity: { title: string; type?: string },
  location: string,
  interests?: string[],
): string {
  const baseUrl = "https://www.viator.com"
  const pid = "P00244457"
  const mcid = "56757"
  const affiliateParams = `pid=${pid}&mcid=${mcid}&medium=affiliate`

  try {
    // Extract city from location (first part before any comma)
    const cityRaw = location?.split(",")[0]?.trim() || ""

    // Function to find a destination match (case-insensitive)
    const findDestination = (cityName: string) => {
      // Direct match (case-insensitive)
      const exactMatch = Object.keys(viatorDestinations).find((key) => key.toLowerCase() === cityName.toLowerCase())

      if (exactMatch) {
        return viatorDestinations[exactMatch]
      }

      // Check for alias match
      const aliasMatch = Object.keys(viatorAliases).find((key) => key.toLowerCase() === cityName.toLowerCase())

      if (aliasMatch) {
        const majorCity = viatorAliases[aliasMatch]
        return viatorDestinations[majorCity]
      }

      return null
    }

    // Try to find a destination match
    const destinationInfo = findDestination(cityRaw)

    // If we have a destination match, use the destination-specific URL
    if (destinationInfo) {
      return `${baseUrl}/${encodeURIComponent(destinationInfo.slug)}/d${destinationInfo.id}-ttd?${affiliateParams}`
    }

    // Otherwise, fall back to search-based URL
    const searchTerms: string[] = []

    // Add city to search terms if available
    if (cityRaw) {
      searchTerms.push(cityRaw)
    }

    // Add activity title to search terms if available
    if (activity?.title) {
      searchTerms.push(activity.title)
    }

    // Add one interest to search terms if available
    if (interests?.length) {
      searchTerms.push(interests[0])
    }

    // Join search terms and encode for URL
    const query = encodeURIComponent(searchTerms.filter(Boolean).join(" ") || "tours")

    // Return search-based URL
    return `${baseUrl}/search/results?q=${query}&${affiliateParams}`
  } catch (error) {
    console.error("Error generating Viator link:", error)
    return `${baseUrl}/search/results?q=tours&${affiliateParams}`
  }
}
