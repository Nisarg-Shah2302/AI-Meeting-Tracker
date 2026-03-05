import Link from 'next/link'
import { Calendar, Video, FileText, TrendingUp, Users, Brain } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Meeting Tracker</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard" className="px-4 py-2 text-gray-700 hover:text-blue-600 transition">
              Dashboard
            </Link>
            <Link href="/meetings" className="px-4 py-2 text-gray-700 hover:text-blue-600 transition">
              Meetings
            </Link>
            <Link href="/analytics" className="px-4 py-2 text-gray-700 hover:text-blue-600 transition">
              Analytics
            </Link>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Meetings with AI Intelligence
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Automatically track, transcribe, and analyze your meetings. Get actionable insights, 
            automated summaries, and never miss important action items.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/meetings/new" 
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Start New Meeting
            </Link>
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-blue-600"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Video className="w-12 h-12 text-blue-600" />}
            title="Real-time Transcription"
            description="Automatically transcribe meetings in real-time with high accuracy using advanced AI models."
          />
          <FeatureCard
            icon={<FileText className="w-12 h-12 text-purple-600" />}
            title="Smart Summaries"
            description="Get AI-generated summaries highlighting key points, decisions, and action items."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-green-600" />}
            title="Speaker Recognition"
            description="Identify and track individual speakers throughout the meeting automatically."
          />
          <FeatureCard
            icon={<Calendar className="w-12 h-12 text-orange-600" />}
            title="Action Item Tracking"
            description="Automatically extract and track action items with assignees and deadlines."
          />
          <FeatureCard
            icon={<TrendingUp className="w-12 h-12 text-red-600" />}
            title="Analytics & Insights"
            description="Gain insights into meeting patterns, participation, and productivity metrics."
          />
          <FeatureCard
            icon={<Brain className="w-12 h-12 text-indigo-600" />}
            title="AI-Powered Search"
            description="Search across all meetings using natural language to find specific discussions."
          />
        </div>
      </section>

      <footer className="border-t bg-white mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 AI Meeting Tracker. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
