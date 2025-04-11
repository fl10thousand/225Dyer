import Link from "next/link"

const popularDestinations = [
  { slug: "new-york", name: "New York" },
  { slug: "san-francisco", name: "San Francisco" },
  { slug: "london", name: "London" },
  { slug: "paris", name: "Paris" },
  { slug: "tokyo", name: "Tokyo" },
  { slug: "sydney", name: "Sydney" },
  { slug: "rio-de-janeiro", name: "Rio de Janeiro" },
  { slug: "cape-town", name: "Cape Town" },
]

export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Popular Destinations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularDestinations.map((destination) => (
          <Link
            key={destination.slug}
            href={`/destinations/${destination.slug}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Discover day trips in and around {destination.name}</p>
            <span className="text-blue-600 dark:text-blue-400 font-medium">View day trips →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
