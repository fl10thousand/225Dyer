import { ImageResponse } from "@vercel/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

function slugToTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const destinationName = slugToTitleCase(params.slug)

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#1a365d",
        color: "white",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "60px", margin: "0 0 20px" }}>{destinationName} Day Trips</h1>
      <p style={{ fontSize: "30px", color: "#90cdf4" }}>AI-Powered Itineraries by DayTrips.ai</p>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
