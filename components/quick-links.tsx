import Link from "next/link"
import { Wrench, FileText, Bell, Calendar } from 'lucide-react'

const links = [
  {
    href: "/work-order",
    icon: Wrench,
    label: "Submit Work Order"
  },
  {
    href: "/resources",
    icon: FileText,
    label: "View Resources"
  },
  {
    href: "/announcements",
    icon: Bell,
    label: "Announcements"
  },
  {
    href: "/events",
    icon: Calendar,
    label: "Building Events"
  }
]

export function QuickLinks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#63666A] mb-12">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {links.map((link, index) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="flex flex-col items-center p-6 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-16 w-16 rounded-full bg-[#FF8200] text-white flex items-center justify-center mb-4">
                <link.icon className="h-8 w-8" />
              </div>
              <span className="text-[#63666A] font-medium text-lg text-center">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
