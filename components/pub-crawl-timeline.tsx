"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import type { PubCrawlPlan, PubStop } from "@/lib/pub-crawl-types"
import { Beer, Clock, MapPin, Share, Map, Printer, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PubCrawlTimelineProps {
  plan: PubCrawlPlan
}

export default function PubCrawlTimeline({ plan }: PubCrawlTimelineProps) {
  const [copied, setCopied] = useState(false)
  const [mapView, setMapView] = useState<"directions">("directions")
  const [mapUrl, setMapUrl] = useState<string>("")
  const [isLoadingMap, setIsLoadingMap] = useState(true)

  // Fetch the map URL from the server
  useEffect(() => {
    async function fetchMapUrl() {
      setIsLoadingMap(true)
      try {
        const response = await fetch("/api/generate-map-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stops: plan.stops,
            mapType: mapView,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch map URL")
        }

        const data = await response.json()
        setMapUrl(data.mapUrl)
      } catch (error) {
        console.error("Error fetching map URL:", error)
        // Fallback to a static map or error message
        setMapUrl(`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(plan.location)}&zoom=12`)
      } finally {
        setIsLoadingMap(false)
      }
    }

    if (plan.stops && plan.stops.length > 0) {
      fetchMapUrl()
    }
  }, [plan.stops, mapView, plan.location])

  // Update map when view changes
  useEffect(() => {
    if (plan.stops && plan.stops.length > 0) {
      setIsLoadingMap(true)
      fetch("/api/generate-map-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stops: plan.stops,
          mapType: mapView,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMapUrl(data.mapUrl)
          setIsLoadingMap(false)
        })
        .catch((error) => {
          console.error("Error updating map:", error)
          setIsLoadingMap(false)
        })
    }
  }, [mapView, plan.stops])

  const handleShare = async () => {
    try {
      const shareText = `Check out my pub crawl in ${plan.location}: ${plan.stops.map((stop) => stop.name).join(" → ")}`

      if (navigator.share) {
        await navigator.share({
          title: `Pub Crawl in ${plan.location}`,
          text: shareText,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  // Generate a printable map URL (this doesn't expose API key)
  function generatePrintableMapUrl(stops: PubStop[]): string {
    // Base URL for Google Maps
    const baseUrl = "https://www.google.com/maps/dir/"

    // Create a string of all addresses
    const addresses = stops.map((stop) => encodeURIComponent(stop.address)).join("/")

    // Build the URL
    return `${baseUrl}${addresses}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{plan.title}</CardTitle>
              <p className="text-gray-500 mt-1">{plan.summary}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Share"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Map section */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center">
              <Map className="h-5 w-5 mr-2 text-blue-500" />
              Pub Crawl Map
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="default" size="sm" className="print:hidden">
                <Map className="h-4 w-4 mr-2" />
                Show Route
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(generatePrintableMapUrl(plan.stops), "_blank")}
                className="print:hidden"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Map
              </Button>
            </div>
          </div>
        </CardHeader>
        <div className="aspect-video w-full p-4 pb-6">
          <div className="w-full h-full rounded-lg overflow-hidden border relative">
            {isLoadingMap && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            )}
            {mapUrl && (
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
                title="Pub Crawl Map"
                className={isLoadingMap ? "opacity-30" : "opacity-100"}
              ></iframe>
            )}
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        {plan.stops.map((stop, index) => (
          <PubStopCard
            key={index}
            stop={stop}
            index={index}
            totalStops={plan.stops.length}
            timePerStop={plan.duration / plan.stops.length}
          />
        ))}
      </div>
    </div>
  )
}

interface PubStopCardProps {
  stop: PubStop
  index: number
  totalStops: number
  timePerStop: number
}

function PubStopCard({ stop, index, totalStops, timePerStop }: PubStopCardProps) {
  const timeString = `${Math.floor(timePerStop * 60)} minutes`
  const [imageError, setImageError] = useState(false)
  const [websiteValid, setWebsiteValid] = useState<boolean | null>(null)

  useEffect(() => {
    const checkWebsite = async () => {
      if (stop.website) {
        try {
          const response = await fetch("/api/check-website", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: stop.website }),
          })
          const data = await response.json()
          setWebsiteValid(data.isAvailable)
        } catch (error) {
          console.error("Error checking website:", error)
          setWebsiteValid(false)
        }
      } else {
        setWebsiteValid(false)
      }
    }

    checkWebsite()
  }, [stop.website])

  // Ensure imageUrl is never an empty string
  const imageUrl = stop.imageUrl && stop.imageUrl.trim() !== "" ? stop.imageUrl : null

  // Determine if the image is a favicon/logo (smaller image)
  const isLogoImage =
    imageUrl &&
    (imageUrl.includes("google.com/s2/favicons") ||
      imageUrl.includes("apple-touch-icon") ||
      imageUrl.includes("favicon"))

  // Generate a placeholder URL with the pub name
  const placeholderUrl = "/public/images/logo-transparent-png.png"

  // Handle image load error
  const handleImageError = () => {
    console.log(`Image failed to load for ${stop.name}: ${imageUrl}`)
    setImageError(true)
  }

  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 h-48 md:h-auto relative">
          {isLogoImage || imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              {!imageError ? (
                <img
                  src={imageUrl || placeholderUrl}
                  alt={stop.name}
                  className="max-w-[128px] max-h-[128px] object-contain"
                  onError={handleImageError}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <Beer className="w-12 h-12 mb-2 text-gray-400" />
                  <span className="text-sm text-gray-500">{stop.name}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full">
              <img
                src={imageUrl || placeholderUrl}
                alt={stop.name}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
          )}
          <div className="absolute top-2 left-2 bg-white/90 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">
            {index + 1}
          </div>
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <h3 className="text-xl font-bold">{stop.name}</h3>
            {stop.website && websiteValid === true && (
              <a
                href={stop.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-1 sm:mt-0"
              >
                <Globe className="h-4 w-4 mr-1" />
                Website
              </a>
            )}
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
              <span>{stop.address}</span>
            </div>

            <div className="flex items-start">
              <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
              <span>Suggested time: {timeString}</span>
            </div>

            <div className="flex items-start">
              <Beer className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
              <div>
                <span className="font-medium">Recommended beer:</span> {stop.recommendedBeer}
                <p className="text-gray-600 mt-1">{stop.beerDescription}</p>
              </div>
            </div>

            {stop.mapLink && (
              <div>
                <a
                  href={stop.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  View on map
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
