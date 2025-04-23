import { Wifi, Signal, Antenna, Settings2, Building2, Radio, Network, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

const strategies = [
  {
    icon: Antenna,
    title: "Distributed Antenna System (DAS)",
    content: "A network of antennas throughout the building to distribute and enhance cellular signals."
  },
  {
    icon: Signal,
    title: "Signal Boosters/Repeaters",
    content: "Strategic placement of signal boosters to amplify cellular coverage in specific areas."
  },
  {
    icon: Wifi,
    title: "Wi-Fi Calling",
    content: "Utilizing our robust Wi-Fi infrastructure to enable clear voice calls over the internet."
  },
  {
    icon: Building2,
    title: "Building Materials and Design",
    content: "Consideration of materials and architectural elements that affect signal propagation."
  },
  {
    icon: Radio,
    title: "Outdoor Antenna Placement",
    content: "Optimal positioning of external antennas to maximize signal reception."
  },
  {
    icon: Network,
    title: "Network Monitoring",
    content: "Continuous monitoring and optimization of network performance to ensure reliable connectivity."
  }
]

export default function HighSpeedInternetPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/"
            className="text-[#FF8200] hover:text-[#FF8200]/90 inline-flex items-center mb-6"
          >
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold text-[#FF8200] mb-8">
            High-Speed Internet and Cell Phone Signal Improvement
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#63666A] mb-4">High-Speed Internet</h2>
            <p className="text-gray-600 text-lg">
              Our building is equipped with state-of-the-art high-speed internet infrastructure to keep you connected and productive.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#63666A] mb-4">AT&T Cell Booster Pro</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <p className="text-gray-600">$699 non-recurring charge</p>
              <p className="text-gray-600">Optional Professional Installation $700.00 per trip</p>
              <p className="text-gray-600">Each device serves up to 64 simultaneous 4G LTE sessions, covers up to 15k square feet and is FirstNet compatible</p>
              <p className="text-gray-600">Add up to 3 total devices per physical address to serve up to 192 simultaneous 4G LTE sessions, covers up to 45k square feet, provides seamless call handling throughout coverage area and is FirstNet compatible</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#63666A] mb-4">Other Solutions</h2>
            <ul className="space-y-3 text-gray-600">
              <li>
                <a 
                  href="https://www.wilsonpro.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FF8200] hover:underline"
                >
                  WilsonPro
                </a>
                {' '}specializes in the review and installation of office cell phone boosters
              </li>
              <li>
                <a 
                  href="https://www.weboost.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FF8200] hover:underline"
                >
                  Weboost
                </a>
                {' '}is another provider of commercial grade cell phone boosters
              </li>
              <li>
                <a 
                  href="https://www.verizon.com/articles/cell-phone-signal-boosters/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FF8200] hover:underline"
                >
                  Verizon guide
                </a>
                {' '}on how to improve cell phone coverage
              </li>
              <li>WiFi calls have been successful for many users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#63666A] mb-6">
              Strategies for Improving Cell Phone Reliability
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategies.map((strategy) => (
                <Card key={strategy.title} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-[#FF8200]/10 mt-1">
                        <strategy.icon className="h-6 w-6 text-[#FF8200]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#63666A] mb-2">
                          {strategy.title}
                        </h3>
                        <p className="text-gray-600">{strategy.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <p className="mt-12 text-gray-600 text-center">
            By implementing these strategies, we aim to enhance cell phone reliability within our building, 
            providing better connectivity for all occupants and visitors.
          </p>
        </div>
      </div>
    </div>
  )
}
