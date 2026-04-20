import api from './authApi';

export const categoryApi = {
  getAll: () => api.get('/categories'),
  getAllCategories: () => api.get('/categories'), // Alias
  getById: (id) => api.get(`/categories/${id}`),
};
