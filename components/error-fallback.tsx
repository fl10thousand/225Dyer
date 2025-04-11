"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle>Something went wrong</CardTitle>
        </div>
        <CardDescription>We encountered an error while trying to process your request.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Error details: {error.message || "Unknown error"}</p>
        <p className="text-sm">This could be due to:</p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
          <li>Temporary service disruption</li>
          <li>Network connectivity issues</li>
          <li>Server-side processing error</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={resetErrorBoundary} className="w-full">
          Try Again
        </Button>
      </CardFooter>
    </Card>
  )
}
