import { Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const contractors = [
  { name: "Otis Elevator", services: "Elevators", contact: "800-233-6847" },
  { name: "Delta Mechanical", services: "Heating and Cooling", contact: "(603) 539-6227" },
  { name: "Arden", services: "Heating and Cooling (LAB FLOORS)", contact: "401-727-3500" },
  { name: "Professional Piping", services: "Plumbing", contact: "508-644-2221" },
  { name: "Woods Rooter Service", services: "Plumbing", contact: "401-432-6405" },
  { name: "American Cleaning", services: "Cleaning", contact: "Supervisor 857-332-6342" },
  { name: "Ocean State Cleaning", services: "Cleaning", contact: "401-431-9050" },
  { name: "Milhench", services: "Janitorial and cleaning supplies", contact: "508-995-8331" },
  { name: "Modern Pest Services, LLC", services: "Pest Control", contact: "401-291-7422" },
  { name: "Clark the Locksmith", services: "Locksmith", contact: "(401) 331-8234" },
  { name: "Encore Fire Protection", services: "Fire alarms and sprinklers (PRIMARY)", contact: "(800) 966-0000" },
  { name: "Fire Systems Inc.", services: "Fire alarms and sprinklers", contact: "(508) 971-8151" },
  { name: "Foliaire", services: "Indoor Plants", contact: "(617) 357-5255" },
  {
    name: "The Gardeness",
    services: "Indoor Plants",
    contact: (
      <a
        href="https://www.the-gardeness.com/contact-us"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#FF8200] hover:underline"
      >
        Contact Form
      </a>
    ),
  },
  { name: "Plantasia", services: "Indoor Plants", contact: "(508) 399-7800" },
  { name: "Lizotte Glass", services: "Glass repair", contact: "(401) 722-6262" },
  { name: "Galaxy Integrated Systems", services: "Card Access System", contact: "(617) 202-6388" },
  { name: "JCI", services: "Building Management System", contact: "(866) 412-8075" },
  { name: "M. Neves", services: "Landscaping", contact: "(508) 636-6222" },
  { name: "Mark", services: "Snow removal", contact: "Call for additional salting or snow removal 774-501-8777" },
  { name: "Milton Cat", services: "Generator", contact: "(774) 278-7684" },
  { name: "Gil's Property Service", services: "Painting, Small construction projects", contact: "(401) 944-7156" },
  { name: "Ocean State Services", services: "Painting, Small construction Projects", contact: "401-431-9050" },
  { name: "Superior Electric", services: "Electrical", contact: "(401) 738-8822" },
  { name: "Bayberry Garden", services: "Catering", contact: "401-642-5013" },
  { name: "Pranzi Catering & Events", services: "Catering", contact: "401-383-3631" },
  { name: "Avenue Concept", services: "Art", contact: "401-490-0929" },
  { name: "Quality Rentals", services: "Tent Rentals", contact: "(401) 723-5555" },
  { name: "Rocket Fine Street Food", services: "Food Truck", contact: "860-689-55" },
  { name: "Burgundian", services: "Food Truck", contact: "774-331-2754" },
  { name: "Wickford Appliance", services: "Appliance repair and maintenance", contact: "(401) 297-3726" },
  { name: "Sign Design", services: "Signage and graphics", contact: "(508) 580-0094" },
]

export default function ContractorListPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#FF8200] mb-6">Approved Contractor List</h1>

          <p className="text-gray-600 mb-8 text-lg">
            Below is a list of approved contractors for tenant improvements and services at 225 Dyer Street. Please
            ensure to follow all building policies and procedures when engaging these contractors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contractors.map((contractor, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-[#FF8200]/10 mt-1">
                      <Briefcase className="h-6 w-6 text-[#FF8200]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#63666A] mb-2">{contractor.name}</h2>
                      <p className="text-gray-600 mb-2">
                        <strong>Services:</strong> {contractor.services}
                      </p>
                      <p className="text-gray-600">
                        <strong>Contact:</strong> {contractor.contact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center text-gray-500">
            <p>
              For questions about approved contractors or to request additions to this list, please contact the Building
              Management Office.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
