"use client"

import { useState } from "react"
import Link from "next/link"
import { type SavedTrip, deleteTripById } from "../lib/db-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, MoreVertical, Calendar, Trash2, ArrowRight } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface SavedTripsListProps {
  initialTrips: SavedTrip[]
}

export default function SavedTripsList({ initialTrips }: SavedTripsListProps) {
  const [trips, setTrips] = useState<SavedTrip[]>(initialTrips)
  const [tripToDelete, setTripToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const handleDeleteTrip = async () => {
    if (!tripToDelete) return

    setIsDeleting(true)
    try {
      await deleteTripById(tripToDelete)
      setTrips(trips.filter((trip) => trip.id !== tripToDelete))
      toast({
        title: "Trip deleted",
        description: "Your trip has been successfully deleted.",
      })
    } catch (error) {
      console.error("Error deleting trip:", error)
      toast({
        title: "Error deleting trip",
        description: "There was a problem deleting your trip. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setTripToDelete(null)
    }
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

  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-primary/10 p-6 mb-6 transition-all duration-300 hover:scale-105 hover:bg-primary/15">
          <MapPin className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-3">No trips saved yet</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Generate your first day trip itinerary and save it to see it here.
        </p>
        <Button
          asChild
          size="lg"
          className="px-8 py-6 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
        >
          <Link href="/">Create Your First Trip</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {trips.map((trip) => (
          <Card
            key={trip.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] flex flex-col h-full"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundImage: `url(https://source.unsplash.com/featured/?${encodeURIComponent(trip.location)})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <CardTitle className="text-xl text-foreground drop-shadow-sm">{trip.title}</CardTitle>
                <div className="flex flex-col mt-2 space-y-1.5">
                  <CardDescription className="flex items-center gap-1.5 text-foreground/80">
                    <MapPin className="h-3.5 w-3.5" />
                    {trip.location}
                  </CardDescription>
                  <CardDescription className="flex items-center gap-1.5 text-foreground/80">
                    <Calendar className="h-3.5 w-3.5" />
                    {/* Display the creation date from the database */}
                    {formatDate(trip.created_at)}
                  </CardDescription>
                </div>
              </div>
            </div>
            <CardContent className="p-5 flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">{trip.trip_data.summary}</p>
            </CardContent>
            <CardFooter className="p-5 pt-0 flex justify-between items-center gap-3">
              <Button asChild className="flex-1 group">
                <Link href={`/trips/${trip.id}`} className="flex items-center justify-center">
                  View Trip
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="flex-shrink-0 h-9 w-9">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={() => setTripToDelete(trip.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!tripToDelete} onOpenChange={(open) => !open && setTripToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your trip.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTrip}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
