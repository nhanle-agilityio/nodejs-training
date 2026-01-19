import { apiClient, getStoredToken } from './apiClient'

const TOKEN_KEY = 'auth_jwt'

export const getToken = () => getStoredToken()

export const setToken = (token) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Register a new user
 * Maps to POST /users in the event-management API
 */
export const register = async ({ name, email, password }) => {
  const response = await apiClient.post('/users', { name, email, password })
  return response.data
}

/**
 * Login a user and store JWT token
 * Maps to POST /token in the event-management API
 */
export const login = async ({ email, password }) => {
  const response = await apiClient.post('/token', { email, password })
  const token = response.data?.token

  if (!token) {
    throw new Error('Login response did not include a token')
  }

  setToken(token)
  return token
}

/**
 * Fetch current authenticated user
 * Maps to GET /user in the event-management API
 */
export const getCurrentUser = async () => {
  const response = await apiClient.get('/user')
  return response.data
}

