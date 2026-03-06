import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { CalendarMCPServer } from '@/lib/mcp/calendar-tools'

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
    const { startDate, endDate, durationMinutes, attendeeEmails } = body

    if (!startDate || !endDate || !durationMinutes) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
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

    const mcpServer = new CalendarMCPServer(accessToken, refreshToken)
    const result = await mcpServer.executeTool('find_free_slots', {
      startDate,
      endDate,
      durationMinutes,
      attendeeEmails: attendeeEmails || [],
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error finding free slots:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to find free slots' },
      { status: 500 }
    )
  }
}
