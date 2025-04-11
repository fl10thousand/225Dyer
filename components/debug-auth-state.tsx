"use client"

import { useSupabase } from "./supabase-provider"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugAuthState() {
  const { user, loading } = useSupabase()
  const [isVisible, setIsVisible] = useState(false)

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 opacity-70 hover:opacity-100"
        onClick={() => setIsVisible(true)}
      >
        Debug Auth
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex justify-between">
          <span>Auth Debug</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsVisible(false)}>
            ×
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs">
        <div className="space-y-2">
          <div>
            <strong>Loading:</strong> {loading ? "Yes" : "No"}
          </div>
          <div>
            <strong>User Authenticated:</strong> {user ? "Yes" : "No"}
          </div>
          {user && (
            <>
              <div>
                <strong>User ID:</strong> {user.id}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div className="truncate">
                <strong>Last Auth Update:</strong> {new Date().toLocaleTimeString()}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
