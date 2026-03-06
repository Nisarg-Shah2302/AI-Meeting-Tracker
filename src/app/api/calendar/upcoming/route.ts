import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { CalendarMCPServer } from '@/lib/mcp/calendar-tools'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const maxResults = parseInt(searchParams.get('maxResults') || '10')

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
    const result = await mcpServer.executeTool('list_upcoming_meetings', { maxResults })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error fetching upcoming meetings:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch meetings' },
      { status: 500 }
    )
  }
}
