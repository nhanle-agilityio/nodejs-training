/**
 * Secure Token Storage Service
 * 
 * Security considerations:
 * - Access token: Stored in memory (most secure against XSS)
 * - Refresh token: Stored in sessionStorage (cleared when tab closes)
 * - Token expiry: Stored in sessionStorage for timer management
 * 
 * Note: For maximum security, refresh tokens should be stored in httpOnly cookies
 * (requires backend changes). This implementation provides good security for SPAs.
 */

const REFRESH_TOKEN_KEY = 'refresh_token'
const TOKEN_EXPIRY_KEY = 'token_expiry'
const USER_KEY = 'user_data'

// In-memory storage for access token (more secure than localStorage)
let accessTokenMemory = null

// Storage change listeners
const listeners = new Set()

export const tokenStorage = {
  // Access Token (in-memory)
  getAccessToken: () => accessTokenMemory,
  
  setAccessToken: (token) => {
    accessTokenMemory = token
    notifyListeners('accessToken')
  },
  
  // Refresh Token (sessionStorage)
  getRefreshToken: () => {
    if (typeof window === 'undefined') return null
    try {
      return sessionStorage.getItem(REFRESH_TOKEN_KEY)
    } catch {
      return null
    }
  },
  
  setRefreshToken: (token) => {
    if (typeof window === 'undefined') return
    try {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, token)
    } catch (e) {
      console.error('Failed to store refresh token:', e)
    }
  },
  
  // Token Expiry (sessionStorage)
  getTokenExpiry: () => {
    if (typeof window === 'undefined') return null
    try {
      const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY)
      return expiry ? parseInt(expiry, 10) : null
    } catch {
      return null
    }
  },
  
  setTokenExpiry: (expiresIn) => {
    if (typeof window === 'undefined') return
    try {
      const expiryTime = Date.now() + expiresIn * 1000
      sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())
      notifyListeners('tokenExpiry')
    } catch (e) {
      console.error('Failed to store token expiry:', e)
    }
  },
  
  // User Data (sessionStorage)
  getUser: () => {
    if (typeof window === 'undefined') return null
    try {
      const userData = sessionStorage.getItem(USER_KEY)
      return userData ? JSON.parse(userData) : null
    } catch {
      return null
    }
  },
  
  setUser: (user) => {
    if (typeof window === 'undefined') return
    try {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user))
      notifyListeners('user')
    } catch (e) {
      console.error('Failed to store user data:', e)
    }
  },
  
  // Store all tokens at once
  // expiresAt: server-authoritative timestamp (milliseconds) - preferred
  // expiresIn: duration in seconds - fallback for backward compatibility
  setTokens: (accessToken, refreshToken, { expiresAt, expiresIn } = {}) => {
    accessTokenMemory = accessToken
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
        // Prefer server-authoritative expiresAt, fallback to calculating from expiresIn
        if (expiresAt) {
          sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toString())
        } else if (expiresIn) {
          const expiryTime = Date.now() + expiresIn * 1000
          sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())
        }
        notifyListeners('tokens')
      } catch (e) {
        console.error('Failed to store tokens:', e)
      }
    }
  },
  
  // Clear all tokens and user data
  clearAll: () => {
    accessTokenMemory = null
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(REFRESH_TOKEN_KEY)
        sessionStorage.removeItem(TOKEN_EXPIRY_KEY)
        sessionStorage.removeItem(USER_KEY)
        notifyListeners('clear')
      } catch (e) {
        console.error('Failed to clear storage:', e)
      }
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!accessTokenMemory || !!tokenStorage.getRefreshToken()
  },
  
  // Subscribe to storage changes
  subscribe: (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}

// Notify all listeners of changes
function notifyListeners(changeType) {
  listeners.forEach(listener => listener(changeType))
}

// Initialize access token from refresh token on page load
// This will be handled by the AuthContext
