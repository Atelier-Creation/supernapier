import api from './authApi';

const API_URL = '/orders';

export const orderApi = {
  createOrder: (orderData) => api.post(`${API_URL}`, orderData),
  getMyOrders: (userId) => api.get(`${API_URL}/user/${userId}`),
  getOrderDetails: (orderId) => api.get(`${API_URL}/${orderId}`),
  // Razorpay order creation
  createRazorpayOrder: (amount) => api.post('/payment/create-order', { amount }),
  verifyPayment: (paymentData) => api.post('/payment/verify', paymentData),
};
