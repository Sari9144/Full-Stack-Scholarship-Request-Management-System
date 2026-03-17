
import api from './api'

export const saveDraft     = (formData) => api.post('/request/draft',       formData).then(r => r.data)
export const getDraft      = ()         => api.get('/request/draft').then(r => r.data)
export const submitRequest = ()         => api.post('/request/submit').then(r => r.data)
export const getAll        = ()         => api.get('/request').then(r => r.data)
export const getMyStatus   = ()         => api.get('/request/my-status').then(r => r.data)
export const allowRequest  = (id)       => api.patch(`/request/allow/${id}`).then(r => r.data)
export const rejectRequest = (id)       => api.patch(`/request/reject/${id}`).then(r => r.data)
