import { useSession } from '../hooks/useSession'

const SessionExpirationModal = () => {
  const { showExpiryWarning, secondsRemaining, handleContinueSession, handleEndSession } = useSession()

  if (!showExpiryWarning) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <svg
              className="h-6 w-6 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Session Expiring</h2>
            <p className="text-sm text-gray-500">Your session is about to expire</p>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-gray-50 p-4 text-center">
          <div className="text-3xl font-bold text-gray-900">{secondsRemaining}</div>
          <div className="text-sm text-gray-500">seconds remaining</div>
        </div>

        <p className="mb-6 text-sm text-gray-600">
          For your security, you will be logged out when the timer reaches zero.
          Would you like to continue your session?
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleEndSession}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Logout
          </button>
          <button
            onClick={handleContinueSession}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Continue Session
          </button>
        </div>
      </div>
    </div>
  )
}

export default SessionExpirationModal
