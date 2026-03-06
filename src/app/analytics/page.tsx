'use client'

import { TrendingUp, Clock, Users, CheckCircle } from 'lucide-react'
import Navbar from '@/components/navigation/Navbar'

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
            title="Total Meetings"
            value="124"
            trend="+12%"
            trendUp={true}
          />
          <MetricCard
            icon={<Clock className="w-8 h-8 text-purple-600" />}
            title="Avg Duration"
            value="42 min"
            trend="-5%"
            trendUp={false}
          />
          <MetricCard
            icon={<Users className="w-8 h-8 text-green-600" />}
            title="Avg Participants"
            value="6.8"
            trend="+8%"
            trendUp={true}
          />
          <MetricCard
            icon={<CheckCircle className="w-8 h-8 text-orange-600" />}
            title="Completion Rate"
            value="94%"
            trend="+3%"
            trendUp={true}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Meeting Trends</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Chart placeholder - Meeting frequency over time
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Participant Distribution</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              Chart placeholder - Participants per meeting
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h2>
          <div className="space-y-4">
            <InsightItem
              title="Most Productive Day"
              value="Tuesday"
              description="Highest meeting completion rate and action item follow-through"
            />
            <InsightItem
              title="Peak Meeting Time"
              value="10:00 AM - 11:00 AM"
              description="Most meetings scheduled during this time slot"
            />
            <InsightItem
              title="Average Action Items"
              value="5.2 per meeting"
              description="Consistent tracking and completion of action items"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function MetricCard({
  icon,
  title,
  value,
  trend,
  trendUp,
}: {
  icon: React.ReactNode
  title: string
  value: string
  trend: string
  trendUp: boolean
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}

function InsightItem({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <span className="text-lg font-bold text-blue-600">{value}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
