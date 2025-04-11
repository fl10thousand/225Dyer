"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ImageDebug() {
  const [imageUrl, setImageUrl] = useState("")
  const [proxyUrl, setProxyUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleTestImage = async () => {
    if (!imageUrl) return

    setLoading(true)
    setError(null)
    setImageLoaded(false)

    try {
      // Create the proxy URL
      const encodedUrl = encodeURIComponent(imageUrl)
      const newProxyUrl = `/api/image-proxy?url=${encodedUrl}&cb=${Date.now()}`
      setProxyUrl(newProxyUrl)

      // Test if the image can be loaded
      const img = new Image()
      img.onload = () => {
        setImageLoaded(true)
        setLoading(false)
      }
      img.onerror = () => {
        setError("Failed to load image through proxy")
        setLoading(false)
      }
      img.src = newProxyUrl
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`)
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Image Loading Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL to test"
              className="flex-1"
            />
            <Button onClick={handleTestImage} disabled={loading || !imageUrl}>
              {loading ? "Testing..." : "Test Image"}
            </Button>
          </div>

          {error && <div className="p-2 bg-red-50 border border-red-200 rounded text-red-600">{error}</div>}

          {proxyUrl && !error && (
            <div className="p-2 bg-green-50 border border-green-200 rounded text-green-600">
              {imageLoaded ? "Image loaded successfully!" : "Loading image..."}
            </div>
          )}

          {proxyUrl && (
            <div className="border rounded p-4 bg-gray-50">
              <p className="text-sm font-mono mb-2 break-all">Proxy URL: {proxyUrl}</p>
              <div className="h-60 bg-gray-100 flex items-center justify-center">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">Failed to load image</p>
                ) : (
                  <img
                    src={proxyUrl || "/placeholder.svg"}
                    alt="Test image"
                    className="max-h-full max-w-full object-contain"
                    onError={() => setError("Image failed to load")}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
