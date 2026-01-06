import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEvents, deleteEvent } from '../services/eventService'

const EventList = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(null)
  const [lastPage, setLastPage] = useState(1)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getEvents({ page, limit: pageSize })
        // API is expected to return { data: [...], meta: { total, page, last_page } }
        const items = Array.isArray(data) ? data : data.data || []
        setEvents(items)
        if (data.meta) {
          setTotal(data.meta.total ?? items.length)
          setLastPage(data.meta.last_page ?? page)
        } else {
          setTotal(items.length)
          setLastPage(page)
        }
      } catch (err) {
        setError(err.message || 'Failed to load events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [page, pageSize])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return
    }

    try {
      setDeletingId(id)
      await deleteEvent(id)
      // Refresh the list
      const data = await getEvents({ page, limit: pageSize })
      const items = Array.isArray(data) ? data : data.data || []
      setEvents(items)
      if (data.meta) {
        setTotal(data.meta.total ?? items.length)
        setLastPage(data.meta.last_page ?? page)
      }
    } catch (err) {
      alert(err.message || 'Failed to delete event')
    } finally {
      setDeletingId(null)
    }
  }

  const canGoPrev = page > 1
  const canGoNext = page < lastPage

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and browse all your events
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/events/new')}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Event
        </button>
      </div>

      {/* Content Card */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {loading ? (
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
              <p className="text-sm text-gray-500">Loading events...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-6">
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <div className="font-medium">Error loading events</div>
              <div className="mt-1">{error}</div>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-4 text-sm font-medium text-gray-900">No events</h3>
            <p className="mt-2 text-sm text-gray-500">
              Get started by creating a new event.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => navigate('/events/new')}
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
              >
                New Event
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      Event Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      Date & Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      Capacity
                    </th>
                    <th
                      scope="col"
                      className="relative px-6 py-3"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {events.map((event) => (
                    <tr
                      key={event.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {event.name}
                        </div>
                        {event.description && (
                          <div className="mt-1 text-xs text-gray-500 line-clamp-1">
                            {event.description}
                          </div>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {event.location}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {event.date
                          ? new Date(event.date).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '—'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                        {typeof event.ticketPrice === 'number'
                          ? `$${event.ticketPrice.toFixed(2)}`
                          : 'Free'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-600">
                        {event.capacity ?? '—'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/events/${event.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`/events/${event.id}/edit`)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <svg
                              className="h-5 w-5"
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
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(event.id)}
                            disabled={deletingId === event.id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === event.id ? (
                              <svg
                                className="h-5 w-5 animate-spin"
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
                            ) : (
                              <svg
                                className="h-5 w-5"
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
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center gap-4 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-between">
              <div className="text-sm text-gray-700">
                <span className="font-medium">Page {page}</span> of{' '}
                <span className="font-medium">{lastPage}</span>
                {total != null && (
                  <>
                    {' '}
                    · Showing <span className="font-medium">{events.length}</span> of{' '}
                    <span className="font-medium">{total.toLocaleString()}</span> events
                  </>
                )}
              </div>
              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => canGoPrev && setPage((p) => p - 1)}
                  disabled={!canGoPrev}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => canGoNext && setPage((p) => p + 1)}
                  disabled={!canGoNext}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default EventList

