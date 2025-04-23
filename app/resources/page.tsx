import Link from "next/link"
import { Wrench, FileText, AlertTriangle, Car, Calendar, Book, Briefcase, FileQuestion, Truck } from "lucide-react"

const resources = [
  {
    title: "Submit Work Order",
    icon: Wrench,
    href: "https://app.buildingengines.com/geofire/login",
    description: "Report maintenance issues and track their progress",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/documents",
    description: "Access important building documents and forms",
  },
  {
    title: "Emergency Procedures",
    icon: AlertTriangle,
    href: "/emergency-procedures",
    description: "Learn how to respond to various emergency situations",
  },
  {
    title: "Parking Information",
    icon: Car,
    href: "/parking-information",
    description: "Monthly parking policies and procedures",
  },
  {
    title: "Event Calendar",
    icon: Calendar,
    href: "/events",
    description: "Upcoming building events and maintenance schedules",
  },
  {
    title: "Tenant Handbook",
    icon: Book,
    href: "/tenant-handbook",
    description: "Comprehensive guide for tenants of 225 Dyer Street",
  },
  {
    title: "Contractor List",
    icon: Briefcase,
    href: "/contractor-list",
    description: "List of approved contractors for tenant improvements",
  },
  {
    title: "Building HVAC Requirements and Requests",
    icon: FileQuestion,
    href: "/building-hvac",
    description: "Information on HVAC Requirements and how to request adjustments",
  },
  {
    title: "Loading Dock Procedures",
    icon: Truck,
    href: "/loading-dock",
    description: "Guidelines for using the building's loading dock facilities",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-[#63666A] mb-4">Tenant Resources</h1>
        <p className="text-center text-gray-500 mb-12">
          Everything you need to make the most of your space at 225 Dyer Street
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Link
              href={resource.href}
              key={resource.title}
              className="block bg-[#FF8200] rounded-lg p-6 text-white hover:bg-[#FF8200]/90 transition-colors"
            >
              <div className="flex items-center mb-4">
                <resource.icon className="h-6 w-6 mr-3" />
                <h2 className="text-xl font-semibold">{resource.title}</h2>
              </div>
              <p className="text-white/90">{resource.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
