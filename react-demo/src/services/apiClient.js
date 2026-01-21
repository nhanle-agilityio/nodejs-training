import axios from 'axios'
import { tokenStorage } from './tokenStorage'
import { notifyActivity } from './sessionManager'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Legacy support - use tokenStorage
export const getStoredToken = () => tokenStorage.getAccessToken()

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request queue for handling concurrent refresh
let isRefreshing = false
let refreshSubscribers = []

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback)
}

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.forEach(callback => callback(accessToken))
  refreshSubscribers = []
}

const onRefreshFailed = () => {
  refreshSubscribers.forEach(callback => callback(null))
  refreshSubscribers = []
}

// Redirect to login and clear tokens
const redirectToLogin = () => {
  tokenStorage.clearAll()
  window.location.href = '/login'
}

// Attach Authorization header for authenticated requests
apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken()

  if (token) {
    const updatedConfig = {
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    }
    return updatedConfig
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => {
    // Notify session manager of user activity on successful API calls
    // Skip for token-related endpoints to avoid infinite loops
    const url = response.config?.url || ''
    if (!url.includes('/token')) {
      notifyActivity()
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Handle 401 token_expired - auto refresh
    if (
      error.response?.status === 401 &&
      error.response?.data?.error === 'token_expired' &&
      !originalRequest._retry
    ) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((accessToken) => {
            if (accessToken) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`
              resolve(apiClient(originalRequest))
            } else {
              reject(error)
            }
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = tokenStorage.getRefreshToken()

        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        // Call refresh endpoint directly with axios to avoid interceptors
        const response = await axios.post(`${API_BASE_URL}/token/refresh`, {
          refreshToken,
        })

        const { accessToken, refreshToken: newRefreshToken, expiresAt, expiresIn } = response.data
        tokenStorage.setTokens(accessToken, newRefreshToken, { expiresAt, expiresIn })

        // Notify all queued requests
        onTokenRefreshed(accessToken)
        isRefreshing = false

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh failed - redirect to login
        onRefreshFailed()
        isRefreshing = false
        redirectToLogin()
        return Promise.reject(refreshError)
      }
    }

    // Handle other 401 errors
    if (error.response?.status === 401) {
      const errorType = error.response?.data?.error

      if (errorType === 'invalid_refresh_token' || errorType === 'unauthorized') {
        redirectToLogin()
        return Promise.reject(error)
      }
    }

    // Normalize error shape for the UI
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Unexpected error communicating with the API'

    return Promise.reject({
      status: error.response?.status,
      data: error.response?.data,
      message,
    })
  },
)

