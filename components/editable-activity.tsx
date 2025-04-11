"use client"

import { useState } from "react"
import type { TripActivity } from "@/lib/ai-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Coffee,
  Utensils,
  Bus,
  Clock,
  Camera,
  Ticket,
  Music,
  ShoppingBag,
  Landmark,
  ParkingCircle,
  Edit,
  Trash2,
  GripVertical,
  Check,
  X,
  MapPin,
  ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import FallbackImage from "@/components/fallback-image" // Fixed import statement

// Add a helper function to convert 24-hour time to 12-hour time with AM/PM
// Add this function after the imports and before the component definition
function convertTo12HourFormat(time24: string): string {
  // If the time already has AM/PM, return it as is
  if (time24.match(/\s*(AM|PM|am|pm)/i)) {
    return time24
  }

  // Parse the hours and minutes
  const [hours, minutes] = time24.split(":").map(Number)

  // Determine if it's AM or PM
  const period = hours >= 12 ? "PM" : "AM"

  // Convert hours to 12-hour format
  const hours12 = hours % 12 || 12

  // Format the time string
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
}

// Update the getImageUrl function to be more robust and include location context
const getImageUrl = (
  imageUrl: string | null | undefined,
  imageSearchTerm: string | null | undefined,
  location?: string,
): string => {
  // If there's no image URL or search term, return placeholder
  if ((!imageUrl || imageUrl.trim() === "") && (!imageSearchTerm || imageSearchTerm.trim() === "")) {
    return `/placeholder.svg?height=160&width=320`
  }

  // If there's an image URL, use it directly
  if (imageUrl && imageUrl.trim() !== "") {
    // If it's already a placeholder, return as is
    if (imageUrl.startsWith("/placeholder.svg")) {
      return imageUrl
    }

    // If it's an absolute URL, use it directly
    if (imageUrl.startsWith("http")) {
      return imageUrl
    }
  }

  // If there's a search term, use a direct Unsplash URL
  if (imageSearchTerm && imageSearchTerm.trim() !== "") {
    try {
      // Clean up the search term
      const cleanTerm = imageSearchTerm
        .trim()
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .replace(/\b(inc|llc|co|ltd|corporation|company)\b/gi, "")
        .trim()

      // Add location context if available
      const searchQuery = location ? `${cleanTerm} ${location} photo` : `${cleanTerm} photo`

      // Use a direct Unsplash URL with the search term
      const query = encodeURIComponent(searchQuery)
      // Add a random number to prevent caching
      const random = Math.floor(Math.random() * 1000)
      return `https://source.unsplash.com/featured/?${query}&sig=${random}`
    } catch (error) {
      console.error("Error creating Unsplash URL:", error)
      // If there's an error, return placeholder
      return `/placeholder.svg?height=160&width=320`
    }
  }

  // Fallback to placeholder
  return `/placeholder.svg?height=160&width=320`
}

// Update the getProxiedImageUrl function to not use the proxy
const getProxiedImageUrl = (url: string): string => {
  if (!url) return `/placeholder.svg?height=160&width=320`

  // If it's already a placeholder, return as is
  if (url.startsWith("/placeholder.svg")) return url

  // Return the URL directly instead of proxying
  return url
}

interface EditableActivityProps {
  activity: TripActivity
  index: number
  isEditing: boolean
  onSave: (index: number, updatedActivity: TripActivity) => void
  onDelete: (index: number) => void
  onMoveUp: (index: number) => void
  onMoveDown: (index: number) => void
  isFirst: boolean
  isLast: boolean
}

