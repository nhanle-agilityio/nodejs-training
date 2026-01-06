import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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

