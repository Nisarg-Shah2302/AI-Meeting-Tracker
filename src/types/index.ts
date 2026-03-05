export interface Meeting {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  participants: Participant[]
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  transcript?: Transcript
  summary?: Summary
  actionItems?: ActionItem[]
  createdAt: Date
  updatedAt: Date
}

export interface Participant {
  id: string
  name: string
  email: string
  role?: string
  avatar?: string
}

export interface Transcript {
  id: string
  meetingId: string
  segments: TranscriptSegment[]
  language: string
  createdAt: Date
}

export interface TranscriptSegment {
  id: string
  speakerId: string
  speakerName: string
  text: string
  startTime: number
  endTime: number
  confidence: number
}

export interface Summary {
  id: string
  meetingId: string
  overview: string
  keyPoints: string[]
  decisions: string[]
  topics: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
  createdAt: Date
}

export interface ActionItem {
  id: string
  meetingId: string
  title: string
  description?: string
  assignee?: Participant
  dueDate?: Date
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  updatedAt: Date
}

export interface Analytics {
  totalMeetings: number
  totalHours: number
  totalParticipants: number
  averageDuration: number
  completionRate: number
  actionItemsCompleted: number
  actionItemsTotal: number
}
