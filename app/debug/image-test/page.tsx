"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FallbackImage from "@/components/fallback-image"
import { createUnsplashUrl, getAlternativeSearchTerms } from "@/lib/image-utils"

export default function ImageTestPage() {
  const [searchTerm, setSearchTerm] = useState("Staten Island Ferry")
  const [alternativeTerms, setAlternativeTerms] = useState<string[]>([])

  const handleTest = () => {
    const terms = getAlternativeSearchTerms(searchTerm)
    setAlternativeTerms(terms)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Image Loading Test Page</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test Search Term</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter a location name"
              className="flex-1"
            />
            <Button onClick={handleTest}>Test</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Primary Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <FallbackImage
                src={createUnsplashUrl(searchTerm)}
                alt={searchTerm}
                fallbackSrc={`/placeholder.svg?height=300&width=500&text=${encodeURIComponent(searchTerm)}`}
                className="object-cover w-full h-full rounded-md"
                fill={false}
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Search term: <code>{searchTerm}</code>
            </p>
          </CardContent>
        </Card>

        {alternativeTerms.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Alternative Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alternativeTerms.map((term, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="h-40 relative mb-2">
                      <FallbackImage
                        src={createUnsplashUrl(term)}
                        alt={term}
                        fallbackSrc={`/placeholder.svg?height=160&width=320&text=${encodeURIComponent(term)}`}
                        className="object-cover w-full h-full rounded-md"
                        fill={false}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Alternative {index + 1}: <code>{term}</code>
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
