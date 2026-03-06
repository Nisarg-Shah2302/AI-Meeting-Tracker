import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { MeetingAIAgent } from '@/lib/ai/meeting-agent'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in with Google' },
        { status: 401 }
      )
    }

    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const agent = new MeetingAIAgent(
      session.accessToken as string,
      session.refreshToken as string
    )

    const response = await agent.processRequest(prompt)

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('AI Scheduler API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
