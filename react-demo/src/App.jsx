import { useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import EventList from './pages/EventList.jsx'
import EventCreate from './pages/EventCreate.jsx'
import EventDetail from './pages/EventDetail.jsx'
import EventEdit from './pages/EventEdit.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { clearToken, getToken } from './services/authService'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const hasToken = !!getToken()

  if (!hasToken) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

const App = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getToken())

  const handleLogout = () => {
    clearToken()
    setIsAuthenticated(false)
    navigate('/login')
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
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-gray-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-gray-800"
              >
                Logout
              </button>
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
    </div>
  )
}

export default App
