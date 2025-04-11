import type { Metadata } from "next"
import PubCrawlGenerator from "@/components/pub-crawl-generator"

export const metadata: Metadata = {
  title: "Plan Your Perfect Pub Crawl | Daytrips.ai",
  description:
    "Create a personalized pub crawl itinerary with our AI-powered pub crawl planner. Find the best pubs and beers based on your preferences.",
}

export default function PubCrawlPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Plan Your Perfect Pub Crawl</h1>
        <p className="text-center text-gray-600 mb-4">
          Let our AI create a personalized pub crawl itinerary based on your preferences
        </p>
        <p className="text-center text-gray-600 mb-8">
          Each recommendation includes the pub's name, location, website, and a beer suggestion tailored to your taste
        </p>

        <PubCrawlGenerator />
      </div>
    </div>
  )
}
