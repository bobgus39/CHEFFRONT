import axios from 'axios'

const rawUrl = import.meta.env.VITE_API_URL || '/api'
const baseURL = rawUrl.endsWith('/api') || rawUrl.endsWith('/api/')
  ? rawUrl
  : rawUrl.replace(/\/?$/, '/api')

const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bistrocali_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getMenu = (lang = 'es') => api.get(`/menu?lang=${lang}`)
export const getTerpenes = () => api.get('/terpenes')
export const getGallery = () => api.get('/gallery')
export const createReservation = (data) => api.post('/reservations', data)
export const sendContact = (data) => api.post('/contact', data)

export const adminLogin = (credentials) => api.post('/auth/login', credentials)
export const getReservations = () => api.get('/admin/reservations')
export const updateReservation = (id, data) => api.patch(`/admin/reservations/${id}`, data)
export const addMenuItem = (data) => api.post('/admin/menu', data)
export const updateMenuItem = (id, data) => api.put(`/admin/menu/${id}`, data)
export const deleteMenuItem = (id) => api.delete(`/admin/menu/${id}`)

export default api
