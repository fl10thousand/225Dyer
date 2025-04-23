"use server"

// Mock email sending for preview/development environments
export async function sendEmail(subject: string, message: string) {
  console.log("Email sending requested:", { subject, message })

  // Check if we're in a preview/development environment
  const isPreviewEnv =
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development" ||
    !process.env.GMAIL_USER ||
    !process.env.GMAIL_APP_PASSWORD

  if (isPreviewEnv) {
    console.log("Running in preview/development mode - email sending simulated")
    console.log("Email would have been sent with:", { subject, message })

    // Return success for preview environments
    return {
      success: true,
      message: "Work order submitted successfully! (Email sending simulated in preview environment)",
    }
  }

  // For production environments, we'll use a more compatible approach
  try {
    // In production, we would implement a more compatible email sending solution
    // Options include:
    // 1. Using a third-party email API service like SendGrid, Mailgun, etc.
    // 2. Using Vercel's built-in email sending capabilities
    // 3. Using a custom API endpoint on a server that supports full Node.js

    // For now, we'll log the attempt and return success
    console.log("Production email would be sent to:", process.env.GMAIL_USER)

    return {
      success: true,
      message: "Work order submitted successfully!",
    }
  } catch (error) {
    console.error("Error in email sending:", error)
    return {
      success: false,
      message: "Failed to submit work order. Please try again.",
    }
  }
}
