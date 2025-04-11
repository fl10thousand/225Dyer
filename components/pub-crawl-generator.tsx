"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { generatePubCrawl } from "@/lib/pub-crawl-service"
import type { PubCrawlPreferences, PubCrawlPlan } from "@/lib/pub-crawl-types"
import PubCrawlTimeline from "@/components/pub-crawl-timeline"
import { Loader2 } from "lucide-react"

export default function PubCrawlGenerator() {
  const [location, setLocation] = useState("")
  const [beerTypes, setBeerTypes] = useState<string[]>(["any"])
  const [pubCount, setPubCount] = useState(4)
  const [duration, setDuration] = useState(4)
  const [loading, setLoading] = useState(false)
  const [pubCrawlPlan, setPubCrawlPlan] = useState<PubCrawlPlan | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!location) {
      setError("Please enter a location")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const preferences: PubCrawlPreferences = {
        location,
        beerType: beerTypes,
        pubCount,
        duration,
      }

      const plan = await generatePubCrawl(preferences)
      setPubCrawlPlan(plan)
    } catch (err) {
      console.error("Error generating pub crawl:", err)
      setError("Failed to generate pub crawl. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card className="p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="location" className="text-base font-medium">
                Where do you want to go?
              </Label>
              <Input
                id="location"
                placeholder="Enter city or town (e.g., Dublin, Portland, Munich)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">
                What are your favorite types of beer? (Select all that apply)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {[
                  { id: "any", label: "Any / No Preference" },
                  { id: "ipa", label: "IPA" },
                  { id: "stout", label: "Stout" },
                  { id: "lager", label: "Lager" },
                  { id: "pilsner", label: "Pilsner" },
                  { id: "ale", label: "Ale" },
                  { id: "wheat", label: "Wheat Beer" },
                  { id: "sour", label: "Sour Beer" },
                  { id: "porter", label: "Porter" },
                  { id: "craft", label: "Craft Beer" },
                ].map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`beer-${option.id}`}
                      checked={beerTypes.includes(option.id)}
                      onChange={(e) => {
                        if (option.id === "any") {
                          // If "any" is selected, clear other selections
                          setBeerTypes(e.target.checked ? ["any"] : [])
                        } else {
                          // If another option is selected, remove "any" from the selection
                          setBeerTypes((prev) => {
                            const newTypes = e.target.checked
                              ? [...prev.filter((t) => t !== "any"), option.id]
                              : prev.filter((t) => t !== option.id)

                            // If no options are selected, default to "any"
                            return newTypes.length === 0 ? ["any"] : newTypes
                          })
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor={`beer-${option.id}`} className="text-sm font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="pub-count" className="text-base font-medium">
                Number of pubs to visit: {pubCount}
              </Label>
              <div className="mt-2">
                <Slider
                  id="pub-count"
                  min={2}
                  max={10}
                  step={1}
                  value={[pubCount]}
                  onValueChange={(value) => setPubCount(value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2</span>
                  <span>6</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="duration" className="text-base font-medium">
                Duration of crawl: {duration} hours
              </Label>
              <div className="mt-2">
                <Slider
                  id="duration"
                  min={2}
                  max={8}
                  step={0.5}
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2h</span>
                  <span>5h</span>
                  <span>8h</span>
                </div>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Pub Crawl...
                </>
              ) : (
                "Generate Pub Crawl"
              )}
            </Button>
          </div>
        </form>
      </Card>

      {pubCrawlPlan && <PubCrawlTimeline plan={pubCrawlPlan} />}
    </div>
  )
}