export default function EditableActivity({
  activity,
  index,
  isEditing,
  onSave,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: EditableActivityProps) {
  const [editedActivity, setEditedActivity] = useState<TripActivity>({ ...activity })
  const [isEditingThis, setIsEditingThis] = useState(false)
  const [imageError, setImageError] = useState(false)

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
        }

        return <Clock className="h-5 w-5" />
    }
  }

  const handleStartEditing = () => {
    setEditedActivity({ ...activity })
    setIsEditingThis(true)
  }

  const handleSave = () => {
    // Convert the time to 12-hour format if it's not already
    const formattedActivity = {
      ...editedActivity,
      time: convertTo12HourFormat(editedActivity.time),
    }

    onSave(index, formattedActivity)
    setIsEditingThis(false)
  }

  const handleCancel = () => {
    setIsEditingThis(false)
  }

  const handleChange = (field: keyof TripActivity, value: string) => {
    setEditedActivity((prev) => ({ ...prev, [field]: value }))

    // Reset image error when changing the image URL
    if (field === "image_url") {
      setImageError(false)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  if (isEditingThis) {
    return (
      <li className="mb-10 ml-6 last:mb-0">
        <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {getActivityIcon(editedActivity.type, editedActivity.title)}
        </span>
        <Card className="p-4 border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Time</label>
                <Input
                  type="time"
                  value={editedActivity.time.replace(/\s*(AM|PM)/i, "")}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className="h-9"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Duration</label>
                <Input
                  value={editedActivity.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  placeholder="e.g. 2 hours"
                  className="h-9"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Activity Type</label>
              <Select value={editedActivity.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activity">Activity</SelectItem>
                  <SelectItem value="meal">Meal</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="break">Break</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input
                value={editedActivity.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="h-9"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea
                value={editedActivity.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Location</label>
              <Input
                value={editedActivity.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="h-9"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Website (optional)</label>
              <Input
                value={editedActivity.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://..."
                className="h-9"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Image URL (optional)</label>
              <Input
                value={editedActivity.image_url || ""}
                onChange={(e) => handleChange("image_url", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="h-9"
              />
              <p className="text-xs text-muted-foreground mt-1">Enter a URL for an image representing this activity</p>

              {/* Preview of the image */}
              {editedActivity.image_url && (
                <div className="mt-2 relative h-20 w-full overflow-hidden rounded-md">
                  <FallbackImage
                    src={
                      getImageUrl(editedActivity.image_url, editedActivity.title, editedActivity.location) ||
                      "/placeholder.svg"
                    }
                    alt="Preview"
                    fallbackSrc={`/placeholder.svg?height=160&width=320&text=${encodeURIComponent(editedActivity.title)}`}
                    className="object-cover w-full h-full"
                    fill={false}
                  />
                  {imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/80 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ImageIcon className="h-4 w-4" />
                        Invalid image URL
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Suggest using Unsplash */}
              <p className="text-xs text-muted-foreground mt-1">
                Tip: Try using Unsplash images with format: https://source.unsplash.com/featured/?
                {editedActivity.title.toLowerCase().replace(/\s+/g, "+")}
                {editedActivity.location ? `+${editedActivity.location.toLowerCase().replace(/\s+/g, "+")}` : ""}
                +photo
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="mr-1 h-4 w-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="mr-1 h-4 w-4" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </li>
    )
  }

  return (
    <li className="mb-10 ml-6 last:mb-0 group relative">
      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-110">
        {getActivityIcon(activity.type, activity.title)}
      </span>

      {isEditing && (
        <div className="absolute -left-12 top-0 bottom-0 flex flex-col justify-center items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full bg-muted/80 hover:bg-muted"
            onClick={() => onMoveUp(index)}
            disabled={isFirst}
          >
            <GripVertical className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div
        className={cn(
          "flex flex-col space-y-2 transition-all duration-300",
          isEditing
            ? "border border-muted rounded-md p-3 hover:border-muted-foreground/50"
            : "group-hover:translate-x-1",
        )}
      >
        {/* Add the image display here, before the time display */}
        {activity.image_url && !isEditingThis && (
          <div className="relative h-40 w-full overflow-hidden rounded-md">
            <FallbackImage
              src={getImageUrl(activity.image_url, activity.title, activity.location) || "/placeholder.svg"}
              alt={activity.title}
              fallbackSrc={`/placeholder.svg?height=160&width=320&text=${encodeURIComponent(activity.title)}`}
              className="object-cover w-full h-full"
              fill={false}
            />
          </div>
        )}

        <div className="flex items-center gap-2 pl-4">
          <time className="text-sm font-semibold text-primary">{activity.time}</time>
          <span className="text-xs rounded-full bg-muted px-2 py-0.5">{activity.duration}</span>
          <Badge variant="outline" className="ml-auto">
            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          </Badge>

          {isEditing && (
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleStartEditing}>
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => onDelete(index)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold">{activity.title}</h3>
        <p className="text-muted-foreground">{activity.description}</p>

        {activity.location && (
          <div className="flex items-start gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
            <span className="break-words">{activity.location}</span>
          </div>
        )}
      </div>
    </li>
  )
}
