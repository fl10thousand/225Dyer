import type { Metadata } from "next"
import TripFinderForm from "@/components/trip-finder-form"

export const metadata: Metadata = {
  title: "Find a Trip | DayTrips.ai",
  description:
    "Discover the perfect destination for your next trip based on your location, interests, and travel preferences.",
}

export default function FindTripPage() {
  return (
    <main className="container mx-auto px-4 py-6 md:py-12">
      <div className="max-w-3xl mx-auto mb-6 md:mb-8 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Find Your Perfect Destination</h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Tell us where you are and what you love, and we'll recommend the ideal place for your next adventure.
        </p>
      </div>

      <TripFinderForm />
    </main>
  )
}
