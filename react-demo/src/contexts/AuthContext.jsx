import { useState, useEffect, useCallback, useRef } from 'react'
import { AuthContext } from './authContextDef'
import { tokenStorage } from '../services/tokenStorage'
import { apiClient } from '../services/apiClient'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const initRef = useRef(false)

  // Initialize auth state on mount
  const initializeAuth = useCallback(async () => {
    if (initRef.current) return
    initRef.current = true

    try {
      const refreshToken = tokenStorage.getRefreshToken()
      
      if (!refreshToken) {
        setIsLoading(false)
        return
      }

      // Try to refresh the access token
      const response = await apiClient.post('/token/refresh', { refreshToken })
      const { accessToken, refreshToken: newRefreshToken, expiresAt, expiresIn } = response.data

      tokenStorage.setTokens(accessToken, newRefreshToken, { expiresAt, expiresIn })

      // Fetch user data
      const userResponse = await apiClient.get('/user')
      const userData = userResponse.data
      
      tokenStorage.setUser(userData)
      setUser(userData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      tokenStorage.clearAll()
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  // Login function
  const login = useCallback(async (email, password) => {
    const response = await apiClient.post('/token', { email, password })
    const { accessToken, refreshToken, expiresAt, expiresIn } = response.data

    if (!accessToken || !refreshToken) {
      throw new Error('Login response did not include tokens')
    }

    tokenStorage.setTokens(accessToken, refreshToken, { expiresAt, expiresIn })

    // Fetch user data
    const userResponse = await apiClient.get('/user')
    const userData = userResponse.data
    
    tokenStorage.setUser(userData)
    setUser(userData)
    setIsAuthenticated(true)

    return userData
  }, [])

  // Logout function
  const logout = useCallback(async () => {
    const refreshToken = tokenStorage.getRefreshToken()

    if (refreshToken) {
      try {
        await apiClient.post('/token/logout', { refreshToken })
      } catch (error) {
        console.error('Logout API error:', error)
      }
    }

    tokenStorage.clearAll()
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  // Register function
  const register = useCallback(async (name, email, password) => {
    const response = await apiClient.post('/users', { name, email, password })
    return response.data
  }, [])

  // Refresh token function
  const refreshToken = useCallback(async () => {
    const currentRefreshToken = tokenStorage.getRefreshToken()

    if (!currentRefreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await apiClient.post('/token/refresh', { refreshToken: currentRefreshToken })
    const { accessToken, refreshToken: newRefreshToken, expiresAt, expiresIn } = response.data

    tokenStorage.setTokens(accessToken, newRefreshToken, { expiresAt, expiresIn })
    return { accessToken, refreshToken: newRefreshToken, expiresAt, expiresIn }
  }, [])

  // Update user data
  const updateUser = useCallback((userData) => {
    tokenStorage.setUser(userData)
    setUser(userData)
  }, [])

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    refreshToken,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
