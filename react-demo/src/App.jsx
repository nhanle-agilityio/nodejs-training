const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white">
              EM
            </span>
            <div>
              <h1 className="text-base font-semibold tracking-tight">
                Event Management
              </h1>
              <p className="text-xs text-slate-500">
                UI for your Node.js event APIs
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-3 text-xs font-medium text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-900">
              Events
            </span>
            <span className="px-3 py-1">Settings</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-6 text-sm text-slate-600">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            Event dashboard coming next
          </h2>
          <p>
            The basic React + Tailwind shell is ready. In the next steps, we
            will connect to your event APIs to list, create, edit, and delete
            events.
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
