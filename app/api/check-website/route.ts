import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ isAvailable: false, error: "No URL provided" }, { status: 400 })
    }

    try {
      // Use fetch with a timeout to check if the URL is available
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      const response = await fetch(url, {
        method: "HEAD", // HEAD request is lighter than GET
        redirect: "follow",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Consider 2xx status codes as available
      const isAvailable = response.ok

      return NextResponse.json({
        isAvailable,
        status: response.status,
        statusText: response.statusText,
      })
    } catch (error: any) {
      // Network errors, timeouts, CORS issues, etc.
      return NextResponse.json({
        isAvailable: false,
        error: error.message || "Failed to fetch URL",
      })
    }
  } catch (error) {
    return NextResponse.json({ isAvailable: false, error: "Invalid request" }, { status: 400 })
  }
}
