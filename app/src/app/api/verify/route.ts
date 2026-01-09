import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not set' }, { status: 500 })
    }

    const ai = new GoogleGenAI({ apiKey })
    const { tweetContent, rules } = await req.json()

    const prompt = `You are an AI verification agent for creator-brand agreements.

Verify if this tweet meets the campaign rules:

TWEET CONTENT:
${tweetContent}

CAMPAIGN RULES:
- Required hashtags: ${rules.hashtags.join(', ')}
- Required mentions: ${rules.mentions.join(', ')}

Respond ONLY with valid JSON (no markdown, no code blocks):
{"verified": true or false, "hashtag_check": true or false, "mention_check": true or false, "content_relevant": true or false, "confidence": 0.0 to 1.0, "reasoning": "brief explanation"}`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    })

    const text = response.text || ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Invalid AI response', raw: text }, { status: 500 })
    }
    
    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Verify API error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
