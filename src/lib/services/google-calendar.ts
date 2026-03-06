import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

export interface CalendarEvent {
  id?: string
  summary: string
  description?: string
  start: {
    dateTime: string
    timeZone?: string
  }
  end: {
    dateTime: string
    timeZone?: string
  }
  attendees?: Array<{ email: string }>
  conferenceData?: any
}

export interface FreeBusySlot {
  start: string
  end: string
}

export class GoogleCalendarService {
  private oauth2Client: OAuth2Client

  constructor(accessToken: string, refreshToken?: string) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXTAUTH_URL + '/api/auth/callback/google'
    )

    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    })
  }

  async listEvents(maxResults: number = 10) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })
    
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    })

    return response.data.items || []
  }

  async createMeetingWithGoogleMeet(event: CalendarEvent) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })

    const eventData = {
      summary: event.summary,
      description: event.description,
      start: event.start,
      end: event.end,
      attendees: event.attendees,
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    }

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: eventData,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    })

    return response.data
  }

  async findFreeSlots(
    startDate: Date,
    endDate: Date,
    durationMinutes: number,
    attendeeEmails: string[] = []
  ): Promise<Array<{ start: Date; end: Date }>> {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })

    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        items: [
          { id: 'primary' },
          ...attendeeEmails.map(email => ({ id: email })),
        ],
      },
    })

    const busySlots: FreeBusySlot[] = []
    const calendars = freeBusyResponse.data.calendars || {}

    Object.values(calendars).forEach((cal: any) => {
      if (cal.busy) {
        busySlots.push(...cal.busy)
      }
    })

    const freeSlots: Array<{ start: Date; end: Date }> = []
    let currentTime = new Date(startDate)
    const endTime = new Date(endDate)

    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + durationMinutes * 60000)
      
      if (slotEnd > endTime) break

      const isSlotFree = !busySlots.some(busy => {
        const busyStart = new Date(busy.start)
        const busyEnd = new Date(busy.end)
        return (
          (currentTime >= busyStart && currentTime < busyEnd) ||
          (slotEnd > busyStart && slotEnd <= busyEnd) ||
          (currentTime <= busyStart && slotEnd >= busyEnd)
        )
      })

      if (isSlotFree) {
        const hour = currentTime.getHours()
        if (hour >= 9 && hour < 17) {
          freeSlots.push({
            start: new Date(currentTime),
            end: new Date(slotEnd),
          })
        }
      }

      currentTime = new Date(currentTime.getTime() + 30 * 60000)
    }

    return freeSlots.slice(0, 5)
  }

  async updateEvent(eventId: string, updates: Partial<CalendarEvent>) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })

    const response = await calendar.events.patch({
      calendarId: 'primary',
      eventId,
      requestBody: updates,
      sendUpdates: 'all',
    })

    return response.data
  }

  async deleteEvent(eventId: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })

    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
      sendUpdates: 'all',
    })

    return { success: true }
  }
}
