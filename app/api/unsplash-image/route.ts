import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {
  try {
    // Get the search query from the URL
    const url = new URL(request.url)
    const query = url.searchParams.get("query")

    if (!query) {
      console.error("No search query provided")
      // Return a placeholder image instead of an error
      return NextResponse.redirect(new URL(`/placeholder.svg?height=160&width=320&text=No+Image+Query`, request.url))
    }

    // Construct the Unsplash Source API URL with specific dimensions
    // This helps avoid some of the issues with the Unsplash API
    const unsplashUrl = `https://source.unsplash.com/featured/800x600?${encodeURIComponent(query)}`

    console.log("Redirecting to Unsplash image for query:", query)
    console.log("Unsplash URL:", unsplashUrl)

    try {
      // Fetch the image from Unsplash to get the actual URL after redirect
      const response = await fetch(unsplashUrl, {
        method: "HEAD",
        redirect: "manual",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      })

      // Get the location header which contains the actual image URL
      const location = response.headers.get("location")

      if (location) {
        console.log("Redirecting to resolved URL:", location)
        return NextResponse.redirect(location)
      } else {
        // If no redirect, use the original URL
        return NextResponse.redirect(unsplashUrl)
      }
    } catch (error) {
      console.error("Error fetching from Unsplash:", error)
      return NextResponse.redirect(
        new URL(`/placeholder.svg?height=160&width=320&text=${encodeURIComponent(query)}`, request.url),
      )
    }
  } catch (error) {
    console.error("Error in Unsplash image API:", error)
    return NextResponse.redirect(new URL(`/placeholder.svg?height=160&width=320&text=Error`, request.url))
  }
}
