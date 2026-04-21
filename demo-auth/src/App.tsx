import { useState } from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
  useUser,
} from '@clerk/clerk-react'
import './App.css'

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3000'

function TokenPanel() {
  const { getToken, userId, sessionId } = useAuth()
  const { user } = useUser()
  const [token, setToken] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [apiResult, setApiResult] = useState<string>('')
  const [deleteProductId, setDeleteProductId] = useState<string>('1')
  const [loading, setLoading] = useState(false)

  const fetchToken = async () => {
    try {
      setLoading(true)
      const t = (await getToken()) ?? ''
      setToken(t)
      setCopied(false)
    } finally {
      setLoading(false)
    }
  }

  const copyToken = async () => {
    if (!token) return
    await navigator.clipboard.writeText(token)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const callApi = async (path: string, method: 'GET' | 'POST' | 'DELETE') => {
    try {
      setLoading(true)
      const t = (await getToken()) ?? ''
      const res = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(t ? { Authorization: `Bearer ${t}` } : {}),
        },
        body:
          method === 'POST'
            ? JSON.stringify({ name: 'Test Product', price: 9.99 })
            : undefined,
      })
      const text = await res.text()
      setApiResult(`${method} ${path} → ${res.status}\n${text}`)
    } catch (e) {
      setApiResult(String(e))
    } finally {
      setLoading(false)
    }
  }

  const role = (user?.publicMetadata as { role?: string } | undefined)?.role
  const deletePath = `/api/products/${deleteProductId.trim() || '1'}`

  return (
    <div className="panel">
      <div className="row">
        <strong>User:</strong>
        <span>{user?.primaryEmailAddress?.emailAddress ?? userId}</span>
      </div>
      <div className="row">
        <strong>Role (publicMetadata):</strong>
        <code>{role ?? 'undefined'}</code>
      </div>
      <div className="row">
        <strong>Session:</strong>
        <code className="small">{sessionId}</code>
      </div>

      <div className="actions">
        <button onClick={fetchToken} disabled={loading}>
          {loading ? 'Loading...' : 'Get / Refresh JWT'}
        </button>
        <button onClick={copyToken} disabled={!token}>
          {copied ? 'Copied!' : 'Copy token'}
        </button>
      </div>

      {token && (
        <textarea
          className="token-box"
          readOnly
          value={token}
          onFocus={(e) => e.currentTarget.select()}
        />
      )}

      <hr />
      <h3>Quick test Nest API ({API_BASE_URL})</h3>
      <div className="row">
        <label htmlFor="delete-product-id">
          <strong>Product ID for DELETE:</strong>
        </label>
        <input
          id="delete-product-id"
          className="id-input"
          type="text"
          value={deleteProductId}
          onChange={(e) => setDeleteProductId(e.target.value)}
          placeholder="Enter product UUID"
        />
      </div>
      <div className="actions">
        <button onClick={() => callApi('/api/products', 'GET')} disabled={loading}>
          GET /api/products
        </button>
        <button onClick={() => callApi('/api/products', 'POST')} disabled={loading}>
          POST /api/products
        </button>
        <button
          onClick={() => callApi(deletePath, 'DELETE')}
          disabled={loading || !deleteProductId.trim()}
        >
          DELETE {deletePath}
        </button>
      </div>
      {apiResult && <pre className="result">{apiResult}</pre>}
    </div>
  )
}

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>demo-auth · Clerk JWT helper</h1>
        <div className="auth-controls">
          <SignedOut>
            <SignInButton mode="modal" />
            <SignUpButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      <main>
        <SignedOut>
          <p className="hint">
            Login with user configured in Clerk (same app as{' '}
            <code>CLERK_SECRET_KEY</code> of Nest) to get JWT test API backend.
          </p>
        </SignedOut>
        <SignedIn>
          <TokenPanel />
        </SignedIn>
      </main>
    </div>
  )
}

export default App
