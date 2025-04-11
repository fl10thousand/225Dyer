// Simple in-memory cache for image search results
type CacheEntry = {
  imageUrl: string
  timestamp: number
}

// Cache that persists for the lifetime of the server
const imageCache: Record<string, CacheEntry> = {}

// Cache expiration time (24 hours in milliseconds)
const CACHE_EXPIRY = 24 * 60 * 60 * 1000

// Quota management
let quotaExceeded = false
let quotaResetTime = 0

// Quota reset period (24 hours in milliseconds)
const QUOTA_RESET_PERIOD = 24 * 60 * 60 * 1000

export function isQuotaExceeded(): boolean {
  // If quota was exceeded but reset time has passed, reset the flag
  if (quotaExceeded && Date.now() > quotaResetTime) {
    quotaExceeded = false
    console.log("Google API quota reset")
  }
  return quotaExceeded
}

export function markQuotaExceeded(): void {
  quotaExceeded = true
  quotaResetTime = Date.now() + QUOTA_RESET_PERIOD
  console.log(`Google API quota exceeded. Will reset at ${new Date(quotaResetTime).toLocaleString()}`)
}

export function getCachedImage(query: string): string | null {
  const entry = imageCache[query]

  // Return null if no cache entry exists or if it's expired
  if (!entry || Date.now() - entry.timestamp > CACHE_EXPIRY) {
    return null
  }

  return entry.imageUrl
}

export function cacheImage(query: string, imageUrl: string): void {
  imageCache[query] = {
    imageUrl,
    timestamp: Date.now(),
  }
}

// Fallback images for common categories
const fallbackImages: Record<string, string[]> = {
  museum: [
    "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?q=80&w=1000",
    "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?q=80&w=1000",
  ],
  park: [
    "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=1000",
    "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=1000",
  ],
  restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000",
  ],
  landmark: [
    "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1000",
    "https://images.unsplash.com/photo-1638100644693-3cc0614e4621?q=80&w=1000",
  ],
  attraction: [
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1000",
  ],
  city: [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000",
  ],
  default: [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=1000",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000",
  ],
}

export function getFallbackImage(query: string): string {
  // Convert query to lowercase for matching
  const lowerQuery = query.toLowerCase()

  // Check if query contains any of our category keywords
  for (const [category, images] of Object.entries(fallbackImages)) {
    if (lowerQuery.includes(category)) {
      // Return a random image from the category
      return images[Math.floor(Math.random() * images.length)]
    }
  }

  // If no category matches, return a random default image
  const defaultImages = fallbackImages.default
  return defaultImages[Math.floor(Math.random() * defaultImages.length)]
}
