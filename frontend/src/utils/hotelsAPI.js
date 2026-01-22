import api from './api';

// Hotels API
export const hotelsAPI = {
  // Get all hotels with filters
  getHotels: (params = {}) => api.get('/hotels/', { params }),

  // Get single hotel
  getHotel: (id) => api.get(`/hotels/${id}/`),

  // Create hotel (admin only)
  createHotel: (data) => api.post('/hotels/', data),

  // Update hotel (admin or owner)
  updateHotel: (id, data) => api.put(`/hotels/${id}/`, data),

  // Partial update
  patchHotel: (id, data) => api.patch(`/hotels/${id}/`, data),

  // Delete hotel (admin only)
  deleteHotel: (id) => api.delete(`/hotels/${id}/`),

  // Toggle hotel status
  toggleStatus: (id) => api.post(`/hotels/${id}/toggle_status/`),
};

// Rooms API
export const roomsAPI = {
  getRooms: (params = {}) => api.get('/rooms/', { params }),
  getRoom: (id) => api.get(`/rooms/${id}/`),
  createRoom: (data) => api.post('/rooms/', data),
  updateRoom: (id, data) => api.put(`/rooms/${id}/`, data),
  deleteRoom: (id) => api.delete(`/rooms/${id}/`),
};

// Reservations API
export const reservationsAPI = {
  getReservations: (params = {}) => api.get('/reservations/', { params }),
  getReservation: (id) => api.get(`/reservations/${id}/`),
  createReservation: (data) => api.post('/reservations/', data),
  updateReservation: (id, data) => api.put(`/reservations/${id}/`, data),
  confirmReservation: (id) => api.post(`/reservations/${id}/confirm/`),
  cancelReservation: (id) => api.post(`/reservations/${id}/cancel/`),
};

// Reviews API
export const reviewsAPI = {
  getReviews: (params = {}) => api.get('/reviews/', { params }),
  getReview: (id) => api.get(`/reviews/${id}/`),
  createReview: (data) => api.post('/reviews/', data),
};

export default {
  hotelsAPI,
  roomsAPI,
  reservationsAPI,
  reviewsAPI,
};
