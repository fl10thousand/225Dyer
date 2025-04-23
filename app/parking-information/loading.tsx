import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-72 mb-6" />
          
          <Skeleton className="h-40 w-full mb-8 rounded-lg" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>

          <Skeleton className="h-96 w-full mt-8 rounded-lg" />
          
          <Skeleton className="h-24 w-full mt-8" />
        </div>
      </div>
    </div>
  )
}
