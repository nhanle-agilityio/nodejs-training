import { apiClient } from './apiClient'

export const getEvents = async (params = {}) => {
  const response = await apiClient.get('/events', { params })
  return response.data
}

export const getEventById = async (id) => {
  const response = await apiClient.get(`/events/${id}`)
  return response.data
}

export const createEvent = async (payload) => {
  const response = await apiClient.post('/events', payload)
  return response.data
}

export const updateEvent = async (id, payload) => {
  const response = await apiClient.put(`/events/${id}`, payload)
  return response.data
}

export const patchEvent = async (id, payload) => {
  const response = await apiClient.patch(`/events/${id}`, payload)
  return response.data
}

export const deleteEvent = async (id) => {
  const response = await apiClient.delete(`/events/${id}`)
  return response.status === 204 ? null : response.data
}

