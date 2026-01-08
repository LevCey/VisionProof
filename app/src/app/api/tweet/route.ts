import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { tweetUrl } = await req.json()
  
  // Extract tweet ID from URL
  const tweetId = tweetUrl.split('/').pop()?.split('?')[0]
  
  if (!tweetId) {
    return NextResponse.json({ error: 'Invalid tweet URL' }, { status: 400 })
  }

  // Try Twitter API if bearer token exists
  if (process.env.TWITTER_BEARER_TOKEN) {
    try {
      const response = await fetch(
        `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=created_at,entities`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({
          text: data.data.text,
          created_at: data.data.created_at,
          hashtags: data.data.entities?.hashtags?.map((h: { tag: string }) => h.tag) || [],
          mentions: data.data.entities?.mentions?.map((m: { username: string }) => m.username) || [],
        })
      }
    } catch {
      // Fall through to manual input
    }
  }

  // Return indication that manual input is needed
  return NextResponse.json({ needsManualInput: true, tweetId })
}
