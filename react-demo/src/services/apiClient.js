import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const TOKEN_KEY = 'auth_jwt'

// Helper to read the current token from localStorage
export const getStoredToken = () => {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach Authorization header for authenticated requests
apiClient.interceptors.request.use((config) => {
  const token = getStoredToken()

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
  (response) => response,
  (error) => {
    // Normalize error shape for the UI
    const message =
      error.response?.data?.message ||
      error.message ||
      'Unexpected error communicating with the API'

    return Promise.reject({
      status: error.response?.status,
      data: error.response?.data,
      message,
    })
  },
)

