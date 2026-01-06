import { useState } from 'react'

const INITIAL_FORM = {
  name: '',
  description: '',
  location: '',
  date: '',
  ticketPrice: '',
  capacity: '',
}

const EventForm = ({ initialValue, onSubmit, submitting, submitLabel, onCancel }) => {
  const [form, setForm] = useState(initialValue || INITIAL_FORM)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const payload = {
        ...form,
        ticketPrice:
          form.ticketPrice === '' ? null : Number.parseFloat(form.ticketPrice),
        capacity:
          form.capacity === '' ? null : Number.parseInt(form.capacity, 10),
      }
      await onSubmit(payload)
    } catch (err) {
      setError(err.message || 'Failed to save event')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <div className="font-medium">Error</div>
          <div className="mt-1">{error}</div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="e.g., Tech Meetup 2024"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            type="text"
            name="location"
            required
            value={form.location}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="e.g., Downtown Community Hall"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="A brief description of the event..."
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date & Time <span className="text-red-500">*</span>
          </label>
          <input
            id="date"
            type="datetime-local"
            name="date"
            required
            value={form.date}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">
            Ticket Price ($)
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              $
            </span>
            <input
              id="ticketPrice"
              type="number"
              step="0.01"
              min="0"
              name="ticketPrice"
              value={form.ticketPrice}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 pl-7 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
            Capacity
          </label>
          <input
            id="capacity"
            type="number"
            min="1"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="100"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
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
              Saving...
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  )
}

export default EventForm

