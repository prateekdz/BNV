import axios from '../api/axios.js';

export const userAPI = {
  getAll: (page = 1, limit = 10) =>
    axios.get('/users', { params: { page, limit } }),

  getById: (id) =>
    axios.get(`/users/${id}`),

  create: (data) =>
    axios.post('/users', data),

  update: (id, data) =>
    axios.put(`/users/${id}`, data),

  delete: (id) =>
    axios.delete(`/users/${id}`),

  search: (query, page = 1, limit = 10) =>
    axios.get('/users/search', { params: { query, page, limit } }),

  export: () =>
    axios.get('/users/export', { responseType: 'blob' }),
};
