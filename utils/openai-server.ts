// We'll use a fetch-based approach that works well with Edge runtime
export async function callOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error("OpenAI API key is not configured")
  }

  // Use fetch directly instead of the OpenAI client
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`OpenAI API error: ${response.status} ${JSON.stringify(errorData)}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || "Sorry, I couldn't generate a response."
}
