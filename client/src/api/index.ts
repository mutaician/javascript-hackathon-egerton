import axios from 'axios';
import { Business, Review } from '../types';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL
});

export const businessApi = {
  // Get all businesses
  getAll: async () => {
    const response = await api.get<Business[]>('/businesses');
    return response.data;
  },

  // Get single business
  getById: async (id: string) => {
    const response = await api.get<Business>(`/businesses/${id}`);
    return response.data;
  },

  // Create new business
  create: async (business: Omit<Business, '_id' | 'createdAt'>) => {
    const response = await api.post<Business>('/businesses', business);
    return response.data;
  },

  // Update business
  update: async (id: string, business: Partial<Business>) => {
    const response = await api.put<Business>(`/businesses/${id}`, business);
    return response.data;
  },

  // Delete business
  delete: async (id: string) => {
    await api.delete(`/businesses/${id}`);
  }
};

export const reviewApi = {
  // Get all reviews for a business
  getBusinessReviews: async (businessId: string) => {
    const response = await api.get<{ reviews: Review[]; averageRating: number; totalReviews: number }>(
      `/reviews/business/${businessId}`
    );
    return response.data;
  },

  // Create new review
  create: async (review: Omit<Review, '_id' | 'createdAt'>) => {
    const response = await api.post<Review>('/reviews', review);
    return response.data;
  },

  // Update review
  update: async (id: string, review: Partial<Review>) => {
    const response = await api.put<Review>(`/reviews/${id}`, review);
    return response.data;
  },

  // Delete review
  delete: async (id: string) => {
    await api.delete(`/reviews/${id}`);
  }
};
