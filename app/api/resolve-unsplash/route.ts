import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 })
  }

  try {
    // Create a random seed to avoid caching issues
    const randomSeed = Math.floor(Math.random() * 10000)
    const unsplashUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(query)}&sig=${randomSeed}`

    // Fetch the Unsplash URL to get the redirected URL
    const response = await fetch(unsplashUrl, { redirect: "follow" })

    // Return the final URL after redirects
    return NextResponse.json({
      originalUrl: unsplashUrl,
      resolvedUrl: response.url,
      status: response.status,
    })
  } catch (error) {
    console.error("Error resolving Unsplash URL:", error)
    return NextResponse.json({ error: "Failed to resolve Unsplash URL" }, { status: 500 })
  }
}
