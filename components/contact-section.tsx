import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#63666A] mb-12">Get in Touch</h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input type="text" placeholder="First Name" required />
              <Input type="text" placeholder="Last Name" required />
            </div>
            <Input type="email" placeholder="Email Address" required />
            <Input type="tel" placeholder="Phone Number" />
            <Textarea placeholder="Your Message" rows={4} required />
            <Button type="submit" className="w-full bg-[#FF8200] hover:bg-[#FF8200]/90">Send Message</Button>
          </form>
        </div>
      </div>
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-[#63666A] mb-4">Need to reach the Project Director?</h3>
        <p className="text-gray-600 mb-4">
          For urgent matters or specific inquiries, you can contact our Project Director directly:
        </p>
        <div className="bg-white p-4 rounded-lg shadow-md inline-block">
          <p className="font-medium text-[#63666A]">Jane Doe</p>
          <p className="text-[#FF8200]">Project Director</p>
          <p className="text-gray-600">Email: jane.doe@225dyer.com</p>
          <p className="text-gray-600">Phone: (401) 555-0123</p>
        </div>
      </div>
    </section>
  )
}
