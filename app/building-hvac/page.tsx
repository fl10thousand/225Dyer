import { Thermometer, Wind, Clock, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"

const buildingInfo = [
  {
    icon: Clock,
    title: "Building's Business Hours",
    content: (
      <>
        <p>Monday – Friday: 8:00 AM to 6:00 PM</p>
        <p>Saturday: 8:00 AM to 1:00 PM</p>
        <p>Sunday & Holidays: Closed for standard operations</p>
      </>
    ),
  },
  {
    icon: Wind,
    title: "HVAC Service Hours",
    content: (
      <>
        <p>HVAC services are provided 24 hours a day, 7 days a week for normal business use within tenant spaces.</p>
        <p>
          For Overtime HVAC services outside of designated business hours, please submit your request by 4:00 PM on the
          preceding business day.
        </p>
      </>
    ),
  },
  {
    icon: DollarSign,
    title: "Overtime HVAC Charges",
    content:
      "The standard charge for Overtime HVAC is $50.00 per hour per floor (subject to adjustments based on market rates).",
  },
  {
    icon: Thermometer,
    title: "Temperature and Humidity Requirements",
    content: (
      <>
        <p>As per ASHRAE standards, the following levels must be maintained within your tenant space:</p>
        <p>Summer (Cooling Season): 73°F to 79°F, with relative humidity between 40% to 60%.</p>
        <p>Winter (Heating Season): 68°F to 74°F, with relative humidity between 30% to 60%.</p>
      </>
    ),
  },
]

export default function BuildingHVACPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#FF8200] mb-6">Building HVAC Requirements and Requests</h1>

          <p className="text-gray-600 mb-8 text-lg">
            Our building is equipped with a state-of-the-art HVAC system to ensure comfort and efficiency. Please review
            the following information regarding building operations, HVAC services, and how to request adjustments.
          </p>

          <div className="grid grid-cols-1 gap-6">
            {buildingInfo.map((info, index) => (
              <Card key={index} className="border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#FF8200]/10 mt-1">
                    <info.icon className="h-6 w-6 text-[#FF8200]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#63666A] mb-2">{info.title}</h2>
                    <div className="text-gray-600">{info.content}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold text-[#63666A] mb-4">How to Request HVAC Adjustments</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>
                Log in to the work order system at{" "}
                <a
                  href="https://app.buildingengines.com/geofire/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF8200] hover:underline"
                >
                  Building Engines
                </a>
                .
              </li>
              <li>Select "HVAC" as the request type.</li>
              <li>Provide detailed information about the issue or requested adjustment.</li>
              <li>For Overtime HVAC requests, specify the date, time, and duration needed.</li>
              <li>Submit the request and await confirmation.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
