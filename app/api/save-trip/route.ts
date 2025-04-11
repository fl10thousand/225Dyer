import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

// Create a single supabase client for server-side
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const { userId, tripPlan, preferences } = await request.json()

    if (!userId || !tripPlan || !preferences) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

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
      console.error("Error saving trip plan:", error)
      return NextResponse.json({ error: "Failed to save trip plan" }, { status: 500 })
    }

    revalidatePath("/my-trips")
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in save-trip API:", error)
    return NextResponse.json({ error: "Failed to save trip plan" }, { status: 500 })
  }
}
