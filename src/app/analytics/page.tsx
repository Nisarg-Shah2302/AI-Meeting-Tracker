import Link from 'next/link'
import { TrendingUp, Users, Clock, Target } from 'lucide-react'

export default function Analytics() {
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
              <Link href="/meetings" className="px-4 py-2 text-gray-700 hover:text-blue-600">
                Meetings
              </Link>
              <Link href="/analytics" className="px-4 py-2 text-blue-600 font-medium">
                Analytics
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics & Insights</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
            title="Meeting Efficiency"
            value="87%"
            trend="+5%"
          />
          <MetricCard
            icon={<Users className="w-8 h-8 text-green-600" />}
            title="Avg Participants"
            value="8.5"
            trend="+2.1"
          />
          <MetricCard
            icon={<Clock className="w-8 h-8 text-purple-600" />}
            title="Avg Duration"
            value="42 min"
            trend="-8 min"
          />
          <MetricCard
            icon={<Target className="w-8 h-8 text-orange-600" />}
            title="Action Items"
            value="92%"
            trend="+7%"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Meeting Trends</h2>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">Chart: Meeting frequency over time</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Participation Rate</h2>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">Chart: Participant engagement metrics</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Insights</h2>
          <div className="space-y-4">
            <InsightItem
              title="Peak Meeting Times"
              description="Most productive meetings occur between 10 AM - 12 PM with 92% completion rate."
              type="positive"
            />
            <InsightItem
              title="Action Item Completion"
              description="87% of action items are completed within deadline, up 12% from last month."
              type="positive"
            />
            <InsightItem
              title="Meeting Duration"
              description="Average meeting duration decreased by 8 minutes, improving efficiency."
              type="positive"
            />
            <InsightItem
              title="Attendance Rate"
              description="5% decrease in attendance for meetings scheduled after 4 PM."
              type="warning"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function MetricCard({ icon, title, value, trend }: { icon: React.ReactNode; title: string; value: string; trend: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        {icon}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-sm text-green-600">{trend}</p>
    </div>
  )
}

function InsightItem({ title, description, type }: { title: string; description: string; type: 'positive' | 'warning' }) {
  return (
    <div className={`p-4 rounded-lg border-l-4 ${type === 'positive' ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'}`}>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  )
}
