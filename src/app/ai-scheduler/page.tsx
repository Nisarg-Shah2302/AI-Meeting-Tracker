'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Brain, Calendar, Clock, Users, Sparkles, Loader2, CheckCircle, XCircle } from 'lucide-react'
import Navbar from '@/components/navigation/Navbar'

export default function AIScheduler() {
  const { data: session } = useSession()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState('')

  const handleSchedule = async () => {
    if (!prompt.trim()) {
      setError('Please enter a meeting request')
      return
    }

    setLoading(true)
    setError('')
    setResponse(null)

    try {
      const res = await fetch('/api/ai-scheduler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process request')
      }

      setResponse(data)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const examplePrompts = [
    'Schedule a 30-minute team sync tomorrow afternoon',
    'Find a time for a 1-hour meeting with john@example.com next week',
    'Create a morning standup meeting for tomorrow at 9 AM',
    'Schedule a client presentation for Friday afternoon with sarah@company.com',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Brain className="w-12 h-12 text-blue-600" />
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Meeting Scheduler
            </h1>
            <p className="text-xl text-gray-600">
              Just tell me what meeting you need, and I'll handle the rest
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What meeting would you like to schedule?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Schedule a 30-minute team meeting tomorrow afternoon with john@example.com and sarah@example.com"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={handleSchedule}
              disabled={loading || !prompt.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Schedule with AI
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900">Error</p>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {response && (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900 mb-2">Success!</p>
                    <p className="text-green-700 whitespace-pre-wrap">{response.message}</p>
                  </div>
                </div>

                {response.data && response.data.meetLink && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-medium text-blue-900 mb-2">Meeting Details</p>
                    <div className="space-y-2 text-sm">
                      {response.data.summary && (
                        <p><span className="font-medium">Title:</span> {response.data.summary}</p>
                      )}
                      {response.data.start && (
                        <p><span className="font-medium">Start:</span> {new Date(response.data.start).toLocaleString()}</p>
                      )}
                      {response.data.meetLink && (
                        <p>
                          <span className="font-medium">Google Meet:</span>{' '}
                          <a
                            href={response.data.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {response.data.meetLink}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {response.toolCalls && response.toolCalls.length > 0 && (
                  <details className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <summary className="font-medium text-gray-900 cursor-pointer">
                      View AI Process ({response.toolCalls.length} steps)
                    </summary>
                    <div className="mt-3 space-y-2">
                      {response.toolCalls.map((call: any, idx: number) => (
                        <div key={idx} className="p-3 bg-white rounded border border-gray-200">
                          <p className="font-medium text-sm text-gray-900">
                            Step {idx + 1}: {call.tool}
                          </p>
                          <pre className="mt-2 text-xs text-gray-600 overflow-x-auto">
                            {JSON.stringify(call.args, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Try these examples:
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {examplePrompts.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(example)}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <p className="text-sm text-gray-700">{example}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <Calendar className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Smart Scheduling</h3>
              <p className="text-sm text-gray-600">
                AI finds the best time by checking everyone's availability
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <Clock className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Meetings</h3>
              <p className="text-sm text-gray-600">
                Google Meet links generated automatically with every meeting
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <Users className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Auto Invites</h3>
              <p className="text-sm text-gray-600">
                Invitations sent automatically to all participants
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
