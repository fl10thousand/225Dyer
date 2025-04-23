import { FileText, FileSpreadsheet, AlertTriangle, ClipboardList, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const documents = [
  {
    icon: FileText,
    title: "Tenant Handbook",
    description: "Comprehensive guide for tenants",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Procedures",
    description: "Emergency procedures and evacuation guidelines",
  },
  {
    icon: FileSpreadsheet,
    title: "Parking Application",
    description: "Monthly parking agreement for Clifford Street Garage",
  },
  {
    icon: ClipboardList,
    title: "Common Area Request Form",
    description: "Form for requesting use of common areas",
  },
  {
    icon: Shield,
    title: "COI Sample Document",
    description: "Sample Certificate of Insurance document",
  },
]

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-[#63666A] mb-8">Important Documents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <Card key={doc.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-[#FF8200]/10">
                  <doc.icon className="h-6 w-6 text-[#FF8200]" />
                </div>
                <CardTitle>{doc.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{doc.description}</CardDescription>
            </CardContent>
            <CardContent>
              {doc.title === "Tenant Handbook" ? (
                <Link
                  href="https://zquyeqrtcl79zjs6.public.blob.vercel-storage.com/Master%20Tenant%20Handbook%206.27.2024-2-JXQmOvJPUI8cQyKzaKvcPPolnCZyR2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#FF8200] hover:bg-[#FF8200]/90">View Document</Button>
                </Link>
              ) : doc.title === "Emergency Procedures" ? (
                <Link
                  href="https://zquyeqrtcl79zjs6.public.blob.vercel-storage.com/Tenant%20Emergency%20Procedures%20&%20Evac%20Handbook%201.1.2025-k3o6L5tV0RtmtZBYp52VyehdgR7rp5.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#FF8200] hover:bg-[#FF8200]/90">View Document</Button>
                </Link>
              ) : doc.title === "Parking Application" ? (
                <Link
                  href="https://zquyeqrtcl79zjs6.public.blob.vercel-storage.com/Parking%20app-BmdVu95Q5LYXmwfx1I860pNEUVGR0t.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#FF8200] hover:bg-[#FF8200]/90">View Document</Button>
                </Link>
              ) : doc.title === "Common Area Request Form" ? (
                <Link
                  href="https://zquyeqrtcl79zjs6.public.blob.vercel-storage.com/request-for-use-of-common-area-bz4vsd5jhW4sezK9IvtmeOH1Cj56Hb.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#FF8200] hover:bg-[#FF8200]/90">View Document</Button>
                </Link>
              ) : doc.title === "COI Sample Document" ? (
                <Link
                  href="https://zquyeqrtcl79zjs6.public.blob.vercel-storage.com/Sample%20COI%20-juob8Y4veO7i4xbUzqC5CLI50RlcI5.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#FF8200] hover:bg-[#FF8200]/90">View Document</Button>
                </Link>
              ) : (
                <Button className="w-full bg-[#FF8200] hover:bg-[#FF8200]/90">View Document</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
