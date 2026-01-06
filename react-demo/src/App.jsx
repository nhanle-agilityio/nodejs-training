import { Link, Route, Routes } from 'react-router-dom'
import EventList from './pages/EventList.jsx'
import EventCreate from './pages/EventCreate.jsx'
import EventDetail from './pages/EventDetail.jsx'
import EventEdit from './pages/EventEdit.jsx'

const App = () => {
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
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events/new" element={<EventCreate />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/events/:id/edit" element={<EventEdit />} />
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
