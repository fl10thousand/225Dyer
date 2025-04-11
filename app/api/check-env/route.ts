export async function GET() {
  const hasApiKey = !!process.env.GOOGLE_SEARCH_API_KEY
  const hasSearchEngineId = !!process.env.GOOGLE_SEARCH_ENGINE_ID
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://v0-day-trip.vercel.app"

  return new Response(
    JSON.stringify({
      hasApiKey,
      hasSearchEngineId,
      siteUrl,
      // Don't include the actual values for security reasons
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}
