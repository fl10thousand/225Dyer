"use server"

import { createClient } from "@supabase/supabase-js"
import type { TripPlan, TripPreferences } from "./ai-service"
import { revalidatePath } from "next/cache"

// Create a single supabase client for server-side
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export type SavedTrip = {
  id: string
  user_id: string
  title: string
  location: string
  date: string
  trip_data: TripPlan
  preferences: TripPreferences
  created_at: string
}

// Update the saveTripPlan function with more robust error handling and logging

export async function saveTripPlan(userId: string, tripPlan: TripPlan, preferences: TripPreferences) {
  console.log("saveTripPlan function called with:", {
    userId,
    tripTitle: tripPlan.title,
    location: tripPlan.location,
    activitiesCount: tripPlan.activities.length,
  })

  try {
    // First, check if we have all required data
    if (!userId) {
      console.error("Missing userId in saveTripPlan")
      throw new Error("User ID is required to save trip plan")
    }

    if (!tripPlan || !tripPlan.title) {
      console.error("Missing or invalid tripPlan in saveTripPlan")
      throw new Error("Valid trip plan is required")
    }

    // Log the actual data being sent to Supabase
    console.log("Preparing to insert trip with data:", {
      user_id: userId,
      title: tripPlan.title,
      location: tripPlan.location,
      date: tripPlan.date,
    })

    const { data, error } = await supabase
      .from("trips")
      .insert({
        user_id: userId,
        title: tripPlan.title,
        location: tripPlan.location,
        date: tripPlan.date,
        trip_data: tripPlan,
        preferences: preferences,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error saving trip plan:", error)
      throw error
    }

    console.log("Trip plan saved successfully with ID:", data?.id)

    // Revalidate the path to ensure the UI updates
    revalidatePath("/my-trips")

    return data
  } catch (error) {
    console.error("Error in saveTripPlan function:", error)
    throw new Error(`Failed to save trip plan: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Update the getUserTrips function to properly filter by user ID
export async function getUserTrips(userId: string): Promise<SavedTrip[]> {
  try {
    if (!userId) {
      console.error("No userId provided to getUserTrips")
      return []
    }

    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error getting user trips:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error getting user trips:", error)
    throw new Error("Failed to get user trips")
  }
}

// Update the getTripById function to check ownership
export async function getTripById(tripId: string, userId: string): Promise<SavedTrip | null> {
  try {
    if (!tripId || !userId) {
      console.error("Missing tripId or userId in getTripById")
      return null
    }

    const { data, error } = await supabase.from("trips").select("*").eq("id", tripId).eq("user_id", userId).single()

    if (error) {
      console.error("Error getting trip by ID:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error getting trip by ID:", error)
    return null
  }
}

export async function deleteTripById(tripId: string) {
  try {
    const { error } = await supabase.from("trips").delete().eq("id", tripId)

    if (error) throw error
    revalidatePath("/my-trips")
    return true
  } catch (error) {
    console.error("Error deleting trip:", error)
    throw new Error("Failed to delete trip")
  }
}
