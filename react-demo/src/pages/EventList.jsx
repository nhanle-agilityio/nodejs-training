import { useEffect, useState } from 'react'
import { getEvents } from '../services/eventService'

const EventList = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(null)
  const [lastPage, setLastPage] = useState(1)

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

  const canGoPrev = page > 1
  const canGoNext = page < lastPage

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Events</h2>
          <p className="text-xs text-slate-500">
            Browse and manage events from the Event Management API.
          </p>
        </div>
        <button className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700">
          + New event
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">Loading events…</div>
        ) : error ? (
          <div className="p-6 text-sm text-red-600">Error: {error}</div>
        ) : events.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">
            No events found. Try creating a new one from the API or this UI.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left text-xs">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="border-b px-4 py-2 font-medium">Name</th>
                    <th className="border-b px-4 py-2 font-medium">Location</th>
                    <th className="border-b px-4 py-2 font-medium">Date</th>
                    <th className="border-b px-4 py-2 font-medium text-right">
                      Price
                    </th>
                    <th className="border-b px-4 py-2 font-medium text-right">
                      Capacity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50">
                      <td className="border-b px-4 py-2 text-slate-900">
                        {event.name}
                      </td>
                      <td className="border-b px-4 py-2 text-slate-600">
                        {event.location}
                      </td>
                      <td className="border-b px-4 py-2 text-slate-600">
                        {event.date
                          ? new Date(event.date).toLocaleString()
                          : '—'}
                      </td>
                      <td className="border-b px-4 py-2 text-right text-slate-600">
                        {typeof event.ticketPrice === 'number'
                          ? `$${event.ticketPrice.toFixed(2)}`
                          : '—'}
                      </td>
                      <td className="border-b px-4 py-2 text-right text-slate-600">
                        {event.capacity ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t bg-slate-50 px-4 py-3 text-xs text-slate-600">
              <div>
                Page <span className="font-semibold">{page}</span> of{' '}
                <span className="font-semibold">{lastPage}</span>
                {total != null && (
                  <>
                    {' '}
                    · Total{' '}
                    <span className="font-semibold">
                      {total.toLocaleString()}
                    </span>{' '}
                    events
                  </>
                )}
              </div>
              <div className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => canGoPrev && setPage((p) => p - 1)}
                  disabled={!canGoPrev}
                  className="rounded-lg border bg-white px-2 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => canGoNext && setPage((p) => p + 1)}
                  disabled={!canGoNext}
                  className="rounded-lg border bg-white px-2 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default EventList

