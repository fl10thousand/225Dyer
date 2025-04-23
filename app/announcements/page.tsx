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
                Smart Market by Bayberry Garden Now Open in Our Lobby!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We're excited to announce that the autonomous Smart Market by Bayberry Garden (DBA g&m Market) is now
                open in our lobby!
              </p>
              <h3 className="text-xl font-semibold text-[#63666A] mb-2">What You'll Find:</h3>
              <ul className="list-none space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>
                    <strong>Fresh, Healthy Options:</strong> The market offers a variety of fresh snacks and meals
                    prepared by the talented team at Bayberry Garden.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>
                    <strong>24/7 Convenience:</strong> Tenants have round-the-clock access to nutritious food options
                    right in the building.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>
                    <strong>Easy Access:</strong> The Smart Market is conveniently located in the lobby's corner nook,
                    seamlessly blending with our existing metalwork and décor.
                  </span>
                </li>
              </ul>
              <p className="text-gray-600">
                We hope you enjoy this new amenity! Please let us know your feedback as you try out the various
                offerings from the Smart Market.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
