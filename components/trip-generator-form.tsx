"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { generateTripPlan, type TripPlan, type TripPreferences } from "../lib/ai-service"
import { saveTripPlan } from "../lib/db-service"
import { useSupabase } from "./supabase-provider"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TripTimeline from "./trip-timeline"
import { Loader2, Info, Globe, AlertTriangle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const interestOptions = [
  {
    id: "history",
    label: "History & Culture",
    description: "Historical sites, museums, landmarks, cultural experiences",
  },
  { id: "nature", label: "Nature & Outdoors", description: "Parks, gardens, hiking trails, scenic viewpoints" },
  { id: "food", label: "Food & Dining", description: "Local cuisine, food tours, markets, specialty restaurants" },
  { id: "shopping", label: "Shopping", description: "Boutiques, malls, markets, local crafts, souvenirs" },
  { id: "art", label: "Art & Museums", description: "Art galleries, exhibitions, street art, creative spaces" },
  { id: "entertainment", label: "Entertainment", description: "Theaters, live music, comedy, performances" },
  { id: "relaxation", label: "Relaxation", description: "Spas, quiet cafes, peaceful gardens, wellness" },
  { id: "adventure", label: "Adventure", description: "Outdoor activities, adrenaline experiences, unique adventures" },
  { id: "photography", label: "Photography", description: "Scenic viewpoints, photogenic locations, iconic spots" },
  {
    id: "architecture",
    label: "Architecture",
    description: "Notable buildings, architectural tours, design landmarks",
  },
  {
    id: "child_friendly",
    label: "Child Friendly",
    description: "Family attractions, interactive museums, playgrounds",
  },
  {
    id: "teen_friendly",
    label: "Teenager Friendly",
    description: "Activities appealing to teenagers, interactive experiences",
  },
]

// Popular destination suggestions
const popularDestinations = [
  "Paris",
  "Tokyo",
  "New York",
  "Rome",
  "Barcelona",
  "Kyoto",
  "London",
  "Sydney",
  "Bangkok",
  "Rio de Janeiro",
  "Vancouver",
  "Cancun",
  "Las Vegas",
  "San Francisco",
  "Miami",
]

// Also update the hawaiiDestinations array to match viatorDestinations keys:

const hawaiiDestinations = ["Honolulu", "Kona", "Lahaina", "Maui"]

// Combine all destinations
const allDestinations = [...popularDestinations, ...hawaiiDestinations]

const formSchema = z.object({
  location: z.string().min(2, {
    message: "Please enter a valid location.",
  }),
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one interest.",
  }),
  budget: z.enum(["budget", "moderate", "luxury"]),
  transportationMode: z.enum(["walking", "public transport", "driving"]),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in 24-hour format (HH:MM).",
  }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in 24-hour format (HH:MM).",
  }),
  mealPreferences: z.string().optional(),
  accessibility: z.boolean().default(false),
})

