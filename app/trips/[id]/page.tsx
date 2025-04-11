import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"
import { getTripById } from "../../../lib/db-service"
import TripTimeline from "@/components/trip-timeline"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Calendar } from "lucide-react"

interface TripDetailPageProps {
  params: {
    id: string
  }
}

export default async function TripDetailPage({ params }: TripDetailPageProps) {
  const { id } = params

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Pass both tripId and userId to ensure ownership
  const trip = await getTripById(id, session.user.id)

  if (!trip) {
    notFound()
  }

  // Helper function to format dates consistently
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Unknown date"
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/50 py-12 md:py-16">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <Button variant="ghost" asChild className="mb-8 group">
          <Link href="/my-trips" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to My Trips
          </Link>
        </Button>

        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-3">{trip.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            <span>
              {/* Display the creation date from the database */}
              Created on {formatDate(trip.created_at)}
            </span>
          </div>
          <p className="text-muted-foreground max-w-3xl">{trip.trip_data.summary}</p>
        </div>

        <div className="space-y-10">
          <TripTimeline trip={trip.trip_data} enableEditing={true} />

          <div className="rounded-lg border bg-card p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Trip Preferences</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dt className="text-sm font-medium text-muted-foreground mb-1">Location</dt>
                <dd className="text-foreground">{trip.preferences.location}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground mb-1">Budget</dt>
                <dd className="capitalize text-foreground">{trip.preferences.budget}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground mb-1">Transportation</dt>
                <dd className="capitalize text-foreground">{trip.preferences.transportationMode}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground mb-1">Time Frame</dt>
                <dd className="text-foreground">
                  {trip.preferences.startTime} - {trip.preferences.endTime}
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-muted-foreground mb-2">Interests</dt>
                <dd className="flex flex-wrap gap-2">
                  {trip.preferences.interests.map((interest: string) => (
                    <span key={interest} className="inline-block bg-muted rounded-full px-3 py-1 text-xs">
                      {interest}
                    </span>
                  ))}
                </dd>
              </div>
              {trip.preferences.mealPreferences && (
                <div className="md:col-span-2">
                  <dt className="text-sm font-medium text-muted-foreground mb-1">Meal Preferences</dt>
                  <dd className="text-foreground">{trip.preferences.mealPreferences}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
