import {
  AlertTriangle,
  Phone,
  FireExtinguisher,
  AmbulanceIcon as FirstAid,
  TornadoIcon as Hurricane,
  Shield,
  Workflow,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const HANDBOOK_URL =
  "https://zquyeqrtcl79zjs6.public.blob.vercel-storage.com/Tenant%20Emergency%20Procedures%20&%20Evac%20Handbook%201.1.2025-k3o6L5tV0RtmtZBYp52VyehdgR7rp5.pdf"

const procedures = [
  {
    icon: Phone,
    title: "Emergency Contacts",
    content:
      "For immediate emergencies, call 911. For building-related emergencies, contact Security at 508-207-7046 or the Property Manager at 401-262-7800. Security staff is available 24/7.",
  },
  {
    icon: FireExtinguisher,
    title: "Fire Emergency",
    content:
      "If you discover a fire: 1. Pull the nearest fire alarm 2. Call 911 3. Evacuate the building using nearest exit or stairwell 4. Do not use elevators 5. Proceed to designated assembly area 6. Wait for all-clear from emergency personnel",
  },
  {
    icon: FirstAid,
    title: "Medical Emergency",
    content:
      "1. Call 911 immediately 2. Notify Security at 508-207-7046 3. If trained, provide first aid 4. Do not move the person unless they are in immediate danger 5. Have someone meet emergency responders to direct them to the location",
  },
  {
    icon: Hurricane,
    title: "Severe Weather",
    content:
      "During severe weather events: 1. Stay away from windows 2. Follow instructions from building management 3. Be prepared to move to lower levels if necessary 4. Monitor local weather updates and building communications",
  },
  {
    icon: Shield,
    title: "Security Threats",
    content:
      "For suspicious activities or security concerns: 1. Contact Security immediately 2. Report any suspicious packages or persons 3. Do not confront suspicious individuals 4. Follow security personnel instructions 5. Be prepared to shelter in place if directed",
  },
  {
    icon: Workflow,
    title: "Evacuation Procedures",
    content:
      "1. Know your primary and secondary evacuation routes 2. Use stairs, not elevators 3. Follow instructions from floor wardens and emergency personnel 4. Proceed to designated assembly area 5. Do not re-enter the building until authorized",
  },
]

export default function EmergencyProceduresPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-8 w-8 text-[#FF8200]" />
            <h1 className="text-4xl font-bold text-[#FF8200]">Emergency Procedures</h1>
          </div>

          <p className="text-gray-600 mb-6 text-lg">
            These procedures are designed to ensure the safety of all occupants during emergency situations. Please
            familiarize yourself with these procedures and keep this information readily accessible.
          </p>

          <p className="text-gray-600 mb-12 text-lg">
            For a comprehensive guide on emergency procedures, please refer to the{" "}
            <Link
              href={HANDBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF8200] hover:underline"
            >
              Tenant Emergency Procedures & Evacuation Handbook
            </Link>{" "}
            (Updated: 1/1/25).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {procedures.map((procedure) => (
              <Card key={procedure.title} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-[#FF8200]/10 mt-1">
                      <procedure.icon className="h-6 w-6 text-[#FF8200]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#63666A] mb-3">{procedure.title}</h2>
                      <p className="text-gray-600 leading-relaxed">{procedure.content}</p>
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
