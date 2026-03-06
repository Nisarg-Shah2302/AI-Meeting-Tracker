import { GoogleCalendarService } from '../services/google-calendar'

export interface MCPTool {
  name: string
  description: string
  inputSchema: {
    type: string
    properties: Record<string, any>
    required: string[]
  }
}

export const calendarTools: MCPTool[] = [
  {
    name: 'find_free_slots',
    description: 'Find available time slots in the calendar for scheduling meetings. Analyzes calendar availability and suggests optimal meeting times.',
    inputSchema: {
      type: 'object',
      properties: {
        startDate: {
          type: 'string',
          description: 'Start date for searching (ISO 8601 format)',
        },
        endDate: {
          type: 'string',
          description: 'End date for searching (ISO 8601 format)',
        },
        durationMinutes: {
          type: 'number',
          description: 'Duration of the meeting in minutes',
        },
        attendeeEmails: {
          type: 'array',
          items: { type: 'string' },
          description: 'Email addresses of attendees to check availability',
        },
      },
      required: ['startDate', 'endDate', 'durationMinutes'],
    },
  },
  {
    name: 'create_meeting',
    description: 'Create a new meeting event with Google Meet link. Automatically generates a video conference link and sends invitations to attendees.',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Meeting title/summary',
        },
        description: {
          type: 'string',
          description: 'Meeting description or agenda',
        },
        startTime: {
          type: 'string',
          description: 'Meeting start time (ISO 8601 format)',
        },
        endTime: {
          type: 'string',
          description: 'Meeting end time (ISO 8601 format)',
        },
        attendeeEmails: {
          type: 'array',
          items: { type: 'string' },
          description: 'Email addresses of attendees',
        },
      },
      required: ['title', 'startTime', 'endTime'],
    },
  },
  {
    name: 'list_upcoming_meetings',
    description: 'List upcoming meetings from the calendar. Retrieves scheduled events to avoid conflicts.',
    inputSchema: {
      type: 'object',
      properties: {
        maxResults: {
          type: 'number',
          description: 'Maximum number of events to return (default: 10)',
        },
      },
      required: [],
    },
  },
  {
    name: 'suggest_meeting_time',
    description: 'AI-powered suggestion for the best meeting time based on participant availability, preferences, and calendar patterns.',
    inputSchema: {
      type: 'object',
      properties: {
        durationMinutes: {
          type: 'number',
          description: 'Duration of the meeting in minutes',
        },
        attendeeEmails: {
          type: 'array',
          items: { type: 'string' },
          description: 'Email addresses of attendees',
        },
        preferredTimeOfDay: {
          type: 'string',
          enum: ['morning', 'afternoon', 'evening', 'any'],
          description: 'Preferred time of day for the meeting',
        },
        daysAhead: {
          type: 'number',
          description: 'Number of days to look ahead (default: 7)',
        },
      },
      required: ['durationMinutes'],
    },
  },
  {
    name: 'cancel_meeting',
    description: 'Cancel an existing meeting',
    inputSchema: {
      type: 'object',
      properties: {
        eventId: {
          type: 'string',
          description: 'ID of the event to cancel',
        },
      },
      required: ['eventId'],
    },
  }
]

export class CalendarMCPServer {
  private calendarService: GoogleCalendarService

  constructor(accessToken: string, refreshToken?: string) {
    this.calendarService = new GoogleCalendarService(accessToken, refreshToken)
  }

  async executeTool(toolName: string, args: any): Promise<any> {
    switch (toolName) {
      case 'find_free_slots':
        return await this.findFreeSlots(args)
      
      case 'create_meeting':
        return await this.createMeeting(args)
      
      case 'list_upcoming_meetings':
        return await this.listUpcomingMeetings(args)
      
      case 'suggest_meeting_time':
        return await this.suggestMeetingTime(args)

      case 'cancel_meeting':
        return await this.cancelMeeting(args)
      
      default:
        throw new Error(`Unknown tool: ${toolName}`)
    }
  }

  private async findFreeSlots(args: {
    startDate: string
    endDate: string
    durationMinutes: number
    attendeeEmails?: string[]
  }) {
    const freeSlots = await this.calendarService.findFreeSlots(
      new Date(args.startDate),
      new Date(args.endDate),
      args.durationMinutes,
      args.attendeeEmails || []
    )

    return {
      success: true,
      freeSlots: freeSlots.map(slot => ({
        start: slot.start.toISOString(),
        end: slot.end.toISOString(),
        duration: args.durationMinutes,
      })),
      count: freeSlots.length,
    }
  }

  private async createMeeting(args: {
    title: string
    description?: string
    startTime: string
    endTime: string
    attendeeEmails?: string[]
  }) {
    const event = await this.calendarService.createMeetingWithGoogleMeet({
      summary: args.title,
      description: args.description,
      start: {
        dateTime: args.startTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: args.endTime,
        timeZone: 'UTC',
      },
      attendees: args.attendeeEmails?.map(email => ({ email })),
    })

    return {
      success: true,
      eventId: event.id,
      meetLink: event.hangoutLink,
      htmlLink: event.htmlLink,
      summary: event.summary,
      start: event.start?.dateTime,
      end: event.end?.dateTime,
      attendees: event.attendees?.map(a => a.email),
    }
  }

  private async listUpcomingMeetings(args: { maxResults?: number }) {
    const events = await this.calendarService.listEvents(args.maxResults || 10)

    return {
      success: true,
      events: events.map(event => ({
        id: event.id,
        title: event.summary,
        start: event.start?.dateTime || event.start?.date,
        end: event.end?.dateTime || event.end?.date,
        meetLink: event.hangoutLink,
        attendees: event.attendees?.map(a => a.email),
      })),
      count: events.length,
    }
  }

  private async suggestMeetingTime(args: {
    durationMinutes: number
    attendeeEmails?: string[]
    preferredTimeOfDay?: string
    daysAhead?: number
  }) {
    const daysAhead = args.daysAhead || 7
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + daysAhead)

    const freeSlots = await this.calendarService.findFreeSlots(
      startDate,
      endDate,
      args.durationMinutes,
      args.attendeeEmails || []
    )

    let filteredSlots = freeSlots

    if (args.preferredTimeOfDay && args.preferredTimeOfDay !== 'any') {
      filteredSlots = freeSlots.filter(slot => {
        const hour = slot.start.getHours()
        switch (args.preferredTimeOfDay) {
          case 'morning':
            return hour >= 9 && hour < 12
          case 'afternoon':
            return hour >= 12 && hour < 17
          case 'evening':
            return hour >= 17 && hour < 20
          default:
            return true
        }
      })
    }

    const bestSlot = filteredSlots[0]

    return {
      success: true,
      suggestedSlot: bestSlot ? {
        start: bestSlot.start.toISOString(),
        end: bestSlot.end.toISOString(),
        confidence: 'high',
        reason: `Best available slot in ${args.preferredTimeOfDay || 'business'} hours`,
      } : null,
      alternativeSlots: filteredSlots.slice(1, 4).map(slot => ({
        start: slot.start.toISOString(),
        end: slot.end.toISOString(),
      })),
    }
  }

  private async cancelMeeting(args: { eventId: string }) {
    await this.calendarService.deleteEvent(args.eventId)
    return { success: true, message: 'Meeting cancelled' }
  }
}
