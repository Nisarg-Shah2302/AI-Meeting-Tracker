'use client'

import Link from 'next/link'
import { Search, Filter, Calendar, Clock, Users } from 'lucide-react'
import Navbar from '@/components/navigation/Navbar'

export default function Meetings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
          <Link
            href="/meetings/new"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            New Meeting
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search meetings..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          <MeetingCard
            title="Weekly Team Sync"
            date="Today, 2:00 PM"
            duration="30 min"
            participants={5}
            status="upcoming"
            description="Regular team sync to discuss progress and blockers"
          />
          <MeetingCard
            title="Product Review"
            date="Yesterday, 3:30 PM"
            duration="1 hour"
            participants={8}
            status="completed"
            description="Review of Q4 product roadmap and feature priorities"
          />
          <MeetingCard
            title="Client Presentation"
            date="Dec 15, 10:00 AM"
            duration="45 min"
            participants={12}
            status="completed"
            description="Quarterly business review with key stakeholders"
          />
          <MeetingCard
            title="Sprint Planning"
            date="Tomorrow, 9:00 AM"
            duration="2 hours"
            participants={6}
            status="upcoming"
            description="Planning session for the next sprint cycle"
          />
        </div>
      </main>
    </div>
  )
}

function MeetingCard({
  title,
  date,
  duration,
  participants,
  status,
  description,
}: {
  title: string
  date: string
  duration: string
  participants: number
  status: string
  description: string
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{participants} participants</span>
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === 'upcoming'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex gap-3">
        <Link
          href={`/meetings/${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          View Details
        </Link>
        {status === 'completed' && (
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
            View Summary
          </button>
        )}
      </div>
    </div>
  )
}
