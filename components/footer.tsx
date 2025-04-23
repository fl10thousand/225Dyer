import { Building, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t py-12 bg-[#63666A] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-[#FF8200] flex items-center">
              <Building className="mr-2 h-5 w-5" /> About Us
            </h3>
            <p className="text-sm">
              225 Dyer Street is a state-of-the-art commercial building, providing a hub for innovation and collaboration in the heart of Providence.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[#FF8200]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-[#FF8200] transition-colors">Services</Link></li>
              <li><Link href="/documents" className="hover:text-[#FF8200] transition-colors">Documents</Link></li>
              <li><Link href="/contacts" className="hover:text-[#FF8200] transition-colors">Contacts</Link></li>
              <li><Link href="/emergency" className="hover:text-[#FF8200] transition-colors">Emergency</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[#FF8200] flex items-center">
              <Mail className="mr-2 h-5 w-5" /> Contact Us
            </h3>
            <p className="text-sm flex items-center">
              <Phone className="mr-2 h-4 w-4" /> (401) 262-7800
            </p>
            <p className="text-sm mt-2">
              225 Dyer Street<br />
              Providence, RI 02903
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[#FF8200]">Building Hours</h3>
            <p className="text-sm">
              Monday - Friday: 6:30 AM - 6:00 PM<br />
              Saturday: 8:00 AM - 1:00 PM<br />
              Sunday & Holidays: Card Access Only
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} 225 Dyer Street. All rights reserved.</p>
          <p className="mt-2">
            Designed and developed with <span className="text-[#FF8200]">♥</span> in Providence
          </p>
        </div>
      </div>
    </footer>
  )
}
