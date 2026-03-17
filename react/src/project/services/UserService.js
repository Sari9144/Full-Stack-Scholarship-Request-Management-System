import api from './api.js'

export const login          = (owner, password)                        => api.post('/user/login',    { owner, password }).then(r => r.data)
export const register       = (owner, firstName, lastName, password)   => api.post('/user/register', { owner, firstName, lastName, password }).then(r => r.data)
export const logout         = ()                                       => api.post('/user/logout').then(r => r.data)
export const getCurrentUser = ()                                       => api.get('/user/me').then(r => r.data)
export const getAll         = ()                                       => api.get('/user').then(r => r.data)
