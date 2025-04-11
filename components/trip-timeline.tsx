"use client"

import type { TripPlan, TripPreferences } from "../lib/ai-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Coffee,
  MapPin,
  Utensils,
  Bus,
  Clock,
  Camera,
  Ticket,
  Music,
  ShoppingBag,
  Landmark,
  ParkingCircle,
  ExternalLink,
  Map,
  Navigation,
  Calendar,
  Save,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSupabase } from "./supabase-provider"
import { saveTripPlan } from "../lib/db-service"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import EditableTripTimeline from "./editable-trip-timeline"
import FallbackImage from "./fallback-image"
// Import the new image search utility
import { findImageForActivity } from "@/lib/image-search"
// First, add the import for the generateViatorLink function at the top with the other imports
import { generateViatorLink } from "../lib/utils"

interface TripTimelineProps {
  trip: TripPlan
  preferences?: TripPreferences
  showSaveButton?: boolean
  onSave?: () => void
  enableEditing?: boolean
}

export default function TripTimeline({
  trip,
  preferences,
  showSaveButton = false,
  onSave,
  enableEditing,
}: TripTimelineProps) {
  const { user } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [websiteAvailability, setWebsiteAvailability] = useState<Record<string, boolean>>({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [activityImages, setActivityImages] = useState<Record<number, string>>({})
  const [imageLoading, setImageLoading] = useState<boolean>(true)
  const [hasMounted, setHasMounted] = useState(false)

  // Add a normalizeUrl helper function after the component declaration but before useEffect hooks
  const normalizeUrl = (url: string): string => {
    if (!url || typeof url !== "string") return ""
    // Trim whitespace and remove trailing slashes
    return url.trim().replace(/\/+$/, "")
  }

  // Pre-fetch images for activities
  useEffect(() => {
    let mounted = true
    const fetchImages = async () => {
      setImageLoading(true)
      const imagePromises = trip.activities.map(async (activity, index) => {
        try {
          // Use our new image search utility
          const imageUrl = await findImageForActivity(activity.title, trip.location, activity.image_url)
          return { index, url: imageUrl }
        } catch (error) {
          console.error(`Error fetching image for activity ${index}:`, error)
          return {
            index,
            url: `/placeholder.svg?height=160&width=320&text=${encodeURIComponent(activity.title || "Activity")}`,
          }
        }
      })

      // Process all the promises and update state if component is still mounted
      const results = await Promise.all(imagePromises)
      if (mounted) {
        const newImages = results.reduce(
          (acc, { index, url }) => {
            acc[index] = url
            return acc
          },
          {} as Record<number, string>,
        )

        setActivityImages(newImages)
        setImageLoading(false)
      }
    }

    fetchImages()

    return () => {
      mounted = false
    }
  }, [trip.activities, trip.location])

  // Log the preferences when the component mounts
  useEffect(() => {
    console.log("TripTimeline mounted with preferences:", preferences)
  }, [preferences])

  // Update the useEffect that checks website availability
  useEffect(() => {
    // Function to check if a URL is available
    const checkWebsiteAvailability = async (url: string) => {
      try {
        const normalizedUrl = normalizeUrl(url)
        if (!normalizedUrl) return

        const response = await fetch("/api/check-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: normalizedUrl }),
        })

        const data = await response.json()

        setWebsiteAvailability((prev) => ({
          ...prev,
          [normalizedUrl]: data.isAvailable,
        }))
      } catch (error) {
        console.error("Error checking website availability:", error)
        const normalizedUrl = normalizeUrl(url)
        if (normalizedUrl) {
          setWebsiteAvailability((prev) => ({
            ...prev,
            [normalizedUrl]: false,
          }))
        }
      }
    }

    // Check all activity websites
    trip.activities.forEach((activity) => {
      if (activity.website) {
        checkWebsiteAvailability(activity.website)
      }
    })
  }, [trip.activities])

  const handleSaveTrip = async () => {
    if (!user) {
      console.error("No user found when trying to save trip")
      toast({
        title: "Login required",
        description: "Please login to save this trip",
      })
      router.push("/login")
      return
    }

    if (!preferences) {
      console.error("No preferences found when trying to save trip")

      // Create default preferences based on the trip data
      const defaultPreferences = {
        location: trip.location,
        interests: ["history", "food", "nature"],
        budget: "moderate",
        transportationMode: "walking",
        startTime: "09:00",
        endTime: "17:00",
      }

      toast({
        title: "Using default preferences",
        description: "We'll use some default preferences since none were provided.",
      })

      // Continue with default preferences
      setIsSaving(true)
      try {
        await saveTripPlan(user.id, trip, defaultPreferences)
        toast({
          title: "Trip saved successfully!",
          description: "You can view it in your saved trips.",
        })
        if (onSave) onSave()
        router.push("/my-trips")
      } catch (error) {
        console.error("Error saving trip with default preferences:", error)
        toast({
          title: "Error saving trip",
          description: `There was a problem saving your trip: ${error instanceof Error ? error.message : "Unknown error"}`,
          variant: "destructive",
        })
      } finally {
        setIsSaving(false)
      }
      return
    }

    setIsSaving(true)
    try {
      console.log("Saving trip with user:", user.id)
      console.log("Trip data:", trip)
      console.log("Preferences:", preferences)

      // Create a clean copy to avoid any reference issues
      const tripCopy = JSON.parse(JSON.stringify(trip))
      const preferencesCopy = JSON.parse(JSON.stringify(preferences))

      await saveTripPlan(user.id, tripCopy, preferencesCopy)

      toast({
        title: "Trip saved successfully!",
        description: "You can view it in your saved trips.",
      })

      if (onSave) onSave()
      router.push("/my-trips")
    } catch (error) {
      console.error("Error saving trip:", error)
      toast({
        title: "Error saving trip",
        description: `There was a problem saving your trip: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getActivityIcon = (type: string, title = "") => {
    const lowerTitle = title.toLowerCase()

    switch (type) {
      case "meal":
        if (lowerTitle.includes("breakfast")) return <Coffee className="h-5 w-5" />
        if (lowerTitle.includes("dinner")) return <Utensils className="h-5 w-5" />
        return <Utensils className="h-5 w-5" />
      case "travel":
        return <Bus className="h-5 w-5" />
      case "break":
        return <Coffee className="h-5 w-5" />
      default:
        // For 'activity' type, try to infer a more specific icon based on the title
        if (lowerTitle.includes("museum") || lowerTitle.includes("gallery") || lowerTitle.includes("art")) {
          return <Landmark className="h-5 w-5" />
        } else if (lowerTitle.includes("park") || lowerTitle.includes("garden") || lowerTitle.includes("nature")) {
          return <ParkingCircle className="h-5 w-5" />
        } else if (
          lowerTitle.includes("shop") ||
          lowerTitle.includes("market") ||
          lowerTitle.includes("store") ||
          lowerTitle.includes("mall")
        ) {
          return <ShoppingBag className="h-5 w-5" />
        } else if (
          lowerTitle.includes("concert") ||
          lowerTitle.includes("show") ||
          lowerTitle.includes("theater") ||
          lowerTitle.includes("theatre") ||
          lowerTitle.includes("performance")
        ) {
          return <Music className="h-5 w-5" />
        } else if (
          lowerTitle.includes("tour") ||
          lowerTitle.includes("sight") ||
          lowerTitle.includes("view") ||
          lowerTitle.includes("observation")
        ) {
          return <Camera className="h-5 w-5" />
        } else if (
          lowerTitle.includes("ticket") ||
          lowerTitle.includes("admission") ||
          lowerTitle.includes("entrance")
        ) {
          return <Ticket className="h-5 w-5" />
        } else if (
          lowerTitle.includes("historical") ||
          lowerTitle.includes("history") ||
          lowerTitle.includes("monument") ||
          lowerTitle.includes("memorial")
        ) {
          return <Landmark className="h-5 w-5" />
        }

        return <Clock className="h-5 w-5" />
    }
  }

  // Extract opening hours from description if present
  const extractOpeningHours = (description: string) => {
    const openingHoursRegex =
      /open(?:s|ing hours|ed)?\s*(?:from|:)?\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?(?:\s*-\s*|\s*to\s*)\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i
    const match = description.match(openingHoursRegex)
    return match ? match[1] : null
  }

  const handleSwitchToEditMode = () => {
    console.log("Switching to edit mode with preferences:", preferences)
    setIsEditMode(true)
  }

  // Add this right after the handleSwitchToEditMode function and before the isEditMode check
  // Add a custom keyframe animation for the subtle pulse effect
  const pulseAnimation = `
    @keyframes pulse-subtle {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.9;
      }
    }

    .animate-pulse-subtle {
      animation: pulse-subtle 3s infinite ease-in-out;
    }
  `

  // Inject the animation into the document
  useEffect(() => {
    // Create style element
    const style = document.createElement("style")
    style.innerHTML = pulseAnimation
    // Append to head
    document.head.appendChild(style)

    // Cleanup
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  if (isEditMode) {
    return (
      <EditableTripTimeline
        trip={trip}
        preferences={preferences}
        onSave={() => {
          if (onSave) onSave()
        }}
      />
    )
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          {trip.location}
        </CardTitle>
        <div className="flex justify-between items-center">
          <CardDescription className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {trip.date}
          </CardDescription>
          {enableEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwitchToEditMode}
              className="flex items-center gap-1 ml-auto"
            >
              <Edit className="h-4 w-4" />
              Customize
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-muted">
          {trip.activities.map((activity, index) => {
            const openingHours = extractOpeningHours(activity.description)
            const imageUrl =
              activityImages[index] ||
              `/placeholder.svg?height=160&width=320&text=${encodeURIComponent(activity.title || "Activity")}`

            return (
              <li key={index} className="mb-10 ml-6 last:mb-0 group">
                <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-110">
                  {getActivityIcon(activity.type, activity.title)}
                </span>
                <div className="flex flex-col space-y-2 transition-all duration-300 group-hover:translate-x-1">
                  <div className="flex items-center gap-2">
                    <time className="text-sm font-semibold text-primary">{activity.time}</time>
                    <span className="text-xs rounded-full bg-muted px-2 py-0.5">{activity.duration}</span>
                    <Badge variant="outline" className="ml-auto">
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </Badge>
                  </div>

                  {/* Image section with consistent 16:9 aspect ratio */}
                  <div className="relative w-full overflow-hidden rounded-lg shadow-sm aspect-video mb-3">
                    {imageLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <FallbackImage
                        src={imageUrl}
                        alt={activity.title}
                        fallbackSrc={`/placeholder.svg?height=160&width=320&text=${encodeURIComponent(activity.title || "Activity")}`}
                        className="object-cover w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-105"
                        width={800}
                        height={450}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, 800px"
                        loadDynamically={!imageUrl.includes("placeholder")}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 rounded-lg"></div>
                  </div>

                  <h3 className="text-lg font-bold">{activity.title}</h3>
                  <p className="text-muted-foreground">{activity.description}</p>

                  {openingHours && (
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                      <span className="font-medium">Hours: {openingHours}</span>
                    </div>
                  )}

                  {activity.location && (
                    <div className="flex items-start gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                      <span className="break-words">{activity.location}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-1">
                    {typeof activity.website === "string" &&
                    activity.website.trim() !== "" &&
                    activity.website.startsWith("http") ? (
                      (() => {
                        const normalizedUrl = normalizeUrl(activity.website)
                        return websiteAvailability[normalizedUrl] === undefined ? (
                          // Loading state
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="h-8 transition-all duration-200 hover:bg-primary/10"
                          >
                            <span className="flex items-center gap-1">
                              <ExternalLink className="h-3.5 w-3.5" />
                              Checking website...
                            </span>
                          </Button>
                        ) : websiteAvailability[normalizedUrl] ? (
                          // Website is available
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 transition-all duration-200 hover:bg-primary/10"
                          >
                            <a
                              href={activity.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Official Website
                            </a>
                          </Button>
                        ) : (
                          // Website is unavailable
                          <Button variant="outline" size="sm" disabled className="h-8 opacity-70">
                            <span className="flex items-center gap-1">
                              <ExternalLink className="h-3.5 w-3.5" />
                              Website Unavailable
                            </span>
                          </Button>
                        )
                      })()
                    ) : (
                      // Invalid website URL
                      <Button variant="outline" size="sm" disabled className="h-8 opacity-70">
                        <span className="flex items-center gap-1">
                          <ExternalLink className="h-3.5 w-3.5" />
                          Website Unavailable
                        </span>
                      </Button>
                    )}
                    {activity.map_link && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-8 transition-all duration-200 hover:bg-primary/10"
                      >
                        <a
                          href={activity.map_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <Map className="h-3.5 w-3.5" />
                          Directions
                        </a>
                      </Button>
                    )}
                    {activity.location && !activity.map_link && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-8 transition-all duration-200 hover:bg-primary/10"
                      >
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.title + ", " + activity.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <Navigation className="h-3.5 w-3.5" />
                          Find on Map
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="default"
                      size="sm"
                      asChild
                      className="h-8 transition-all duration-200 hover:scale-105 hover:shadow-md relative bg-gradient-to-r from-primary to-primary/90 font-medium shadow-sm"
                    >
                      <a
                        href={generateViatorLink(
                          { title: activity.title, type: activity.type },
                          trip.location,
                          preferences?.interests,
                        )}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center gap-1"
                      >
                        <Ticket className="h-3.5 w-3.5 mr-1" />
                        Top Things to Do Here
                      </a>
                    </Button>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </CardContent>
      {showSaveButton && user && (
        <CardFooter className="pt-2 pb-4 px-6">
          <Button
            onClick={handleSaveTrip}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="animate-spin">⏳</span>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Itinerary
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
