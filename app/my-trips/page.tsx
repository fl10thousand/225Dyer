import { Suspense } from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getUserTrips } from "../../lib/db-service"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import SavedTripsList from "@/components/saved-trips-list"
import ViatorBanner from "@/components/viator-banner"

export default async function MyTripsPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  try {
    const trips = await getUserTrips(session.user.id)

    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/50 py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Trips</h1>
              <p className="text-muted-foreground mt-1">View and manage your saved day trip itineraries</p>
            </div>
            <Button
              asChild
              size="lg"
              className="px-6 rounded-full shadow-md transition-all hover:shadow-lg hover:scale-105"
            >
              <Link href="/">Create New Trip</Link>
            </Button>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex-1">
              <Suspense fallback={<TripsLoading />}>
                <SavedTripsList initialTrips={trips} />
              </Suspense>
            </div>

            {/* Add the banner in a sidebar that only shows on XL screens */}
            <div className="hidden xl:block w-[120px] flex-shrink-0">
              <div className="sticky top-36">
                <ViatorBanner />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading trips:", error)
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/50 py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-6">My Trips</h1>
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <p className="text-destructive">There was an error loading your trips. Please try again later.</p>
          </div>
          <div className="mt-6">
            <Button asChild>
              <Link href="/">Create New Trip</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

function TripsLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
      <p className="text-muted-foreground text-lg">Loading your adventures...</p>
    </div>
  )
}
