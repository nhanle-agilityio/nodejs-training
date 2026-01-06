import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEventById, updateEvent } from '../services/eventService'
import EventForm from '../components/EventForm.jsx'

const EventEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getEventById(id)
        setEvent(data)
      } catch (err) {
        setError(err.message || 'Failed to load event')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    // Convert to local datetime-local format (YYYY-MM-DDTHH:mm)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const prepareInitialValue = (eventData) => {
    if (!eventData) return null
    return {
      name: eventData.name || '',
      description: eventData.description || '',
      location: eventData.location || '',
      date: formatDateForInput(eventData.date),
      ticketPrice: eventData.ticketPrice?.toString() || '',
      capacity: eventData.capacity?.toString() || '',
    }
  }

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true)
      setError(null)
      await updateEvent(id, payload)
      navigate(`/events/${id}`)
    } catch (err) {
      setError(err.message || 'Failed to update event')
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="h-8 w-8 animate-spin text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-sm text-gray-500">Loading event...</p>
        </div>
      </div>
    )
  }

  if (error && !event) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <div className="font-medium">Error loading event</div>
          <div className="mt-1">{error}</div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900"
        >
          ← Back to Events
        </button>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-500">Event not found</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-900"
        >
          ← Back to Events
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate(`/events/${id}`)}
          className="mb-2 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Event
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the event details below.
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
            initialValue={prepareInitialValue(event)}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel="Update Event"
            onCancel={() => navigate(`/events/${id}`)}
          />
        </div>
      </div>
    </div>
  )
}

export default EventEdit
