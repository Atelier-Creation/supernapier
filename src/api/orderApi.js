import api from './authApi';

const API_URL = '/orders';

export const orderApi = {
  createOrder: (orderData) => api.post(`${API_URL}`, orderData),
  previewShipping: (payload) => api.post(`${API_URL}/preview-shipping`, payload),
  getMyOrders: (userId) => api.get(`${API_URL}/user/${userId}`),
  getOrderDetails: (orderId) => api.get(`${API_URL}/${orderId}`),
  // Razorpay order creation
  createRazorpayOrder: (orderId) => api.post('/payment/create-order', { orderId }),
  verifyPayment: (paymentData) => api.post('/payment/verify', paymentData),
  getRazorpayKey: () => api.get('/payment/key'),
};
