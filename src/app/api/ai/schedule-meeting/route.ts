import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { MeetingAIAgent } from '@/lib/ai/meeting-agent'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const accessToken = (session as any).accessToken
    const refreshToken = (session as any).refreshToken

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'Calendar access not available. Please sign in again with Google.',
        },
        { status: 403 }
      )
    }

    const agent = new MeetingAIAgent(accessToken, refreshToken)
    const result = await agent.scheduleMeetingFromPrompt(prompt)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error in AI schedule meeting:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process request' },
      { status: 500 }
    )
  }
}
