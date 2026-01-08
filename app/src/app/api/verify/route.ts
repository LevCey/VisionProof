import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: NextRequest) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const { tweetContent, rules } = await req.json()

  const prompt = `You are an AI verification agent for creator-brand agreements.

Verify if this tweet meets the campaign rules:

TWEET CONTENT:
${tweetContent}

CAMPAIGN RULES:
- Required hashtags: ${rules.hashtags.join(', ')}
- Required mentions: ${rules.mentions.join(', ')}

Respond ONLY with valid JSON (no markdown):
{
  "verified": boolean,
  "hashtag_check": boolean,
  "mention_check": boolean,
  "content_relevant": boolean,
  "confidence": number between 0 and 1,
  "reasoning": "brief explanation"
}`

  const result = await model.generateContent(prompt)
  const text = result.response.text()
  
  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  const parsed = JSON.parse(jsonMatch?.[0] || '{}')
  
  return NextResponse.json(parsed)
}
