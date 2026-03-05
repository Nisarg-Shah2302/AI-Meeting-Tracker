import Link from 'next/link'
import { Calendar, Clock, Users, TrendingUp, Plus } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              AI Meeting Tracker
            </Link>
            <div className="flex gap-4">
              <Link href="/dashboard" className="px-4 py-2 text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link href="/meetings" className="px-4 py-2 text-gray-700 hover:text-blue-600">
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link
            href="/meetings/new"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            New Meeting
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Calendar className="w-8 h-8 text-blue-600" />}
            title="Total Meetings"
            value="24"
            change="+12% from last month"
          />
          <StatCard
            icon={<Clock className="w-8 h-8 text-green-600" />}
            title="Total Hours"
            value="48.5"
            change="+8% from last month"
          />
          <StatCard
            icon={<Users className="w-8 h-8 text-purple-600" />}
            title="Participants"
            value="156"
            change="+23% from last month"
          />
          <StatCard
            icon={<TrendingUp className="w-8 h-8 text-orange-600" />}
            title="Action Items"
            value="87"
            change="34 completed this week"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Meetings</h2>
            <div className="space-y-4">
              <MeetingItem
                title="Product Strategy Review"
                date="Today, 2:00 PM"
                participants={8}
                duration="45 min"
              />
              <MeetingItem
                title="Engineering Sprint Planning"
                date="Yesterday, 10:00 AM"
                participants={12}
                duration="60 min"
              />
              <MeetingItem
                title="Client Presentation"
                date="2 days ago"
                participants={5}
                duration="30 min"
              />
            </div>
            <Link href="/meetings" className="block mt-4 text-blue-600 hover:text-blue-700 font-medium">
              View all meetings →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Meetings</h2>
            <div className="space-y-4">
              <MeetingItem
                title="Weekly Team Sync"
                date="Tomorrow, 9:00 AM"
                participants={10}
                duration="30 min"
              />
              <MeetingItem
                title="Quarterly Business Review"
                date="Friday, 3:00 PM"
                participants={15}
                duration="90 min"
              />
              <MeetingItem
                title="Design Review"
                date="Next Monday, 11:00 AM"
                participants={6}
                duration="45 min"
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
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-sm text-green-600">{change}</p>
    </div>
  )
}

function MeetingItem({ title, date, participants, duration }: { title: string; date: string; participants: number; duration: string }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600">{participants} participants</p>
        <p className="text-sm text-gray-600">{duration}</p>
      </div>
    </div>
  )
}
