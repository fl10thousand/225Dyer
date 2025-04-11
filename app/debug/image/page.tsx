"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FallbackImage from "@/components/fallback-image"

export default function ImageDebugPage() {
  const [imageUrl, setImageUrl] = useState("https://source.unsplash.com/random/800x600?paris")
  const [searchQuery, setSearchQuery] = useState("paris")
  const [testUrl, setTestUrl] = useState(imageUrl)
  const [testQuery, setTestQuery] = useState(searchQuery)

  const handleTestUrl = () => {
    setTestUrl(imageUrl)
  }

  const handleTestQuery = () => {
    setTestQuery(searchQuery)
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Image Loading Debug</h1>

      <div className="space-y-4 p-4 border rounded-md">
        <h2 className="text-xl font-semibold">Test Direct URL</h2>
        <div className="flex gap-2">
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL to test"
            className="flex-1"
          />
          <Button onClick={handleTestUrl}>Test URL</Button>
        </div>

        <div className="h-64 w-full relative border rounded-md overflow-hidden">
          <FallbackImage
            src={testUrl}
            alt="Test image"
            fallbackSrc="/placeholder.svg?height=300&width=400&text=Image+Failed+to+Load"
            fill={true}
            className="object-cover"
          />
        </div>
      </div>

      <div className="space-y-4 p-4 border rounded-md">
        <h2 className="text-xl font-semibold">Test Search Query</h2>
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query (e.g. paris, beach, mountains)"
            className="flex-1"
          />
          <Button onClick={handleTestQuery}>Test Query</Button>
        </div>

        <div className="h-64 w-full relative border rounded-md overflow-hidden">
          <FallbackImage
            src={`/api/image-proxy?query=${encodeURIComponent(testQuery)}`}
            alt="Test image from query"
            fallbackSrc="/placeholder.svg?height=300&width=400&text=Image+Failed+to+Load"
            fill={true}
            className="object-cover"
          />
        </div>
      </div>

      <div className="p-4 bg-muted/10 rounded-md">
        <h2 className="text-lg font-semibold mb-2">How this works:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            The <code>/api/image-proxy</code> endpoint fetches images server-side to avoid CORS issues
          </li>
          <li>
            You can pass either a <code>url</code> parameter with a direct image URL
          </li>
          <li>
            Or a <code>query</code> parameter to search Unsplash (e.g. "paris", "beach")
          </li>
          <li>The proxy handles redirects and returns the actual image data</li>
        </ul>
      </div>
    </div>
  )
}
