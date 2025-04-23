import dynamic from "next/dynamic"
import { Header } from "@/app/components/Header"
import TenantChatbot from "./components/TenantChatbot"

const WorkOrderForm = dynamic(() => import("./components/WorkOrderForm"), {
  loading: () => <div className="w-full h-[600px] bg-gray-900 rounded-lg animate-pulse" />,
})

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Tenant <span className="text-orange-500">Assistant</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TenantChatbot />
            <WorkOrderForm />
          </div>
        </div>
      </main>
    </div>
  )
}
