"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ImageSearchDebug() {
  const [query, setQuery] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState<any>(null)

  async function handleSearch() {
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setImageUrl(null)
    setApiResponse(null)

    try {
      const response = await fetch(`/api/image-search?query=${encodeURIComponent(query)}`)
      const data = await response.json()

      // Store the full API response for debugging
      setApiResponse(data)

      if (!response.ok) {
        setError(data.error || "Failed to fetch image")
        return
      }

      setImageUrl(data.imageUrl)
      if (!data.imageUrl) {
        setError("No image found for this query")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Image Search Debug</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Search Engine ID:</strong> c378f84d7f8434df1
            </p>
            <p>
              <strong>Referer:</strong> https://v0-day-trip.vercel.app
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 mb-6">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {imageUrl && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Image URL:</p>
              <code className="block p-2 bg-gray-100 rounded text-sm overflow-x-auto">{imageUrl}</code>
            </div>
            <div className="border rounded overflow-hidden">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={query}
                className="w-full h-auto max-h-96 object-contain"
                onError={() => setError("Failed to load image")}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {apiResponse && (
        <Card>
          <CardHeader>
            <CardTitle>API Response Debug</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-xs">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
