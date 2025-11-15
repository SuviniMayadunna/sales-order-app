import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const salesOrderApi = {
  // Get all sales orders
  getAll: () => api.get('/salesorders'),
  
  // Get single sales order
  getById: (id) => api.get(`/salesorders/${id}`),
  
  // Create new sales order
  create: (salesOrder) => api.post('/salesorders', salesOrder),
  
  // Update sales order
  update: (id, salesOrder) => api.put(`/salesorders/${id}`, salesOrder),
  
  // Delete sales order
  delete: (id) => api.delete(`/salesorders/${id}`),
};

export const customerApi = {
  // Get all customers
  getAll: () => api.get('/customers'),
  
  // Get single customer
  getById: (id) => api.get(`/customers/${id}`),
};

export default api;
