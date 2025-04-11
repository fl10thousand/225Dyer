"use client"

import { useState } from "react"
import { searchImageWithFallbacks } from "@/lib/image-search"

export default function TestImageSearch() {
  const [query, setQuery] = useState("Empire State Building")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiDetails] = useState({
    key: "AIzaSyA4c_zqzT05u-Qs4wf1bi4mOFLfcmcNdYQ",
    cx: "c378f84d7f8434df1",
  })
  const [useUtility, setUseUtility] = useState(false)

  async function searchImageDirect() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/image-search?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResult(data)
      if (!res.ok) {
        setError(`Error: ${data.error || "Unknown error"}`)
      }
    } catch (err) {
      setError(`Failed to fetch: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  async function searchImageWithUtility() {
    setLoading(true)
    setError(null)
    try {
      const imageUrl = await searchImageWithFallbacks(query)
      if (imageUrl) {
        setResult({ imageUrl, query })
      } else {
        setError("No image found")
      }
    } catch (err) {
      setError(`Failed to fetch: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch() {
    if (useUtility) {
      searchImageWithUtility()
    } else {
      searchImageDirect()
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Image Search API</h1>

      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
        <h2 className="text-lg font-semibold mb-2">API Configuration</h2>
        <div>
          <strong>API Key:</strong> {apiDetails.key.substring(0, 10)}...
          {apiDetails.key.substring(apiDetails.key.length - 5)}
        </div>
        <div>
          <strong>Search Engine ID:</strong> {apiDetails.cx}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Enter search query"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="useUtility"
            checked={useUtility}
            onChange={(e) => setUseUtility(e.target.checked)}
          />
          <label htmlFor="useUtility">Use utility function with fallbacks</label>
        </div>
      </div>

      {error && <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      {result && (
        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">{JSON.stringify(result, null, 2)}</pre>

          {result.imageUrl && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Image Preview:</h3>
              <img
                src={result.imageUrl || "/placeholder.svg"}
                alt={query}
                className="max-w-full h-auto rounded border"
                onError={(e) => {
                  setError("Failed to load image")
                  console.error("Image load error:", e)
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
