"use server"

import { sendEmail } from "@/utils/gmail"

export async function sendWorkOrder(formData: FormData) {
  try {
    const tenant = formData.get("tenant") as string
    const floor = formData.get("floor") as string
    const suite = formData.get("suite") as string
    const priority = formData.get("priority") as string
    const description = formData.get("description") as string

    if (!tenant || !floor || !suite || !priority || !description) {
      return { success: false, message: "Please fill in all fields." }
    }

    const subject = `New Work Order - ${priority} Priority`
    const message = `
Tenant: ${tenant}
Location: Floor ${floor}, Suite ${suite}
Priority: ${priority}
Description: ${description}
    `.trim()

    // Log the work order details for debugging
    console.log("Submitting work order:", { subject, message })

    const result = await sendEmail(subject, message)
    console.log("Send email result:", result)

    if (result.success) {
      return { success: true, message: result.message || "Work order submitted successfully!" }
    } else {
      throw new Error(result.message || "Failed to send email")
    }
  } catch (error) {
    console.error("Error in sendWorkOrder:", error)
    return {
      success: false,
      message: error.message || "An unexpected error occurred. Please try again.",
    }
  }
}
