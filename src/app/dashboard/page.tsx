'use client'

import Link from 'next/link'
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react'
import Navbar from '@/components/navigation/Navbar'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link
            href="/meetings/new"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            New Meeting
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Calendar className="w-8 h-8 text-blue-600" />}
            title="Total Meetings"
            value="24"
            change="+12%"
          />
          <StatCard
            icon={<Clock className="w-8 h-8 text-purple-600" />}
            title="Hours Saved"
            value="48"
            change="+8%"
          />
          <StatCard
            icon={<Users className="w-8 h-8 text-green-600" />}
            title="Participants"
            value="156"
            change="+23%"
          />
          <StatCard
            icon={<CheckCircle className="w-8 h-8 text-orange-600" />}
            title="Action Items"
            value="89"
            change="+15%"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Meetings</h2>
            <div className="space-y-4">
              <MeetingItem
                title="Weekly Team Sync"
                date="Today, 2:00 PM"
                participants={5}
                status="upcoming"
              />
              <MeetingItem
                title="Product Review"
                date="Yesterday, 3:30 PM"
                participants={8}
                status="completed"
              />
              <MeetingItem
                title="Client Presentation"
                date="Dec 15, 10:00 AM"
                participants={12}
                status="completed"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Meetings</h2>
            <div className="space-y-4">
              <MeetingItem
                title="Sprint Planning"
                date="Tomorrow, 9:00 AM"
                participants={6}
                status="upcoming"
              />
              <MeetingItem
                title="Design Review"
                date="Dec 20, 2:00 PM"
                participants={4}
                status="upcoming"
              />
              <MeetingItem
                title="All Hands"
                date="Dec 22, 11:00 AM"
                participants={45}
                status="upcoming"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon, title, value, change }: { icon: React.ReactNode; title: string; value: string; change: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className="text-sm font-medium text-green-600">{change}</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}

function MeetingItem({ title, date, participants, status }: { title: string; date: string; participants: number; status: string }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{participants}</span>
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
    </div>
  )
}
