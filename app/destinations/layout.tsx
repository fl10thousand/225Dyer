import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Destinations | DayTrips.ai",
  description:
    "Explore popular destinations for day trips around the world. Find AI-generated itineraries for your next adventure.",
  openGraph: {
    title: "Destinations | DayTrips.ai",
    description:
      "Explore popular destinations for day trips around the world. Find AI-generated itineraries for your next adventure.",
    images: [
      {
        url: "/api/og/default",
        width: 1200,
        height: 630,
        alt: "DayTrips.ai - AI-Powered Day Trip Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Destinations | DayTrips.ai",
    description:
      "Explore popular destinations for day trips around the world. Find AI-generated itineraries for your next adventure.",
    images: ["/api/og/default"],
  },
}

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
