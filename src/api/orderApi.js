import axios from 'axios';

const API_URL = '/api/orders';

export const orderApi = {
  createOrder: (orderData) => axios.post(`${API_URL}`, orderData),
  getMyOrders: (userId) => axios.get(`${API_URL}/user/${userId}`),
  getOrderDetails: (orderId) => axios.get(`${API_URL}/${orderId}`),
  // Razorpay order creation
  createRazorpayOrder: (amount) => axios.post('/api/payment/create-order', { amount }),
  verifyPayment: (paymentData) => axios.post('/api/payment/verify', paymentData),
};
