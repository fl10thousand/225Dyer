/**
 * Generates the Open Graph image URL for a destination
 */
export function getDestinationOgImageUrl(slug?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://daytrips.ai"

  if (!slug) {
    return `${baseUrl}/api/og/default`
  }

  return `${baseUrl}/api/og/destination/${encodeURIComponent(slug)}`
}

/**
 * Gets the default Open Graph image URL
 */
export function getDefaultOgImageUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://daytrips.ai"
  return `${baseUrl}/api/og/default`
}
