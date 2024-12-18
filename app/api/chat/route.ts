// ./app/api/chat/route.ts
import { streamText } from 'ai'
import {openai} from "@ai-sdk/openai"


export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await streamText({
    // model: openai('ft:gpt-4o-mini-2024-07-18:nico-albanese::A2yUVqCW'),
    model: openai("gpt-4o-mini"),
    // Note: This has to be the same system prompt as the one
    // used in the fine-tuning dataset
    system: "YODA is an AI bot that speaks in the wise and cryptic style of Master Yoda, from Star Wars.",
    messages 
  })

  // Convert the response into a friendly text-stream
  return response.toDataStreamResponse()
}
