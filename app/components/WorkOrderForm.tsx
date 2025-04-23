"use client"

import { useState } from "react"
import { sendWorkOrder } from "../actions/sendWorkOrder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"

export default function WorkOrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [tenant, setTenant] = useState("")
  const [floor, setFloor] = useState("")
  const [suite, setSuite] = useState("")
  const [priority, setPriority] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")
    setIsSuccess(false)

    const formData = new FormData()
    formData.append("tenant", tenant)
    formData.append("floor", floor)
    formData.append("suite", suite)
    formData.append("priority", priority)
    formData.append("description", description)

    try {
      const result = await sendWorkOrder(formData)
      setIsSuccess(result.success)
      setMessage(result.message)

      if (result.success) {
        // Reset form
        setTenant("")
        setFloor("")
        setSuite("")
        setPriority("")
        setDescription("")
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full bg-gray-900/50 border-gray-800 backdrop-blur-sm shadow-xl">
      <CardHeader className="border-b border-gray-800">
        <CardTitle className="flex items-center gap-2 text-orange-500">
          <ClipboardList className="h-5 w-5" />
          Submit Work Order
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="tenant" className="text-sm font-medium text-gray-200">
              Tenant
            </label>
            <Select value={tenant} onValueChange={setTenant}>
              <SelectTrigger className="w-full bg-gray-800/50 border-gray-700 text-white focus:ring-orange-500">
                <SelectValue placeholder="Select Tenant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ariston">Ariston</SelectItem>
                <SelectItem value="brown">Brown</SelectItem>
                <SelectItem value="brown-lab">Brown Lab</SelectItem>
                <SelectItem value="bayberry">Bayberry</SelectItem>
                <SelectItem value="cic">CIC</SelectItem>
                <SelectItem value="connexion">Connexion</SelectItem>
                <SelectItem value="dhall">DHall</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="floor" className="text-sm font-medium text-gray-200">
                Floor
              </label>
              <Select value={floor} onValueChange={setFloor}>
                <SelectTrigger className="w-full bg-gray-800/50 border-gray-700 text-white focus:ring-orange-500">
                  <SelectValue placeholder="Select Floor" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7].map((floorNumber) => (
                    <SelectItem key={floorNumber} value={floorNumber.toString()}>
                      {floorNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="suite" className="text-sm font-medium text-gray-200">
                Suite Number
              </label>
              <Input
                id="suite"
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
                placeholder="Enter Suite Number"
                className="w-full bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium text-gray-200">
              Priority
            </label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-full bg-gray-800/50 border-gray-700 text-white focus:ring-orange-500">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-200">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail..."
              className="w-full h-24 md:h-32 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-orange-500"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Work Order"}
          </Button>
        </form>
      </CardContent>
      {message && (
        <CardFooter className="border-t border-gray-800 p-4 md:p-6">
          <p className={`w-full text-center ${isSuccess ? "text-green-500" : "text-red-500"}`}>{message}</p>
        </CardFooter>
      )}
    </Card>
  )
}
