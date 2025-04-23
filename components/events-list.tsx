import { CalendarIcon } from "lucide-react"
import Link from "next/link"

type Event = {
  title: string
  date: Date
  startTime: string
  endTime?: string
  description: string
}

const events: Event[] = [
  {
    title: "Fire Alarm Testing - 1st & 2nd floors",
    date: new Date(2025, 6, 15), // Month is 0-indexed, so 6 is July
    startTime: "8:00 AM",
    endTime: "4:00 PM",
    description: "Fire alarm testing for 1st and 2nd floors.",
  },
  {
    title: "Fire Alarm Testing - 7th floor & Penthouse devices, A/V's",
    date: new Date(2025, 9, 14), // Month is 0-indexed, so 9 is October
    startTime: "8:00 AM",
    endTime: "4:00 PM",
    description: "Annual fire alarm testing for 7th floor and Penthouse devices.",
  },
  {
    title: "OTIS on site - Annual elevators inspections",
    date: new Date(2025, 3, 25), // Month is 0-indexed, so 3 is April
    startTime: "7:00 AM",
    endTime: "9:00 AM",
    description: "Throughout the day one elevator will be taken out of service for inspection.",
  },
]

export function EventsList({ limit }: { limit?: number }) {
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())

  // Limit the number of events if specified
  const displayedEvents = limit ? sortedEvents.slice(0, limit) : sortedEvents

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#63666A] mb-8">Upcoming Events</h2>
        <div className="space-y-6">
          {displayedEvents.map((event, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-2">
                <CalendarIcon className="h-5 w-5 text-[#FF8200] mr-2" />
                <span className="text-lg font-semibold text-[#63666A]">{event.title}</span>
              </div>
              <p className="text-[#63666A] mb-2">
                {event.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-[#63666A]">
                {event.startTime}
                {event.endTime ? ` - ${event.endTime}` : ""} (EDT)
              </p>
              <p className="text-gray-600 mt-2">{event.description}</p>
            </div>
          ))}
        </div>
        {limit && events.length > limit && (
          <div className="mt-8 text-center">
            <Link
              href="/events"
              className="inline-block bg-[#FF8200] text-white px-6 py-2 rounded-md hover:bg-[#FF8200]/90 transition-colors"
            >
              View All Events
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
