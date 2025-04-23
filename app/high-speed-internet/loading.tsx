import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-4 w-24 mb-6" />
          <Skeleton className="h-12 w-full mb-8" />
          
          <div className="space-y-12">
            <div>
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-20 w-full" />
            </div>

            <div>
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>

            <div>
              <Skeleton className="h-8 w-64 mb-4" />
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-8 w-64 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <div className="flex-1">
                          <Skeleton className="h-6 w-48 mb-2" />
                          <Skeleton className="h-16 w-full" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
