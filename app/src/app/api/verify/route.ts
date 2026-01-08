import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const { tweetContent, rules } = await req.json()

  const prompt = `You are an AI verification agent for creator-brand agreements.

Verify if this tweet meets the campaign rules:

TWEET CONTENT:
${tweetContent}

CAMPAIGN RULES:
- Required hashtags: ${rules.hashtags.join(', ')}
- Required mentions: ${rules.mentions.join(', ')}

Respond in JSON format:
{
  "verified": boolean,
  "hashtag_check": boolean,
  "mention_check": boolean,
  "content_relevant": boolean,
  "confidence": number (0-1),
  "reasoning": "brief explanation"
}`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  })

  const result = JSON.parse(response.choices[0].message.content || '{}')
  
  return NextResponse.json(result)
}
