import { useState, useEffect, useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'
import { tokenStorage } from '../services/tokenStorage'
import { apiClient } from '../services/apiClient'
import { registerActivityCallback, unregisterActivityCallback } from '../services/sessionManager'
import { SessionContext } from './sessionContextDef'

const WARNING_BEFORE_EXPIRY = 30 // seconds before expiry to show warning
const REFRESH_THROTTLE = 30 * 1000 // Minimum 30 seconds between refresh calls
const ACTIVITY_THRESHOLD = 30 * 1000 // Consider user active if activity within last 30 seconds

export const SessionProvider = ({ children }) => {
  const [showExpiryWarning, setShowExpiryWarning] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const timerRef = useRef(null)
  const countdownRef = useRef(null)
  const countdownTimeoutRef = useRef(null) // For initial sync timeout
  const countdownExpiryRef = useRef(null) // Store expiry for countdown interval
  const showExpiryWarningRef = useRef(false) // Track warning state to avoid stale closures
  const lastRefreshRef = useRef(0)
  const lastActivityRef = useRef(0) // Track last user activity (0 = no activity yet)
  const isRefreshingRef = useRef(false)

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (countdownTimeoutRef.current) {
      clearTimeout(countdownTimeoutRef.current)
      countdownTimeoutRef.current = null
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
      countdownRef.current = null
    }
  }, [])

  const handleLogout = useCallback(async () => {
    clearTimers()
    showExpiryWarningRef.current = false
    setShowExpiryWarning(false)
    
    const refreshToken = tokenStorage.getRefreshToken()
    if (refreshToken) {
      try {
        await apiClient.post('/token/logout', { refreshToken })
      } catch (error) {
        console.error('Logout API error:', error)
      }
    }
    
    tokenStorage.clearAll()
    window.location.href = '/login'
  }, [clearTimers])

  const startCountdown = useCallback((expiry, shouldShowWarning = false) => {
    // Ensure expiry is a number
    const expiryTime = typeof expiry === 'number' ? expiry : parseInt(expiry, 10)
    if (!expiryTime || isNaN(expiryTime)) {
      console.error('Invalid expiry time in startCountdown:', expiry)
      return
    }

    // Clear any existing countdown timers first
    if (countdownTimeoutRef.current) {
      clearTimeout(countdownTimeoutRef.current)
      countdownTimeoutRef.current = null
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
      countdownRef.current = null
    }

    // Store expiry in ref so interval callback can access it without stale closure
    countdownExpiryRef.current = expiryTime

    // Calculate initial remaining time immediately
    const now = Date.now()
    const initialRemaining = Math.max(0, Math.floor((expiryTime - now) / 1000))

      if (initialRemaining <= 0) {
      clearTimers()
      showExpiryWarningRef.current = false
      setShowExpiryWarning(false)
      handleLogout()
      return
    }

    // Use flushSync to ensure secondsRemaining is set BEFORE showing the modal
    // This guarantees the modal renders with the correct initial countdown value
    if (shouldShowWarning) {
      flushSync(() => {
        setSecondsRemaining(initialRemaining)
      })
      showExpiryWarningRef.current = true
      setShowExpiryWarning(true)
    } else {
      setSecondsRemaining(initialRemaining)
    }

    // Start the countdown interval immediately
    // The interval will update every second
    const intervalId = setInterval(() => {
      const latestExpiry = countdownExpiryRef.current
      if (!latestExpiry) {
        console.warn('Countdown interval: no expiry found, clearing')
        clearTimers()
        return
      }
      
      const intervalNow = Date.now()
      const remaining = Math.max(0, Math.floor((latestExpiry - intervalNow) / 1000))
      setSecondsRemaining(remaining)

      if (remaining <= 0) {
        clearTimers()
        showExpiryWarningRef.current = false
        setShowExpiryWarning(false)
        handleLogout()
      }
    }, 1000)
    
    countdownRef.current = intervalId
  }, [clearTimers, handleLogout])

  // Force refresh token (bypasses throttle) - used when warning timer fires but user was active
  const forceRefreshToken = useCallback(async () => {
    if (isRefreshingRef.current) return false

    try {
      isRefreshingRef.current = true
      lastRefreshRef.current = Date.now()
      
      const refreshToken = tokenStorage.getRefreshToken()
      if (!refreshToken) return false

      const response = await apiClient.post('/token/refresh', { refreshToken })
      const { accessToken, refreshToken: newRefreshToken, expiresAt, expiresIn } = response.data
      tokenStorage.setTokens(accessToken, newRefreshToken, { expiresAt, expiresIn })
      return { expiresAt } // Return server-authoritative expiry
    } catch (error) {
      console.error('Failed to force refresh token:', error)
      return false
    } finally {
      isRefreshingRef.current = false
    }
  }, [])

  // Handle warning timer - check if user was recently active
  const handleWarningTimer = useCallback(async (expiry) => {
    // Ensure expiry is a number
    const expiryTime = typeof expiry === 'number' ? expiry : parseInt(expiry, 10)
    if (!expiryTime || isNaN(expiryTime)) {
      console.error('Invalid expiry time:', expiry)
      return
    }

    const now = Date.now()
    const timeSinceActivity = now - lastActivityRef.current
    
    // If user was recently active, silently refresh instead of showing warning
    if (timeSinceActivity < ACTIVITY_THRESHOLD) {
      const result = await forceRefreshToken()
      if (result) {
        // Successfully refreshed - reset timer with new expiry (server-authoritative)
        clearTimers()
        const newExpiry = result.expiresAt // Use server timestamp directly
        const timeUntilWarning = newExpiry - Date.now() - WARNING_BEFORE_EXPIRY * 1000

        if (timeUntilWarning > 0) {
          timerRef.current = setTimeout(() => {
            handleWarningTimer(newExpiry)
          }, timeUntilWarning)
        }
        return
      }
    }

    // User was idle or refresh failed - show the warning
    clearTimers() // Clear any existing timers before showing warning
    // Pass true to show warning - this ensures secondsRemaining is set BEFORE the modal renders
    startCountdown(expiryTime, true)
  }, [forceRefreshToken, clearTimers, startCountdown])

  const refreshTokenAndResetTimer = useCallback(async () => {
    // Prevent multiple simultaneous refresh calls
    if (isRefreshingRef.current) return

    // Throttle refresh calls
    const now = Date.now()
    if (now - lastRefreshRef.current < REFRESH_THROTTLE) {
      return
    }

    try {
      isRefreshingRef.current = true
      lastRefreshRef.current = now
      
      const refreshToken = tokenStorage.getRefreshToken()
      if (!refreshToken) return

      const response = await apiClient.post('/token/refresh', { refreshToken })
      const { accessToken, refreshToken: newRefreshToken, expiresAt, expiresIn } = response.data
      tokenStorage.setTokens(accessToken, newRefreshToken, { expiresAt, expiresIn })
      
      // Explicitly reset the timer after successful refresh (use server-authoritative expiry)
      clearTimers()
      const expiry = expiresAt // Use server timestamp directly
      const timeUntilWarning = expiry - Date.now() - WARNING_BEFORE_EXPIRY * 1000
      
      if (timeUntilWarning > 0) {
        timerRef.current = setTimeout(() => {
          handleWarningTimer(expiry)
        }, timeUntilWarning)
      }
    } catch (error) {
      console.error('Failed to refresh token on activity:', error)
      // Don't logout here - let the expiry timer handle it
    } finally {
      isRefreshingRef.current = false
    }
  }, [clearTimers, handleWarningTimer])

  const startExpiryTimer = useCallback(() => {
    clearTimers()

    const expiry = tokenStorage.getTokenExpiry()
    if (!expiry) return

    const now = Date.now()
    const timeUntilWarning = expiry - now - WARNING_BEFORE_EXPIRY * 1000

    if (timeUntilWarning <= 0) {
      // Already in warning period or expired
      const remaining = Math.max(0, Math.floor((expiry - now) / 1000))
      if (remaining > 0) {
        // Check if user was recently active before showing warning
        handleWarningTimer(expiry)
      } else {
        // Token already expired
        handleLogout()
      }
      return
    }

    // Set timer to check activity and potentially show warning
    timerRef.current = setTimeout(() => {
      handleWarningTimer(expiry)
    }, timeUntilWarning)
  }, [clearTimers, handleLogout, handleWarningTimer])

  const handleContinueSession = useCallback(async () => {
    try {
      clearTimers()
      showExpiryWarningRef.current = false
      setShowExpiryWarning(false)
      isRefreshingRef.current = true
      lastRefreshRef.current = Date.now()
      
      const refreshToken = tokenStorage.getRefreshToken()
      if (!refreshToken) throw new Error('No refresh token')
      
      const response = await apiClient.post('/token/refresh', { refreshToken })
      const { accessToken, refreshToken: newRefreshToken, expiresAt, expiresIn } = response.data
      tokenStorage.setTokens(accessToken, newRefreshToken, { expiresAt, expiresIn })
      
      startExpiryTimer()
    } catch (error) {
      console.error('Failed to refresh token:', error)
      handleLogout()
    } finally {
      isRefreshingRef.current = false
    }
  }, [clearTimers, startExpiryTimer, handleLogout])

  const handleEndSession = useCallback(() => {
    handleLogout()
  }, [handleLogout])

  // Handle user activity - track activity and refresh token to extend session
  const handleActivity = useCallback(() => {
    // Always update last activity time
    lastActivityRef.current = Date.now()
    
    if (!tokenStorage.isAuthenticated()) return
    // Use ref to check warning state to avoid recreating callback when warning state changes
    if (showExpiryWarningRef.current) return // Don't auto-refresh during warning period

    refreshTokenAndResetTimer()
  }, [refreshTokenAndResetTimer])

  // Register activity callback on mount
  // Note: handleActivity no longer depends on showExpiryWarning to prevent
  // the effect from re-running when the warning state changes, which would
  // clear the countdown interval
  useEffect(() => {
    registerActivityCallback(handleActivity)

    return () => {
      unregisterActivityCallback()
      // Clear timers on unmount
      clearTimers()
    }
  }, [handleActivity, clearTimers])

  // Subscribe to token storage changes to start timer when tokens are set
  // This handles the case when AuthContext refreshes tokens on page load
  useEffect(() => {
    const unsubscribe = tokenStorage.subscribe((changeType) => {
      if (changeType === 'tokens') {
        // Tokens were just set (by AuthContext or after login)
        // Start the expiry timer based on stored expiry
        startExpiryTimer()
      }
    })

    // Also start timer if already authenticated (tokens already in storage)
    if (tokenStorage.isAuthenticated() && tokenStorage.getTokenExpiry()) {
      startExpiryTimer()
    }

    return unsubscribe
  }, [startExpiryTimer])

  const value = {
    showExpiryWarning,
    secondsRemaining,
    handleContinueSession,
    handleEndSession,
    startExpiryTimer,
  }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}
