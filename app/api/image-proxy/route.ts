import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get("url")
  const query = searchParams.get("query")

  if (!url && !query) {
    return NextResponse.json({ error: "Missing url or query parameter" }, { status: 400 })
  }

  try {
    let imageUrl = url

    // If we have a query instead of a direct URL, use it to fetch from Unsplash
    if (query && !url) {
      // Create a simple Unsplash URL
      imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(query)}`
    }

    // Redirect to the image URL instead of proxying it
    return NextResponse.redirect(imageUrl)
  } catch (error) {
    console.error("Error with image proxy:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}
