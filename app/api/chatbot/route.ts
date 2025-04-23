import { NextResponse } from "next/server"
import { searchKnowledgeBase, systemPrompt } from "@/utils/openai"
import { callOpenAI } from "@/utils/openai-server"

export const runtime = "edge" // Use edge runtime to ensure server-side execution

export async function POST(req: Request) {
  console.log("API route called")

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OpenAI API key")
    return NextResponse.json(
      {
        response: "I'm sorry, I'm not configured properly. Please contact the administrator.",
        suggestions: ["Contact property management at 401-262-7800"],
      },
      { status: 200 },
    )
  }

  try {
    // Parse request body
    const body = await req.json()
    const { message } = body

    if (!message) {
      return NextResponse.json(
        {
          response: "I need a question to help you. Could you please ask me something?",
          suggestions: [],
        },
        { status: 200 },
      )
    }

    console.log("Message received:", message)

    // Search knowledge base
    const knowledgeBaseInfo = searchKnowledgeBase(message)
    console.log("Knowledge base search result:", knowledgeBaseInfo ? "Found matching info" : "No match found")

    let prompt = message
    const suggestions = knowledgeBaseInfo?.suggestions || []

    if (knowledgeBaseInfo) {
      // Format prompt with knowledge base info
      prompt = `${message}

Relevant information from the knowledge base:
${JSON.stringify(knowledgeBaseInfo, null, 2)}

Please use this information to provide a detailed and accurate response. If there are any URLs, format them as clickable markdown links.`
    }

    // Use a mock response for development/testing if needed
    if (process.env.VERCEL_ENV === "development" && process.env.USE_MOCK_RESPONSES === "true") {
      console.log("Using mock response")
      return NextResponse.json({
        response: `This is a mock response for: "${message}".\n\nPlease configure your OpenAI API key for real responses.`,
        suggestions: ["Configure OpenAI API key", "Try a different question"],
      })
    }

    // Call OpenAI API using our server-side utility
    console.log("Calling OpenAI API...")
    try {
      const responseContent = await callOpenAI(systemPrompt, prompt)

      console.log("OpenAI API response received")

      return NextResponse.json({
        response: responseContent,
        suggestions: suggestions,
      })
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError)
      return NextResponse.json({
        response: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        suggestions: ["Try asking a different question", "Contact property management directly"],
      })
    }
  } catch (error) {
    console.error("Error in chatbot API route:", error)
    return NextResponse.json({
      response: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
      suggestions: ["Contact property management at 401-262-7800"],
    })
  }
}
