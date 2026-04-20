import api from './authApi';

export const productApi = {
  getAll: (params) => api.get('/products', { params }),
  getAllProducts: (params) => api.get('/products', { params }), // Alias
  getById: (id) => api.get(`/products/${id}`),
  getProductById: (id) => api.get(`/products/${id}`), // Alias
  getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
  search: (query) => api.get(`/products/search?q=${query}`),
};
