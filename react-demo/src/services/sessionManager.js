// Session activity manager - handles token refresh on user activity
// This is a singleton that can be used by both apiClient and React components

let onActivityCallback = null

// Register callback to be called on user activity
export const registerActivityCallback = (callback) => {
  onActivityCallback = callback
}

// Unregister the callback
export const unregisterActivityCallback = () => {
  onActivityCallback = null
}

// Notify that user activity occurred
export const notifyActivity = () => {
  if (onActivityCallback) {
    onActivityCallback()
  }
}
