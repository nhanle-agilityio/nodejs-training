import { apiClient, getStoredToken } from './apiClient'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const TOKEN_EXPIRY_KEY = 'token_expiry'

export const getToken = () => getStoredToken()

export const getAccessToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const getTokenExpiry = () => {
  if (typeof window === 'undefined') return null
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY)
  return expiry ? parseInt(expiry, 10) : null
}

export const setTokens = (accessToken, refreshToken, expiresIn) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  if (expiresIn) {
    const expiryTime = Date.now() + expiresIn * 1000
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())
  }
}

export const clearTokens = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(TOKEN_EXPIRY_KEY)
}

// Legacy support
export const clearToken = clearTokens

/**
 * Register a new user
 * Maps to POST /users in the event-management API
 */
export const register = async ({ name, email, password }) => {
  const response = await apiClient.post('/users', { name, email, password })
  return response.data
}

/**
 * Login a user and store tokens
 * Maps to POST /token in the event-management API
 */
export const login = async ({ email, password }) => {
  const response = await apiClient.post('/token', { email, password })
  const { accessToken, refreshToken, expiresIn } = response.data

  if (!accessToken || !refreshToken) {
    throw new Error('Login response did not include tokens')
  }

  setTokens(accessToken, refreshToken, expiresIn)
  return { accessToken, refreshToken, expiresIn }
}

/**
 * Refresh the access token using refresh token
 * Maps to POST /token/refresh in the event-management API
 */
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  const response = await apiClient.post('/token/refresh', { refreshToken })
  const { accessToken, refreshToken: newRefreshToken, expiresIn } = response.data

  if (!accessToken || !newRefreshToken) {
    throw new Error('Refresh response did not include tokens')
  }

  setTokens(accessToken, newRefreshToken, expiresIn)
  return { accessToken, refreshToken: newRefreshToken, expiresIn }
}

/**
 * Logout user and invalidate refresh token
 * Maps to POST /token/logout in the event-management API
 */
export const logout = async () => {
  const refreshToken = getRefreshToken()

  if (refreshToken) {
    try {
      await apiClient.post('/token/logout', { refreshToken })
    } catch (error) {
      // Continue with local logout even if API call fails
      console.error('Logout API error:', error)
    }
  }

  clearTokens()
}

/**
 * Fetch current authenticated user
 * Maps to GET /user in the event-management API
 */
export const getCurrentUser = async () => {
  const response = await apiClient.get('/user')
  return response.data
}

