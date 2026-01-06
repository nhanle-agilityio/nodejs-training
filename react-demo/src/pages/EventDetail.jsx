import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getEventById, deleteEvent } from '../services/eventService'

const EventDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

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

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return
    }

    try {
      setDeleting(true)
      await deleteEvent(id)
      navigate('/')
    } catch (err) {
      alert(err.message || 'Failed to delete event')
      setDeleting(false)
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

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <div className="font-medium">Error loading event</div>
          <div className="mt-1">{error}</div>
        </div>
        <Link
          to="/"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900"
        >
          ← Back to Events
        </Link>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-500">Event not found</p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-900"
        >
          ← Back to Events
        </Link>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set'
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/"
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
            Back to Events
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
          <p className="mt-1 text-sm text-gray-500">Event Details</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/events/${id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
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
                Deleting...
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </>
            )}
          </button>
        </div>
      </div>

      {/* Details Card */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">Event Information</h2>
        </div>
        <div className="px-6 py-6">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Event Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{event.name}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900">{event.location || '—'}</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {event.description || (
                  <span className="text-gray-400">No description provided</span>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(event.date)}</dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Ticket Price</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {typeof event.ticketPrice === 'number'
                  ? `$${event.ticketPrice.toFixed(2)}`
                  : 'Free'}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Capacity</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {event.capacity ? `${event.capacity} attendees` : 'Unlimited'}
              </dd>
            </div>

            {event.createdAt && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Created</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(event.createdAt)}</dd>
              </div>
            )}

            {event.updatedAt && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(event.updatedAt)}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default EventDetail
