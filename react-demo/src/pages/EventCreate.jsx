import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent } from '../services/eventService'
import EventForm from '../components/EventForm.jsx'

const EventCreate = () => {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true)
      setError(null)
      await createEvent(payload)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Failed to create event')
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the details below to add a new event to your calendar.
        </p>
      </div>

      {/* Form Card */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">Event Details</h2>
        </div>
        <div className="p-6">
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <div className="font-medium">Error</div>
              <div className="mt-1">{error}</div>
            </div>
          )}
          <EventForm
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel="Create Event"
            onCancel={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  )
}

export default EventCreate

