import { BookText, Phone, Key, Wrench, Users, ScrollText } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const sections = [
  {
    icon: BookText,
    title: "Welcome",
    content: "CIC Property Management welcomes you to the Providence Innovation Center, the newest addition to the up and coming Innovation and Design District of Downtown Providence. This building serves as an inclusive hub focused on innovation and collaboration across various disciplines. Our goal is to provide a dynamic and supportive environment for businesses of all sizes and sectors. We're committed to fostering a community that encourages creativity, growth, and success for all our tenants."
  },
  {
    icon: Phone,
    title: "Contacting Building Management",
    content: "The Building Management Office can be found on the first floor of the building in Suite 121, across the hall from the mail room. For questions or concerns, please contact us at [email protected] or call us at 555-1212. For maintenance requests, please use our online system at https://app.buildingengines.com/geofire/login. We aim to respond to all requests within 24 hours."
  },
  {
    icon: Key,
    title: "Building Access",
    content: "The building is open to the public during normal business hours (8:00 AM - 6:00 PM, Monday-Friday). Access is granted via keycard after hours. Lost keycards should be reported immediately to Building Management. For after-hours access, please contact Security at 508-207-7046. Emergency exits are located on each floor and clearly marked."
  },
  {
    icon: Wrench,
    title: "Building Services",
    content: "We provide a range of services to ensure a comfortable and productive work environment. These include: Janitorial Services (daily cleaning of common areas Monday-Friday, excluding holidays), Work Order Assistance (submit work orders through our online system for prompt attention), Security (24/7 security monitoring and on-site security personnel during business hours), and Bike Storage (secure bike storage is available in the basement, please register your bike with Building Management)."
  },
  {
    icon: Users,
    title: "Tenant Move-In Procedures",
    content: "To ensure a smooth move-in process, please follow these steps: 1. Appoint a Move-In Coordinator to act as the primary point of contact. 2. Notify Building Management of your planned move-in date and time at least 48 hours in advance. 3. Coordinate with Building Management to schedule elevator access and any necessary assistance."
  },
  {
    icon: ScrollText,
    title: "Rules and Regulations",
    content: "For detailed rules and regulations regarding building access, use of common areas, signage, deliveries, and other important guidelines, please refer to the complete handbook. Key areas covered include: Building Access Hours and Procedures, Common Area Usage, Maintenance Requests, and Emergency Procedures."
  }
]

export default function TenantHandbookPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold text-[#FF8200] mb-2">Tenant Handbook</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section) => (
              <Card key={section.title} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-[#FF8200]/10 mt-1">
                      <section.icon className="h-6 w-6 text-[#FF8200]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#63666A] mb-3">{section.title}</h2>
                      <p className="text-gray-600 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
