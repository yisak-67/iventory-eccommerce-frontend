import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAPI = {
  getAll: () => api.get('/products/'),
  getById: (id) => api.get(`/products/${id}/`),
  create: (product) => api.post('/products/', product),
  update: (id, product) => api.patch(`/products/${id}/`, product),
  delete: (id) => api.delete(`/products/${id}/`),
  search: (params) => api.get('/products/search/', { params }),
};