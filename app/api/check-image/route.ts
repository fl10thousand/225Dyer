import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    // Try to fetch the image with a HEAD request to check if it exists
    const response = await fetch(url, { method: "HEAD" })

    // Check if the response is ok and the content type is an image
    const isValid = response.ok && response.headers.get("content-type")?.startsWith("image/")

    return NextResponse.json({ isValid })
  } catch (error) {
    console.error("Error checking image URL:", error)
    return NextResponse.json({ isValid: false })
  }
}
