"use client"

import Link from "next/link"
import { MapPin, Calendar, Car, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FallbackImage from "@/components/fallback-image"
import type { TripRecommendationType } from "@/lib/destination-finder"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { findImageForActivity, searchGoogleImages, searchForImage } from "@/lib/image-search"

interface TripRecommendationProps {
  recommendation: TripRecommendationType
}

export default function TripRecommendation({ recommendation }: TripRecommendationProps) {
  const [activityImages, setActivityImages] = useState<Record<number, string>>({})
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Fetch main recommendation image using Google API
    const fetchMainImage = async () => {
      if (!recommendation) return

      try {
        // First try to use the existing imageUrl if it's valid
        if (
          recommendation.imageUrl &&
          typeof recommendation.imageUrl === "string" &&
          recommendation.imageUrl.startsWith("http")
        ) {
          setMainImageUrl(recommendation.imageUrl)
          return
        }

        // Otherwise, search for an image
        const query = `${recommendation.destination} travel destination scenic view`
        console.log("Fetching main image for:", query)

        // Try direct Google search first
        const googleImageUrl = await searchGoogleImages(query)
        if (googleImageUrl) {
          console.log("Found Google image:", googleImageUrl)
          setMainImageUrl(googleImageUrl)
          return
        }

        // Fallback to regular image search
        const fallbackImageUrl = await searchForImage(query)
        if (fallbackImageUrl) {
          console.log("Found fallback image:", fallbackImageUrl)
          setMainImageUrl(fallbackImageUrl)
          return
        }

        // If all else fails, use a placeholder
        setMainImageUrl(`/placeholder.svg?height=400&width=800&text=${encodeURIComponent(recommendation.destination)}`)
      } catch (error) {
        console.error(`Failed to fetch main image for ${recommendation.destination}:`, error)
        setMainImageUrl(`/placeholder.svg?height=400&width=800&text=${encodeURIComponent(recommendation.destination)}`)
      }
    }

    // Fetch images for each activity with better error handling
    const fetchActivityImages = async () => {
      if (!recommendation?.activities?.length) return

      const imagePromises = recommendation.activities.map(async (activity, index) => {
        try {
          console.log(`Fetching image for activity: ${activity.name}`)

          // Try to find an image with more specific context
          const imageUrl = await findImageForActivity(
            activity.name,
            recommendation.destination,
            undefined,
            recommendation.destination.split(",")[0], // Use first part as city
            recommendation.destination
              .split(",")[1]
              ?.trim(), // Use second part as state if available
          )

          if (imageUrl && !imageUrl.includes("placeholder")) {
            console.log(`Found image for ${activity.name}:`, imageUrl)
            setActivityImages((prev) => ({
              ...prev,
              [index]: imageUrl,
            }))
          } else {
            // If no image found, try a direct search
            const directImageUrl = await searchForImage(`${activity.name} ${recommendation.destination}`)
            if (directImageUrl) {
              console.log(`Found direct image for ${activity.name}:`, directImageUrl)
              setActivityImages((prev) => ({
                ...prev,
                [index]: directImageUrl,
              }))
            } else {
              // Use placeholder as last resort
              setActivityImages((prev) => ({
                ...prev,
                [index]: `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(activity.name)}`,
              }))
            }
          }
        } catch (error) {
          console.error(`Failed to fetch image for ${activity.name}:`, error)
          // Set placeholder on error
          setActivityImages((prev) => ({
            ...prev,
            [index]: `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(activity.name)}`,
          }))
        }
      })

      await Promise.allSettled(imagePromises)
    }

    if (recommendation) {
      fetchMainImage()
      fetchActivityImages()
    }
  }, [recommendation])

  if (!recommendation) return null

  return (
    <Card className="overflow-hidden">
      <div className="relative h-64 w-full">
        <FallbackImage
          src={
            mainImageUrl ||
            recommendation.imageUrl ||
            `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(recommendation.destination)}`
          }
          alt={recommendation.destination}
          fill
          className="object-cover"
          fallbackSrc={`/placeholder.svg?height=400&width=800&text=${encodeURIComponent(recommendation.destination)}`}
        />
        {pathname !== "/find-trip" && (
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-3xl font-bold text-white">{recommendation.destination}</h2>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="h-4 w-4" />
            <span>
              {recommendation.distance} miles from {recommendation.origin}
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-3 mt-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="details">Trip Details</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="p-4 pt-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {recommendation.tags.map((tag) => (
                <span key={tag} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground">{recommendation.description}</p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{recommendation.driveTime} drive</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Ideal for {recommendation.idealDuration}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="p-4 pt-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Top recommended activities based on your interests:</p>
            <ul className="space-y-4">
              {recommendation.activities.map((activity, index) => (
                <li key={index} className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-primary/10 text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    {activityImages[index] ? (
                      <div className="mt-2 relative h-32 w-full overflow-hidden rounded-md">
                        <FallbackImage
                          src={activityImages[index]}
                          alt={activity.name}
                          fill
                          className="object-cover"
                          fallbackSrc={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(activity.name)}`}
                        />
                      </div>
                    ) : (
                      <div className="mt-2 relative h-32 w-full overflow-hidden rounded-md bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Loading image...</span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="details" className="p-4 pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Best Time to Visit</h3>
              <p className="text-sm text-muted-foreground">{recommendation.bestTimeToVisit}</p>
            </div>

            <div>
              <h3 className="font-medium">Local Tips</h3>
              <p className="text-sm text-muted-foreground">{recommendation.localTips}</p>
            </div>

            <div>
              <h3 className="font-medium">Why We Recommended This</h3>
              <p className="text-sm text-muted-foreground">{recommendation.reasonForRecommendation}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link
              href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(recommendation.origin)}&destination=${encodeURIComponent(recommendation.destination)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </Link>
          </Button>
          <Button asChild>
            <Link
              href={`https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(recommendation.destination)}&startDate=&endDate=&adults=2&affcid=D9t3zuT`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Need a hotel?
            </Link>
          </Button>
        </div>
        <Button asChild>
          <Link href={`/?destination=${encodeURIComponent(recommendation.destination)}`}>
            Plan Full Itinerary <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
