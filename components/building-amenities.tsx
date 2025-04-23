import { Bike, Utensils, Wifi, Users, ShowerHeadIcon as Shower } from 'lucide-react'
import Link from 'next/link'

const amenities = [
  {
    icon: Bike,
    title: "Bike Room",
    description: "Secure storage on the first floor"
  },
  {
    icon: Utensils,
    title: "Bayberry Garden",
    description: "On-site restaurant celebrating coastal New England's traditions and flavors",
    href: "https://www.bayberrygarden.com"
  },
  {
    icon: Wifi,
    title: "High-Speed Internet",
    description: "Stay connected with our advanced internet infrastructure",
    href: "/high-speed-internet"
  },
  {
    icon: Users,
    title: "District Hall",
    description: "Public innovation center with inspiring spaces to host your meetings and events",
    href: "https://cic.com/providence/event-spaces/"
  },
  {
    icon: Shower,
    title: "Showers & Lockers",
    description: "Located on the first floor. Free lockers available; keys can be obtained at security desk."
  }
]

export function BuildingAmenities() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-[#63666A] mb-8">Building Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {amenities.map((amenity) => (
            <div key={amenity.title} className="text-center">
              <div className="text-[#FF8200] mb-4">
                <amenity.icon className="h-8 w-8 mx-auto" />
              </div>
              {amenity.href ? (
                amenity.href.startsWith('http') ? (
                  <a 
                    href={amenity.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FF8200] transition-colors group"
                  >
                    <h3 className="font-medium text-[#63666A] mb-2 group-hover:glow-orange">{amenity.title}</h3>
                  </a>
                ) : (
                  <Link 
                    href={amenity.href}
                    className="hover:text-[#FF8200] transition-colors group"
                  >
                    <h3 className="font-medium text-[#63666A] mb-2 group-hover:glow-orange">{amenity.title}</h3>
                  </Link>
                )
              ) : (
                <h3 className="font-medium text-[#63666A] mb-2">{amenity.title}</h3>
              )}
              <p className="text-sm text-gray-500">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
