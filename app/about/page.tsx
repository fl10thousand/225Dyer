import { Button } from "@/components/ui/button"
import Link from "next/link"
import ViatorBanner from "@/components/viator-banner"

export const metadata = {
  title: "About DayTrips.ai | AI-Powered Travel Planning",
  description:
    "Learn how DayTrips.ai uses AI to revolutionize day trip planning and create personalized travel experiences.",
  keywords: ["about DayTrips.ai", "AI travel planning", "personalized itineraries", "travel technology"],
  openGraph: {
    title: "About DayTrips.ai | AI-Powered Travel Planning",
    description:
      "Learn how DayTrips.ai uses AI to revolutionize day trip planning and create personalized travel experiences.",
    url: "https://daytrips.ai/about",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <ViatorBanner className="fixed right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:block" />
      <div className="mx-auto max-w-3xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About DayTrips.ai</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Discover how we're using AI to revolutionize day trip planning.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-muted-foreground">
              At DayTrips.ai, we believe that exploring new places should be easy, enjoyable, and personalized. Our
              mission is to help travelers and locals alike discover the perfect day trip itinerary tailored to their
              unique preferences, without the hassle of extensive research and planning.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground">
              DayTrips.ai leverages advanced artificial intelligence to generate detailed, personalized day trip
              itineraries based on your location, interests, budget, and other preferences. Our AI considers factors
              like travel time between locations, opening hours, and logical sequencing to create realistic and
              enjoyable trips.
            </p>
            <p className="text-muted-foreground">
              Simply input your preferences, and within seconds, you'll receive a comprehensive itinerary with
              activities, meal suggestions, and a timeline for your perfect day out.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Our Technology</h2>
            <p className="text-muted-foreground">
              We use state-of-the-art large language models to understand your preferences and generate itineraries that
              feel like they were crafted by a local expert. Our platform is built with modern web technologies
              including Next.js, Supabase, and the OpenAI API to deliver a fast, responsive, and secure experience.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Future Plans</h2>
            <p className="text-muted-foreground">
              We're constantly working to improve DayTrips.ai with new features and capabilities. Our roadmap includes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Interactive maps integration</li>
              <li>Weather-aware trip planning</li>
              <li>Social sharing features</li>
              <li>Mobile app development</li>
              <li>Premium subscription options with advanced features</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Button asChild size="lg">
            <Link href="/">Try DayTrips.ai Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
