export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")

  if (!query || query.trim() === "") {
    return new Response(JSON.stringify({ error: "Missing or invalid query" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  // Use the confirmed credentials
  const API_KEY = "AIzaSyA4c_zqzT05u-Qs4wf1bi4mOFLfcmcNdYQ"
  const CX_ID = "c378f84d7f8434df1"

  // Hardcode the referer URL
  const SITE_URL = "https://v0-day-trip.vercel.app"

  try {
    // Log the request for debugging
    console.log(`Making image search request for: "${query}" with CX: ${CX_ID}`)
    console.log(`Using referer: ${SITE_URL}`)

    // Construct the Google Custom Search API URL
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX_ID}&q=${encodeURIComponent(
      query,
    )}&searchType=image&num=1&safe=active&fields=items(link,title,image/thumbnailLink)`

    // Make the request with referer header
    const res = await fetch(url, {
      headers: {
        Referer: SITE_URL,
        Origin: SITE_URL,
        "User-Agent": "DayTrips.ai/1.0",
      },
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("Google API error:", data)
      return new Response(
        JSON.stringify({
          error: data.error?.message || "API error",
          details: data,
        }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Extract the image URL
    const imageUrl = data.items?.[0]?.link
    const thumbnailUrl = data.items?.[0]?.image?.thumbnailLink
    const title = data.items?.[0]?.title

    if (imageUrl) {
      console.log(`Found image for "${query}": ${imageUrl}`)
      return new Response(
        JSON.stringify({
          imageUrl,
          thumbnailUrl,
          title,
          query,
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      )
    } else {
      console.log(`No image found for "${query}"`)
      return new Response(
        JSON.stringify({
          error: "No image found for query",
          query,
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (err) {
    console.error("Unexpected error:", err)
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
