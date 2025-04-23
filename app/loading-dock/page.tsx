import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Truck, ArrowRight, CableCarIcon as Elevator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LoadingDockPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#FF8200] mb-6">Loading Dock Procedures</h1>
          <p className="text-gray-600 mb-8 text-lg">225 Dyer Street</p>

          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Please reserve the loading dock for any usage that exceeds 10 Minutes via this{" "}
                <Link
                  href="https://calendar.google.com/calendar/u/4?cid=YmFjYjhkNDk5NjkyNjllZDI5YWYwZWM5NDI1YmZjOTJiNGNiNTM4N2M1YTIwYjhmNjZhYzVmNDgzZTFlN2E5NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
                  className="text-[#FF8200] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LINK
                </Link>
                .
              </p>
              <p className="text-gray-600">
                Should you experience any issues reserving the loading dock please email David Konetski and Marta
                Tessier:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>konetski@cic.com</li>
                <li>marta.tessier@cic.com</li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#63666A] mb-4 flex items-center">
                <MapPin className="mr-2 h-6 w-6 text-[#FF8200]" />
                Location
              </h2>
              <p className="text-gray-600 mb-4">
                The loading dock is located at the back of the building. To access it, you need to come from Richmond
                St. Please note that due to the construction of a new building behind us that the temporary entrance
                point is from Dyer Street and not Richmond.
              </p>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20at%2010.56.34%E2%80%AFAM-xysj9zwNdY2uooPOgHP3z46U0fIBSQ.png"
                alt="Aerial view showing route to loading dock from Richmond Street, marked with blue arrows"
                width={800}
                height={450}
                className="rounded-lg shadow-md my-4"
              />
              <p className="text-gray-600">
                Once at the back of the building, you will find the loading dock at the far left side, if looking at the
                building.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#63666A] mb-4 flex items-center">
                <Phone className="mr-2 h-6 w-6 text-[#FF8200]" />
                Access Procedure
              </h2>
              <p className="text-gray-600 mb-4">
                If the loading dock door is closed, you will need to activate the camera phone, located to the right of
                the loading dock door.
              </p>
              <p className="text-gray-600 mb-4">
                Press the button as depicted in the image below. This will notify security, and they will open the
                loading dock door remotely.
              </p>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Camera%20phone%20.jpg-52ZN1AZopq2ABWsDQQ32tVpmmnGbgE.jpeg"
                alt="Loading dock doorbell and intercom system with sign reading 'LOADING DOCK DELIVERIES - RING DOORBELL FOR ACCESS'"
                width={400}
                height={533}
                className="rounded-lg shadow-md mb-4"
              />
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#63666A] mb-4 flex items-center">
                <Truck className="mr-2 h-6 w-6 text-[#FF8200]" />
                Truck Size and Entry
              </h2>
              <p className="text-gray-600 mb-4">Check the size of your truck before backing into the loading dock.</p>
              <p className="text-gray-600">To enter the building, go through the double doors.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#63666A] mb-4 flex items-center">
                <ArrowRight className="mr-2 h-6 w-6 text-[#FF8200]" />
                Navigating to Elevators
              </h2>
              <p className="text-gray-600 mb-4">To get to the elevators, go down the long hallway.</p>
              <p className="text-gray-600 mb-4">
                Go through the single door at the end of the hallway to get to the elevator.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#63666A] mb-4 flex items-center">
                <Elevator className="mr-2 h-6 w-6 text-[#FF8200]" />
                Elevator Usage
              </h2>
              <p className="text-gray-600">Please only use the elevator on the right that has moving pads in it.</p>
            </section>
          </div>

          <div className="mt-12">
            <Button asChild className="bg-[#FF8200] hover:bg-[#FF8200]/90">
              <Link href="/resources">Back to Resources</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
