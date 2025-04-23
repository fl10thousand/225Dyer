import { Car, MapPin, Clock, CreditCard, AlertCircle, FileText } from 'lucide-react'
import { DownloadButton } from "@/components/download-button"

const parkingInfo = {
  location: {
    title: "Location",
    icon: MapPin,
    details: [
      "Clifford Street Garage",
      "75 Clifford Street, Providence, Rhode Island 02903",
      "Main: 401.458.6000",
      "Garage: 401.458.6338"
    ]
  },
  access: {
    title: "Access Information",
    icon: Clock,
    details: [
      "Use Prox-Card at entrance and exit",
      "One vehicle access per time period",
      "Must exit before next entry is allowed",
      "Restricted access cards have time limits"
    ]
  },
  fees: {
    title: "Fees and Payments",
    icon: CreditCard,
    details: [
      "Due by the first day of each month",
      "Pay by cash, check, or credit/debit card",
      "No separate invoices sent",
      "$25.00 fee for returned checks",
      "Cards cancelled if unpaid by 5th of month"
    ]
  },
  policies: {
    title: "Parking Policies",
    icon: Car,
    details: [
      "Park within designated space lines",
      "Handicapped spaces for authorized vehicles only",
      "Passes are non-transferable",
      "Report lost cards immediately ($20 replacement fee)"
    ]
  }
}

const additionalPolicies = [
  {
    title: "Forgotten Cards",
    content: "If you forget your card, get a ticket upon entry and report to the Garage office before exiting. A Supervisor will determine the action to be taken."
  },
  {
    title: "Cancellation and Reinstatement",
    content: "Notify the Garage office if cancelling to avoid additional charges. $10.00 fee for reinstating cancelled accounts. Reinstatement does not guarantee space availability."
  },
  {
    title: "Prorated Fees",
    content: "Initial purchases effective on or after the 15th of the month will be charged half the monthly fee. This does not apply to cancelled cards."
  },
  {
    title: "Temporary Suspensions",
    content: "Management may suspend parking privileges for unexpected situations. Advance notice will be given when possible. Adjustments made for suspensions exceeding 3 days."
  },
  {
    title: "Designated Parking Areas",
    content: "The RI Convention Center may require monthly parking customers to use specific areas of the facility. Signs will be posted and personnel available to assist."
  }
]

export default function ParkingInformationPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#63666A] mb-6">Parking Information</h1>
          
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <p className="text-lg text-gray-600 mb-6">
              Welcome to the Clifford Street Parking Facility. We ask that you read these policies and 
              procedures to ensure trouble-free parking. This agreement provides access to unreserved 
              parking space for an initial period of one month, renewable at the discretion of the RI Convention Center/SMG.
            </p>
            <DownloadButton />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {Object.values(parkingInfo).map((section) => (
              <div 
                key={section.title}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[#FF8200]/10">
                    <section.icon className="h-6 w-6 text-[#FF8200]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#63666A]">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.details.map((detail, index) => (
                    <li key={index} className="text-gray-600">{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#FF8200]/10">
                <FileText className="h-6 w-6 text-[#FF8200]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#63666A]">Additional Policies</h2>
            </div>
            <div className="space-y-6">
              {additionalPolicies.map((policy) => (
                <div key={policy.title} className="border-b border-gray-100 pb-6 last:border-0">
                  <h3 className="font-semibold text-[#63666A] mb-2">{policy.title}</h3>
                  <p className="text-gray-600">{policy.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-5 w-5 text-[#FF8200]" />
              <h3 className="font-semibold text-[#63666A]">Important Notice</h3>
            </div>
            <p className="text-gray-600">
              This contract is for access to parking ONLY. Neither the RI Convention Center/SMG nor its 
              representatives shall be responsible for your vehicle(s) or its (their) contents. By signing 
              the Monthly Parking Agreement, you agree to these policies and procedures.
            </p>
          </div>

          <div className="mt-8 text-center text-gray-500">
            <p>For additional parking information or to report any issues, please contact the Garage office.</p>
            <p className="mt-2">
              <a href="tel:4014586338" className="text-[#FF8200] hover:underline">(401) 458-6338</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
