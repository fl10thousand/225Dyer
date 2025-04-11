"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Car, MapPin, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { findDestination, type TripFinderFormData, type TripRecommendationType } from "@/lib/destination-finder"
import TripRecommendation from "./trip-recommendation"
import { useToast } from "@/hooks/use-toast"

export default function TripFinderForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isLocationLoading, setIsLocationLoading] = useState(false)
  const [recommendation, setRecommendation] = useState<TripRecommendationType | null>(null)
  const [formData, setFormData] = useState<TripFinderFormData>({
    currentLocation: "",
    maxDistance: 100,
    duration: "day",
    interests: "", // Empty string for backward compatibility
    selectedInterests: [], // Initialize as empty array
    otherInterest: "",
    childFriendly: false, // Add this new property
  })
  const [previousDestinations, setPreviousDestinations] = useState<string[]>([])

  const getUserLocation = () => {
    // Check if we're in a browser environment
    if (typeof window === "undefined" || !navigator.geolocation) {
      toast({
        title: "Location detection not available",
        description: "Please enter your location manually.",
        variant: "destructive",
      })
      return
    }

    setIsLocationLoading(true)

    // Set a timeout to handle cases where the geolocation request hangs
    const timeoutId = setTimeout(() => {
      setIsLocationLoading(false)
      toast({
        title: "Location detection timed out",
        description: "Please enter your location manually.",
        variant: "destructive",
      })
    }, 10000) // 10 second timeout

    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          clearTimeout(timeoutId)
          try {
            const { latitude, longitude } = position.coords

            // Use a more reliable geocoding service that works in preview environments
            setFormData((prev) => ({
              ...prev,
              currentLocation: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
            }))

            // Attempt to get a more readable location name if possible
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
              )
              const data = await response.json()

              if (data && data.address) {
                const city = data.address.city || data.address.town || data.address.village || ""
                const state = data.address.state || ""

                if (city || state) {
                  const locationString = [city, state].filter(Boolean).join(", ")
                  setFormData((prev) => ({ ...prev, currentLocation: locationString }))
                }
              }
            } catch (geocodeError) {
              console.log("Could not get detailed location name, using coordinates")
              // We already set coordinates above, so this is just a fallback attempt
            }
          } catch (error) {
            console.error("Error processing location:", error)
          } finally {
            setIsLocationLoading(false)
          }
        },
        (error) => {
          clearTimeout(timeoutId)
          setIsLocationLoading(false)

          let errorMessage = "Please enter your location manually."

          switch (error.code) {
            case 1: // PERMISSION_DENIED
              errorMessage = "Location permission denied. Please enter your location manually."
              break
            case 2: // POSITION_UNAVAILABLE
              errorMessage = "Location information unavailable. Please enter your location manually."
              break
            case 3: // TIMEOUT
              errorMessage = "Location request timed out. Please enter your location manually."
              break
          }

          toast({
            title: "Could not detect location",
            description: errorMessage,
          })
        },
        {
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 0,
        },
      )
    } catch (e) {
      clearTimeout(timeoutId)
      setIsLocationLoading(false)
      toast({
        title: "Location detection failed",
        description: "Please enter your location manually.",
        variant: "destructive",
      })
    }
  }

  // Only try to get location on client-side and after component is mounted
  useEffect(() => {
    // Don't auto-request on initial load to avoid permission dialogs
    // Let the user click the button instead
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if at least one interest is selected
    if (formData.selectedInterests.length === 0) {
      toast({
        title: "Please select at least one interest",
        description: "Select one or more interests to find your perfect destination.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Make sure the interests field contains all selected interests
      const updatedFormData = {
        ...formData,
        interests: formData.interests, // This now contains all interests joined by commas
        excludeDestinations: previousDestinations, // Add this line to exclude previous destinations
      }

      const result = await findDestination(updatedFormData)

      // Add the new destination to the list of previous destinations
      setPreviousDestinations((prev) => [...prev, result.destination])

      setRecommendation(result)
    } catch (error) {
      console.error("Error finding destination:", error)
      toast({
        title: "Error finding destination",
        description: "Please try again or modify your search criteria.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const newState = { ...prev, [name]: value }

      // If changing otherInterest and "other" is selected, update interests too
      if (name === "otherInterest" && prev.interestType === "other") {
        newState.interests = value
      }

      return newState
    })
  }

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, maxDistance: value[0] }))
  }

  const handleDurationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, duration: value }))
  }

  const resetForm = () => {
    setRecommendation(null)
    // We don't reset previousDestinations here so we can exclude them in the next search
  }

  if (recommendation) {
    return (
      <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto px-2 md:px-0">
        <TripRecommendation recommendation={recommendation} />
        <div className="flex justify-center gap-4 mt-4 md:mt-6">
          <Button onClick={resetForm} variant="outline">
            Find Another Destination
          </Button>
          <Button
            onClick={() => {
              setRecommendation(null)
              setPreviousDestinations([])
            }}
            variant="ghost"
          >
            Start Over
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="currentLocation" className="flex items-center gap-2 text-sm md:text-base">
              <MapPin className="h-4 w-4" />
              Your Current Location
            </Label>
            <div className="flex gap-2">
              <Input
                id="currentLocation"
                name="currentLocation"
                placeholder={isLocationLoading ? "Detecting location..." : "e.g., Boston, MA"}
                value={formData.currentLocation}
                onChange={handleInputChange}
                required
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={isLocationLoading}
                onClick={getUserLocation}
                title="Detect my location"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Enter your city or address, or click the location icon to detect automatically.
            </p>
          </div>

          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="maxDistance" className="flex items-center gap-2 text-sm md:text-base">
              <Car className="h-4 w-4" />
              Maximum Driving Distance
            </Label>
            <Slider
              id="maxDistance"
              min={10}
              max={500}
              step={10}
              defaultValue={[100]}
              onValueChange={handleSliderChange}
              className="py-2"
            />
            <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
              <span>10 miles</span>
              <span>{formData.maxDistance} miles</span>
              <span>500 miles</span>
            </div>
          </div>

          <div className="space-y-1 md:space-y-2">
            <Label className="flex items-center gap-2 text-sm md:text-base">
              <Clock className="h-4 w-4" />
              Trip Duration
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { value: "day", label: "Day Trip" },
                { value: "weekend", label: "Weekend" },
                { value: "short", label: "Short Vacation" },
                { value: "long", label: "Extended Stay" },
              ].map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={formData.duration === option.value ? "default" : "outline"}
                  className="w-full text-xs md:text-sm py-1 md:py-2"
                  onClick={() => handleDurationChange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-1 md:space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="childFriendly"
                name="childFriendly"
                checked={formData.childFriendly}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    childFriendly: e.target.checked,
                  }))
                }}
                className="h-4 w-4 cursor-pointer"
              />
              <Label htmlFor="childFriendly" className="cursor-pointer flex items-center gap-2 text-sm md:text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M5 9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-5z" />
                  <path d="M17.5 13.5 19 12l-1.5-1.5" />
                  <path d="M6.5 13.5 5 12l1.5-1.5" />
                  <path d="M9 17h6" />
                </svg>
                Child Friendly
              </Label>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Select this option to find destinations with family-friendly activities and amenities.
            </p>
          </div>

          <div className="space-y-1 md:space-y-2">
            <Label className="flex items-center gap-2 text-sm md:text-base">
              <Heart className="h-4 w-4" />
              Your Interests (Select Multiple)
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { value: "hiking", label: "Hiking & Nature" },
                { value: "history", label: "History & Culture" },
                { value: "food", label: "Food & Dining" },
                { value: "shopping", label: "Shopping" },
                { value: "beaches", label: "Beaches" },
                { value: "museums", label: "Museums & Art" },
                { value: "adventure", label: "Adventure" },
                { value: "relaxation", label: "Relaxation" },
                { value: "camping", label: "Camping" },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    id={`interest-${option.value}`}
                    name={`interest-${option.value}`}
                    value={option.value}
                    checked={formData.selectedInterests.includes(option.value)}
                    onChange={(e) => {
                      const value = e.target.value
                      const isChecked = e.target.checked

                      setFormData((prev) => {
                        let newSelectedInterests

                        if (isChecked) {
                          // Add to selected interests
                          newSelectedInterests = [...prev.selectedInterests, value]
                        } else {
                          // Remove from selected interests
                          newSelectedInterests = prev.selectedInterests.filter((i) => i !== value)
                          // Don't force a default selection
                        }

                        // Join interests with commas for the original interests field
                        const interestsString = newSelectedInterests.join(", ")

                        return {
                          ...prev,
                          selectedInterests: newSelectedInterests,
                          interests: interestsString,
                        }
                      })
                    }}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <Label htmlFor={`interest-${option.value}`} className="cursor-pointer text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 mt-2 py-1">
              <input
                type="checkbox"
                id="interest-other"
                name="interest-other"
                value="other"
                checked={formData.selectedInterests.includes("other")}
                onChange={(e) => {
                  const isChecked = e.target.checked

                  setFormData((prev) => {
                    let newSelectedInterests

                    if (isChecked) {
                      // Add "other" to selected interests
                      newSelectedInterests = [...prev.selectedInterests, "other"]
                    } else {
                      // Remove "other" from selected interests
                      newSelectedInterests = prev.selectedInterests.filter((i) => i !== "other")
                      // Don't force a default selection
                    }

                    // Update interests string
                    let interestsString = newSelectedInterests.filter((i) => i !== "other").join(", ")

                    // Add other interest if it exists and is selected
                    if (isChecked && prev.otherInterest) {
                      if (interestsString) interestsString += ", "
                      interestsString += prev.otherInterest
                    }

                    return {
                      ...prev,
                      selectedInterests: newSelectedInterests,
                      interests: interestsString,
                    }
                  })
                }}
                className="h-4 w-4 cursor-pointer"
              />
              <Label htmlFor="interest-other" className="cursor-pointer text-sm">
                Other
              </Label>
            </div>

            {formData.selectedInterests.includes("other") && (
              <Input
                id="otherInterest"
                name="otherInterest"
                placeholder="Please specify your interest..."
                value={formData.otherInterest}
                onChange={(e) => {
                  const value = e.target.value
                  setFormData((prev) => {
                    // Update interests string with all selected interests plus the custom one
                    const standardInterests = prev.selectedInterests.filter((i) => i !== "other").join(", ")

                    let interestsString = standardInterests
                    if (value) {
                      if (interestsString) interestsString += ", "
                      interestsString += value
                    }

                    return {
                      ...prev,
                      otherInterest: value,
                      interests: interestsString,
                    }
                  })
                }}
                className="mt-2"
              />
            )}

            <p className="text-xs md:text-sm text-muted-foreground">
              Select all interests that apply to find the perfect destination.
            </p>
          </div>

          <Button type="submit" className="w-full mt-4" size="lg" disabled={isLoading}>
            {isLoading ? "Finding destination..." : "Find My Trip"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
