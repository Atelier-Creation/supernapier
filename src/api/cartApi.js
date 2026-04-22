import api from './authApi';

const API_URL = '/cart';

export const cartApi = {
  getCart: () => api.get(`${API_URL}/`),
  addToCart: (data) => api.post(`${API_URL}/add`, data),
  updateCartItem: (itemId, data) => api.put(`${API_URL}/update/${itemId}`, data),
  removeFromCart: (itemId) => api.delete(`${API_URL}/remove/${itemId}`),
};
