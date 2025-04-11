"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import type { PubCrawlPlan, PubStop } from "@/lib/pub-crawl-types"
import { Beer, Clock, ExternalLink, MapPin, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import FallbackImage from "@/components/fallback-image"

interface PubCrawlTimelineProps {
  plan: PubCrawlPlan
}

export default function PubCrawlTimeline({ plan }: PubCrawlTimelineProps) {
  const [copied, setCopied] = useState(false)

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

// Function to generate a likely website URL from a pub name
function generateWebsiteUrl(pubName: string): string {
  // Remove "The" from the beginning if present
  let name = pubName.replace(/^The\s+/i, "")

  // Convert to lowercase and replace spaces and special chars with nothing
  name = name.toLowerCase().replace(/[^a-z0-9]/g, "")

  // Add www. prefix and .com suffix
  return `https://www.${name}.com`
}

interface PubStopCardProps {
  stop: PubStop
  index: number
  totalStops: number
  timePerStop: number
}

function PubStopCard({ stop, index, totalStops, timePerStop }: PubStopCardProps) {
  const timeString = `${Math.floor(timePerStop * 60)} minutes`

  // Ensure imageUrl is never an empty string
  const imageUrl = stop.imageUrl && stop.imageUrl.trim() !== "" ? stop.imageUrl : null

  // Generate a likely website URL if one isn't provided
  const websiteUrl = stop.website || generateWebsiteUrl(stop.name)

  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <FallbackImage
            src={imageUrl}
            alt={stop.name}
            fallbackSrc="/placeholder.svg?height=300&width=400"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-white/90 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">
            {index + 1}
          </div>
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <h3 className="text-xl font-bold">{stop.name}</h3>
            <div className="mt-1 sm:mt-0">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                title={stop.website ? "Official website" : "Best guess website - may not be accurate"}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                {stop.website ? "Visit website" : "Visit likely website"}
              </a>
            </div>
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
                {stop.beerDescription && <p className="text-gray-600 mt-1">{stop.beerDescription}</p>}
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
