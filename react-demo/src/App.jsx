import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import EventList from './pages/EventList.jsx'
import EventCreate from './pages/EventCreate.jsx'
import EventDetail from './pages/EventDetail.jsx'
import EventEdit from './pages/EventEdit.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import SessionExpirationModal from './components/SessionExpirationModal.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'
import { SessionProvider } from './contexts/SessionContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { useAuth } from './hooks/useAuth'

const AppContent = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading, logout, user } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div>
              <h1 className="text-base font-semibold tracking-tight">
                Event Management
              </h1>
            </div>
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link
              to="/"
              className="rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-100"
            >
              Events
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {user && (
                  <span className="text-gray-600">
                    {user.name || user.email}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-gray-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-gray-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-gray-800"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <EventList />
              </RequireAuth>
            }
          />
          <Route
            path="/events/new"
            element={
              <RequireAuth>
                <EventCreate />
              </RequireAuth>
            }
          />
          <Route
            path="/events/:id"
            element={
              <RequireAuth>
                <EventDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/events/:id/edit"
            element={
              <RequireAuth>
                <EventEdit />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <div className="rounded-xl border border-dashed border-red-200 bg-red-50/80 p-6 text-sm text-red-700">
                Page not found.
              </div>
            }
          />
        </Routes>
      </main>

      <SessionExpirationModal />
    </div>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <SessionProvider>
        <AppContent />
      </SessionProvider>
    </AuthProvider>
  )
}

export default App
