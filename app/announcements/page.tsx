import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-[#63666A] mb-8">Announcements</h1>
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#FF8200] flex items-center">
                <CalendarIcon className="mr-2" />
                Exciting News: Bayberry Garden's Smart Market is Coming to Our Lobby!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We're thrilled to announce that an autonomous Smart Market by Bayberry Garden (DBA g&m Market) has been
                approved and will be installed in our lobby in the second week of March!
              </p>
              <h3 className="text-xl font-semibold text-[#63666A] mb-2">What to Expect:</h3>
              <ul className="list-none space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>
                    <strong>24/7 Convenience:</strong> Tenants will have round-the-clock access to fresh, healthy food
                    options, all curated by the chef of Bayberry Garden.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>
                    <strong>Health & Wellness Focus:</strong> This amenity aligns with our commitment to tenant
                    wellness, offering high-quality, nutritious meals and snacks right in the building.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>
                    <strong>Thoughtful Design:</strong> The Smart Market will be placed in the lobby's corner nook,
                    ensuring accessibility while maintaining the space's clean and open aesthetic. The design will
                    seamlessly blend with our existing metalwork and décor.
                  </span>
                </li>
              </ul>
              <p className="text-gray-600">
                Stay tuned for more details as we get closer to the launch date. We're confident this addition will be a
                valuable and well-received amenity for our tenants!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
