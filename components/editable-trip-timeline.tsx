"use client"

import { useState } from "react"
import type { TripPlan, TripActivity, TripPreferences } from "../lib/ai-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { MapPin, Calendar, Save, Plus, Edit, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSupabase } from "./supabase-provider"
import { saveTripPlan } from "../lib/db-service"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import EditableActivity from "./editable-activity"

// Add this helper function after the imports and before the component definition
function parseTime(timeStr: string): number {
  // Extract hours and minutes, ignoring AM/PM for now
  const timeMatch = timeStr.match(/(\d+):(\d+)/)
  if (!timeMatch) return 0

  let [_, hours, minutes] = timeMatch.map(Number)

  // Check if it's PM and not noon
  if (timeStr.toLowerCase().includes("pm") && hours !== 12) {
    hours += 12
  }
  // Check if it's AM and it's midnight
  if (timeStr.toLowerCase().includes("am") && hours === 12) {
    hours = 0
  }

  return hours * 60 + minutes // Convert to minutes for easy comparison
}

interface EditableTripTimelineProps {
  trip: TripPlan
  preferences?: TripPreferences
  onSave?: (updatedTrip: TripPlan) => void
}

export default function EditableTripTimeline({ trip, preferences, onSave }: EditableTripTimelineProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTrip, setEditedTrip] = useState<TripPlan>({ ...trip })
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()

  // Replace the handleSaveTrip function with this improved version:
  const handleSaveTrip = async () => {
    console.log("handleSaveTrip function triggered")
    console.log("Preferences available:", preferences)

    if (!user) {
      console.error("No user found in handleSaveTrip")
      toast({
        title: "Login required",
        description: "Please login to save this trip",
      })
      router.push("/login")
      return
    }

    // Create default preferences if none are provided
    const defaultPreferences = {
      location: editedTrip.location,
      interests: ["history", "food", "nature"],
      budget: "moderate",
      transportationMode: "walking",
      startTime: "09:00",
      endTime: "17:00",
    }

    // Use provided preferences or fallback to default
    const tripPreferences = preferences || defaultPreferences

    console.log("Using preferences:", tripPreferences)

    setIsSaving(true)
    try {
      // Log the current user and trip data
      console.log("Current user:", user)
      console.log("Saving trip with data:", editedTrip)

      // Create a clean copy of the trip to save
      const tripToSave = JSON.parse(JSON.stringify(editedTrip))

      // Log the actual data being sent to the server
      console.log("Sending to server:", {
        userId: user.id,
        tripToSave,
        tripPreferences,
      })

      // Save the trip to the database
      const result = await saveTripPlan(user.id, tripToSave, tripPreferences)
      console.log("Save result:", result)

      toast({
        title: "Trip saved successfully!",
        description: "Your customized trip has been saved.",
      })

      if (onSave) onSave(tripToSave)

      // Navigate to my-trips page after successful save
      router.push("/my-trips")
    } catch (error) {
      console.error("Error saving customized trip:", error)
      toast({
        title: "Error saving trip",
        description: `There was a problem saving your trip: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Replace the handleToggleEdit function with this updated version:
  const handleToggleEdit = async () => {
    if (isEditing) {
      // If we're exiting edit mode, update the trip and save changes
      setIsEditing(false)

      // Call onSave callback if provided
      if (onSave) onSave(editedTrip)

      // Also save to database when exiting edit mode
      if (user) {
        toast({
          title: "Saving changes...",
          description: "Your customized trip is being saved.",
        })

        try {
          // Use a separate async function call to ensure we don't have state issues
          await handleSaveTrip()
        } catch (error) {
          console.error("Error in handleToggleEdit when saving:", error)
          // Error is already handled in handleSaveTrip
        }
      }
    } else {
      // Entering edit mode
      setIsEditing(true)
    }
  }

  // Modify the handleUpdateActivity function to sort activities by time
  const handleUpdateActivity = (index: number, updatedActivity: TripActivity) => {
    // First update the activity at its current position
    const newActivities = [...editedTrip.activities]
    newActivities[index] = updatedActivity

    // Sort activities by time
    const sortedActivities = [...newActivities].sort((a, b) => {
      const timeA = parseTime(a.time)
      const timeB = parseTime(b.time)
      return timeA - timeB
    })

    // Update the state with sorted activities
    setEditedTrip({ ...editedTrip, activities: sortedActivities })
  }

  const handleDeleteActivity = (index: number) => {
    const newActivities = editedTrip.activities.filter((_, i) => i !== index)
    setEditedTrip({ ...editedTrip, activities: newActivities })
  }

  const handleMoveActivity = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === editedTrip.activities.length - 1)) {
      return
    }

    const newActivities = [...editedTrip.activities]
    const newIndex = direction === "up" ? index - 1 : index + 1

    // Swap the activities
    ;[newActivities[newIndex], newActivities[index]] = [newActivities[index], newActivities[newIndex]]

    setEditedTrip({ ...editedTrip, activities: newActivities })
  }

  const handleAddActivity = () => {
    // Create a new activity with default values
    const lastActivity = editedTrip.activities[editedTrip.activities.length - 1]
    const newTime = lastActivity ? lastActivity.time : "12:00 PM"

    const newActivity: TripActivity = {
      time: newTime,
      title: "New Activity",
      description: "Description of your new activity",
      type: "activity",
      duration: "1 hour",
      location: editedTrip.location,
      website: "",
      map_link: "",
      image_url: "", // Add this field with an empty default value
    }

    setEditedTrip({
      ...editedTrip,
      activities: [...editedTrip.activities, newActivity],
    })
  }

  const handleTripDetailsChange = (field: keyof TripPlan, value: string) => {
    setEditedTrip((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            {isEditing ? (
              <Input
                value={editedTrip.location}
                onChange={(e) => handleTripDetailsChange("location", e.target.value)}
                className="h-7 font-bold text-xl"
              />
            ) : (
              <>
                <MapPin className="h-5 w-5 text-primary" />
                {editedTrip.location}
              </>
            )}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 mt-1">
            <Calendar className="h-4 w-4" />
            {isEditing ? (
              <Input
                value={editedTrip.date}
                onChange={(e) => handleTripDetailsChange("date", e.target.value)}
                className="h-7"
              />
            ) : (
              editedTrip.date
            )}
          </CardDescription>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={handleToggleEdit}
          className="flex items-center gap-1"
        >
          {isEditing ? (
            <>
              <Check className="h-4 w-4" />
              Done Editing
            </>
          ) : (
            <>
              <Edit className="h-4 w-4" />
              Customize
            </>
          )}
        </Button>
      </CardHeader>

      {isEditing && (
        <CardContent className="pt-0 pb-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Trip Title</label>
              <Input value={editedTrip.title} onChange={(e) => handleTripDetailsChange("title", e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Trip Summary</label>
              <Textarea
                value={editedTrip.summary}
                onChange={(e) => handleTripDetailsChange("summary", e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      )}

      <CardContent>
        <ol className="relative border-l border-muted">
          {editedTrip.activities.map((activity, index) => (
            <EditableActivity
              key={index}
              activity={activity}
              index={index}
              isEditing={isEditing}
              onSave={handleUpdateActivity}
              onDelete={handleDeleteActivity}
              onMoveUp={() => handleMoveActivity(index, "up")}
              onMoveDown={() => handleMoveActivity(index, "down")}
              isFirst={index === 0}
              isLast={index === editedTrip.activities.length - 1}
            />
          ))}

          {isEditing && (
            <li className="ml-6">
              <Button
                variant="outline"
                className="w-full border-dashed flex items-center gap-2"
                onClick={handleAddActivity}
              >
                <Plus className="h-4 w-4" />
                Add New Activity
              </Button>
            </li>
          )}
        </ol>
      </CardContent>

      {user && (
        <CardFooter className="pt-2 pb-4 px-6">
          <Button
            type="button"
            onClick={() => {
              console.log("Save button clicked")
              handleSaveTrip()
            }}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            {isSaving ? (
              <>
                <span className="animate-spin">⏳</span>
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Customized Itinerary
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
