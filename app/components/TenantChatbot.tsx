"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"

// Disclaimer text moved from openai.ts to the component
const Disclaimer = `
DISCLAIMER: This AI assistant provides information based on the available knowledge base for 225 Dyer Street. While we strive for accuracy, this information should not be considered as official or legally binding. For the most up-to-date and accurate information, please contact the property management directly.
`

// Define message type for better type safety
interface Message {
  role: "user" | "assistant"
  content: string
  suggestions?: string[]
}

export default function TenantChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userQuery = input.trim()
    setMessages((prev) => [...prev, { role: "user", content: userQuery }])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      // Call the API route
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userQuery }),
      })

      // Check if response is ok
      if (!response.ok) {
        console.error("API response not OK:", response.status, response.statusText)
        throw new Error(`Server error: ${response.status}`)
      }

      // Parse response as JSON
      const data = await response.json()
      console.log("API Response:", data)

      // Validate response format
      if (typeof data.response !== "string") {
        console.error("Invalid response format:", data)
        throw new Error("Invalid response format from server")
      }

      // Add assistant message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
        },
      ])
    } catch (error) {
      console.error("Error getting chatbot response:", error)
      setError(error instanceof Error ? error.message : "An error occurred")

      // Add error message from assistant
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later or contact property management directly for assistance.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Function to replace Building Engines text with link
  const formatBuildingEnginesLinks = (content: string) => {
    return content.replace(/Building Engines/g, "[Building Engines](https://app.buildingengines.com/geofire/login)")
  }

  return (
    <Card className="w-full bg-gray-900/50 border-gray-800 backdrop-blur-sm shadow-xl">
      <CardHeader className="border-b border-gray-800">
        <CardTitle className="flex items-center gap-2 text-orange-500">
          <MessageCircle className="h-5 w-5" />
          Virtual Assistant
        </CardTitle>
      </CardHeader>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-white p-2 m-2 rounded text-sm">Error: {error}</div>
      )}

      <CardContent className="h-[500px] overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <p>How can I help you today? Ask me about the building, services, or common issues.</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.role === "user" ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-100"
              }`}
            >
              {message.role === "assistant" ? (
                <>
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="text-orange-500 hover:text-orange-400 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  >
                    {formatBuildingEnginesLinks(message.content)}
                  </ReactMarkdown>

                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold text-gray-300">Suggestions:</p>
                      <ul className="list-disc list-inside text-sm text-gray-400">
                        {message.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}

        {/* Invisible element for auto-scrolling */}
        <div ref={messagesEndRef} />
      </CardContent>

      <CardFooter className="border-t border-gray-800 p-4">
        <form onSubmit={handleSubmit} className="w-full flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the building, services, or common issues..."
            className="flex-grow bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-orange-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>
      </CardFooter>

      <div className="text-xs text-gray-400 mt-4 px-4 pb-4 text-center">{Disclaimer}</div>
    </Card>
  )
}
