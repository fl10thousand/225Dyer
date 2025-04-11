"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient, User } from "@supabase/supabase-js"
import { useToast } from "@/components/ui/use-toast"

type SupabaseContext = {
  supabase: SupabaseClient
  user: User | null
  loading: boolean
}

const Context = createContext<SupabaseContext | undefined>(undefined)

// Create a singleton instance of the Supabase client to prevent multiple instances
let supabaseInstance: SupabaseClient | null = null

function getSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClientComponentClient()
  }
  return supabaseInstance
}

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Use the singleton pattern to get or create the Supabase client
  const [supabase] = useState(() => getSupabaseClient())
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.id)
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // Check for initial session
    const initializeUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log("Initial session check:", session?.user?.id)
      if (session?.user) {
        setUser(session.user)
      }
      setLoading(false)
    }

    initializeUser()

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return <Context.Provider value={{ supabase, user, loading }}>{children}</Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}
