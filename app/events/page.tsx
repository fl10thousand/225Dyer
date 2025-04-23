import { EventsList } from "@/components/events-list"

export default function EventsPage() {
  return (
    <div className="min-h-screen py-8">
      <h1 className="text-4xl font-bold text-center text-[#63666A] mb-8">Building Events</h1>
      <EventsList />
    </div>
  )
}
