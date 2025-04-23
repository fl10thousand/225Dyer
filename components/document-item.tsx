import { TypeIcon as type, type LucideIcon } from "lucide-react"
import Link from "next/link"

interface DocumentItemProps {
  document: {
    icon: LucideIcon
    title: string
    description: string
    fileUrl: string
  }
}

export function DocumentItem({ document }: DocumentItemProps) {
  return (
    <>
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-lg bg-[#FF8200]/10 mr-4">
          <document.icon className="h-6 w-6 text-[#FF8200]" />
        </div>
        <h2 className="text-xl font-semibold text-[#63666A]">{document.title}</h2>
      </div>
      <p className="text-gray-600 mb-4 flex-grow">{document.description}</p>
      <Link
        href="https://zquyeqrtcl79zjs6.public.blob.vercel-storage.com/request-for-use-of-common-area-bz4vsd5jhW4sezK9IvtmeOH1Cj56Hb.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#FF8200] hover:bg-[#FF8200]/90 text-white w-full py-2 px-4 rounded text-center transition-colors"
      >
        View Document
      </Link>
    </>
  )
}
