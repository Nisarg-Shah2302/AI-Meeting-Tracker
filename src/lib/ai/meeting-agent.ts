import OpenAI from 'openai'
import { CalendarMCPServer, calendarTools } from '../mcp/calendar-tools'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
})

export interface MeetingRequest {
  prompt: string
  userEmail: string
  accessToken: string
  refreshToken?: string
}

export interface AgentResponse {
  success: boolean
  message: string
  data?: any
  toolCalls?: Array<{
    tool: string
    args: any
    result: any
  }>
}

export class MeetingAIAgent {
  private mcpServer: CalendarMCPServer

  constructor(accessToken: string, refreshToken?: string) {
    this.mcpServer = new CalendarMCPServer(accessToken, refreshToken)
  }

  async processRequest(prompt: string): Promise<AgentResponse> {
    try {
      const messages: any[] = [
        {
          role: 'system',
          content: `You are an AI meeting scheduling assistant with access to Google Calendar. 
You can:
1. Find available time slots
2. Create meetings with Google Meet links
3. Check upcoming meetings
4. Suggest optimal meeting times

When the user asks to schedule a meeting, you should:
1. First check their calendar for conflicts
2. Find available time slots
3. Suggest the best time
4. Create the meeting with Google Meet link

Always be helpful, professional, and efficient. Parse dates and times from natural language.
Current date/time: ${new Date().toISOString()}`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ]

      const tools = calendarTools.map(tool => ({
        type: 'function' as const,
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.inputSchema,
        },
      }))

      let response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages,
        tools,
        tool_choice: 'auto',
      })

      const toolCalls: Array<{ tool: string; args: any; result: any }> = []
      let finalMessage = response.choices[0].message.content || ''

      while (response.choices[0].message.tool_calls) {
        const toolCallsData = response.choices[0].message.tool_calls

        messages.push(response.choices[0].message)

        for (const toolCall of toolCallsData) {
          const functionName = toolCall.function.name
          const functionArgs = JSON.parse(toolCall.function.arguments)

          console.log(`Executing tool: ${functionName}`, functionArgs)

          const result = await this.mcpServer.executeTool(functionName, functionArgs)

          toolCalls.push({
            tool: functionName,
            args: functionArgs,
            result,
          })

          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(result),
          })
        }

        response = await openai.chat.completions.create({
          model: 'gpt-4',
          messages,
          tools,
          tool_choice: 'auto',
        })

        finalMessage = response.choices[0].message.content || finalMessage
      }

      return {
        success: true,
        message: finalMessage,
        toolCalls,
        data: toolCalls.length > 0 ? toolCalls[toolCalls.length - 1].result : null,
      }
    } catch (error: any) {
      console.error('AI Agent error:', error)
      return {
        success: false,
        message: `Error processing request: ${error.message}`,
      }
    }
  }

  async scheduleMeetingFromPrompt(prompt: string): Promise<AgentResponse> {
    return await this.processRequest(prompt)
  }

  async findBestMeetingTime(
    durationMinutes: number,
    attendeeEmails: string[],
    preferredTimeOfDay?: string
  ): Promise<AgentResponse> {
    const prompt = `Find the best time for a ${durationMinutes}-minute meeting with ${attendeeEmails.join(', ')}${
      preferredTimeOfDay ? ` preferably in the ${preferredTimeOfDay}` : ''
    }. Check their availability and suggest the optimal time slot.`

    return await this.processRequest(prompt)
  }
}
