import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "Frequently Asked Questions | DayTrips.ai",
  description:
    "Find answers to common questions about DayTrips.ai, our AI-powered day trip planner, and how to make the most of your travel experiences.",
}

export default function FAQPage() {
  return (
    <div className="container py-12 md:py-24">
      <Button variant="ghost" asChild className="mb-8 group">
        <Link href="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </Button>

      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Find answers to common questions about using DayTrips.ai</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is DayTrips.ai?</AccordionTrigger>
            <AccordionContent>
              DayTrips.ai is an AI-powered travel planning tool that creates personalized day trip itineraries based on
              your location, interests, budget, and other preferences. Our platform uses advanced artificial
              intelligence to generate detailed, customized travel plans for destinations worldwide.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is DayTrips.ai free to use?</AccordionTrigger>
            <AccordionContent>
              Yes! The core functionality of DayTrips.ai is completely free. You can generate personalized day trip
              itineraries without any cost. We may introduce premium features in the future, but our basic trip planning
              service will always remain free.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How accurate are the itineraries?</AccordionTrigger>
            <AccordionContent>
              Our AI generates itineraries based on up-to-date information about attractions, opening hours, and travel
              times. However, we always recommend verifying specific details (like opening hours or ticket prices)
              before your trip, as these can change. The more specific you are with your preferences, the more accurate
              and personalized your itinerary will be.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Do I need to create an account?</AccordionTrigger>
            <AccordionContent>
              You can generate itineraries without creating an account. However, creating a free account allows you to
              save your favorite itineraries, track your past trips, and receive personalized recommendations based on
              your travel history.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Can I customize the generated itinerary?</AccordionTrigger>
            <AccordionContent>
              Once your itinerary is generated, you can edit it by adding or removing activities, adjusting times, or
              making other changes to suit your preferences. Our platform is designed to be flexible and adapt to your
              needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Which destinations are supported?</AccordionTrigger>
            <AccordionContent>
              DayTrips.ai supports destinations worldwide. Our AI has been trained on global travel data and can
              generate itineraries for cities, towns, and regions across the globe. The quality of itineraries may vary
              depending on how much information is available about a particular destination.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>How do I book activities mentioned in my itinerary?</AccordionTrigger>
            <AccordionContent>
              For many activities, we provide direct links to official websites or trusted booking platforms like Viator
              where you can make reservations. We partner with reliable travel providers to ensure you have access to
              quality experiences at competitive prices.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>Can I use DayTrips.ai for multi-day trips?</AccordionTrigger>
            <AccordionContent>
              Currently, DayTrips.ai specializes in single-day itineraries. However, you can create multiple day trips
              for consecutive days if you're planning a longer vacation. We're working on adding multi-day trip planning
              features in the future.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>Are the affiliate links in the itineraries?</AccordionTrigger>
            <AccordionContent>
              Yes, some of the links to booking platforms and travel services in our itineraries are affiliate links.
              This means we may earn a small commission if you make a purchase through these links, at no additional
              cost to you. These partnerships help us keep DayTrips.ai free for everyone to use.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
