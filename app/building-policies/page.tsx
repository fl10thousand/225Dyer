import { Clock, Trash2, Cigarette, PawPrint, Bike, Shield, Lock, Truck } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const policies = [
  {
    icon: Clock,
    title: "Building Hours",
    content: "The Project's hours of operation are 8:00 AM to 6:00 PM, Monday through Friday, and 8:00 AM through 1:00 PM on Saturdays. Tenants have 24/7/365 access to their premises."
  },
  {
    icon: Trash2,
    title: "Waste Management",
    content: "Tenants must comply with all waste regulations, including proper sorting and recycling of waste products. Hazardous materials must be stored and transported in appropriate containers."
  },
  {
    icon: Cigarette,
    title: "No Smoking",
    content: "Smoking is prohibited throughout the entire Project."
  },
  {
    icon: PawPrint,
    title: "Animals",
    content: "No animals are permitted in the Project, except for service animals."
  },
  {
    icon: Bike,
    title: "Bicycles",
    content: "Bicycles must be stored in designated areas only. They are not allowed in elevators or stairways. Hoverboards are prohibited in the Building and the Project."
  },
  {
    icon: Shield,
    title: "Safety Procedures",
    content: "Tenants must comply with all safety, fire protection, and evacuation procedures established by Landlord or any Governmental Authority."
  },
  {
    icon: Lock,
    title: "Security",
    content: "Tenants are responsible for protecting their premises from theft and must cooperate with all reasonable security programs affecting the Premises."
  },
  {
    icon: Truck,
    title: "Loading Dock Procedures",
    content: "The loading dock is located at the back of the building, accessible from Richmond St. Please follow these procedures:"
  }
]

export default function BuildingPoliciesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#FF8200] mb-6">Building Policies</h1>
          
          <p className="text-gray-600 mb-12 text-lg">
            These policies are designed to ensure a safe, clean, and comfortable environment for all tenants and visitors of 225 Dyer Street. Please familiarize yourself with these guidelines and adhere to them at all times.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policies.map((policy) => (
              <Card key={policy.title} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-[#FF8200]/10 mt-1">
                      <policy.icon className="h-6 w-6 text-[#FF8200]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#63666A] mb-3">{policy.title}</h2>
                      <p className="text-gray-600 leading-relaxed">{policy.content}</p>
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
