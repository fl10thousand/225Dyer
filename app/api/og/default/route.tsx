import { ImageResponse } from "@vercel/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
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
      <h1 style={{ fontSize: "60px", margin: "0 0 20px" }}>AI-Powered Day Trip Generator</h1>
      <p style={{ fontSize: "30px", color: "#90cdf4" }}>Discover Perfect Day Trips Anywhere in the World</p>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