export default function TripGeneratorForm() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTrip, setGeneratedTrip] = useState<TripPlan | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUsingFallback, setIsUsingFallback] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const { user } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()

  const searchParams = useSearchParams()
  const destinationParam = searchParams.get("destination")

  const [destination, setDestination] = useState(destinationParam || "")

  // Set the destination from URL parameter if available
  useEffect(() => {
    if (destinationParam) {
      setDestination(destinationParam)
    }
  }, [destinationParam])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: destination || "",
      interests: [],
      budget: "moderate",
      transportationMode: "driving",
      startTime: "09:00",
      endTime: "17:00",
      mealPreferences: "",
      accessibility: false,
    },
  })

  useEffect(() => {
    form.setValue("location", destination)
  }, [destination, form.setValue])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true)
    setGeneratedTrip(null)
    setIsUsingFallback(false)
    setApiError(null)

    try {
      console.log("Generating trip with preferences:", values)
      const tripPlan = await generateTripPlan(values as TripPreferences)
      console.log("Trip generated successfully:", tripPlan)
      setGeneratedTrip(tripPlan)

      // Check if this is a fallback plan - more comprehensive check
      const isFallback =
        tripPlan.summary.includes("fallback") ||
        tripPlan.summary.includes("placeholder") ||
        tripPlan.activities.some(
          (a) =>
            a.description.includes("placeholder") ||
            a.title.includes(`Morning in ${values.location}`) ||
            a.title === "Afternoon Exploration" ||
            a.title === "End of Day",
        )

      setIsUsingFallback(isFallback)

      if (isFallback) {
        toast({
          title: "Using basic trip template",
          description: "We couldn't generate a fully personalized trip at this time. Here's a basic template instead.",
          variant: "warning",
        })
      } else {
        toast({
          title: "Trip generated successfully!",
          description: "Scroll down to view your personalized day trip.",
        })
      }
    } catch (error: any) {
      console.error("Error generating trip:", error)
      setApiError(error.message || "There was a problem generating your trip. Please try again.")
      toast({
        title: "Error generating trip",
        description: error.message || "There was a problem generating your trip. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  async function handleSaveTrip() {
    if (!user || !generatedTrip) return

    setIsSaving(true)
    try {
      await saveTripPlan(user.id, generatedTrip, form.getValues() as TripPreferences)

      toast({
        title: "Trip saved successfully!",
        description: "You can view it in your saved trips.",
      })

      router.push("/my-trips")
    } catch (error) {
      console.error("Error saving trip:", error)
      toast({
        title: "Error saving trip",
        description: "There was a problem saving your trip. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getBudgetDescription = (budget: string) => {
    switch (budget) {
      case "budget":
        return "Free or low-cost attractions, affordable dining options"
      case "moderate":
        return "Mid-range attractions and restaurants, mix of free and paid experiences"
      case "luxury":
        return "Premium attractions, fine dining, exclusive experiences"
      default:
        return ""
    }
  }

  const getTransportDescription = (mode: string) => {
    switch (mode) {
      case "walking":
        return "Locations within walking distance of each other"
      case "public transport":
        return "Locations accessible by buses, trains, or subways"
      case "driving":
        return "Locations that might be further apart, with parking availability"
      default:
        return ""
    }
  }

  const handleDestinationClick = (destination: string) => {
    form.setValue("location", destination)
  }

  // useEffect(() => {
  //   // Only load the ad script when a trip has been generated
  //   if (generatedTrip) {
  //     // Remove any existing ad scripts to prevent duplicates
  //     const existingScript = document.getElementById("trip-ad-script")
  //     if (existingScript) {
  //       existingScript.remove()
  //     }

  //     // Create the ad script
  //     const script = document.createElement("script")
  //     script.id = "trip-ad-script"
  //     script.async = true
  //     script.setAttribute("data-noptimize", "1")
  //     script.setAttribute("data-cfasync", "false")
  //     script.setAttribute("data-wpfc-render", "false")
  //     script.src = "https://tpembars.com/Mzk5MDgw.js?t=399080"

  //     // Append the script to the document body (before the closing body tag)
  //     document.body.appendChild(script)

  //     // Clean up function to remove script when component unmounts
  //     return () => {
  //       if (document.getElementById("trip-ad-script")) {
  //         document.getElementById("trip-ad-script")?.remove()
  //       }
  //     }
  //   }
  // }, [generatedTrip]) // Re-run when generatedTrip changes

  return (
    <div className="space-y-8">
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-highlight-blue" />
            Generate Your Perfect Day Trip
            <Badge variant="outline" className="ml-2">
              Worldwide
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Location{" "}
                      <span className="text-sm font-normal text-muted-foreground">(anywhere in the world)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Kyoto, Japan or Kona, Hawaii"
                        {...field}
                        className="h-14 border-2 border-primary/30 focus:border-primary focus-visible:ring-primary/20 focus-visible:ring-offset-2 shadow-sm transition-all duration-300 hover:shadow-md focus:shadow-md focus:shadow-primary/10 text-xl font-bold placeholder:text-muted-foreground/70"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter any city or area in the world where you want to have your day trip. Include the country name
                      for better results (e.g., "Barcelona, Spain").
                    </FormDescription>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Popular destinations:</p>
                      <div className="flex flex-wrap gap-2">
                        {allDestinations.slice(0, 10).map((destination) => (
                          <Badge
                            key={destination}
                            variant="secondary"
                            className="cursor-pointer hover:bg-secondary/80 transition-colors duration-200"
                            onClick={() => handleDestinationClick(destination)}
                          >
                            {destination}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Interests</FormLabel>
                      <FormDescription>Pick what you love — we'll build your day around it.</FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {interestOptions.map((interest) => (
                        <FormField
                          key={interest.id}
                          control={form.control}
                          name="interests"
                          render={({ field }) => {
                            return (
                              <TooltipProvider key={interest.id}>
                                <Tooltip>
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(interest.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, interest.id])
                                            : field.onChange(field.value?.filter((value) => value !== interest.id))
                                        }}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="font-normal cursor-pointer">{interest.label}</FormLabel>
                                      <TooltipTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-muted-foreground">
                                          <Info className="h-3 w-3" />
                                          <span className="sr-only">Info</span>
                                        </Button>
                                      </TooltipTrigger>
                                    </div>
                                  </FormItem>
                                  <TooltipContent side="right">
                                    <p className="max-w-xs">{interest.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your budget" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="budget">Budget-friendly</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>{getBudgetDescription(field.value)}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transportationMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transportation</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transportation mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="driving">Driving</SelectItem>
                          <SelectItem value="public transport">Public Transport</SelectItem>
                          <SelectItem value="walking">Walking</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>{getTransportDescription(field.value)}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormDescription>When would you like to start your day?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormDescription>When would you like to end your day?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mealPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meal Preferences (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Vegetarian, Italian cuisine, seafood, etc." {...field} />
                    </FormControl>
                    <FormDescription>
                      Any specific food preferences or dietary restrictions? Be as specific as possible for better
                      recommendations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accessibility"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Accessibility Needs</FormLabel>
                      <FormDescription>
                        Check this if you need wheelchair accessible locations and activities.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {apiError && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{apiError}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isGenerating}
                className="w-full py-6 text-lg font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg mt-8"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Personalized Trip...
                  </>
                ) : (
                  "Generate your personalize day trip"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedTrip && (
        <div className="space-y-6">
          {isUsingFallback && (
            <Alert variant="warning" className="bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">Using Basic Template</AlertTitle>
              <AlertDescription className="text-amber-700">
                We're currently showing a basic template instead of a fully personalized itinerary. Try adjusting your
                preferences or try again later for a more detailed plan.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">{generatedTrip.title}</h2>
              <p className="text-muted-foreground">{generatedTrip.summary}</p>
            </div>
          </div>

          <TripTimeline
            trip={generatedTrip}
            preferences={form.getValues()}
            showSaveButton={true}
            enableEditing={true}
            onSave={() => {
              toast({
                title: "Trip saved successfully!",
                description: "You can view it in your saved trips.",
              })
              router.push("/my-trips")
            }}
          />

          {!user && (
            <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm hover:shadow-md transition-all duration-300">
              <p className="text-center">
                <Button variant="link" asChild>
                  <a href="/login">Sign in</a>
                </Button>
                or
                <Button variant="link" asChild>
                  <a href="/signup">create an account</a>
                </Button>
                to save this trip for later!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
