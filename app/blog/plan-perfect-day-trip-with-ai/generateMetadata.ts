import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Plan the Perfect Day Trip Instantly with DayTrips.ai | AI-Powered Travel Assistant",
    description:
      "Discover how DayTrips.ai helps you plan personalized day trips in any city worldwide with AI-generated itineraries based on your interests, budget, and schedule.",
    keywords: [
      "day trip planner",
      "AI travel assistant",
      "things to do near me",
      "travel planning tool",
      "personalized itinerary",
      "day trip ideas",
    ],
    openGraph: {
      title: "Plan the Perfect Day Trip Instantly with DayTrips.ai | AI-Powered Travel Assistant",
      description:
        "Discover how DayTrips.ai helps you plan personalized day trips in any city worldwide with AI-generated itineraries based on your interests, budget, and schedule.",
      type: "article",
      url: "https://daytrips.ai/blog/plan-perfect-day-trip-with-ai",
      images: [
        {
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mantas-hesthaven-_g1WdcKcV3w-unsplash-2.jpg-z2m0bl5IqnRkSO9HSz1N6qwYTPt9bB.jpeg",
          width: 1200,
          height: 630,
          alt: "Person with suitcase looking at sunset through an archway",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Plan the Perfect Day Trip Instantly with DayTrips.ai | AI-Powered Travel Assistant",
      description:
        "Discover how DayTrips.ai helps you plan personalized day trips in any city worldwide with AI-generated itineraries based on your interests, budget, and schedule.",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mantas-hesthaven-_g1WdcKcV3w-unsplash-2.jpg-z2m0bl5IqnRkSO9HSz1N6qwYTPt9bB.jpeg",
      ],
    },
  }
}
