import Link from "next/link"
import { Wrench, FileText, Bell, Calendar, Wind } from "lucide-react"

const actions = [
  {
    href: "https://app.buildingengines.com/geofire/login",
    icon: Wrench,
    label: "Submit Work Order",
  },
  {
    href: "/resources",
    icon: FileText,
    label: "View Resources",
  },
  {
    href: "https://kiosk.kaiterra.com/2QRDZ8I1ZMVMM39Z",
    icon: Wind,
    label: "Indoor Air Quality",
  },
  {
    href: "/announcements",
    icon: Bell,
    label: "Announcements",
  },
  {
    href: "/events",
    icon: Calendar,
    label: "Building Events",
  },
]

export function QuickActions() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center justify-center p-3 aspect-square bg-white border border-gray-200 rounded-md hover:border-[#FF8200] transition-colors"
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <div className="text-[#FF8200] mb-1">
                <action.icon className="h-8 w-8" />
              </div>
              <span className="text-[#63666A] font-medium text-center text-xs">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
