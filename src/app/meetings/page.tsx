import Link from 'next/link'
import { Search, Filter, Plus, Calendar } from 'lucide-react'

export default function Meetings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              AI Meeting Tracker
            </Link>
            <div className="flex gap-4">
              <Link href="/dashboard" className="px-4 py-2 text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/meetings" className="px-4 py-2 text-blue-600 font-medium">
                Meetings
              </Link>
              <Link href="/analytics" className="px-4 py-2 text-gray-700 hover:text-blue-600">
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Meetings</h1>
          <Link
            href="/meetings/new"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            New Meeting
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search meetings..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <MeetingCard
            title="Product Strategy Review"
            date="March 5, 2024"
            time="2:00 PM - 2:45 PM"
            participants={8}
            status="completed"
            summary="Discussed Q2 product roadmap, prioritized features, and aligned on launch timeline."
          />
          <MeetingCard
            title="Engineering Sprint Planning"
            date="March 4, 2024"
            time="10:00 AM - 11:00 AM"
            participants={12}
            status="completed"
            summary="Planned sprint 23 tasks, assigned story points, and identified blockers."
          />
          <MeetingCard
            title="Client Presentation"
            date="March 3, 2024"
            time="3:00 PM - 3:30 PM"
            participants={5}
            status="completed"
            summary="Presented project progress to client, received positive feedback on deliverables."
          />
          <MeetingCard
            title="Weekly Team Sync"
            date="March 6, 2024"
            time="9:00 AM - 9:30 AM"
            participants={10}
            status="upcoming"
            summary="Regular weekly sync to discuss progress and blockers."
          />
        </div>
      </main>
    </div>
  )
}

function MeetingCard({
  title,
  date,
  time,
  participants,
  status,
  summary,
}: {
  title: string
  date: string
  time: string
  participants: number
  status: 'completed' | 'upcoming'
  summary: string
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {status === 'completed' ? 'Completed' : 'Upcoming'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date}
            </div>
            <span>{time}</span>
            <span>{participants} participants</span>
          </div>
        </div>
        <Link
          href={`/meetings/${status === 'completed' ? '1' : 'upcoming'}`}
          className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
        >
          View Details
        </Link>
      </div>
      <p className="text-gray-700">{summary}</p>
    </div>
  )
}
